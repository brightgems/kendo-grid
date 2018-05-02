import { Injectable } from '@angular/core';
import { Http , Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class ChangePasswordService {

    public token : string;
    private ourUrl = 'http://test-mobilizie-api.azurewebsites.net/api/changepassword';
    constructor(private http : Http , private authenticationService: AuthenticationService) { }
    changePass(currentPassword , newPassword , confirmNewPassword) : Observable<any> {
        let data = "{'CurrentPassword':'" + currentPassword  + "','NewPassword':'" + newPassword + "','ConfirmNewPassword':'" + confirmNewPassword+"'}";
        let headers = new Headers({
            'Authorization': 'Bearer ' + this.authenticationService.tokenData.access_token,
            'Content-Type': 'application/json'
        });
        let options = new RequestOptions({headers: headers});
        return this.http.post(this.ourUrl,data,options)
            .map(changedPassword => {
                console.log(changedPassword);
                let changedObj = changedPassword.json();
                console.log(changedObj);
                return changedObj;


            })
    }
}
