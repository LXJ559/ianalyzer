/**
 * Created by zhongping.lu on 9/20/2016.
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
var router_1 = require("@angular/router");
var TitleBarComponent = (function () {
    function TitleBarComponent(router, route) {
        this.router = router;
        this.route = route;
    }
    TitleBarComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.router.events
            .filter(function (event) { return event instanceof router_1.NavigationEnd; })
            .subscribe(function (event) {
            var findCurrentRoute = function (parentRoute) {
                if (parentRoute.children.length > 0) {
                    return findCurrentRoute(parentRoute.children[0]);
                }
                return parentRoute;
            };
            var currentRoute = findCurrentRoute(_this.route.children[0]), snapshot = currentRoute.snapshot;
            if (snapshot) {
                _this.title = snapshot.data["titleKey"];
                _this.description = snapshot.data["descKey"];
            }
        });
    };
    return TitleBarComponent;
}());
TitleBarComponent = __decorate([
    core_1.Component({
        selector: "title-bar",
        templateUrl: "views/titlebar.html"
    }),
    __metadata("design:paramtypes", [router_1.Router, router_1.ActivatedRoute])
], TitleBarComponent);
exports.TitleBarComponent = TitleBarComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvdGl0bGViYXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOztHQUVHOzs7Ozs7Ozs7OztBQUVILHNDQUFnRDtBQUNoRCwwQ0FBNEU7QUFPNUU7SUFJRywyQkFBb0IsTUFBYyxFQUFVLEtBQXFCO1FBQTdDLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFnQjtJQUFHLENBQUM7SUFFckUsb0NBQVEsR0FBUjtRQUFBLGlCQW9CQztRQW5CRSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU07YUFDZCxNQUFNLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFLLFlBQVksc0JBQWEsRUFBOUIsQ0FBOEIsQ0FBQzthQUMvQyxTQUFTLENBQUMsVUFBQSxLQUFLO1lBQ2IsSUFBSSxnQkFBZ0IsR0FBRyxVQUFDLFdBQTJCO2dCQUNoRCxFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNuQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNwRCxDQUFDO2dCQUVELE1BQU0sQ0FBQyxXQUFXLENBQUM7WUFDdEIsQ0FBQyxDQUFDO1lBRUYsSUFBSSxZQUFZLEdBQUcsZ0JBQWdCLENBQUMsS0FBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFDeEQsUUFBUSxHQUFHLFlBQVksQ0FBQyxRQUFRLENBQUM7WUFFcEMsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDWixLQUFJLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQ3ZDLEtBQUksQ0FBQyxXQUFXLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUMvQyxDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQUM7SUFDVCxDQUFDO0lBQ0osd0JBQUM7QUFBRCxDQTNCQSxBQTJCQyxJQUFBO0FBM0JEO0lBSkMsZ0JBQVMsQ0FBQztRQUNSLFFBQVEsRUFBRSxXQUFXO1FBQ3JCLFdBQVcsRUFBRSxxQkFBcUI7S0FDcEMsQ0FBQztxQ0FLNkIsZUFBTSxFQUFpQix1QkFBYztxQkF1Qm5FO0FBM0JZLDRCQUFBLGlCQUFpQixDQUFBIiwiZmlsZSI6ImNvbXBvbmVudHMvdGl0bGViYXIuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDcmVhdGVkIGJ5IHpob25ncGluZy5sdSBvbiA5LzIwLzIwMTYuXG4gKi9cblxuaW1wb3J0IHtDb21wb25lbnQsIE9uSW5pdH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7QWN0aXZhdGVkUm91dGUsIERhdGEsIFJvdXRlciwgTmF2aWdhdGlvbkVuZH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHtUcmFuc2xhdGVTZXJ2aWNlfSBmcm9tIFwibmcyLXRyYW5zbGF0ZS9uZzItdHJhbnNsYXRlXCI7XG5cbkBDb21wb25lbnQoe1xuICAgc2VsZWN0b3I6IFwidGl0bGUtYmFyXCIsXG4gICB0ZW1wbGF0ZVVybDogXCJ2aWV3cy90aXRsZWJhci5odG1sXCJcbn0pXG5leHBvcnQgY2xhc3MgVGl0bGVCYXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgdGl0bGU6IHN0cmluZztcbiAgIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG5cbiAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlKSB7fVxuXG4gICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgIHRoaXMucm91dGVyLmV2ZW50c1xuICAgICAgICAgLmZpbHRlcihldmVudCA9PiBldmVudCBpbnN0YW5jZW9mIE5hdmlnYXRpb25FbmQpXG4gICAgICAgICAuc3Vic2NyaWJlKGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGxldCBmaW5kQ3VycmVudFJvdXRlID0gKHBhcmVudFJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSk6IEFjdGl2YXRlZFJvdXRlID0+IHtcbiAgICAgICAgICAgICAgIGlmIChwYXJlbnRSb3V0ZS5jaGlsZHJlbi5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gZmluZEN1cnJlbnRSb3V0ZShwYXJlbnRSb3V0ZS5jaGlsZHJlblswXSk7XG4gICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgIHJldHVybiBwYXJlbnRSb3V0ZTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGxldCBjdXJyZW50Um91dGUgPSBmaW5kQ3VycmVudFJvdXRlKHRoaXMucm91dGUuY2hpbGRyZW5bMF0pLFxuICAgICAgICAgICAgICAgc25hcHNob3QgPSBjdXJyZW50Um91dGUuc25hcHNob3Q7XG5cbiAgICAgICAgICAgIGlmIChzbmFwc2hvdCkge1xuICAgICAgICAgICAgICAgdGhpcy50aXRsZSA9IHNuYXBzaG90LmRhdGFbXCJ0aXRsZUtleVwiXTtcbiAgICAgICAgICAgICAgIHRoaXMuZGVzY3JpcHRpb24gPSBzbmFwc2hvdC5kYXRhW1wiZGVzY0tleVwiXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgIH0pO1xuICAgfVxufSJdfQ==
