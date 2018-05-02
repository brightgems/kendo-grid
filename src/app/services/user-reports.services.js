"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var UserReportsService = (function () {
    function UserReportsService(_httpService) {
        this._httpService = _httpService;
    }
    UserReportsService.prototype.getUserReports = function () {
        var _this = this;
        //  Makes a http get call to get reports in organization [for admin]/assigned [for user]
        return this._httpService.Post("UserReports", "").map(function (x) {
            if (x.Success) {
                return _this.readReports(x.Message);
            }
            else {
                return _this.readReports(null);
            }
        });
    };
    UserReportsService.prototype.getReportEmbedData = function (reportId) {
        var api = "Reports?id=" + reportId;
        return this._httpService.Get(api).map(function (x) {
            return x.Message;
        });
    };
    UserReportsService.prototype.readReports = function (result) {
        // read result if result has list of Reports or not
        // set reports as result.Reports or null
        if (result != null && result.Reports != null) {
            this.reports = result.Reports;
        }
        else {
            this.reports = null;
        }
        return this.reports;
    };
    UserReportsService = __decorate([
        core_1.Injectable()
    ], UserReportsService);
    return UserReportsService;
}());
exports.UserReportsService = UserReportsService;
//# sourceMappingURL=user-reports.services.js.map