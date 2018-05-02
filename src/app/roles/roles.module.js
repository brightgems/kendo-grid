"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var forms_1 = require('@angular/forms');
var http_1 = require('@angular/http');
var users_service_1 = require("../services/users.service");
var roles_service_1 = require("../services/roles.service");
var userForms_service_1 = require("../services/userForms.service");
var roles_routing_module_1 = require('./roles.routing.module');
var roles_component_1 = require("./roles.component");
var rolesList_component_1 = require("./rolesList.component");
var roles_add_component_1 = require("./roles-add.component");
var roles_edit_component_1 = require("./roles-edit.component");
var user_reports_services_1 = require("../services/user-reports.services");
var roles_detail_component_1 = require("./roles-detail.component");
var RolesModule = (function () {
    function RolesModule() {
    }
    RolesModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                http_1.HttpModule,
                http_1.JsonpModule,
                roles_routing_module_1.RolesRoutingModule
            ],
            declarations: [
                rolesList_component_1.RolesListComponent, roles_component_1.RolesComponent, roles_add_component_1.RolesAddComponent, roles_edit_component_1.RolesEditComponent, roles_detail_component_1.RolesDetailComponent
            ],
            providers: [roles_service_1.RolesService, userForms_service_1.UserFormsService, users_service_1.UsersService, user_reports_services_1.UserReportsService]
        })
    ], RolesModule);
    return RolesModule;
}());
exports.RolesModule = RolesModule;
//# sourceMappingURL=roles.module.js.map