"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
require('rxjs/add/operator/map');
var FormUser = (function () {
    function FormUser() {
    }
    return FormUser;
}());
exports.FormUser = FormUser;
var UserFormsService = (function () {
    function UserFormsService(http, auth) {
        this.http = http;
        this.auth = auth;
    }
    UserFormsService.prototype.getUserForms = function () {
        //add authorization header with jwt token
        var headers = new http_1.Headers({
            'Authorization': 'Bearer ' + this.auth.tokenData.access_token,
            'Content-Type': 'application/json'
        });
        // headers.append("Access-Control-Allow-Origin","http://test-mobilizie-api.azurewebsites.net");
        var options = new http_1.RequestOptions({ headers: headers });
        console.log("HTTP call Init");
        //  return this.http.post('http://test-mobilizie-api.azurewebsites.net/api/userforms',{},options)
        return this.http.post('http://test-mobilizie-api.azurewebsites.net/api/userforms', "", options)
            .map(function (users) {
            console.log(users);
            var userobj = users.json();
            console.log(userobj.Forms);
            return userobj;
        });
    };
    UserFormsService = __decorate([
        core_1.Injectable()
    ], UserFormsService);
    return UserFormsService;
}());
exports.UserFormsService = UserFormsService;
//# sourceMappingURL=userForms.service.js.map