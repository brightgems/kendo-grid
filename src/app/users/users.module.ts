import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }   from '@angular/forms';
import {HttpModule, JsonpModule, Http} from '@angular/http';
import {UsersService} from "../services/users.service";
import {RolesService} from "../services/roles.service";

import { GridModule } from '@progress/kendo-angular-grid';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { SortableModule } from '@progress/kendo-angular-sortable';



import { UsersListComponent }           from './usersList.component';
import { UsersRoutingModule }       from './users.routing.module';
import {CreateUserComponent} from "./create-user.component";
import {UsersComponent} from "./users.component";
import {ResetPasswordComponent} from "./user-reset-password.component";
import {UsersEditComponent} from "./usersedit.componet";
import { UsersDetailComponent } from "./users-detail.component";
import {DisableUserListComponent} from "./disable-user.component";
import {MessageAreaModule} from "../message-area/message-area.module";
import {RefreshService} from "../services/list.refresh.service";

@NgModule({
    imports: [
        FormsModule,
        HttpModule,
        JsonpModule,
        UsersRoutingModule,
        MessageAreaModule,
        GridModule,
        ButtonsModule,
        SortableModule
    ],
    declarations: [
        UsersListComponent,CreateUserComponent,UsersComponent,ResetPasswordComponent,UsersEditComponent,UsersDetailComponent,DisableUserListComponent

    ],
    providers: [UsersService,RolesService,RefreshService]
})
export class UsersModule {}