import { Component , OnInit } from '@angular/core';
import { ChangePasswordService  } from '../services/changePassword.service';
import { Router } from '@angular/router';
import {ChangePasswordRequest} from "../Models/changepassword.model";
import {AuthenticationService} from "../services/authentication.service";
import { Title }     from '@angular/platform-browser';
import {Location} from "@angular/common";


@Component({
    selector: 'changePassword',
    templateUrl: "./change-password.component.html",
    moduleId: module.id
})


export class ChangePasswordComponent implements OnInit{

    changePasswordRequest : ChangePasswordRequest;
    successMessage='';
    passwordNotMatch='';
    currentPassword = '';

    constructor(private changePassService: ChangePasswordService ,
                private router: Router,
                private authenticateService:AuthenticationService,
                private titleService: Title,
                private _location:Location)
    {
        this.changePasswordRequest = new ChangePasswordRequest();
    }

    ngOnInit(): void {
        //add title on browser's tab
        this.titleService.setTitle("MobilizeOn- Change Password");
    }

    changePassword() {
        // check wheather password matched or not
        if(this.changePasswordRequest.NewPassword != this.changePasswordRequest.ConfirmNewPassword){
            this.passwordNotMatch = "Password does not matched.";
        }
        else {
            this.changePassService.changePass(this.changePasswordRequest.CurrentPassword, this.changePasswordRequest.NewPassword, this.changePasswordRequest.ConfirmNewPassword)
                .subscribe(
                    (userobj: any) => {
                        console.log(userobj.Message);
                        if (userobj.Success) {
                            this.successMessage = "Password Changed Successfully.";
                            this.authenticateService.logout();
                        }
                        else{
                            console.log(userobj.Message);
                            this.currentPassword = userobj.Message;
                        }
                    },error => {
                       this.successMessage="Unable to change Password";
                    });
        }
    }
    goBack()
    {
        this._location.back();
    }
}





