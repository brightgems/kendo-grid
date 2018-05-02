
import {Http, Headers, RequestOptions} from "@angular/http";
import {AuthenticationService} from "./authentication.service";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Injectable} from "@angular/core";
import {SlimLoadingBarService} from "ng2-slim-loading-bar";
import {Config} from "../config/config";
import {TokenData} from "../Models/logindata.model";


export class ServiceResponse {
    /*
    *   Response of HttpService class
    * */
    Success: boolean;
    Message: any;
    ResponseCode: number;
}
@Injectable()
export class HttpService {


    constructor(private http: Http, private auth: AuthenticationService,
                private slimLoadingBarService: SlimLoadingBarService,
    private config: Config
    )
    {

    }

    Get(api: string): Observable<ServiceResponse> {
        /*
         *   GET HTTP method, makes a http GET call to server with authorized headers
         *      api:    name of api
         *   returns ServiceResponse as result
         * */
        let headers = new Headers({
            'Authorization': 'Bearer ' + this.auth.tokenData.access_token,
            'Content-Type': 'application/json'
        });

        let options = new RequestOptions({headers: headers});

        this.slimLoadingBarService.start();

        return this.http.get(`${this.config.baseUrl}api/${api}`, options)
            .map(this.Success).catch(this.Catch);
    }

    Post(api: string, data: any): Observable<ServiceResponse> {
        /*
         *   POST HTTP method, makes a http POST call to server with authorized headers
         *      data:   data passed to http call
         *      api:    name of api
         *   returns ServiceResponse as result
         * */
        let headers = new Headers({
            'Authorization': 'Bearer ' + this.auth.tokenData.access_token,
            'Content-Type': 'application/json'
        });

        let options = new RequestOptions({headers: headers});

        this.slimLoadingBarService.start();
        return this.http.post(`${this.config.baseUrl}api/${api}`, data, options)
            .map(this.Success).catch(this.Catch);
    }

    PostMultipart(api: string, data: FormData): Observable<ServiceResponse> {
        /*
         *   POST HTTP method, makes a http POST call to server with authorized headers
         *      data:   data passed to http call
         *      api:    name of api
         *   returns ServiceResponse as result
         * */
        let headers = new Headers({
            'Authorization': 'Bearer ' + this.auth.tokenData.access_token,
            'Accept': 'application/json',
        });

        let options = new RequestOptions({headers: headers});

        this.slimLoadingBarService.start();
        return this.http.post(`${this.config.baseUrl}api/${api}`, data, options)
            .map(this.Success).catch(this.Catch);
    }

    private Success = (response) => {
        /*
         *  Returns a ServiceResponse with success as true
         *  Message and response code is passed if any
         *      Message: JSON object of response
         * */
        let res: ServiceResponse = new ServiceResponse();
        res.Success = true;
        if (response != null) {
            //  create json object
            let x = response.json();
            console.log("Success : ", x);
            res.Message = x;
            if (response.status != null) {
                res.ResponseCode = response.status;
            }
        }

        this.slimLoadingBarService.complete();
        return res;
    }

    private Catch = (x) => {
        /*
         *  Returns a ServiceResponse with success as false
         *  Message and response code is passed if any
         * */

        let errMsg = x.json().Message;

        let y = new ServiceResponse();
        y.Success = false;
        if (x != null) {
            if (x != null)
                y.ResponseCode = x.status;
            y.Message = x.Message;
            if (y.ResponseCode == 401) {
                //save message in session storage
                let abc = x.json();
                sessionStorage.setItem("logoutMessage", (abc.Message));

                this.auth.logout();
            }
            console.log("CATCH: ", x);
        }
        this.slimLoadingBarService.complete();

        return Observable.throw(errMsg);
    }
}