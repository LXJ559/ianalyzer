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
 * Created by zhongping.lu on 11/10/2016.
 */
var core_1 = require("@angular/core");
var file_service_1 = require("../services/file.service");
var angular2_notifications_1 = require("angular2-notifications");
var router_1 = require("@angular/router");
var general_util_1 = require("../utils/general.util");
var ng2_translate_1 = require("ng2-translate");
var common_1 = require("@angular/common");
var rxjs_1 = require("rxjs");
var category_upload_form_component_1 = require("./category.upload.form.component");
var alert_widget_1 = require("../widgets/alert.widget");
var http_1 = require("@angular/http");
var CategoryMgmtComponent = (function () {
    function CategoryMgmtComponent(i18n, fileService, notify, router, route, http) {
        var _this = this;
        this.i18n = i18n;
        this.fileService = fileService;
        this.notify = notify;
        this.router = router;
        this.route = route;
        this.http = http;
        this.rowData = [];
        this.datePipe = new common_1.DatePipe(this.i18n.currentLang);
        this.gridOptions = general_util_1.Util.getLazyLoadingGridOptions(this.i18n.instant("loading"), this.i18n.instant("noData"));
        this.gridOptions.getRowNodeId = function (data) { return data.id.toString(); };
        this.gridOptions.onSelectionChanged = function () { _this.onSelectionChanged(); };
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
                headerName: this.i18n.instant("admin.category.list.columns.name"),
                field: "templatename",
            }, {
                headerName: this.i18n.instant("admin.category.list.columns.id"),
                field: "category"
            }, {
                headerName: '分类',
                field: "templateClass"
            }, {
                headerName: '子模板名称',
                field: "subTemplates"
            }, {
                headerName: '类型',
                field: "style"
            }, {
                headerName: this.i18n.instant("admin.category.list.columns.status"),
                field: "status",
                cellFormatter: function (param) {
                    return param && param.value ? (param.value === "1" ?
                        _this.i18n.instant("admin.category.list.status.valid") :
                        _this.i18n.instant("admin.category.list.status.invalid")) : "";
                }
            }, {
                headerName: this.i18n.instant("admin.category.list.columns.crtime"),
                field: "crtime",
                cellFormatter: function (param) { return param.value ? _this.datePipe.transform(param.value, general_util_1.Util.LONG_TIME_STRING) : ""; }
            }, {
                headerName: this.i18n.instant("analyzer.fileList.columns.download"),
                field: "id",
                cellRenderer: function (param) {
                    return param.value ?
                        "<a class=\"btn btn-link btn-outline-info\" href=\"/iData/api/template/download?id=" + param.value + "&type=" + param.data.type + "\" target=\"_blank\">\n               <h6><i class=\"icon-cloud-download icons\"></i></h6>\n             </a>\n             <a class=\"btn btn-link btn-outline-info\" href=\"/iData/api/file/download/" + param.data.category + "\" target=\"_blank\">\n               <h6>\u4E0B\u8F7Dexcel\u6A21\u677F</h6>\n             </a>" : "";
                }
            }];
    }
    CategoryMgmtComponent.prototype.createObs = function (id) {
        var _this = this;
        this.rowData = [];
        this.http.get('/iData/api/template/' + id).map(function (res) { return res.json(); }).subscribe(function (res) {
            _this.rowData.push(res);
            console.log(_this.rowData);
        });
    };
    CategoryMgmtComponent.prototype.onSelectionChanged = function () {
        var selectedRows = this.gridOptions.api.getSelectedRows();
        var id = selectedRows[0].id;
        this.createObs(id);
    };
    Object.defineProperty(CategoryMgmtComponent.prototype, "selectedCategory", {
        get: function () {
            if (!this.grid || !this.grid.api) {
                return null;
            }
            var rows = this.grid.api.getSelectedRows();
            return rows.length > 0 ? rows[0] : null;
        },
        enumerable: true,
        configurable: true
    });
    CategoryMgmtComponent.prototype.onGridReady = function (grid) {
        grid.api.sizeColumnsToFit();
        this.refresh(grid);
    };
    CategoryMgmtComponent.prototype.onRowSelected = function () {
        console.log('sel');
        var template = this.selectedCategory;
        if (template) {
            this.router.navigate([{ category: template.id }], { relativeTo: this.route });
        }
        else {
            this.router.navigate([{}], { relativeTo: this.route });
        }
    };
    CategoryMgmtComponent.prototype.refresh = function (grid) {
        var _this = this;
        this.isLoading = true;
        // let ds = TemplateDataSource.create(this.fileService, this.notify);
        // ds.onComplete.subscribe(list => {
        //    this.isLoading = false;
        //    if (list.length > 0) {
        //       grid.api.hideOverlay();
        //    } else {
        //       grid.api.showNoRowsOverlay();
        //    }
        //    let templateId: number = this.route.snapshot.params["category"];
        //    if (templateId) {
        //       grid.api.forEachNode(node => {
        //          node.setSelected(node.id === templateId.toString());
        //       });
        //    } else {
        //       grid.api.deselectAll();
        //       this.router.navigate([{}], {relativeTo: this.route});
        //    }
        // });
        this.fileService.getTemplatesCat({
            from: 0,
            size: 50000
        }).subscribe(function (templateSet) {
            console.log(templateSet);
            var allTemplateClass = templateSet.allTemplateClass, groupTemplates = templateSet.groupTemplates, subTemplates = templateSet.subTemplates;
            var storeArr = [];
            _.map(allTemplateClass, function (temp) {
                temp.subTemplates = subTemplates[temp['domainvaluecode']];
                _.map(temp.subTemplates, function (sub) {
                    sub.style = '普通模板';
                    sub.type = 0;
                });
                temp.groupTemplates = groupTemplates[temp['domainvaluecode']];
                _.map(temp.groupTemplates, function (group) {
                    group.style = '大模板';
                    group.type = 1;
                    group.templatename = group.groupName;
                    group.category = group.groupCategory;
                });
                temp.merge = temp.subTemplates.concat(temp.groupTemplates);
                _.map(temp.merge, function (me) {
                    me.templateClass = temp.domainvaluecn;
                });
            });
            _.map(allTemplateClass, function (temp) {
                storeArr = storeArr.concat(temp.merge);
            });
            console.log(storeArr);
            var dataSource = {
                rowCount: null,
                getRows: function (params) {
                    console.log(111111111);
                    console.log(params);
                    console.log('asking for ' + params.startRow + ' to ' + params.endRow);
                    if (JSON.stringify(templateSet.result) == '{}') {
                        grid.api.showNoRowsOverlay();
                        var dataAfterSortingAndFiltering = [];
                    }
                    else {
                        grid.api.hideOverlay();
                        var dataAfterSortingAndFiltering = _this.sortAndFilter(storeArr, params.sortModel);
                    }
                    var rowsThisPage = dataAfterSortingAndFiltering.slice(params.startRow, params.endRow);
                    var lastRow = -1;
                    if (dataAfterSortingAndFiltering.length <= params.endRow) {
                        lastRow = dataAfterSortingAndFiltering.length;
                    }
                    params.successCallback(rowsThisPage, lastRow);
                    _this.isLoading = false;
                }
            };
            grid.api.setDatasource(dataSource);
        }, function (error) {
            _this.notify.alert(error.exceptionName, error.description);
            params.failCallback();
        });
    };
    CategoryMgmtComponent.prototype.sortAndFilter = function (allOfTheData, sortModel) {
        return this.sortData(sortModel, allOfTheData);
    };
    CategoryMgmtComponent.prototype.sortData = function (sortModel, data) {
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
    CategoryMgmtComponent.prototype.onBtnNewClicked = function () {
        this.CategoryUploadFormComponent.popup();
    };
    CategoryMgmtComponent.prototype.onBtnRemoveClicked = function () {
        var _this = this;
        var template = this.selectedCategory;
        this.alert.show().subscribe(function (result) {
            if (result) {
                _this.fileService.removeTemplate(template.id).subscribe(function () {
                    _this.refresh(_this.grid);
                });
            }
        });
    };
    CategoryMgmtComponent.prototype.onCommit = function (handler) {
        var _this = this;
        this.form.submit().subscribe(function (result) {
            if (result) {
                rxjs_1.Observable.of(result).subscribe(handler);
                _this.refresh(_this.grid);
            }
            else {
                rxjs_1.Observable.throw([]).subscribe(handler);
            }
        }, function (errors) { return rxjs_1.Observable.throw(errors).subscribe(handler); });
    };
    return CategoryMgmtComponent;
}());
__decorate([
    core_1.ViewChild("CategoryUploadFormComponent"),
    __metadata("design:type", category_upload_form_component_1.CategoryUploadFormComponent)
], CategoryMgmtComponent.prototype, "CategoryUploadFormComponent", void 0);
__decorate([
    core_1.ViewChild("categoryGrid"),
    __metadata("design:type", Object)
], CategoryMgmtComponent.prototype, "grid", void 0);
__decorate([
    core_1.ViewChild("alert"),
    __metadata("design:type", alert_widget_1.AlertWidget)
], CategoryMgmtComponent.prototype, "alert", void 0);
CategoryMgmtComponent = __decorate([
    core_1.Component({
        selector: "category-mgmt",
        templateUrl: "views/admin/category.mgmt.html"
    }),
    __metadata("design:paramtypes", [ng2_translate_1.TranslateService, file_service_1.FileService,
        angular2_notifications_1.NotificationsService, router_1.Router, router_1.ActivatedRoute, http_1.Http])
], CategoryMgmtComponent);
exports.CategoryMgmtComponent = CategoryMgmtComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvY2F0ZWdvcnkubWdtdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOztHQUVHO0FBQ0gsc0NBQW1EO0FBQ25ELHlEQUFxRDtBQUNyRCxpRUFBNEQ7QUFDNUQsMENBQXVEO0FBR3ZELHNEQUEyQztBQUMzQywrQ0FBK0M7QUFFL0MsMENBQXlDO0FBQ3pDLDZCQUEwQztBQUMxQyxtRkFBNkU7QUFFN0Usd0RBQW9EO0FBQ3BELHNDQUFtQztBQU9uQztJQWVHLCtCQUFvQixJQUFzQixFQUFVLFdBQXdCLEVBQ3hELE1BQTRCLEVBQVUsTUFBYyxFQUFVLEtBQXFCLEVBQVMsSUFBVTtRQUQxSCxpQkE4REM7UUE5RG1CLFNBQUksR0FBSixJQUFJLENBQWtCO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEQsV0FBTSxHQUFOLE1BQU0sQ0FBc0I7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVUsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7UUFBUyxTQUFJLEdBQUosSUFBSSxDQUFNO1FBWDFILFlBQU8sR0FBUyxFQUFFLENBQUM7UUFFbkIsYUFBUSxHQUFHLElBQUksaUJBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBVzVDLElBQUksQ0FBQyxXQUFXLEdBQUcsbUJBQUksQ0FBQyx5QkFBeUIsQ0FDOUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEVBQzVCLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUM3QixDQUFDO1FBQ0YsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLEdBQUcsVUFBQyxJQUFjLElBQUssT0FBQSxJQUFJLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxFQUFsQixDQUFrQixDQUFDO1FBRXZFLElBQUksQ0FBQyxXQUFXLENBQUMsa0JBQWtCLEdBQUcsY0FBTyxLQUFJLENBQUMsa0JBQWtC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LEVBQUUsQ0FBQyxTQUFTLENBQUMsVUFBQSxNQUFNO1lBQ2hDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQ1YsaUJBQVUsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUN6QyxLQUFJLENBQUMsT0FBTyxDQUFDLEtBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMzQixDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0wsaUJBQVUsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzNDLENBQUM7UUFDSixDQUFDLEVBQUUsVUFBQSxNQUFNLElBQUksT0FBQSxpQkFBVSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEVBQTNDLENBQTJDLENBQUMsQ0FBQztJQUM3RCxDQUFDO0lBQ0osNEJBQUM7QUFBRCxDQWpSQSxBQWlSQyxJQUFBO0FBdlFFO0lBREMsZ0JBQVMsQ0FBQyw2QkFBNkIsQ0FBQzs4QkFDWiw0REFBMkI7MEVBQUM7QUFFOUI7SUFBMUIsZ0JBQVMsQ0FBQyxjQUFjLENBQUM7O21EQUFtQjtBQUN6QjtJQUFuQixnQkFBUyxDQUFDLE9BQU8sQ0FBQzs4QkFBUSwwQkFBVztvREFBQztBQWIxQztJQUpDLGdCQUFTLENBQUM7UUFDUixRQUFRLEVBQUUsZUFBZTtRQUN6QixXQUFXLEVBQUUsZ0NBQWdDO0tBQy9DLENBQUM7cUNBZ0IyQixnQ0FBZ0IsRUFBdUIsMEJBQVc7UUFDaEQsNkNBQW9CLEVBQWtCLGVBQU0sRUFBaUIsdUJBQWMsRUFBZSxXQUFJO3lCQWlRNUg7QUFqUlksZ0NBQUEscUJBQXFCLENBQUEiLCJmaWxlIjoiY29tcG9uZW50cy9jYXRlZ29yeS5tZ210LmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ3JlYXRlZCBieSB6aG9uZ3BpbmcubHUgb24gMTEvMTAvMjAxNi5cbiAqL1xuaW1wb3J0IHtDb21wb25lbnQsIFZpZXdDaGlsZH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7RmlsZVNlcnZpY2V9IGZyb20gXCIuLi9zZXJ2aWNlcy9maWxlLnNlcnZpY2VcIjtcbmltcG9ydCB7Tm90aWZpY2F0aW9uc1NlcnZpY2V9IGZyb20gXCJhbmd1bGFyMi1ub3RpZmljYXRpb25zXCI7XG5pbXBvcnQge0FjdGl2YXRlZFJvdXRlLCBSb3V0ZXJ9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7QVBJc30gZnJvbSBcIi4uL3V0aWxzL2FwaS51dGlsXCI7XG5pbXBvcnQge1RlbXBsYXRlLCBUZW1wbGF0ZURhdGFTb3VyY2V9IGZyb20gXCIuLi9tb2RlbHMvZmlsZS5tb2RlbFwiO1xuaW1wb3J0IHtVdGlsfSBmcm9tIFwiLi4vdXRpbHMvZ2VuZXJhbC51dGlsXCI7XG5pbXBvcnQge1RyYW5zbGF0ZVNlcnZpY2V9IGZyb20gXCJuZzItdHJhbnNsYXRlXCI7XG5pbXBvcnQge0dyaWRPcHRpb25zLCBDb2xEZWZ9IGZyb20gXCJhZy1ncmlkXCI7XG5pbXBvcnQge0RhdGVQaXBlfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uXCI7XG5pbXBvcnQge09ic2VydmVyLCBPYnNlcnZhYmxlfSBmcm9tIFwicnhqc1wiO1xuaW1wb3J0IHtDYXRlZ29yeVVwbG9hZEZvcm1Db21wb25lbnR9IGZyb20gXCIuL2NhdGVnb3J5LnVwbG9hZC5mb3JtLmNvbXBvbmVudFwiO1xuaW1wb3J0IHtEaWFsb2dXaWRnZXR9IGZyb20gXCIuLi93aWRnZXRzL2RpYWxvZy53aWRnZXRcIjtcbmltcG9ydCB7QWxlcnRXaWRnZXR9IGZyb20gXCIuLi93aWRnZXRzL2FsZXJ0LndpZGdldFwiO1xuaW1wb3J0IHtIdHRwfSBmcm9tIFwiQGFuZ3VsYXIvaHR0cFwiO1xuXG5cbkBDb21wb25lbnQoe1xuICAgc2VsZWN0b3I6IFwiY2F0ZWdvcnktbWdtdFwiLFxuICAgdGVtcGxhdGVVcmw6IFwidmlld3MvYWRtaW4vY2F0ZWdvcnkubWdtdC5odG1sXCJcbn0pXG5leHBvcnQgY2xhc3MgQ2F0ZWdvcnlNZ210Q29tcG9uZW50IHtcblxuICAgZ3JpZE9wdGlvbnM6IEdyaWRPcHRpb25zO1xuICAgZ3JpZENvbHVtbnM6IENvbERlZltdO1xuICAgaXNMb2FkaW5nOiBib29sZWFuO1xuICAgcm93RGF0YTphbnlbXSA9IFtdO1xuXG4gICBkYXRlUGlwZSA9IG5ldyBEYXRlUGlwZSh0aGlzLmkxOG4uY3VycmVudExhbmcpO1xuXG4gICBAVmlld0NoaWxkKFwiQ2F0ZWdvcnlVcGxvYWRGb3JtQ29tcG9uZW50XCIpXG4gICBDYXRlZ29yeVVwbG9hZEZvcm1Db21wb25lbnQ6IENhdGVnb3J5VXBsb2FkRm9ybUNvbXBvbmVudDtcblxuICAgQFZpZXdDaGlsZChcImNhdGVnb3J5R3JpZFwiKSBncmlkOiBHcmlkT3B0aW9ucztcbiAgIEBWaWV3Q2hpbGQoXCJhbGVydFwiKSBhbGVydDogQWxlcnRXaWRnZXQ7XG5cbiAgIGNvbnN0cnVjdG9yKHByaXZhdGUgaTE4bjogVHJhbnNsYXRlU2VydmljZSwgcHJpdmF0ZSBmaWxlU2VydmljZTogRmlsZVNlcnZpY2UsXG4gICAgICAgICAgICAgICBwcml2YXRlIG5vdGlmeTogTm90aWZpY2F0aW9uc1NlcnZpY2UsIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlLHByaXZhdGUgaHR0cDogSHR0cCkge1xuXG4gICAgICB0aGlzLmdyaWRPcHRpb25zID0gVXRpbC5nZXRMYXp5TG9hZGluZ0dyaWRPcHRpb25zKFxuICAgICAgICAgdGhpcy5pMThuLmluc3RhbnQoXCJsb2FkaW5nXCIpLFxuICAgICAgICAgdGhpcy5pMThuLmluc3RhbnQoXCJub0RhdGFcIilcbiAgICAgICk7XG4gICAgICB0aGlzLmdyaWRPcHRpb25zLmdldFJvd05vZGVJZCA9IChkYXRhOiBUZW1wbGF0ZSkgPT4gZGF0YS5pZC50b1N0cmluZygpO1xuXG4gICAgICB0aGlzLmdyaWRPcHRpb25zLm9uU2VsZWN0aW9uQ2hhbmdlZCA9ICgpID0+IHt0aGlzLm9uU2VsZWN0aW9uQ2hhbmdlZCgpfVxuICAgICAgdGhpcy5ncmlkT3B0aW9ucy5lbmFibGVTZXJ2ZXJTaWRlU29ydGluZyA9IHRydWU7XG4gICAgICB0aGlzLmdyaWRPcHRpb25zLnBhZ2luYXRpb25QYWdlU2l6ZTogMTAwO1xuICAgICAgdGhpcy5ncmlkT3B0aW9ucy5jYWNoZU92ZXJmbG93U2l6ZTogMjtcbiAgICAgIHRoaXMuZ3JpZE9wdGlvbnMubWF4Q29uY3VycmVudERhdGFzb3VyY2VSZXF1ZXN0czogMjtcbiAgICAgIHRoaXMuZ3JpZE9wdGlvbnMuaW5maW5pdGVJbml0aWFsUm93Q291bnQ6IDE7XG4gICAgICB0aGlzLmdyaWRPcHRpb25zLm1heEJsb2Nrc0luQ2FjaGU6IDI7XG5cbiAgICAgIHRoaXMuZ3JpZENvbHVtbnMgPSBbe1xuICAgICAgICAgaGVhZGVyTmFtZTogdGhpcy5pMThuLmluc3RhbnQoXCJhZG1pbi5jYXRlZ29yeS5saXN0LmNvbHVtbnMubmFtZVwiKSxcbiAgICAgICAgIGZpZWxkOiBcInRlbXBsYXRlbmFtZVwiLFxuICAgICAgICAgLy9jZWxsUmVuZGVyZXI6IHBhcmFtID0+IHBhcmFtICYmIHBhcmFtLnZhbHVlID8gcGFyYW0udmFsdWUgOiBVdGlsLkxPQURJTkdfQ0VMTF9URU1QTEFURVxuXG4gICAgICB9LCB7XG4gICAgICAgICBoZWFkZXJOYW1lOiB0aGlzLmkxOG4uaW5zdGFudChcImFkbWluLmNhdGVnb3J5Lmxpc3QuY29sdW1ucy5pZFwiKSxcbiAgICAgICAgIGZpZWxkOiBcImNhdGVnb3J5XCJcblxuICAgICAgfSx7XG4gICAgICAgICBoZWFkZXJOYW1lOiAn5YiG57G7JyxcbiAgICAgICAgIGZpZWxkOiBcInRlbXBsYXRlQ2xhc3NcIlxuXG4gICAgICB9LHtcbiAgICAgICAgIGhlYWRlck5hbWU6ICflrZDmqKHmnb/lkI3np7AnLFxuICAgICAgICAgZmllbGQ6IFwic3ViVGVtcGxhdGVzXCJcblxuICAgICAgfSx7XG4gICAgICAgIGhlYWRlck5hbWU6ICfnsbvlnosnLFxuICAgICAgICAgZmllbGQ6IFwic3R5bGVcIlxuICAgICAgfSx7XG4gICAgICAgICBoZWFkZXJOYW1lOiB0aGlzLmkxOG4uaW5zdGFudChcImFkbWluLmNhdGVnb3J5Lmxpc3QuY29sdW1ucy5zdGF0dXNcIiksXG4gICAgICAgICBmaWVsZDogXCJzdGF0dXNcIixcbiAgICAgICAgIGNlbGxGb3JtYXR0ZXI6IHBhcmFtID0+IHtcbiAgICAgICAgICAgIHJldHVybiBwYXJhbSAmJiBwYXJhbS52YWx1ZSA/IChwYXJhbS52YWx1ZSA9PT0gXCIxXCIgP1xuICAgICAgICAgICAgICAgdGhpcy5pMThuLmluc3RhbnQoXCJhZG1pbi5jYXRlZ29yeS5saXN0LnN0YXR1cy52YWxpZFwiKSA6XG4gICAgICAgICAgICAgICB0aGlzLmkxOG4uaW5zdGFudChcImFkbWluLmNhdGVnb3J5Lmxpc3Quc3RhdHVzLmludmFsaWRcIilcbiAgICAgICAgICAgICkgOiBcIlwiO1xuICAgICAgICAgfVxuICAgICAgfSwge1xuICAgICAgICAgaGVhZGVyTmFtZTogdGhpcy5pMThuLmluc3RhbnQoXCJhZG1pbi5jYXRlZ29yeS5saXN0LmNvbHVtbnMuY3J0aW1lXCIpLFxuICAgICAgICAgZmllbGQ6IFwiY3J0aW1lXCIsXG4gICAgICAgICBjZWxsRm9ybWF0dGVyOiBwYXJhbSA9PiBwYXJhbS52YWx1ZSA/IHRoaXMuZGF0ZVBpcGUudHJhbnNmb3JtKHBhcmFtLnZhbHVlLCBVdGlsLkxPTkdfVElNRV9TVFJJTkcpIDogXCJcIlxuICAgICAgfSx7XG4gICAgICAgICBoZWFkZXJOYW1lOiB0aGlzLmkxOG4uaW5zdGFudChcImFuYWx5emVyLmZpbGVMaXN0LmNvbHVtbnMuZG93bmxvYWRcIiksXG4gICAgICAgICBmaWVsZDogXCJpZFwiLFxuICAgICAgICAgY2VsbFJlbmRlcmVyOiAocGFyYW06IGFueSk6IHN0cmluZyA9PiBcbiAgICAgICAgIHBhcmFtLnZhbHVlID9cbiAgICAgICAgICAgIGA8YSBjbGFzcz1cImJ0biBidG4tbGluayBidG4tb3V0bGluZS1pbmZvXCIgaHJlZj1cIi9pRGF0YS9hcGkvdGVtcGxhdGUvZG93bmxvYWQ/aWQ9JHtwYXJhbS52YWx1ZX0mdHlwZT0ke3BhcmFtLmRhdGEudHlwZX1cIiB0YXJnZXQ9XCJfYmxhbmtcIj5cbiAgICAgICAgICAgICAgIDxoNj48aSBjbGFzcz1cImljb24tY2xvdWQtZG93bmxvYWQgaWNvbnNcIj48L2k+PC9oNj5cbiAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgPGEgY2xhc3M9XCJidG4gYnRuLWxpbmsgYnRuLW91dGxpbmUtaW5mb1wiIGhyZWY9XCIvaURhdGEvYXBpL2ZpbGUvZG93bmxvYWQvJHtwYXJhbS5kYXRhLmNhdGVnb3J5fVwiIHRhcmdldD1cIl9ibGFua1wiPlxuICAgICAgICAgICAgICAgPGg2PuS4i+i9vWV4Y2Vs5qih5p2/PC9oNj5cbiAgICAgICAgICAgICA8L2E+YCA6IFwiXCJcbiAgICAgIH1dO1xuICAgfVxuXG4gICBjcmVhdGVPYnMoaWQpe1xuICAgICAgdGhpcy5yb3dEYXRhID0gW107XG4gICAgICB0aGlzLmh0dHAuZ2V0KCcvaURhdGEvYXBpL3RlbXBsYXRlLycraWQpLm1hcChcbiAgICAgICAgIHJlcyA9PiByZXMuanNvbigpXG4gICAgICApLnN1YnNjcmliZShyZXMgPT4ge1xuICAgICAgICAgdGhpcy5yb3dEYXRhLnB1c2gocmVzKTtcbiAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMucm93RGF0YSlcbiAgICAgIH0pXG5cbiAgIH1cblxuICAgb25TZWxlY3Rpb25DaGFuZ2VkKCl7XG4gICAgICB2YXIgc2VsZWN0ZWRSb3dzID0gdGhpcy5ncmlkT3B0aW9ucy5hcGkuZ2V0U2VsZWN0ZWRSb3dzKCk7XG4gICAgICBsZXQgaWQgPSBzZWxlY3RlZFJvd3NbMF0uaWRcbiAgICAgIHRoaXMuY3JlYXRlT2JzKGlkKVxuICAgfVxuXG4gICBnZXQgc2VsZWN0ZWRDYXRlZ29yeSgpOiBUZW1wbGF0ZSB7XG4gICAgICBpZiAoIXRoaXMuZ3JpZCB8fCAhdGhpcy5ncmlkLmFwaSkge1xuICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG5cbiAgICAgIGxldCByb3dzID0gdGhpcy5ncmlkLmFwaS5nZXRTZWxlY3RlZFJvd3MoKTtcbiAgICAgIHJldHVybiByb3dzLmxlbmd0aCA+IDAgPyByb3dzWzBdIDogbnVsbDtcbiAgIH1cblxuICAgb25HcmlkUmVhZHkoZ3JpZDogR3JpZE9wdGlvbnMpOiB2b2lkIHtcbiAgICAgIGdyaWQuYXBpLnNpemVDb2x1bW5zVG9GaXQoKTtcbiAgICAgIHRoaXMucmVmcmVzaChncmlkKTtcbiAgIH1cblxuICAgb25Sb3dTZWxlY3RlZCgpOiB2b2lkIHtcbiAgICAgIGNvbnNvbGUubG9nKCdzZWwnKVxuICAgICAgbGV0IHRlbXBsYXRlOiBUZW1wbGF0ZSA9IHRoaXMuc2VsZWN0ZWRDYXRlZ29yeTtcblxuICAgICAgaWYgKHRlbXBsYXRlKSB7XG4gICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbe2NhdGVnb3J5OiB0ZW1wbGF0ZS5pZH1dLCB7cmVsYXRpdmVUbzogdGhpcy5yb3V0ZX0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFt7fV0sIHtyZWxhdGl2ZVRvOiB0aGlzLnJvdXRlfSk7XG4gICAgICB9XG4gICB9XG5cbiAgIHJlZnJlc2goZ3JpZDogR3JpZE9wdGlvbnMpOiB2b2lkIHtcbiAgICAgIHRoaXMuaXNMb2FkaW5nID0gdHJ1ZTtcblxuICAgICAgLy8gbGV0IGRzID0gVGVtcGxhdGVEYXRhU291cmNlLmNyZWF0ZSh0aGlzLmZpbGVTZXJ2aWNlLCB0aGlzLm5vdGlmeSk7XG5cbiAgICAgIC8vIGRzLm9uQ29tcGxldGUuc3Vic2NyaWJlKGxpc3QgPT4ge1xuICAgICAgLy8gICAgdGhpcy5pc0xvYWRpbmcgPSBmYWxzZTtcblxuICAgICAgLy8gICAgaWYgKGxpc3QubGVuZ3RoID4gMCkge1xuICAgICAgLy8gICAgICAgZ3JpZC5hcGkuaGlkZU92ZXJsYXkoKTtcbiAgICAgIC8vICAgIH0gZWxzZSB7XG4gICAgICAvLyAgICAgICBncmlkLmFwaS5zaG93Tm9Sb3dzT3ZlcmxheSgpO1xuICAgICAgLy8gICAgfVxuXG4gICAgICAvLyAgICBsZXQgdGVtcGxhdGVJZDogbnVtYmVyID0gdGhpcy5yb3V0ZS5zbmFwc2hvdC5wYXJhbXNbXCJjYXRlZ29yeVwiXTtcblxuICAgICAgLy8gICAgaWYgKHRlbXBsYXRlSWQpIHtcbiAgICAgIC8vICAgICAgIGdyaWQuYXBpLmZvckVhY2hOb2RlKG5vZGUgPT4ge1xuICAgICAgLy8gICAgICAgICAgbm9kZS5zZXRTZWxlY3RlZChub2RlLmlkID09PSB0ZW1wbGF0ZUlkLnRvU3RyaW5nKCkpO1xuICAgICAgLy8gICAgICAgfSk7XG4gICAgICAvLyAgICB9IGVsc2Uge1xuICAgICAgLy8gICAgICAgZ3JpZC5hcGkuZGVzZWxlY3RBbGwoKTtcbiAgICAgIC8vICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFt7fV0sIHtyZWxhdGl2ZVRvOiB0aGlzLnJvdXRlfSk7XG4gICAgICAvLyAgICB9XG4gICAgICAvLyB9KTtcblxuICAgICAgdGhpcy5maWxlU2VydmljZS5nZXRUZW1wbGF0ZXNDYXQoe1xuICAgICAgICAgZnJvbTogMCxcbiAgICAgICAgIHNpemU6IDUwMDAwXG4gICAgICB9KS5zdWJzY3JpYmUodGVtcGxhdGVTZXQgPT4ge1xuXG4gICAgICAgICBjb25zb2xlLmxvZyh0ZW1wbGF0ZVNldClcblxuICAgICAgICAgIGxldCB7YWxsVGVtcGxhdGVDbGFzcywgZ3JvdXBUZW1wbGF0ZXMsIHN1YlRlbXBsYXRlc30gPSB0ZW1wbGF0ZVNldDtcbiAgICAgICAgICBsZXQgc3RvcmVBcnIgPSBbXTtcblxuICAgICAgICAgIF8ubWFwKGFsbFRlbXBsYXRlQ2xhc3MsICh0ZW1wKSA9PiB7XG4gICAgICAgICAgICAgdGVtcC5zdWJUZW1wbGF0ZXMgPSBzdWJUZW1wbGF0ZXNbdGVtcFsnZG9tYWludmFsdWVjb2RlJ11dO1xuICAgICAgICAgICAgIF8ubWFwKHRlbXAuc3ViVGVtcGxhdGVzLCAoc3ViKT0+e1xuICAgICAgICAgICAgICAgc3ViLnN0eWxlID0gJ+aZrumAmuaooeadvyc7XG4gICAgICAgICAgICAgICBzdWIudHlwZSA9IDA7XG4gICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICB0ZW1wLmdyb3VwVGVtcGxhdGVzID0gZ3JvdXBUZW1wbGF0ZXNbdGVtcFsnZG9tYWludmFsdWVjb2RlJ11dO1xuICAgICAgICAgICAgIF8ubWFwKHRlbXAuZ3JvdXBUZW1wbGF0ZXMsIChncm91cCk9PntcbiAgICAgICAgICAgICAgIGdyb3VwLnN0eWxlID0gJ+Wkp+aooeadvyc7XG4gICAgICAgICAgICAgICBncm91cC50eXBlID0gMTtcbiAgICAgICAgICAgICAgIGdyb3VwLnRlbXBsYXRlbmFtZSA9IGdyb3VwLmdyb3VwTmFtZTtcbiAgICAgICAgICAgICAgIGdyb3VwLmNhdGVnb3J5ID0gZ3JvdXAuZ3JvdXBDYXRlZ29yeTtcbiAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgIHRlbXAubWVyZ2UgPSB0ZW1wLnN1YlRlbXBsYXRlcy5jb25jYXQodGVtcC5ncm91cFRlbXBsYXRlcyk7XG4gICAgICAgICAgICAgXy5tYXAodGVtcC5tZXJnZSwgKG1lKT0+e1xuICAgICAgICAgICAgICAgbWUudGVtcGxhdGVDbGFzcyA9IHRlbXAuZG9tYWludmFsdWVjbjtcblxuICAgICAgICAgICAgIH0pXG4gICAgICAgICAgfSlcblxuICAgICAgICAgIF8ubWFwKGFsbFRlbXBsYXRlQ2xhc3MsICh0ZW1wKT0+e1xuICAgICAgICAgICAgc3RvcmVBcnIgPSBzdG9yZUFyci5jb25jYXQodGVtcC5tZXJnZSk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBjb25zb2xlLmxvZyhzdG9yZUFycilcblxuXG4gICAgICAgICBsZXQgZGF0YVNvdXJjZSA9IHtcbiAgICAgICAgICAgcm93Q291bnQ6IG51bGwsIC8vIGJlaGF2ZSBhcyBpbmZpbml0ZSBzY3JvbGxcbiAgICAgICAgICAgZ2V0Um93czogKHBhcmFtcykgPT4ge1xuICAgICAgICAgICAgIGNvbnNvbGUubG9nKDExMTExMTExMSlcbiAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHBhcmFtcylcbiAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdhc2tpbmcgZm9yICcgKyBwYXJhbXMuc3RhcnRSb3cgKyAnIHRvICcgKyBwYXJhbXMuZW5kUm93KTtcbiAgICAgICAgICAgICAgIGlmKEpTT04uc3RyaW5naWZ5KHRlbXBsYXRlU2V0LnJlc3VsdCkgPT0gJ3t9Jyl7XG4gICAgICAgICAgICAgICAgICBncmlkLmFwaS5zaG93Tm9Sb3dzT3ZlcmxheSgpO1xuICAgICAgICAgICAgICAgICAgbGV0IGRhdGFBZnRlclNvcnRpbmdBbmRGaWx0ZXJpbmcgPSBbXTtcbiAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgIGdyaWQuYXBpLmhpZGVPdmVybGF5KCk7XG4gICAgICAgICAgICAgICAgIGxldCBkYXRhQWZ0ZXJTb3J0aW5nQW5kRmlsdGVyaW5nID0gdGhpcy5zb3J0QW5kRmlsdGVyKHN0b3JlQXJyLCBwYXJhbXMuc29ydE1vZGVsKTtcbiAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgIGxldCByb3dzVGhpc1BhZ2UgPSBkYXRhQWZ0ZXJTb3J0aW5nQW5kRmlsdGVyaW5nLnNsaWNlKHBhcmFtcy5zdGFydFJvdywgcGFyYW1zLmVuZFJvdyk7XG5cbiAgICAgICAgICAgICAgIGxldCBsYXN0Um93ID0gLTE7XG4gICAgICAgICAgICAgICBpZiAoZGF0YUFmdGVyU29ydGluZ0FuZEZpbHRlcmluZy5sZW5ndGggPD0gcGFyYW1zLmVuZFJvdykge1xuICAgICAgICAgICAgICAgICAgbGFzdFJvdyA9IGRhdGFBZnRlclNvcnRpbmdBbmRGaWx0ZXJpbmcubGVuZ3RoO1xuICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgcGFyYW1zLnN1Y2Nlc3NDYWxsYmFjayhyb3dzVGhpc1BhZ2UsIGxhc3RSb3cpO1xuICAgICAgICAgICAgICAgdGhpcy5pc0xvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgfVxuICAgICAgICAgfTtcbiAgICAgICAgIGdyaWQuYXBpLnNldERhdGFzb3VyY2UoZGF0YVNvdXJjZSk7XG4gICAgICB9LCBlcnJvciA9PiB7XG4gICAgICAgICB0aGlzLm5vdGlmeS5hbGVydChlcnJvci5leGNlcHRpb25OYW1lLCBlcnJvci5kZXNjcmlwdGlvbik7XG4gICAgICAgICBwYXJhbXMuZmFpbENhbGxiYWNrKCk7XG4gICAgICB9KTtcbiAgIH1cblxuICAgc29ydEFuZEZpbHRlcihhbGxPZlRoZURhdGEsIHNvcnRNb2RlbCkge1xuICAgICAgcmV0dXJuIHRoaXMuc29ydERhdGEoc29ydE1vZGVsLCBhbGxPZlRoZURhdGEpXG4gICB9XG5cbiAgIHNvcnREYXRhKHNvcnRNb2RlbCwgZGF0YSkge1xuICAgICAgIHZhciBzb3J0UHJlc2VudCA9IHNvcnRNb2RlbCAmJiBzb3J0TW9kZWwubGVuZ3RoID4gMDtcbiAgICAgICBpZiAoIXNvcnRQcmVzZW50KSB7XG4gICAgICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgIH1cbiAgICAgICAvLyBkbyBhbiBpbiBtZW1vcnkgc29ydCBvZiB0aGUgZGF0YSwgYWNyb3NzIGFsbCB0aGUgZmllbGRzXG4gICAgICAgdmFyIHJlc3VsdE9mU29ydCA9IGRhdGEuc2xpY2UoKTtcbiAgICAgICByZXN1bHRPZlNvcnQuc29ydChmdW5jdGlvbihhLGIpIHtcbiAgICAgICAgICAgZm9yICh2YXIgayA9IDA7IGs8c29ydE1vZGVsLmxlbmd0aDsgaysrKSB7XG4gICAgICAgICAgICAgICB2YXIgc29ydENvbE1vZGVsID0gc29ydE1vZGVsW2tdO1xuICAgICAgICAgICAgICAgdmFyIHZhbHVlQSA9IGFbc29ydENvbE1vZGVsLmNvbElkXTtcbiAgICAgICAgICAgICAgIHZhciB2YWx1ZUIgPSBiW3NvcnRDb2xNb2RlbC5jb2xJZF07XG4gICAgICAgICAgICAgICAvLyB0aGlzIGZpbHRlciBkaWRuJ3QgZmluZCBhIGRpZmZlcmVuY2UsIG1vdmUgb250byB0aGUgbmV4dCBvbmVcbiAgICAgICAgICAgICAgIGlmICh2YWx1ZUE9PXZhbHVlQikge1xuICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgdmFyIHNvcnREaXJlY3Rpb24gPSBzb3J0Q29sTW9kZWwuc29ydCA9PT0gJ2FzYycgPyAxIDogLTE7XG4gICAgICAgICAgICAgICBpZiAodmFsdWVBID4gdmFsdWVCKSB7XG4gICAgICAgICAgICAgICAgICAgcmV0dXJuIHNvcnREaXJlY3Rpb247XG4gICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgIHJldHVybiBzb3J0RGlyZWN0aW9uICogLTE7XG4gICAgICAgICAgICAgICB9XG4gICAgICAgICAgIH1cbiAgICAgICAgICAgLy8gbm8gZmlsdGVycyBmb3VuZCBhIGRpZmZlcmVuY2VcbiAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgfSk7XG4gICAgICAgcmV0dXJuIHJlc3VsdE9mU29ydDtcbiAgIH1cblxuICAgb25CdG5OZXdDbGlja2VkKCkge1xuICAgICAgdGhpcy5DYXRlZ29yeVVwbG9hZEZvcm1Db21wb25lbnQucG9wdXAoKTtcbiAgIH1cblxuICAgb25CdG5SZW1vdmVDbGlja2VkKCk6IHZvaWQge1xuICAgICAgbGV0IHRlbXBsYXRlID0gdGhpcy5zZWxlY3RlZENhdGVnb3J5O1xuXG4gICAgICB0aGlzLmFsZXJ0LnNob3coKS5zdWJzY3JpYmUocmVzdWx0ID0+IHtcbiAgICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgIHRoaXMuZmlsZVNlcnZpY2UucmVtb3ZlVGVtcGxhdGUodGVtcGxhdGUuaWQpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAgICB0aGlzLnJlZnJlc2godGhpcy5ncmlkKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgfVxuICAgICAgfSk7XG4gICB9XG5cbiAgIG9uQ29tbWl0KGhhbmRsZXI6IE9ic2VydmVyPGJvb2xlYW4+KTogdm9pZCB7XG4gICAgICB0aGlzLmZvcm0uc3VibWl0KCkuc3Vic2NyaWJlKHJlc3VsdCA9PiB7XG4gICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICBPYnNlcnZhYmxlLm9mKHJlc3VsdCkuc3Vic2NyaWJlKGhhbmRsZXIpO1xuICAgICAgICAgICAgdGhpcy5yZWZyZXNoKHRoaXMuZ3JpZCk7XG4gICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgT2JzZXJ2YWJsZS50aHJvdyhbXSkuc3Vic2NyaWJlKGhhbmRsZXIpO1xuICAgICAgICAgfVxuICAgICAgfSwgZXJyb3JzID0+IE9ic2VydmFibGUudGhyb3coZXJyb3JzKS5zdWJzY3JpYmUoaGFuZGxlcikpO1xuICAgfVxufSJdfQ==
