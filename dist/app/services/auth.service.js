"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Created by zhongping.lu on 9/20/2016.
 */
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var api_util_1 = require("../utils/api.util");
var rxjs_1 = require("rxjs");
var AuthService = (function () {
    function AuthService(http) {
        this.http = http;
        this.loginComplete = new core_1.EventEmitter();
    }
    AuthService.prototype.login = function (credential) {
        var _this = this;
        return rxjs_1.Observable.create(function (observer) {
            _this.http.post(api_util_1.APIs.getApiUri(api_util_1.API_TYPE.C_LOGIN), JSON.stringify(credential)).subscribe(function (response) {
                _this.token = response.json();
                window.localStorage.setItem("token", JSON.stringify(_this.token));
                console.log(localStorage.getItem("token"));
                observer.next(_this.token.user);
                observer.complete();
                _this.loginComplete.emit(true);
            }, function (errResp) {
                observer.error(errResp);
                _this.loginComplete.emit(false);
            });
        });
    };
    AuthService.prototype.logout = function () {
        var _this = this;
        return rxjs_1.Observable.create(function (observer) {
            var header = new http_1.Headers();
            if (_this.token) {
                header.append("token", _this.token.token);
                header.append("username", _this.token.user.loginname);
            }
            _this.http.post(api_util_1.APIs.getApiUri(api_util_1.API_TYPE.D_LOGOUT), JSON.stringify(_this.getToken()), { headers: header }).finally(function () {
                window.localStorage.removeItem("token");
                _this.token = null;
                observer.next(true);
                observer.complete();
            }).subscribe(function (resp) { }, function (error) { });
        });
    };
    AuthService.prototype.getToken = function () {
        return this.token ? this.token : JSON.parse(window.localStorage.getItem("token"));
    };
    AuthService.prototype.updateToken = function (token) {
        var userToken = this.getToken();
        userToken.token = token;
        this.token = userToken;
        window.localStorage.setItem("token", JSON.stringify(this.token));
    };
    return AuthService;
}());
AuthService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], AuthService);
exports.AuthService = AuthService;

//# sourceMappingURL=data:application/json;charset=utf8;base64,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RUQsOEJBQVEsR0FBUjtRQUNHLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLEdBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBQ3RGLENBQUM7SUFFRCxpQ0FBVyxHQUFYLFVBQVksS0FBYTtRQUN0QixJQUFJLFNBQVMsR0FBYyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDM0MsU0FBUyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDeEIsSUFBSSxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUM7UUFDdkIsTUFBTSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDcEUsQ0FBQztJQUdKLGtCQUFDO0FBQUQsQ0E3REEsQUE2REMsSUFBQTtBQTdERDtJQURDLGlCQUFVLEVBQUU7cUNBT2dCLFdBQUk7ZUF1RGhDO0FBN0RZLHNCQUFBLFdBQVcsQ0FBQSIsImZpbGUiOiJzZXJ2aWNlcy9hdXRoLnNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENyZWF0ZWQgYnkgemhvbmdwaW5nLmx1IG9uIDkvMjAvMjAxNi5cbiAqL1xuaW1wb3J0IHtJbmplY3RhYmxlLCBFdmVudEVtaXR0ZXJ9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge0h0dHAsIEhlYWRlcnN9IGZyb20gXCJAYW5ndWxhci9odHRwXCI7XG5cbmltcG9ydCB7TG9naW5DcmVkZW50aWFsLCBVc2VyLCBVc2VyVG9rZW4sIFVzZXJUeXBlfSBmcm9tIFwiLi4vbW9kZWxzL2F1dGgubW9kZWxcIjtcbmltcG9ydCB7Tm90aWZpY2F0aW9uc1NlcnZpY2V9IGZyb20gXCJhbmd1bGFyMi1ub3RpZmljYXRpb25zL2NvbXBvbmVudHNcIjtcbmltcG9ydCB7Um91dGVyfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQge0FQSV9UWVBFLCBBUElzfSBmcm9tIFwiLi4vdXRpbHMvYXBpLnV0aWxcIjtcbmltcG9ydCB7T2JzZXJ2YWJsZSwgT2JzZXJ2ZXJ9IGZyb20gXCJyeGpzXCI7XG5pbXBvcnQge0V4Y2VwdGlvblNlcnZpY2V9IGZyb20gXCIuL2V4Y2VwdGlvbi5zZXJ2aWNlXCI7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBBdXRoU2VydmljZSB7XG4gICBwcml2YXRlIHRva2VuOiBVc2VyVG9rZW47XG5cbiAgIGxvZ2luQ29tcGxldGU6IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gKCk7XG5cblxuICAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwKSB7fVxuXG4gICBsb2dpbihjcmVkZW50aWFsOiBMb2dpbkNyZWRlbnRpYWwpOiBPYnNlcnZhYmxlPFVzZXI+IHtcbiAgICAgIHJldHVybiBPYnNlcnZhYmxlLmNyZWF0ZSgob2JzZXJ2ZXI6IE9ic2VydmVyPFVzZXI+KSA9PiB7XG4gICAgICAgICB0aGlzLmh0dHAucG9zdChBUElzLmdldEFwaVVyaShBUElfVFlQRS5DX0xPR0lOKSwgSlNPTi5zdHJpbmdpZnkoY3JlZGVudGlhbCkpLnN1YnNjcmliZShcbiAgICAgICAgICAgIHJlc3BvbnNlID0+IHtcbiAgICAgICAgICAgICAgIHRoaXMudG9rZW4gPSByZXNwb25zZS5qc29uKCk7XG4gICAgICAgICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJ0b2tlblwiLCBKU09OLnN0cmluZ2lmeSh0aGlzLnRva2VuKSk7XG4gICAgICAgICAgICAgICBjb25zb2xlLmxvZyhsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInRva2VuXCIpKVxuICAgICAgICAgICAgICAgb2JzZXJ2ZXIubmV4dCh0aGlzLnRva2VuLnVzZXIpO1xuICAgICAgICAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcbiAgICAgICAgICAgICAgIHRoaXMubG9naW5Db21wbGV0ZS5lbWl0KHRydWUpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVyclJlc3AgPT4ge1xuICAgICAgICAgICAgICAgb2JzZXJ2ZXIuZXJyb3IoZXJyUmVzcCk7XG4gICAgICAgICAgICAgICB0aGlzLmxvZ2luQ29tcGxldGUuZW1pdChmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICApO1xuICAgICAgfSk7XG4gICB9XG5cbiAgIGxvZ291dCgpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgICAgcmV0dXJuIE9ic2VydmFibGUuY3JlYXRlKChvYnNlcnZlcjogT2JzZXJ2ZXI8YW55PikgPT4ge1xuICAgICAgICAgbGV0IGhlYWRlciA9IG5ldyBIZWFkZXJzKCk7XG5cbiAgICAgICAgIGlmICh0aGlzLnRva2VuKSB7XG4gICAgICAgICAgICBoZWFkZXIuYXBwZW5kKFwidG9rZW5cIiwgdGhpcy50b2tlbi50b2tlbik7XG4gICAgICAgICAgICBoZWFkZXIuYXBwZW5kKFwidXNlcm5hbWVcIiwgdGhpcy50b2tlbi51c2VyLmxvZ2lubmFtZSk7XG4gICAgICAgICB9XG5cbiAgICAgICAgIHRoaXMuaHR0cC5wb3N0KFxuICAgICAgICAgICAgQVBJcy5nZXRBcGlVcmkoQVBJX1RZUEUuRF9MT0dPVVQpLFxuICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkodGhpcy5nZXRUb2tlbigpKSxcbiAgICAgICAgICAgIHtoZWFkZXJzOiAgaGVhZGVyfVxuICAgICAgICAgKS5maW5hbGx5KCgpID0+IHtcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShcInRva2VuXCIpO1xuICAgICAgICAgICAgdGhpcy50b2tlbiA9IG51bGw7XG4gICAgICAgICAgICBvYnNlcnZlci5uZXh0KHRydWUpO1xuICAgICAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcbiAgICAgICAgIH0pLnN1YnNjcmliZShyZXNwID0+IHt9LCBlcnJvciA9PiB7fSk7XG4gICAgICB9KTtcbiAgIH1cblxuICAgZ2V0VG9rZW4oKTogVXNlclRva2VuIHtcbiAgICAgIHJldHVybiB0aGlzLnRva2VuID8gdGhpcy50b2tlbiA6ICBKU09OLnBhcnNlKHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInRva2VuXCIpKTtcbiAgIH1cblxuICAgdXBkYXRlVG9rZW4odG9rZW46IHN0cmluZyk6IHZvaWQge1xuICAgICAgbGV0IHVzZXJUb2tlbjogVXNlclRva2VuID0gdGhpcy5nZXRUb2tlbigpO1xuICAgICAgdXNlclRva2VuLnRva2VuID0gdG9rZW47XG4gICAgICB0aGlzLnRva2VuID0gdXNlclRva2VuO1xuICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKFwidG9rZW5cIiwgSlNPTi5zdHJpbmdpZnkodGhpcy50b2tlbikpO1xuICAgfVxuXG4gICAvLyBUT0RPOiAgZmluZCBhIHdheSB0byByZWZyZXNoIGN1cnJlbnQgdXNlciBpbiBzb21lIGNhc2VzXG59Il19
