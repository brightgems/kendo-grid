import {Component,OnInit} from '@angular/core';
import {Router} from "@angular/router";
import 'rxjs/add/operator/map';
import * as $ from 'jquery';
import { UploadReports } from "../Models/uploadReport.model";
import {UploadReportService} from "../services/report-upload.service";
import {UserReportsService} from "../services/user-reports.services";
import {Report} from "../Models/report.model";
import {MessageAreaService, MessageAreaMessageType} from "../message-area/message-area.service";


@Component({
    moduleId: module.id,
    templateUrl: "./upload-new-report.component.html",
    providers:[UploadReportService , UserReportsService]
})


export class UploadNewReportComponent implements OnInit{

    reports:Array<Report>;
    uploadReports: Array<UploadReports> = [];
    selectReport: UploadReports = new UploadReports();
    nameConflictMessageShow:boolean=false;
    uploading:boolean=false;
    fileUploadedSuccess:boolean=false;
    fileUploadedError:boolean=false;


    constructor(private _router:Router,
                private _reportsService:UserReportsService,
                private  uploadReportService: UploadReportService,
                private messageService:MessageAreaService,) {}


    ngOnInit(): void
    {
        $("#openModal").click();

    }

    //this method will call, when user choose file in html
    selectFile($event): void {
        let files = $event.target.files || $event.srcElement.files;
        let file = files[0];
        if(file!=null){
            this.selectReport.pbix = file;
        }
    }

    SubmitClicked() {
        if (this.selectReport != null) {
            this._reportsService.getUserReports().subscribe(
                (result: any)=> {
                    this.reports = result;
                    console.log(this.reports);

                    if (this.ReportWithNameExists(this.reports, this.selectReport.DataSetName)) {
                         // if repoet name conflict occurs , open modal for confirmation
                        // $("#NameConflictModal").click();
                        this.nameConflictMessageShow = true;
                    }
                    else {
                        // UploadReport service call
                        this.uploadReport();

                    }
                });
        }
    }

    //after closing the modal, navigate to reports component
    naviagteToReports()
    {
        this._router.navigate(['home/reports']);
    }


    uploadReport(){
        this.nameConflictMessageShow = false;
        this.uploading = true;
        this.uploadReportService.CreateReport(this.selectReport).subscribe(
            (x) => {
                if (x.Success) {
                    console.log(x);
                    $("#dismissModalButton").click();
                    $(".modal-backdrop").remove();
                    this.uploading = false;
                    this.fileUploadedSuccess = true;
                    this._router.navigate(['/home/reports']);
                    this.messageService.addMessage(MessageAreaMessageType.SUCCESS, "File Uploaded successfully !!!");
                }
                else{
                    console.log(x);
                }
                console.log(x);
            },
            error =>
            {
                $("#dismissModalButton").click();
                this.uploading = false;
                this.fileUploadedError = true;
                this.messageService.addSingleMessage(MessageAreaMessageType.ERROR,"Unable to update record.");
            }

        )
    }

    ReportWithNameExists(reports:Array<Report> , reportName : string):boolean{

        if(reportName!=null&&reportName!=""&&reports!=null && reports.length>0){
            let y= reportName.toLowerCase();
            for (let i=0;i<reports.length;i++){
                let report = reports[i];
                if(report!=null&&report.Name!=null&&report.Name!=""){
                    let x = report.Name.toLowerCase();
                    if(x===y){
                        return true;
                    }
                }
            }
        }
        return false;
    }

    cancelUploadReport(){
        this.nameConflictMessageShow = false;
    }
}

