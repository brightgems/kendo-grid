"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var rolesList_component_1 = require("./rolesList.component");
var roles_add_component_1 = require("./roles-add.component");
var roles_component_1 = require("./roles.component");
var roles_edit_component_1 = require("./roles-edit.component");
var roles_detail_component_1 = require("./roles-detail.component");
var rolesRoutes = [
    {
        path: "", component: roles_component_1.RolesComponent,
        children: [
            { path: 'roles', component: rolesList_component_1.RolesListComponent },
            { path: 'add', component: roles_add_component_1.RolesAddComponent },
            { path: 'edit/:id', component: roles_edit_component_1.RolesEditComponent },
            { path: 'detail/:id', component: roles_detail_component_1.RolesDetailComponent },
            { path: '', component: rolesList_component_1.RolesListComponent }
        ]
    }];
var RolesRoutingModule = (function () {
    function RolesRoutingModule() {
    }
    RolesRoutingModule = __decorate([
        core_1.NgModule({
            imports: [
                router_1.RouterModule.forChild(rolesRoutes)
            ],
            exports: [
                router_1.RouterModule
            ],
            providers: []
        })
    ], RolesRoutingModule);
    return RolesRoutingModule;
}());
exports.RolesRoutingModule = RolesRoutingModule;
//# sourceMappingURL=roles.routing.module.js.map