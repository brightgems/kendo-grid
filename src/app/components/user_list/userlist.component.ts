import { Component } from '@angular/core';
import {UsersService} from "../../services/users.service";
import {RolesService} from "../../services/roles.service";
import {Role} from "../../Models/role.model";
import 'rxjs/add/operator/map';
import {
    DeleteUserRequest, CreateUserRequest, UpdateUserRequest,
    ResetPasswordRequest
} from "../../Models/createuser.model";
import {AuthenticationService} from "../../services/authentication.service";

@Component({
    moduleId: module.id,
    selector: 'userlist',
    templateUrl : 'userlist.component.html',
    providers:[]

})

export class UserlistComponent {
    createuser: CreateUserRequest;
    OrganisationId: string;
    x: any;
    getuser: boolean = true;
    adduser: boolean = false;
    enableResetPasswordDiv: boolean = false;

    CountryCallingCodes = [
        {value: '+91', key: 'India(+91)'},
        {value: '+971',key: 'UAE(+971)'},
        {value: '+1', key: 'USA(+1)'},
        {value: '+44', key: 'UK(+44)'},
        {value: '+81', key: 'Japan(+81)'},
        {value: '+49', key: 'Germany(+49)'},
        {value: '+86', key: 'China(+86)'},
        {value: '+7', key: 'Russia(+7)'}
    ];


    userCanSavePasswordOptions = [
        { value: "0", key: 'Disabled' },
        { value: "1", key: 'Ask user' },
        { value: "2", key: 'Always' }
    ];


    Users: any;
    resetUser: any;
    updateUserInitialHide: boolean = false;
    resetPasswordReq: ResetPasswordRequest;
    hideThisDiv: boolean = true;
    successMessage = '';

    roles: Role[];
    role: Role = new Role();

    constructor(private authService: AuthenticationService, private _usersService: UsersService, private  _rolesService: RolesService) {

        this.createuser = new CreateUserRequest();
        this.resetPasswordReq = new ResetPasswordRequest();
        this.resetPasswordReq.SendMail = true;
    }


    getUsers(): void {
        this.getuser = true;
        this.adduser = false;
        this.enableResetPasswordDiv = false;
        this._usersService.getUsers().subscribe((userResponse: any)=> {
            console.log(userResponse);
            this.Users = userResponse;
        });
    }


    AddUser() {
        this._rolesService.getRoles().subscribe((x)=> {
            this.roles = x;
            //to show organization id by default
            if (this.authService.tokenData != null) {
                this.OrganisationId = this.authService.tokenData.organizationId + ".";
            }
            this.createuser = new CreateUserRequest();
            this.getuser = false;
            this.adduser = true;
            this.updateUserInitialHide = false;
        });
    }


    Save() {
        this._usersService.createUser(this.createuser).subscribe(
            (userObj: any)=> {
                this.AddRolesToRoleIds(this.createuser);
                console.log(userObj);
                alert(userObj.Message);
            }
        )
    }


    deleteUser(a) {
        if (confirm("Are you sure you want to delete " + a.Name + "?")) {
            var index = this.Users.indexOf(a)
            // Here, with the splice method, we remove 1 object
            // at the given index.

            let deleteUserRequest: DeleteUserRequest = new DeleteUserRequest();
            deleteUserRequest.UserId = a.UserId;
            this._usersService.deleteUser(deleteUserRequest)
                .subscribe((result: any)=> {
                    if (result.Success) {
                        this.Users.splice(index, 1);
                    }
                    else {
                        console.log(result);
                    }
                    alert(result.Message);
                });
        }
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

    updateUser(a) {
        this._rolesService.getRoles().subscribe((x)=> {
            this.roles = x;
            this.createuser = this.LoadUserForEdit(a);
            this.updateUserInitialHide = true;
        });
    }

    SaveUpdatedData() {
        this._usersService.updateUser(this.createuser).subscribe((x)=> {
                console.log(x);
                this.AddRolesToRoleIds(this.createuser);
            }
        );
    }



    resetUserObject:ResetPasswordRequest;
    resetUserClick(a)
    {
        this.enableResetPasswordDiv=true;
        this.getuser = false;
        console.log(a);
        this.resetUser = a;
    }
    Submit(){
        this.resetPasswordReq.UserId=this.resetUser.UserId;
        this._usersService.resetUserPassword(this.resetPasswordReq).subscribe(
            (result:any)=>
            {
                if(result.Success)
                {
                    this.hideThisDiv = false;
                    this.successMessage = result.Message + " " + "New Password:"+result.NewPassword;

                }
            });

    }
    AddRolesToRoleIds(user: CreateUserRequest) {
        if (user.RoleIds != null) {
            user.Roles = this.roles.filter((val, idx, arr)=> {
                if (val != null) {
                    let item: number = user.RoleIds.findIndex(y=>y == val.RoleId);
                    if (item !== -1) {
                        return val;
                    }
                }
            })
        }
    }
}
