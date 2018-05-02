"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
require('rxjs/add/operator/map');
var DisableUserListComponent = (function () {
    function DisableUserListComponent(_usersService, _router) {
        this._usersService = _usersService;
        this._router = _router;
    }
    DisableUserListComponent.prototype.ngOnInit = function () {
        this.getDisableUser();
    };
    DisableUserListComponent.prototype.getDisableUser = function () {
        var _this = this;
        this._usersService.getDisabledUsers().subscribe(function (result) {
            _this.Users = result;
            _this.SaveDisabledUsersToLocal(_this.Users);
        });
    };
    DisableUserListComponent.prototype.SaveDisabledUsersToLocal = function (users) {
        localStorage.setItem("DisableUserData", JSON.stringify(users));
    };
    DisableUserListComponent.prototype.editUserClick = function (user) {
        var redirect = '/home/users/list/edit';
        this._router.navigate([redirect, user.UserId]);
    };
    DisableUserListComponent.prototype.newUserClick = function () {
        var redirect = '/home/users/list/create';
        // Redirect the user
        this._router.navigate([redirect]);
    };
    DisableUserListComponent.prototype.enableUsersClick = function () {
        var redirect = 'home/users/list';
        this._router.navigate([redirect]);
    };
    DisableUserListComponent.prototype.detailUserClick = function (user) {
        var redirect = '/home/users/list/detail';
        this._router.navigate([redirect, user.UserId]);
    };
    DisableUserListComponent = __decorate([
        core_1.Component({
            templateUrl: '/app/users/disable-user-list.component.html'
        })
    ], DisableUserListComponent);
    return DisableUserListComponent;
}());
exports.DisableUserListComponent = DisableUserListComponent;
//# sourceMappingURL=disable-user.component.js.map