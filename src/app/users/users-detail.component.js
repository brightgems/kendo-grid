"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var role_model_1 = require("../Models/role.model");
require('rxjs/add/operator/map');
var createuser_model_1 = require("../Models/createuser.model");
var UsersDetailComponent = (function () {
    function UsersDetailComponent(_usersService, _rolesService, _router, _route, titleService) {
        this._usersService = _usersService;
        this._rolesService = _rolesService;
        this._router = _router;
        this._route = _route;
        this.titleService = titleService;
        this.CountryCallingCodes = [
            { value: '+91', key: 'India(+91)' },
            { value: '+971', key: 'UAE(+971)' },
            { value: '+1', key: 'USA(+1)' },
            { value: '+44', key: 'UK(+44)' },
            { value: '+81', key: 'Japan(+81)' },
            { value: '+49', key: 'Germany(+49)' },
            { value: '+86', key: 'China(+86)' },
            { value: '+7', key: 'Russia(+7)' }
        ];
        this.userCanSavePasswordOptions = [
            { value: "0", key: 'Disabled' },
            { value: "1", key: 'Ask user' },
            { value: "2", key: 'Always' }
        ];
        this.isEnabledOptions = [
            { value: true, key: 'True' },
            { value: false, key: 'False' }
        ];
        this.successMessage = '';
        this.role = new role_model_1.Role();
        //Hiding Main div until the data is populated
        this.ShowMainDiv = false;
        this.createuser = new createuser_model_1.CreateUserRequest();
    }
    UsersDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        //subscribing the routing parameter and getting id from it
        this.sub = this._route.params.subscribe(function (params) {
            // (+) converts string 'id' to a number
            _this.id = +params['id'];
            _this.getUserById(_this.id);
        });
        this.titleService.setTitle("MobilizeOn-User Detail");
    };
    //add title on browser's tab
    UsersDetailComponent.prototype.setTitle = function (newTitle) {
        this.titleService.setTitle(newTitle);
    };
    UsersDetailComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    /*
     * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
     *                                                                       *
     * check if there are any roles available for user,                      *
     *                                                                       *
     * if any, then add or remove the role from the assigned role for a user *
     *                                                                       *
     * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
     * */
    UsersDetailComponent.prototype.ToggleRole = function (x) {
        if (x == null || this.createuser == null) {
            return;
        }
        if (this.createuser.RoleIds == null) {
            // if there were no roles assigned to user
            this.createuser.RoleIds = [];
        }
        // search for role in roleIds list assigned to user
        var items = this.createuser.RoleIds.findIndex(function (y) { return y == x.RoleId; });
        if (items == -1) {
            //"Role assigned to user "
            this.createuser.RoleIds.push(x.RoleId);
        }
        else {
            //"Role un assigned to user"
            this.createuser.RoleIds.splice(items, 1);
        }
    };
    UsersDetailComponent.prototype.IsRoleSelected = function (x) {
        //  is the role assigned to current user or not
        if (x == null || this.createuser == null || this.createuser.RoleIds == null) {
            return false;
        }
        var item = this.createuser.RoleIds.findIndex(function (y) { return y == x.RoleId; });
        return item !== -1;
    };
    UsersDetailComponent.prototype.LoadUserForEdit = function (current) {
        var user = current;
        user.RoleIds = [];
        if (current != null && current.Roles != null) {
            current.Roles.forEach(function (val, idx, arr) {
                user.RoleIds.push(val.RoleId);
            });
        }
        return user;
    };
    UsersDetailComponent.prototype.updateUser = function (user) {
        var _this = this;
        this._rolesService.getRoles().subscribe(function (x) {
            _this.roles = x;
            _this.createuser = _this.LoadUserForEdit(user);
            //Showing main div once all data is populated in the controls
            _this.ShowMainDiv = true;
            console.log("createuser:" + _this.createuser);
        });
    };
    UsersDetailComponent.prototype.SaveUpdatedData = function () {
        var _this = this;
        this._usersService.updateUser(this.createuser).subscribe(function (x) {
            if (x.Success) {
                _this._router.navigate(['/home/users/list']);
            }
            console.log(x);
            _this.AddRolesToRoleIds(_this.createuser);
        });
    };
    UsersDetailComponent.prototype.AddRolesToRoleIds = function (user) {
        if (user.RoleIds != null) {
            user.Roles = this.roles.filter(function (val, idx, arr) {
                if (val != null) {
                    var item = user.RoleIds.findIndex(function (y) { return y == val.RoleId; });
                    if (item !== -1) {
                        return true;
                    }
                }
            });
        }
    };
    //getting user by id from list of users present in local storage
    UsersDetailComponent.prototype.getUserById = function (id) {
        var enableUsers = JSON.parse(localStorage.getItem("UsersData"));
        var disableUsers = JSON.parse(localStorage.getItem("DisableUserData"));
        var user;
        //check whether enable user is not null and count is greater than zero
        if (enableUsers != null && enableUsers.length > 0) {
            //if check whether user is present in enabled user
            user = enableUsers.filter(function (x) { return x.UserId == id; })[0];
            //if yes
            if (user != null) {
                this.updateUser(user);
                return;
            }
        }
        //if enable user was null then check in disabled user.
        if (disableUsers != null && disableUsers.length > 0) {
            user = disableUsers.filter(function (x) { return x.UserId == id; })[0];
        }
        this.updateUser(user);
        console.log(user);
    };
    UsersDetailComponent.prototype.editUserClick = function (user) {
        var redirect = '/home/users/list/edit';
        this._router.navigate([redirect, user.UserId]);
    };
    UsersDetailComponent = __decorate([
        core_1.Component({
            templateUrl: '/app/users/users-detail.component.html'
        })
    ], UsersDetailComponent);
    return UsersDetailComponent;
}());
exports.UsersDetailComponent = UsersDetailComponent;
//# sourceMappingURL=users-detail.component.js.map