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
 * Created by zhongping.lu on 9/15/2016.
 */
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var auth_service_1 = require("../services/auth.service");
var auth_model_1 = require("../models/auth.model");
var alert_widget_1 = require("../widgets/alert.widget");
var NavigatorComponent = (function () {
    function NavigatorComponent(auth, router) {
        this.auth = auth;
        this.router = router;
        this.adminType = auth_model_1.UserType.Admin;
        this.user = auth.getToken().user;
        console.log(this.user);
        console.log(this.adminType);
    }
    NavigatorComponent.prototype.logout = function (event) {
        var _this = this;
        event.preventDefault();
        this.alert.show().subscribe(function (result) {
            if (result) {
                _this.auth.logout().subscribe(function () {
                    _this.router.navigate(["login"]);
                });
            }
        });
    };
    return NavigatorComponent;
}());
__decorate([
    core_1.ViewChild("alert"),
    __metadata("design:type", alert_widget_1.AlertWidget)
], NavigatorComponent.prototype, "alert", void 0);
NavigatorComponent = __decorate([
    core_1.Component({
        selector: "app-nav",
        templateUrl: "/views/navigator.html",
        providers: [router_1.RouterLink, router_1.RouterLinkActive]
    }),
    __metadata("design:paramtypes", [auth_service_1.AuthService, router_1.Router])
], NavigatorComponent);
exports.NavigatorComponent = NavigatorComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvbmF2aWdhdG9yLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7O0dBRUc7QUFDSCxzQ0FBbUQ7QUFDbkQsMENBQXFFO0FBQ3JFLHlEQUFxRDtBQUNyRCxtREFBb0Q7QUFDcEQsd0RBQW9EO0FBT3BEO0lBTUcsNEJBQW9CLElBQWlCLEVBQVUsTUFBYztRQUF6QyxTQUFJLEdBQUosSUFBSSxDQUFhO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUo3RCxjQUFTLEdBQWEscUJBQVEsQ0FBQyxLQUFLLENBQUM7UUFLbEMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsSUFBSSxDQUFDO1FBQ2pDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQ3RCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFBO0lBQzlCLENBQUM7SUFFRCxtQ0FBTSxHQUFOLFVBQU8sS0FBWTtRQUFuQixpQkFVQztRQVRFLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUV2QixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLFNBQVMsQ0FBQyxVQUFBLE1BQU07WUFDL0IsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDVixLQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLFNBQVMsQ0FBQztvQkFDMUIsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUNuQyxDQUFDLENBQUMsQ0FBQztZQUNOLENBQUM7UUFDSixDQUFDLENBQUMsQ0FBQztJQUNOLENBQUM7SUFDSix5QkFBQztBQUFELENBdkJBLEFBdUJDLElBQUE7QUFuQkU7SUFEQyxnQkFBUyxDQUFDLE9BQU8sQ0FBQzs4QkFDWiwwQkFBVztpREFBQztBQUp0QjtJQUxDLGdCQUFTLENBQUM7UUFDUixRQUFRLEVBQUUsU0FBUztRQUNuQixXQUFXLEVBQUUsdUJBQXVCO1FBQ3BDLFNBQVMsRUFBRSxDQUFDLG1CQUFVLEVBQUUseUJBQWdCLENBQUM7S0FDM0MsQ0FBQztxQ0FPMkIsMEJBQVcsRUFBa0IsZUFBTTtzQkFpQi9EO0FBdkJZLDZCQUFBLGtCQUFrQixDQUFBIiwiZmlsZSI6ImNvbXBvbmVudHMvbmF2aWdhdG9yLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ3JlYXRlZCBieSB6aG9uZ3BpbmcubHUgb24gOS8xNS8yMDE2LlxuICovXG5pbXBvcnQge0NvbXBvbmVudCwgVmlld0NoaWxkfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtSb3V0ZXJMaW5rLCBSb3V0ZXJMaW5rQWN0aXZlLCBSb3V0ZXJ9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7QXV0aFNlcnZpY2V9IGZyb20gXCIuLi9zZXJ2aWNlcy9hdXRoLnNlcnZpY2VcIjtcbmltcG9ydCB7VXNlciwgVXNlclR5cGV9IGZyb20gXCIuLi9tb2RlbHMvYXV0aC5tb2RlbFwiO1xuaW1wb3J0IHtBbGVydFdpZGdldH0gZnJvbSBcIi4uL3dpZGdldHMvYWxlcnQud2lkZ2V0XCI7XG5cbkBDb21wb25lbnQoe1xuICAgc2VsZWN0b3I6IFwiYXBwLW5hdlwiLFxuICAgdGVtcGxhdGVVcmw6IFwiL3ZpZXdzL25hdmlnYXRvci5odG1sXCIsXG4gICBwcm92aWRlcnM6IFtSb3V0ZXJMaW5rLCBSb3V0ZXJMaW5rQWN0aXZlXVxufSlcbmV4cG9ydCBjbGFzcyBOYXZpZ2F0b3JDb21wb25lbnQge1xuICAgdXNlcjogVXNlcjtcbiAgIGFkbWluVHlwZTogVXNlclR5cGUgPSBVc2VyVHlwZS5BZG1pbjtcbiAgIEBWaWV3Q2hpbGQoXCJhbGVydFwiKVxuICAgYWxlcnQ6IEFsZXJ0V2lkZ2V0O1xuXG4gICBjb25zdHJ1Y3Rvcihwcml2YXRlIGF1dGg6IEF1dGhTZXJ2aWNlLCBwcml2YXRlIHJvdXRlcjogUm91dGVyKSB7XG4gICAgICB0aGlzLnVzZXIgPSBhdXRoLmdldFRva2VuKCkudXNlcjtcbiAgICAgIGNvbnNvbGUubG9nKHRoaXMudXNlcilcbiAgICAgIGNvbnNvbGUubG9nKHRoaXMuYWRtaW5UeXBlKVxuICAgfVxuXG4gICBsb2dvdXQoZXZlbnQ6IEV2ZW50KSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICB0aGlzLmFsZXJ0LnNob3coKS5zdWJzY3JpYmUocmVzdWx0ID0+IHtcbiAgICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgIHRoaXMuYXV0aC5sb2dvdXQoKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wibG9naW5cIl0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICB9XG4gICAgICB9KTtcbiAgIH1cbn0iXX0=
