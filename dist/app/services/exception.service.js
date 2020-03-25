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
 * Created by zhongping.lu on 10/14/2016.
 */
var core_1 = require("@angular/core");
var ng2_translate_1 = require("ng2-translate/ng2-translate");
var http_1 = require("@angular/http");
var components_1 = require("angular2-notifications/components");
var router_1 = require("@angular/router");
var auth_service_1 = require("./auth.service");
var ExceptionService = (function () {
    function ExceptionService(i18n, notificationService, auth, router) {
        this.i18n = i18n;
        this.notificationService = notificationService;
        this.auth = auth;
        this.router = router;
    }
    ExceptionService.prototype.createError = function (describer) {
        var error = {};
        error.exceptionName = this.i18n.instant(describer.titleKey);
        error.description = this.i18n.instant(describer.descKey);
        return error;
    };
    ExceptionService.prototype.handleError = function (error, $q) {
        var _this = this;
        var observer = $q;
        if (error instanceof http_1.Response) {
            var resp = error;
            if (resp.status === 500 || resp.status === 404) {
                this.notificationService.error(resp.statusText, resp.text());
                if (observer) {
                    observer.error({
                        exceptionName: resp.status,
                        description: resp.statusText
                    });
                }
            }
            else if (resp.status === 403) {
                if (observer) {
                    observer.error({
                        exceptionName: resp.status,
                        description: resp.statusText
                    });
                }
                //Forbidden handler
                this.auth.logout().subscribe(function () {
                    _this.router.navigate(["login"]);
                });
            }
            else {
                if (observer) {
                    var respStatus = resp.json();
                    if (respStatus) {
                        observer.error({
                            exceptionName: resp.statusText,
                            description: "[" + respStatus.code + "]" + respStatus.message
                        });
                    }
                    else {
                        observer.error({
                            exceptionName: resp.status,
                            description: resp.statusText
                        });
                    }
                }
            }
        }
        else if (error instanceof Error) {
            var err = error;
            if (observer) {
                observer.error({
                    exceptionName: err.name,
                    description: err.message
                });
            }
        }
        else {
            var exception = error;
            if (observer) {
                switch (exception.type) {
                    case "GeneralException":
                        observer.error(exception);
                        break;
                    case "ExceptionDescriber":
                        observer.error(this.createError(exception));
                        break;
                }
            }
        }
    };
    return ExceptionService;
}());
ExceptionService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [ng2_translate_1.TranslateService,
        components_1.NotificationsService,
        auth_service_1.AuthService,
        router_1.Router])
], ExceptionService);
exports.ExceptionService = ExceptionService;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZpY2VzL2V4Y2VwdGlvbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7R0FFRztBQUNILHNDQUF5QztBQUN6Qyw2REFBNkQ7QUFFN0Qsc0NBQXVDO0FBQ3ZDLGdFQUF1RTtBQUd2RSwwQ0FBdUM7QUFDdkMsK0NBQTJDO0FBSzNDO0lBQ0csMEJBQ1csSUFBc0IsRUFDdEIsbUJBQXlDLEVBQ3pDLElBQWlCLEVBQ2pCLE1BQWM7UUFIZCxTQUFJLEdBQUosSUFBSSxDQUFrQjtRQUN0Qix3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXNCO1FBQ3pDLFNBQUksR0FBSixJQUFJLENBQWE7UUFDakIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtJQUN0QixDQUFDO0lBRUosc0NBQVcsR0FBWCxVQUFZLFNBQTZCO1FBQ3RDLElBQUksS0FBSyxHQUF1QyxFQUFFLENBQUM7UUFDbkQsS0FBSyxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDNUQsS0FBSyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFekQsTUFBTSxDQUFDLEtBQUssQ0FBQztJQUNoQixDQUFDO0lBRUQsc0NBQVcsR0FBWCxVQUFZLEtBQStCLEVBQUUsRUFBa0I7UUFBL0QsaUJBZ0VDO1FBL0RFLElBQUksUUFBUSxHQUFrQixFQUFtQixDQUFDO1FBRWxELEVBQUUsQ0FBQyxDQUFDLEtBQUssWUFBWSxlQUFRLENBQUMsQ0FBQyxDQUFDO1lBQzdCLElBQUksSUFBSSxHQUFHLEtBQWlCLENBQUM7WUFFN0IsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sS0FBSyxHQUFHLElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUM5QyxJQUFJLENBQUMsbUJBQW1CLENB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LGVBQU07b0JBNEUzQjtBQWpGWSwyQkFBQSxnQkFBZ0IsQ0FBQSIsImZpbGUiOiJzZXJ2aWNlcy9leGNlcHRpb24uc2VydmljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ3JlYXRlZCBieSB6aG9uZ3BpbmcubHUgb24gMTAvMTQvMjAxNi5cbiAqL1xuaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtUcmFuc2xhdGVTZXJ2aWNlfSBmcm9tIFwibmcyLXRyYW5zbGF0ZS9uZzItdHJhbnNsYXRlXCI7XG5pbXBvcnQge09ic2VydmVyfSBmcm9tIFwicnhqc1wiO1xuaW1wb3J0IHtSZXNwb25zZX0gZnJvbSBcIkBhbmd1bGFyL2h0dHBcIjtcbmltcG9ydCB7Tm90aWZpY2F0aW9uc1NlcnZpY2V9IGZyb20gXCJhbmd1bGFyMi1ub3RpZmljYXRpb25zL2NvbXBvbmVudHNcIjtcbmltcG9ydCB7RXhjZXB0aW9uRGVzY3JpYmVyLCBHZW5lcmFsRXhjZXB0aW9ufSBmcm9tIFwiLi4vbW9kZWxzL2V4Y2VwdGlvbi5tb2RlbFwiO1xuaW1wb3J0IHtSZXNwb25zZVN0YXR1c30gZnJvbSBcIi4uL21vZGVscy9nZW5lcmFsLm1vZGVsXCI7XG5pbXBvcnQge1JvdXRlcn0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHtBdXRoU2VydmljZX0gZnJvbSBcIi4vYXV0aC5zZXJ2aWNlXCI7XG5cbnR5cGUgRXhjZXB0aW9uID0gR2VuZXJhbEV4Y2VwdGlvbiB8IEV4Y2VwdGlvbkRlc2NyaWJlcjtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEV4Y2VwdGlvblNlcnZpY2Uge1xuICAgY29uc3RydWN0b3IoXG4gICAgICBwcml2YXRlIGkxOG46IFRyYW5zbGF0ZVNlcnZpY2UsXG4gICAgICBwcml2YXRlIG5vdGlmaWNhdGlvblNlcnZpY2U6IE5vdGlmaWNhdGlvbnNTZXJ2aWNlLFxuICAgICAgcHJpdmF0ZSBhdXRoOiBBdXRoU2VydmljZSxcbiAgICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXJcbiAgICkge31cblxuICAgY3JlYXRlRXJyb3IoZGVzY3JpYmVyOiBFeGNlcHRpb25EZXNjcmliZXIpOiBHZW5lcmFsRXhjZXB0aW9uIHtcbiAgICAgIGxldCBlcnJvcjogR2VuZXJhbEV4Y2VwdGlvbiA9IDxHZW5lcmFsRXhjZXB0aW9uPnt9O1xuICAgICAgZXJyb3IuZXhjZXB0aW9uTmFtZSA9IHRoaXMuaTE4bi5pbnN0YW50KGRlc2NyaWJlci50aXRsZUtleSk7XG4gICAgICBlcnJvci5kZXNjcmlwdGlvbiA9IHRoaXMuaTE4bi5pbnN0YW50KGRlc2NyaWJlci5kZXNjS2V5KTtcblxuICAgICAgcmV0dXJuIGVycm9yO1xuICAgfVxuXG4gICBoYW5kbGVFcnJvcihlcnJvcjogUmVzcG9uc2V8RXJyb3J8RXhjZXB0aW9uLCAkcT86IE9ic2VydmVyPGFueT4pIHtcbiAgICAgIGxldCBvYnNlcnZlcjogT2JzZXJ2ZXI8YW55PiA9ICRxIGFzIE9ic2VydmVyPGFueT47XG5cbiAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIFJlc3BvbnNlKSB7XG4gICAgICAgICBsZXQgcmVzcCA9IGVycm9yIGFzIFJlc3BvbnNlO1xuXG4gICAgICAgICBpZiAocmVzcC5zdGF0dXMgPT09IDUwMCB8fCByZXNwLnN0YXR1cyA9PT0gNDA0KSB7XG4gICAgICAgICAgICB0aGlzLm5vdGlmaWNhdGlvblNlcnZpY2UuZXJyb3IocmVzcC5zdGF0dXNUZXh0LCByZXNwLnRleHQoKSk7XG4gICAgICAgICAgICBpZiAob2JzZXJ2ZXIpIHtcbiAgICAgICAgICAgICAgIG9ic2VydmVyLmVycm9yKHtcbiAgICAgICAgICAgICAgICAgIGV4Y2VwdGlvbk5hbWU6ICByZXNwLnN0YXR1cyxcbiAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAgcmVzcC5zdGF0dXNUZXh0XG4gICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgIH0gZWxzZSBpZiAocmVzcC5zdGF0dXMgPT09IDQwMykge1xuICAgICAgICAgICAgaWYgKG9ic2VydmVyKSB7XG4gICAgICAgICAgICAgICBvYnNlcnZlci5lcnJvcih7XG4gICAgICAgICAgICAgICAgICBleGNlcHRpb25OYW1lOiAgcmVzcC5zdGF0dXMsXG4gICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogIHJlc3Auc3RhdHVzVGV4dFxuICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvL0ZvcmJpZGRlbiBoYW5kbGVyXG4gICAgICAgICAgICB0aGlzLmF1dGgubG9nb3V0KCkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcImxvZ2luXCJdKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChvYnNlcnZlcikge1xuICAgICAgICAgICAgICAgbGV0IHJlc3BTdGF0dXM6IFJlc3BvbnNlU3RhdHVzID0gcmVzcC5qc29uKCk7XG5cbiAgICAgICAgICAgICAgIGlmIChyZXNwU3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgICBvYnNlcnZlci5lcnJvcih7XG4gICAgICAgICAgICAgICAgICAgICBleGNlcHRpb25OYW1lOiAgcmVzcC5zdGF0dXNUZXh0LFxuICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246ICBgWyR7cmVzcFN0YXR1cy5jb2RlfV0ke3Jlc3BTdGF0dXMubWVzc2FnZX1gXG4gICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIG9ic2VydmVyLmVycm9yKHtcbiAgICAgICAgICAgICAgICAgICAgIGV4Y2VwdGlvbk5hbWU6ICByZXNwLnN0YXR1cyxcbiAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAgcmVzcC5zdGF0dXNUZXh0XG4gICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgICBsZXQgZXJyID0gZXJyb3IgYXMgRXJyb3I7XG4gICAgICAgICBpZiAob2JzZXJ2ZXIpIHtcbiAgICAgICAgICAgIG9ic2VydmVyLmVycm9yKHtcbiAgICAgICAgICAgICAgIGV4Y2VwdGlvbk5hbWU6ICBlcnIubmFtZSxcbiAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAgZXJyLm1lc3NhZ2VcbiAgICAgICAgICAgIH0pXG4gICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAgbGV0IGV4Y2VwdGlvbiA9IGVycm9yIGFzIEV4Y2VwdGlvbjtcblxuICAgICAgICAgaWYgKG9ic2VydmVyKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKGV4Y2VwdGlvbi50eXBlKSB7XG4gICAgICAgICAgICAgICBjYXNlIFwiR2VuZXJhbEV4Y2VwdGlvblwiOlxuICAgICAgICAgICAgICAgICAgb2JzZXJ2ZXIuZXJyb3IoZXhjZXB0aW9uKTtcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgY2FzZSBcIkV4Y2VwdGlvbkRlc2NyaWJlclwiOlxuICAgICAgICAgICAgICAgICAgb2JzZXJ2ZXIuZXJyb3IodGhpcy5jcmVhdGVFcnJvcihleGNlcHRpb24gYXMgRXhjZXB0aW9uRGVzY3JpYmVyKSk7XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgIH1cbiAgICAgIH1cbiAgIH1cbn0iXX0=
