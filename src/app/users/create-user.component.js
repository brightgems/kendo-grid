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
var message_area_service_1 = require("../message-area/message-area.service");
var CreateUserComponent = (function () {
    function CreateUserComponent(auth, _usersService, _rolesService, _router, messageService, titleService) {
        this.auth = auth;
        this._usersService = _usersService;
        this._rolesService = _rolesService;
        this._router = _router;
        this.messageService = messageService;
        this.titleService = titleService;
        this.ShowMainDiv = false;
        this.LoginAvailabilityText = "";
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
            { value: '0', key: 'Disabled' },
            { value: '1', key: 'Ask user' },
            { value: '2', key: 'Always' }
        ];
        this.isEnabledOptions = [
            { value: true, key: 'True' },
            { value: false, key: 'False' }
        ];
        this.successMessage = '';
        this.role = new role_model_1.Role();
        //Text to be shown "Hide/Show"
        this.showHideText = "Show Password";
        //Control Which input type is to be shown
        this.showPassword = false;
        this.createuser = this.getNewUser();
    }
    CreateUserComponent.prototype.ngOnInit = function () {
        this.getRoles();
        this.titleService.setTitle("MobilizeOn-New User");
    };
    //add title on browser's tab
    CreateUserComponent.prototype.setTitle = function (newTitle) {
        this.titleService.setTitle(newTitle);
    };
    CreateUserComponent.prototype.getNewUser = function () {
        var user = new createuser_model_1.CreateUserRequest();
        user.CanSavePassword = '0';
        user.CountryCode = '+91';
        return user;
    };
    CreateUserComponent.prototype.getRoles = function () {
        var _this = this;
        this._rolesService.getRoles().subscribe(function (x) {
            _this.roles = x;
            //to show organization id by default
            if (_this.auth.tokenData != null) {
                _this.OrganisationId = _this.auth.tokenData.organizationId + ".";
            }
            _this.createuser = _this.getNewUser();
            //generating random password  for New User automatically as soon as he click on add User.
            _this.generateRandomPassword();
            _this.ShowMainDiv = true;
        });
    };
    CreateUserComponent.prototype.Save = function () {
        var _this = this;
        if (this.typeOfSubmit == 'Save') {
            this._usersService.createUser(this.createuser).subscribe(function (userObj) {
                console.log(userObj);
                if (userObj.Success) {
                    _this.messageService.addMessage(message_area_service_1.MessageAreaMessageType.SUCCESS, "User Created Successfully");
                    _this._router.navigate(['/home/users/list']);
                }
                else {
                    _this.messageService.addMessage(message_area_service_1.MessageAreaMessageType.ERROR, userObj.Message);
                }
            });
        }
        else {
            this._usersService.createUser(this.createuser).subscribe(function (userObj) {
                console.log(userObj);
                if (userObj.Success) {
                    _this.messageService.addMessage(message_area_service_1.MessageAreaMessageType.SUCCESS, "User Created Successfully");
                    _this.createuser = new createuser_model_1.CreateUserRequest();
                }
                else {
                    _this.messageService.addMessage(message_area_service_1.MessageAreaMessageType.ERROR, userObj.Message);
                }
            });
        }
    };
    CreateUserComponent.prototype.cancel = function () {
        this._router.navigate(['/home/users/list']);
    };
    CreateUserComponent.prototype.closeButtonOnModal = function () {
        this._router.navigate(['/home/users/list']);
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
    CreateUserComponent.prototype.ToggleRole = function (x) {
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
    CreateUserComponent.prototype.IsRoleSelected = function (x) {
        //  is the role assigned to current user or not
        if (x == null || this.createuser == null || this.createuser.RoleIds == null) {
            return false;
        }
        var item = this.createuser.RoleIds.findIndex(function (y) { return y == x.RoleId; });
        return item !== -1;
    };
    //Method for Generating Random Number
    CreateUserComponent.prototype.generateRandomPassword = function () {
        var randomPassword = Math.random().toString(36).slice(-8);
        this.createuser.LoginPassword = randomPassword;
    };
    //Method that fires on Checkbox value. Whether to show Password or not.
    CreateUserComponent.prototype.showHidePassword = function () {
        this.showPassword = !this.showPassword;
        this.showHideText = this.showHideText == "Show Password" ? this.showHideText = "Hide Password" : this.showHideText = "Show Password";
    };
    CreateUserComponent.prototype.checkLoginIdAvailable = function (loginId) {
        var _this = this;
        if (loginId == null || loginId == "") {
            this.LoginAvailabilityText = "";
            return;
        }
        var checkLoginAvailability = new createuser_model_1.CheckLoginIdRequest();
        checkLoginAvailability.LoginId = loginId;
        this._usersService.checkLoginAvailability(checkLoginAvailability).subscribe(function (result) {
            if (result.Available || !result.Available) {
                _this.LoginAvailabilityText = result.Message;
            }
        });
    };
    CreateUserComponent.prototype.closeModal = function () {
        this._router.navigate(['/home/users/list']);
    };
    CreateUserComponent = __decorate([
        core_1.Component({
            templateUrl: '/app/users/create-user.component.html'
        })
    ], CreateUserComponent);
    return CreateUserComponent;
}());
exports.CreateUserComponent = CreateUserComponent;
//# sourceMappingURL=create-user.component.js.map