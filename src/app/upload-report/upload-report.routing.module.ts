import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UploadReportComponent} from "./upload-report.component";
import {UploadNewReportComponent} from "./upload-new-report.component";

const uploadReportRoutes: Routes = [
    {
        path: "", component : UploadReportComponent,
        children: [
            { path: 'uploadNew' , component : UploadNewReportComponent },
            { path: '', component: UploadNewReportComponent }
        ]
    }];

@NgModule({
    imports: [
        RouterModule.forChild(uploadReportRoutes)
    ],
    exports: [
        RouterModule
    ],
    providers: []
})

export class UploadReportRoutingModule {}