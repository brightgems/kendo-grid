import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from "../services/authGuard.service";
import {ChangePasswordComponent} from "./change-password.component";
const changePasswordRoute: Routes = [
    {
        path: "", component: ChangePasswordComponent,
        children: [


        ]
    }];

@NgModule({
    imports: [
        RouterModule.forChild(changePasswordRoute)
    ],
    exports: [
        RouterModule
    ],
    providers: [
        AuthGuard

    ]
})
export class ChangePasswordRoutingModule {}