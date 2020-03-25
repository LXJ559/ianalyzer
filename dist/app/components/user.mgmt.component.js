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
 * Created by zhongping.lu on 10/26/2016.
 */
var core_1 = require("@angular/core");
var ng2_translate_1 = require("ng2-translate/ng2-translate");
var general_util_1 = require("../utils/general.util");
var common_1 = require("@angular/common");
var auth_model_1 = require("../models/auth.model");
var dialog_widget_1 = require("../widgets/dialog.widget");
var rxjs_1 = require("rxjs");
var user_service_1 = require("../services/user.service");
var components_1 = require("angular2-notifications/components");
var router_1 = require("@angular/router");
var file_service_1 = require("../services/file.service");
var forms_1 = require("@angular/forms");
var alert_widget_1 = require("../widgets/alert.widget");
var UserMgmtComponent = (function () {
    function UserMgmtComponent(i18n, userService, fileService, notify, router, route) {
        var _this = this;
        this.i18n = i18n;
        this.userService = userService;
        this.fileService = fileService;
        this.notify = notify;
        this.router = router;
        this.route = route;
        this.userData = {
            type: auth_model_1.UserType.User
        };
        this.formLoading = false;
        this.categories = {};
        this.datePipe = new common_1.DatePipe(this.i18n.currentLang);
        this.roleOptions = [{
                label: this.i18n.instant("admin.user.dialog.form.role.type.user"),
                value: auth_model_1.UserType.User
            }, {
                label: this.i18n.instant("admin.user.dialog.form.role.type.admin"),
                value: auth_model_1.UserType.Admin
            }];
        this.gridOptions = general_util_1.Util.getLazyLoadingGridOptions(this.i18n.instant("loading"), this.i18n.instant("noData"));
        this.gridOptions.getRowNodeId = function (data) { return data.id.toString(); };
        this.gridOptions.enableServerSideSorting = true;
        this.gridOptions.paginationPageSize;
        100;
        this.gridOptions.cacheOverflowSize;
        2;
        this.gridOptions.maxConcurrentDatasourceRequests;
        2;
        this.gridOptions.infiniteInitialRowCount;
        1;
        this.gridOptions.maxBlocksInCache;
        2;
        this.gridColumns = [{
                headerName: this.i18n.instant("admin.user.list.columns.account"),
                field: "loginname",
                cellRenderer: function (param) { return param && param.value ? param.value : general_util_1.Util.LOADING_CELL_TEMPLATE; }
            }, {
                headerName: this.i18n.instant("admin.user.list.columns.name"),
                field: "displayname"
            }, {
                headerName: '邮箱',
                field: "email"
            }, {
                headerName: "模板",
                field: "groupCategory"
            }, {
                headerName: "子模板",
                field: "category"
            },
            {
                headerName: this.i18n.instant("admin.user.list.columns.role"),
                field: "type",
                cellFormatter: function (params) {
                    switch (params.value) {
                        case auth_model_1.UserType.Admin:
                            return _this.i18n.instant("admin.user.dialog.form.role.type.admin");
                        case auth_model_1.UserType.User:
                            return _this.i18n.instant("admin.user.dialog.form.role.type.user");
                    }
                }
            }, {
                headerName: this.i18n.instant("admin.user.list.columns.crtime"),
                field: "crtime",
                cellFormatter: function (param) { return param.value ? _this.datePipe.transform(param.value, general_util_1.Util.LONG_TIME_STRING) : ""; }
            }];
    }
    Object.defineProperty(UserMgmtComponent.prototype, "selectedUser", {
        get: function () {
            if (!this.userGrid || !this.userGrid.api) {
                return null;
            }
            var rows = this.userGrid.api.getSelectedRows();
            return rows.length > 0 ? rows[0] : null;
        },
        enumerable: true,
        configurable: true
    });
    UserMgmtComponent.prototype.onBtnNewClicked = function (grid) {
        var _this = this;
        this.userDialog.popup(this.i18n.instant("admin.user.dialog.titleNew"), true).subscribe(function () {
            _this.userDialog.setState(true, _this.i18n.instant("admin.user.dialog.loading"));
            // let mock = {
            //        "allTemplateClass": [
            //            {
            //                "cractor": "1",
            //                "crtime": 1496900173000,
            //                "domain": 3,
            //                "domainvaluecn": "通用大类",
            //                "domainvaluecode": "category_normal",
            //                "domainvalueen": "通用大类",
            //                "id": 12
            //            },
            //            {
            //                "cractor": "1",
            //                "crtime": 1476933414000,
            //                "domain": 3,
            //                "domainvaluecn": "财务大类",
            //                "domainvaluecode": "category_fin",
            //                "domainvalueen": "财务大类",
            //                "id": 71
            //            },
            //            {
            //                "cractor": "1",
            //                "crtime": 1476933591000,
            //                "domain": 3,
            //                "domainvaluecn": "医院大类",
            //                "domainvaluecode": "category_hospital",
            //                "domainvalueen": "医院大类",
            //                "id": 75
            //            }
            //        ],
            //        "subTemplates": {
            //            "category_hospital": [
            //                {
            //                    "category": "registation2",
            //                    "cractor": "iAnalyzer",
            //                    "crtime": 1496979417000,
            //                    "id": 6,
            //                    "status": "1",
            //                    "templateClass": "category_hospital",
            //                    "templatename": "配置表-中国骨科可售产品与注册证"
            //                }
            //            ],
            //            "category_fin": [],
            //            "category_normal": [
            //                {
            //                    "category": "product01",
            //                    "cractor": "iAnalyzer",
            //                    "crtime": 1496979417000,
            //                    "id": 4,
            //                    "status": "1",
            //                    "templateClass": "category_normal",
            //                    "templatename": "配置表-产品大类与BI展示名称映射"
            //                },
            //                {
            //                    "category": "implantedvolume",
            //                    "cractor": "iAnalyzer",
            //                    "crtime": 1496979417000,
            //                    "id": 5,
            //                    "status": "1",
            //                    "templateClass": "category_normal",
            //                    "templatename": "业务数据-产品植入(使用)量"
            //                }
            //            ]
            //        },
            //        "groupTemplates": {
            //            "category_hospital": [],
            //            "category_fin": [
            //                {
            //                    "crtime": 1496811973000,
            //                    "groupCategory": "test1",
            //                    "groupName": "测试大类",
            //                    "id": 3,
            //                    "status": "1",
            //                    "subTemplates": "4,5,6,",
            //                    "templateClass": "category_fin"
            //                }
            //            ],
            //            "category_normal": []
            //        }
            //    }
            _this.fileService.getCategories().subscribe(function (res) {
                var allTemplateClass = res.allTemplateClass, groupTemplates = res.groupTemplates, subTemplates = res.subTemplates;
                var storeObj = {};
                _.map(allTemplateClass, function (temp) {
                    temp.subTemplates = subTemplates[temp['domainvaluecode']];
                    temp.groupTemplates = groupTemplates[temp['domainvaluecode']];
                });
                console.log(allTemplateClass);
                _this.userData.categoryOptions = allTemplateClass;
                _this.userDialog.setState(false);
            });
        });
    };
    UserMgmtComponent.prototype.onBtnUpdateClicked = function (grid) {
        var _this = this;
        if (!this.selectedUser) {
            this.onBtnNewClicked(grid);
        }
        else {
            this.userDialog.popup(this.i18n.instant("admin.user.dialog.titleUpdate", { name: this.selectedUser.displayname }), true)
                .subscribe(function () {
                _this.userData = _this.userService.toUserSpec(Object.create(_this.selectedUser));
                console.log(_this.userData);
                _this.userData.updateUser = true;
                _this.userDialog.setState(true, _this.i18n.instant("admin.user.dialog.loading"));
                _this.userData.email = _this.selectedUser.email;
                /**
                 * @date: 从表格中获取分类信息
                 * @author: zhangbin
                 * @e-mail: superbinlin@163.com
                 * @see: http://binlin.site:8889/#/resume
                 */
                var categorySelect = _this.selectedUser.category ? _this.selectedUser.category.split(',') : '';
                var groupCategorySelect = _this.selectedUser.groupCategory ? _this.selectedUser.groupCategory.split(',') : '';
                /**
                 * 从后台获取数据并加工
                 */
                _this.fileService.getCategories().subscribe(function (res) {
                    var allTemplateClass = res.allTemplateClass, groupTemplates = res.groupTemplates, subTemplates = res.subTemplates;
                    var storeObj = {};
                    _.map(allTemplateClass, function (temp) {
                        temp.subTemplates = subTemplates[temp['domainvaluecode']];
                        temp.groupTemplates = groupTemplates[temp['domainvaluecode']];
                    });
                    /**
                     * 获取数据后需要遍历 与分类信息进行比对，将已选分类进行选择操作
                     * @param {[type]} allTemplateClass [description]
                     */
                    _.map(allTemplateClass, function (temp) {
                        _.map(temp.groupTemplates, function (group) {
                            console.log(_.indexOf(groupCategorySelect, group.groupCategory));
                            _.indexOf(groupCategorySelect, group.groupCategory) > -1 ? group.checked = true : '';
                        });
                        _.map(temp.subTemplates, function (sub) {
                            console.log(_.indexOf(_.indexOf(categorySelect, sub.category) > -1));
                            _.indexOf(categorySelect, sub.category) > -1 ? sub.checked = true : '';
                        });
                    });
                    _this.userData.categoryOptions = allTemplateClass;
                    _this.userDialog.setState(false);
                });
            });
        }
    };
    UserMgmtComponent.prototype.onBtnRemoveClicked = function (grid) {
        var _this = this;
        this.alert.show().subscribe(function (result) {
            if (result) {
                _this.userService.removeUser(_this.selectedUser.id).subscribe(function (result) {
                    _this.refresh(grid);
                });
            }
        });
    };
    UserMgmtComponent.prototype.onGridReady = function (grid) {
        grid.api.sizeColumnsToFit();
        this.refresh(grid);
    };
    UserMgmtComponent.prototype.refresh = function (grid) {
        var _this = this;
        this.isLoading = true;
        grid.api.showLoadingOverlay();
        //    TODO
        // this.fileService.getCategories().subscribe(list => {
        //    list.forEach(category => {
        //       this.categories[category.value] = category.label;
        //    });
        // });
        this.userService.getUsers({
            from: 0,
            size: 50000
        }).subscribe(function (itemSet) {
            var dataSource = {
                rowCount: null,
                getRows: function (params) {
                    console.log(params);
                    console.log('asking for ' + params.startRow + ' to ' + params.endRow);
                    var dataAfterSortingAndFiltering = _this.sortAndFilter(itemSet.result, params.sortModel);
                    var rowsThisPage = dataAfterSortingAndFiltering.slice(params.startRow, params.endRow);
                    var lastRow = -1;
                    if (dataAfterSortingAndFiltering.length <= params.endRow) {
                        lastRow = dataAfterSortingAndFiltering.length;
                    }
                    params.successCallback(rowsThisPage, lastRow);
                }
            };
            grid.api.setDatasource(dataSource);
            _this.isLoading = false;
            grid.api.hideOverlay();
        }, function (error) {
            _this.notificationService.alert(error.exceptionName, error.description);
            _this.onError.emit(error);
        });
        // let ds: UserDataSource = UserDataSource.create(this.userService, this.notify);
        // ds.onComplete.subscribe((list: any[]) => {
        //    this.isLoading = false;
        //    console.log(list)
        // if (list.length > 0) {
        //    grid.api.hideOverlay();
        // } else {
        //    grid.api.showNoRowsOverlay();
        // }
        // let userId: number = this.route.snapshot.params["user"];
        // if (userId) {
        //    grid.api.forEachNode(node => node.setSelected(node.id === userId.toString()));
        // } else {
        //    grid.api.deselectAll();
        // }
        //});
    };
    UserMgmtComponent.prototype.sortAndFilter = function (allOfTheData, sortModel) {
        return this.sortData(sortModel, allOfTheData);
    };
    UserMgmtComponent.prototype.sortData = function (sortModel, data) {
        var sortPresent = sortModel && sortModel.length > 0;
        if (!sortPresent) {
            return data;
        }
        // do an in memory sort of the data, across all the fields
        var resultOfSort = data.slice();
        resultOfSort.sort(function (a, b) {
            for (var k = 0; k < sortModel.length; k++) {
                var sortColModel = sortModel[k];
                var valueA = a[sortColModel.colId];
                var valueB = b[sortColModel.colId];
                // this filter didn't find a difference, move onto the next one
                if (valueA == valueB) {
                    continue;
                }
                var sortDirection = sortColModel.sort === 'asc' ? 1 : -1;
                if (valueA > valueB) {
                    return sortDirection;
                }
                else {
                    return sortDirection * -1;
                }
            }
            // no filters found a difference
            return 0;
        });
        return resultOfSort;
    };
    UserMgmtComponent.prototype.onCommit = function (handler) {
        var _this = this;
        console.log(this.userData.categoryOptions);
        var groupCategory = [], category = []; // 存储选中的分类
        _.map(this.userData.categoryOptions, function (temp) {
            _.map(temp.groupTemplates, function (group) {
                if (group.checked)
                    groupCategory.push(group.groupCategory);
            });
            _.map(temp.subTemplates, function (sub) {
                if (sub.checked)
                    category.push(sub.category);
            });
        });
        console.log(groupCategory, category);
        // let seletedCategory: Category[] = this.userData.categoryOptions.filter(category => category["checked"]);
        this.userData.category = category.join(",");
        this.userData.groupCategory = groupCategory.join(",");
        this.validator().finally(function () { return _this.formLoading = false; }).subscribe(function (errors) {
            if (errors.length > 0) {
                rxjs_1.Observable.throw(errors).subscribe(handler);
            }
            else {
                _this.formLoading = true;
                if (!_this.userData.updateUser) {
                    //console.log(this.userData)
                    _this.userService.createUser(_this.userData).finally(function () { return _this.formLoading = false; }).subscribe(function (result) {
                        if (result) {
                            rxjs_1.Observable.of(true).subscribe(handler);
                            _this.refresh(_this.userGrid);
                            _this.notify.success(_this.i18n.instant("成功"), _this.i18n.instant("操作成功"));
                        }
                        else {
                            rxjs_1.Observable.throw([{
                                    exceptionName: _this.i18n.instant("admin.user.dialog.form.error.title"),
                                    description: _this.i18n.instant("admin.user.dialog.form.error.desc")
                                }]).subscribe(handler);
                        }
                    }, function (error) { return rxjs_1.Observable.throw(error).subscribe(handler); });
                }
                else {
                    _this.userService.updateUser(_this.userData).finally(function () { return _this.formLoading = false; }).subscribe(function (result) {
                        if (result) {
                            rxjs_1.Observable.of(true).subscribe(handler);
                            _this.refresh(_this.userGrid);
                        }
                        else {
                            rxjs_1.Observable.throw([{
                                    exceptionName: _this.i18n.instant("admin.user.dialog.form.error.title"),
                                    description: _this.i18n.instant("admin.user.dialog.form.error.desc")
                                }]).subscribe(handler);
                        }
                    }, function (error) { return rxjs_1.Observable.throw(error).subscribe(handler); });
                }
            }
        });
    };
    UserMgmtComponent.prototype.onDismiss = function () {
        this.userMgmtForm.reset();
        this.userData = {
            type: auth_model_1.UserType.User
        };
    };
    UserMgmtComponent.prototype.onRowSelected = function () {
        var user = this.selectedUser;
        if (user) {
            this.router.navigate([{ user: user.id }], { relativeTo: this.route });
        }
        else {
            this.router.navigate([{}], { relativeTo: this.route });
        }
    };
    UserMgmtComponent.prototype.validator = function () {
        var _this = this;
        this.formLoading = true;
        return rxjs_1.Observable.create(function (observer) {
            var errors = [];
            var async = false;
            if (!_this.userData.username) {
                errors.push({
                    exceptionName: _this.i18n.instant("admin.user.dialog.form.username.required.title"),
                    description: _this.i18n.instant("admin.user.dialog.form.username.required.desc"),
                    type: "GeneralException"
                });
            }
            else {
                if (!_this.userData.updateUser) {
                    async = true;
                    _this.userService.validateUsername(_this.userData.username)
                        .subscribe(function (result) {
                        _this.userData.isUsernameValid = result;
                        if (!result) {
                            errors.push({
                                exceptionName: _this.i18n.instant("admin.user.dialog.form.username.unique.title"),
                                description: _this.i18n.instant("admin.user.dialog.form.username.unique.desc"),
                                type: "GeneralException"
                            });
                        }
                        observer.next(errors);
                        observer.complete();
                    }, function (error) {
                        errors.push({
                            exceptionName: _this.i18n.instant("admin.user.dialog.form.username.error.title"),
                            description: _this.i18n.instant("admin.user.dialog.form.username.error.desc"),
                            type: "GeneralException"
                        });
                        observer.next(errors);
                        observer.complete();
                    });
                }
            }
            if (!_this.userData.password) {
                errors.push({
                    exceptionName: _this.i18n.instant("admin.user.dialog.form.password.required.title"),
                    description: _this.i18n.instant("admin.user.dialog.form.password.required.desc"),
                    type: "GeneralException"
                });
            }
            else {
            }
            if (!async) {
                observer.next(errors);
                observer.complete();
            }
        });
    };
    return UserMgmtComponent;
}());
__decorate([
    core_1.ViewChild("userGrid"),
    __metadata("design:type", Object)
], UserMgmtComponent.prototype, "userGrid", void 0);
__decorate([
    core_1.ViewChild("userDialog"),
    __metadata("design:type", dialog_widget_1.DialogWidget)
], UserMgmtComponent.prototype, "userDialog", void 0);
__decorate([
    core_1.ViewChild("userMgmtForm"),
    __metadata("design:type", forms_1.NgForm)
], UserMgmtComponent.prototype, "userMgmtForm", void 0);
__decorate([
    core_1.ViewChild("alert"),
    __metadata("design:type", alert_widget_1.AlertWidget)
], UserMgmtComponent.prototype, "alert", void 0);
UserMgmtComponent = __decorate([
    core_1.Component({
        selector: "user-mgmt",
        templateUrl: "/views/admin/user.mgmt.html"
    }),
    __metadata("design:paramtypes", [ng2_translate_1.TranslateService, user_service_1.UserService, file_service_1.FileService,
        components_1.NotificationsService, router_1.Router, router_1.ActivatedRoute])
], UserMgmtComponent);
exports.UserMgmtComponent = UserMgmtComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvdXNlci5tZ210LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7O0dBRUc7QUFDSCxzQ0FBbUQ7QUFFbkQsNkRBQTZEO0FBQzdELHNEQUEyQztBQUMzQywwQ0FBeUM7QUFDekMsbURBQW9EO0FBQ3BELDBEQUFzRDtBQUN0RCw2QkFBMEM7QUFFMUMseURBQXFEO0FBQ3JELGdFQUF1RTtBQUN2RSwwQ0FBdUQ7QUFDdkQseURBQXFEO0FBRXJELHdDQUFzQztBQUV0Qyx3REFBb0Q7QUFPcEQ7SUE2QkcsMkJBQW9CLElBQXNCLEVBQVUsV0FBd0IsRUFBVSxXQUF3QixFQUMxRixNQUE0QixFQUFVLE1BQWMsRUFBVSxLQUFxQjtRQUR2RyxpQkFpRUM7UUFqRW1CLFNBQUksR0FBSixJQUFJLENBQWtCO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFBVSxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUMxRixXQUFNLEdBQU4sTUFBTSxDQUFzQjtRQUFVLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQXpCdkcsYUFBUSxHQUFhO1lBQ2xCLElBQUksRUFBRSxxQkFBUSxDQUFDLElBQUk7U0FDckIsQ0FBQztRQUVGLGdCQUFXLEdBQVksS0FBSyxDQUFDO1FBQzdCLGVBQVUsR0FBOEIsRUFBRSxDQUFDO1FBSW5DLGFBQVEsR0FBRyxJQUFJLGlCQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQWtCcEQsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDO2dCQUNqQixLQUFLLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsdUNBQXVDLENBQUM7Z0JBQ2pFLEtBQUssRUFBRSxxQkFBUSxDQUFDLElBQUk7YUFDdEIsRUFBRTtnQkFDQSxLQUFLLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsd0NBQXdDLENBQUM7Z0JB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M2dCWSw0QkFBQSxpQkFBaUIsQ0FBQSIsImZpbGUiOiJjb21wb25lbnRzL3VzZXIubWdtdC5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENyZWF0ZWQgYnkgemhvbmdwaW5nLmx1IG9uIDEwLzI2LzIwMTYuXG4gKi9cbmltcG9ydCB7Q29tcG9uZW50LCBWaWV3Q2hpbGR9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge0dyaWRPcHRpb25zLCBDb2xEZWZ9IGZyb20gXCJhZy1ncmlkXCI7XG5pbXBvcnQge1RyYW5zbGF0ZVNlcnZpY2V9IGZyb20gXCJuZzItdHJhbnNsYXRlL25nMi10cmFuc2xhdGVcIjtcbmltcG9ydCB7VXRpbH0gZnJvbSBcIi4uL3V0aWxzL2dlbmVyYWwudXRpbFwiO1xuaW1wb3J0IHtEYXRlUGlwZX0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vblwiO1xuaW1wb3J0IHtVc2VyLCBVc2VyVHlwZX0gZnJvbSBcIi4uL21vZGVscy9hdXRoLm1vZGVsXCI7XG5pbXBvcnQge0RpYWxvZ1dpZGdldH0gZnJvbSBcIi4uL3dpZGdldHMvZGlhbG9nLndpZGdldFwiO1xuaW1wb3J0IHtPYnNlcnZlciwgT2JzZXJ2YWJsZX0gZnJvbSBcInJ4anNcIjtcbmltcG9ydCB7VXNlckRhdGFTb3VyY2UsIFVzZXJTcGVjfSBmcm9tIFwiLi4vbW9kZWxzL3VzZXIubW9kZWxcIjtcbmltcG9ydCB7VXNlclNlcnZpY2V9IGZyb20gXCIuLi9zZXJ2aWNlcy91c2VyLnNlcnZpY2VcIjtcbmltcG9ydCB7Tm90aWZpY2F0aW9uc1NlcnZpY2V9IGZyb20gXCJhbmd1bGFyMi1ub3RpZmljYXRpb25zL2NvbXBvbmVudHNcIjtcbmltcG9ydCB7QWN0aXZhdGVkUm91dGUsIFJvdXRlcn0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHtGaWxlU2VydmljZX0gZnJvbSBcIi4uL3NlcnZpY2VzL2ZpbGUuc2VydmljZVwiO1xuaW1wb3J0IHtDYXRlZ29yeX0gZnJvbSBcIi4uL21vZGVscy9maWxlLm1vZGVsXCI7XG5pbXBvcnQge05nRm9ybX0gZnJvbSBcIkBhbmd1bGFyL2Zvcm1zXCI7XG5pbXBvcnQge0dlbmVyYWxFeGNlcHRpb259IGZyb20gXCIuLi9tb2RlbHMvZXhjZXB0aW9uLm1vZGVsXCI7XG5pbXBvcnQge0FsZXJ0V2lkZ2V0fSBmcm9tIFwiLi4vd2lkZ2V0cy9hbGVydC53aWRnZXRcIjtcblxuXG5AQ29tcG9uZW50KHtcbiAgIHNlbGVjdG9yOiBcInVzZXItbWdtdFwiLFxuICAgdGVtcGxhdGVVcmw6IFwiL3ZpZXdzL2FkbWluL3VzZXIubWdtdC5odG1sXCJcbn0pXG5leHBvcnQgY2xhc3MgVXNlck1nbXRDb21wb25lbnQge1xuXG4gICBncmlkT3B0aW9uczogR3JpZE9wdGlvbnM7XG4gICBncmlkQ29sdW1uczogQ29sRGVmW107XG4gICBpc0xvYWRpbmc6IGJvb2xlYW47XG4gICB1c2VyRGF0YTogVXNlclNwZWMgPSB7XG4gICAgICB0eXBlOiBVc2VyVHlwZS5Vc2VyXG4gICB9O1xuICAgcm9sZU9wdGlvbnM6IGFueVtdO1xuICAgZm9ybUxvYWRpbmc6IGJvb2xlYW4gPSBmYWxzZTtcbiAgIGNhdGVnb3JpZXM6IHtbdmFsdWU6IHN0cmluZ106IHN0cmluZ30gPSB7fTtcbiAgIGNhdGVnb3J5U2VsZWN0OmFueVtdO1xuXG5cbiAgIHByaXZhdGUgZGF0ZVBpcGUgPSBuZXcgRGF0ZVBpcGUodGhpcy5pMThuLmN1cnJlbnRMYW5nKTtcblxuXG4gICBAVmlld0NoaWxkKFwidXNlckdyaWRcIilcbiAgIHVzZXJHcmlkOiBHcmlkT3B0aW9ucztcblxuICAgQFZpZXdDaGlsZChcInVzZXJEaWFsb2dcIilcbiAgIHVzZXJEaWFsb2c6IERpYWxvZ1dpZGdldDtcblxuICAgQFZpZXdDaGlsZChcInVzZXJNZ210Rm9ybVwiKVxuICAgdXNlck1nbXRGb3JtOiBOZ0Zvcm07XG5cbiAgIEBWaWV3Q2hpbGQoXCJhbGVydFwiKVxuICAgYWxlcnQ6IEFsZXJ0V2lkZ2V0O1xuXG4gICBjb25zdHJ1Y3Rvcihwcml2YXRlIGkxOG46IFRyYW5zbGF0ZVNlcnZpY2UsIHByaXZhdGUgdXNlclNlcnZpY2U6IFVzZXJTZXJ2aWNlLCBwcml2YXRlIGZpbGVTZXJ2aWNlOiBGaWxlU2VydmljZSxcbiAgICAgICAgICAgICAgIHByaXZhdGUgbm90aWZ5OiBOb3RpZmljYXRpb25zU2VydmljZSwgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlciwgcHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUpIHtcblxuICAgICAgdGhpcy5yb2xlT3B0aW9ucyA9IFt7XG4gICAgICAgICBsYWJlbDogdGhpcy5pMThuLmluc3RhbnQoXCJhZG1pbi51c2VyLmRpYWxvZy5mb3JtLnJvbGUudHlwZS51c2VyXCIpLFxuICAgICAgICAgdmFsdWU6IFVzZXJUeXBlLlVzZXJcbiAgICAgIH0sIHtcbiAgICAgICAgIGxhYmVsOiB0aGlzLmkxOG4uaW5zdGFudChcImFkbWluLnVzZXIuZGlhbG9nLmZvcm0ucm9sZS50eXBlLmFkbWluXCIpLFxuICAgICAgICAgdmFsdWU6IFVzZXJUeXBlLkFkbWluXG4gICAgICB9XTtcblxuICAgICAgdGhpcy5ncmlkT3B0aW9ucyA9IFV0aWwuZ2V0TGF6eUxvYWRpbmdHcmlkT3B0aW9ucyhcbiAgICAgICAgIHRoaXMuaTE4bi5pbnN0YW50KFwibG9hZGluZ1wiKSxcbiAgICAgICAgIHRoaXMuaTE4bi5pbnN0YW50KFwibm9EYXRhXCIpXG4gICAgICApO1xuICAgICAgdGhpcy5ncmlkT3B0aW9ucy5nZXRSb3dOb2RlSWQgPSAoZGF0YTogVXNlcikgPT4gZGF0YS5pZC50b1N0cmluZygpO1xuICAgICAgdGhpcy5ncmlkT3B0aW9ucy5lbmFibGVTZXJ2ZXJTaWRlU29ydGluZyA9IHRydWU7XG4gICAgICB0aGlzLmdyaWRPcHRpb25zLnBhZ2luYXRpb25QYWdlU2l6ZTogMTAwO1xuICAgICAgdGhpcy5ncmlkT3B0aW9ucy5jYWNoZU92ZXJmbG93U2l6ZTogMjtcbiAgICAgIHRoaXMuZ3JpZE9wdGlvbnMubWF4Q29uY3VycmVudERhdGFzb3VyY2VSZXF1ZXN0czogMjtcbiAgICAgIHRoaXMuZ3JpZE9wdGlvbnMuaW5maW5pdGVJbml0aWFsUm93Q291bnQ6IDE7XG4gICAgICB0aGlzLmdyaWRPcHRpb25zLm1heEJsb2Nrc0luQ2FjaGU6IDI7XG5cbiAgICAgIHRoaXMuZ3JpZENvbHVtbnMgPSBbe1xuICAgICAgICAgaGVhZGVyTmFtZTogdGhpcy5pMThuLmluc3RhbnQoXCJhZG1pbi51c2VyLmxpc3QuY29sdW1ucy5hY2NvdW50XCIpLFxuICAgICAgICAgZmllbGQ6IFwibG9naW5uYW1lXCIsXG4gICAgICAgICBjZWxsUmVuZGVyZXI6IHBhcmFtID0+IHBhcmFtICYmIHBhcmFtLnZhbHVlID8gcGFyYW0udmFsdWUgOiBVdGlsLkxPQURJTkdfQ0VMTF9URU1QTEFURVxuXG4gICAgICB9LCB7XG4gICAgICAgICBoZWFkZXJOYW1lOiB0aGlzLmkxOG4uaW5zdGFudChcImFkbWluLnVzZXIubGlzdC5jb2x1bW5zLm5hbWVcIiksXG4gICAgICAgICBmaWVsZDogXCJkaXNwbGF5bmFtZVwiXG4gICAgICB9LHtcbiAgICAgICAgIGhlYWRlck5hbWU6ICfpgq7nrrEnLFxuICAgICAgICAgZmllbGQ6IFwiZW1haWxcIlxuICAgICAgfSwge1xuICAgICAgICAgaGVhZGVyTmFtZTogXCLmqKHmnb9cIixcbiAgICAgICAgIGZpZWxkOiBcImdyb3VwQ2F0ZWdvcnlcIlxuICAgICAgfSx7XG4gICAgICAgICBoZWFkZXJOYW1lOiBcIuWtkOaooeadv1wiLFxuICAgICAgICAgZmllbGQ6IFwiY2F0ZWdvcnlcIlxuICAgICAgICAgLy8gY2VsbEZvcm1hdHRlcjogcGFyYW1zID0+IHtcbiAgICAgICAgIC8vICAgIGlmIChwYXJhbXMudmFsdWUpIHtcbiAgICAgICAgIC8vICAgICAgIGxldCBsYWJlbHM6IHN0cmluZ1tdID0gcGFyYW1zLnZhbHVlLnNwbGl0KFwiLFwiKS5tYXAodmFsdWUgPT4gdGhpcy5jYXRlZ29yaWVzW3ZhbHVlXSk7XG4gICAgICAgICAvLyAgICAgICByZXR1cm4gbGFiZWxzLmpvaW4oXCIsIFwiKTtcbiAgICAgICAgIC8vICAgIH0gZWxzZSB7XG4gICAgICAgICAvLyAgICAgICByZXR1cm4gXCJcIjtcbiAgICAgICAgIC8vICAgIH1cbiAgICAgICAgIC8vIH1cbiAgICAgIH0sXG4gICAgICAge1xuICAgICAgICAgaGVhZGVyTmFtZTogdGhpcy5pMThuLmluc3RhbnQoXCJhZG1pbi51c2VyLmxpc3QuY29sdW1ucy5yb2xlXCIpLFxuICAgICAgICAgZmllbGQ6IFwidHlwZVwiLFxuICAgICAgICAgY2VsbEZvcm1hdHRlcjogcGFyYW1zID0+IHtcbiAgICAgICAgICAgIHN3aXRjaCAocGFyYW1zLnZhbHVlKSB7XG4gICAgICAgICAgICAgICBjYXNlIFVzZXJUeXBlLkFkbWluOlxuICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaTE4bi5pbnN0YW50KFwiYWRtaW4udXNlci5kaWFsb2cuZm9ybS5yb2xlLnR5cGUuYWRtaW5cIik7XG4gICAgICAgICAgICAgICBjYXNlIFVzZXJUeXBlLlVzZXI6XG4gICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5pMThuLmluc3RhbnQoXCJhZG1pbi51c2VyLmRpYWxvZy5mb3JtLnJvbGUudHlwZS51c2VyXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgfVxuICAgICAgfSwge1xuICAgICAgICAgaGVhZGVyTmFtZTogdGhpcy5pMThuLmluc3RhbnQoXCJhZG1pbi51c2VyLmxpc3QuY29sdW1ucy5jcnRpbWVcIiksXG4gICAgICAgICBmaWVsZDogXCJjcnRpbWVcIixcbiAgICAgICAgIGNlbGxGb3JtYXR0ZXI6IHBhcmFtID0+IHBhcmFtLnZhbHVlID8gdGhpcy5kYXRlUGlwZS50cmFuc2Zvcm0ocGFyYW0udmFsdWUsIFV0aWwuTE9OR19USU1FX1NUUklORykgOiBcIlwiXG4gICAgICB9XTtcbiAgIH1cblxuICAgZ2V0IHNlbGVjdGVkVXNlcigpOiBVc2VyIHtcbiAgICAgIGlmICghdGhpcy51c2VyR3JpZCB8fCAhdGhpcy51c2VyR3JpZC5hcGkpIHtcbiAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuXG4gICAgICBsZXQgcm93cyA9IHRoaXMudXNlckdyaWQuYXBpLmdldFNlbGVjdGVkUm93cygpO1xuICAgICAgcmV0dXJuIHJvd3MubGVuZ3RoID4gMCA/IHJvd3NbMF0gOiBudWxsO1xuICAgfVxuXG5cbiAgIG9uQnRuTmV3Q2xpY2tlZChncmlkOiBHcmlkT3B0aW9ucykge1xuICAgICAgdGhpcy51c2VyRGlhbG9nLnBvcHVwKHRoaXMuaTE4bi5pbnN0YW50KFwiYWRtaW4udXNlci5kaWFsb2cudGl0bGVOZXdcIiksIHRydWUpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICB0aGlzLnVzZXJEaWFsb2cuc2V0U3RhdGUodHJ1ZSwgdGhpcy5pMThuLmluc3RhbnQoXCJhZG1pbi51c2VyLmRpYWxvZy5sb2FkaW5nXCIpKTtcbiAgICAgICAgIC8vIGxldCBtb2NrID0ge1xuICAgICAgICAgLy8gICAgICAgIFwiYWxsVGVtcGxhdGVDbGFzc1wiOiBbXG4gICAgICAgICAvLyAgICAgICAgICAgIHtcbiAgICAgICAgIC8vICAgICAgICAgICAgICAgIFwiY3JhY3RvclwiOiBcIjFcIixcbiAgICAgICAgIC8vICAgICAgICAgICAgICAgIFwiY3J0aW1lXCI6IDE0OTY5MDAxNzMwMDAsXG4gICAgICAgICAvLyAgICAgICAgICAgICAgICBcImRvbWFpblwiOiAzLFxuICAgICAgICAgLy8gICAgICAgICAgICAgICAgXCJkb21haW52YWx1ZWNuXCI6IFwi6YCa55So5aSn57G7XCIsXG4gICAgICAgICAvLyAgICAgICAgICAgICAgICBcImRvbWFpbnZhbHVlY29kZVwiOiBcImNhdGVnb3J5X25vcm1hbFwiLFxuICAgICAgICAgLy8gICAgICAgICAgICAgICAgXCJkb21haW52YWx1ZWVuXCI6IFwi6YCa55So5aSn57G7XCIsXG4gICAgICAgICAvLyAgICAgICAgICAgICAgICBcImlkXCI6IDEyXG4gICAgICAgICAvLyAgICAgICAgICAgIH0sXG4gICAgICAgICAvLyAgICAgICAgICAgIHtcbiAgICAgICAgIC8vICAgICAgICAgICAgICAgIFwiY3JhY3RvclwiOiBcIjFcIixcbiAgICAgICAgIC8vICAgICAgICAgICAgICAgIFwiY3J0aW1lXCI6IDE0NzY5MzM0MTQwMDAsXG4gICAgICAgICAvLyAgICAgICAgICAgICAgICBcImRvbWFpblwiOiAzLFxuICAgICAgICAgLy8gICAgICAgICAgICAgICAgXCJkb21haW52YWx1ZWNuXCI6IFwi6LSi5Yqh5aSn57G7XCIsXG4gICAgICAgICAvLyAgICAgICAgICAgICAgICBcImRvbWFpbnZhbHVlY29kZVwiOiBcImNhdGVnb3J5X2ZpblwiLFxuICAgICAgICAgLy8gICAgICAgICAgICAgICAgXCJkb21haW52YWx1ZWVuXCI6IFwi6LSi5Yqh5aSn57G7XCIsXG4gICAgICAgICAvLyAgICAgICAgICAgICAgICBcImlkXCI6IDcxXG4gICAgICAgICAvLyAgICAgICAgICAgIH0sXG4gICAgICAgICAvLyAgICAgICAgICAgIHtcbiAgICAgICAgIC8vICAgICAgICAgICAgICAgIFwiY3JhY3RvclwiOiBcIjFcIixcbiAgICAgICAgIC8vICAgICAgICAgICAgICAgIFwiY3J0aW1lXCI6IDE0NzY5MzM1OTEwMDAsXG4gICAgICAgICAvLyAgICAgICAgICAgICAgICBcImRvbWFpblwiOiAzLFxuICAgICAgICAgLy8gICAgICAgICAgICAgICAgXCJkb21haW52YWx1ZWNuXCI6IFwi5Yy76Zmi5aSn57G7XCIsXG4gICAgICAgICAvLyAgICAgICAgICAgICAgICBcImRvbWFpbnZhbHVlY29kZVwiOiBcImNhdGVnb3J5X2hvc3BpdGFsXCIsXG4gICAgICAgICAvLyAgICAgICAgICAgICAgICBcImRvbWFpbnZhbHVlZW5cIjogXCLljLvpmaLlpKfnsbtcIixcbiAgICAgICAgIC8vICAgICAgICAgICAgICAgIFwiaWRcIjogNzVcbiAgICAgICAgIC8vICAgICAgICAgICAgfVxuICAgICAgICAgLy8gICAgICAgIF0sXG4gICAgICAgICAvLyAgICAgICAgXCJzdWJUZW1wbGF0ZXNcIjoge1xuICAgICAgICAgLy8gICAgICAgICAgICBcImNhdGVnb3J5X2hvc3BpdGFsXCI6IFtcbiAgICAgICAgIC8vICAgICAgICAgICAgICAgIHtcbiAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICBcImNhdGVnb3J5XCI6IFwicmVnaXN0YXRpb24yXCIsXG4gICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgXCJjcmFjdG9yXCI6IFwiaUFuYWx5emVyXCIsXG4gICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgXCJjcnRpbWVcIjogMTQ5Njk3OTQxNzAwMCxcbiAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICBcImlkXCI6IDYsXG4gICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgXCJzdGF0dXNcIjogXCIxXCIsXG4gICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgXCJ0ZW1wbGF0ZUNsYXNzXCI6IFwiY2F0ZWdvcnlfaG9zcGl0YWxcIixcbiAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICBcInRlbXBsYXRlbmFtZVwiOiBcIumFjee9ruihqC3kuK3lm73pqqjnp5Hlj6/llK7kuqflk4HkuI7ms6jlhozor4FcIlxuICAgICAgICAgLy8gICAgICAgICAgICAgICAgfVxuICAgICAgICAgLy8gICAgICAgICAgICBdLFxuICAgICAgICAgLy8gICAgICAgICAgICBcImNhdGVnb3J5X2ZpblwiOiBbXSxcbiAgICAgICAgIC8vICAgICAgICAgICAgXCJjYXRlZ29yeV9ub3JtYWxcIjogW1xuICAgICAgICAgLy8gICAgICAgICAgICAgICAge1xuICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIFwiY2F0ZWdvcnlcIjogXCJwcm9kdWN0MDFcIixcbiAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICBcImNyYWN0b3JcIjogXCJpQW5hbHl6ZXJcIixcbiAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICBcImNydGltZVwiOiAxNDk2OTc5NDE3MDAwLFxuICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIFwiaWRcIjogNCxcbiAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICBcInN0YXR1c1wiOiBcIjFcIixcbiAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICBcInRlbXBsYXRlQ2xhc3NcIjogXCJjYXRlZ29yeV9ub3JtYWxcIixcbiAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICBcInRlbXBsYXRlbmFtZVwiOiBcIumFjee9ruihqC3kuqflk4HlpKfnsbvkuI5CSeWxleekuuWQjeensOaYoOWwhFwiXG4gICAgICAgICAvLyAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgLy8gICAgICAgICAgICAgICAge1xuICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIFwiY2F0ZWdvcnlcIjogXCJpbXBsYW50ZWR2b2x1bWVcIixcbiAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICBcImNyYWN0b3JcIjogXCJpQW5hbHl6ZXJcIixcbiAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICBcImNydGltZVwiOiAxNDk2OTc5NDE3MDAwLFxuICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIFwiaWRcIjogNSxcbiAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICBcInN0YXR1c1wiOiBcIjFcIixcbiAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICBcInRlbXBsYXRlQ2xhc3NcIjogXCJjYXRlZ29yeV9ub3JtYWxcIixcbiAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICBcInRlbXBsYXRlbmFtZVwiOiBcIuS4muWKoeaVsOaNri3kuqflk4HmpI3lhaUo5L2/55SoKemHj1wiXG4gICAgICAgICAvLyAgICAgICAgICAgICAgICB9XG4gICAgICAgICAvLyAgICAgICAgICAgIF1cbiAgICAgICAgIC8vICAgICAgICB9LFxuICAgICAgICAgLy8gICAgICAgIFwiZ3JvdXBUZW1wbGF0ZXNcIjoge1xuICAgICAgICAgLy8gICAgICAgICAgICBcImNhdGVnb3J5X2hvc3BpdGFsXCI6IFtdLFxuICAgICAgICAgLy8gICAgICAgICAgICBcImNhdGVnb3J5X2ZpblwiOiBbXG4gICAgICAgICAvLyAgICAgICAgICAgICAgICB7XG4gICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgXCJjcnRpbWVcIjogMTQ5NjgxMTk3MzAwMCxcbiAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICBcImdyb3VwQ2F0ZWdvcnlcIjogXCJ0ZXN0MVwiLFxuICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIFwiZ3JvdXBOYW1lXCI6IFwi5rWL6K+V5aSn57G7XCIsXG4gICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgXCJpZFwiOiAzLFxuICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIFwic3RhdHVzXCI6IFwiMVwiLFxuICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIFwic3ViVGVtcGxhdGVzXCI6IFwiNCw1LDYsXCIsXG4gICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgXCJ0ZW1wbGF0ZUNsYXNzXCI6IFwiY2F0ZWdvcnlfZmluXCJcbiAgICAgICAgIC8vICAgICAgICAgICAgICAgIH1cbiAgICAgICAgIC8vICAgICAgICAgICAgXSxcbiAgICAgICAgIC8vICAgICAgICAgICAgXCJjYXRlZ29yeV9ub3JtYWxcIjogW11cbiAgICAgICAgIC8vICAgICAgICB9XG4gICAgICAgICAvLyAgICB9XG4gICAgICAgICB0aGlzLmZpbGVTZXJ2aWNlLmdldENhdGVnb3JpZXMoKS5zdWJzY3JpYmUocmVzID0+IHtcbiAgICAgICAgICAgIGxldCB7YWxsVGVtcGxhdGVDbGFzcywgZ3JvdXBUZW1wbGF0ZXMsIHN1YlRlbXBsYXRlc30gPSByZXM7XG4gICAgICAgICAgICBsZXQgc3RvcmVPYmogPSB7fVxuXG4gICAgICAgICAgICBfLm1hcChhbGxUZW1wbGF0ZUNsYXNzLCAodGVtcCkgPT4ge1xuICAgICAgICAgICAgICAgdGVtcC5zdWJUZW1wbGF0ZXMgPSBzdWJUZW1wbGF0ZXNbdGVtcFsnZG9tYWludmFsdWVjb2RlJ11dO1xuICAgICAgICAgICAgICAgdGVtcC5ncm91cFRlbXBsYXRlcyA9IGdyb3VwVGVtcGxhdGVzW3RlbXBbJ2RvbWFpbnZhbHVlY29kZSddXVxuICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgY29uc29sZS5sb2coYWxsVGVtcGxhdGVDbGFzcylcblxuICAgICAgICAgICAgdGhpcy51c2VyRGF0YS5jYXRlZ29yeU9wdGlvbnMgPSBhbGxUZW1wbGF0ZUNsYXNzO1xuICAgICAgICAgICAgdGhpcy51c2VyRGlhbG9nLnNldFN0YXRlKGZhbHNlKTtcbiAgICAgICAgIH0pXG4gICAgICB9KTtcbiAgIH1cblxuICAgb25CdG5VcGRhdGVDbGlja2VkKGdyaWQ6IEdyaWRPcHRpb25zKSB7XG4gICAgICBpZiAoIXRoaXMuc2VsZWN0ZWRVc2VyKSB7XG4gICAgICAgICB0aGlzLm9uQnRuTmV3Q2xpY2tlZChncmlkKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICB0aGlzLnVzZXJEaWFsb2cucG9wdXAoXG4gICAgICAgICAgICB0aGlzLmkxOG4uaW5zdGFudChcImFkbWluLnVzZXIuZGlhbG9nLnRpdGxlVXBkYXRlXCIsIHtuYW1lOiB0aGlzLnNlbGVjdGVkVXNlci5kaXNwbGF5bmFtZX0pLFxuICAgICAgICAgICAgdHJ1ZSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuXG4gICAgICAgICAgICAgICB0aGlzLnVzZXJEYXRhID0gdGhpcy51c2VyU2VydmljZS50b1VzZXJTcGVjKE9iamVjdC5jcmVhdGUodGhpcy5zZWxlY3RlZFVzZXIpKTtcbiAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMudXNlckRhdGEpXG4gICAgICAgICAgICAgICB0aGlzLnVzZXJEYXRhLnVwZGF0ZVVzZXIgPSB0cnVlO1xuICAgICAgICAgICAgICAgdGhpcy51c2VyRGlhbG9nLnNldFN0YXRlKHRydWUsIHRoaXMuaTE4bi5pbnN0YW50KFwiYWRtaW4udXNlci5kaWFsb2cubG9hZGluZ1wiKSk7XG4gICAgICAgICAgICAgICB0aGlzLnVzZXJEYXRhLmVtYWlsID0gdGhpcy5zZWxlY3RlZFVzZXIuZW1haWw7XG5cbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBAZGF0ZTog5LuO6KGo5qC85Lit6I635Y+W5YiG57G75L+h5oGvXG4gICAgICAgICAgICAgICAgICogQGF1dGhvcjogemhhbmdiaW5cbiAgICAgICAgICAgICAgICAgKiBAZS1tYWlsOiBzdXBlcmJpbmxpbkAxNjMuY29tXG4gICAgICAgICAgICAgICAgICogQHNlZTogaHR0cDovL2Jpbmxpbi5zaXRlOjg4ODkvIy9yZXN1bWVcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgIGxldCBjYXRlZ29yeVNlbGVjdDogc3RyaW5nW10gPSB0aGlzLnNlbGVjdGVkVXNlci5jYXRlZ29yeSA/IHRoaXMuc2VsZWN0ZWRVc2VyLmNhdGVnb3J5LnNwbGl0KCcsJykgOiAnJztcbiAgICAgICAgICAgICAgIGxldCBncm91cENhdGVnb3J5U2VsZWN0OiBzdHJpbmdbXSA9IHRoaXMuc2VsZWN0ZWRVc2VyLmdyb3VwQ2F0ZWdvcnkgPyB0aGlzLnNlbGVjdGVkVXNlci5ncm91cENhdGVnb3J5LnNwbGl0KCcsJykgOiAnJztcblxuICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgKiDku47lkI7lj7Dojrflj5bmlbDmja7lubbliqDlt6VcbiAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgdGhpcy5maWxlU2VydmljZS5nZXRDYXRlZ29yaWVzKCkuc3Vic2NyaWJlKHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgICBsZXQge2FsbFRlbXBsYXRlQ2xhc3MsIGdyb3VwVGVtcGxhdGVzLCBzdWJUZW1wbGF0ZXN9ID0gcmVzO1xuICAgICAgICAgICAgICAgICAgbGV0IHN0b3JlT2JqID0ge31cblxuICAgICAgICAgICAgICAgICAgXy5tYXAoYWxsVGVtcGxhdGVDbGFzcywgKHRlbXApID0+IHtcbiAgICAgICAgICAgICAgICAgICAgIHRlbXAuc3ViVGVtcGxhdGVzID0gc3ViVGVtcGxhdGVzW3RlbXBbJ2RvbWFpbnZhbHVlY29kZSddXTtcbiAgICAgICAgICAgICAgICAgICAgIHRlbXAuZ3JvdXBUZW1wbGF0ZXMgPSBncm91cFRlbXBsYXRlc1t0ZW1wWydkb21haW52YWx1ZWNvZGUnXV1cbiAgICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAgICog6I635Y+W5pWw5o2u5ZCO6ZyA6KaB6YGN5Y6GIOS4juWIhuexu+S/oeaBr+i/m+ihjOavlOWvue+8jOWwhuW3sumAieWIhuexu+i/m+ihjOmAieaLqeaTjeS9nFxuICAgICAgICAgICAgICAgICAgICogQHBhcmFtIHtbdHlwZV19IGFsbFRlbXBsYXRlQ2xhc3MgW2Rlc2NyaXB0aW9uXVxuICAgICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgICBfLm1hcChhbGxUZW1wbGF0ZUNsYXNzLCAodGVtcCk9PntcbiAgICAgICAgICAgICAgICAgICAgIF8ubWFwKHRlbXAuZ3JvdXBUZW1wbGF0ZXMsIChncm91cCk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKF8uaW5kZXhPZihncm91cENhdGVnb3J5U2VsZWN0LCBncm91cC5ncm91cENhdGVnb3J5KSlcbiAgICAgICAgICAgICAgICAgICAgICAgIF8uaW5kZXhPZihncm91cENhdGVnb3J5U2VsZWN0LCBncm91cC5ncm91cENhdGVnb3J5KSA+IC0xID8gZ3JvdXAuY2hlY2tlZCA9IHRydWUgOiAnJztcbiAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICBfLm1hcCh0ZW1wLnN1YlRlbXBsYXRlcywgKHN1Yik9PntcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKF8uaW5kZXhPZihfLmluZGV4T2YoY2F0ZWdvcnlTZWxlY3QsIHN1Yi5jYXRlZ29yeSkgPiAtMSkpXG4gICAgICAgICAgICAgICAgICAgICAgICBfLmluZGV4T2YoY2F0ZWdvcnlTZWxlY3QsIHN1Yi5jYXRlZ29yeSkgPiAtMSA/IHN1Yi5jaGVja2VkID0gdHJ1ZSA6ICcnO1xuICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgICAgIHRoaXMudXNlckRhdGEuY2F0ZWdvcnlPcHRpb25zID0gYWxsVGVtcGxhdGVDbGFzcztcbiAgICAgICAgICAgICAgICAgIHRoaXMudXNlckRpYWxvZy5zZXRTdGF0ZShmYWxzZSk7XG4gICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSk7XG4gICAgICB9XG4gICB9XG5cbiAgIG9uQnRuUmVtb3ZlQ2xpY2tlZChncmlkOiBHcmlkT3B0aW9ucyk6IHZvaWQge1xuICAgICAgdGhpcy5hbGVydC5zaG93KCkuc3Vic2NyaWJlKHJlc3VsdCA9PiB7XG4gICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICB0aGlzLnVzZXJTZXJ2aWNlLnJlbW92ZVVzZXIodGhpcy5zZWxlY3RlZFVzZXIuaWQpLnN1YnNjcmliZShyZXN1bHQgPT4ge1xuICAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoKGdyaWQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICB9XG4gICAgICB9KTtcbiAgIH1cblxuICAgb25HcmlkUmVhZHkoZ3JpZDogR3JpZE9wdGlvbnMpOiB2b2lkIHtcbiAgICAgIGdyaWQuYXBpLnNpemVDb2x1bW5zVG9GaXQoKTtcbiAgICAgIHRoaXMucmVmcmVzaChncmlkKTtcbiAgIH1cblxuICAgcmVmcmVzaChncmlkOiBHcmlkT3B0aW9ucyk6IHZvaWQge1xuICAgICAgdGhpcy5pc0xvYWRpbmcgPSB0cnVlO1xuICAgICAgZ3JpZC5hcGkuc2hvd0xvYWRpbmdPdmVybGF5KCk7XG5cblxuICAgICAgLy8gICAgVE9ET1xuICAgICAgLy8gdGhpcy5maWxlU2VydmljZS5nZXRDYXRlZ29yaWVzKCkuc3Vic2NyaWJlKGxpc3QgPT4ge1xuICAgICAgLy8gICAgbGlzdC5mb3JFYWNoKGNhdGVnb3J5ID0+IHtcbiAgICAgIC8vICAgICAgIHRoaXMuY2F0ZWdvcmllc1tjYXRlZ29yeS52YWx1ZV0gPSBjYXRlZ29yeS5sYWJlbDtcbiAgICAgIC8vICAgIH0pO1xuICAgICAgLy8gfSk7XG4gICAgICB0aGlzLnVzZXJTZXJ2aWNlLmdldFVzZXJzKHtcbiAgICAgICAgIGZyb206IDAsXG4gICAgICAgICBzaXplOiA1MDAwMFxuICAgICAgfSkuc3Vic2NyaWJlKGl0ZW1TZXQgPT4ge1xuICAgICAgICAgbGV0IGRhdGFTb3VyY2UgPSB7XG4gICAgICAgICAgIHJvd0NvdW50OiBudWxsLCAvLyBiZWhhdmUgYXMgaW5maW5pdGUgc2Nyb2xsXG4gICAgICAgICAgIGdldFJvd3M6IChwYXJhbXMpID0+IHtcbiAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHBhcmFtcylcbiAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdhc2tpbmcgZm9yICcgKyBwYXJhbXMuc3RhcnRSb3cgKyAnIHRvICcgKyBwYXJhbXMuZW5kUm93KTtcbiAgICAgICAgICAgICAgIGxldCBkYXRhQWZ0ZXJTb3J0aW5nQW5kRmlsdGVyaW5nID0gdGhpcy5zb3J0QW5kRmlsdGVyKGl0ZW1TZXQucmVzdWx0LCBwYXJhbXMuc29ydE1vZGVsKTtcbiAgICAgICAgICAgICAgIGxldCByb3dzVGhpc1BhZ2UgPSBkYXRhQWZ0ZXJTb3J0aW5nQW5kRmlsdGVyaW5nLnNsaWNlKHBhcmFtcy5zdGFydFJvdywgcGFyYW1zLmVuZFJvdyk7XG5cbiAgICAgICAgICAgICAgIGxldCBsYXN0Um93ID0gLTE7XG4gICAgICAgICAgICAgICBpZiAoZGF0YUFmdGVyU29ydGluZ0FuZEZpbHRlcmluZy5sZW5ndGggPD0gcGFyYW1zLmVuZFJvdykge1xuICAgICAgICAgICAgICAgICAgbGFzdFJvdyA9IGRhdGFBZnRlclNvcnRpbmdBbmRGaWx0ZXJpbmcubGVuZ3RoO1xuICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgcGFyYW1zLnN1Y2Nlc3NDYWxsYmFjayhyb3dzVGhpc1BhZ2UsIGxhc3RSb3cpO1xuICAgICAgICAgICB9XG4gICAgICAgICB9O1xuICAgICAgICAgZ3JpZC5hcGkuc2V0RGF0YXNvdXJjZShkYXRhU291cmNlKTtcbiAgICAgICAgIHRoaXMuaXNMb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICBncmlkLmFwaS5oaWRlT3ZlcmxheSgpO1xuICAgICAgfSwgZXJyb3IgPT4ge1xuICAgICAgICAgdGhpcy5ub3RpZmljYXRpb25TZXJ2aWNlLmFsZXJ0KGVycm9yLmV4Y2VwdGlvbk5hbWUsIGVycm9yLmRlc2NyaXB0aW9uKTtcbiAgICAgICAgIHRoaXMub25FcnJvci5lbWl0KGVycm9yKTtcbiAgICAgIH0pO1xuXG4gICAgICAgICAvLyBsZXQgZHM6IFVzZXJEYXRhU291cmNlID0gVXNlckRhdGFTb3VyY2UuY3JlYXRlKHRoaXMudXNlclNlcnZpY2UsIHRoaXMubm90aWZ5KTtcbiAgICAgICAgIC8vIGRzLm9uQ29tcGxldGUuc3Vic2NyaWJlKChsaXN0OiBhbnlbXSkgPT4ge1xuICAgICAgICAgLy8gICAgdGhpcy5pc0xvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgIC8vICAgIGNvbnNvbGUubG9nKGxpc3QpXG5cbiAgICAgICAgIC8vIGlmIChsaXN0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgIC8vICAgIGdyaWQuYXBpLmhpZGVPdmVybGF5KCk7XG4gICAgICAgICAvLyB9IGVsc2Uge1xuICAgICAgICAgLy8gICAgZ3JpZC5hcGkuc2hvd05vUm93c092ZXJsYXkoKTtcbiAgICAgICAgIC8vIH1cblxuICAgICAgICAgLy8gbGV0IHVzZXJJZDogbnVtYmVyID0gdGhpcy5yb3V0ZS5zbmFwc2hvdC5wYXJhbXNbXCJ1c2VyXCJdO1xuXG4gICAgICAgICAvLyBpZiAodXNlcklkKSB7XG4gICAgICAgICAvLyAgICBncmlkLmFwaS5mb3JFYWNoTm9kZShub2RlID0+IG5vZGUuc2V0U2VsZWN0ZWQobm9kZS5pZCA9PT0gdXNlcklkLnRvU3RyaW5nKCkpKTtcbiAgICAgICAgIC8vIH0gZWxzZSB7XG4gICAgICAgICAvLyAgICBncmlkLmFwaS5kZXNlbGVjdEFsbCgpO1xuICAgICAgICAgLy8gfVxuICAgICAgICAgLy99KTtcblxuICAgfVxuXG4gICBzb3J0QW5kRmlsdGVyKGFsbE9mVGhlRGF0YSwgc29ydE1vZGVsKSB7XG4gICAgICByZXR1cm4gdGhpcy5zb3J0RGF0YShzb3J0TW9kZWwsIGFsbE9mVGhlRGF0YSlcbiAgIH1cblxuICAgc29ydERhdGEoc29ydE1vZGVsLCBkYXRhKSB7XG4gICAgICAgdmFyIHNvcnRQcmVzZW50ID0gc29ydE1vZGVsICYmIHNvcnRNb2RlbC5sZW5ndGggPiAwO1xuICAgICAgIGlmICghc29ydFByZXNlbnQpIHtcbiAgICAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICAgfVxuICAgICAgIC8vIGRvIGFuIGluIG1lbW9yeSBzb3J0IG9mIHRoZSBkYXRhLCBhY3Jvc3MgYWxsIHRoZSBmaWVsZHNcbiAgICAgICB2YXIgcmVzdWx0T2ZTb3J0ID0gZGF0YS5zbGljZSgpO1xuICAgICAgIHJlc3VsdE9mU29ydC5zb3J0KGZ1bmN0aW9uKGEsYikge1xuICAgICAgICAgICBmb3IgKHZhciBrID0gMDsgazxzb3J0TW9kZWwubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgICAgICAgIHZhciBzb3J0Q29sTW9kZWwgPSBzb3J0TW9kZWxba107XG4gICAgICAgICAgICAgICB2YXIgdmFsdWVBID0gYVtzb3J0Q29sTW9kZWwuY29sSWRdO1xuICAgICAgICAgICAgICAgdmFyIHZhbHVlQiA9IGJbc29ydENvbE1vZGVsLmNvbElkXTtcbiAgICAgICAgICAgICAgIC8vIHRoaXMgZmlsdGVyIGRpZG4ndCBmaW5kIGEgZGlmZmVyZW5jZSwgbW92ZSBvbnRvIHRoZSBuZXh0IG9uZVxuICAgICAgICAgICAgICAgaWYgKHZhbHVlQT09dmFsdWVCKSB7XG4gICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICB2YXIgc29ydERpcmVjdGlvbiA9IHNvcnRDb2xNb2RlbC5zb3J0ID09PSAnYXNjJyA/IDEgOiAtMTtcbiAgICAgICAgICAgICAgIGlmICh2YWx1ZUEgPiB2YWx1ZUIpIHtcbiAgICAgICAgICAgICAgICAgICByZXR1cm4gc29ydERpcmVjdGlvbjtcbiAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgcmV0dXJuIHNvcnREaXJlY3Rpb24gKiAtMTtcbiAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgfVxuICAgICAgICAgICAvLyBubyBmaWx0ZXJzIGZvdW5kIGEgZGlmZmVyZW5jZVxuICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICB9KTtcbiAgICAgICByZXR1cm4gcmVzdWx0T2ZTb3J0O1xuICAgfVxuXG4gICBvbkNvbW1pdChoYW5kbGVyOiBPYnNlcnZlcjxib29sZWFuPik6IHZvaWQge1xuICAgICAgY29uc29sZS5sb2codGhpcy51c2VyRGF0YS5jYXRlZ29yeU9wdGlvbnMpXG4gICAgICBsZXQgZ3JvdXBDYXRlZ29yeTphbnlbXSA9IFtdLGNhdGVnb3J5OmFueVtdID0gW107ICAgIC8vIOWtmOWCqOmAieS4reeahOWIhuexu1xuXG4gICAgICBfLm1hcCh0aGlzLnVzZXJEYXRhLmNhdGVnb3J5T3B0aW9ucywgKHRlbXApPT57XG4gICAgICAgICBfLm1hcCh0ZW1wLmdyb3VwVGVtcGxhdGVzLCAoZ3JvdXApPT57XG4gICAgICAgICAgICBpZihncm91cC5jaGVja2VkKSBncm91cENhdGVnb3J5LnB1c2goZ3JvdXAuZ3JvdXBDYXRlZ29yeSlcbiAgICAgICAgIH0pXG4gICAgICAgICBfLm1hcCh0ZW1wLnN1YlRlbXBsYXRlcywgKHN1Yik9PntcbiAgICAgICAgICAgIGlmKHN1Yi5jaGVja2VkKSBjYXRlZ29yeS5wdXNoKHN1Yi5jYXRlZ29yeSlcbiAgICAgICAgIH0pXG4gICAgICB9KVxuXG4gICAgICBjb25zb2xlLmxvZyhncm91cENhdGVnb3J5LCBjYXRlZ29yeSlcblxuICAgICAgLy8gbGV0IHNlbGV0ZWRDYXRlZ29yeTogQ2F0ZWdvcnlbXSA9IHRoaXMudXNlckRhdGEuY2F0ZWdvcnlPcHRpb25zLmZpbHRlcihjYXRlZ29yeSA9PiBjYXRlZ29yeVtcImNoZWNrZWRcIl0pO1xuICAgICAgdGhpcy51c2VyRGF0YS5jYXRlZ29yeSA9IGNhdGVnb3J5LmpvaW4oXCIsXCIpO1xuICAgICAgdGhpcy51c2VyRGF0YS5ncm91cENhdGVnb3J5ID0gZ3JvdXBDYXRlZ29yeS5qb2luKFwiLFwiKTtcblxuICAgICAgdGhpcy52YWxpZGF0b3IoKS5maW5hbGx5KCgpID0+IHRoaXMuZm9ybUxvYWRpbmcgPSBmYWxzZSkuc3Vic2NyaWJlKGVycm9ycyA9PiB7XG4gICAgICAgICBpZiAoZXJyb3JzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIE9ic2VydmFibGUudGhyb3coZXJyb3JzKS5zdWJzY3JpYmUoaGFuZGxlcik7XG4gICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5mb3JtTG9hZGluZyA9IHRydWU7XG5cbiAgICAgICAgICAgIGlmICghdGhpcy51c2VyRGF0YS51cGRhdGVVc2VyKSB7XG4gICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKHRoaXMudXNlckRhdGEpXG4gICAgICAgICAgICAgICB0aGlzLnVzZXJTZXJ2aWNlLmNyZWF0ZVVzZXIodGhpcy51c2VyRGF0YSkuZmluYWxseSgoKSA9PiB0aGlzLmZvcm1Mb2FkaW5nID0gZmFsc2UpLnN1YnNjcmliZShyZXN1bHQgPT4ge1xuICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgT2JzZXJ2YWJsZS5vZih0cnVlKS5zdWJzY3JpYmUoaGFuZGxlcik7XG4gICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2godGhpcy51c2VyR3JpZCk7XG4gICAgICAgICAgICAgICAgICAgICB0aGlzLm5vdGlmeS5zdWNjZXNzKFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pMThuLmluc3RhbnQoXCLmiJDlip9cIiksXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmkxOG4uaW5zdGFudChcIuaTjeS9nOaIkOWKn1wiKVxuICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICBPYnNlcnZhYmxlLnRocm93KFt7XG4gICAgICAgICAgICAgICAgICAgICAgICBleGNlcHRpb25OYW1lOiB0aGlzLmkxOG4uaW5zdGFudChcImFkbWluLnVzZXIuZGlhbG9nLmZvcm0uZXJyb3IudGl0bGVcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogdGhpcy5pMThuLmluc3RhbnQoXCJhZG1pbi51c2VyLmRpYWxvZy5mb3JtLmVycm9yLmRlc2NcIilcbiAgICAgICAgICAgICAgICAgICAgIH1dKS5zdWJzY3JpYmUoaGFuZGxlcik7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICB9LCBlcnJvciA9PiBPYnNlcnZhYmxlLnRocm93KGVycm9yKS5zdWJzY3JpYmUoaGFuZGxlcikpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgIHRoaXMudXNlclNlcnZpY2UudXBkYXRlVXNlcih0aGlzLnVzZXJEYXRhKS5maW5hbGx5KCgpID0+IHRoaXMuZm9ybUxvYWRpbmcgPSBmYWxzZSkuc3Vic2NyaWJlKHJlc3VsdCA9PiB7XG4gICAgICAgICAgICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICBPYnNlcnZhYmxlLm9mKHRydWUpLnN1YnNjcmliZShoYW5kbGVyKTtcbiAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaCh0aGlzLnVzZXJHcmlkKTtcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICBPYnNlcnZhYmxlLnRocm93KFt7XG4gICAgICAgICAgICAgICAgICAgICAgICBleGNlcHRpb25OYW1lOiB0aGlzLmkxOG4uaW5zdGFudChcImFkbWluLnVzZXIuZGlhbG9nLmZvcm0uZXJyb3IudGl0bGVcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogdGhpcy5pMThuLmluc3RhbnQoXCJhZG1pbi51c2VyLmRpYWxvZy5mb3JtLmVycm9yLmRlc2NcIilcbiAgICAgICAgICAgICAgICAgICAgIH1dKS5zdWJzY3JpYmUoaGFuZGxlcik7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICB9LCBlcnJvciA9PiBPYnNlcnZhYmxlLnRocm93KGVycm9yKS5zdWJzY3JpYmUoaGFuZGxlcikpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgIH1cblxuICAgb25EaXNtaXNzKCk6IHZvaWQge1xuICAgICAgdGhpcy51c2VyTWdtdEZvcm0ucmVzZXQoKTtcbiAgICAgIHRoaXMudXNlckRhdGEgPSB7XG4gICAgICAgICB0eXBlOiBVc2VyVHlwZS5Vc2VyXG4gICAgICB9O1xuICAgfVxuXG4gICBvblJvd1NlbGVjdGVkKCk6IHZvaWQge1xuICAgICAgbGV0IHVzZXI6IFVzZXIgPSB0aGlzLnNlbGVjdGVkVXNlcjtcblxuICAgICAgaWYgKHVzZXIpIHtcbiAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFt7dXNlcjogdXNlci5pZH1dLCB7cmVsYXRpdmVUbzogdGhpcy5yb3V0ZX0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFt7fV0sIHtyZWxhdGl2ZVRvOiB0aGlzLnJvdXRlfSk7XG4gICAgICB9XG4gICB9XG5cbiAgIHZhbGlkYXRvcigpOiBPYnNlcnZhYmxlPEdlbmVyYWxFeGNlcHRpb25bXT4ge1xuICAgICAgdGhpcy5mb3JtTG9hZGluZyA9IHRydWU7XG4gICAgICByZXR1cm4gT2JzZXJ2YWJsZS5jcmVhdGUoKG9ic2VydmVyOiBPYnNlcnZlcjxHZW5lcmFsRXhjZXB0aW9uW10+KSA9PiB7XG4gICAgICAgICBsZXQgZXJyb3JzOiBHZW5lcmFsRXhjZXB0aW9uW10gPSBbXTtcbiAgICAgICAgIGxldCBhc3luYzogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgICAgICBpZiAoIXRoaXMudXNlckRhdGEudXNlcm5hbWUpIHtcbiAgICAgICAgICAgIGVycm9ycy5wdXNoKHtcbiAgICAgICAgICAgICAgIGV4Y2VwdGlvbk5hbWU6IHRoaXMuaTE4bi5pbnN0YW50KFwiYWRtaW4udXNlci5kaWFsb2cuZm9ybS51c2VybmFtZS5yZXF1aXJlZC50aXRsZVwiKSxcbiAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiB0aGlzLmkxOG4uaW5zdGFudChcImFkbWluLnVzZXIuZGlhbG9nLmZvcm0udXNlcm5hbWUucmVxdWlyZWQuZGVzY1wiKSxcbiAgICAgICAgICAgICAgIHR5cGU6IFwiR2VuZXJhbEV4Y2VwdGlvblwiXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMudXNlckRhdGEudXBkYXRlVXNlcikge1xuICAgICAgICAgICAgICAgYXN5bmMgPSB0cnVlO1xuICAgICAgICAgICAgICAgdGhpcy51c2VyU2VydmljZS52YWxpZGF0ZVVzZXJuYW1lKHRoaXMudXNlckRhdGEudXNlcm5hbWUpXG4gICAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKHJlc3VsdCA9PiB7XG4gICAgICAgICAgICAgICAgICAgICB0aGlzLnVzZXJEYXRhLmlzVXNlcm5hbWVWYWxpZCA9IHJlc3VsdDtcblxuICAgICAgICAgICAgICAgICAgICAgaWYgKCFyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9ycy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4Y2VwdGlvbk5hbWU6IHRoaXMuaTE4bi5pbnN0YW50KFwiYWRtaW4udXNlci5kaWFsb2cuZm9ybS51c2VybmFtZS51bmlxdWUudGl0bGVcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogdGhpcy5pMThuLmluc3RhbnQoXCJhZG1pbi51c2VyLmRpYWxvZy5mb3JtLnVzZXJuYW1lLnVuaXF1ZS5kZXNjXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJHZW5lcmFsRXhjZXB0aW9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICBvYnNlcnZlci5uZXh0KGVycm9ycyk7XG4gICAgICAgICAgICAgICAgICAgICBvYnNlcnZlci5jb21wbGV0ZSgpO1xuICAgICAgICAgICAgICAgICAgfSwgZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgZXJyb3JzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgZXhjZXB0aW9uTmFtZTogdGhpcy5pMThuLmluc3RhbnQoXCJhZG1pbi51c2VyLmRpYWxvZy5mb3JtLnVzZXJuYW1lLmVycm9yLnRpdGxlXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IHRoaXMuaTE4bi5pbnN0YW50KFwiYWRtaW4udXNlci5kaWFsb2cuZm9ybS51c2VybmFtZS5lcnJvci5kZXNjXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJHZW5lcmFsRXhjZXB0aW9uXCJcbiAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgb2JzZXJ2ZXIubmV4dChlcnJvcnMpO1xuICAgICAgICAgICAgICAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgfVxuXG4gICAgICAgICBpZiAoIXRoaXMudXNlckRhdGEucGFzc3dvcmQpIHtcbiAgICAgICAgICAgIGVycm9ycy5wdXNoKHtcbiAgICAgICAgICAgICAgIGV4Y2VwdGlvbk5hbWU6IHRoaXMuaTE4bi5pbnN0YW50KFwiYWRtaW4udXNlci5kaWFsb2cuZm9ybS5wYXNzd29yZC5yZXF1aXJlZC50aXRsZVwiKSxcbiAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiB0aGlzLmkxOG4uaW5zdGFudChcImFkbWluLnVzZXIuZGlhbG9nLmZvcm0ucGFzc3dvcmQucmVxdWlyZWQuZGVzY1wiKSxcbiAgICAgICAgICAgICAgIHR5cGU6IFwiR2VuZXJhbEV4Y2VwdGlvblwiXG4gICAgICAgICAgICB9KVxuICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIGlmICh0aGlzLnVzZXJEYXRhLnBhc3N3b3JkICE9PSB0aGlzLnVzZXJEYXRhLmNvbmZpcm1Qd2QpIHtcbiAgICAgICAgICAgIC8vICAgIGVycm9ycy5wdXNoKHtcbiAgICAgICAgICAgIC8vICAgICAgIGV4Y2VwdGlvbk5hbWU6IHRoaXMuaTE4bi5pbnN0YW50KFwiYWRtaW4udXNlci5kaWFsb2cuZm9ybS5wYXNzd29yZC5taXNtYXRjaC50aXRsZVwiKSxcbiAgICAgICAgICAgIC8vICAgICAgIGRlc2NyaXB0aW9uOiB0aGlzLmkxOG4uaW5zdGFudChcImFkbWluLnVzZXIuZGlhbG9nLmZvcm0ucGFzc3dvcmQubWlzbWF0Y2guZGVzY1wiKSxcbiAgICAgICAgICAgIC8vICAgICAgIHR5cGU6IFwiR2VuZXJhbEV4Y2VwdGlvblwiXG4gICAgICAgICAgICAvLyAgICB9KTtcbiAgICAgICAgICAgIC8vIH1cbiAgICAgICAgIH1cblxuICAgICAgICAgaWYgKCFhc3luYykge1xuICAgICAgICAgICAgb2JzZXJ2ZXIubmV4dChlcnJvcnMpO1xuICAgICAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcbiAgICAgICAgIH1cbiAgICAgIH0pO1xuICAgfVxuXG4gICAvL05PVElDRTogdGhlIHJpZ2h0IHdheSB0byBidWlsZCBhIHN0YW5kYXJkIGNhbGxiYWNrIGluIHR5cGVzY3JpcHRcbiAgIC8vbmVlZHMgY2xlYXIgdW5kZXJzdGFuZGluZyBvZiBzY29wZSBmb3IgdGhpcyBpbiBqYXZhc2NyaXB0LlxuICAgLy8gdmFsdWVDaGVja0NhbGxiYWNrRm4oKTogKHN0cmluZyk9Pk9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgLy8gICAgbGV0IGZuID0gKCRzZWxmOiBVc2VyU2VydmljZSkgPT4ge1xuICAgLy8gICAgICAgcmV0dXJuICh1c2VybmFtZSkgPT4gJHNlbGYudmFsaWRhdGVVc2VybmFtZSh1c2VybmFtZSk7XG4gICAvLyAgICB9O1xuICAgLy9cbiAgIC8vICAgIHJldHVybiBmbih0aGlzLnVzZXJTZXJ2aWNlKTtcbiAgIC8vIH1cbn0iXX0=
