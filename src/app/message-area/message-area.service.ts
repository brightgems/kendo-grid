import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subscriber} from 'rxjs/Subscriber';

export enum MessageAreaMessageType {
    INFO,
    ERROR,
    WARNING,
    SUCCESS
}

export class MessageAreaMessageEvent {
    constructor(public type:MessageAreaMessageType, public message:string) {}
}


@Injectable()
export class MessageAreaService {



    public observable: Observable<MessageAreaMessageEvent>;
    private subscriber: Array<Subscriber<MessageAreaMessageEvent>>;

    constructor() {
        this.subscriber = new Array<Subscriber<MessageAreaMessageEvent>>();
        this.observable = new Observable<MessageAreaMessageEvent>((subscriber:Subscriber<MessageAreaMessageEvent>) => {
            this.subscriber.push(subscriber);
        });
    }


    private emitEvent(event: MessageAreaMessageEvent,supressStack:boolean) {
        if (this.subscriber) {
            // Push up a new event
            for(var i=this.subscriber.length-1; i>=0; i--)
            {
                this.subscriber[i].next(event);
                if(supressStack)
                {
                    break;
                }
            }

        }
    }


    addMessage(messageType:MessageAreaMessageType, message:string) {

       this.emitEvent(new MessageAreaMessageEvent(messageType,message),false);
    }


    addSingleMessage(messageType:MessageAreaMessageType, message:string) {

        this.emitEvent(new MessageAreaMessageEvent(messageType,message),true);
    }


    clear() {
        //not implemented currently
    }
}
