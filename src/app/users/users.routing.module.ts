import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersListComponent }       from './usersList.component';
import {AuthGuard} from "../services/authGuard.service";
import {CreateUserComponent} from "./create-user.component";
import {UsersComponent} from "./users.component";
import {ResetPasswordComponent} from "./user-reset-password.component";
import {UsersEditComponent} from "./usersedit.componet";
import {UsersDetailComponent } from "./users-detail.component";
import {DisableUserListComponent} from "./disable-user.component";

const userRoutes: Routes = [
    {
        path: "list", component: UsersComponent,
            children: [
            {path:"create", outlet:'popup', component :CreateUserComponent},
            {path:"reset/:id",  component:ResetPasswordComponent},
            {path:"edit/:id", outlet:'editUser',component:UsersEditComponent},
            {path:"detail/:id", outlet:'detailUser',component:UsersDetailComponent},
            {path:"disable",component:DisableUserListComponent},
            {path: '', component: UsersListComponent},
        ]
        }
];

@NgModule({
    imports: [
        RouterModule.forChild(userRoutes)
    ],
    exports: [
        RouterModule
    ],
    providers: [
        AuthGuard

    ]
})
export class UsersRoutingModule {}