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
var auth_service_1 = require("../services/auth.service");
var router_1 = require("@angular/router");
var components_1 = require("angular2-notifications/components");
var LoginComponent = (function () {
    function LoginComponent(auth, router, notifyService) {
        this.auth = auth;
        this.router = router;
        this.notifyService = notifyService;
        this.loginData = {};
        this.pendingLogin = false;
        var token = auth.getToken();
        if (token && token.user && token.token) {
            router.navigate(["home"]);
        }
    }
    LoginComponent.prototype.doLogin = function () {
        var _this = this;
        this.pendingLogin = true;
        this.auth.login(this.loginData).finally(function () {
            _this.pendingLogin = false;
        }).subscribe(function () {
            _this.router.navigate(["home"]);
            _this.loginData = {};
        }, function (error) {
            var resp = error.json();
            _this.notifyService.error(resp.code, resp.message);
            _this.loginData.password = "";
        });
    };
    LoginComponent.prototype.onFormKeyDown = function (event, form) {
        if (event.keyCode === 13 && form.valid) {
            this.doLogin();
        }
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    core_1.Component({
        selector: "app-login",
        templateUrl: "views/login.html",
    }),
    __metadata("design:paramtypes", [auth_service_1.AuthService, router_1.Router, components_1.NotificationsService])
], LoginComponent);
exports.LoginComponent = LoginComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvbG9naW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxzQ0FBd0M7QUFDeEMseURBQXFEO0FBQ3JELDBDQUF1QztBQUV2QyxnRUFBdUU7QUFRdkU7SUFLRyx3QkFBb0IsSUFBaUIsRUFBVSxNQUFjLEVBQVUsYUFBbUM7UUFBdEYsU0FBSSxHQUFKLElBQUksQ0FBYTtRQUFVLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxrQkFBYSxHQUFiLGFBQWEsQ0FBc0I7UUFKMUcsY0FBUyxHQUFzQyxFQUFFLENBQUM7UUFFbEQsaUJBQVksR0FBWSxLQUFLLENBQUM7UUFHM0IsSUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBRTlCLEVBQUUsQ0FBQyxDQUFDLEtBQUssSUFBSSxLQUFLLENBQUMsSUFBSSxJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ3RDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQzdCLENBQUM7SUFDSixDQUFDO0lBRUQsZ0NBQU8sR0FBUDtRQUFBLGlCQWVDO1FBZEUsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7UUFDekIsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztZQUNyQyxLQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztRQUM3QixDQUFDLENBQUMsQ0FBQyxTQUFTLENBQ1Q7WUFDRyxLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDL0IsS0FBSSxDQUFDLFNBQVMsR0FBcUIsRUFBRSxDQUFDO1FBQ3pDLENBQUMsRUFDRCxVQUFBLEtBQUs7WUFDRixJQUFJLElBQUksR0FBRyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDeEIsS0FBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDbEQsS0FBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ2hDLENBQUMsQ0FDSCxDQUFDO0lBQ0wsQ0FBQztJQUVELHNDQUFhLEdBQWIsVUFBYyxLQUFvQixFQUFFLElBQVk7UUFDN0MsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sS0FBSyxFQUFFLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDdEMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ2xCLENBQUM7SUFDSixDQUFDO0lBQ0oscUJBQUM7QUFBRCxDQW5DQSxBQW1DQyxJQUFBO0FBbkNEO0lBSkMsZ0JBQVMsQ0FBQztRQUNSLFFBQVEsRUFBRSxXQUFXO1FBQ3JCLFdBQVcsRUFBRSxrQkFBa0I7S0FDakMsQ0FBQztxQ0FNMkIsMEJBQVcsRUFBa0IsZUFBTSxFQUF5QixpQ0FBb0I7a0JBOEI1RztBQW5DWSx5QkFBQSxjQUFjLENBQUEiLCJmaWxlIjoiY29tcG9uZW50cy9sb2dpbi5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7QXV0aFNlcnZpY2V9IGZyb20gXCIuLi9zZXJ2aWNlcy9hdXRoLnNlcnZpY2VcIjtcbmltcG9ydCB7Um91dGVyfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQge0xvZ2luQ3JlZGVudGlhbH0gZnJvbSBcIi4uL21vZGVscy9hdXRoLm1vZGVsXCI7XG5pbXBvcnQge05vdGlmaWNhdGlvbnNTZXJ2aWNlfSBmcm9tIFwiYW5ndWxhcjItbm90aWZpY2F0aW9ucy9jb21wb25lbnRzXCI7XG5pbXBvcnQge0dlbmVyYWxFeGNlcHRpb259IGZyb20gXCIuLi9tb2RlbHMvZXhjZXB0aW9uLm1vZGVsXCI7XG5pbXBvcnQge05nRm9ybX0gZnJvbSBcIkBhbmd1bGFyL2Zvcm1zXCI7XG5cbkBDb21wb25lbnQoe1xuICAgc2VsZWN0b3I6IFwiYXBwLWxvZ2luXCIsXG4gICB0ZW1wbGF0ZVVybDogXCJ2aWV3cy9sb2dpbi5odG1sXCIsXG59KVxuZXhwb3J0IGNsYXNzIExvZ2luQ29tcG9uZW50IHtcbiAgIGxvZ2luRGF0YTogTG9naW5DcmVkZW50aWFsID0gPExvZ2luQ3JlZGVudGlhbD4ge307XG5cbiAgIHBlbmRpbmdMb2dpbjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICBjb25zdHJ1Y3Rvcihwcml2YXRlIGF1dGg6IEF1dGhTZXJ2aWNlLCBwcml2YXRlIHJvdXRlcjogUm91dGVyLCBwcml2YXRlIG5vdGlmeVNlcnZpY2U6IE5vdGlmaWNhdGlvbnNTZXJ2aWNlKSB7XG4gICAgICBjb25zdCB0b2tlbiA9IGF1dGguZ2V0VG9rZW4oKTtcblxuICAgICAgaWYgKHRva2VuICYmIHRva2VuLnVzZXIgJiYgdG9rZW4udG9rZW4pIHtcbiAgICAgICAgIHJvdXRlci5uYXZpZ2F0ZShbXCJob21lXCJdKTtcbiAgICAgIH1cbiAgIH1cblxuICAgZG9Mb2dpbigpOiB2b2lkIHtcbiAgICAgIHRoaXMucGVuZGluZ0xvZ2luID0gdHJ1ZTtcbiAgICAgIHRoaXMuYXV0aC5sb2dpbih0aGlzLmxvZ2luRGF0YSkuZmluYWxseSgoKSA9PiB7XG4gICAgICAgICB0aGlzLnBlbmRpbmdMb2dpbiA9IGZhbHNlO1xuICAgICAgfSkuc3Vic2NyaWJlKFxuICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiaG9tZVwiXSk7XG4gICAgICAgICAgICB0aGlzLmxvZ2luRGF0YSA9IDxMb2dpbkNyZWRlbnRpYWw+IHt9O1xuICAgICAgICAgfSxcbiAgICAgICAgIGVycm9yID0+IHtcbiAgICAgICAgICAgIGxldCByZXNwID0gZXJyb3IuanNvbigpO1xuICAgICAgICAgICAgdGhpcy5ub3RpZnlTZXJ2aWNlLmVycm9yKHJlc3AuY29kZSwgcmVzcC5tZXNzYWdlKTtcbiAgICAgICAgICAgIHRoaXMubG9naW5EYXRhLnBhc3N3b3JkID0gXCJcIjtcbiAgICAgICAgIH1cbiAgICAgICk7XG4gICB9XG5cbiAgIG9uRm9ybUtleURvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQsIGZvcm06IE5nRm9ybSk6IHZvaWQge1xuICAgICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IDEzICYmIGZvcm0udmFsaWQpIHtcbiAgICAgICAgIHRoaXMuZG9Mb2dpbigpO1xuICAgICAgfVxuICAgfVxufVxuIl19
