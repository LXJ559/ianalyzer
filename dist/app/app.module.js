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
var platform_browser_1 = require("@angular/platform-browser");
var app_component_1 = require("./app.component");
var app_router_1 = require("./app.router");
var main_component_1 = require("./components/main.component");
var navigator_component_1 = require("./components/navigator.component");
var mydaterangepicker_1 = require("mydaterangepicker");
var ng2_translate_1 = require("ng2-translate/ng2-translate");
var http_1 = require("@angular/http");
var analyzer_component_1 = require("./components/analyzer.component");
var main_1 = require("ag-grid-ng2/main");
var sidebar_directive_1 = require("./directives/sidebar.directive");
var titlebar_component_1 = require("./components/titlebar.component");
var breadcrumb_component_1 = require("./components/breadcrumb.component");
var login_component_1 = require("./components/login.component");
var auth_service_1 = require("./services/auth.service");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
var dialog_widget_1 = require("./widgets/dialog.widget");
var components_1 = require("angular2-notifications/components");
var upload_dialog_component_1 = require("./components/upload.dialog.component");
var ng2_file_upload_1 = require("ng2-file-upload/ng2-file-upload");
var file_service_1 = require("./services/file.service");
var preview_component_1 = require("./components/preview.component");
var exception_service_1 = require("./services/exception.service");
var dict_mgmt_component_1 = require("./components/dict.mgmt.component");
var dict_service_1 = require("./services/dict.service");
var user_mgmt_component_1 = require("./components/user.mgmt.component");
var rest_service_1 = require("./services/rest.service");
var user_service_1 = require("./services/user.service");
var ng2_bootstrap_1 = require("ng2-bootstrap");
var alert_widget_1 = require("./widgets/alert.widget");
var category_mgmt_component_1 = require("./components/category.mgmt.component");
var category_upload_form_component_1 = require("./components/category.upload.form.component");
var category_preview_component_1 = require("./components/category.preview.component");
var hospital_componnent_1 = require("./components/hospital.componnent");
var agent_componnent_1 = require("./components/agent.componnent");
var bu_componnent_1 = require("./components/bu.componnent");
var currency_componnent_1 = require("./components/currency.componnent");
var product_componnent_1 = require("./components/product.componnent");
var unit_componnent_1 = require("./components/unit.componnent");
var dataOutput_componnent_1 = require("./components/dataOutput.componnent");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            app_router_1.routing,
            http_1.HttpModule,
            ng2_translate_1.TranslateModule.forRoot({
                provide: ng2_translate_1.TranslateLoader,
                useFactory: function (http) { return new ng2_translate_1.TranslateStaticLoader(http, "./i18n", ".json"); },
                deps: [http_1.Http]
            }),
            main_1.AgGridModule.forRoot(),
            ng2_bootstrap_1.Ng2BootstrapModule,
            forms_1.FormsModule,
            components_1.SimpleNotificationsModule,
            ng2_file_upload_1.FileUploadModule,
            mydaterangepicker_1.MyDateRangePickerModule
        ],
        declarations: [
            app_component_1.AppComponent,
            dialog_widget_1.DialogWidget,
            alert_widget_1.AlertWidget,
            login_component_1.LoginComponent,
            main_component_1.MainComponent,
            navigator_component_1.NavigatorComponent,
            breadcrumb_component_1.BreadcrumbsComponent,
            titlebar_component_1.TitleBarComponent,
            analyzer_component_1.AnalyzerComponent,
            upload_dialog_component_1.UploadDialogComponent,
            sidebar_directive_1.SIDEBAR_TOGGLE_DIRECTIVES,
            preview_component_1.PreviewComponent,
            dict_mgmt_component_1.DictMgmtComponent,
            user_mgmt_component_1.UserMgmtComponent,
            category_upload_form_component_1.CategoryUploadFormComponent,
            category_mgmt_component_1.CategoryMgmtComponent,
            category_preview_component_1.CategoryPreview,
            hospital_componnent_1.HospitalManageComponent,
            agent_componnent_1.AgentManageComponent,
            bu_componnent_1.BuManageComponent,
            currency_componnent_1.CurrencyManageComponent,
            product_componnent_1.ProductManageComponent,
            unit_componnent_1.UnitManageComponent,
            dataOutput_componnent_1.DataOutputComponent
        ],
        providers: [
            // http://stackoverflow.com/questions/35284988/angular-2-404-error-occur-when-i-refresh-through-browser
            { provide: common_1.LocationStrategy, useClass: common_1.HashLocationStrategy },
            ng2_translate_1.TranslateService,
            ng2_translate_1.Parser,
            app_router_1.appRoutingProviders,
            exception_service_1.ExceptionService,
            rest_service_1.RestService,
            auth_service_1.AuthService,
            file_service_1.FileService,
            dict_service_1.DictService,
            user_service_1.UserService
        ],
        bootstrap: [app_component_1.AppComponent]
    }),
    __metadata("design:paramtypes", [])
], AppModule);
exports.AppModule = AppModule;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOztHQUVHO0FBQ0gsc0NBQXVDO0FBQ3ZDLDhEQUF3RDtBQUN4RCxpREFBNkM7QUFDN0MsMkNBQTBEO0FBQzFELDhEQUEwRDtBQUMxRCx3RUFBb0U7QUFDcEUsdURBQTJEO0FBQzNELDZEQU1xQztBQUNyQyxzQ0FBK0M7QUFDL0Msc0VBQWtFO0FBQ2xFLHlDQUE4QztBQUM5QyxvRUFBeUU7QUFDekUsc0VBQWtFO0FBQ2xFLDBFQUF1RTtBQUN2RSxnRUFBNEQ7QUFDNUQsd0RBQW9EO0FBQ3BELHdDQUEyQztBQUMzQywwQ0FBdUU7QUFDdkUseURBQXFEO0FBQ3JELGdFQUE0RTtBQUM1RSxnRkFBMkU7QUFDM0UsbUVBQWlFO0FBQ2pFLHdEQUFvRDtBQUNwRCxvRUFBZ0U7QUFDaEUsa0VBQThEO0FBQzlELHdFQUFtRTtBQUNuRSx3REFBb0Q7QUFDcEQsd0VBQW1FO0FBQ25FLHdEQUFvRDtBQUNwRCx3REFBb0Q7QUFDcEQsK0NBQWlEO0FBQ2pELHVEQUFtRDtBQUNuRCxnRkFBMkU7QUFDM0UsOEZBQXdGO0FBQ3hGLHNGQUF3RTtBQUN4RSx3RUFBeUU7QUFDekUsa0VBQW1FO0FBQ25FLDREQUE2RDtBQUM3RCx3RUFBeUU7QUFDekUsc0VBQXVFO0FBQ3ZFLGdFQUFpRTtBQUNqRSw0RUFBdUU7QUE2RHZFO0lBQUE7SUFBd0IsQ0FBQztJQUFELGdCQUFDO0FBQUQsQ0FBeEIsQUFBeUIsSUFBQTtBQUF6QjtJQTFEQyxlQUFRLENBQUM7UUFDUCxPQUFPLEVBQUU7WUFDTixnQ0FBYTtZQUNiLG9CQUFPO1lBQ1AsaUJBQVU7WUFDViwrQkFBZSxDQUFDLE9BQU8sQ0FBQztnQkFDckIsT0FBTyxFQUFFLCtCQUFlO2dCQUN4QixVQUFVLEVBQUUsVUFBQyxJQUFVLElBQUssT0FBQSxJQUFJLHFDQUFxQixDQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsT0FBTyxDQUFDLEVBQWxELENBQWtEO2dCQUM5RSxJQUFJLEVBQUUsQ0FBQyxXQUFJLENBQUM7YUFDZCxDQUFDO1lBQ0YsbUJBQVksQ0FBQyxPQUFPLEVBQUU7WUFDdEIsa0NBQWtCO1lBQ2xCLG1CQUFXO1lBQ1gsc0NBQXlCO1lBQ3pCLGtDQUFnQjtZQUNoQiwyQ0FBdUI7U0FDekI7UUFDRCxZQUFZLEVBQUU7WUFDWCw0QkFBWTtZQUNaLDRCQUFZO1lBQ1osMEJBQVc7WUFDWCxnQ0FBYztZQUNkLDhCQUFhO1lBQ2Isd0NBQWtCO1lBQ2xCLDJDQUFvQjtZQUNwQixzQ0FBaUI7WUFDakIsc0NBQWlCO1lBQ2pCLCtDQUFxQjtZQUNyQiw2Q0FBeUI7WUFDekIsb0NBQWdCO1lBQ2hCLHVDQUFpQjtZQUNqQix1Q0FBaUI7WUFDakIsNERBQTJCO1lBQzNCLCtDQUFxQjtZQUNyQiw0Q0FBZTtZQUNmLDZDQUF1QjtZQUN2Qix1Q0FBb0I7WUFDcEIsaUNBQWlCO1lBQ2pCLDZDQUF1QjtZQUN2QiwyQ0FBc0I7WUFDdEIscUNBQW1CO1lBQ25CLDJDQUFtQjtTQUNyQjtRQUNELFNBQVMsRUFBRTtZQUNSLHVHQUF1RztZQUN2RyxFQUFDLE9BQU8sRUFBRSx5QkFBZ0IsRUFBRSxRQUFRLEVBQUUsNkJBQW9CLEVBQUM7WUFDM0QsZ0NBQWdCO1lBQ2hCLHNCQUFNO1lBQ04sZ0NBQW1CO1lBQ25CLG9DQUFnQjtZQUNoQiwwQkFBVztZQUNYLDBCQUFXO1lBQ1gsMEJBQVc7WUFDWCwwQkFBVztZQUNYLDBCQUFXO1NBQ2I7UUFDRCxTQUFTLEVBQUUsQ0FBQyw0QkFBWSxDQUFDO0tBQzNCLENBQUM7O2FBQ3VCO0FBQVosb0JBQUEsU0FBUyxDQUFBIiwiZmlsZSI6ImFwcC5tb2R1bGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENyZWF0ZWQgYnkgemhvbmdwaW5nLmx1IG9uIDkvMTUvMjAxNi5cbiAqL1xuaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7QnJvd3Nlck1vZHVsZX0gZnJvbSBcIkBhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXJcIjtcbmltcG9ydCB7QXBwQ29tcG9uZW50fSBmcm9tIFwiLi9hcHAuY29tcG9uZW50XCI7XG5pbXBvcnQge3JvdXRpbmcsIGFwcFJvdXRpbmdQcm92aWRlcnN9IGZyb20gXCIuL2FwcC5yb3V0ZXJcIjtcbmltcG9ydCB7TWFpbkNvbXBvbmVudH0gZnJvbSBcIi4vY29tcG9uZW50cy9tYWluLmNvbXBvbmVudFwiO1xuaW1wb3J0IHtOYXZpZ2F0b3JDb21wb25lbnR9IGZyb20gXCIuL2NvbXBvbmVudHMvbmF2aWdhdG9yLmNvbXBvbmVudFwiO1xuaW1wb3J0IHtNeURhdGVSYW5nZVBpY2tlck1vZHVsZSB9IGZyb20gJ215ZGF0ZXJhbmdlcGlja2VyJztcbmltcG9ydCB7XG4gICBUcmFuc2xhdGVNb2R1bGUsXG4gICBUcmFuc2xhdGVMb2FkZXIsXG4gICBUcmFuc2xhdGVTdGF0aWNMb2FkZXIsXG4gICBUcmFuc2xhdGVTZXJ2aWNlLFxuICAgUGFyc2VyXG59IGZyb20gXCJuZzItdHJhbnNsYXRlL25nMi10cmFuc2xhdGVcIjtcbmltcG9ydCB7SHR0cCwgSHR0cE1vZHVsZX0gZnJvbSBcIkBhbmd1bGFyL2h0dHBcIjtcbmltcG9ydCB7QW5hbHl6ZXJDb21wb25lbnR9IGZyb20gXCIuL2NvbXBvbmVudHMvYW5hbHl6ZXIuY29tcG9uZW50XCI7XG5pbXBvcnQge0FnR3JpZE1vZHVsZX0gZnJvbSBcImFnLWdyaWQtbmcyL21haW5cIjtcbmltcG9ydCB7U0lERUJBUl9UT0dHTEVfRElSRUNUSVZFU30gZnJvbSBcIi4vZGlyZWN0aXZlcy9zaWRlYmFyLmRpcmVjdGl2ZVwiO1xuaW1wb3J0IHtUaXRsZUJhckNvbXBvbmVudH0gZnJvbSBcIi4vY29tcG9uZW50cy90aXRsZWJhci5jb21wb25lbnRcIjtcbmltcG9ydCB7QnJlYWRjcnVtYnNDb21wb25lbnR9IGZyb20gXCIuL2NvbXBvbmVudHMvYnJlYWRjcnVtYi5jb21wb25lbnRcIjtcbmltcG9ydCB7TG9naW5Db21wb25lbnR9IGZyb20gXCIuL2NvbXBvbmVudHMvbG9naW4uY29tcG9uZW50XCI7XG5pbXBvcnQge0F1dGhTZXJ2aWNlfSBmcm9tIFwiLi9zZXJ2aWNlcy9hdXRoLnNlcnZpY2VcIjtcbmltcG9ydCB7Rm9ybXNNb2R1bGV9IGZyb20gXCJAYW5ndWxhci9mb3Jtc1wiO1xuaW1wb3J0IHtMb2NhdGlvblN0cmF0ZWd5LCBIYXNoTG9jYXRpb25TdHJhdGVneX0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vblwiO1xuaW1wb3J0IHtEaWFsb2dXaWRnZXR9IGZyb20gXCIuL3dpZGdldHMvZGlhbG9nLndpZGdldFwiO1xuaW1wb3J0IHtTaW1wbGVOb3RpZmljYXRpb25zTW9kdWxlfSBmcm9tIFwiYW5ndWxhcjItbm90aWZpY2F0aW9ucy9jb21wb25lbnRzXCI7XG5pbXBvcnQge1VwbG9hZERpYWxvZ0NvbXBvbmVudH0gZnJvbSBcIi4vY29tcG9uZW50cy91cGxvYWQuZGlhbG9nLmNvbXBvbmVudFwiO1xuaW1wb3J0IHtGaWxlVXBsb2FkTW9kdWxlfSBmcm9tIFwibmcyLWZpbGUtdXBsb2FkL25nMi1maWxlLXVwbG9hZFwiO1xuaW1wb3J0IHtGaWxlU2VydmljZX0gZnJvbSBcIi4vc2VydmljZXMvZmlsZS5zZXJ2aWNlXCI7XG5pbXBvcnQge1ByZXZpZXdDb21wb25lbnR9IGZyb20gXCIuL2NvbXBvbmVudHMvcHJldmlldy5jb21wb25lbnRcIjtcbmltcG9ydCB7RXhjZXB0aW9uU2VydmljZX0gZnJvbSBcIi4vc2VydmljZXMvZXhjZXB0aW9uLnNlcnZpY2VcIjtcbmltcG9ydCB7RGljdE1nbXRDb21wb25lbnR9IGZyb20gXCIuL2NvbXBvbmVudHMvZGljdC5tZ210LmNvbXBvbmVudFwiO1xuaW1wb3J0IHtEaWN0U2VydmljZX0gZnJvbSBcIi4vc2VydmljZXMvZGljdC5zZXJ2aWNlXCI7XG5pbXBvcnQge1VzZXJNZ210Q29tcG9uZW50fSBmcm9tIFwiLi9jb21wb25lbnRzL3VzZXIubWdtdC5jb21wb25lbnRcIjtcbmltcG9ydCB7UmVzdFNlcnZpY2V9IGZyb20gXCIuL3NlcnZpY2VzL3Jlc3Quc2VydmljZVwiO1xuaW1wb3J0IHtVc2VyU2VydmljZX0gZnJvbSBcIi4vc2VydmljZXMvdXNlci5zZXJ2aWNlXCI7XG5pbXBvcnQge05nMkJvb3RzdHJhcE1vZHVsZX0gZnJvbSBcIm5nMi1ib290c3RyYXBcIjtcbmltcG9ydCB7QWxlcnRXaWRnZXR9IGZyb20gXCIuL3dpZGdldHMvYWxlcnQud2lkZ2V0XCI7XG5pbXBvcnQge0NhdGVnb3J5TWdtdENvbXBvbmVudH0gZnJvbSBcIi4vY29tcG9uZW50cy9jYXRlZ29yeS5tZ210LmNvbXBvbmVudFwiO1xuaW1wb3J0IHtDYXRlZ29yeVVwbG9hZEZvcm1Db21wb25lbnR9IGZyb20gXCIuL2NvbXBvbmVudHMvY2F0ZWdvcnkudXBsb2FkLmZvcm0uY29tcG9uZW50XCI7XG5pbXBvcnQge0NhdGVnb3J5UHJldmlld30gZnJvbSBcIi4vY29tcG9uZW50cy9jYXRlZ29yeS5wcmV2aWV3LmNvbXBvbmVudFwiO1xuaW1wb3J0IHtIb3NwaXRhbE1hbmFnZUNvbXBvbmVudH0gZnJvbSBcIi4vY29tcG9uZW50cy9ob3NwaXRhbC5jb21wb25uZW50XCI7XG5pbXBvcnQge0FnZW50TWFuYWdlQ29tcG9uZW50fSBmcm9tIFwiLi9jb21wb25lbnRzL2FnZW50LmNvbXBvbm5lbnRcIjtcbmltcG9ydCB7QnVNYW5hZ2VDb21wb25lbnR9IGZyb20gXCIuL2NvbXBvbmVudHMvYnUuY29tcG9ubmVudFwiO1xuaW1wb3J0IHtDdXJyZW5jeU1hbmFnZUNvbXBvbmVudH0gZnJvbSBcIi4vY29tcG9uZW50cy9jdXJyZW5jeS5jb21wb25uZW50XCI7XG5pbXBvcnQge1Byb2R1Y3RNYW5hZ2VDb21wb25lbnR9IGZyb20gXCIuL2NvbXBvbmVudHMvcHJvZHVjdC5jb21wb25uZW50XCI7XG5pbXBvcnQge1VuaXRNYW5hZ2VDb21wb25lbnR9IGZyb20gXCIuL2NvbXBvbmVudHMvdW5pdC5jb21wb25uZW50XCI7XG5pbXBvcnQge0RhdGFPdXRwdXRDb21wb25lbnR9IGZyb20gXCIuL2NvbXBvbmVudHMvZGF0YU91dHB1dC5jb21wb25uZW50XCI7XG5cblxuQE5nTW9kdWxlKHtcbiAgIGltcG9ydHM6IFtcbiAgICAgIEJyb3dzZXJNb2R1bGUsXG4gICAgICByb3V0aW5nLFxuICAgICAgSHR0cE1vZHVsZSxcbiAgICAgIFRyYW5zbGF0ZU1vZHVsZS5mb3JSb290KHtcbiAgICAgICAgIHByb3ZpZGU6IFRyYW5zbGF0ZUxvYWRlcixcbiAgICAgICAgIHVzZUZhY3Rvcnk6IChodHRwOiBIdHRwKSA9PiBuZXcgVHJhbnNsYXRlU3RhdGljTG9hZGVyKGh0dHAsIFwiLi9pMThuXCIsIFwiLmpzb25cIiksXG4gICAgICAgICBkZXBzOiBbSHR0cF1cbiAgICAgIH0pLFxuICAgICAgQWdHcmlkTW9kdWxlLmZvclJvb3QoKSxcbiAgICAgIE5nMkJvb3RzdHJhcE1vZHVsZSxcbiAgICAgIEZvcm1zTW9kdWxlLFxuICAgICAgU2ltcGxlTm90aWZpY2F0aW9uc01vZHVsZSxcbiAgICAgIEZpbGVVcGxvYWRNb2R1bGUsXG4gICAgICBNeURhdGVSYW5nZVBpY2tlck1vZHVsZVxuICAgXSxcbiAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgQXBwQ29tcG9uZW50LFxuICAgICAgRGlhbG9nV2lkZ2V0LFxuICAgICAgQWxlcnRXaWRnZXQsXG4gICAgICBMb2dpbkNvbXBvbmVudCxcbiAgICAgIE1haW5Db21wb25lbnQsXG4gICAgICBOYXZpZ2F0b3JDb21wb25lbnQsXG4gICAgICBCcmVhZGNydW1ic0NvbXBvbmVudCxcbiAgICAgIFRpdGxlQmFyQ29tcG9uZW50LFxuICAgICAgQW5hbHl6ZXJDb21wb25lbnQsXG4gICAgICBVcGxvYWREaWFsb2dDb21wb25lbnQsXG4gICAgICBTSURFQkFSX1RPR0dMRV9ESVJFQ1RJVkVTLFxuICAgICAgUHJldmlld0NvbXBvbmVudCxcbiAgICAgIERpY3RNZ210Q29tcG9uZW50LFxuICAgICAgVXNlck1nbXRDb21wb25lbnQsXG4gICAgICBDYXRlZ29yeVVwbG9hZEZvcm1Db21wb25lbnQsXG4gICAgICBDYXRlZ29yeU1nbXRDb21wb25lbnQsXG4gICAgICBDYXRlZ29yeVByZXZpZXcsXG4gICAgICBIb3NwaXRhbE1hbmFnZUNvbXBvbmVudCxcbiAgICAgIEFnZW50TWFuYWdlQ29tcG9uZW50LFxuICAgICAgQnVNYW5hZ2VDb21wb25lbnQsXG4gICAgICBDdXJyZW5jeU1hbmFnZUNvbXBvbmVudCxcbiAgICAgIFByb2R1Y3RNYW5hZ2VDb21wb25lbnQsXG4gICAgICBVbml0TWFuYWdlQ29tcG9uZW50LFxuICAgICAgRGF0YU91dHB1dENvbXBvbmVudFxuICAgXSxcbiAgIHByb3ZpZGVyczogW1xuICAgICAgLy8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8zNTI4NDk4OC9hbmd1bGFyLTItNDA0LWVycm9yLW9jY3VyLXdoZW4taS1yZWZyZXNoLXRocm91Z2gtYnJvd3NlclxuICAgICAge3Byb3ZpZGU6IExvY2F0aW9uU3RyYXRlZ3ksIHVzZUNsYXNzOiBIYXNoTG9jYXRpb25TdHJhdGVneX0sXG4gICAgICBUcmFuc2xhdGVTZXJ2aWNlLFxuICAgICAgUGFyc2VyLFxuICAgICAgYXBwUm91dGluZ1Byb3ZpZGVycyxcbiAgICAgIEV4Y2VwdGlvblNlcnZpY2UsXG4gICAgICBSZXN0U2VydmljZSxcbiAgICAgIEF1dGhTZXJ2aWNlLFxuICAgICAgRmlsZVNlcnZpY2UsXG4gICAgICBEaWN0U2VydmljZSxcbiAgICAgIFVzZXJTZXJ2aWNlXG4gICBdLFxuICAgYm9vdHN0cmFwOiBbQXBwQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBBcHBNb2R1bGUge30iXX0=
