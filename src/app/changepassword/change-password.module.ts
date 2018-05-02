import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }   from '@angular/forms';
import {HttpModule, JsonpModule, Http} from '@angular/http';

import {ChangePasswordComponent} from "./change-password.component";
import {ChangePasswordService} from "../services/changePassword.service";
import {ChangePasswordRoutingModule} from "./change-password.routing.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpModule,
        JsonpModule,
        ChangePasswordRoutingModule
    ],
    declarations: [
       ChangePasswordComponent
    ],
    providers: [ChangePasswordService]
})
export class ChangePasswordModule {}