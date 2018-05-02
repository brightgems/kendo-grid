"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/operator/map');
var User = (function () {
    function User() {
    }
    return User;
}());
exports.User = User;
var AuthenticationService = (function () {
    function AuthenticationService(http, _router, config) {
        this.http = http;
        this._router = _router;
        this.config = config;
        this.ourUrl = this.config.baseUrl + "token";
    }
    Object.defineProperty(AuthenticationService.prototype, "tokenData", {
        get: function () {
            return JSON.parse(sessionStorage.getItem("tokenData"));
        },
        set: function (value) {
            sessionStorage.setItem("tokenData", JSON.stringify(value));
        },
        enumerable: true,
        configurable: true
    });
    AuthenticationService.prototype.login = function (email, password) {
        var _this = this;
        var data = "grant_type=password&username=" + email + "&password=" + password;
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        var options = new http_1.RequestOptions({
            headers: headers
        });
        return this.http.post(this.ourUrl, data, options)
            .map(function (response) {
            console.log(response);
            var token = response.json() && response.json().access_token;
            console.log(token);
            if (token) {
                console.log("token present");
                _this.tokenData = response.json();
                // return true to indicate successful login
                console.log("login successfull");
                return true;
            }
            else {
                // return false to indicate failed login
                console.log("login failed");
                return false;
            }
        })
            .catch(function (error) { return Observable_1.Observable.throw(error.json().error || 'Server error'); });
    };
    AuthenticationService.prototype.logout = function () {
        // clear token remove user from local storage to log user out
        this.tokenData = null;
        this._router.navigate(['/login']);
    };
    Object.defineProperty(AuthenticationService.prototype, "isLoggedIn", {
        get: function () {
            if (this.tokenData == null) {
                return false;
            }
            return true;
        },
        enumerable: true,
        configurable: true
    });
    AuthenticationService = __decorate([
        core_1.Injectable()
    ], AuthenticationService);
    return AuthenticationService;
}());
exports.AuthenticationService = AuthenticationService;
//# sourceMappingURL=authentication.service.js.map