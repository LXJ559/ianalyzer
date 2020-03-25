/**
 * Created by zhongping.lu on 10/27/2016.
 */
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
var core_1 = require("@angular/core");
var rest_service_1 = require("./rest.service");
var exception_service_1 = require("./exception.service");
var rxjs_1 = require("rxjs");
var api_util_1 = require("../utils/api.util");
var auth_service_1 = require("./auth.service");
var UserService = (function () {
    function UserService(rest, exceptionService, auth) {
        this.rest = rest;
        this.exceptionService = exceptionService;
        this.auth = auth;
    }
    UserService.prototype.getUsers = function (page) {
        var _this = this;
        return rxjs_1.Observable.create(function (observer) {
            _this.rest.queryRestApi({ type: api_util_1.API_TYPE.R_USERS, page: page }).subscribe(function (resp) {
                observer.next(resp.json());
                observer.complete();
            }, function (error) { return _this.exceptionService.handleError(error, observer); });
        });
    };
    UserService.prototype.createUser = function (user) {
        var _this = this;
        return rxjs_1.Observable.create(function (observer) {
            _this.rest.queryRestApi({
                type: api_util_1.API_TYPE.C_USER,
                urlParams: { uid: _this.auth.getToken().user.id },
                body: user
            }).subscribe(function (resp) {
                observer.next((+resp.text()) === 200);
                observer.complete();
            }, function (error) { return _this.exceptionService.handleError(error, observer); });
        });
    };
    UserService.prototype.updateUser = function (user) {
        var _this = this;
        return rxjs_1.Observable.create(function (observer) {
            _this.rest.queryRestApi({
                type: api_util_1.API_TYPE.U_USER,
                urlParams: { uid: _this.auth.getToken().user.id },
                body: user
            }).subscribe(function (resp) {
                observer.next((+resp.text()) === 200);
                observer.complete();
            }, function (error) { return _this.exceptionService.handleError(error, observer); });
        });
    };
    UserService.prototype.removeUser = function (userid) {
        var _this = this;
        return rxjs_1.Observable.create(function (observer) {
            _this.rest.queryRestApi({
                type: api_util_1.API_TYPE.D_USER,
                urlParams: {
                    uid: _this.auth.getToken().user.id,
                    duid: userid
                },
            }).subscribe(function (resp) {
                observer.next((+resp.text()) === 200);
                observer.complete();
            }, function (error) { return _this.exceptionService.handleError(error, observer); });
        });
    };
    UserService.prototype.getUserPrivileges = function (user) {
        var _this = this;
        return rxjs_1.Observable.create(function (observer) {
            _this.rest.queryRestApi({
                type: api_util_1.API_TYPE.C_USER,
                body: user
            }).subscribe(function (resp) {
                observer.next(resp.json());
                observer.complete();
            }, function (error) { return _this.exceptionService.handleError(error, observer); });
        });
    };
    UserService.prototype.validateUsername = function (username) {
        var _this = this;
        return rxjs_1.Observable.create(function (observer) {
            _this.rest.queryRestApi({
                type: api_util_1.API_TYPE.R_USERNAME,
                urlParams: { username: username }
            }).subscribe(function (resp) {
                var status = +resp.text();
                observer.next(status === 200);
                observer.complete();
            }, function (error) {
                var resp = error;
                if (resp.status === 400) {
                    observer.next(false);
                    observer.complete();
                }
                else {
                    _this.exceptionService.handleError(error, observer);
                }
            });
        });
    };
    UserService.prototype.toUserSpec = function (user) {
        return {
            uid: user.id,
            username: user.loginname,
            displayname: user.displayname,
            password: user.password,
            category: user.category,
            type: user.type
        };
    };
    return UserService;
}());
UserService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [rest_service_1.RestService, exception_service_1.ExceptionService, auth_service_1.AuthService])
], UserService);
exports.UserService = UserService;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZpY2VzL3VzZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7R0FFRzs7Ozs7Ozs7Ozs7QUFHSCxzQ0FBeUM7QUFDekMsK0NBQTJDO0FBQzNDLHlEQUFxRDtBQUNyRCw2QkFBMEM7QUFFMUMsOENBQTJDO0FBRTNDLCtDQUEyQztBQUszQztJQUNHLHFCQUFvQixJQUFpQixFQUFVLGdCQUFrQyxFQUFVLElBQWlCO1FBQXhGLFNBQUksR0FBSixJQUFJLENBQWE7UUFBVSxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQVUsU0FBSSxHQUFKLElBQUksQ0FBYTtJQUFHLENBQUM7SUFFaEgsOEJBQVEsR0FBUixVQUFTLElBQVU7UUFBbkIsaUJBT0M7UUFORSxNQUFNLENBQUMsaUJBQVUsQ0FBQyxNQUFNLENBQUMsVUFBQyxRQUFzQztZQUM3RCxLQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFDLElBQUksRUFBRyxtQkFBUSxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUcsSUFBSSxFQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQSxJQUFJO2dCQUMxRSxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO2dCQUMzQixRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDdkIsQ0FBQyxFQUFFLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLEVBQWxELENBQWtELENBQUMsQ0FBQztRQUNuRSxDQUFDLENBQUMsQ0FBQztJQUNOLENBQUM7SUFFRCxnQ0FBVSxHQUFWLFVBQVcsSUFBYztRQUF6QixpQkFXQztRQVZFLE1BQU0sQ0FBQyxpQkFBVSxDQUFDLE1BQU0sQ0FBQyxVQUFDLFFBQTJCO1lBQ2xELEtBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDO2dCQUNwQixJQUFJLEVBQUcsbUJBQVEsQ0FBQyxN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VTtRQUNsQixNQUFNLENBQUM7WUFDSixHQUFHLEVBQUcsSUFBSSxDQUFDLEVBQUU7WUFDYixRQUFRLEVBQUcsSUFBSSxDQUFDLFNBQVM7WUFDekIsV0FBVyxFQUFHLElBQUksQ0FBQyxXQUFXO1lBQzlCLFFBQVEsRUFBRyxJQUFJLENBQUMsUUFBUTtZQUN4QixRQUFRLEVBQUcsSUFBSSxDQUFDLFFBQVE7WUFDeEIsSUFBSSxFQUFHLElBQUksQ0FBQyxJQUFJO1NBQ2xCLENBQUM7SUFDTCxDQUFDO0lBQ0osa0JBQUM7QUFBRCxDQWpHQSxBQWlHQyxJQUFBO0FBakdEO0lBREMsaUJBQVUsRUFBRTtxQ0FFZ0IsMEJBQVcsRUFBNEIsb0NBQWdCLEVBQWdCLDBCQUFXO2VBZ0c5RztBQWpHWSxzQkFBQSxXQUFXLENBQUEiLCJmaWxlIjoic2VydmljZXMvdXNlci5zZXJ2aWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDcmVhdGVkIGJ5IHpob25ncGluZy5sdSBvbiAxMC8yNy8yMDE2LlxuICovXG5cblxuaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtSZXN0U2VydmljZX0gZnJvbSBcIi4vcmVzdC5zZXJ2aWNlXCI7XG5pbXBvcnQge0V4Y2VwdGlvblNlcnZpY2V9IGZyb20gXCIuL2V4Y2VwdGlvbi5zZXJ2aWNlXCI7XG5pbXBvcnQge09ic2VydmFibGUsIE9ic2VydmVyfSBmcm9tIFwicnhqc1wiO1xuaW1wb3J0IHtVc2VyfSBmcm9tIFwiLi4vbW9kZWxzL2F1dGgubW9kZWxcIjtcbmltcG9ydCB7QVBJX1RZUEV9IGZyb20gXCIuLi91dGlscy9hcGkudXRpbFwiO1xuaW1wb3J0IHtQYWdlZEl0ZW1TZXQsIFJlc3BvbnNlU3RhdHVzLCBQYWdlfSBmcm9tIFwiLi4vbW9kZWxzL2dlbmVyYWwubW9kZWxcIjtcbmltcG9ydCB7QXV0aFNlcnZpY2V9IGZyb20gXCIuL2F1dGguc2VydmljZVwiO1xuaW1wb3J0IHtVc2VyU3BlY30gZnJvbSBcIi4uL21vZGVscy91c2VyLm1vZGVsXCI7XG5pbXBvcnQge1Jlc3BvbnNlfSBmcm9tIFwiQGFuZ3VsYXIvaHR0cFwiO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVXNlclNlcnZpY2Uge1xuICAgY29uc3RydWN0b3IocHJpdmF0ZSByZXN0OiBSZXN0U2VydmljZSwgcHJpdmF0ZSBleGNlcHRpb25TZXJ2aWNlOiBFeGNlcHRpb25TZXJ2aWNlLCBwcml2YXRlIGF1dGg6IEF1dGhTZXJ2aWNlKSB7fVxuXG4gICBnZXRVc2VycyhwYWdlOiBQYWdlKTogT2JzZXJ2YWJsZTxQYWdlZEl0ZW1TZXQ8VXNlcj4+IHtcbiAgICAgIHJldHVybiBPYnNlcnZhYmxlLmNyZWF0ZSgob2JzZXJ2ZXI6IE9ic2VydmVyPFBhZ2VkSXRlbVNldDxVc2VyPj4pID0+IHtcbiAgICAgICAgIHRoaXMucmVzdC5xdWVyeVJlc3RBcGkoe3R5cGU6ICBBUElfVFlQRS5SX1VTRVJTLCBwYWdlOiAgcGFnZX0pLnN1YnNjcmliZShyZXNwID0+IHtcbiAgICAgICAgICAgIG9ic2VydmVyLm5leHQocmVzcC5qc29uKCkpO1xuICAgICAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcbiAgICAgICAgIH0sIGVycm9yID0+IHRoaXMuZXhjZXB0aW9uU2VydmljZS5oYW5kbGVFcnJvcihlcnJvciwgb2JzZXJ2ZXIpKTtcbiAgICAgIH0pO1xuICAgfVxuXG4gICBjcmVhdGVVc2VyKHVzZXI6IFVzZXJTcGVjKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgICByZXR1cm4gT2JzZXJ2YWJsZS5jcmVhdGUoKG9ic2VydmVyOiBPYnNlcnZlcjxib29sZWFuPikgPT4ge1xuICAgICAgICAgdGhpcy5yZXN0LnF1ZXJ5UmVzdEFwaSh7XG4gICAgICAgICAgICB0eXBlOiAgQVBJX1RZUEUuQ19VU0VSLFxuICAgICAgICAgICAgdXJsUGFyYW1zOiAge3VpZDogIHRoaXMuYXV0aC5nZXRUb2tlbigpLnVzZXIuaWR9LFxuICAgICAgICAgICAgYm9keTogIHVzZXJcbiAgICAgICAgIH0pLnN1YnNjcmliZShyZXNwID0+IHtcbiAgICAgICAgICAgIG9ic2VydmVyLm5leHQoKCtyZXNwLnRleHQoKSkgPT09IDIwMCk7XG4gICAgICAgICAgICBvYnNlcnZlci5jb21wbGV0ZSgpO1xuICAgICAgICAgfSwgZXJyb3IgPT4gdGhpcy5leGNlcHRpb25TZXJ2aWNlLmhhbmRsZUVycm9yKGVycm9yLCBvYnNlcnZlcikpO1xuICAgICAgfSk7XG4gICB9XG5cbiAgIHVwZGF0ZVVzZXIodXNlcjogVXNlclNwZWMpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICAgIHJldHVybiBPYnNlcnZhYmxlLmNyZWF0ZSgob2JzZXJ2ZXI6IE9ic2VydmVyPGJvb2xlYW4+KSA9PiB7XG4gICAgICAgICB0aGlzLnJlc3QucXVlcnlSZXN0QXBpKHtcbiAgICAgICAgICAgIHR5cGU6ICBBUElfVFlQRS5VX1VTRVIsXG4gICAgICAgICAgICB1cmxQYXJhbXM6ICB7dWlkOiAgdGhpcy5hdXRoLmdldFRva2VuKCkudXNlci5pZH0sXG4gICAgICAgICAgICBib2R5OiAgdXNlclxuICAgICAgICAgfSkuc3Vic2NyaWJlKHJlc3AgPT4ge1xuICAgICAgICAgICAgb2JzZXJ2ZXIubmV4dCgoK3Jlc3AudGV4dCgpKSA9PT0gMjAwKTtcbiAgICAgICAgICAgIG9ic2VydmVyLmNvbXBsZXRlKCk7XG4gICAgICAgICB9LCBlcnJvciA9PiB0aGlzLmV4Y2VwdGlvblNlcnZpY2UuaGFuZGxlRXJyb3IoZXJyb3IsIG9ic2VydmVyKSk7XG4gICAgICB9KTtcbiAgIH1cblxuICAgcmVtb3ZlVXNlcih1c2VyaWQ6IG51bWJlcik6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgICAgcmV0dXJuIE9ic2VydmFibGUuY3JlYXRlKChvYnNlcnZlcjogT2JzZXJ2ZXI8Ym9vbGVhbj4pID0+IHtcbiAgICAgICAgIHRoaXMucmVzdC5xdWVyeVJlc3RBcGkoe1xuICAgICAgICAgICAgdHlwZTogIEFQSV9UWVBFLkRfVVNFUixcbiAgICAgICAgICAgIHVybFBhcmFtczogIHtcbiAgICAgICAgICAgICAgIHVpZDogIHRoaXMuYXV0aC5nZXRUb2tlbigpLnVzZXIuaWQsXG4gICAgICAgICAgICAgICBkdWlkOiAgdXNlcmlkXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICB9KS5zdWJzY3JpYmUocmVzcCA9PiB7XG4gICAgICAgICAgICBvYnNlcnZlci5uZXh0KCgrcmVzcC50ZXh0KCkpID09PSAyMDApO1xuICAgICAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcbiAgICAgICAgIH0sIGVycm9yID0+IHRoaXMuZXhjZXB0aW9uU2VydmljZS5oYW5kbGVFcnJvcihlcnJvciwgb2JzZXJ2ZXIpKTtcbiAgICAgIH0pO1xuICAgfVxuXG4gICBnZXRVc2VyUHJpdmlsZWdlcyh1c2VyOiBVc2VyKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgIHJldHVybiBPYnNlcnZhYmxlLmNyZWF0ZSgob2JzZXJ2ZXI6IE9ic2VydmVyPGFueT4pID0+IHtcbiAgICAgICAgIHRoaXMucmVzdC5xdWVyeVJlc3RBcGkoe1xuICAgICAgICAgICAgdHlwZTogIEFQSV9UWVBFLkNfVVNFUixcbiAgICAgICAgICAgIGJvZHk6ICB1c2VyXG4gICAgICAgICB9KS5zdWJzY3JpYmUocmVzcCA9PiB7XG4gICAgICAgICAgICBvYnNlcnZlci5uZXh0KHJlc3AuanNvbigpKTtcbiAgICAgICAgICAgIG9ic2VydmVyLmNvbXBsZXRlKCk7XG4gICAgICAgICB9LCBlcnJvciA9PiB0aGlzLmV4Y2VwdGlvblNlcnZpY2UuaGFuZGxlRXJyb3IoZXJyb3IsIG9ic2VydmVyKSk7XG4gICAgICB9KTtcbiAgIH1cblxuICAgdmFsaWRhdGVVc2VybmFtZSh1c2VybmFtZTogc3RyaW5nKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgICByZXR1cm4gT2JzZXJ2YWJsZS5jcmVhdGUoKG9ic2VydmVyOiBPYnNlcnZlcjxib29sZWFuPikgPT4ge1xuICAgICAgICAgdGhpcy5yZXN0LnF1ZXJ5UmVzdEFwaSh7XG4gICAgICAgICAgICB0eXBlOiAgQVBJX1RZUEUuUl9VU0VSTkFNRSxcbiAgICAgICAgICAgIHVybFBhcmFtczogIHt1c2VybmFtZTogIHVzZXJuYW1lfVxuICAgICAgICAgfSkuc3Vic2NyaWJlKHJlc3AgPT4ge1xuICAgICAgICAgICAgbGV0IHN0YXR1czogbnVtYmVyID0gK3Jlc3AudGV4dCgpO1xuICAgICAgICAgICAgb2JzZXJ2ZXIubmV4dChzdGF0dXMgPT09IDIwMCk7XG4gICAgICAgICAgICBvYnNlcnZlci5jb21wbGV0ZSgpO1xuICAgICAgICAgfSwgZXJyb3IgPT4ge1xuICAgICAgICAgICAgbGV0IHJlc3AgPSBlcnJvciBhcyBSZXNwb25zZTtcbiAgICAgICAgICAgIGlmIChyZXNwLnN0YXR1cyA9PT0gNDAwKSB7XG4gICAgICAgICAgICAgICBvYnNlcnZlci5uZXh0KGZhbHNlKTtcbiAgICAgICAgICAgICAgIG9ic2VydmVyLmNvbXBsZXRlKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgdGhpcy5leGNlcHRpb25TZXJ2aWNlLmhhbmRsZUVycm9yKGVycm9yLCBvYnNlcnZlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgfVxuXG4gICB0b1VzZXJTcGVjKHVzZXI6IFVzZXIpOiBVc2VyU3BlYyB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICAgdWlkOiAgdXNlci5pZCxcbiAgICAgICAgIHVzZXJuYW1lOiAgdXNlci5sb2dpbm5hbWUsXG4gICAgICAgICBkaXNwbGF5bmFtZTogIHVzZXIuZGlzcGxheW5hbWUsXG4gICAgICAgICBwYXNzd29yZDogIHVzZXIucGFzc3dvcmQsXG4gICAgICAgICBjYXRlZ29yeTogIHVzZXIuY2F0ZWdvcnksXG4gICAgICAgICB0eXBlOiAgdXNlci50eXBlXG4gICAgICB9O1xuICAgfVxufSJdfQ==
