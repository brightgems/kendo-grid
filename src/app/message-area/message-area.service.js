"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var Observable_1 = require('rxjs/Observable');
(function (MessageAreaMessageType) {
    MessageAreaMessageType[MessageAreaMessageType["INFO"] = 0] = "INFO";
    MessageAreaMessageType[MessageAreaMessageType["ERROR"] = 1] = "ERROR";
    MessageAreaMessageType[MessageAreaMessageType["WARNING"] = 2] = "WARNING";
    MessageAreaMessageType[MessageAreaMessageType["SUCCESS"] = 3] = "SUCCESS";
})(exports.MessageAreaMessageType || (exports.MessageAreaMessageType = {}));
var MessageAreaMessageType = exports.MessageAreaMessageType;
var MessageAreaMessageEvent = (function () {
    function MessageAreaMessageEvent(type, message) {
        this.type = type;
        this.message = message;
    }
    return MessageAreaMessageEvent;
}());
exports.MessageAreaMessageEvent = MessageAreaMessageEvent;
var MessageAreaService = (function () {
    function MessageAreaService() {
        var _this = this;
        this.observable = new Observable_1.Observable(function (subscriber) {
            _this.subscriber = subscriber;
        });
    }
    MessageAreaService.prototype.emitEvent = function (event) {
        if (this.subscriber) {
            // Push up a new event
            this.subscriber.next(event);
        }
    };
    MessageAreaService.prototype.addMessage = function (messageType, message) {
        this.emitEvent(new MessageAreaMessageEvent(messageType, message));
    };
    MessageAreaService.prototype.clear = function () {
        //not implemented currently
    };
    MessageAreaService = __decorate([
        core_1.Injectable()
    ], MessageAreaService);
    return MessageAreaService;
}());
exports.MessageAreaService = MessageAreaService;
//# sourceMappingURL=message-area.service.js.map