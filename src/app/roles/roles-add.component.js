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
var message_area_service_1 = require("../message-area/message-area.service");
var RolesAddComponent = (function () {
    function RolesAddComponent(_rolesService, _userFormsService, _userReportService, _router, messageService, titleService) {
        this._rolesService = _rolesService;
        this._userFormsService = _userFormsService;
        this._userReportService = _userReportService;
        this._router = _router;
        this.messageService = messageService;
        this.titleService = titleService;
        this.roles = [];
        this.role = new role_model_1.Role();
        this.ShowMainDiv = false;
    }
    RolesAddComponent.prototype.ngOnInit = function () {
        this.GetReports();
        this.GetForms();
        this.titleService.setTitle("MobilizeOn-New Role");
    };
    //add title on browser's tab
    RolesAddComponent.prototype.setTitle = function (newTitle) {
        this.titleService.setTitle(newTitle);
    };
    RolesAddComponent.prototype.GetReports = function () {
        var _this = this;
        this._userReportService.getUserReports().subscribe(function (result) {
            // all available reports
            _this.Reports = result;
        });
    };
    RolesAddComponent.prototype.GetForms = function () {
        var _this = this;
        this._userFormsService.getUserForms().subscribe(function (result) {
            _this.Forms = result.Forms.filter(function (x) { return x.FormType == "MobiForm"; }); //all mobiforms
            _this.ShowMainDiv = true;
        });
    };
    RolesAddComponent.prototype.SaveRoles = function () {
        var _this = this;
        if (this.typeOfSubmit == 'SaveRoles') {
            this._rolesService.createRole(this.role).subscribe(function (x) {
                console.log(x);
                if (x.Success) {
                    _this.messageService.addMessage(message_area_service_1.MessageAreaMessageType.SUCCESS, "Role added successfully !!!");
                    _this._router.navigate(['/home/roles']);
                }
                else {
                    _this.messageService.addMessage(message_area_service_1.MessageAreaMessageType.ERROR, x);
                }
                console.log(x);
            });
        }
        else {
            this._rolesService.createRole(this.role).subscribe(function (x) {
                console.log(x);
                if (x.Success) {
                    _this.messageService.addMessage(message_area_service_1.MessageAreaMessageType.SUCCESS, "Role added successfully !!!");
                    _this.role = new role_model_1.Role();
                }
                else {
                    _this.messageService.addMessage(message_area_service_1.MessageAreaMessageType.ERROR, x);
                }
                console.log(x);
            });
        }
    };
    // returning to roles list page
    RolesAddComponent.prototype.cancel = function () {
        this._router.navigate(['/home/roles']);
    };
    ;
    RolesAddComponent.prototype.ToggleForm = function (x) {
        if (x == null || this.role == null) {
            return;
        }
        if (this.role.Forms == null) {
            // if there were no roles assigned to user
            this.role.Forms = [];
        }
        // search for role in roleIds list assigned to user
        var index = this.role.Forms.findIndex(function (y) { return y == x.FormName; });
        if (index == -1) {
            //"Role assigned to user "
            this.role.Forms.push(x.FormName);
        }
        else {
            //"Role un assigned to user"
            this.role.Forms.splice(index, 1);
        }
    };
    RolesAddComponent.prototype.IsFormSelected = function (x) {
        //  is the role assigned to current user or not
        if (x == null || this.role == null || this.role.Forms == null) {
            return false;
        }
        var item = this.role.Forms.findIndex(function (y) { return y == x.FormName; });
        return item !== -1;
    };
    RolesAddComponent.prototype.ToggleReport = function (x) {
        if (x == null || this.role == null) {
            return;
        }
        if (this.role.Reports == null) {
            // if there were no roles assigned to user
            this.role.Reports = [];
        }
        // search for role in roleIds list assigned to user
        var index = this.role.Reports.findIndex(function (y) { return y == x.Name; });
        if (index == -1) {
            //"Role assigned to user "
            this.role.Reports.push(x.Name);
        }
        else {
            //"Role un assigned to user"
            this.role.Reports.splice(index, 1);
        }
    };
    RolesAddComponent.prototype.IsReportSelected = function (x) {
        //  is the role assigned to current user or not
        if (x == null || this.role == null || this.role.Reports == null) {
            return false;
        }
        var item = this.role.Reports.findIndex(function (y) { return y == x.Name; });
        return item !== -1;
    };
    RolesAddComponent = __decorate([
        core_1.Component({
            templateUrl: '/app/roles/roles-add.component.html',
            providers: []
        })
    ], RolesAddComponent);
    return RolesAddComponent;
}());
exports.RolesAddComponent = RolesAddComponent;
//# sourceMappingURL=roles-add.component.js.map