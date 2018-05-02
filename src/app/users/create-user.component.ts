import {Component, OnInit} from '@angular/core';
import {UsersService} from "../services/users.service";
import {RolesService} from "../services/roles.service";
import {Role} from "../Models/role.model";
import 'rxjs/add/operator/map';
import {CreateUserRequest, CheckLoginIdRequest} from "../Models/createuser.model";
import {AuthenticationService} from "../services/authentication.service";
import {Route, Router} from "@angular/router";
import {MessageAreaService, MessageAreaMessageType} from "../message-area/message-area.service";
import { Title }     from '@angular/platform-browser';
import {RefreshService} from "../services/list.refresh.service";
import * as $ from 'jquery';


@Component({
    templateUrl : '/app/users/create-user.component.html'
})

export class CreateUserComponent implements OnInit {

    ngOnInit(): void {
        this.titleService.setTitle("MobilizeOn-New User");
        this.openModal();
        this.getRoles();

    }
    /*
     Regex expressions: used in HTML
     emailRegExp: any = /^[_.0-9a-zA-Z-]+@+[a-zA-Z]+[.]+(com|co.in)$/i;
     phoneRegExp: RegExp = /^[0-9.+-]*$/i;
     */
    $ : any;
    createuser: CreateUserRequest;
    OrganisationId: string;
    x: any;
    ShowMainDiv:boolean=false;
    LoginAvailabilityText="";
    loadingIndicator : boolean = true;

    CountryCallingCodes = [
        {value: '+91', key: 'India(+91)'},
        {value: '+971', key: 'UAE(+971)'},
        {value: '+1', key: 'USA(+1)'},
        {value: '+44', key: 'UK(+44)'},
        {value: '+81', key: 'Japan(+81)'},
        {value: '+49', key: 'Germany(+49)'},
        {value: '+86', key: 'China(+86)'},
        {value: '+7', key: 'Russia(+7)'}
    ];


    userCanSavePasswordOptions = [
        {value: '0', key: 'Disabled'},
        {value: '1', key: 'Ask user'},
        {value: '2', key: 'Always'}
    ];

    isEnabledOptions = [
        {value: true, key: 'True'},
        {value: false, key: 'False'}
    ];
    successMessage = '';

    roles: Role[];
    role: Role = new Role();

    constructor(private auth: AuthenticationService,
                private _usersService: UsersService,
                private  _rolesService: RolesService,
                private _router: Router ,
                private messageService:MessageAreaService,
                private titleService: Title,
                private _refreshService:RefreshService)
    {
        this.createuser = this.getNewUser();
    }
    //add title on browser's tab
    public setTitle( newTitle: string) {
        this.titleService.setTitle( newTitle );
    }

    private getNewUser(): CreateUserRequest {
        let user: CreateUserRequest = new CreateUserRequest();
        user.CanSavePassword = '0';
        user.CountryCode = '+91';
        return user;
    }

    openModal(){
        $("#openModalButton").click();
    }

    getRoles() {
        this._rolesService.getRoles().subscribe((x) => {
            this.roles = x;
            //to show organization id by default
            if (this.auth.tokenData != null) {
                this.OrganisationId = this.auth.tokenData.organizationId + ".";
            }
            this.createuser = this.getNewUser();
            //generating random password  for New User automatically as soon as he click on add User.
            this.generateRandomPassword();
            this.loadingIndicator = false;
            this.ShowMainDiv=true;
        });
    }

    private typeOfSubmit : string;

    Save() {

        if(this.typeOfSubmit == 'Save') {
            this._usersService.createUser(this.createuser).subscribe(
                (userObj: any) => {
                    console.log(userObj);
                    if (userObj.Success) {
                            this._refreshService.refresh.next(RefreshService.UserType);
                            $("#dismissModalButton").click();
                           /* $("#myModal").removeClass("in");
                            $(".modal-backdrop").remove();
                            $("#myModal").remove();*/
                            this._router.navigate(['/home/users/list']);
                        this.messageService.addMessage(MessageAreaMessageType.SUCCESS, "User Created Successfully");


                    }
                    else {
                        this.messageService.addSingleMessage(MessageAreaMessageType.ERROR, userObj.Message);
                    }
                },
                error => {
                    this.messageService.addSingleMessage(MessageAreaMessageType.ERROR,"Unable to Create User.");
                }
            )
        }else {
            this._usersService.createUser(this.createuser).subscribe(
                (userObj: any) => {
                    console.log(userObj);
                    if (userObj.Success) {
                        this.messageService.addMessage(MessageAreaMessageType.SUCCESS, "User Created Successfully");
                        this._refreshService.refresh.next(RefreshService.UserType);
                        this.createuser = new CreateUserRequest();
                    }
                    else {
                        this.messageService.addSingleMessage(MessageAreaMessageType.ERROR, userObj.Message);
                    }
                },
                error => {
                    this.messageService.addSingleMessage(MessageAreaMessageType.ERROR, "Unable to Create User.");
                }
            )
        }
    }

    cancel(){
        this._router.navigate(['/home/users/list']);
    }
    closeButtonOnModal(){
        this._router.navigate(['/home/users/list']);
    }


    /*
     * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
     *                                                                       *
     * check if there are any roles available for user,                      *
     *                                                                       *
     * if any, then add or remove the role from the assigned role for a user *
     *                                                                       *
     * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
     * */

    ToggleRole(x: Role) {
        if (x == null || this.createuser == null) {
            return;
        }
        if (this.createuser.RoleIds == null) {
            // if there were no roles assigned to user
            this.createuser.RoleIds = [];
        }
        // search for role in roleIds list assigned to user
        var items = this.createuser.RoleIds.findIndex(y => y == x.RoleId);
        if (items == -1) {
            //"Role assigned to user "
            this.createuser.RoleIds.push(x.RoleId);
        }
        else {
            //"Role un assigned to user"
            this.createuser.RoleIds.splice(items, 1);
        }
    }

    IsRoleSelected(x: Role): boolean {
        //  is the role assigned to current user or not
        if (x == null || this.createuser == null || this.createuser.RoleIds == null) {
            return false;
        }
        let item: any = this.createuser.RoleIds.findIndex(y => y == x.RoleId);
        return item !== -1;
    }

    //Text to be shown "Hide/Show"
    showHideText: string = "Show Password";
    //Control Which input type is to be shown
    showPassword: boolean = false;
    //Method for Generating Random Number
    generateRandomPassword() {
        var randomPassword = Math.random().toString(36).slice(-8);
        this.createuser.LoginPassword = randomPassword;
    }

    //Method that fires on Checkbox value. Whether to show Password or not.
    showHidePassword() {
        this.showPassword = !this.showPassword;
        this.showHideText = this.showHideText == "Show Password" ? this.showHideText = "Hide Password" : this.showHideText = "Show Password";
    }
    checkLoginIdAvailable(loginId)
    {
        if(loginId==null || loginId=="")
        {
            this.LoginAvailabilityText="";
            return;
        }
        let checkLoginAvailability=new CheckLoginIdRequest();
        checkLoginAvailability.LoginId=loginId;
        this._usersService.checkLoginAvailability(checkLoginAvailability).subscribe(
            (result:any)=>
            {
                if(result.Available ||!result.Available)
                {
                    this.LoginAvailabilityText=result.Message;
                }
            });
    }

    closeModal(){
        $("#dismissModalButton").click();
        this._router.navigate(['/home/users/list']);
    }
    KeyUpp(event)
    {
        if(event.keyCode==27)
        {
            this.closeModal();
        }
    }

}
