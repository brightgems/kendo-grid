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
var UsersListComponent = (function () {
    function UsersListComponent(_usersService, _router, messageService, titleService) {
        this._usersService = _usersService;
        this._router = _router;
        this.messageService = messageService;
        this.titleService = titleService;
    }
    UsersListComponent.prototype.ngOnInit = function () {
        this.getUsers();
        this.titleService.setTitle("MobilizeOn-Users");
    };
    //add title on browser's tab
    UsersListComponent.prototype.setTitle = function (newTitle) {
        this.titleService.setTitle(newTitle);
    };
    UsersListComponent.prototype.getUsers = function () {
        var _this = this;
        this._usersService.getUsers().subscribe(function (userResponse) {
            console.log(userResponse);
            _this.Users = userResponse;
            _this.SaveUserListToLocal(_this.Users);
        });
    };
    UsersListComponent.prototype.deleteUserClick = function (a) {
        var _this = this;
        if (confirm("Are you sure you want to disable " + a.Name + "?")) {
            var index_1 = this.Users.indexOf(a);
            // Here, with the splice method, we remove 1 object
            // at the given index.
            var deleteUserRequest = new createuser_model_1.DeleteUserRequest();
            deleteUserRequest.UserId = a.UserId;
            this._usersService.deleteUser(deleteUserRequest)
                .subscribe(function (result) {
                if (result.Success) {
                    _this.Users.splice(index_1, 1);
                    _this.messageService.addMessage(message_area_service_1.MessageAreaMessageType.SUCCESS, "User Disabled Successfully!!!");
                }
                else {
                    console.log(result);
                    _this.messageService.addMessage(message_area_service_1.MessageAreaMessageType.ERROR, "Unable to disable User.");
                }
            });
        }
    };
    UsersListComponent.prototype.editUserClick = function (user) {
        var redirect = '/home/users/list/edit';
        this._router.navigate([redirect, user.UserId]);
    };
    UsersListComponent.prototype.detailUserClick = function (user) {
        var redirect = '/home/users/list/detail';
        this._router.navigate([redirect, user.UserId]);
    };
    UsersListComponent.prototype.resetUserClick = function (user) {
        var redirect = '/home/users/list/reset';
        this._router.navigate([redirect, user.UserId]);
    };
    UsersListComponent.prototype.AddUser = function () {
        // let redirect = '/home/users/create';
        // let redirect = 'home/users/list/(popup:create)';
        // Redirect the user
        // this._router.navigate([redirect]);
        this._router.navigate([{ outlets: { 'popup': ['home/users/list/create'] } }]);
    };
    UsersListComponent.prototype.SaveUserListToLocal = function (UsersData) {
        localStorage.setItem("UsersData", JSON.stringify(UsersData));
    };
    UsersListComponent.prototype.ShowDisabledUser = function () {
        var redirect = '/home/users/list/disable';
        this._router.navigate([redirect]);
    };
    UsersListComponent = __decorate([
        core_1.Component({
            templateUrl: '/app/users/usersList.component.html'
        })
    ], UsersListComponent);
    return UsersListComponent;
}());
exports.UsersListComponent = UsersListComponent;
//# sourceMappingURL=usersList.component.js.map