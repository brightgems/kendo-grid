import {Component} from '@angular/core';
import {Router} from "@angular/router";

@Component({
    templateUrl: "/app/reports/reports.component.html",
})
export class ReportsComponent{

    constructor(private _router:Router)
    {

    }

    NavigateToList()
    {
        this._router.navigate(['home/reports/list']);
    }
    ReportsViewComponent()
    {
        this._router.navigate(['home/reports/view']);
    }
}
