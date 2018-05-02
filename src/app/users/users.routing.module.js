"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var usersList_component_1 = require('./usersList.component');
var authGuard_service_1 = require("../services/authGuard.service");
var create_user_component_1 = require("./create-user.component");
var users_component_1 = require("./users.component");
var user_reset_password_component_1 = require("./user-reset-password.component");
var usersedit_componet_1 = require("./usersedit.componet");
var users_detail_component_1 = require("./users-detail.component");
var disable_user_component_1 = require("./disable-user.component");
var userRoutes = [
    {
        path: "list", component: users_component_1.UsersComponent,
        children: [
            { path: "create", outlet: 'popup', component: create_user_component_1.CreateUserComponent },
            { path: "reset/:id", component: user_reset_password_component_1.ResetPasswordComponent },
            { path: "edit/:id", component: usersedit_componet_1.UsersEditComponent },
            { path: "detail/:id", component: users_detail_component_1.UsersDetailComponent },
            { path: "disable", component: disable_user_component_1.DisableUserListComponent },
            { path: '', component: usersList_component_1.UsersListComponent },
        ]
    }
];
var UsersRoutingModule = (function () {
    function UsersRoutingModule() {
    }
    UsersRoutingModule = __decorate([
        core_1.NgModule({
            imports: [
                router_1.RouterModule.forChild(userRoutes)
            ],
            exports: [
                router_1.RouterModule
            ],
            providers: [
                authGuard_service_1.AuthGuard
            ]
        })
    ], UsersRoutingModule);
    return UsersRoutingModule;
}());
exports.UsersRoutingModule = UsersRoutingModule;
//# sourceMappingURL=users.routing.module.js.map