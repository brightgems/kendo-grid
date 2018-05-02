import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ReportsComponent} from "./reports.component";
import {ReportsListComponent} from "./reports-list.component";
import {ReportsViewComponent} from "./reports-view.component";

const reportsRoutes: Routes = [
    {
        path: "", component : ReportsComponent,
        children: [
            { path: 'list' , component : ReportsListComponent },
            { path: 'view/:id' , component : ReportsViewComponent },
            { path: '', component: ReportsListComponent }
        ]
    }];

@NgModule({
    imports: [
        RouterModule.forChild(reportsRoutes)
    ],
    exports: [
        RouterModule
    ],
    providers: []
})

export class ReportsRoutingModule {}