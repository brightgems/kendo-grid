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
var UsersService = (function () {
    function UsersService(http, auth, _httpService) {
        this.http = http;
        this.auth = auth;
        this._httpService = _httpService;
    }
    //Fetching users
    UsersService.prototype.getUsers = function () {
        var _this = this;
        //add authorization header with jwt token
        var userRequest = new createuser_model_1.GetUsersRequest();
        userRequest.showDisabled = false;
        var jsonString = JSON.stringify(userRequest);
        return this._httpService.Post("GetUsers", jsonString).map(function (x) {
            if (x.Success) {
                return _this.readUsers(x.Message);
            }
            else {
                return _this.readUsers(null);
            }
        });
    };
    //Fetching Disabled User
    UsersService.prototype.getDisabledUsers = function () {
        var _this = this;
        //add authorization header with jwt token
        var userRequest = new createuser_model_1.GetUsersRequest();
        userRequest.showDisabled = true;
        var jsonString = JSON.stringify(userRequest);
        return this._httpService.Post("GetUsers", jsonString).map(function (x) {
            if (x.Success) {
                return _this.readUsers(x.Message);
            }
            else {
                return _this.readUsers(null);
            }
        });
    };
    //Creating New User
    UsersService.prototype.createUser = function (newUser) {
        var jsonString = JSON.stringify(newUser);
        return this._httpService.Post("CreateUser", jsonString).map(function (x) {
            if (x.Success) {
                return x.Message;
            }
            else {
                return x.Message;
            }
        });
    };
    //Updating existing User
    UsersService.prototype.updateUser = function (user) {
        var jsonString = JSON.stringify(user);
        return this._httpService.Post("UpdateUser", jsonString).map(function (x) {
            if (x.Success) {
                return x.Message;
            }
            else {
                return x.Message;
            }
        });
    };
    //check login availability
    UsersService.prototype.checkLoginAvailability = function (checkLoginIdAvailabilityRequest) {
        var jsonString = JSON.stringify(checkLoginIdAvailabilityRequest);
        return this._httpService.Post("CheckLoginId", jsonString).map(function (x) {
            if (x.Success) {
                return x.Message;
            }
            else {
                return x.Message;
            }
        });
    };
    //Deleting User
    UsersService.prototype.deleteUser = function (user) {
        var requestData = JSON.stringify(user);
        return this._httpService.Post("DeleteUser", requestData).map(function (x) {
            if (x.Success) {
                return x.Message;
            }
            else {
                return x.Message;
            }
        });
    };
    //Reset User Password
    UsersService.prototype.resetUserPassword = function (resetRequest) {
        var requestData = JSON.stringify(resetRequest);
        return this._httpService.Post("ResetPassword", requestData).map(function (x) {
            if (x.Success) {
                return x.Message;
            }
            else {
                return x.Message;
            }
        });
    };
    //method for fetching admin email
    UsersService.prototype.getAdminEmail = function () {
        return this._httpService.Get("GetCurrentUserInfo").map(function (x) {
            return x.Message;
        });
    };
    UsersService.prototype.readUsers = function (result) {
        // read result if result has list of users or not
        // set users as result.users or null
        if (result != null && result.Users != null) {
            this.users = result.Users;
        }
        else {
            this.users = null;
        }
        return this.users;
    };
    UsersService = __decorate([
        core_1.Injectable()
    ], UsersService);
    return UsersService;
}());
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map