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
require("rxjs/add/operator/filter");
var BreadcrumbsComponent = (function () {
    function BreadcrumbsComponent(router, route) {
        this.router = router;
        this.route = route;
    }
    BreadcrumbsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.router.events.filter(function (event) { return event instanceof router_1.NavigationEnd; }).subscribe(function (event) {
            _this.breadcrumbs = [];
            var currentRoute = _this.route.root, url = "";
            do {
                var childrenRoutes = currentRoute.children;
                currentRoute = null;
                childrenRoutes.forEach(function (route) {
                    if (route.outlet === "primary") {
                        var routeSnapshot = route.snapshot;
                        url += "/" + routeSnapshot.url.map(function (segment) { return segment.path; }).join("/");
                        _this.breadcrumbs.push({
                            label: route.snapshot.data["titleKey"],
                            url: url
                        });
                        currentRoute = route;
                    }
                });
            } while (currentRoute);
        });
    };
    return BreadcrumbsComponent;
}());
BreadcrumbsComponent = __decorate([
    core_1.Component({
        selector: "breadcrumbs",
        template: "\n    <li class=\"breadcrumb-item\" *ngFor=\"let breadcrumb of breadcrumbs; let last = last\" [ngClass]=\"{active: last}\">\n    <a *ngIf=\"!last\" [routerLink]=\"breadcrumb.url\">{{breadcrumb.label | translate}}</a>\n    <span *ngIf=\"last\" [routerLink]=\"breadcrumb.url\">{{breadcrumb.label | translate}}</span>\n    </li>"
    }),
    __metadata("design:paramtypes", [router_1.Router, router_1.ActivatedRoute])
], BreadcrumbsComponent);
exports.BreadcrumbsComponent = BreadcrumbsComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvYnJlYWRjcnVtYi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHNDQUErRTtBQUMvRSwwQ0FBMkU7QUFDM0Usb0NBQWtDO0FBVWxDO0lBRUcsOEJBQW9CLE1BQWMsRUFBVSxLQUFxQjtRQUE3QyxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVUsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7SUFBRyxDQUFDO0lBQ3JFLHVDQUFRLEdBQVI7UUFBQSxpQkFxQkM7UUFwQkUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSyxZQUFZLHNCQUFhLEVBQTlCLENBQThCLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQSxLQUFLO1lBQy9FLEtBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDO1lBQ3RCLElBQUksWUFBWSxHQUFHLEtBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUMvQixHQUFHLEdBQUcsRUFBRSxDQUFDO1lBQ1osR0FBRyxDQUFDO2dCQUNELElBQUksY0FBYyxHQUFHLFlBQVksQ0FBQyxRQUFRLENBQUM7Z0JBQzNDLFlBQVksR0FBRyxJQUFJLENBQUM7Z0JBQ3BCLGNBQWMsQ0FBQyxPQUFPLENBQUMsVUFBQSxLQUFLO29CQUN6QixFQUFFLENBQUEsQ0FBQyxLQUFLLENBQUMsTUFBTSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7d0JBQzdCLElBQUksYUFBYSxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQUM7d0JBQ25DLEdBQUcsSUFBSSxHQUFHLEdBQUcsYUFBYSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsVUFBQSxPQUFPLElBQUksT0FBQSxPQUFPLENBQUMsSUFBSSxFQUFaLENBQVksQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFDdEUsS0FBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUM7NEJBQ25CLEtBQUssRUFBRSxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7NEJBQ3RDLEdBQUcsRUFBSSxHQUFHO3lCQUFFLENBQUMsQ0FBQzt3QkFDakIsWUFBWSxHQUFHLEtBQUssQ0FBQztvQkFDeEIsQ0FBQztnQkFFSixDQUFDLENBQUMsQ0FBQTtZQUNMLENBQUMsUUFBTyxZQUFZLEVBQUU7UUFDekIsQ0FBQyxDQUFDLENBQUE7SUFDTCxDQUFDO0lBQ0osMkJBQUM7QUFBRCxDQXpCQSxBQXlCQyxJQUFBO0FBekJEO0lBUkMsZ0JBQVMsQ0FBQztRQUNSLFFBQVEsRUFBRSxhQUFhO1FBQ3ZCLFFBQVEsRUFBRSx1VUFJSDtLQUNULENBQUM7cUNBRzZCLGVBQU0sRUFBaUIsdUJBQWM7d0JBdUJuRTtBQXpCWSwrQkFBQSxvQkFBb0IsQ0FBQSIsImZpbGUiOiJjb21wb25lbnRzL2JyZWFkY3J1bWIuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIE9uSW5pdH0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBSb3V0ZXIsIEFjdGl2YXRlZFJvdXRlLCBOYXZpZ2F0aW9uRW5kIH0gICAgZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvZmlsdGVyXCI7XG5cbkBDb21wb25lbnQoe1xuICAgc2VsZWN0b3I6IFwiYnJlYWRjcnVtYnNcIixcbiAgIHRlbXBsYXRlOiBgXG4gICAgPGxpIGNsYXNzPVwiYnJlYWRjcnVtYi1pdGVtXCIgKm5nRm9yPVwibGV0IGJyZWFkY3J1bWIgb2YgYnJlYWRjcnVtYnM7IGxldCBsYXN0ID0gbGFzdFwiIFtuZ0NsYXNzXT1cInthY3RpdmU6IGxhc3R9XCI+XG4gICAgPGEgKm5nSWY9XCIhbGFzdFwiIFtyb3V0ZXJMaW5rXT1cImJyZWFkY3J1bWIudXJsXCI+e3ticmVhZGNydW1iLmxhYmVsIHwgdHJhbnNsYXRlfX08L2E+XG4gICAgPHNwYW4gKm5nSWY9XCJsYXN0XCIgW3JvdXRlckxpbmtdPVwiYnJlYWRjcnVtYi51cmxcIj57e2JyZWFkY3J1bWIubGFiZWwgfCB0cmFuc2xhdGV9fTwvc3Bhbj5cbiAgICA8L2xpPmBcbn0pXG5leHBvcnQgY2xhc3MgQnJlYWRjcnVtYnNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgYnJlYWRjcnVtYnM6IEFycmF5PE9iamVjdD47XG4gICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlcjogUm91dGVyLCBwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSkge31cbiAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgdGhpcy5yb3V0ZXIuZXZlbnRzLmZpbHRlcihldmVudCA9PiBldmVudCBpbnN0YW5jZW9mIE5hdmlnYXRpb25FbmQpLnN1YnNjcmliZShldmVudCA9PiB7XG4gICAgICAgICB0aGlzLmJyZWFkY3J1bWJzID0gW107XG4gICAgICAgICBsZXQgY3VycmVudFJvdXRlID0gdGhpcy5yb3V0ZS5yb290LFxuICAgICAgICAgICAgdXJsID0gXCJcIjtcbiAgICAgICAgIGRvIHtcbiAgICAgICAgICAgIGxldCBjaGlsZHJlblJvdXRlcyA9IGN1cnJlbnRSb3V0ZS5jaGlsZHJlbjtcbiAgICAgICAgICAgIGN1cnJlbnRSb3V0ZSA9IG51bGw7XG4gICAgICAgICAgICBjaGlsZHJlblJvdXRlcy5mb3JFYWNoKHJvdXRlID0+IHtcbiAgICAgICAgICAgICAgIGlmKHJvdXRlLm91dGxldCA9PT0gXCJwcmltYXJ5XCIpIHtcbiAgICAgICAgICAgICAgICAgIGxldCByb3V0ZVNuYXBzaG90ID0gcm91dGUuc25hcHNob3Q7XG4gICAgICAgICAgICAgICAgICB1cmwgKz0gXCIvXCIgKyByb3V0ZVNuYXBzaG90LnVybC5tYXAoc2VnbWVudCA9PiBzZWdtZW50LnBhdGgpLmpvaW4oXCIvXCIpO1xuICAgICAgICAgICAgICAgICAgdGhpcy5icmVhZGNydW1icy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiByb3V0ZS5zbmFwc2hvdC5kYXRhW1widGl0bGVLZXlcIl0sXG4gICAgICAgICAgICAgICAgICAgICB1cmw6ICAgdXJsIH0pO1xuICAgICAgICAgICAgICAgICAgY3VycmVudFJvdXRlID0gcm91dGU7XG4gICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0pXG4gICAgICAgICB9IHdoaWxlKGN1cnJlbnRSb3V0ZSk7XG4gICAgICB9KVxuICAgfVxufVxuIl19
