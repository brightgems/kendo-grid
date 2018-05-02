import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';
import {MessageAreaComponent} from "./message-area.component";
import {MessageAreaComponent2} from "./message-area2.component";



@NgModule({
    imports:      [ CommonModule ],
    declarations: [ MessageAreaComponent,MessageAreaComponent2 ],
    exports:      [ MessageAreaComponent, MessageAreaComponent2,
        CommonModule ]
})
export class MessageAreaModule { }