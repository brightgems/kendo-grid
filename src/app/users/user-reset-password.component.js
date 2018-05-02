"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
require('rxjs/add/operator/map');
var createuser_model_1 = require("../Models/createuser.model");
var message_area_service_1 = require("../message-area/message-area.service");
var ResetPasswordComponent = (function () {
    function ResetPasswordComponent(_usersService, _route, messageService, titleService, _router, location) {
        this._usersService = _usersService;
        this._route = _route;
        this.messageService = messageService;
        this.titleService = titleService;
        this._router = _router;
        this.location = location;
        this.successMessage = '';
        this.ShowMainDiv = false;
        this.resetPasswordReq = new createuser_model_1.ResetPasswordRequest();
        this.resetPasswordReq.SendMail = true;
    }
    ResetPasswordComponent.prototype.ngOnInit = function () {
        var _this = this;
        //subscribing the routing parameter and getting id from it
        this.sub = this._route.params.subscribe(function (params) {
            // (+) converts string 'id' to a number
            _this.id = +params['id'];
            _this.getUserById(_this.id);
        });
        //add title on browser's tab
        this.titleService.setTitle("MobilizeOn-User Reset Password");
    };
    ResetPasswordComponent.prototype.setTitle = function (newTitle) {
        this.titleService.setTitle(newTitle);
    };
    ResetPasswordComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    ResetPasswordComponent.prototype.resetUserClick = function (user) {
        //getting admin email
        this.getAdminEmail();
        console.log(user);
        this.resetUser = user;
    };
    ResetPasswordComponent.prototype.Submit = function () {
        var _this = this;
        this.resetPasswordReq.UserId = this.resetUser.UserId;
        this._usersService.resetUserPassword(this.resetPasswordReq).subscribe(function (result) {
            if (result.Success) {
                _this.messageService.addMessage(message_area_service_1.MessageAreaMessageType.SUCCESS, result.Message + " " + "New Password is : " + result.NewPassword);
                // navigate to userList component after reset password success.
                _this._router.navigate(['/home/users/list']);
                // clears browser history so they can't navigate with back button
                _this.location.replaceState('/home/users/list');
            }
            else {
                _this.messageService.addMessage(message_area_service_1.MessageAreaMessageType.ERROR, result.Message);
            }
        });
    };
    //Fetching admin email
    ResetPasswordComponent.prototype.getAdminEmail = function () {
        var _this = this;
        this._usersService.getAdminEmail().subscribe(function (result) {
            //check whether result is not null
            if (result != null) {
                //check whether result was success or not
                if (result.Success) {
                    //check whether user is not null
                    if (result.User != null) {
                        //assgining email id.
                        _this.resetPasswordReq.MailsTo = result.User.Email;
                    }
                }
            }
            _this.ShowMainDiv = true;
        });
    };
    ResetPasswordComponent.prototype.getUserById = function (id) {
        var users = JSON.parse(localStorage.getItem("UsersData"));
        var user = users.filter(function (x) { return x.UserId == id; })[0];
        this.resetUserClick(user);
        console.log(user);
    };
    ResetPasswordComponent = __decorate([
        core_1.Component({
            templateUrl: '/app/users/user-reset-password.component.html'
        })
    ], ResetPasswordComponent);
    return ResetPasswordComponent;
}());
exports.ResetPasswordComponent = ResetPasswordComponent;
//# sourceMappingURL=user-reset-password.component.js.map