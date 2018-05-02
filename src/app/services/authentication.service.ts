import { Injectable } from '@angular/core';
import { Http , Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {TokenData} from "../Models/logindata.model";
import {Router} from "@angular/router";
import {Config} from "../config/config";
import * as $ from 'jquery';

export class User {
    public email: string;
    public password: string;

    constructor() {
    }
}


@Injectable()
export class AuthenticationService {
    public  get  tokenData(): TokenData {
        return JSON.parse(sessionStorage.getItem("tokenData"));
    }

    public  set  tokenData(value: TokenData) {
        sessionStorage.setItem("tokenData", JSON.stringify(value));
    }

    private ourUrl:string;
    public redirectUrl;

    constructor(private http: Http,private _router:Router,private config:Config) {

        this.ourUrl = `${this.config.baseUrl}token`;
    }

    login(email, password): Observable<any> {

        let data = "grant_type=password&username=" + email + "&password=" + password;
        let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});

        let options = new RequestOptions({
            headers: headers
        })

        return this.http.post(this.ourUrl, data, options)
            .map((response: Response) => {
                console.log(response);

                let token = response.json() && response.json().access_token;
                console.log(token);
                if (token) {
                    console.log("token present");
                    this.tokenData = response.json();
                    // return true to indicate successful login
                    console.log("login successfull");
                    return true;
                } else {
                    // return false to indicate failed login
                    console.log("login failed");
                    return false;
                }
            })

            .catch(
                (error: any) => Observable.throw(error.json().error_description || 'Server error')
            );

    }


    logout(): void {
        // clear token remove user from local storage to log user out
        this.tokenData = null;
        this._router.navigate(['/login']);
        try {
            $(".modal-backdrop").remove();
        }
        catch (e) {
            console.log("Logout",e);
        }

    }

    public get isLoggedIn() : boolean {
        if (this.tokenData == null) {
            return false;
        }
        return true;
    }

    public getOrgId():string {
        if(this.tokenData != null && this.tokenData.organizationId != null && this.tokenData.organizationId != ""){
            return this.tokenData.organizationId;
        }
        return null;
    }

    public getAdminLoginId():string {
        let orgId = this.getOrgId();
        if(orgId != null){
            return orgId + '.admin';
        }
        return null;
    }

    public isAdminLogin():boolean {
        let adminLogin = this.getAdminLoginId();
        if (adminLogin != null) {
            var result= this.tokenData.loginId == adminLogin;
            return result;
        }
        return false;
    }
}