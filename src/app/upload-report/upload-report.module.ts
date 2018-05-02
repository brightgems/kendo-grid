import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }   from '@angular/forms';
import {HttpModule, JsonpModule, Http} from '@angular/http';
import {UploadReportRoutingModule} from "./upload-report.routing.module";
import {UploadReportComponent} from "./upload-report.component";
import {UploadNewReportComponent} from "./upload-new-report.component";
import {MessageAreaModule} from "../message-area/message-area.module";


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpModule,
        JsonpModule,
        UploadReportRoutingModule,
        MessageAreaModule
    ],
    declarations: [ UploadReportComponent,UploadNewReportComponent ],
    providers: [ ]
})
export class UploadReportModule {}