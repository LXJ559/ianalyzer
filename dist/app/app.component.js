/**
 * Created by zhongping.lu on 9/15/2016.
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
var ng2_translate_1 = require("ng2-translate/ng2-translate");
//TODO: move template to views folder
var AppComponent = (function () {
    function AppComponent(translate, viewContainerRef) {
        this.translate = translate;
        this.viewContainerRef = viewContainerRef;
        this.options = {
            timeOut: 5000,
            lastOnBottom: true,
            clickToClose: true,
            // maxLength: 0,
            maxStack: 7,
            showProgressBar: true,
            pauseOnHover: true
        };
        translate.setDefaultLang("en-US");
        translate.use(navigator.language);
    }
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: "app",
        template: "\n   <router-outlet></router-outlet>\n   <simple-notifications [options]=\"options\"></simple-notifications>\n"
    }),
    __metadata("design:paramtypes", [ng2_translate_1.TranslateService, core_1.ViewContainerRef])
], AppComponent);
exports.AppComponent = AppComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0dBRUc7Ozs7Ozs7Ozs7O0FBRUgsc0NBQWtFO0FBQ2xFLDZEQUE2RDtBQUU3RCxxQ0FBcUM7QUFRckM7SUFHRyxzQkFBb0IsU0FBMkIsRUFBVSxnQkFBa0M7UUFBdkUsY0FBUyxHQUFULFNBQVMsQ0FBa0I7UUFBVSxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ3hGLElBQUksQ0FBQyxPQUFPLEdBQUc7WUFDWixPQUFPLEVBQUUsSUFBSTtZQUNiLFlBQVksRUFBRSxJQUFJO1lBQ2xCLFlBQVksRUFBRSxJQUFJO1lBQ2xCLGdCQUFnQjtZQUNoQixRQUFRLEVBQUUsQ0FBQztZQUNYLGVBQWUsRUFBRSxJQUFJO1lBQ3JCLFlBQVksRUFBRSxJQUFJO1NBQ3BCLENBQUM7UUFFRixTQUFTLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2xDLFNBQVMsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFDSixtQkFBQztBQUFELENBakJBLEFBaUJDLElBQUE7QUFqQkQ7SUFQQyxnQkFBUyxDQUFDO1FBQ1IsUUFBUSxFQUFFLEtBQUs7UUFDZixRQUFRLEVBQUUsZ0hBR1o7S0FDQSxDQUFDO3FDQUlnQyxnQ0FBZ0IsRUFBNEIsdUJBQWdCO2dCQWM3RjtBQWpCWSx1QkFBQSxZQUFZLENBQUEiLCJmaWxlIjoiYXBwLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ3JlYXRlZCBieSB6aG9uZ3BpbmcubHUgb24gOS8xNS8yMDE2LlxuICovXG5cbmltcG9ydCB7Q29tcG9uZW50LCBPbkluaXQsIFZpZXdDb250YWluZXJSZWZ9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge1RyYW5zbGF0ZVNlcnZpY2V9IGZyb20gXCJuZzItdHJhbnNsYXRlL25nMi10cmFuc2xhdGVcIjtcblxuLy9UT0RPOiBtb3ZlIHRlbXBsYXRlIHRvIHZpZXdzIGZvbGRlclxuQENvbXBvbmVudCh7XG4gICBzZWxlY3RvcjogXCJhcHBcIixcbiAgIHRlbXBsYXRlOiBgXG4gICA8cm91dGVyLW91dGxldD48L3JvdXRlci1vdXRsZXQ+XG4gICA8c2ltcGxlLW5vdGlmaWNhdGlvbnMgW29wdGlvbnNdPVwib3B0aW9uc1wiPjwvc2ltcGxlLW5vdGlmaWNhdGlvbnM+XG5gXG59KVxuZXhwb3J0IGNsYXNzIEFwcENvbXBvbmVudCB7XG4gICBvcHRpb25zOiBhbnk7XG5cbiAgIGNvbnN0cnVjdG9yKHByaXZhdGUgdHJhbnNsYXRlOiBUcmFuc2xhdGVTZXJ2aWNlLCBwcml2YXRlIHZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYpIHtcbiAgICAgIHRoaXMub3B0aW9ucyA9IHtcbiAgICAgICAgIHRpbWVPdXQ6IDUwMDAsXG4gICAgICAgICBsYXN0T25Cb3R0b206IHRydWUsXG4gICAgICAgICBjbGlja1RvQ2xvc2U6IHRydWUsXG4gICAgICAgICAvLyBtYXhMZW5ndGg6IDAsXG4gICAgICAgICBtYXhTdGFjazogNyxcbiAgICAgICAgIHNob3dQcm9ncmVzc0JhcjogdHJ1ZSxcbiAgICAgICAgIHBhdXNlT25Ib3ZlcjogdHJ1ZVxuICAgICAgfTtcblxuICAgICAgdHJhbnNsYXRlLnNldERlZmF1bHRMYW5nKFwiZW4tVVNcIik7XG4gICAgICB0cmFuc2xhdGUudXNlKG5hdmlnYXRvci5sYW5ndWFnZSk7XG4gICB9XG59Il19
