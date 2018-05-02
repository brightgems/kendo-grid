"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var RolesService = (function () {
    function RolesService(_httpService) {
        this._httpService = _httpService;
    }
    RolesService.prototype.getRoles = function () {
        var _this = this;
        //  Makes a http get call to get roles in organization...
        return this._httpService.Get("OrganizationRoles").map(function (x) {
            if (x.Success) {
                return _this.readRoles(x.Message);
            }
            else {
                return _this.readRoles(null);
            }
        });
    };
    RolesService.prototype.readRoles = function (result) {
        // read result if result has list of roles or not
        // set roles as result.Roles or null
        if (result != null && result.Roles != null) {
            this.roles = result.Roles;
        }
        else {
            this.roles = null;
        }
        return this.roles;
    };
    RolesService.prototype.createRole = function (role) {
        //  Makes a http get call to get roles in organization...
        return this._httpService.Post("OrganizationRoles", role).map(function (x) {
            if (x.Success) {
                return x.Message;
            }
            else {
                return x.Message;
            }
        });
    };
    RolesService.prototype.updateRole = function (role) {
        //  Makes a http get call to get roles in organization...
        return this._httpService.Post("UpdateRole", role).map(function (x) {
            if (x.Success) {
                return x.Message;
            }
            else {
                return x.Message;
            }
        });
    };
    RolesService.prototype.deleteRole = function (role) {
        //  Makes a http get call to get roles in organization...
        return this._httpService.Post("DeleteRole", role).map(function (x) {
            if (x.Success) {
                return x.Message;
            }
            else {
                return x.Message;
            }
        });
    };
    RolesService = __decorate([
        core_1.Injectable()
    ], RolesService);
    return RolesService;
}());
exports.RolesService = RolesService;
//# sourceMappingURL=roles.service.js.map