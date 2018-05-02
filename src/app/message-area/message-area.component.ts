
import {Component, OnInit} from '@angular/core';

import {MessageAreaService, MessageAreaMessageEvent, MessageAreaMessageType} from './message-area.service';


export class MessageAreaMessage{
    public messageType : string;
    public message: string;

}

@Component({
    selector: 'ng2-message-area',
    template: `
<style>
    .closeMargin {
    margin-top: -9px;
    }
    .messageHeight{
    margin-top: -9px;
    }
</style>
<div class="container-fluid">
<div *ngFor="let message of messages">
<div class="{{message.messageType}}" style="height: 33px;">
  <a href="#" class="close closeMargin" data-dismiss="alert" aria-label="close">&times;</a>
   <div class="messageHeight">{{message.message}}</div>
</div>
</div>
</div>`
})
export class MessageAreaComponent implements OnInit {

    private messages: Array<MessageAreaMessage>;

    constructor(private service:MessageAreaService) {
        this.messages = [];
    }

    ngOnInit(): any {
        this.service.observable.subscribe((event:MessageAreaMessageEvent) => {

            let message  = new MessageAreaMessage();
            message.message = event.message;

            switch(event.type)
            {
                case MessageAreaMessageType.ERROR:
                    message.messageType = "alert alert-danger alert-dismissible";
                    break;
                case MessageAreaMessageType.INFO:
                    message.messageType = "alert alert-info alert-dismissible";
                    break;
                case MessageAreaMessageType.SUCCESS:
                    message.messageType = "alert alert-success alert-dismissible";
                    break;
                case MessageAreaMessageType.WARNING:
                    message.messageType = "alert alert-warning alert-dismissible";
                    break;
            }
            this.messages = [];
            this.messages.push(message);

            global.setTimeout(function() {
                this.messages = [];
            }.bind(this), 10000);


        });
    }
}


