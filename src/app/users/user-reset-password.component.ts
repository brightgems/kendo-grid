import {Component, OnInit , OnDestroy} from '@angular/core';
import {UsersService} from "../services/users.service";
import {Location} from '@angular/common';
import {RolesService} from "../services/roles.service";
import {Role} from "../Models/role.model";
import { Title }     from '@angular/platform-browser';

import 'rxjs/add/operator/map';
import {
    DeleteUserRequest, CreateUserRequest, UpdateUserRequest,
    ResetPasswordRequest
} from "../Models/createuser.model";

import {AuthenticationService} from "../services/authentication.service";
import {NavigationExtras, Router, ActivatedRoute} from "@angular/router";
import {MessageAreaService, MessageAreaMessageType} from "../message-area/message-area.service";

@Component({
    templateUrl : '/app/users/user-reset-password.component.html'

})

export class ResetPasswordComponent implements OnInit
{

    resetUser: any;
    resetPasswordReq: ResetPasswordRequest;
    successMessage = '';
    sub:any;
    id:any;
    ShowMainDiv:boolean=false;
    constructor(private _usersService: UsersService,
                private _route:ActivatedRoute ,
                private messageService:MessageAreaService,
                private titleService: Title,private _router:Router,private location:Location) {

        this.resetPasswordReq = new ResetPasswordRequest();
        this.resetPasswordReq.SendMail = true;

    }
    ngOnInit(): void
    {
        //subscribing the routing parameter and getting id from it
        this.sub = this._route.params.subscribe(params => {

            // (+) converts string 'id' to a number
            this.id = +params['id'];
            this.getUserById(this.id);
        });
        //add title on browser's tab
        this.titleService.setTitle("MobilizeOn-User Reset Password");

    }

    public setTitle( newTitle: string) {
        this.titleService.setTitle( newTitle );
    }

    ngOnDestroy()
    {
        this.sub.unsubscribe();
    }
    resetUserObject:ResetPasswordRequest;
    resetUserClick(user)
    {
        //getting admin email
        this.getAdminEmail();
        console.log(user);
        this.resetUser = user;
    }
    Submit()
    {
        this.resetPasswordReq.UserId=this.resetUser.UserId;
        this._usersService.resetUserPassword(this.resetPasswordReq).subscribe(
            (result:any)=>
            {
                if(result.Success)
                {
                    this.messageService.addMessage(MessageAreaMessageType.SUCCESS,result.Message + " " + "New Password is : "+result.NewPassword);
                    // navigate to userList component after reset password success.
                    this._router.navigate(['/home/users/list']);
                    // clears browser history so they can't navigate with back button
                    this.location.replaceState('/home/users/list');
                }
                else {
                    this.messageService.addMessage(MessageAreaMessageType.ERROR,result.Message);
                }
            }, error => {
                this.messageService.addMessage(MessageAreaMessageType.ERROR,"Unable to Change Password.");
            }
        );
    }

    //Fetching admin email
    getAdminEmail()
    {

        this._usersService.getAdminEmail().subscribe((result:any)=>
        {
            //check whether result is not null
            if(result!=null)
            {
                //check whether result was success or not
                if(result.Success)
                {
                    //check whether user is not null
                    if (result.User != null)
                    {
                        //assgining email id.
                        this.resetPasswordReq.MailsTo= result.User.Email;
                    }
                }
            }
            this.ShowMainDiv=true;
        });
    }
    getUserById(id:any)
    {
        let users=JSON.parse(localStorage.getItem("UsersData"));
        let user= users.filter(x=>x.UserId==id)[0];
        this.resetUserClick(user);
        console.log(user);
    }
}
