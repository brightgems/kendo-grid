import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RolesListComponent} from "./rolesList.component";
import { RolesAddComponent } from "./roles-add.component";
import {RolesComponent} from "./roles.component";
import {RolesEditComponent} from "./roles-edit.component";
import {RolesDetailComponent} from "./roles-detail.component";

const rolesRoutes: Routes = [
    {
        path: "list", component : RolesComponent,
        children: [
            { path: 'add' , outlet:'rolesPopup',component : RolesAddComponent },
            { path: 'edit/:id' ,outlet:'editRole', component : RolesEditComponent },
            { path: 'detail/:id' , outlet:'detailRole',component : RolesDetailComponent },
            { path: '', component: RolesListComponent }

        ]
    }];

@NgModule({
    imports: [
        RouterModule.forChild(rolesRoutes)
    ],
    exports: [
        RouterModule
    ],
    providers: []
})

export class RolesRoutingModule {}