import { NgModule }      from '@angular/core';
import { BrowserModule , Title} from '@angular/platform-browser';

import { AppComponent }   from './app.component';

import { AppRoutingModule }     from './app.rounting.module';
import {LoginModule} from './login/login.module'

// Import ButtonsModule
import { ButtonsModule } from '@progress/kendo-angular-buttons';

import {HttpService} from "./services/httpHelper.service";
import {SlimLoadingBarModule} from "ng2-slim-loading-bar";
import {Config} from "./config/config";
import { MyMaterialModule } from './material.module';

@NgModule({
  imports: [BrowserModule, LoginModule, MyMaterialModule,
     AppRoutingModule, ButtonsModule,  SlimLoadingBarModule.forRoot()],


  declarations: [AppComponent  ],

    providers:[HttpService , Title,Config],

  bootstrap: [AppComponent]
})

export class AppModule { }