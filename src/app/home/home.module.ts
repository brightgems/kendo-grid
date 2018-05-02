import { NgModule }       from '@angular/core';
import { HomeRoutingModule }       from './home.routing.module';
import {HomeComponent} from "./home.component";
import {MNavBarComponent} from "../components/navbar/navbar.component";
import {MessageAreaService} from "../message-area/message-area.service";
import {MessageAreaModule} from "../message-area/message-area.module";

@NgModule({
    imports: [
        HomeRoutingModule,
        MessageAreaModule
    ],
    declarations: [
        HomeComponent,
        MNavBarComponent],
    providers: [MessageAreaService]
})
export class HomeModule {}