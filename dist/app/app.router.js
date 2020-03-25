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
var main_component_1 = require("./components/main.component");
var analyzer_component_1 = require("./components/analyzer.component");
var login_component_1 = require("./components/login.component");
var ng2_translate_1 = require("ng2-translate/ng2-translate");
var dict_mgmt_component_1 = require("./components/dict.mgmt.component");
var user_mgmt_component_1 = require("./components/user.mgmt.component");
var rxjs_1 = require("rxjs");
var auth_service_1 = require("./services/auth.service");
var auth_model_1 = require("./models/auth.model");
var file_service_1 = require("./services/file.service");
var category_mgmt_component_1 = require("./components/category.mgmt.component");
var hospital_componnent_1 = require("./components/hospital.componnent");
var agent_componnent_1 = require("./components/agent.componnent");
var bu_componnent_1 = require("./components/bu.componnent");
var currency_componnent_1 = require("./components/currency.componnent");
var product_componnent_1 = require("./components/product.componnent");
var unit_componnent_1 = require("./components/unit.componnent");
var dataOutput_componnent_1 = require("./components/dataOutput.componnent");
var TranslateResolver = (function () {
    function TranslateResolver(translate) {
        this.translate = translate;
    }
    TranslateResolver.prototype.resolve = function (route, state) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.translate.use(_this.translate.currentLang).subscribe(function () {
                resolve(true);
            });
        });
    };
    return TranslateResolver;
}());
TranslateResolver = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [ng2_translate_1.TranslateService])
], TranslateResolver);
exports.TranslateResolver = TranslateResolver;
var FileStatusResolver = (function () {
    function FileStatusResolver(service) {
        this.service = service;
    }
    FileStatusResolver.prototype.resolve = function (route, state) {
        return this.service.getFileStatus();
    };
    return FileStatusResolver;
}());
FileStatusResolver = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [file_service_1.FileService])
], FileStatusResolver);
exports.FileStatusResolver = FileStatusResolver;
var AuthGuard = (function () {
    function AuthGuard(auth, router) {
        this.auth = auth;
        this.router = router;
    }
    AuthGuard.prototype.canActivate = function (route, state) {
        var _this = this;
        return rxjs_1.Observable.create(function (observer) {
            var userToken = _this.auth.getToken();
            if (userToken && userToken.token && userToken.user.id) {
                observer.next(true);
                observer.complete();
            }
            else {
                observer.next(false);
                observer.complete();
                _this.router.navigate(["/login"]);
            }
        });
    };
    return AuthGuard;
}());
AuthGuard = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [auth_service_1.AuthService, router_1.Router])
], AuthGuard);
exports.AuthGuard = AuthGuard;
var AdminGuard = (function () {
    function AdminGuard(auth, router) {
        this.auth = auth;
        this.router = router;
    }
    AdminGuard.prototype.canActivate = function (route, state) {
        var _this = this;
        return rxjs_1.Observable.create(function (observer) {
            var userToken = _this.auth.getToken();
            if (userToken && userToken.token && userToken.user.id) {
                var isAdmin = userToken.user.type === auth_model_1.UserType.Admin;
                observer.next(isAdmin);
                observer.complete();
                if (!isAdmin) {
                    _this.router.navigate(["/home"]);
                }
            }
            else {
                observer.next(false);
                observer.complete();
                _this.router.navigate(["/login"]);
            }
        });
    };
    return AdminGuard;
}());
AdminGuard = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [auth_service_1.AuthService, router_1.Router])
], AdminGuard);
exports.AdminGuard = AdminGuard;
var appRoutes = [{
        path: "home",
        component: main_component_1.MainComponent,
        data: {
            titleKey: "nav.home.label",
            descKey: "nav.home.desc"
        },
        canActivate: [AuthGuard],
        resolve: {
            i18n: TranslateResolver
        },
        children: [{
                path: "",
                redirectTo: "analyzer",
                pathMatch: "prefix"
            }, {
                path: "analyzer",
                component: analyzer_component_1.AnalyzerComponent,
                resolve: {
                    fileStatus: FileStatusResolver
                },
                data: {
                    titleKey: "nav.analyzer.label",
                    descKey: "nav.analyzer.desc"
                }
            }, {
                path: "dataManage",
                data: {
                    titleKey: "主数据维护",
                    descKey: "主数据维护"
                },
                children: [{
                        path: 'hospital',
                        component: hospital_componnent_1.HospitalManageComponent,
                        data: {
                            titleKey: "医院数据维护",
                            descKey: "医院数据维护"
                        }
                    },
                    {
                        path: 'agent',
                        component: agent_componnent_1.AgentManageComponent,
                        data: {
                            titleKey: "代理商数据维护",
                            descKey: "代理商数据维护"
                        },
                    },
                    {
                        path: 'bu',
                        component: bu_componnent_1.BuManageComponent,
                        data: {
                            titleKey: "BU数据维护",
                            descKey: "BU数据维护"
                        },
                    },
                    {
                        path: 'currency',
                        component: currency_componnent_1.CurrencyManageComponent,
                        data: {
                            titleKey: "货币数据维护",
                            descKey: "货币数据维护"
                        },
                    },
                    {
                        path: 'product',
                        component: product_componnent_1.ProductManageComponent,
                        data: {
                            titleKey: "产品数据维护",
                            descKey: "产品数据维护"
                        },
                    },
                    {
                        path: 'unit',
                        component: unit_componnent_1.UnitManageComponent,
                        data: {
                            titleKey: "单位数据维护",
                            descKey: "单位数据维护"
                        },
                    },
                    {
                        path: 'dataOutput',
                        component: dataOutput_componnent_1.DataOutputComponent,
                        data: {
                            titleKey: "主数据导入",
                            descKey: "主数据导入"
                        },
                    }]
            }, {
                path: "admin",
                canActivate: [AdminGuard],
                data: {
                    titleKey: "nav.admin.label",
                    descKey: "nav.admin.desc"
                },
                children: [{
                        path: "",
                        redirectTo: "dict",
                        pathMatch: "prefix"
                    }, {
                        path: "dict",
                        component: dict_mgmt_component_1.DictMgmtComponent,
                        data: {
                            titleKey: "nav.admin.dict.label",
                            descKey: "nav.admin.dict.desc"
                        }
                    }, {
                        path: "user",
                        component: user_mgmt_component_1.UserMgmtComponent,
                        data: {
                            titleKey: "nav.admin.user.label",
                            descKey: "nav.admin.user.desc"
                        }
                    }, {
                        path: "role",
                        data: {
                            titleKey: "nav.admin.role.label",
                            descKey: "nav.admin.role.desc"
                        }
                    }, {
                        path: "item",
                        data: {
                            titleKey: "nav.admin.item.label",
                            descKey: "nav.admin.item.desc"
                        }
                    }, {
                        path: "category",
                        component: category_mgmt_component_1.CategoryMgmtComponent,
                        data: {
                            titleKey: "nav.admin.category.label",
                            descKey: "nav.admin.category.desc"
                        }
                    }]
            }]
    }, {
        path: "login",
        component: login_component_1.LoginComponent,
        resolve: {
            i18n: TranslateResolver
        }
    }, {
        path: "",
        redirectTo: "home",
        pathMatch: "full"
    }];
exports.appRoutingProviders = [TranslateResolver, FileStatusResolver, AuthGuard, AdminGuard];
exports.routing = router_1.RouterModule.forRoot(appRoutes);

//# sourceMappingURL=data:application/json;charset=utf8;base64,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QkFDWixTQUFTLEVBQUUsdUNBQWlCO3dCQUM1QixJQUFJLEVBQUU7NEJBQ0gsUUFBUSxFQUFFLHNCQUFzQjs0QkFDaEMsT0FBTyxFQUFFLHFCQUFxQjt5QkFDaEM7cUJBQ0gsRUFBRTt3QkFDQSxJQUFJLEVBQUUsTUFBTTt3QkFDWixJQUFJLEVBQUU7NEJBQ0gsUUFBUSxFQUFFLHNCQUFzQjs0QkFDaEMsT0FBTyxFQUFFLHFCQUFxQjt5QkFDaEM7cUJBQ0gsRUFBRTt3QkFDQSxJQUFJLEVBQUUsTUFBTTt3QkFDWixJQUFJLEVBQUU7NEJBQ0gsUUFBUSxFQUFFLHNCQUFzQjs0QkFDaEMsT0FBTyxFQUFFLHFCQUFxQjt5QkFDaEM7cUJBQ0gsRUFBRTt3QkFDQSxJQUFJLEVBQUUsVUFBVTt3QkFDaEIsU0FBUyxFQUFFLCtDQUFxQjt3QkFDaEMsSUFBSSxFQUFFOzRCQUNILFFBQVEsRUFBRSwwQkFBMEI7NEJBQ3BDLE9BQU8sRUFBRSx5QkFBeUI7eUJBQ3BDO3FCQUNILENBQUM7YUFDSixDQUFDO0tBQ0osRUFBRTtRQUNBLElBQUksRUFBRSxPQUFPO1FBQ2IsU0FBUyxFQUFFLGdDQUFjO1FBQ3pCLE9BQU8sRUFBRTtZQUNOLElBQUksRUFBRSxpQkFBaUI7U0FDekI7S0FDSCxFQUFFO1FBQ0EsSUFBSSxFQUFFLEVBQUU7UUFDUixVQUFVLEVBQUUsTUFBTTtRQUNsQixTQUFTLEVBQUUsTUFBTTtLQUNuQixDQUFDLENBQUM7QUFHVSxRQUFBLG1CQUFtQixHQUFVLENBQUMsaUJBQWlCLEVBQUUsa0JBQWtCLEVBQUUsU0FBUyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0FBRTVGLFFBQUEsT0FBTyxHQUF3QixxQkFBWSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyIsImZpbGUiOiJhcHAucm91dGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDcmVhdGVkIGJ5IHpob25ncGluZy5sdSBvbiA5LzE1LzIwMTYuXG4gKi9cbmltcG9ydCB7TW9kdWxlV2l0aFByb3ZpZGVycywgSW5qZWN0YWJsZX0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7XG4gICBSb3V0ZXMsIFJvdXRlck1vZHVsZSwgUmVzb2x2ZSwgQWN0aXZhdGVkUm91dGVTbmFwc2hvdCwgUm91dGVyU3RhdGVTbmFwc2hvdCwgQ2FuQWN0aXZhdGUsXG4gICBSb3V0ZXJcbn0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHtNYWluQ29tcG9uZW50fSBmcm9tIFwiLi9jb21wb25lbnRzL21haW4uY29tcG9uZW50XCI7XG5pbXBvcnQge0FuYWx5emVyQ29tcG9uZW50fSBmcm9tIFwiLi9jb21wb25lbnRzL2FuYWx5emVyLmNvbXBvbmVudFwiO1xuaW1wb3J0IHtMb2dpbkNvbXBvbmVudH0gZnJvbSBcIi4vY29tcG9uZW50cy9sb2dpbi5jb21wb25lbnRcIjtcbmltcG9ydCB7VHJhbnNsYXRlU2VydmljZX0gZnJvbSBcIm5nMi10cmFuc2xhdGUvbmcyLXRyYW5zbGF0ZVwiO1xuaW1wb3J0IHtEaWN0TWdtdENvbXBvbmVudH0gZnJvbSBcIi4vY29tcG9uZW50cy9kaWN0Lm1nbXQuY29tcG9uZW50XCI7XG5pbXBvcnQge1VzZXJNZ210Q29tcG9uZW50fSBmcm9tIFwiLi9jb21wb25lbnRzL3VzZXIubWdtdC5jb21wb25lbnRcIjtcbmltcG9ydCB7T2JzZXJ2YWJsZSwgT2JzZXJ2ZXJ9IGZyb20gXCJyeGpzXCI7XG5pbXBvcnQge0F1dGhTZXJ2aWNlfSBmcm9tIFwiLi9zZXJ2aWNlcy9hdXRoLnNlcnZpY2VcIjtcbmltcG9ydCB7VXNlclRva2VuLCBVc2VyVHlwZX0gZnJvbSBcIi4vbW9kZWxzL2F1dGgubW9kZWxcIjtcbmltcG9ydCB7RmlsZVN0YXR1c0Rlc2NyaWJlcn0gZnJvbSBcIi4vbW9kZWxzL2ZpbGUubW9kZWxcIjtcbmltcG9ydCB7RmlsZVNlcnZpY2V9IGZyb20gXCIuL3NlcnZpY2VzL2ZpbGUuc2VydmljZVwiO1xuaW1wb3J0IHtDYXRlZ29yeU1nbXRDb21wb25lbnR9IGZyb20gXCIuL2NvbXBvbmVudHMvY2F0ZWdvcnkubWdtdC5jb21wb25lbnRcIjtcbmltcG9ydCB7SG9zcGl0YWxNYW5hZ2VDb21wb25lbnR9IGZyb20gXCIuL2NvbXBvbmVudHMvaG9zcGl0YWwuY29tcG9ubmVudFwiO1xuaW1wb3J0IHtBZ2VudE1hbmFnZUNvbXBvbmVudH0gZnJvbSBcIi4vY29tcG9uZW50cy9hZ2VudC5jb21wb25uZW50XCI7XG5pbXBvcnQge0J1TWFuYWdlQ29tcG9uZW50fSBmcm9tIFwiLi9jb21wb25lbnRzL2J1LmNvbXBvbm5lbnRcIjtcbmltcG9ydCB7Q3VycmVuY3lNYW5hZ2VDb21wb25lbnR9IGZyb20gXCIuL2NvbXBvbmVudHMvY3VycmVuY3kuY29tcG9ubmVudFwiO1xuaW1wb3J0IHtQcm9kdWN0TWFuYWdlQ29tcG9uZW50fSBmcm9tIFwiLi9jb21wb25lbnRzL3Byb2R1Y3QuY29tcG9ubmVudFwiO1xuaW1wb3J0IHtVbml0TWFuYWdlQ29tcG9uZW50fSBmcm9tIFwiLi9jb21wb25lbnRzL3VuaXQuY29tcG9ubmVudFwiO1xuXG5pbXBvcnQge0RhdGFPdXRwdXRDb21wb25lbnR9IGZyb20gXCIuL2NvbXBvbmVudHMvZGF0YU91dHB1dC5jb21wb25uZW50XCI7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBUcmFuc2xhdGVSZXNvbHZlciBpbXBsZW1lbnRzIFJlc29sdmU8Ym9vbGVhbj4ge1xuICAgY29uc3RydWN0b3IocHJpdmF0ZSB0cmFuc2xhdGU6IFRyYW5zbGF0ZVNlcnZpY2UpIHt9XG5cbiAgIHJlc29sdmUocm91dGU6IEFjdGl2YXRlZFJvdXRlU25hcHNob3QsIHN0YXRlOiBSb3V0ZXJTdGF0ZVNuYXBzaG90KTogUHJvbWlzZTxib29sZWFuPiB8IGJvb2xlYW4ge1xuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgIHRoaXMudHJhbnNsYXRlLnVzZSh0aGlzLnRyYW5zbGF0ZS5jdXJyZW50TGFuZykuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XG4gICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgfVxufVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRmlsZVN0YXR1c1Jlc29sdmVyIGltcGxlbWVudHMgUmVzb2x2ZTxGaWxlU3RhdHVzRGVzY3JpYmVyW10+IHtcbiAgIGNvbnN0cnVjdG9yKHByaXZhdGUgc2VydmljZTogRmlsZVNlcnZpY2UpIHt9XG4gICByZXNvbHZlKHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90LCBzdGF0ZTogUm91dGVyU3RhdGVTbmFwc2hvdCk6IE9ic2VydmFibGU8RmlsZVN0YXR1c0Rlc2NyaWJlcltdPiB7XG4gICAgICByZXR1cm4gdGhpcy5zZXJ2aWNlLmdldEZpbGVTdGF0dXMoKTtcbiAgIH1cblxufVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQXV0aEd1YXJkIGltcGxlbWVudHMgQ2FuQWN0aXZhdGUge1xuICAgY29uc3RydWN0b3IocHJpdmF0ZSBhdXRoOiBBdXRoU2VydmljZSwgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcikge31cblxuICAgY2FuQWN0aXZhdGUocm91dGU6IEFjdGl2YXRlZFJvdXRlU25hcHNob3QsIHN0YXRlOiBSb3V0ZXJTdGF0ZVNuYXBzaG90KTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgICByZXR1cm4gT2JzZXJ2YWJsZS5jcmVhdGUoKG9ic2VydmVyOiBPYnNlcnZlcjxib29sZWFuPikgPT4ge1xuICAgICAgICAgbGV0IHVzZXJUb2tlbjogVXNlclRva2VuID0gdGhpcy5hdXRoLmdldFRva2VuKCk7XG5cbiAgICAgICAgIGlmICh1c2VyVG9rZW4gJiYgdXNlclRva2VuLnRva2VuICYmIHVzZXJUb2tlbi51c2VyLmlkKSB7XG4gICAgICAgICAgICBvYnNlcnZlci5uZXh0KHRydWUpO1xuICAgICAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcbiAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvYnNlcnZlci5uZXh0KGZhbHNlKTtcbiAgICAgICAgICAgIG9ic2VydmVyLmNvbXBsZXRlKCk7XG4gICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCIvbG9naW5cIl0pO1xuICAgICAgICAgfVxuICAgICAgfSk7XG4gICB9XG59XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBBZG1pbkd1YXJkIGltcGxlbWVudHMgQ2FuQWN0aXZhdGUge1xuICAgY29uc3RydWN0b3IocHJpdmF0ZSBhdXRoOiBBdXRoU2VydmljZSwgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcikge31cblxuICAgY2FuQWN0aXZhdGUocm91dGU6IEFjdGl2YXRlZFJvdXRlU25hcHNob3QsIHN0YXRlOiBSb3V0ZXJTdGF0ZVNuYXBzaG90KTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgICByZXR1cm4gT2JzZXJ2YWJsZS5jcmVhdGUoKG9ic2VydmVyOiBPYnNlcnZlcjxib29sZWFuPikgPT4ge1xuICAgICAgICAgbGV0IHVzZXJUb2tlbjogVXNlclRva2VuID0gdGhpcy5hdXRoLmdldFRva2VuKCk7XG4gICAgICAgICBpZiAodXNlclRva2VuICYmIHVzZXJUb2tlbi50b2tlbiAmJiB1c2VyVG9rZW4udXNlci5pZCkge1xuICAgICAgICAgICAgbGV0IGlzQWRtaW4gPSB1c2VyVG9rZW4udXNlci50eXBlID09PSBVc2VyVHlwZS5BZG1pbjtcbiAgICAgICAgICAgIG9ic2VydmVyLm5leHQoaXNBZG1pbik7XG4gICAgICAgICAgICBvYnNlcnZlci5jb21wbGV0ZSgpO1xuXG4gICAgICAgICAgICBpZiAoIWlzQWRtaW4pIHtcbiAgICAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcIi9ob21lXCJdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvYnNlcnZlci5uZXh0KGZhbHNlKTtcbiAgICAgICAgICAgIG9ic2VydmVyLmNvbXBsZXRlKCk7XG4gICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCIvbG9naW5cIl0pO1xuICAgICAgICAgfVxuICAgICAgfSk7XG4gICB9XG59XG5cbmNvbnN0IGFwcFJvdXRlczogUm91dGVzID0gW3tcbiAgIHBhdGg6IFwiaG9tZVwiLFxuICAgY29tcG9uZW50OiBNYWluQ29tcG9uZW50LFxuICAgZGF0YToge1xuICAgICAgdGl0bGVLZXk6IFwibmF2LmhvbWUubGFiZWxcIixcbiAgICAgIGRlc2NLZXk6IFwibmF2LmhvbWUuZGVzY1wiXG4gICB9LFxuICAgY2FuQWN0aXZhdGU6IFtBdXRoR3VhcmRdLFxuICAgcmVzb2x2ZToge1xuICAgICAgaTE4bjogVHJhbnNsYXRlUmVzb2x2ZXJcbiAgIH0sXG4gICBjaGlsZHJlbjogW3tcbiAgICAgIHBhdGg6IFwiXCIsXG4gICAgICByZWRpcmVjdFRvOiBcImFuYWx5emVyXCIsXG4gICAgICBwYXRoTWF0Y2g6IFwicHJlZml4XCJcbiAgIH0sIHtcbiAgICAgIHBhdGg6IFwiYW5hbHl6ZXJcIixcbiAgICAgIGNvbXBvbmVudDogQW5hbHl6ZXJDb21wb25lbnQsXG4gICAgICByZXNvbHZlOiB7XG4gICAgICAgICBmaWxlU3RhdHVzOiBGaWxlU3RhdHVzUmVzb2x2ZXJcbiAgICAgIH0sXG4gICAgICBkYXRhOiB7XG4gICAgICAgICB0aXRsZUtleTogXCJuYXYuYW5hbHl6ZXIubGFiZWxcIixcbiAgICAgICAgIGRlc2NLZXk6IFwibmF2LmFuYWx5emVyLmRlc2NcIlxuICAgICAgfVxuICAgfSwge1xuICAgICAgICAgcGF0aDogXCJkYXRhTWFuYWdlXCIsXG4gICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICB0aXRsZUtleTogXCLkuLvmlbDmja7nu7TmiqRcIixcbiAgICAgICAgICAgIGRlc2NLZXk6IFwi5Li75pWw5o2u57u05oqkXCJcbiAgICAgICAgIH0sXG4gICAgICAgICBjaGlsZHJlbjogW3tcbiAgICAgICAgICAgIHBhdGg6ICdob3NwaXRhbCcsXG4gICAgICAgICAgICBjb21wb25lbnQ6IEhvc3BpdGFsTWFuYWdlQ29tcG9uZW50LFxuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgdGl0bGVLZXk6IFwi5Yy76Zmi5pWw5o2u57u05oqkXCIsXG4gICAgICAgICAgICAgICBkZXNjS2V5OiBcIuWMu+mZouaVsOaNrue7tOaKpFwiXG4gICAgICAgICAgICB9XG4gICAgICAgICB9LFxuICAgICAgICAge1xuICAgICAgICAgICAgcGF0aDogJ2FnZW50JyxcbiAgICAgICAgICAgIGNvbXBvbmVudDogQWdlbnRNYW5hZ2VDb21wb25lbnQsXG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICB0aXRsZUtleTogXCLku6PnkIbllYbmlbDmja7nu7TmiqRcIixcbiAgICAgICAgICAgICAgIGRlc2NLZXk6IFwi5Luj55CG5ZWG5pWw5o2u57u05oqkXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICB9LFxuICAgICAgICAge1xuICAgICAgICAgICAgcGF0aDogJ2J1JyxcbiAgICAgICAgICAgIGNvbXBvbmVudDogQnVNYW5hZ2VDb21wb25lbnQsXG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICB0aXRsZUtleTogXCJCVeaVsOaNrue7tOaKpFwiLFxuICAgICAgICAgICAgICAgZGVzY0tleTogXCJCVeaVsOaNrue7tOaKpFwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgfSxcbiAgICAgICAgIHtcbiAgICAgICAgICAgIHBhdGg6ICdjdXJyZW5jeScsXG4gICAgICAgICAgICBjb21wb25lbnQ6IEN1cnJlbmN5TWFuYWdlQ29tcG9uZW50LFxuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgdGl0bGVLZXk6IFwi6LSn5biB5pWw5o2u57u05oqkXCIsXG4gICAgICAgICAgICAgICBkZXNjS2V5OiBcIui0p+W4geaVsOaNrue7tOaKpFwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgfSxcbiAgICAgICAgIHtcbiAgICAgICAgICAgIHBhdGg6ICdwcm9kdWN0JyxcbiAgICAgICAgICAgIGNvbXBvbmVudDogUHJvZHVjdE1hbmFnZUNvbXBvbmVudCxcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgIHRpdGxlS2V5OiBcIuS6p+WTgeaVsOaNrue7tOaKpFwiLFxuICAgICAgICAgICAgICAgZGVzY0tleTogXCLkuqflk4HmlbDmja7nu7TmiqRcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgIH0sXG4gICAgICAgICB7XG4gICAgICAgICAgICBwYXRoOiAndW5pdCcsXG4gICAgICAgICAgICBjb21wb25lbnQ6IFVuaXRNYW5hZ2VDb21wb25lbnQsXG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICB0aXRsZUtleTogXCLljZXkvY3mlbDmja7nu7TmiqRcIixcbiAgICAgICAgICAgICAgIGRlc2NLZXk6IFwi5Y2V5L2N5pWw5o2u57u05oqkXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICB9LFxuICAgICAgICAge1xuICAgICAgICAgICAgcGF0aDogJ2RhdGFPdXRwdXQnLFxuICAgICAgICAgICAgY29tcG9uZW50OiBEYXRhT3V0cHV0Q29tcG9uZW50LFxuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgdGl0bGVLZXk6IFwi5Li75pWw5o2u5a+85YWlXCIsXG4gICAgICAgICAgICAgICBkZXNjS2V5OiBcIuS4u+aVsOaNruWvvOWFpVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgfV1cbiAgIH0se1xuICAgICAgcGF0aDogXCJhZG1pblwiLFxuICAgICAgY2FuQWN0aXZhdGU6IFtBZG1pbkd1YXJkXSxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgIHRpdGxlS2V5OiBcIm5hdi5hZG1pbi5sYWJlbFwiLFxuICAgICAgICAgZGVzY0tleTogXCJuYXYuYWRtaW4uZGVzY1wiXG4gICAgICB9LFxuICAgICAgY2hpbGRyZW46IFt7XG4gICAgICAgICBwYXRoOiBcIlwiLFxuICAgICAgICAgcmVkaXJlY3RUbzogXCJkaWN0XCIsXG4gICAgICAgICBwYXRoTWF0Y2g6IFwicHJlZml4XCJcbiAgICAgIH0sIHtcbiAgICAgICAgIHBhdGg6IFwiZGljdFwiLFxuICAgICAgICAgY29tcG9uZW50OiBEaWN0TWdtdENvbXBvbmVudCxcbiAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIHRpdGxlS2V5OiBcIm5hdi5hZG1pbi5kaWN0LmxhYmVsXCIsXG4gICAgICAgICAgICBkZXNjS2V5OiBcIm5hdi5hZG1pbi5kaWN0LmRlc2NcIlxuICAgICAgICAgfVxuICAgICAgfSwge1xuICAgICAgICAgcGF0aDogXCJ1c2VyXCIsXG4gICAgICAgICBjb21wb25lbnQ6IFVzZXJNZ210Q29tcG9uZW50LFxuICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgdGl0bGVLZXk6IFwibmF2LmFkbWluLnVzZXIubGFiZWxcIixcbiAgICAgICAgICAgIGRlc2NLZXk6IFwibmF2LmFkbWluLnVzZXIuZGVzY1wiXG4gICAgICAgICB9XG4gICAgICB9LCB7XG4gICAgICAgICBwYXRoOiBcInJvbGVcIixcbiAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIHRpdGxlS2V5OiBcIm5hdi5hZG1pbi5yb2xlLmxhYmVsXCIsXG4gICAgICAgICAgICBkZXNjS2V5OiBcIm5hdi5hZG1pbi5yb2xlLmRlc2NcIlxuICAgICAgICAgfVxuICAgICAgfSwge1xuICAgICAgICAgcGF0aDogXCJpdGVtXCIsXG4gICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICB0aXRsZUtleTogXCJuYXYuYWRtaW4uaXRlbS5sYWJlbFwiLFxuICAgICAgICAgICAgZGVzY0tleTogXCJuYXYuYWRtaW4uaXRlbS5kZXNjXCJcbiAgICAgICAgIH1cbiAgICAgIH0sIHtcbiAgICAgICAgIHBhdGg6IFwiY2F0ZWdvcnlcIixcbiAgICAgICAgIGNvbXBvbmVudDogQ2F0ZWdvcnlNZ210Q29tcG9uZW50LFxuICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgdGl0bGVLZXk6IFwibmF2LmFkbWluLmNhdGVnb3J5LmxhYmVsXCIsXG4gICAgICAgICAgICBkZXNjS2V5OiBcIm5hdi5hZG1pbi5jYXRlZ29yeS5kZXNjXCJcbiAgICAgICAgIH1cbiAgICAgIH1dXG4gICB9XVxufSwge1xuICAgcGF0aDogXCJsb2dpblwiLFxuICAgY29tcG9uZW50OiBMb2dpbkNvbXBvbmVudCxcbiAgIHJlc29sdmU6IHtcbiAgICAgIGkxOG46IFRyYW5zbGF0ZVJlc29sdmVyXG4gICB9XG59LCB7XG4gICBwYXRoOiBcIlwiLFxuICAgcmVkaXJlY3RUbzogXCJob21lXCIsXG4gICBwYXRoTWF0Y2g6IFwiZnVsbFwiXG59XTtcblxuXG5leHBvcnQgY29uc3QgYXBwUm91dGluZ1Byb3ZpZGVyczogYW55W10gPSBbVHJhbnNsYXRlUmVzb2x2ZXIsIEZpbGVTdGF0dXNSZXNvbHZlciwgQXV0aEd1YXJkLCBBZG1pbkd1YXJkXTtcblxuZXhwb3J0IGNvbnN0IHJvdXRpbmc6IE1vZHVsZVdpdGhQcm92aWRlcnMgPSBSb3V0ZXJNb2R1bGUuZm9yUm9vdChhcHBSb3V0ZXMpO1xuXG4iXX0=
