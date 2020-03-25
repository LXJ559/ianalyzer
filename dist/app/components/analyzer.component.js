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
 * Created by zhongping.lu on 9/18/2016.
 */
var core_1 = require("@angular/core");
var upload_dialog_component_1 = require("./upload.dialog.component");
var common_1 = require("@angular/common");
var ng2_translate_1 = require("ng2-translate/ng2-translate");
var general_util_1 = require("../utils/general.util");
var file_model_1 = require("../models/file.model");
var file_service_1 = require("../services/file.service");
var components_1 = require("angular2-notifications/components");
var preview_component_1 = require("./preview.component");
var api_util_1 = require("../utils/api.util");
var auth_service_1 = require("../services/auth.service");
var router_1 = require("@angular/router");
var http_1 = require("@angular/http");
var _ = require("lodash");
var AnalyzerComponent = (function () {
    function AnalyzerComponent(auth, i18n, fileService, notificationService, route, notify, router, http) {
        var _this = this;
        this.auth = auth;
        this.i18n = i18n;
        this.fileService = fileService;
        this.notificationService = notificationService;
        this.route = route;
        this.notify = notify;
        this.router = router;
        this.http = http;
        this.fileGridColumns = [];
        this.versionGridColumns = [];
        this.versionGridRowData = [];
        this.isBtnUploadEnabled = false;
        this.isLoading = false;
        this.fileStatus = {};
        this.categories = {};
        this.categoriesSearch = [];
        this.searchLevel = {};
        this.levelOne = [];
        this.levelTwo = [];
        this.levelOneValue = '';
        this.levelTwoValue = '';
        this.datePipe = new common_1.DatePipe(this.i18n.currentLang);
        this.upperCasePipe = new common_1.UpperCasePipe();
        // For example initialize to specific date (09.10.2018 - 19.10.2018). It is also possible
        // to set initial date range value using the selDateRange attribute.
        this.model = {};
        var status = route.snapshot.data["fileStatus"];
        status.forEach(function (describer) {
            _this.fileStatus[describer.status] = describer;
        });
        /**
         * 增加分类搜索
         */
        var user = this.auth.getToken().user;
        this.http.get('/iData/api/template/user?userId=' + user.id).subscribe(function (res) {
            var levelSubArr = [], levelGpArr = [];
            var cat = res.json();
            _this.searchLevel = res.json();
            console.log(_this.searchLevel);
            _this.levelOne = _.keys(cat);
            console.log(_this.levelOne, '.......');
        }, function (errResp) {
            _this.notify.error('服务器错误', '服务器错误');
        });
        this.fileService.getCateofUpload(user.id).subscribe(function (res) {
            // if (user.type !== UserType.Admin) {
            //    let visibleCategory: string[] = user.category.split(",");
            //    this.categories = list.filter(category => {
            //       return visibleCategory.indexOf(category.value) > -1;
            //    });
            // } else {
            //    this.categories = list;
            // }
            // this.categories = list;
            var groupTemplates = res.groupTemplates, subTemplates = res.subTemplates;
            _.map(groupTemplates, function (group) {
                group.isGroupCategory = true;
                group.category = group.groupCategory;
                group.templatename = group.groupName;
                delete group.groupCategory;
                delete group.groupname;
            });
            _.map(subTemplates, function (sub) {
                sub.isGroupCategory = false;
            });
            _this.categoriesSearch = groupTemplates.concat(subTemplates);
            console.log(_this.categoriesSearch);
        }, function () { }, function () { });
    }
    AnalyzerComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.fileGridColumns = [{
                headerName: 'FID',
                field: "id"
            }, {
                headerName: this.i18n.instant("analyzer.fileList.columns.name"),
                field: "attachname",
                cellRenderer: function (param) { return param.value ?
                    param.value : general_util_1.Util.LOADING_CELL_TEMPLATE; }
            }, {
                headerName: this.i18n.instant("analyzer.fileList.columns.extension"),
                field: "suffix",
                cellRenderer: function (param) { return param.value ?
                    "<i class=\"fa fa-file-excel-o\"></i> " + _this.upperCasePipe.transform(param.value) : ""; }
            }, {
                headerName: this.i18n.instant("analyzer.fileList.columns.size"),
                field: "size",
                cellFormatter: function (param) { return param.value ? general_util_1.Util.formatStorageSize(param.value) : ""; }
            }, {
                headerName: this.i18n.instant("analyzer.fileList.columns.version"),
                field: "version"
            }, {
                headerName: this.i18n.instant("analyzer.fileList.columns.status"),
                field: "status",
                cellFormatter: function (param) {
                    if (param.value == 3) {
                        return '模板匹配错误';
                    }
                    else if (param.value == 4) {
                        return '主数据校验失败';
                    }
                    else if (param.value == 2) {
                        return '正确';
                    }
                    else if (param.value == 0) {
                        return '待验证';
                    }
                    else if (param.value == 1) {
                        return '验证中';
                    }
                    else if (param.value == 5) {
                        return '字段格式错误';
                    }
                    // return param.value !== undefined ? this.fileStatus[param.value].description : "";
                }
            }, {
                headerName: this.i18n.instant("analyzer.fileList.columns.category"),
                field: "categoryDisplay",
                cellFormatter: function (param) { return param.value ? _this.categories[param.value] : ""; }
            }, {
                headerName: this.i18n.instant("analyzer.fileList.columns.crtime"),
                field: "crtime",
                cellFormatter: function (param) { return param.value ?
                    _this.datePipe.transform(param.value, general_util_1.Util.LONG_TIME_STRING) : ""; }
            }, {
                headerName: this.i18n.instant("analyzer.fileList.columns.download"),
                field: "attachpath",
                cellRenderer: function (param) { return param.value ?
                    "<a class=\"btn btn-link btn-outline-info\" href=\"" + api_util_1.APIs.getDownloadUri(param.value) + "\" target=\"_blank\">\n               <h6><i class=\"icon-cloud-download icons\"></i></h6>\n             </a>" : ""; }
            }];
        this.versionGridColumns = [{
                headerName: 'FID',
                field: "id"
            }, {
                headerName: this.i18n.instant("analyzer.detail.columns.version"),
                field: "version",
                cellRenderer: function (param) { return param.value ?
                    param.value : general_util_1.Util.LOADING_CELL_TEMPLATE; }
            }, {
                headerName: this.i18n.instant("analyzer.detail.columns.size"),
                field: "size",
                cellFormatter: function (param) {
                    return param.value ? general_util_1.Util.formatStorageSize(param.value) : "";
                }
            }, {
                headerName: this.i18n.instant("analyzer.detail.columns.author"),
                field: "cractor"
            }, {
                headerName: this.i18n.instant("analyzer.detail.columns.crtime"),
                field: "crtime",
                cellFormatter: function (param) {
                    return param.value ? _this.datePipe.transform(param.value, general_util_1.Util.LONG_TIME_STRING) : "";
                }
            }, {
                headerName: this.i18n.instant("analyzer.detail.columns.download"),
                field: "attachpath",
                cellRenderer: function (param) { return param.value ?
                    "<a class=\"btn btn-link btn-outline-info\" href=\"" + api_util_1.APIs.getDownloadUri(param.value) + "\" target=\"_blank\">\n               <h6><i class=\"icon-cloud-download icons\"></i></h6>\n             </a>" : ""; }
            }];
        this.detailTitle = this.i18n.instant("analyzer.detail.titleNoSelection");
        this.gridOptions = general_util_1.Util.getLazyLoadingGridOptions(this.i18n.instant("loading"), this.i18n.instant("noData"));
        this.gridOptions.getRowNodeId = function (data) { return data.id.toString(); };
        //this.gridOptions.enableServerSideSorting = true;
        this.gridOptions.paginationPageSize = 100;
        this.gridOptions.cacheOverflowSize = 2;
        this.gridOptions.maxConcurrentDatasourceRequests = 2;
        this.gridOptions.infiniteInitialRowCount = 1;
        this.gridOptions.maxBlocksInCache = 2;
    };
    AnalyzerComponent.prototype.leveloneChange = function (value) {
        var _this = this;
        setTimeout(function () {
            console.log(_this.searchLevel[_this.levelOneValue]);
            var finalLevelTwo = [];
            var levelTwo = _this.searchLevel[_this.levelOneValue];
            console.log(levelTwo.groupTemplates, levelTwo.subTemplates);
            levelTwo.groupTemplates ? '' : levelTwo.groupTemplates = { list: [] };
            levelTwo.subTemplates ? '' : levelTwo.subTemplates = { list: [] };
            var leveloneList = levelTwo.groupTemplates.list;
            var leveltwoList = levelTwo.subTemplates.list;
            var levelTwoArr = leveloneList.concat(leveltwoList);
            _.map(levelTwoArr, function (list) {
                var obj = {};
                obj.levelTwoCn = list.groupName || list.templatename;
                obj.levelTwoEn = list.groupCategory || list.category;
                finalLevelTwo.push(obj);
            });
            _this.levelTwo = finalLevelTwo;
            _this.levelTwoValue = _this.levelTwo[0].levelTwoEn;
            console.log(_this.levelTwo);
        }, 200);
    };
    AnalyzerComponent.prototype.getSelectedRow = function () {
        var rows = this.fileGrid && this.fileGrid.api ?
            this.fileGrid.api.getSelectedRows() : null;
        if (rows && rows.length > 0) {
            return rows[rows.length - 1];
        }
        return null;
    };
    AnalyzerComponent.prototype.refresh = function (grid) {
        var _this = this;
        console.log(grid, 'run-refresh');
        this.isLoading = true;
        var allOfTheData, dataSource;
        // TODO open
        this.isLoading = true;
        var catgory = this.levelTwoValue || 'all';
        console.log(this.model);
        if (JSON.stringify(this.model) == '{}' || this.model == null) {
            var startTime = 'all';
            var endTime = 'all';
        }
        else {
            var timeModel = this.model;
            console.log(timeModel);
            var startTime = timeModel.beginDate.year + '-' + timeModel.beginDate.month + '-' + timeModel.beginDate.day;
            var endTime = timeModel.endDate.year + '-' + timeModel.endDate.month + '-' + timeModel.endDate.day;
        }
        console.log(startTime, endTime);
        console.log(catgory, this.model, '---------');
        var ds = file_model_1.FileDataSource.create(this.fileService, this.notificationService, this.auth.getToken().user.id, catgory, startTime, endTime);
        this.fileService.getCategories().subscribe(function (list) {
            list.forEach(function (category) {
                _this.categories[category.value] = category.label;
            });
        });
        ds.onComplete.subscribe(function () {
            _this.isLoading = false;
            var fileId = _this.route.snapshot.params["file"];
            if (fileId) {
                grid.api.forEachNode(function (node) {
                    node.setSelected(node.id === fileId.toString());
                });
            }
            else {
                grid.api.deselectAll();
            }
        });
        grid.api.setDatasource(ds);
        // this.fileService.getFiles({
        //   from: 0,
        //   size: 50000
        // },this.auth.getToken().user.id).finally(() => {
        //    //this.onComplete.emit();
        // }).subscribe(fileSet => {
        //   allOfTheData = fileSet.result;
        //   console.log(allOfTheData)
        //   dataSource = {
        //      rowCount: null, // behave as infinite scroll
        //      getRows: (params) => {
        //          console.log(params)
        //          console.log('asking for ' + params.startRow + ' to ' + params.endRow);
        //          let dataAfterSortingAndFiltering = this.sortAndFilter(allOfTheData, params.sortModel);
        //          let rowsThisPage = dataAfterSortingAndFiltering.slice(params.startRow, params.endRow);
        //          let lastRow = -1;
        //          if (dataAfterSortingAndFiltering.length <= params.endRow) {
        //             lastRow = dataAfterSortingAndFiltering.length;
        //          }
        //          params.successCallback(rowsThisPage, lastRow);
        //      }
        //    };
        //    grid.api.setDatasource(dataSource);
        //   this.isLoading = false;
        // }, error => {
        //   this.notify.alert(error.exceptionName, error.description);
        // });
    };
    AnalyzerComponent.prototype.sortAndFilter = function (allOfTheData, sortModel) {
        return this.sortData(sortModel, allOfTheData);
    };
    AnalyzerComponent.prototype.sortData = function (sortModel, data) {
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
    AnalyzerComponent.prototype.togglePreview = function () {
        this.preview.fileData = this.fileGrid.api.getSelectedRows()[0];
    };
    AnalyzerComponent.prototype.onFileGridReady = function (grid) {
        grid.api.sizeColumnsToFit();
        grid.api.getRowNodeId = function (item) { return item.attachGroup; };
        this.refresh(grid);
    };
    AnalyzerComponent.prototype.onBtnNewClicked = function () {
        this.uploadDialog.popup();
    };
    AnalyzerComponent.prototype.onBtnUpdateClicked = function (file) {
        this.uploadDialog.popup(file);
    };
    AnalyzerComponent.prototype.onFileGridRowSelected = function () {
        var file = this.getSelectedRow();
        if (file) {
            this.router.navigate([{ file: file.id }], { relativeTo: this.route });
            this.isBtnUploadEnabled = true;
            this.detailTitle = this.i18n.instant("analyzer.detail.title", { name: file.attachname });
            var ds = file_model_1.VersionDataSource.create(this.fileService, this.notificationService, file);
            this.versionGrid.api.setDatasource(ds);
        }
        else {
            this.router.navigate([{}], { relativeTo: this.route });
            this.isBtnUploadEnabled = false;
            this.detailTitle = this.i18n.instant("analyzer.detail.titleNoSelection");
        }
    };
    AnalyzerComponent.prototype.onBtnDownloadClicked = function (file) {
        this.fileService.downloadFile(file.attachpath);
    };
    return AnalyzerComponent;
}());
__decorate([
    core_1.ViewChild("uploadDialog"),
    __metadata("design:type", upload_dialog_component_1.UploadDialogComponent)
], AnalyzerComponent.prototype, "uploadDialog", void 0);
__decorate([
    core_1.ViewChild("fileGrid"),
    __metadata("design:type", Object)
], AnalyzerComponent.prototype, "fileGrid", void 0);
__decorate([
    core_1.ViewChild("versionGrid"),
    __metadata("design:type", Object)
], AnalyzerComponent.prototype, "versionGrid", void 0);
__decorate([
    core_1.ViewChild("preview"),
    __metadata("design:type", preview_component_1.PreviewComponent)
], AnalyzerComponent.prototype, "preview", void 0);
AnalyzerComponent = __decorate([
    core_1.Component({
        selector: "analyzer",
        templateUrl: "views/analyzer/analyzer.main.html"
    }),
    __metadata("design:paramtypes", [auth_service_1.AuthService, ng2_translate_1.TranslateService, file_service_1.FileService,
        components_1.NotificationsService, router_1.ActivatedRoute, components_1.NotificationsService, router_1.Router, http_1.Http])
], AnalyzerComponent);
exports.AnalyzerComponent = AnalyzerComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvYW5hbHl6ZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7R0FFRztBQUNILHNDQUEyRDtBQUUzRCxxRUFBZ0U7QUFDaEUsMENBQXdEO0FBQ3hELDZEQUE2RDtBQUM3RCxzREFBMkM7QUFDM0MsbURBRzhCO0FBQzlCLHlEQUFxRDtBQUNyRCxnRUFBdUU7QUFDdkUseURBQXFEO0FBQ3JELDhDQUF1QztBQUN2Qyx5REFBcUQ7QUFDckQsMENBQXVEO0FBR3ZELHNDQUE0QztBQUM1QywwQkFBNEI7QUFPNUI7SUFxQ0csMkJBQW9CLElBQWlCLEVBQVUsSUFBc0IsRUFBVSxXQUF3QixFQUNuRixtQkFBeUMsRUFBVSxLQUFxQixFQUFRLE1BQTRCLEVBQVUsTUFBYyxFQUFTLElBQVU7UUFEM0ssaUJBMkRDO1FBM0RtQixTQUFJLEdBQUosSUFBSSxDQUFhO1FBQVUsU0FBSSxHQUFKLElBQUksQ0FBa0I7UUFBVSxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUNuRix3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXNCO1FBQVUsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7UUFBUSxXQUFNLEdBQU4sTUFBTSxDQUFzQjtRQUFVLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBUyxTQUFJLEdBQUosSUFBSSxDQUFNO1FBckMzSyxvQkFBZSxHQUFhLEVBQUUsQ0FBQztRQUMvQix1QkFBa0IsR0FBYSxFQUFFLENBQUM7UUFFbEMsdUJBQWtCLEdBQVUsRUFBRSxDQUFDO1FBQy9CLHVCQUFrQixHQUFZLEtBQUssQ0FBQztRQUNwQyxjQUFTLEdBQUcsS0FBSyxDQUFDO1FBRWxCLGVBQVUsR0FBNkMsRUFBRSxDQUFDO1FBQzFELGVBQVUsR0FBOEIsRUFBRSxDQUFDO1FBQzNDLHFCQUFnQixHQUFlLEVBQUUsQ0FBQztRQUNsQyxnQkFBVyxHQUFVLEVBQUUsQ0FBQztRQUN4QixhQUFRLEdBQWMsRUFBRSxDQUFDO1FBQ3pCLGFBQVEsR0FB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LE9BQU8sQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDO1FBQzVFLENBQUM7SUFDSixDQUFDO0lBRUQsZ0RBQW9CLEdBQXBCLFVBQXFCLElBQWM7UUFDaEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFDSix3QkFBQztBQUFELENBcFlBLEFBb1lDLElBQUE7QUFsWEU7SUFEQyxnQkFBUyxDQUFDLGNBQWMsQ0FBQzs4QkFDWiwrQ0FBcUI7dURBQUM7QUFHcEM7SUFEQyxnQkFBUyxDQUFDLFVBQVUsQ0FBQzs7bURBQ1I7QUFHZDtJQURDLGdCQUFTLENBQUMsYUFBYSxDQUFDOztzREFDUjtBQUdqQjtJQURDLGdCQUFTLENBQUMsU0FBUyxDQUFDOzhCQUNaLG9DQUFnQjtrREFBQztBQTNCN0I7SUFKQyxnQkFBUyxDQUFDO1FBQ1IsUUFBUSxFQUFFLFVBQVU7UUFDcEIsV0FBVyxFQUFFLG1DQUFtQztLQUNsRCxDQUFDO3FDQXNDMkIsMEJBQVcsRUFBZ0IsZ0NBQWdCLEVBQXVCLDBCQUFXO1FBQzlELGlDQUFvQixFQUFpQix1QkFBYyxFQUFnQixpQ0FBb0IsRUFBa0IsZUFBTSxFQUFlLFdBQUk7cUJBOFY3SztBQXBZWSw0QkFBQSxpQkFBaUIsQ0FBQSIsImZpbGUiOiJjb21wb25lbnRzL2FuYWx5emVyLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ3JlYXRlZCBieSB6aG9uZ3BpbmcubHUgb24gOS8xOC8yMDE2LlxuICovXG5pbXBvcnQge0NvbXBvbmVudCwgT25Jbml0LCBWaWV3Q2hpbGR9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge0NvbERlZiwgR3JpZE9wdGlvbnN9IGZyb20gXCJhZy1ncmlkXCI7XG5pbXBvcnQge1VwbG9hZERpYWxvZ0NvbXBvbmVudH0gZnJvbSBcIi4vdXBsb2FkLmRpYWxvZy5jb21wb25lbnRcIjtcbmltcG9ydCB7RGF0ZVBpcGUsIFVwcGVyQ2FzZVBpcGV9IGZyb20gXCJAYW5ndWxhci9jb21tb25cIjtcbmltcG9ydCB7VHJhbnNsYXRlU2VydmljZX0gZnJvbSBcIm5nMi10cmFuc2xhdGUvbmcyLXRyYW5zbGF0ZVwiO1xuaW1wb3J0IHtVdGlsfSBmcm9tIFwiLi4vdXRpbHMvZ2VuZXJhbC51dGlsXCI7XG5pbXBvcnQge1xuICAgRmlsZUl0ZW0sIEZpbGVEYXRhU291cmNlLCBWZXJzaW9uRGF0YVNvdXJjZSwgRmlsZVN0YXR1c0Rlc2NyaWJlciwgRmlsZVN0YXR1cyxcbiAgIENhdGVnb3J5XG59IGZyb20gXCIuLi9tb2RlbHMvZmlsZS5tb2RlbFwiO1xuaW1wb3J0IHtGaWxlU2VydmljZX0gZnJvbSBcIi4uL3NlcnZpY2VzL2ZpbGUuc2VydmljZVwiO1xuaW1wb3J0IHtOb3RpZmljYXRpb25zU2VydmljZX0gZnJvbSBcImFuZ3VsYXIyLW5vdGlmaWNhdGlvbnMvY29tcG9uZW50c1wiO1xuaW1wb3J0IHtQcmV2aWV3Q29tcG9uZW50fSBmcm9tIFwiLi9wcmV2aWV3LmNvbXBvbmVudFwiO1xuaW1wb3J0IHtBUElzfSBmcm9tIFwiLi4vdXRpbHMvYXBpLnV0aWxcIjtcbmltcG9ydCB7QXV0aFNlcnZpY2V9IGZyb20gXCIuLi9zZXJ2aWNlcy9hdXRoLnNlcnZpY2VcIjtcbmltcG9ydCB7QWN0aXZhdGVkUm91dGUsIFJvdXRlcn0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHtGaWxlSXRlbSwgQ2F0ZWdvcnksIEZpbGVTdGF0dXN9IGZyb20gXCIuLi9tb2RlbHMvZmlsZS5tb2RlbFwiO1xuaW1wb3J0IHtJTXlEcE9wdGlvbnN9IGZyb20gJ215ZGF0ZXBpY2tlcic7XG5pbXBvcnQge0h0dHAsIEhlYWRlcnN9IGZyb20gXCJAYW5ndWxhci9odHRwXCI7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XG5cblxuQENvbXBvbmVudCh7XG4gICBzZWxlY3RvcjogXCJhbmFseXplclwiLFxuICAgdGVtcGxhdGVVcmw6IFwidmlld3MvYW5hbHl6ZXIvYW5hbHl6ZXIubWFpbi5odG1sXCJcbn0pXG5leHBvcnQgY2xhc3MgQW5hbHl6ZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgZmlsZUdyaWRDb2x1bW5zOiBDb2xEZWZbXSA9IFtdO1xuICAgdmVyc2lvbkdyaWRDb2x1bW5zOiBDb2xEZWZbXSA9IFtdO1xuICAgZ3JpZE9wdGlvbnM6IEdyaWRPcHRpb25zO1xuICAgdmVyc2lvbkdyaWRSb3dEYXRhOiBhbnlbXSA9IFtdO1xuICAgaXNCdG5VcGxvYWRFbmFibGVkOiBib29sZWFuID0gZmFsc2U7XG4gICBpc0xvYWRpbmcgPSBmYWxzZTtcbiAgIGRldGFpbFRpdGxlOiBzdHJpbmc7XG4gICBmaWxlU3RhdHVzOiB7W3N0YXR1czogbnVtYmVyXTogIEZpbGVTdGF0dXNEZXNjcmliZXJ9ID0ge307XG4gICBjYXRlZ29yaWVzOiB7W3ZhbHVlOiBzdHJpbmddOiBzdHJpbmd9ID0ge307XG4gICBjYXRlZ29yaWVzU2VhcmNoOiBDYXRlZ29yeVtdID0gW107XG4gICBzZWFyY2hMZXZlbDpPYmplY3QgPSB7fTtcbiAgIGxldmVsT25lIDogU3RyaW5nW10gPSBbXTtcbiAgIGxldmVsVHdvIDogU3RyaW5nW10gPSBbXTtcbiAgIGxldmVsT25lVmFsdWUgPSAnJztcbiAgIGxldmVsVHdvVmFsdWUgPSAnJztcblxuICAgQFZpZXdDaGlsZChcInVwbG9hZERpYWxvZ1wiKVxuICAgdXBsb2FkRGlhbG9nOiBVcGxvYWREaWFsb2dDb21wb25lbnQ7XG5cbiAgIEBWaWV3Q2hpbGQoXCJmaWxlR3JpZFwiKVxuICAgZmlsZUdyaWQ6IGFueTtcblxuICAgQFZpZXdDaGlsZChcInZlcnNpb25HcmlkXCIpXG4gICB2ZXJzaW9uR3JpZDogYW55O1xuXG4gICBAVmlld0NoaWxkKFwicHJldmlld1wiKVxuICAgcHJldmlldzogUHJldmlld0NvbXBvbmVudDtcblxuICAgcHJpdmF0ZSBkYXRlUGlwZSA9IG5ldyBEYXRlUGlwZSh0aGlzLmkxOG4uY3VycmVudExhbmcpO1xuICAgcHJpdmF0ZSB1cHBlckNhc2VQaXBlID0gbmV3IFVwcGVyQ2FzZVBpcGUoKTtcblxuICAgIC8vIEZvciBleGFtcGxlIGluaXRpYWxpemUgdG8gc3BlY2lmaWMgZGF0ZSAoMDkuMTAuMjAxOCAtIDE5LjEwLjIwMTgpLiBJdCBpcyBhbHNvIHBvc3NpYmxlXG4gICAgLy8gdG8gc2V0IGluaXRpYWwgZGF0ZSByYW5nZSB2YWx1ZSB1c2luZyB0aGUgc2VsRGF0ZVJhbmdlIGF0dHJpYnV0ZS5cbiAgICBwcml2YXRlIG1vZGVsOiBPYmplY3QgPSB7fTtcblxuXG4gICBjb25zdHJ1Y3Rvcihwcml2YXRlIGF1dGg6IEF1dGhTZXJ2aWNlLCBwcml2YXRlIGkxOG46IFRyYW5zbGF0ZVNlcnZpY2UsIHByaXZhdGUgZmlsZVNlcnZpY2U6IEZpbGVTZXJ2aWNlLFxuICAgICAgICAgICAgICAgcHJpdmF0ZSBub3RpZmljYXRpb25TZXJ2aWNlOiBOb3RpZmljYXRpb25zU2VydmljZSwgcHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUscHVibGljIG5vdGlmeTogTm90aWZpY2F0aW9uc1NlcnZpY2UsIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIscHJpdmF0ZSBodHRwOiBIdHRwKSB7XG4gICAgICBsZXQgc3RhdHVzOiBGaWxlU3RhdHVzRGVzY3JpYmVyW10gPSByb3V0ZS5zbmFwc2hvdC5kYXRhW1wiZmlsZVN0YXR1c1wiXTtcbiAgICAgIHN0YXR1cy5mb3JFYWNoKGRlc2NyaWJlciA9PiB7XG4gICAgICAgICB0aGlzLmZpbGVTdGF0dXNbZGVzY3JpYmVyLnN0YXR1c10gPSBkZXNjcmliZXI7XG4gICAgICB9KTtcblxuICAgICAgLyoqXG4gICAgICAgKiDlop7liqDliIbnsbvmkJzntKJcbiAgICAgICAqL1xuICAgICAgXG4gICAgICBsZXQgdXNlciA9IHRoaXMuYXV0aC5nZXRUb2tlbigpLnVzZXI7XG5cbiAgICAgIHRoaXMuaHR0cC5nZXQoJy9pRGF0YS9hcGkvdGVtcGxhdGUvdXNlcj91c2VySWQ9Jyt1c2VyLmlkKS5zdWJzY3JpYmUoXG4gICAgICAgICByZXMgPT4ge1xuICAgICAgICAgICAgbGV0IGxldmVsU3ViQXJyPVtdLGxldmVsR3BBcnI9W107XG4gICAgICAgICAgICBsZXQgY2F0ID0gcmVzLmpzb24oKTtcbiAgICAgICAgICAgIHRoaXMuc2VhcmNoTGV2ZWwgPSByZXMuanNvbigpO1xuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5zZWFyY2hMZXZlbClcbiAgICAgICAgICAgIHRoaXMubGV2ZWxPbmUgPSBfLmtleXMoY2F0KTtcblxuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5sZXZlbE9uZSwnLi4uLi4uLicpXG4gICAgICAgICB9LFxuICAgICAgICAgZXJyUmVzcCA9PiB7XG4gICAgICAgICAgICB0aGlzLm5vdGlmeS5lcnJvcign5pyN5Yqh5Zmo6ZSZ6K+vJywn5pyN5Yqh5Zmo6ZSZ6K+vJyk7XG4gICAgICAgICB9XG4gICAgICApO1xuXG4gICAgICB0aGlzLmZpbGVTZXJ2aWNlLmdldENhdGVvZlVwbG9hZCh1c2VyLmlkKS5zdWJzY3JpYmUocmVzID0+IHtcblxuICAgICAgICAgLy8gaWYgKHVzZXIudHlwZSAhPT0gVXNlclR5cGUuQWRtaW4pIHtcbiAgICAgICAgIC8vICAgIGxldCB2aXNpYmxlQ2F0ZWdvcnk6IHN0cmluZ1tdID0gdXNlci5jYXRlZ29yeS5zcGxpdChcIixcIik7XG4gICAgICAgICAvLyAgICB0aGlzLmNhdGVnb3JpZXMgPSBsaXN0LmZpbHRlcihjYXRlZ29yeSA9PiB7XG4gICAgICAgICAvLyAgICAgICByZXR1cm4gdmlzaWJsZUNhdGVnb3J5LmluZGV4T2YoY2F0ZWdvcnkudmFsdWUpID4gLTE7XG4gICAgICAgICAvLyAgICB9KTtcbiAgICAgICAgIC8vIH0gZWxzZSB7XG4gICAgICAgICAvLyAgICB0aGlzLmNhdGVnb3JpZXMgPSBsaXN0O1xuICAgICAgICAgLy8gfVxuXG4gICAgICAgICAvLyB0aGlzLmNhdGVnb3JpZXMgPSBsaXN0O1xuXG4gICAgICAgICBsZXQge2dyb3VwVGVtcGxhdGVzLCBzdWJUZW1wbGF0ZXN9ID0gcmVzO1xuXG4gICAgICAgICBfLm1hcChncm91cFRlbXBsYXRlcywoZ3JvdXApPT57XG4gICAgICAgICAgICBncm91cC5pc0dyb3VwQ2F0ZWdvcnkgPSB0cnVlO1xuICAgICAgICAgICAgZ3JvdXAuY2F0ZWdvcnkgPSBncm91cC5ncm91cENhdGVnb3J5O1xuICAgICAgICAgICAgZ3JvdXAudGVtcGxhdGVuYW1lID0gZ3JvdXAuZ3JvdXBOYW1lO1xuICAgICAgICAgICAgZGVsZXRlIGdyb3VwLmdyb3VwQ2F0ZWdvcnk7XG4gICAgICAgICAgICBkZWxldGUgZ3JvdXAuZ3JvdXBuYW1lO1xuICAgICAgICAgfSlcblxuICAgICAgICAgXy5tYXAoc3ViVGVtcGxhdGVzLCAoc3ViKSA9PiB7XG4gICAgICAgICAgICBzdWIuaXNHcm91cENhdGVnb3J5ID0gZmFsc2U7XG4gICAgICAgICB9KVxuXG4gICAgICAgICB0aGlzLmNhdGVnb3JpZXNTZWFyY2ggPSBncm91cFRlbXBsYXRlcy5jb25jYXQoc3ViVGVtcGxhdGVzKTtcbiAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuY2F0ZWdvcmllc1NlYXJjaClcblxuICAgICAgfSwgKCkgPT4ge30sICgpID0+e30pO1xuICAgfVxuXG4gICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgIHRoaXMuZmlsZUdyaWRDb2x1bW5zID0gW3tcbiAgICAgICAgIGhlYWRlck5hbWU6ICdGSUQnLFxuICAgICAgICAgZmllbGQ6IFwiaWRcIlxuICAgICAgfSx7XG4gICAgICAgICBoZWFkZXJOYW1lOiB0aGlzLmkxOG4uaW5zdGFudChcImFuYWx5emVyLmZpbGVMaXN0LmNvbHVtbnMubmFtZVwiKSxcbiAgICAgICAgIGZpZWxkOiBcImF0dGFjaG5hbWVcIixcbiAgICAgICAgIGNlbGxSZW5kZXJlcjogKHBhcmFtOiBhbnkpOiBzdHJpbmcgPT4gcGFyYW0udmFsdWUgP1xuICAgICAgICAgICAgcGFyYW0udmFsdWUgOiBVdGlsLkxPQURJTkdfQ0VMTF9URU1QTEFURVxuICAgICAgfSwge1xuICAgICAgICAgaGVhZGVyTmFtZTogdGhpcy5pMThuLmluc3RhbnQoXCJhbmFseXplci5maWxlTGlzdC5jb2x1bW5zLmV4dGVuc2lvblwiKSxcbiAgICAgICAgIGZpZWxkOiBcInN1ZmZpeFwiLFxuICAgICAgICAgY2VsbFJlbmRlcmVyOiAocGFyYW06IGFueSk6IHN0cmluZyA9PiBwYXJhbS52YWx1ZSA/XG4gICAgICAgICAgICBgPGkgY2xhc3M9XCJmYSBmYS1maWxlLWV4Y2VsLW9cIj48L2k+ICR7dGhpcy51cHBlckNhc2VQaXBlLnRyYW5zZm9ybShwYXJhbS52YWx1ZSl9YCA6IFwiXCJcbiAgICAgIH0sIHtcbiAgICAgICAgIGhlYWRlck5hbWU6IHRoaXMuaTE4bi5pbnN0YW50KFwiYW5hbHl6ZXIuZmlsZUxpc3QuY29sdW1ucy5zaXplXCIpLFxuICAgICAgICAgZmllbGQ6IFwic2l6ZVwiLFxuICAgICAgICAgY2VsbEZvcm1hdHRlcjogKHBhcmFtOiBhbnkpOiBzdHJpbmcgPT4gcGFyYW0udmFsdWUgPyBVdGlsLmZvcm1hdFN0b3JhZ2VTaXplKHBhcmFtLnZhbHVlKSA6IFwiXCJcbiAgICAgIH0sIHtcbiAgICAgICAgIGhlYWRlck5hbWU6IHRoaXMuaTE4bi5pbnN0YW50KFwiYW5hbHl6ZXIuZmlsZUxpc3QuY29sdW1ucy52ZXJzaW9uXCIpLFxuICAgICAgICAgZmllbGQ6IFwidmVyc2lvblwiXG4gICAgICB9LCB7XG4gICAgICAgICBoZWFkZXJOYW1lOiB0aGlzLmkxOG4uaW5zdGFudChcImFuYWx5emVyLmZpbGVMaXN0LmNvbHVtbnMuc3RhdHVzXCIpLFxuICAgICAgICAgZmllbGQ6IFwic3RhdHVzXCIsXG4gICAgICAgICBjZWxsRm9ybWF0dGVyOiBwYXJhbSA9PiB7XG4gICAgICAgICAgICBpZihwYXJhbS52YWx1ZSA9PSAzKXtcbiAgICAgICAgICAgICAgIHJldHVybiAn5qih5p2/5Yy56YWN6ZSZ6K+vJ1xuICAgICAgICAgICAgfSBlbHNlIGlmIChwYXJhbS52YWx1ZSA9PSA0KXtcbiAgICAgICAgICAgICAgIHJldHVybiAn5Li75pWw5o2u5qCh6aqM5aSx6LSlJ1xuICAgICAgICAgICAgfSBlbHNlIGlmIChwYXJhbS52YWx1ZSA9PSAyKXtcbiAgICAgICAgICAgICAgIHJldHVybiAn5q2j56GuJ1xuICAgICAgICAgICAgfSBlbHNlIGlmKHBhcmFtLnZhbHVlID09IDApe1xuICAgICAgICAgICAgICAgcmV0dXJuICflvoXpqozor4EnXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHBhcmFtLnZhbHVlID09IDEpe1xuICAgICAgICAgICAgICAgcmV0dXJuICfpqozor4HkuK0nXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHBhcmFtLnZhbHVlID09IDUpe1xuICAgICAgICAgICAgICAgcmV0dXJuICflrZfmrrXmoLzlvI/plJnor68nXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyByZXR1cm4gcGFyYW0udmFsdWUgIT09IHVuZGVmaW5lZCA/IHRoaXMuZmlsZVN0YXR1c1twYXJhbS52YWx1ZV0uZGVzY3JpcHRpb24gOiBcIlwiO1xuICAgICAgICAgfVxuICAgICAgfSwge1xuICAgICAgICAgaGVhZGVyTmFtZTogdGhpcy5pMThuLmluc3RhbnQoXCJhbmFseXplci5maWxlTGlzdC5jb2x1bW5zLmNhdGVnb3J5XCIpLFxuICAgICAgICAgZmllbGQ6IFwiY2F0ZWdvcnlEaXNwbGF5XCIsXG4gICAgICAgICBjZWxsRm9ybWF0dGVyOiBwYXJhbSA9PiBwYXJhbS52YWx1ZSA/IHRoaXMuY2F0ZWdvcmllc1twYXJhbS52YWx1ZV0gOiBcIlwiXG4gICAgICB9LCB7XG4gICAgICAgICBoZWFkZXJOYW1lOiB0aGlzLmkxOG4uaW5zdGFudChcImFuYWx5emVyLmZpbGVMaXN0LmNvbHVtbnMuY3J0aW1lXCIpLFxuICAgICAgICAgZmllbGQ6IFwiY3J0aW1lXCIsXG4gICAgICAgICBjZWxsRm9ybWF0dGVyOiAocGFyYW06IGFueSk6IHN0cmluZyA9PiBwYXJhbS52YWx1ZSA/XG4gICAgICAgICAgICB0aGlzLmRhdGVQaXBlLnRyYW5zZm9ybShwYXJhbS52YWx1ZSwgVXRpbC5MT05HX1RJTUVfU1RSSU5HKSA6IFwiXCJcbiAgICAgIH0sIHtcbiAgICAgICAgIGhlYWRlck5hbWU6IHRoaXMuaTE4bi5pbnN0YW50KFwiYW5hbHl6ZXIuZmlsZUxpc3QuY29sdW1ucy5kb3dubG9hZFwiKSxcbiAgICAgICAgIGZpZWxkOiBcImF0dGFjaHBhdGhcIixcbiAgICAgICAgIGNlbGxSZW5kZXJlcjogKHBhcmFtOiBhbnkpOiBzdHJpbmcgPT4gcGFyYW0udmFsdWUgP1xuICAgICAgICAgICAgYDxhIGNsYXNzPVwiYnRuIGJ0bi1saW5rIGJ0bi1vdXRsaW5lLWluZm9cIiBocmVmPVwiJHtBUElzLmdldERvd25sb2FkVXJpKHBhcmFtLnZhbHVlKX1cIiB0YXJnZXQ9XCJfYmxhbmtcIj5cbiAgICAgICAgICAgICAgIDxoNj48aSBjbGFzcz1cImljb24tY2xvdWQtZG93bmxvYWQgaWNvbnNcIj48L2k+PC9oNj5cbiAgICAgICAgICAgICA8L2E+YCA6IFwiXCJcbiAgICAgIH1dO1xuXG4gICAgICB0aGlzLnZlcnNpb25HcmlkQ29sdW1ucyA9IFt7XG4gICAgICAgICBoZWFkZXJOYW1lOiAnRklEJyxcbiAgICAgICAgIGZpZWxkOiBcImlkXCJcbiAgICAgIH0se1xuICAgICAgICAgaGVhZGVyTmFtZTogdGhpcy5pMThuLmluc3RhbnQoXCJhbmFseXplci5kZXRhaWwuY29sdW1ucy52ZXJzaW9uXCIpLFxuICAgICAgICAgZmllbGQ6IFwidmVyc2lvblwiLFxuICAgICAgICAgY2VsbFJlbmRlcmVyOiAocGFyYW06IGFueSk6IHN0cmluZyA9PiBwYXJhbS52YWx1ZSA/XG4gICAgICAgICAgICBwYXJhbS52YWx1ZSA6IFV0aWwuTE9BRElOR19DRUxMX1RFTVBMQVRFXG4gICAgICB9LCB7XG4gICAgICAgICBoZWFkZXJOYW1lOiB0aGlzLmkxOG4uaW5zdGFudChcImFuYWx5emVyLmRldGFpbC5jb2x1bW5zLnNpemVcIiksXG4gICAgICAgICBmaWVsZDogXCJzaXplXCIsXG4gICAgICAgICBjZWxsRm9ybWF0dGVyOiAocGFyYW06IGFueSk6IHN0cmluZyA9PlxuICAgICAgICAgICAgcGFyYW0udmFsdWUgPyBVdGlsLmZvcm1hdFN0b3JhZ2VTaXplKHBhcmFtLnZhbHVlKSA6IFwiXCJcbiAgICAgIH0sIHtcbiAgICAgICAgIGhlYWRlck5hbWU6IHRoaXMuaTE4bi5pbnN0YW50KFwiYW5hbHl6ZXIuZGV0YWlsLmNvbHVtbnMuYXV0aG9yXCIpLFxuICAgICAgICAgZmllbGQ6IFwiY3JhY3RvclwiXG4gICAgICB9LCB7XG4gICAgICAgICBoZWFkZXJOYW1lOiB0aGlzLmkxOG4uaW5zdGFudChcImFuYWx5emVyLmRldGFpbC5jb2x1bW5zLmNydGltZVwiKSxcbiAgICAgICAgIGZpZWxkOiBcImNydGltZVwiLFxuICAgICAgICAgY2VsbEZvcm1hdHRlcjogKHBhcmFtOiBhbnkpOiBzdHJpbmcgPT5cbiAgICAgICAgICAgIHBhcmFtLnZhbHVlID8gdGhpcy5kYXRlUGlwZS50cmFuc2Zvcm0ocGFyYW0udmFsdWUsIFV0aWwuTE9OR19USU1FX1NUUklORykgOiBcIlwiXG4gICAgICB9LCB7XG4gICAgICAgICBoZWFkZXJOYW1lOiB0aGlzLmkxOG4uaW5zdGFudChcImFuYWx5emVyLmRldGFpbC5jb2x1bW5zLmRvd25sb2FkXCIpLFxuICAgICAgICAgZmllbGQ6IFwiYXR0YWNocGF0aFwiLFxuICAgICAgICAgY2VsbFJlbmRlcmVyOiAocGFyYW06IGFueSk6IHN0cmluZyA9PiBwYXJhbS52YWx1ZSA/XG4gICAgICAgICAgICBgPGEgY2xhc3M9XCJidG4gYnRuLWxpbmsgYnRuLW91dGxpbmUtaW5mb1wiIGhyZWY9XCIke0FQSXMuZ2V0RG93bmxvYWRVcmkocGFyYW0udmFsdWUpfVwiIHRhcmdldD1cIl9ibGFua1wiPlxuICAgICAgICAgICAgICAgPGg2PjxpIGNsYXNzPVwiaWNvbi1jbG91ZC1kb3dubG9hZCBpY29uc1wiPjwvaT48L2g2PlxuICAgICAgICAgICAgIDwvYT5gIDogXCJcIlxuICAgICAgfV07XG5cbiAgICAgIHRoaXMuZGV0YWlsVGl0bGUgPSB0aGlzLmkxOG4uaW5zdGFudChcImFuYWx5emVyLmRldGFpbC50aXRsZU5vU2VsZWN0aW9uXCIpO1xuICAgICAgdGhpcy5ncmlkT3B0aW9ucyA9IFV0aWwuZ2V0TGF6eUxvYWRpbmdHcmlkT3B0aW9ucyhcbiAgICAgICAgIHRoaXMuaTE4bi5pbnN0YW50KFwibG9hZGluZ1wiKSxcbiAgICAgICAgIHRoaXMuaTE4bi5pbnN0YW50KFwibm9EYXRhXCIpXG4gICAgICApO1xuICAgICAgdGhpcy5ncmlkT3B0aW9ucy5nZXRSb3dOb2RlSWQgPSAoZGF0YTogRmlsZUl0ZW0pID0+IGRhdGEuaWQudG9TdHJpbmcoKTtcbiAgICAgIC8vdGhpcy5ncmlkT3B0aW9ucy5lbmFibGVTZXJ2ZXJTaWRlU29ydGluZyA9IHRydWU7XG4gICAgICB0aGlzLmdyaWRPcHRpb25zLnBhZ2luYXRpb25QYWdlU2l6ZSA9IDEwMDtcbiAgICAgIHRoaXMuZ3JpZE9wdGlvbnMuY2FjaGVPdmVyZmxvd1NpemUgPSAyO1xuICAgICAgdGhpcy5ncmlkT3B0aW9ucy5tYXhDb25jdXJyZW50RGF0YXNvdXJjZVJlcXVlc3RzID0gMjtcbiAgICAgIHRoaXMuZ3JpZE9wdGlvbnMuaW5maW5pdGVJbml0aWFsUm93Q291bnQgPSAxO1xuICAgICAgdGhpcy5ncmlkT3B0aW9ucy5tYXhCbG9ja3NJbkNhY2hlID0gMjtcbiAgIH1cblxuICAgbGV2ZWxvbmVDaGFuZ2UodmFsdWUpe1xuICAgICAgc2V0VGltZW91dCgoKT0+e1xuICAgICAgICAgY29uc29sZS5sb2codGhpcy5zZWFyY2hMZXZlbFt0aGlzLmxldmVsT25lVmFsdWVdKVxuICAgICAgICAgbGV0IGZpbmFsTGV2ZWxUd28gPSBbXTtcbiAgICAgICAgIGxldCBsZXZlbFR3byA9IHRoaXMuc2VhcmNoTGV2ZWxbdGhpcy5sZXZlbE9uZVZhbHVlXTtcbiAgICAgICAgIGNvbnNvbGUubG9nKGxldmVsVHdvLmdyb3VwVGVtcGxhdGVzLCBsZXZlbFR3by5zdWJUZW1wbGF0ZXMpXG4gICAgICAgICBsZXZlbFR3by5ncm91cFRlbXBsYXRlcyA/ICcnIDogbGV2ZWxUd28uZ3JvdXBUZW1wbGF0ZXMgPSB7bGlzdDpbXX1cbiAgICAgICAgIGxldmVsVHdvLnN1YlRlbXBsYXRlcyA/ICcnIDogbGV2ZWxUd28uc3ViVGVtcGxhdGVzID0ge2xpc3Q6W119XG5cbiAgICAgICAgIGxldCBsZXZlbG9uZUxpc3QgPSBsZXZlbFR3by5ncm91cFRlbXBsYXRlcy5saXN0O1xuICAgICAgICAgbGV0IGxldmVsdHdvTGlzdCA9IGxldmVsVHdvLnN1YlRlbXBsYXRlcy5saXN0O1xuICAgICAgICAgbGV0IGxldmVsVHdvQXJyID0gbGV2ZWxvbmVMaXN0LmNvbmNhdChsZXZlbHR3b0xpc3QpO1xuXG4gICAgICAgICBfLm1hcChsZXZlbFR3b0FyciwgKGxpc3QpPT57XG4gICAgICAgICAgICBsZXQgb2JqID0ge307XG4gICAgICAgICAgICBvYmoubGV2ZWxUd29DbiA9IGxpc3QuZ3JvdXBOYW1lIHx8IGxpc3QudGVtcGxhdGVuYW1lO1xuICAgICAgICAgICAgb2JqLmxldmVsVHdvRW4gPSBsaXN0Lmdyb3VwQ2F0ZWdvcnkgfHwgbGlzdC5jYXRlZ29yeTtcbiAgICAgICAgICAgIGZpbmFsTGV2ZWxUd28ucHVzaChvYmopO1xuICAgICAgICAgfSk7XG4gICAgICAgICB0aGlzLmxldmVsVHdvID0gZmluYWxMZXZlbFR3bztcbiAgICAgICAgIHRoaXMubGV2ZWxUd29WYWx1ZSA9IHRoaXMubGV2ZWxUd29bMF0ubGV2ZWxUd29FbjtcbiAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMubGV2ZWxUd28pXG4gICAgICB9LCAyMDApXG4gICB9XG5cbiAgIGdldFNlbGVjdGVkUm93KCk6IEZpbGVJdGVtIHtcbiAgICAgIGxldCByb3dzOiBGaWxlSXRlbVtdID0gdGhpcy5maWxlR3JpZCAmJiB0aGlzLmZpbGVHcmlkLmFwaSA/XG4gICAgICAgICB0aGlzLmZpbGVHcmlkLmFwaS5nZXRTZWxlY3RlZFJvd3MoKSA6IG51bGw7XG5cbiAgICAgIGlmIChyb3dzICYmIHJvd3MubGVuZ3RoID4gMCkge1xuICAgICAgICAgcmV0dXJuIHJvd3Nbcm93cy5sZW5ndGggLSAxXTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG51bGw7XG4gICB9XG5cbiAgIHJlZnJlc2goZ3JpZDogR3JpZE9wdGlvbnMpIHtcbiAgICAgIGNvbnNvbGUubG9nKGdyaWQsJ3J1bi1yZWZyZXNoJylcbiAgICAgIHRoaXMuaXNMb2FkaW5nID0gdHJ1ZTtcbiAgICAgIGxldCBhbGxPZlRoZURhdGEsZGF0YVNvdXJjZTtcbiAgICAgIC8vIFRPRE8gb3BlblxuICAgICAgdGhpcy5pc0xvYWRpbmcgPSB0cnVlO1xuXG4gICAgICBsZXQgY2F0Z29yeSA9IHRoaXMubGV2ZWxUd29WYWx1ZSB8fCAnYWxsJztcbiAgICAgIGNvbnNvbGUubG9nKHRoaXMubW9kZWwpXG4gICAgICBpZihKU09OLnN0cmluZ2lmeSh0aGlzLm1vZGVsKSA9PSAne30nIHx8IHRoaXMubW9kZWwgPT0gbnVsbCl7XG4gICAgICAgICBsZXQgc3RhcnRUaW1lID0gJ2FsbCc7XG4gICAgICAgICBsZXQgZW5kVGltZSA9ICAnYWxsJztcblxuICAgICAgfWVsc2V7XG4gICAgICAgICBsZXQgdGltZU1vZGVsID0gdGhpcy5tb2RlbDtcbiAgICAgICAgIGNvbnNvbGUubG9nKHRpbWVNb2RlbClcbiAgICAgICAgIGxldCBzdGFydFRpbWUgPSB0aW1lTW9kZWwuYmVnaW5EYXRlLnllYXIrJy0nK3RpbWVNb2RlbC5iZWdpbkRhdGUubW9udGgrJy0nK3RpbWVNb2RlbC5iZWdpbkRhdGUuZGF5O1xuICAgICAgICAgbGV0IGVuZFRpbWUgPSB0aW1lTW9kZWwuZW5kRGF0ZS55ZWFyKyctJyt0aW1lTW9kZWwuZW5kRGF0ZS5tb250aCsnLScrdGltZU1vZGVsLmVuZERhdGUuZGF5O1xuICAgICAgfSAgIFxuICAgICAgY29uc29sZS5sb2coc3RhcnRUaW1lLGVuZFRpbWUpXG4gICAgICBjb25zb2xlLmxvZyhjYXRnb3J5LHRoaXMubW9kZWwsJy0tLS0tLS0tLScpXG4gICAgICBcblxuICAgICAgbGV0IGRzID0gRmlsZURhdGFTb3VyY2UuY3JlYXRlKFxuICAgICAgICAgdGhpcy5maWxlU2VydmljZSwgdGhpcy5ub3RpZmljYXRpb25TZXJ2aWNlLCB0aGlzLmF1dGguZ2V0VG9rZW4oKS51c2VyLmlkLGNhdGdvcnksc3RhcnRUaW1lLGVuZFRpbWVcbiAgICAgICk7XG5cbiAgICAgIHRoaXMuZmlsZVNlcnZpY2UuZ2V0Q2F0ZWdvcmllcygpLnN1YnNjcmliZShsaXN0ID0+IHtcbiAgICAgICAgIGxpc3QuZm9yRWFjaChjYXRlZ29yeSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNhdGVnb3JpZXNbY2F0ZWdvcnkudmFsdWVdID0gY2F0ZWdvcnkubGFiZWw7XG4gICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBkcy5vbkNvbXBsZXRlLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICB0aGlzLmlzTG9hZGluZyA9IGZhbHNlO1xuXG4gICAgICAgICBsZXQgZmlsZUlkOiBudW1iZXIgPSB0aGlzLnJvdXRlLnNuYXBzaG90LnBhcmFtc1tcImZpbGVcIl07XG5cbiAgICAgICAgIGlmIChmaWxlSWQpIHtcbiAgICAgICAgICAgIGdyaWQuYXBpLmZvckVhY2hOb2RlKG5vZGUgPT4ge1xuICAgICAgICAgICAgICAgbm9kZS5zZXRTZWxlY3RlZChub2RlLmlkID09PSBmaWxlSWQudG9TdHJpbmcoKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBncmlkLmFwaS5kZXNlbGVjdEFsbCgpO1xuICAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBncmlkLmFwaS5zZXREYXRhc291cmNlKGRzKTtcbiAgICAgIC8vIHRoaXMuZmlsZVNlcnZpY2UuZ2V0RmlsZXMoe1xuICAgICAgLy8gICBmcm9tOiAwLFxuICAgICAgLy8gICBzaXplOiA1MDAwMFxuICAgICAgLy8gfSx0aGlzLmF1dGguZ2V0VG9rZW4oKS51c2VyLmlkKS5maW5hbGx5KCgpID0+IHtcbiAgICAgIC8vICAgIC8vdGhpcy5vbkNvbXBsZXRlLmVtaXQoKTtcbiAgICAgIC8vIH0pLnN1YnNjcmliZShmaWxlU2V0ID0+IHtcbiAgICAgIC8vICAgYWxsT2ZUaGVEYXRhID0gZmlsZVNldC5yZXN1bHQ7XG4gICAgICAvLyAgIGNvbnNvbGUubG9nKGFsbE9mVGhlRGF0YSlcbiAgICAgIC8vICAgZGF0YVNvdXJjZSA9IHtcbiAgICAgIC8vICAgICAgcm93Q291bnQ6IG51bGwsIC8vIGJlaGF2ZSBhcyBpbmZpbml0ZSBzY3JvbGxcbiAgICAgIC8vICAgICAgZ2V0Um93czogKHBhcmFtcykgPT4ge1xuICAgICAgLy8gICAgICAgICAgY29uc29sZS5sb2cocGFyYW1zKVxuICAgICAgLy8gICAgICAgICAgY29uc29sZS5sb2coJ2Fza2luZyBmb3IgJyArIHBhcmFtcy5zdGFydFJvdyArICcgdG8gJyArIHBhcmFtcy5lbmRSb3cpO1xuICAgICAgLy8gICAgICAgICAgbGV0IGRhdGFBZnRlclNvcnRpbmdBbmRGaWx0ZXJpbmcgPSB0aGlzLnNvcnRBbmRGaWx0ZXIoYWxsT2ZUaGVEYXRhLCBwYXJhbXMuc29ydE1vZGVsKTtcbiAgICAgIC8vICAgICAgICAgIGxldCByb3dzVGhpc1BhZ2UgPSBkYXRhQWZ0ZXJTb3J0aW5nQW5kRmlsdGVyaW5nLnNsaWNlKHBhcmFtcy5zdGFydFJvdywgcGFyYW1zLmVuZFJvdyk7XG5cbiAgICAgIC8vICAgICAgICAgIGxldCBsYXN0Um93ID0gLTE7XG4gICAgICAvLyAgICAgICAgICBpZiAoZGF0YUFmdGVyU29ydGluZ0FuZEZpbHRlcmluZy5sZW5ndGggPD0gcGFyYW1zLmVuZFJvdykge1xuICAgICAgLy8gICAgICAgICAgICAgbGFzdFJvdyA9IGRhdGFBZnRlclNvcnRpbmdBbmRGaWx0ZXJpbmcubGVuZ3RoO1xuICAgICAgLy8gICAgICAgICAgfVxuXG4gICAgICAvLyAgICAgICAgICBwYXJhbXMuc3VjY2Vzc0NhbGxiYWNrKHJvd3NUaGlzUGFnZSwgbGFzdFJvdyk7XG4gICAgICAvLyAgICAgIH1cbiAgICAgIC8vICAgIH07XG4gICAgICAvLyAgICBncmlkLmFwaS5zZXREYXRhc291cmNlKGRhdGFTb3VyY2UpO1xuICAgICAgLy8gICB0aGlzLmlzTG9hZGluZyA9IGZhbHNlO1xuICAgICAgLy8gfSwgZXJyb3IgPT4ge1xuICAgICAgLy8gICB0aGlzLm5vdGlmeS5hbGVydChlcnJvci5leGNlcHRpb25OYW1lLCBlcnJvci5kZXNjcmlwdGlvbik7XG4gICAgICAvLyB9KTtcblxuICAgfVxuXG5cbiAgIHNvcnRBbmRGaWx0ZXIoYWxsT2ZUaGVEYXRhLCBzb3J0TW9kZWwpIHtcbiAgICAgIHJldHVybiB0aGlzLnNvcnREYXRhKHNvcnRNb2RlbCwgYWxsT2ZUaGVEYXRhKVxuICAgfVxuXG4gICBzb3J0RGF0YShzb3J0TW9kZWwsIGRhdGEpIHtcbiAgICAgICB2YXIgc29ydFByZXNlbnQgPSBzb3J0TW9kZWwgJiYgc29ydE1vZGVsLmxlbmd0aCA+IDA7XG4gICAgICAgaWYgKCFzb3J0UHJlc2VudCkge1xuICAgICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgICB9XG4gICAgICAgLy8gZG8gYW4gaW4gbWVtb3J5IHNvcnQgb2YgdGhlIGRhdGEsIGFjcm9zcyBhbGwgdGhlIGZpZWxkc1xuICAgICAgIHZhciByZXN1bHRPZlNvcnQgPSBkYXRhLnNsaWNlKCk7XG4gICAgICAgcmVzdWx0T2ZTb3J0LnNvcnQoZnVuY3Rpb24oYSxiKSB7XG4gICAgICAgICAgIGZvciAodmFyIGsgPSAwOyBrPHNvcnRNb2RlbC5sZW5ndGg7IGsrKykge1xuICAgICAgICAgICAgICAgdmFyIHNvcnRDb2xNb2RlbCA9IHNvcnRNb2RlbFtrXTtcbiAgICAgICAgICAgICAgIHZhciB2YWx1ZUEgPSBhW3NvcnRDb2xNb2RlbC5jb2xJZF07XG4gICAgICAgICAgICAgICB2YXIgdmFsdWVCID0gYltzb3J0Q29sTW9kZWwuY29sSWRdO1xuICAgICAgICAgICAgICAgLy8gdGhpcyBmaWx0ZXIgZGlkbid0IGZpbmQgYSBkaWZmZXJlbmNlLCBtb3ZlIG9udG8gdGhlIG5leHQgb25lXG4gICAgICAgICAgICAgICBpZiAodmFsdWVBPT12YWx1ZUIpIHtcbiAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgIHZhciBzb3J0RGlyZWN0aW9uID0gc29ydENvbE1vZGVsLnNvcnQgPT09ICdhc2MnID8gMSA6IC0xO1xuICAgICAgICAgICAgICAgaWYgKHZhbHVlQSA+IHZhbHVlQikge1xuICAgICAgICAgICAgICAgICAgIHJldHVybiBzb3J0RGlyZWN0aW9uO1xuICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICByZXR1cm4gc29ydERpcmVjdGlvbiAqIC0xO1xuICAgICAgICAgICAgICAgfVxuICAgICAgICAgICB9XG4gICAgICAgICAgIC8vIG5vIGZpbHRlcnMgZm91bmQgYSBkaWZmZXJlbmNlXG4gICAgICAgICAgIHJldHVybiAwO1xuICAgICAgIH0pO1xuICAgICAgIHJldHVybiByZXN1bHRPZlNvcnQ7XG4gICB9XG5cbiAgIHRvZ2dsZVByZXZpZXcoKSB7XG4gICAgICB0aGlzLnByZXZpZXcuZmlsZURhdGEgPSB0aGlzLmZpbGVHcmlkLmFwaS5nZXRTZWxlY3RlZFJvd3MoKVswXTtcbiAgIH1cblxuICAgb25GaWxlR3JpZFJlYWR5KGdyaWQpIHtcbiAgICAgIGdyaWQuYXBpLnNpemVDb2x1bW5zVG9GaXQoKTtcbiAgICAgIGdyaWQuYXBpLmdldFJvd05vZGVJZCA9IGl0ZW0gPT4gaXRlbS5hdHRhY2hHcm91cDtcbiAgICAgIHRoaXMucmVmcmVzaChncmlkKTtcbiAgIH1cblxuICAgb25CdG5OZXdDbGlja2VkKCk6IHZvaWQge1xuICAgICAgdGhpcy51cGxvYWREaWFsb2cucG9wdXAoKTtcbiAgIH1cblxuICAgb25CdG5VcGRhdGVDbGlja2VkKGZpbGU6IEZpbGVJdGVtKTogdm9pZCB7XG4gICAgICB0aGlzLnVwbG9hZERpYWxvZy5wb3B1cChmaWxlKTtcbiAgIH1cblxuICAgb25GaWxlR3JpZFJvd1NlbGVjdGVkKCk6IHZvaWQge1xuICAgICAgbGV0IGZpbGU6IEZpbGVJdGVtID0gdGhpcy5nZXRTZWxlY3RlZFJvdygpO1xuXG4gICAgICBpZiAoZmlsZSkge1xuICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW3tmaWxlOiBmaWxlLmlkfV0sIHtyZWxhdGl2ZVRvOiB0aGlzLnJvdXRlfSk7XG4gICAgICAgICB0aGlzLmlzQnRuVXBsb2FkRW5hYmxlZCA9IHRydWU7XG4gICAgICAgICB0aGlzLmRldGFpbFRpdGxlID0gdGhpcy5pMThuLmluc3RhbnQoXCJhbmFseXplci5kZXRhaWwudGl0bGVcIiwge25hbWU6IGZpbGUuYXR0YWNobmFtZX0pO1xuXG4gICAgICAgICBsZXQgZHMgPSBWZXJzaW9uRGF0YVNvdXJjZS5jcmVhdGUodGhpcy5maWxlU2VydmljZSwgdGhpcy5ub3RpZmljYXRpb25TZXJ2aWNlLCBmaWxlKTtcblxuICAgICAgICAgdGhpcy52ZXJzaW9uR3JpZC5hcGkuc2V0RGF0YXNvdXJjZShkcyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW3t9XSwge3JlbGF0aXZlVG86IHRoaXMucm91dGV9KTtcbiAgICAgICAgIHRoaXMuaXNCdG5VcGxvYWRFbmFibGVkID0gZmFsc2U7XG4gICAgICAgICB0aGlzLmRldGFpbFRpdGxlID0gdGhpcy5pMThuLmluc3RhbnQoXCJhbmFseXplci5kZXRhaWwudGl0bGVOb1NlbGVjdGlvblwiKTtcbiAgICAgIH1cbiAgIH1cblxuICAgb25CdG5Eb3dubG9hZENsaWNrZWQoZmlsZTogRmlsZUl0ZW0pOiB2b2lkIHtcbiAgICAgIHRoaXMuZmlsZVNlcnZpY2UuZG93bmxvYWRGaWxlKGZpbGUuYXR0YWNocGF0aCk7XG4gICB9XG59Il19
