import {Component, OnInit, AfterViewInit} from '@angular/core';
import 'rxjs/add/operator/map';
import {ActivatedRoute} from "@angular/router";
declare var $:any;
declare var powerbi:any;
import {UserReportsService} from "../services/user-reports.services";
import {Observable} from "rxjs";
import { Title }     from '@angular/platform-browser';
import {MessageAreaService, MessageAreaMessageType} from "../message-area/message-area.service";

@Component({
    selector:"reports-view",
    templateUrl : './reports-view.component.html',
    moduleId: module.id
})



export class ReportsViewComponent implements OnInit, AfterViewInit
{
    sub:any;
    id:any
    constructor(private _route:ActivatedRoute,
                private _userReportsService:UserReportsService,
                private titleService: Title,private messageService:MessageAreaService)
    {

    }
    ngOnInit(): void
    {
        this.sub=this._route.params.subscribe(param=>
        {
            this.id=param['id'];
        });
        this.titleService.setTitle("MobilizeOn-Report View");
    }

    public setTitle( newTitle: string) {
        this.titleService.setTitle( newTitle );
    }

    ngOnDestroy()
    {
        this.sub.unsubscribe();
    }


    ngAfterViewInit() {

        //Call Service: Id Pass Respone JSON
        this._userReportsService.getReportEmbedData(this.id).subscribe(
            (result:any)=>
            {
                if(result.Success)
                {
                    console.log(result.Report);
                    let embedConfiguration = result.Report;
                    //hiding the filter Pane.
                    embedConfiguration.settings= {
                        filterPaneEnabled: false
                    };
                    let reportContainer =  $('#reportContainer');
                    powerbi.embed(reportContainer.get(0), embedConfiguration);
                }
                else
                    {
                    this.messageService.addMessage(MessageAreaMessageType.ERROR,"Unable to load Report");
                }
            }, error =>
            {
                this.messageService.addMessage(MessageAreaMessageType.ERROR,"Unable to load Report");
            });


    }
    //Method for printing report
    printReport()
    {
        //getting element by passing element id.
        var element = document.getElementById('reportContainer');
        //getting report from div element.
        var report = powerbi.get(element);
        //print method of PowerBI Report.
        report.print()
            .catch(error =>
            {
                console.log(error);
            });
    }
    //Method for reloading report
    reloadReport()
    {
        //getting element by passing element id.
        var element = document.getElementById('reportContainer');
        //getting report from div element.
        var report = powerbi.get(element);
        //reload method of PowerBI Report.
        report.reload()
            .catch(error =>
            {
                console.log(error);
            });
    }
}