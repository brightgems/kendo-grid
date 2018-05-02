"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
require('rxjs/add/operator/map');
var message_area_service_1 = require("../message-area/message-area.service");
var RolesListComponent = (function () {
    function RolesListComponent(_usersService, _rolesService, _userFormsService, _router, messageService, titleService) {
        this._usersService = _usersService;
        this._rolesService = _rolesService;
        this._userFormsService = _userFormsService;
        this._router = _router;
        this.messageService = messageService;
        this.titleService = titleService;
    }
    RolesListComponent.prototype.ngOnInit = function () {
        this.getRolesFromServer();
        this.titleService.setTitle("MobilizeOn-Roles");
    };
    //add title on browser's tab
    RolesListComponent.prototype.setTitle = function (newTitle) {
        this.titleService.setTitle(newTitle);
    };
    RolesListComponent.prototype.getRolesFromServer = function () {
        var _this = this;
        this._rolesService.getRoles().subscribe(function (result) {
            _this.roles = result;
            _this.StoreRolesToLocalStorage(_this.roles);
        });
    };
    RolesListComponent.prototype.NavigateToAddRole = function () {
        // this._userFormsService.getUserForms().subscribe((result: any)=> {
        //
        //     this.Forms = result.Forms.filter(x=>x.FormType == "MobiForm");//all mobiforms
        // });
        var redirect = '/home/roles/add';
        this._router.navigate([redirect]);
    };
    RolesListComponent.prototype.StoreRolesToLocalStorage = function (roles) {
        localStorage.setItem("RolesData", JSON.stringify(roles));
    };
    RolesListComponent.prototype.editRoleCLick = function (role) {
        var redirect = '/home/roles/edit';
        this._router.navigate([redirect, role.RoleId]);
    };
    RolesListComponent.prototype.detailRoleCLick = function (role) {
        var redirect = '/home/roles/detail';
        this._router.navigate([redirect, role.RoleId]);
    };
    RolesListComponent.prototype.DeleteRoles = function (role) {
        var _this = this;
        if (confirm("Are you sure you want to delete " + role.RoleName + "?")) {
            var index = this.roles.indexOf(role);
            this._rolesService.deleteRole(role)
                .subscribe(function (result) {
                if (result.Success) {
                    _this.roles.splice(index, 1);
                    _this.messageService.addMessage(message_area_service_1.MessageAreaMessageType.SUCCESS, "Role Deleted!");
                }
                else {
                    console.log(result);
                }
            });
        }
    };
    RolesListComponent.prototype.RefreshRole = function () {
        this.getRolesFromServer();
    };
    RolesListComponent = __decorate([
        core_1.Component({
            selector: "role-list",
            templateUrl: '/app/roles/rolesList.component.html'
        })
    ], RolesListComponent);
    return RolesListComponent;
}());
exports.RolesListComponent = RolesListComponent;
//# sourceMappingURL=rolesList.component.js.map