import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {HttpService, ServiceResponse} from "./httpHelper.service";
import { UploadReports } from "../Models/uploadReport.model";
import {MessageAreaMessageType, MessageAreaService} from "../message-area/message-area.service";


@Injectable()
export class UploadReportService {

    constructor(private _httpService: HttpService,private _messageService:MessageAreaService) {}

    CreateReport(selectReport: UploadReports): Observable<any> {

        let formData = new FormData();
        formData.append("pbix" , selectReport.pbix);
        formData.append("DataSetName",selectReport.DataSetName );

        return this._httpService.PostMultipart("UploadReport", formData).map((x: ServiceResponse): ServiceResponse => {
                if (x.Success) {
                    return x.Message;
                } else {
                    this._messageService.addMessage(MessageAreaMessageType.ERROR,"Unable to fetch Users");
                    return x;
                }
            }
        );
    }

}