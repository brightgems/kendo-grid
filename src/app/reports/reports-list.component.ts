import {Component, OnInit} from '@angular/core';
import 'rxjs/add/operator/map';
import {UserReportsService} from "../services/user-reports.services";
import {Report} from "../Models/report.model";
import {Router} from "@angular/router";
import { Title }     from '@angular/platform-browser';

@Component({
    selector:"reports-list",
    templateUrl : './reports-list.component.html',
    moduleId: module.id
})

export class ReportsListComponent implements OnInit{
    reports:Array<Report>;

    constructor(private _reportsService:UserReportsService,
                private _router:Router,
                private titleService: Title)
    {
        this.reports= new Array<Report>();
    }

    ngOnInit(): void {
        this.getReports();
        this.titleService.setTitle("MobilizeOn-Report List");
    }

    public setTitle( newTitle: string) {
        this.titleService.setTitle( newTitle );
    }

    getReports()
    {
        this._reportsService.getUserReports().subscribe(
            (result: any)=> {
                this.reports=result;
                console.log(this.reports);
            });
    }

    NavigateToView(report:Report)
    {
        let redirect='/home/reports/view';
        let reportId=JSON.parse(report.ReportId).ReportId;
        ;        this._router.navigate([redirect,reportId]);
    }
    RefreshReports()
    {
        this.getReports();
    }
}