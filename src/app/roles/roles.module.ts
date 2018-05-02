import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }   from '@angular/forms';
import {HttpModule, JsonpModule, Http} from '@angular/http';
import {UsersService} from "../services/users.service";
import {RolesService} from "../services/roles.service";
import {UserFormsService} from "../services/userForms.service";
import { RolesRoutingModule }       from './roles.routing.module';
import {RolesComponent} from "./roles.component";
import {RolesListComponent} from "./rolesList.component";
import {RolesAddComponent} from "./roles-add.component";
import {RolesEditComponent} from "./roles-edit.component";
import {UserReportsService} from "../services/user-reports.services";
import {RolesDetailComponent} from "./roles-detail.component";
import {MessageAreaModule} from "../message-area/message-area.module";
import {RefreshService} from "../services/list.refresh.service";
import {GridModule} from "@progress/kendo-angular-grid";
import {ButtonsModule} from "@progress/kendo-angular-buttons";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpModule,
        JsonpModule,
        RolesRoutingModule,
        MessageAreaModule,
        GridModule,
        ButtonsModule
    ],
    declarations: [
        RolesListComponent, RolesComponent, RolesAddComponent, RolesEditComponent , RolesDetailComponent
    ],
    providers: [RolesService, UserFormsService, UsersService, UserReportsService,RefreshService]
})
export class RolesModule {}