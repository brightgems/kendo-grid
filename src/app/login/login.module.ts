import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { HttpModule ,JsonpModule} from '@angular/http';

import { LoginComponent }           from './login.component';
import { LoginRoutingModule }       from './login.routing.module';
import {HelloMaterialComponent} from './hello-material.component'
import { DialogDemo } from './dialog-demo';

// Import ButtonsModule
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { MyMaterialModule } from '../material.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpModule,
        JsonpModule,
        LoginRoutingModule,
        ButtonsModule,
        MyMaterialModule
    ],
    declarations: [
        LoginComponent,HelloMaterialComponent,DialogDemo
      ]
})
export class LoginModule {}