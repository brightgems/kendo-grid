"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var http_1 = require("@angular/http");
var core_1 = require("@angular/core");
require('rxjs/add/operator/map');
var ServiceResponse = (function () {
    function ServiceResponse() {
    }
    return ServiceResponse;
}());
exports.ServiceResponse = ServiceResponse;
var HttpService = (function () {
    function HttpService(http, auth, slimLoadingBarService, config) {
        var _this = this;
        this.http = http;
        this.auth = auth;
        this.slimLoadingBarService = slimLoadingBarService;
        this.config = config;
        this.Success = function (response) {
            /*
             *  Returns a ServiceResponse with success as true
             *  Message and response code is passed if any
             *      Message: JSON object of response
             * */
            var res = new ServiceResponse();
            res.Success = true;
            if (response != null) {
                //  create json object
                var x = response.json();
                console.log("Success : ", x);
                res.Message = x;
                if (response.status != null) {
                    res.ResponseCode = response.status;
                }
            }
            _this.slimLoadingBarService.complete();
            return res;
        };
        this.Catch = function (x) {
            /*
             *  Returns a ServiceResponse with success as false
             *  Message and response code is passed if any
             * */
            var y = new ServiceResponse();
            y.Success = false;
            if (x != null) {
                if (x != null)
                    y.ResponseCode = x.status;
                y.Message = x.Message;
                if (y.ResponseCode == 401) {
                    _this.auth.logout();
                }
                console.log("CATCH: ", x);
            }
            _this.slimLoadingBarService.complete();
            return [y];
        };
    }
    HttpService.prototype.Get = function (api) {
        /*
         *   GET HTTP method, makes a http GET call to server with authorized headers
         *      api:    name of api
         *   returns ServiceResponse as result
         * */
        var headers = new http_1.Headers({
            'Authorization': 'Bearer ' + this.auth.tokenData.access_token,
            'Content-Type': 'application/json'
        });
        var options = new http_1.RequestOptions({ headers: headers });
        this.slimLoadingBarService.start();
        return this.http.get(this.config.baseUrl + "api/" + api, options)
            .map(this.Success).catch(this.Catch);
    };
    HttpService.prototype.Post = function (api, data) {
        /*
         *   POST HTTP method, makes a http POST call to server with authorized headers
         *      data:   data passed to http call
         *      api:    name of api
         *   returns ServiceResponse as result
         * */
        var headers = new http_1.Headers({
            'Authorization': 'Bearer ' + this.auth.tokenData.access_token,
            'Content-Type': 'application/json'
        });
        var options = new http_1.RequestOptions({ headers: headers });
        this.slimLoadingBarService.start();
        return this.http.post(this.config.baseUrl + "api/" + api, data, options)
            .map(this.Success).catch(this.Catch);
    };
    HttpService = __decorate([
        core_1.Injectable()
    ], HttpService);
    return HttpService;
}());
exports.HttpService = HttpService;
//# sourceMappingURL=httpHelper.service.js.map