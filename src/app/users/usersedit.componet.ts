import {Component, OnInit} from '@angular/core';
import {UsersService} from "../services/users.service";
import {RolesService} from "../services/roles.service";
import {Role} from "../Models/role.model";
import 'rxjs/add/operator/map';
import {DeleteUserRequest, CreateUserRequest, UpdateUserRequest, ResetPasswordRequest} from "../Models/createuser.model";
import {AuthenticationService} from "../services/authentication.service";
import {NavigationExtras, Router, NavigationEnd, ActivatedRoute} from "@angular/router";
import {MessageAreaService, MessageAreaMessageType} from "../message-area/message-area.service";
import { Title }     from '@angular/platform-browser';
import {RefreshService} from "../services/list.refresh.service";
let $ = require( "jquery");

@Component({
    templateUrl : '/app/users/usersedit.component.html'
})

export class UsersEditComponent implements OnInit {

    createuser: CreateUserRequest;
    x: any;

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
        {value: "0", key: 'Disabled'},
        {value: "1", key: 'Ask user'},
        {value: "2", key: 'Always'}
    ];

    isEnabledOptions = [
        {value: true, key: 'True'},
        {value: false, key: 'False'}
    ];

    successMessage = '';
    roles: Role[];
    role: Role = new Role();
    private sub: any;
    id:any;
    //Hiding Main div until the data is populated
    ShowMainDiv:boolean=false;
    loadingIndicator:boolean = true;

    constructor(private _usersService: UsersService,
                private  _rolesService: RolesService,
                private _router: Router,
                private _route:ActivatedRoute ,
                private messageService:MessageAreaService ,
                private titleService: Title ,
                private _refreshService:RefreshService) {

        this.createuser = new CreateUserRequest();


    }
    ngOnInit(): void
    {
        //subscribing the routing parameter and getting id from it
        this.sub = this._route.params.subscribe(params => {
        // (+) converts string 'id' to a number
            this.id = +params['id'];
            this.getUserById(this.id);
        });

        this.titleService.setTitle("MobilizeOn-User Edit");
        this.openModal();

    }
    //add title on browser's tab
    public setTitle( newTitle: string) {
        this.titleService.setTitle( newTitle );
    }

    ngOnDestroy()
    {
        this.sub.unsubscribe();
    }

    openModal(){
        $("#clickEditUserModal").click();
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
        var items = this.createuser.RoleIds.findIndex(y=>y == x.RoleId);
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
        let item: any = this.createuser.RoleIds.findIndex(y=>y == x.RoleId);
        return item !== -1;
    }

    LoadUserForEdit(current: CreateUserRequest): CreateUserRequest {
        let user = current;
        user.RoleIds = [];
        if (current != null && current.Roles != null) {
            current.Roles.forEach((val, idx, arr)=> {
                user.RoleIds.push(val.RoleId)
            });
        }
        return user;
    }

    updateUser(user) {
        this._rolesService.getRoles().subscribe((x)=> {
            this.loadingIndicator= false;
            this.roles = x;
            this.createuser = this.LoadUserForEdit(user);
            //Showing main div once all data is populated in the controls
            this.ShowMainDiv=true;


            console.log("createuser:"+this.createuser);
        });
    }

    SaveUpdatedData() {
        this._usersService.updateUser(this.createuser).subscribe((x)=>
            {
                if(x.Success)
                {
                    this.AddRolesToRoleIds(this.createuser);
                    this._refreshService.refresh.next(RefreshService.UserType);
                    $("#dismissModalButton").click();
                    this._router.navigate(['/home/users/list']);
                    this.messageService.addMessage(MessageAreaMessageType.SUCCESS,"User Updated Successfully");


                }
                else{
                    this.messageService.addSingleMessage(MessageAreaMessageType.ERROR,"Unable to update record.");
                }
                console.log(x);
            },error =>
            {
                this.messageService.addSingleMessage(MessageAreaMessageType.ERROR,"Unable to update record.");
            }
        );
    }

    AddRolesToRoleIds(user: CreateUserRequest) {
        // to update local users data on success
        if (user.RoleIds != null) {
            user.Roles = this.roles.filter((val:Role, idx, arr:Array<Role>)=> {
                if (val != null) {
                    let item: number = user.RoleIds.findIndex(y=>y == val.RoleId);
                    if (item !== -1) {
                        return true;
                    }
                }
            });
        }
    }

    //getting user by id from list of users present in local storage
    getUserById(id:any)
    {
        let enableUsers=JSON.parse(localStorage.getItem("UsersData"));
        let disableUsers=JSON.parse(localStorage.getItem("DisableUserData"));
        let user;
        //check whether enable user is not null and count is greater than zero
        if(enableUsers!=null && enableUsers.length>0)
        {
            //if check whether user is present in enabled user
             user= enableUsers.filter(x=>x.UserId==id)[0];
            //if yes
            if(user!=null)
            {
                // this.loadingIndicator = false;
                this.updateUser(user);
                return;
            }
        }
                //if enable user was null then check in disabled user.
                if(disableUsers!=null && disableUsers.length>0)
                {
                    user = disableUsers.filter(x=>x.UserId == id)[0];
                }

        this.updateUser(user);
        console.log(user);
    }

    closeButtonOnModal(){
        this._router.navigate(['/home/users/list']);
    }
    closeModalAndHideOverlay()
    {
        $("#dismissModalButton").click();
        this._router.navigate(['/home/users/list']);
    }
    KeyUpp(event)
    {
        if(event.keyCode==27)
        {
            this.closeModalAndHideOverlay();
        }
    }

    IsAdminUser(createuser:CreateUserRequest):boolean{
        return this._usersService.IsAdminUser(createuser);
    }

}
