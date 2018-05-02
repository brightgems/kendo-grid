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
var RolesDetailComponent = (function () {
    function RolesDetailComponent(_rolesService, _userFormsService, _userReportService, _route, _router, titleService) {
        this._rolesService = _rolesService;
        this._userFormsService = _userFormsService;
        this._userReportService = _userReportService;
        this._route = _route;
        this._router = _router;
        this.titleService = titleService;
        this.roles = [];
        this.role = new role_model_1.Role();
        this.ShowMainDiv = false;
    }
    RolesDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this._route.params.subscribe(function (params) {
            // (+) converts string 'id' to a number
            _this.id = +params['id'];
            _this.getRoleById(_this.id);
        });
        this.titleService.setTitle("MobilizeOn-Role Detail");
    };
    //add title on browser's tab
    RolesDetailComponent.prototype.setTitle = function (newTitle) {
        this.titleService.setTitle(newTitle);
    };
    RolesDetailComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    RolesDetailComponent.prototype.UpdateRoleOnClick = function () {
        var _this = this;
        this._rolesService.updateRole(this.role).subscribe(function (x) {
            console.log(x);
            if (x.Success) {
                _this._router.navigate(['/home/roles']);
            }
        });
    };
    /*

     updateCheckedOptions(option, event) {
     alert(option);
     }
     */
    RolesDetailComponent.prototype.updateRoles = function (role) {
        var _this = this;
        this._userReportService.getUserReports().subscribe(function (result) {
            // all available reports
            _this.Reports = result;
        });
        this._userFormsService.getUserForms().subscribe(function (result) {
            _this.Forms = result.Forms.filter(function (x) { return x != null && x.FormType == "MobiForm"; }); //all mobiforms
            _this.role = role;
            _this.ShowMainDiv = true;
        });
    };
    RolesDetailComponent.prototype.ToggleForm = function (x) {
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
            this.role.Forms.push(x);
        }
        else {
            //"Role un assigned to user"
            this.role.Forms.splice(index, 1);
        }
    };
    RolesDetailComponent.prototype.IsFormSelected = function (x) {
        //  is the role assigned to current user or not
        if (x == null || this.role == null || this.role.Forms == null) {
            return false;
        }
        var item = this.role.Forms.findIndex(function (y) { return y == x.FormName; });
        return item !== -1;
    };
    RolesDetailComponent.prototype.getRoleById = function (id) {
        var roles = JSON.parse(localStorage.getItem("RolesData"));
        var role = roles.filter(function (x) { return x.RoleId == id; })[0];
        this.updateRoles(role);
        console.log(role);
    };
    RolesDetailComponent.prototype.ToggleReport = function (x) {
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
    RolesDetailComponent.prototype.IsReportSelected = function (x) {
        //  is the role assigned to current user or not
        if (x == null || this.role == null || this.role.Reports == null) {
            return false;
        }
        var item = this.role.Reports.findIndex(function (y) { return y == x.Name; });
        return item !== -1;
    };
    RolesDetailComponent.prototype.EditRoleOnClick = function (role) {
        {
            var redirect = '/home/roles/edit';
            this._router.navigate([redirect, role.RoleId]);
        }
    };
    RolesDetailComponent = __decorate([
        core_1.Component({
            templateUrl: '/app/roles/roles-detail.component.html',
            providers: []
        })
    ], RolesDetailComponent);
    return RolesDetailComponent;
}());
exports.RolesDetailComponent = RolesDetailComponent;
//# sourceMappingURL=roles-detail.component.js.map