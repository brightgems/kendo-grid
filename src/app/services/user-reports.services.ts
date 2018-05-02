
    import {Injectable} from "@angular/core";
    import {HttpService, ServiceResponse} from "./httpHelper.service";
    import {Observable} from "rxjs";
    import {Report} from "../Models/report.model";
    import {MessageAreaService, MessageAreaMessageType} from "../message-area/message-area.service";
    @Injectable()
    export class UserReportsService {

        reports: Array<Report>;

        constructor(private _httpService: HttpService ,private _messageService:MessageAreaService) {
        }

        getUserReports(): Observable<Array<Report>> {
            //  Makes a http get call to get reports in organization [for admin]/assigned [for user]
            return this._httpService.Post("UserReports", "").map((x: ServiceResponse) => {
                    if (x.Success) {
                        return this.readReports(x.Message);
                    } else {
                        this._messageService.addMessage(MessageAreaMessageType.ERROR,"Unable to fetch Reports");
                        return this.readReports(null);
                    }
                }
            );
        }

        getReportEmbedData(reportId:any):Observable<any>
        {
            let api=`Reports?id=${reportId}`;
            return this._httpService.Get(api).map((x:ServiceResponse)=>
            {
                return x.Message;
            });
        }

        private readReports(result: any): Array<Report> {
            // read result if result has list of Reports or not
            // set reports as result.Reports or null

            if (result != null && result.Reports != null) {
                this.reports = result.Reports;
            } else {
                this.reports = null;
            }
            return this.reports;
        }

    }
