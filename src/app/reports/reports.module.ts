import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }   from '@angular/forms';
import {HttpModule, JsonpModule, Http} from '@angular/http';
import {ReportsRoutingModule} from "./reports.routing.module";
import {ReportsComponent} from "./reports.component";
import {ReportsListComponent} from "./reports-list.component";
import {ReportsViewComponent} from "./reports-view.component";
import {UserReportsService} from "../services/user-reports.services";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpModule,
        JsonpModule,
        ReportsRoutingModule
    ],
    declarations: [ReportsComponent,ReportsListComponent,ReportsViewComponent
    ],
    providers: [UserReportsService]
})
export class ReportsModule {}