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
 * Created by zhongping.lu on 10/18/2016.
 */
var core_1 = require("@angular/core");
var ng2_translate_1 = require("ng2-translate/ng2-translate");
var common_1 = require("@angular/common");
var general_util_1 = require("../utils/general.util");
var dict_service_1 = require("../services/dict.service");
var components_1 = require("angular2-notifications/components");
var forms_1 = require("@angular/forms");
var alert_widget_1 = require("../widgets/alert.widget");
var http_1 = require("@angular/http");
var DictOptCellComponent = (function () {
    function DictOptCellComponent(i18n, dictService, notification, http) {
        this.i18n = i18n;
        this.dictService = dictService;
        this.notification = notification;
        this.http = http;
    }
    DictOptCellComponent.prototype.agInit = function (params) {
        this.params = params;
        this.api = params.api;
    };
    DictOptCellComponent.prototype.refresh = function (params) {
        this.agInit(params);
    };
    DictOptCellComponent.prototype.getDict = function () {
        return this.params.data;
    };
    DictOptCellComponent.prototype.onSave = function () {
        var _this = this;
        this.api.showLoadingOverlay();
        var dict = this.getDict();
        // Creation
        if (dict.isCodeEditable) {
            // dict.isCodeEditable = false;
            this.dictService.createDict(dict)
                .finally(function () {
                DictOptCellComponent.refresh.emit();
                _this.api.hideOverlay();
            })
                .subscribe(function () { }, function (error) { return _this.notification.alert(error.exceptionName, error.description); });
        }
        else {
            // Update
            this.dictService.updateDict(this.getDict())
                .finally(function () {
                DictOptCellComponent.refresh.emit();
                _this.api.hideOverlay();
            })
                .subscribe(function () { }, function (error) { return _this.notification.alert(error.exceptionName, error.description); });
        }
    };
    DictOptCellComponent.prototype.onDelete = function () {
        var _this = this;
        var dict = this.getDict();
        // In memory remove
        if (dict.isCodeEditable) {
            DictOptCellComponent.remove.emit(this.params.node);
        }
        else {
            // Invoke api to remove from serve side
            this.api.showLoadingOverlay();
            this.dictService.deleteDict(this.getDict())
                .finally(function () {
                DictOptCellComponent.refresh.emit();
                _this.api.hideOverlay();
            })
                .subscribe(function () { }, function (error) { return _this.notification.alert(error.exceptionName, error.description); });
        }
    };
    return DictOptCellComponent;
}());
DictOptCellComponent.refresh = new core_1.EventEmitter();
DictOptCellComponent.remove = new core_1.EventEmitter();
DictOptCellComponent = __decorate([
    core_1.Component({
        selector: "dict-opt-cell",
        template: "<button type=\"button\" class=\"btn btn-success btn-sm\" (click)=\"onSave()\" \n                      title=\"{{'admin.dict.list.actions.update' | translate: {name: getDict().domaincode} }}\">\n                 <i class=\"fa fa-check\"></i>\n              </button>\n              <button type=\"button\" class=\"btn btn-danger btn-sm\" (click)=\"onDelete()\" \n                      title=\"{{'admin.dict.list.actions.delete' | translate: {name: getDict().domaincode} }}\">\n                 <i class=\"fa fa-remove\"></i>\n              </button>"
    }),
    __metadata("design:paramtypes", [ng2_translate_1.TranslateService, dict_service_1.DictService,
        components_1.NotificationsService, http_1.Http])
], DictOptCellComponent);
var KvOptCellComponent = (function () {
    function KvOptCellComponent(i18n, dictService, notification) {
        this.i18n = i18n;
        this.dictService = dictService;
        this.notification = notification;
    }
    KvOptCellComponent.prototype.agInit = function (params) {
        this.params = params;
        this.api = params.api;
    };
    KvOptCellComponent.prototype.refresh = function (params) {
        this.agInit(params);
    };
    KvOptCellComponent.prototype.getKvPair = function () {
        return this.params.data;
    };
    KvOptCellComponent.prototype.onSave = function () {
        var _this = this;
        this.api.showLoadingOverlay();
        var pair = this.params.data;
        // Creation
        if (pair.isCodeEditable) {
            // dict.isCodeEditable = false;
            this.dictService.createKvPair(pair)
                .finally(function () {
                KvOptCellComponent.refresh.emit();
                _this.api.hideOverlay();
            }).subscribe(function () { }, function (error) { return _this.notification.alert(error.exceptionName, error.description); });
        }
        else {
            // Update
            this.dictService.updateKvPair(pair)
                .finally(function () {
                KvOptCellComponent.refresh.emit();
                _this.api.hideOverlay();
            })
                .subscribe(function () { }, function (error) { return _this.notification.alert(error.exceptionName, error.description); });
        }
    };
    KvOptCellComponent.prototype.onDelete = function () {
        var _this = this;
        var pair = this.params.data;
        // In memory remove
        if (pair.isCodeEditable) {
            KvOptCellComponent.remove.emit(this.params.node);
        }
        else {
            // Invoke api to remove from serve side
            this.api.showLoadingOverlay();
            this.dictService.deleteKvPair(pair)
                .finally(function () {
                KvOptCellComponent.refresh.emit();
                _this.api.hideOverlay();
            })
                .subscribe(function () { }, function (error) { return _this.notification.alert(error.exceptionName, error.description); });
        }
    };
    return KvOptCellComponent;
}());
KvOptCellComponent.refresh = new core_1.EventEmitter();
KvOptCellComponent.remove = new core_1.EventEmitter();
KvOptCellComponent = __decorate([
    core_1.Component({
        selector: "kv-opt-cell",
        template: "<button type=\"button\" class=\"btn btn-success btn-sm\" (click)=\"onSave()\" \n                      title=\"{{'admin.dict.detail.actions.update' | translate: {name: getKvPair().domainvaluecode} }}\">\n                 <i class=\"fa fa-check\"></i>\n              </button>\n              <button type=\"button\" class=\"btn btn-danger btn-sm\" (click)=\"onDelete()\" \n                      title=\"{{'admin.dict.detail.actions.delete' | translate: {name: getKvPair().domainvaluecode} }}\">\n                 <i class=\"fa fa-remove\"></i>\n              </button>"
    }),
    __metadata("design:paramtypes", [ng2_translate_1.TranslateService, dict_service_1.DictService,
        components_1.NotificationsService])
], KvOptCellComponent);
var DomainCodeEditor = (function () {
    function DomainCodeEditor() {
    }
    DomainCodeEditor.prototype.agInit = function (params) {
        this.params = params;
    };
    DomainCodeEditor.prototype.getValue = function () {
        return this.params.value;
    };
    DomainCodeEditor.prototype.isCancelBeforeStart = function () {
        return !this.params.node.data.isCodeEditable;
    };
    return DomainCodeEditor;
}());
DomainCodeEditor = __decorate([
    core_1.Component({
        selector: "domain-code-editor",
        template: "\n<input type=\"text\" [(ngModel)]=\"params.value\" />"
    }),
    __metadata("design:paramtypes", [])
], DomainCodeEditor);
exports.DomainCodeEditor = DomainCodeEditor;
var DictMgmtComponent = (function () {
    function DictMgmtComponent(i18n, dictService, notification, http) {
        var _this = this;
        this.i18n = i18n;
        this.dictService = dictService;
        this.notification = notification;
        this.http = http;
        this.dictGridColumns = [];
        this.kvGridColumns = [];
        this.options = new http_1.RequestOptions({ headers: new http_1.Headers({ 'Content-Type': 'application/json' }) });
        this.datePipe = new common_1.DatePipe(this.i18n.currentLang);
        DictOptCellComponent.refresh.subscribe(function () {
            _this.refresh(_this.dictGrid);
        });
        DictOptCellComponent.remove.subscribe(function (node) {
            if (_this.dictGrid && _this.dictGrid.api) {
                _this.dictGrid.api.removeItems([node]);
            }
        });
        KvOptCellComponent.refresh.subscribe(function () { return _this.refreshKv(_this.kvPairGrid); });
        KvOptCellComponent.remove.subscribe(function (node) {
            if (_this.kvPairGrid && _this.kvPairGrid.api) {
                _this.kvPairGrid.api.removeItems([node]);
            }
        });
        this.gridOptions = {
            overlayLoadingTemplate: "<h4 class=\"text-muted\"><i class=\"fa fa-spinner fa-spin\"></i> " + this.i18n.instant("loading") + "</h4>",
            overlayNoRowsTemplate: "<h4 class=\"text-muted\">" + this.i18n.instant("noData") + "</h4>",
        };
        this.gridOptions1 = general_util_1.Util.getLazyLoadingGridOptions("加载中", "无数据");
        this.gridOptions1.rowBuffer = 0;
        this.gridOptions1.rowSelection = "multiple";
        this.gridOptions1.rowModelType = "virtual";
        this.gridOptions1.paginationPageSize = 100;
        this.gridOptions1.cacheOverflowSize = 2;
        this.gridOptions1.maxConcurrentDatasourceRequests = 1;
        this.gridOptions1.infiniteInitialRowCount = 1000;
        this.gridOptions1.maxBlocksInCache = 10;
        this.dictGridColumns = [{
                headerName: this.i18n.instant("admin.dict.list.columns.domaincode"),
                field: "domaincode",
                editable: true,
                cellEditorFramework: {
                    component: DomainCodeEditor,
                    moduleImports: [forms_1.FormsModule]
                }
            }, {
                headerName: this.i18n.instant("admin.dict.list.columns.domainnamecn"),
                field: "domainnamecn",
                editable: true
            }, {
                headerName: this.i18n.instant("admin.dict.list.columns.domainnameen"),
                field: "domainnameen",
                editable: true
            }, {
                headerName: this.i18n.instant("admin.dict.list.columns.desc"),
                field: "remark",
                editable: true
            }, {
                headerName: this.i18n.instant("admin.dict.list.columns.cractor"),
                field: "cractor"
            }, {
                headerName: this.i18n.instant("admin.dict.list.columns.crtime"),
                field: "crtime",
                cellFormatter: function (param) { return param.value ? _this.datePipe.transform(param.value, general_util_1.Util.LONG_TIME_STRING) : ""; }
            }, {
                headerName: this.i18n.instant("admin.dict.list.columns.lastactor"),
                field: "lastactor"
            }, {
                headerName: this.i18n.instant("admin.dict.list.columns.lasttime"),
                field: "lasttime",
                cellFormatter: function (param) { return param.value ? _this.datePipe.transform(param.value, general_util_1.Util.LONG_TIME_STRING) : ""; }
            }, {
                headerName: this.i18n.instant("admin.dict.list.columns.operation"),
                field: "status",
                cellRendererFramework: {
                    component: DictOptCellComponent,
                    moduleImports: [ng2_translate_1.TranslateModule]
                }
            }];
        this.kvGridColumns = [{
                headerName: this.i18n.instant("admin.dict.detail.columns.domainvaluecode"),
                field: "domainvaluecode",
                editable: true,
                cellEditorFramework: {
                    component: DomainCodeEditor,
                    moduleImports: [forms_1.FormsModule]
                }
            }, {
                headerName: this.i18n.instant("admin.dict.detail.columns.domainvaluecn"),
                field: "domainvaluecn",
                editable: true
            }, {
                headerName: this.i18n.instant("admin.dict.detail.columns.domainvalueen"),
                field: "domainvalueen",
                editable: true
            }, {
                headerName: this.i18n.instant("admin.dict.detail.columns.remark"),
                field: "remark",
                editable: true
            }, {
                headerName: this.i18n.instant("admin.dict.detail.columns.crtime"),
                field: "crtime",
                cellFormatter: function (param) { return param.value ? _this.datePipe.transform(param.value, general_util_1.Util.LONG_TIME_STRING) : ""; }
            }, {
                headerName: this.i18n.instant("admin.dict.detail.columns.cractor"),
                field: "cractor"
            }, {
                headerName: this.i18n.instant("admin.dict.detail.columns.lasttime"),
                field: "lasttime",
                cellFormatter: function (param) { return param.value ? _this.datePipe.transform(param.value, general_util_1.Util.LONG_TIME_STRING) : ""; }
            }, {
                headerName: this.i18n.instant("admin.dict.detail.columns.lastactor"),
                field: "lastactor"
            }, {
                headerName: this.i18n.instant("admin.dict.list.columns.operation"),
                field: "status",
                cellRendererFramework: {
                    component: KvOptCellComponent,
                    moduleImports: [ng2_translate_1.TranslateModule]
                }
            }];
    }
    Object.defineProperty(DictMgmtComponent.prototype, "isShowKvDetail", {
        get: function () {
            if (this.dictGrid && this.dictGrid.api) {
                var dict = this.dictGrid.api.getSelectedRows()[0];
                if (dict) {
                    return !dict.isCodeEditable;
                }
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DictMgmtComponent.prototype, "selectedDict", {
        get: function () {
            if (this.dictGrid && this.dictGrid.api) {
                var dict = this.dictGrid.api.getSelectedRows()[0];
                return dict;
            }
            return null;
        },
        enumerable: true,
        configurable: true
    });
    DictMgmtComponent.prototype.refresh = function (grid) {
        var _this = this;
        this.isLoading = true;
        grid.api.showLoadingOverlay();
        // let ds = DictDataSource.create(this.dictService, this.notification);
        // ds.onComplete.subscribe(() => this.isLoading = false);
        // ds.onError.subscribe(error => {
        //    console.log(error);
        //    this.isLoading = false;
        // });
        // grid.api.setDatasource(ds);
        this.dictService.getDicts().finally(function () {
            _this.isLoading = false;
            if (grid.api.getModel().getRowCount() === 0) {
                grid.api.showNoRowsOverlay();
            }
        }).subscribe(function (itemSet) {
            grid.api.setRowData(itemSet.result);
        }, function (error) {
            _this.notification.alert(error.exceptionName, error.description);
        });
    };
    DictMgmtComponent.prototype.refreshKv = function (grid) {
        var _this = this;
        this.isLoading = true;
        grid.api.showLoadingOverlay();
        this.dictService.getKvPairs(this.selectedDict).finally(function () {
            if (grid.api.getModel().getRowCount() === 0) {
                grid.api.showNoRowsOverlay();
            }
        }).subscribe(function (itemSet) {
            grid.api.setRowData(itemSet.result);
        }, function (error) { return _this.notification.alert(error.exceptionName, error.description); });
    };
    DictMgmtComponent.prototype.onBtnNewClicked = function (grid) {
        grid.api.addItems([this.dictService.createDictInMemory(grid.api.getModel().getRowCount())]);
    };
    DictMgmtComponent.prototype.onBtnUpdateClicked = function (item) {
    };
    DictMgmtComponent.prototype.onDictGridReady = function (grid) {
        grid.api.sizeColumnsToFit();
        this.refresh(grid);
    };
    DictMgmtComponent.prototype.onDictGridRowSelected = function (dictGrid, kvGrid) {
        var _this = this;
        var list = dictGrid.api.getSelectedRows();
        if (list.length === 1) {
            var dict = list[0];
            if (!dict.isCodeEditable) {
                console.log(dict);
                // this.isLoading = true;
                // kvGrid.api.showLoadingOverlay();
                // this.dictService.getKvPairs(dict).finally(() => {
                //    this.isLoading = false;
                //    kvGrid.api.hideOverlay();
                // }).subscribe(itemSet => {
                //    console.log(kvGrid.api)
                //    // this.kvPairGrid
                //    kvGrid.api.setRowData(itemSet.result);
                // }, error => {
                //    this.notification.alert(error.exceptionName, error.description);
                // });
                // this.filterDicData(6,0)
                var id_1 = dict.id;
                this.http.get("/iData/api/domain/" + id_1 + "/value/0/1", this.options).subscribe(function (tdata) {
                    console.log(tdata.json());
                    var totalCount = tdata.json().total;
                    var dataSource = {
                        rowCount: null,
                        getRows: function (items) {
                            console.log("asking for " + items.startRow + " to " + items.endRow);
                            var lastRow = -1;
                            if (totalCount <= items.endRow) {
                                lastRow = totalCount;
                            }
                            _this.http.get("/iData/api/domain/" + id_1 + "/value/" + items.startRow + "/100", _this.options).subscribe(function (data) {
                                items.successCallback(data.json().result, lastRow);
                            });
                        }
                    };
                    kvGrid.api.setDatasource(dataSource);
                });
            }
        }
    };
    DictMgmtComponent.prototype.onAddKvPair = function (kvGrid) {
        var selectedDict = this.selectedDict;
        var index = kvGrid.api.getModel().getRowCount();
        var item = {};
        if (selectedDict.domaincode == 'subjectCode') {
            item = {
                domain: selectedDict.id,
                domainvaluecn: '科目_' + index,
                domainvaluecode: 'BU编码_' + index,
                domainvalueen: '科目编码_' + index,
                isCodeEditable: true
            };
        }
        else if (selectedDict.domaincode == 'productType') {
            item = {
                domain: selectedDict.id,
                domainvaluecn: '排序号_' + index,
                domainvaluecode: 'BU编码_' + index,
                domainvalueen: '产品类型_' + index,
                isCodeEditable: true
            };
        }
        else if (selectedDict.domaincode == 'costNature_cost') {
            item = {
                domain: selectedDict.id,
                domainvaluecn: '费用性质_' + index,
                domainvaluecode: 'BU编码_' + index,
                domainvalueen: '费用类别_' + index,
                isCodeEditable: true
            };
        }
        else if (selectedDict.domaincode == 'costNature_org') {
            item = {
                domain: selectedDict.id,
                domainvaluecn: '费用性质_' + index,
                domainvaluecode: 'BU编码_' + index,
                domainvalueen: '部门名称_' + index,
                isCodeEditable: true
            };
        }
        else {
            item = this.dictService.createKvPairInMemory(this.selectedDict, kvGrid.api.getModel().getRowCount());
        }
        // kvGrid.api.addItems([item]);
        kvGrid.api.insertItemsAtIndex(0, [item]);
    };
    DictMgmtComponent.prototype.onModelUpdated = function (grid) {
        if (grid && grid.api) {
            if (grid.api.getModel().getRowCount()) {
                grid.api.hideOverlay();
            }
            else {
                grid.api.showNoRowsOverlay();
            }
        }
    };
    DictMgmtComponent.prototype.onCellChanged = function (item) {
        console.log(item);
    };
    DictMgmtComponent.prototype.onCellDbClicked = function (item) {
        if (!item.data.isCodeEditable) {
            item.event.preventDefault();
        }
    };
    return DictMgmtComponent;
}());
__decorate([
    core_1.ViewChild("dictGrid"),
    __metadata("design:type", Object)
], DictMgmtComponent.prototype, "dictGrid", void 0);
__decorate([
    core_1.ViewChild("kvGrid"),
    __metadata("design:type", Object)
], DictMgmtComponent.prototype, "kvPairGrid", void 0);
__decorate([
    core_1.ViewChild("alert"),
    __metadata("design:type", alert_widget_1.AlertWidget)
], DictMgmtComponent.prototype, "alert", void 0);
DictMgmtComponent = __decorate([
    core_1.Component({
        selector: "dict-mgmt",
        templateUrl: "/views/admin/dict.mgmt.html"
    }),
    __metadata("design:paramtypes", [ng2_translate_1.TranslateService, dict_service_1.DictService,
        components_1.NotificationsService, http_1.Http])
], DictMgmtComponent);
exports.DictMgmtComponent = DictMgmtComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvZGljdC5tZ210LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7O0dBRUc7QUFDSCxzQ0FBaUU7QUFFakUsNkRBQThFO0FBQzlFLDBDQUF5QztBQUN6QyxzREFBMkM7QUFFM0MseURBQXFEO0FBQ3JELGdFQUF1RTtBQUV2RSx3Q0FBMkM7QUFFM0Msd0RBQW9EO0FBQ3BELHNDQUEwRDtBQWExRDtJQU9HLDhCQUFvQixJQUFzQixFQUFVLFdBQXdCLEVBQ3hELFlBQWtDLEVBQVMsSUFBUztRQURwRCxTQUFJLEdBQUosSUFBSSxDQUFrQjtRQUFVLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3hELGlCQUFZLEdBQVosWUFBWSxDQUFzQjtRQUFTLFNBQUksR0FBSixJQUFJLENBQUs7SUFBRyxDQUFDO0lBRzVFLHFDQUFNLEdBQU4sVUFBTyxNQUFXO1FBQ2YsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsSUFBSSxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDO0lBQ3pCLENBQUM7SUFFRCxzQ0FBTyxHQUFQLFVBQVEsTUFBVztRQUNoQixJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxzQ0FBTyxHQUFQO1FBQ0csTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO0lBQzNCLENBQUM7SUFFRCxxQ0FBTSxHQUFOO1FBQUEsaUJBOEJDO1FBN0JFLElBQUksQ0FBQyxHQUFHLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztRQUU5QixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFFMUIsV0FBVztRQUNYLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLCtCQUErQjtZQUMvQixJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUM7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aWxlIjoiY29tcG9uZW50cy9kaWN0Lm1nbXQuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDcmVhdGVkIGJ5IHpob25ncGluZy5sdSBvbiAxMC8xOC8yMDE2LlxuICovXG5pbXBvcnQge0NvbXBvbmVudCwgVmlld0NoaWxkLCBFdmVudEVtaXR0ZXJ9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge0dyaWRPcHRpb25zLCBDb2xEZWYsIEdyaWRBcGksIFJvd05vZGV9IGZyb20gXCJhZy1ncmlkL21haW5cIjtcbmltcG9ydCB7VHJhbnNsYXRlU2VydmljZSwgVHJhbnNsYXRlTW9kdWxlfSBmcm9tIFwibmcyLXRyYW5zbGF0ZS9uZzItdHJhbnNsYXRlXCI7XG5pbXBvcnQge0RhdGVQaXBlfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uXCI7XG5pbXBvcnQge1V0aWx9IGZyb20gXCIuLi91dGlscy9nZW5lcmFsLnV0aWxcIjtcbmltcG9ydCB7RGF0YURpY3Rpb25hcnksIEt2UGFpcn0gZnJvbSBcIi4uL21vZGVscy9kaWN0Lm1vZGVsXCI7XG5pbXBvcnQge0RpY3RTZXJ2aWNlfSBmcm9tIFwiLi4vc2VydmljZXMvZGljdC5zZXJ2aWNlXCI7XG5pbXBvcnQge05vdGlmaWNhdGlvbnNTZXJ2aWNlfSBmcm9tIFwiYW5ndWxhcjItbm90aWZpY2F0aW9ucy9jb21wb25lbnRzXCI7XG5pbXBvcnQge0FnUmVuZGVyZXJDb21wb25lbnQsIEFnRWRpdG9yQ29tcG9uZW50fSBmcm9tIFwiYWctZ3JpZC1uZzJcIjtcbmltcG9ydCB7Rm9ybXNNb2R1bGV9IGZyb20gXCJAYW5ndWxhci9mb3Jtc1wiO1xuaW1wb3J0IHtHZW5lcmFsRXhjZXB0aW9ufSBmcm9tIFwiLi4vbW9kZWxzL2V4Y2VwdGlvbi5tb2RlbFwiO1xuaW1wb3J0IHtBbGVydFdpZGdldH0gZnJvbSBcIi4uL3dpZGdldHMvYWxlcnQud2lkZ2V0XCI7XG5pbXBvcnQge0h0dHAsUmVxdWVzdE9wdGlvbnMsSGVhZGVyc30gZnJvbSBcIkBhbmd1bGFyL2h0dHBcIjtcblxuQENvbXBvbmVudCh7XG4gICBzZWxlY3RvcjogXCJkaWN0LW9wdC1jZWxsXCIsXG4gICB0ZW1wbGF0ZTogYDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1zdWNjZXNzIGJ0bi1zbVwiIChjbGljayk9XCJvblNhdmUoKVwiIFxuICAgICAgICAgICAgICAgICAgICAgIHRpdGxlPVwie3snYWRtaW4uZGljdC5saXN0LmFjdGlvbnMudXBkYXRlJyB8IHRyYW5zbGF0ZToge25hbWU6IGdldERpY3QoKS5kb21haW5jb2RlfSB9fVwiPlxuICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhIGZhLWNoZWNrXCI+PC9pPlxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRhbmdlciBidG4tc21cIiAoY2xpY2spPVwib25EZWxldGUoKVwiIFxuICAgICAgICAgICAgICAgICAgICAgIHRpdGxlPVwie3snYWRtaW4uZGljdC5saXN0LmFjdGlvbnMuZGVsZXRlJyB8IHRyYW5zbGF0ZToge25hbWU6IGdldERpY3QoKS5kb21haW5jb2RlfSB9fVwiPlxuICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhIGZhLXJlbW92ZVwiPjwvaT5cbiAgICAgICAgICAgICAgPC9idXR0b24+YFxufSlcbmNsYXNzIERpY3RPcHRDZWxsQ29tcG9uZW50IGltcGxlbWVudHMgQWdSZW5kZXJlckNvbXBvbmVudCB7XG4gICBzdGF0aWMgcmVmcmVzaDogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPiAoKTtcbiAgIHN0YXRpYyByZW1vdmU6IEV2ZW50RW1pdHRlcjxSb3dOb2RlPiA9IG5ldyBFdmVudEVtaXR0ZXI8Um93Tm9kZT4gKCk7XG5cbiAgIHBhcmFtczogYW55O1xuICAgYXBpOiBHcmlkQXBpO1xuXG4gICBjb25zdHJ1Y3Rvcihwcml2YXRlIGkxOG46IFRyYW5zbGF0ZVNlcnZpY2UsIHByaXZhdGUgZGljdFNlcnZpY2U6IERpY3RTZXJ2aWNlLFxuICAgICAgICAgICAgICAgcHJpdmF0ZSBub3RpZmljYXRpb246IE5vdGlmaWNhdGlvbnNTZXJ2aWNlLHByaXZhdGUgaHR0cDpIdHRwKSB7fVxuXG5cbiAgIGFnSW5pdChwYXJhbXM6IGFueSk6IHZvaWQge1xuICAgICAgdGhpcy5wYXJhbXMgPSBwYXJhbXM7XG4gICAgICB0aGlzLmFwaSA9IHBhcmFtcy5hcGk7XG4gICB9XG5cbiAgIHJlZnJlc2gocGFyYW1zOiBhbnkpOiB2b2lkIHtcbiAgICAgIHRoaXMuYWdJbml0KHBhcmFtcyk7XG4gICB9XG5cbiAgIGdldERpY3QoKTogRGF0YURpY3Rpb25hcnkge1xuICAgICAgcmV0dXJuIHRoaXMucGFyYW1zLmRhdGE7XG4gICB9XG5cbiAgIG9uU2F2ZSgpIHtcbiAgICAgIHRoaXMuYXBpLnNob3dMb2FkaW5nT3ZlcmxheSgpO1xuXG4gICAgICBsZXQgZGljdCA9IHRoaXMuZ2V0RGljdCgpO1xuXG4gICAgICAvLyBDcmVhdGlvblxuICAgICAgaWYgKGRpY3QuaXNDb2RlRWRpdGFibGUpIHtcbiAgICAgICAgIC8vIGRpY3QuaXNDb2RlRWRpdGFibGUgPSBmYWxzZTtcbiAgICAgICAgIHRoaXMuZGljdFNlcnZpY2UuY3JlYXRlRGljdChkaWN0KVxuICAgICAgICAgICAgLmZpbmFsbHkoKCkgPT4ge1xuICAgICAgICAgICAgICAgRGljdE9wdENlbGxDb21wb25lbnQucmVmcmVzaC5lbWl0KCk7XG4gICAgICAgICAgICAgICB0aGlzLmFwaS5oaWRlT3ZlcmxheSgpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAoKSA9PiB7fSxcbiAgICAgICAgICAgICAgIChlcnJvcjogR2VuZXJhbEV4Y2VwdGlvbikgPT4gdGhpcy5ub3RpZmljYXRpb24uYWxlcnQoZXJyb3IuZXhjZXB0aW9uTmFtZSwgZXJyb3IuZGVzY3JpcHRpb24pXG4gICAgICAgICAgICApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgIC8vIFVwZGF0ZVxuICAgICAgICAgdGhpcy5kaWN0U2VydmljZS51cGRhdGVEaWN0KHRoaXMuZ2V0RGljdCgpKVxuICAgICAgICAgICAgLmZpbmFsbHkoKCkgPT4ge1xuICAgICAgICAgICAgICAgRGljdE9wdENlbGxDb21wb25lbnQucmVmcmVzaC5lbWl0KCk7XG4gICAgICAgICAgICAgICB0aGlzLmFwaS5oaWRlT3ZlcmxheSgpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAoKSA9PiB7fSxcbiAgICAgICAgICAgICAgIChlcnJvcjogR2VuZXJhbEV4Y2VwdGlvbikgPT4gdGhpcy5ub3RpZmljYXRpb24uYWxlcnQoZXJyb3IuZXhjZXB0aW9uTmFtZSwgZXJyb3IuZGVzY3JpcHRpb24pXG4gICAgICAgICAgICApO1xuXG4gICAgICB9XG4gICB9XG5cbiAgIG9uRGVsZXRlKCkge1xuICAgICAgbGV0IGRpY3QgPSB0aGlzLmdldERpY3QoKTtcblxuICAgICAgLy8gSW4gbWVtb3J5IHJlbW92ZVxuICAgICAgaWYgKGRpY3QuaXNDb2RlRWRpdGFibGUpIHtcbiAgICAgICAgIERpY3RPcHRDZWxsQ29tcG9uZW50LnJlbW92ZS5lbWl0KHRoaXMucGFyYW1zLm5vZGUpO1xuICAgICAgICAgLy8gdGhpcy5hcGkucmVmcmVzaFZpZXcoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICAvLyBJbnZva2UgYXBpIHRvIHJlbW92ZSBmcm9tIHNlcnZlIHNpZGVcbiAgICAgICAgIHRoaXMuYXBpLnNob3dMb2FkaW5nT3ZlcmxheSgpO1xuXG4gICAgICAgICB0aGlzLmRpY3RTZXJ2aWNlLmRlbGV0ZURpY3QodGhpcy5nZXREaWN0KCkpXG4gICAgICAgICAgICAuZmluYWxseSgoKSA9PiB7XG4gICAgICAgICAgICAgICBEaWN0T3B0Q2VsbENvbXBvbmVudC5yZWZyZXNoLmVtaXQoKTtcbiAgICAgICAgICAgICAgIHRoaXMuYXBpLmhpZGVPdmVybGF5KCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICgpID0+IHt9LFxuICAgICAgICAgICAgICAgKGVycm9yOiBHZW5lcmFsRXhjZXB0aW9uKSA9PiB0aGlzLm5vdGlmaWNhdGlvbi5hbGVydChlcnJvci5leGNlcHRpb25OYW1lLCBlcnJvci5kZXNjcmlwdGlvbilcbiAgICAgICAgICAgICk7XG4gICAgICB9XG4gICB9XG59XG5cbkBDb21wb25lbnQoe1xuICAgc2VsZWN0b3I6IFwia3Ytb3B0LWNlbGxcIixcbiAgIHRlbXBsYXRlOiBgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLXN1Y2Nlc3MgYnRuLXNtXCIgKGNsaWNrKT1cIm9uU2F2ZSgpXCIgXG4gICAgICAgICAgICAgICAgICAgICAgdGl0bGU9XCJ7eydhZG1pbi5kaWN0LmRldGFpbC5hY3Rpb25zLnVwZGF0ZScgfCB0cmFuc2xhdGU6IHtuYW1lOiBnZXRLdlBhaXIoKS5kb21haW52YWx1ZWNvZGV9IH19XCI+XG4gICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmEgZmEtY2hlY2tcIj48L2k+XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGFuZ2VyIGJ0bi1zbVwiIChjbGljayk9XCJvbkRlbGV0ZSgpXCIgXG4gICAgICAgICAgICAgICAgICAgICAgdGl0bGU9XCJ7eydhZG1pbi5kaWN0LmRldGFpbC5hY3Rpb25zLmRlbGV0ZScgfCB0cmFuc2xhdGU6IHtuYW1lOiBnZXRLdlBhaXIoKS5kb21haW52YWx1ZWNvZGV9IH19XCI+XG4gICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmEgZmEtcmVtb3ZlXCI+PC9pPlxuICAgICAgICAgICAgICA8L2J1dHRvbj5gXG59KVxuY2xhc3MgS3ZPcHRDZWxsQ29tcG9uZW50IGltcGxlbWVudHMgQWdSZW5kZXJlckNvbXBvbmVudCB7XG4gICBzdGF0aWMgcmVmcmVzaDogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPiAoKTtcbiAgIHN0YXRpYyByZW1vdmU6IEV2ZW50RW1pdHRlcjxSb3dOb2RlPiA9IG5ldyBFdmVudEVtaXR0ZXI8Um93Tm9kZT4gKCk7XG5cbiAgIHBhcmFtczogYW55O1xuICAgYXBpOiBHcmlkQXBpO1xuXG4gICBjb25zdHJ1Y3Rvcihwcml2YXRlIGkxOG46IFRyYW5zbGF0ZVNlcnZpY2UsIHByaXZhdGUgZGljdFNlcnZpY2U6IERpY3RTZXJ2aWNlLFxuICAgICAgICAgICAgICAgcHJpdmF0ZSBub3RpZmljYXRpb246IE5vdGlmaWNhdGlvbnNTZXJ2aWNlKSB7fVxuXG5cbiAgIGFnSW5pdChwYXJhbXM6IGFueSk6IHZvaWQge1xuICAgICAgdGhpcy5wYXJhbXMgPSBwYXJhbXM7XG4gICAgICB0aGlzLmFwaSA9IHBhcmFtcy5hcGk7XG4gICB9XG5cbiAgIHJlZnJlc2gocGFyYW1zOiBhbnkpOiB2b2lkIHtcbiAgICAgIHRoaXMuYWdJbml0KHBhcmFtcyk7XG4gICB9XG5cbiAgIGdldEt2UGFpcigpOiBLdlBhaXIge1xuICAgICAgcmV0dXJuIHRoaXMucGFyYW1zLmRhdGE7XG4gICB9XG5cbiAgIG9uU2F2ZSgpIHtcbiAgICAgIHRoaXMuYXBpLnNob3dMb2FkaW5nT3ZlcmxheSgpO1xuXG4gICAgICBsZXQgcGFpciA9IHRoaXMucGFyYW1zLmRhdGE7XG5cbiAgICAgIC8vIENyZWF0aW9uXG4gICAgICBpZiAocGFpci5pc0NvZGVFZGl0YWJsZSkge1xuICAgICAgICAgLy8gZGljdC5pc0NvZGVFZGl0YWJsZSA9IGZhbHNlO1xuICAgICAgICAgdGhpcy5kaWN0U2VydmljZS5jcmVhdGVLdlBhaXIocGFpcilcbiAgICAgICAgICAgIC5maW5hbGx5KCgpID0+IHtcbiAgICAgICAgICAgICAgIEt2T3B0Q2VsbENvbXBvbmVudC5yZWZyZXNoLmVtaXQoKTtcbiAgICAgICAgICAgICAgIHRoaXMuYXBpLmhpZGVPdmVybGF5KCk7XG4gICAgICAgICAgICB9KS5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAoKSA9PiB7fSxcbiAgICAgICAgICAgICAgIChlcnJvcjogR2VuZXJhbEV4Y2VwdGlvbikgPT4gdGhpcy5ub3RpZmljYXRpb24uYWxlcnQoZXJyb3IuZXhjZXB0aW9uTmFtZSwgZXJyb3IuZGVzY3JpcHRpb24pKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICAvLyBVcGRhdGVcbiAgICAgICAgIHRoaXMuZGljdFNlcnZpY2UudXBkYXRlS3ZQYWlyKHBhaXIpXG4gICAgICAgICAgICAuZmluYWxseSgoKSA9PiB7XG4gICAgICAgICAgICAgICBLdk9wdENlbGxDb21wb25lbnQucmVmcmVzaC5lbWl0KCk7XG4gICAgICAgICAgICAgICB0aGlzLmFwaS5oaWRlT3ZlcmxheSgpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAoKSA9PiB7fSxcbiAgICAgICAgICAgICAgIChlcnJvcjogR2VuZXJhbEV4Y2VwdGlvbikgPT4gdGhpcy5ub3RpZmljYXRpb24uYWxlcnQoZXJyb3IuZXhjZXB0aW9uTmFtZSwgZXJyb3IuZGVzY3JpcHRpb24pXG4gICAgICAgICAgICApO1xuXG4gICAgICB9XG4gICB9XG5cbiAgIG9uRGVsZXRlKCkge1xuICAgICAgbGV0IHBhaXIgPSB0aGlzLnBhcmFtcy5kYXRhO1xuXG4gICAgICAvLyBJbiBtZW1vcnkgcmVtb3ZlXG4gICAgICBpZiAocGFpci5pc0NvZGVFZGl0YWJsZSkge1xuICAgICAgICAgS3ZPcHRDZWxsQ29tcG9uZW50LnJlbW92ZS5lbWl0KHRoaXMucGFyYW1zLm5vZGUpO1xuICAgICAgICAgLy8gdGhpcy5hcGkucmVmcmVzaFZpZXcoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICAvLyBJbnZva2UgYXBpIHRvIHJlbW92ZSBmcm9tIHNlcnZlIHNpZGVcbiAgICAgICAgIHRoaXMuYXBpLnNob3dMb2FkaW5nT3ZlcmxheSgpO1xuXG4gICAgICAgICB0aGlzLmRpY3RTZXJ2aWNlLmRlbGV0ZUt2UGFpcihwYWlyKVxuICAgICAgICAgICAgLmZpbmFsbHkoKCkgPT4ge1xuICAgICAgICAgICAgICAgS3ZPcHRDZWxsQ29tcG9uZW50LnJlZnJlc2guZW1pdCgpO1xuICAgICAgICAgICAgICAgdGhpcy5hcGkuaGlkZU92ZXJsYXkoKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgKCkgPT4ge30sXG4gICAgICAgICAgICAgICAoZXJyb3I6IEdlbmVyYWxFeGNlcHRpb24pID0+IHRoaXMubm90aWZpY2F0aW9uLmFsZXJ0KGVycm9yLmV4Y2VwdGlvbk5hbWUsIGVycm9yLmRlc2NyaXB0aW9uKVxuICAgICAgICAgICAgKTtcbiAgICAgIH1cbiAgIH1cbn1cblxuXG5AQ29tcG9uZW50KHtcbiAgIHNlbGVjdG9yOiBcImRvbWFpbi1jb2RlLWVkaXRvclwiLFxuICAgdGVtcGxhdGU6IGBcbjxpbnB1dCB0eXBlPVwidGV4dFwiIFsobmdNb2RlbCldPVwicGFyYW1zLnZhbHVlXCIgLz5gXG59KVxuZXhwb3J0IGNsYXNzIERvbWFpbkNvZGVFZGl0b3IgaW1wbGVtZW50cyBBZ0VkaXRvckNvbXBvbmVudCB7XG4gICBwYXJhbXM6IGFueTtcblxuICAgYWdJbml0KHBhcmFtczogYW55KTogdm9pZCB7XG4gICAgICB0aGlzLnBhcmFtcyA9IHBhcmFtcztcbiAgIH1cblxuICAgZ2V0VmFsdWUoKTogYW55IHtcbiAgICAgIHJldHVybiB0aGlzLnBhcmFtcy52YWx1ZTtcbiAgIH1cblxuICAgaXNDYW5jZWxCZWZvcmVTdGFydCgpOiBib29sZWFuIHtcbiAgICAgIHJldHVybiAhdGhpcy5wYXJhbXMubm9kZS5kYXRhLmlzQ29kZUVkaXRhYmxlO1xuICAgfVxufVxuXG5cbkBDb21wb25lbnQoe1xuICAgc2VsZWN0b3I6IFwiZGljdC1tZ210XCIsXG4gICB0ZW1wbGF0ZVVybDogXCIvdmlld3MvYWRtaW4vZGljdC5tZ210Lmh0bWxcIlxufSlcbmV4cG9ydCBjbGFzcyBEaWN0TWdtdENvbXBvbmVudCB7XG5cbiAgIEBWaWV3Q2hpbGQoXCJkaWN0R3JpZFwiKVxuICAgZGljdEdyaWQ6IEdyaWRPcHRpb25zO1xuXG4gICBAVmlld0NoaWxkKFwia3ZHcmlkXCIpXG4gICBrdlBhaXJHcmlkOiBHcmlkT3B0aW9ucztcblxuICAgQFZpZXdDaGlsZChcImFsZXJ0XCIpXG4gICBhbGVydDogQWxlcnRXaWRnZXQ7XG5cbiAgIGlzQnRuVXBsb2FkRW5hYmxlZDogYm9vbGVhbjtcbiAgIGlzTG9hZGluZzogYm9vbGVhbjtcbiAgIGdyaWRPcHRpb25zOiBHcmlkT3B0aW9ucztcbiAgIGdyaWRPcHRpb25zMTogR3JpZE9wdGlvbnM7XG4gICBkaWN0R3JpZENvbHVtbnM6IENvbERlZltdID0gW107XG4gICBrdkdyaWRDb2x1bW5zOiBDb2xEZWZbXSA9IFtdO1xuICAgb3B0aW9ucyA9IG5ldyBSZXF1ZXN0T3B0aW9ucyh7IGhlYWRlcnM6IG5ldyBIZWFkZXJzKHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyB9KSB9KTtcblxuICAgcHJpdmF0ZSBkYXRlUGlwZSA9IG5ldyBEYXRlUGlwZSh0aGlzLmkxOG4uY3VycmVudExhbmcpO1xuXG4gICBjb25zdHJ1Y3Rvcihwcml2YXRlIGkxOG46IFRyYW5zbGF0ZVNlcnZpY2UsIHByaXZhdGUgZGljdFNlcnZpY2U6IERpY3RTZXJ2aWNlLFxuICAgICAgICAgICAgICAgcHJpdmF0ZSBub3RpZmljYXRpb246IE5vdGlmaWNhdGlvbnNTZXJ2aWNlLHByaXZhdGUgaHR0cDpIdHRwKSB7XG5cbiAgICAgIERpY3RPcHRDZWxsQ29tcG9uZW50LnJlZnJlc2guc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgIHRoaXMucmVmcmVzaCh0aGlzLmRpY3RHcmlkKTtcbiAgICAgIH0pO1xuXG4gICAgICBEaWN0T3B0Q2VsbENvbXBvbmVudC5yZW1vdmUuc3Vic2NyaWJlKG5vZGUgPT4ge1xuICAgICAgICAgaWYgKHRoaXMuZGljdEdyaWQgJiYgdGhpcy5kaWN0R3JpZC5hcGkpIHtcbiAgICAgICAgICAgIHRoaXMuZGljdEdyaWQuYXBpLnJlbW92ZUl0ZW1zKFtub2RlXSk7XG4gICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgS3ZPcHRDZWxsQ29tcG9uZW50LnJlZnJlc2guc3Vic2NyaWJlKCgpID0+IHRoaXMucmVmcmVzaEt2KHRoaXMua3ZQYWlyR3JpZCkpO1xuICAgICAgS3ZPcHRDZWxsQ29tcG9uZW50LnJlbW92ZS5zdWJzY3JpYmUobm9kZSA9PiB7XG4gICAgICAgICBpZiAodGhpcy5rdlBhaXJHcmlkICYmIHRoaXMua3ZQYWlyR3JpZC5hcGkpIHtcbiAgICAgICAgICAgIHRoaXMua3ZQYWlyR3JpZC5hcGkucmVtb3ZlSXRlbXMoW25vZGVdKTtcbiAgICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLmdyaWRPcHRpb25zID0ge1xuICAgICAgICAgb3ZlcmxheUxvYWRpbmdUZW1wbGF0ZTogYDxoNCBjbGFzcz1cInRleHQtbXV0ZWRcIj48aSBjbGFzcz1cImZhIGZhLXNwaW5uZXIgZmEtc3BpblwiPjwvaT4gJHt0aGlzLmkxOG4uaW5zdGFudChcImxvYWRpbmdcIil9PC9oND5gLFxuICAgICAgICAgb3ZlcmxheU5vUm93c1RlbXBsYXRlOiBgPGg0IGNsYXNzPVwidGV4dC1tdXRlZFwiPiR7dGhpcy5pMThuLmluc3RhbnQoXCJub0RhdGFcIil9PC9oND5gLFxuICAgICAgICAgLy8gcm93TW9kZWxUeXBlOiBcInZpcnR1YWxcIixcbiAgICAgICAgIC8vIHBhZ2luYXRpb25QYWdlU2l6ZTogMjAsXG4gICAgICAgICAvLyBwYWdpbmF0aW9uT3ZlcmZsb3dTaXplOiAxLFxuICAgICAgICAgLy8gbWF4Q29uY3VycmVudERhdGFzb3VyY2VSZXF1ZXN0czogMixcbiAgICAgICAgIC8vIHBhZ2luYXRpb25Jbml0aWFsUm93Q291bnQ6IDEsXG4gICAgICAgICAvLyBtYXhQYWdlc0luQ2FjaGU6IDEwLFxuICAgICAgfTtcblxuICAgICAgdGhpcy5ncmlkT3B0aW9uczEgPSBVdGlsLmdldExhenlMb2FkaW5nR3JpZE9wdGlvbnMoXG4gICAgICAgICBcIuWKoOi9veS4rVwiLFxuICAgICAgICAgXCLml6DmlbDmja5cIlxuICAgICAgKTtcbiAgICB0aGlzLmdyaWRPcHRpb25zMS5yb3dCdWZmZXIgPSAwO1xuICAgIHRoaXMuZ3JpZE9wdGlvbnMxLnJvd1NlbGVjdGlvbiA9IFwibXVsdGlwbGVcIjtcbiAgICB0aGlzLmdyaWRPcHRpb25zMS5yb3dNb2RlbFR5cGUgPSBcInZpcnR1YWxcIjtcbiAgICB0aGlzLmdyaWRPcHRpb25zMS5wYWdpbmF0aW9uUGFnZVNpemUgPSAxMDA7XG4gICAgdGhpcy5ncmlkT3B0aW9uczEuY2FjaGVPdmVyZmxvd1NpemUgPSAyO1xuICAgIHRoaXMuZ3JpZE9wdGlvbnMxLm1heENvbmN1cnJlbnREYXRhc291cmNlUmVxdWVzdHMgPSAxO1xuICAgIHRoaXMuZ3JpZE9wdGlvbnMxLmluZmluaXRlSW5pdGlhbFJvd0NvdW50ID0gMTAwMDtcbiAgICB0aGlzLmdyaWRPcHRpb25zMS5tYXhCbG9ja3NJbkNhY2hlID0gMTA7XG5cbiAgICAgIHRoaXMuZGljdEdyaWRDb2x1bW5zID0gW3tcbiAgICAgICAgIGhlYWRlck5hbWU6IHRoaXMuaTE4bi5pbnN0YW50KFwiYWRtaW4uZGljdC5saXN0LmNvbHVtbnMuZG9tYWluY29kZVwiKSxcbiAgICAgICAgIGZpZWxkOiBcImRvbWFpbmNvZGVcIixcbiAgICAgICAgIGVkaXRhYmxlOiB0cnVlLFxuICAgICAgICAgY2VsbEVkaXRvckZyYW1ld29yazoge1xuICAgICAgICAgICAgY29tcG9uZW50OiBEb21haW5Db2RlRWRpdG9yLFxuICAgICAgICAgICAgbW9kdWxlSW1wb3J0czogW0Zvcm1zTW9kdWxlXVxuICAgICAgICAgfVxuICAgICAgfSwge1xuICAgICAgICAgaGVhZGVyTmFtZTogdGhpcy5pMThuLmluc3RhbnQoXCJhZG1pbi5kaWN0Lmxpc3QuY29sdW1ucy5kb21haW5uYW1lY25cIiksXG4gICAgICAgICBmaWVsZDogXCJkb21haW5uYW1lY25cIixcbiAgICAgICAgIGVkaXRhYmxlOiB0cnVlXG4gICAgICB9LCB7XG4gICAgICAgICBoZWFkZXJOYW1lOiB0aGlzLmkxOG4uaW5zdGFudChcImFkbWluLmRpY3QubGlzdC5jb2x1bW5zLmRvbWFpbm5hbWVlblwiKSxcbiAgICAgICAgIGZpZWxkOiBcImRvbWFpbm5hbWVlblwiLFxuICAgICAgICAgZWRpdGFibGU6IHRydWVcbiAgICAgIH0sIHtcbiAgICAgICAgIGhlYWRlck5hbWU6IHRoaXMuaTE4bi5pbnN0YW50KFwiYWRtaW4uZGljdC5saXN0LmNvbHVtbnMuZGVzY1wiKSxcbiAgICAgICAgIGZpZWxkOiBcInJlbWFya1wiLFxuICAgICAgICAgZWRpdGFibGU6IHRydWVcbiAgICAgIH0sIHtcbiAgICAgICAgIGhlYWRlck5hbWU6IHRoaXMuaTE4bi5pbnN0YW50KFwiYWRtaW4uZGljdC5saXN0LmNvbHVtbnMuY3JhY3RvclwiKSxcbiAgICAgICAgIGZpZWxkOiBcImNyYWN0b3JcIlxuICAgICAgfSwge1xuICAgICAgICAgaGVhZGVyTmFtZTogdGhpcy5pMThuLmluc3RhbnQoXCJhZG1pbi5kaWN0Lmxpc3QuY29sdW1ucy5jcnRpbWVcIiksXG4gICAgICAgICBmaWVsZDogXCJjcnRpbWVcIixcbiAgICAgICAgIGNlbGxGb3JtYXR0ZXI6IHBhcmFtID0+IHBhcmFtLnZhbHVlID8gdGhpcy5kYXRlUGlwZS50cmFuc2Zvcm0ocGFyYW0udmFsdWUsIFV0aWwuTE9OR19USU1FX1NUUklORykgOiBcIlwiXG4gICAgICB9LCB7XG4gICAgICAgICBoZWFkZXJOYW1lOiB0aGlzLmkxOG4uaW5zdGFudChcImFkbWluLmRpY3QubGlzdC5jb2x1bW5zLmxhc3RhY3RvclwiKSxcbiAgICAgICAgIGZpZWxkOiBcImxhc3RhY3RvclwiXG4gICAgICB9LCB7XG4gICAgICAgICBoZWFkZXJOYW1lOiB0aGlzLmkxOG4uaW5zdGFudChcImFkbWluLmRpY3QubGlzdC5jb2x1bW5zLmxhc3R0aW1lXCIpLFxuICAgICAgICAgZmllbGQ6IFwibGFzdHRpbWVcIixcbiAgICAgICAgIGNlbGxGb3JtYXR0ZXI6IHBhcmFtID0+IHBhcmFtLnZhbHVlID8gdGhpcy5kYXRlUGlwZS50cmFuc2Zvcm0ocGFyYW0udmFsdWUsIFV0aWwuTE9OR19USU1FX1NUUklORykgOiBcIlwiXG4gICAgICB9LCB7XG4gICAgICAgICBoZWFkZXJOYW1lOiB0aGlzLmkxOG4uaW5zdGFudChcImFkbWluLmRpY3QubGlzdC5jb2x1bW5zLm9wZXJhdGlvblwiKSxcbiAgICAgICAgIGZpZWxkOiBcInN0YXR1c1wiLFxuICAgICAgICAgY2VsbFJlbmRlcmVyRnJhbWV3b3JrOiB7XG4gICAgICAgICAgICBjb21wb25lbnQ6IERpY3RPcHRDZWxsQ29tcG9uZW50LFxuICAgICAgICAgICAgbW9kdWxlSW1wb3J0czogW1RyYW5zbGF0ZU1vZHVsZV1cbiAgICAgICAgIH1cbiAgICAgIH1dO1xuXG4gICAgICB0aGlzLmt2R3JpZENvbHVtbnMgPSBbe1xuICAgICAgICAgaGVhZGVyTmFtZTogdGhpcy5pMThuLmluc3RhbnQoXCJhZG1pbi5kaWN0LmRldGFpbC5jb2x1bW5zLmRvbWFpbnZhbHVlY29kZVwiKSxcbiAgICAgICAgIGZpZWxkOiBcImRvbWFpbnZhbHVlY29kZVwiLFxuICAgICAgICAgZWRpdGFibGU6IHRydWUsXG4gICAgICAgICBjZWxsRWRpdG9yRnJhbWV3b3JrOiB7XG4gICAgICAgICAgICBjb21wb25lbnQ6IERvbWFpbkNvZGVFZGl0b3IsXG4gICAgICAgICAgICBtb2R1bGVJbXBvcnRzOiBbRm9ybXNNb2R1bGVdXG4gICAgICAgICB9XG4gICAgICB9LCB7XG4gICAgICAgICBoZWFkZXJOYW1lOiB0aGlzLmkxOG4uaW5zdGFudChcImFkbWluLmRpY3QuZGV0YWlsLmNvbHVtbnMuZG9tYWludmFsdWVjblwiKSxcbiAgICAgICAgIGZpZWxkOiBcImRvbWFpbnZhbHVlY25cIixcbiAgICAgICAgIGVkaXRhYmxlOiB0cnVlXG4gICAgICB9LCB7XG4gICAgICAgICBoZWFkZXJOYW1lOiB0aGlzLmkxOG4uaW5zdGFudChcImFkbWluLmRpY3QuZGV0YWlsLmNvbHVtbnMuZG9tYWludmFsdWVlblwiKSxcbiAgICAgICAgIGZpZWxkOiBcImRvbWFpbnZhbHVlZW5cIixcbiAgICAgICAgIGVkaXRhYmxlOiB0cnVlXG4gICAgICB9LCB7XG4gICAgICAgICBoZWFkZXJOYW1lOiB0aGlzLmkxOG4uaW5zdGFudChcImFkbWluLmRpY3QuZGV0YWlsLmNvbHVtbnMucmVtYXJrXCIpLFxuICAgICAgICAgZmllbGQ6IFwicmVtYXJrXCIsXG4gICAgICAgICBlZGl0YWJsZTogdHJ1ZVxuICAgICAgfSwge1xuICAgICAgICAgaGVhZGVyTmFtZTogdGhpcy5pMThuLmluc3RhbnQoXCJhZG1pbi5kaWN0LmRldGFpbC5jb2x1bW5zLmNydGltZVwiKSxcbiAgICAgICAgIGZpZWxkOiBcImNydGltZVwiLFxuICAgICAgICAgY2VsbEZvcm1hdHRlcjogcGFyYW0gPT4gcGFyYW0udmFsdWUgPyB0aGlzLmRhdGVQaXBlLnRyYW5zZm9ybShwYXJhbS52YWx1ZSwgVXRpbC5MT05HX1RJTUVfU1RSSU5HKSA6IFwiXCJcbiAgICAgIH0sIHtcbiAgICAgICAgIGhlYWRlck5hbWU6IHRoaXMuaTE4bi5pbnN0YW50KFwiYWRtaW4uZGljdC5kZXRhaWwuY29sdW1ucy5jcmFjdG9yXCIpLFxuICAgICAgICAgZmllbGQ6IFwiY3JhY3RvclwiXG4gICAgICB9LCB7XG4gICAgICAgICBoZWFkZXJOYW1lOiB0aGlzLmkxOG4uaW5zdGFudChcImFkbWluLmRpY3QuZGV0YWlsLmNvbHVtbnMubGFzdHRpbWVcIiksXG4gICAgICAgICBmaWVsZDogXCJsYXN0dGltZVwiLFxuICAgICAgICAgY2VsbEZvcm1hdHRlcjogcGFyYW0gPT4gcGFyYW0udmFsdWUgPyB0aGlzLmRhdGVQaXBlLnRyYW5zZm9ybShwYXJhbS52YWx1ZSwgVXRpbC5MT05HX1RJTUVfU1RSSU5HKSA6IFwiXCJcbiAgICAgIH0sIHtcbiAgICAgICAgIGhlYWRlck5hbWU6IHRoaXMuaTE4bi5pbnN0YW50KFwiYWRtaW4uZGljdC5kZXRhaWwuY29sdW1ucy5sYXN0YWN0b3JcIiksXG4gICAgICAgICBmaWVsZDogXCJsYXN0YWN0b3JcIlxuICAgICAgfSwge1xuICAgICAgICAgaGVhZGVyTmFtZTogdGhpcy5pMThuLmluc3RhbnQoXCJhZG1pbi5kaWN0Lmxpc3QuY29sdW1ucy5vcGVyYXRpb25cIiksXG4gICAgICAgICBmaWVsZDogXCJzdGF0dXNcIixcbiAgICAgICAgIGNlbGxSZW5kZXJlckZyYW1ld29yazoge1xuICAgICAgICAgICAgY29tcG9uZW50OiBLdk9wdENlbGxDb21wb25lbnQsXG4gICAgICAgICAgICBtb2R1bGVJbXBvcnRzOiBbVHJhbnNsYXRlTW9kdWxlXVxuICAgICAgICAgfVxuICAgICAgfV07XG4gICB9XG5cbiAgIGdldCBpc1Nob3dLdkRldGFpbCgpOiBib29sZWFuIHtcbiAgICAgIGlmICh0aGlzLmRpY3RHcmlkICYmIHRoaXMuZGljdEdyaWQuYXBpKSB7XG4gICAgICAgICBsZXQgW2RpY3RdID0gdGhpcy5kaWN0R3JpZC5hcGkuZ2V0U2VsZWN0ZWRSb3dzKCk7XG5cbiAgICAgICAgIGlmIChkaWN0KSB7XG4gICAgICAgICAgICByZXR1cm4gIWRpY3QuaXNDb2RlRWRpdGFibGU7XG4gICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgIH1cblxuICAgZ2V0IHNlbGVjdGVkRGljdCgpOiBEYXRhRGljdGlvbmFyeSB7XG4gICAgICBpZiAodGhpcy5kaWN0R3JpZCAmJiB0aGlzLmRpY3RHcmlkLmFwaSkge1xuICAgICAgICAgbGV0IFtkaWN0XSA9IHRoaXMuZGljdEdyaWQuYXBpLmdldFNlbGVjdGVkUm93cygpO1xuXG4gICAgICAgICByZXR1cm4gZGljdDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG51bGw7XG4gICB9XG5cbiAgIHJlZnJlc2goZ3JpZDogR3JpZE9wdGlvbnMpIHtcbiAgICAgIHRoaXMuaXNMb2FkaW5nID0gdHJ1ZTtcbiAgICAgIGdyaWQuYXBpLnNob3dMb2FkaW5nT3ZlcmxheSgpO1xuXG4gICAgICAvLyBsZXQgZHMgPSBEaWN0RGF0YVNvdXJjZS5jcmVhdGUodGhpcy5kaWN0U2VydmljZSwgdGhpcy5ub3RpZmljYXRpb24pO1xuICAgICAgLy8gZHMub25Db21wbGV0ZS5zdWJzY3JpYmUoKCkgPT4gdGhpcy5pc0xvYWRpbmcgPSBmYWxzZSk7XG4gICAgICAvLyBkcy5vbkVycm9yLnN1YnNjcmliZShlcnJvciA9PiB7XG4gICAgICAvLyAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICAvLyAgICB0aGlzLmlzTG9hZGluZyA9IGZhbHNlO1xuICAgICAgLy8gfSk7XG4gICAgICAvLyBncmlkLmFwaS5zZXREYXRhc291cmNlKGRzKTtcbiAgICAgIHRoaXMuZGljdFNlcnZpY2UuZ2V0RGljdHMoKS5maW5hbGx5KCgpID0+IHtcbiAgICAgICAgIHRoaXMuaXNMb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICBpZiAoZ3JpZC5hcGkuZ2V0TW9kZWwoKS5nZXRSb3dDb3VudCgpID09PSAwKSB7XG4gICAgICAgICAgICBncmlkLmFwaS5zaG93Tm9Sb3dzT3ZlcmxheSgpO1xuICAgICAgICAgfVxuICAgICAgfSkuc3Vic2NyaWJlKGl0ZW1TZXQgPT4ge1xuICAgICAgICAgZ3JpZC5hcGkuc2V0Um93RGF0YShpdGVtU2V0LnJlc3VsdCk7XG4gICAgICB9LCBlcnJvciA9PiB7XG4gICAgICAgICB0aGlzLm5vdGlmaWNhdGlvbi5hbGVydChlcnJvci5leGNlcHRpb25OYW1lLCBlcnJvci5kZXNjcmlwdGlvbik7XG4gICAgICB9KTtcblxuICAgfVxuXG4gICByZWZyZXNoS3YoZ3JpZDogR3JpZE9wdGlvbnMpIHtcbiAgICAgIHRoaXMuaXNMb2FkaW5nID0gdHJ1ZTtcbiAgICAgIGdyaWQuYXBpLnNob3dMb2FkaW5nT3ZlcmxheSgpO1xuXG4gICAgICB0aGlzLmRpY3RTZXJ2aWNlLmdldEt2UGFpcnModGhpcy5zZWxlY3RlZERpY3QpLmZpbmFsbHkoKCkgPT4ge1xuICAgICAgICAgaWYgKGdyaWQuYXBpLmdldE1vZGVsKCkuZ2V0Um93Q291bnQoKSA9PT0gMCkge1xuICAgICAgICAgICAgZ3JpZC5hcGkuc2hvd05vUm93c092ZXJsYXkoKTtcbiAgICAgICAgIH1cbiAgICAgIH0pLnN1YnNjcmliZShpdGVtU2V0ID0+IHtcbiAgICAgICAgIGdyaWQuYXBpLnNldFJvd0RhdGEoaXRlbVNldC5yZXN1bHQpO1xuICAgICAgfSwgZXJyb3IgPT4gdGhpcy5ub3RpZmljYXRpb24uYWxlcnQoZXJyb3IuZXhjZXB0aW9uTmFtZSwgZXJyb3IuZGVzY3JpcHRpb24pKTtcbiAgIH1cblxuICAgb25CdG5OZXdDbGlja2VkKGdyaWQ6IEdyaWRPcHRpb25zKSB7XG4gICAgICBncmlkLmFwaS5hZGRJdGVtcyhbdGhpcy5kaWN0U2VydmljZS5jcmVhdGVEaWN0SW5NZW1vcnkoZ3JpZC5hcGkuZ2V0TW9kZWwoKS5nZXRSb3dDb3VudCgpKV0pO1xuICAgfVxuXG4gICBvbkJ0blVwZGF0ZUNsaWNrZWQoaXRlbTogYW55KSB7XG4gICB9XG5cbiAgIG9uRGljdEdyaWRSZWFkeShncmlkOiBHcmlkT3B0aW9ucykge1xuICAgICAgZ3JpZC5hcGkuc2l6ZUNvbHVtbnNUb0ZpdCgpO1xuICAgICAgdGhpcy5yZWZyZXNoKGdyaWQpO1xuICAgfVxuXG4gICBvbkRpY3RHcmlkUm93U2VsZWN0ZWQoZGljdEdyaWQsIGt2R3JpZDogR3JpZE9wdGlvbnMpIHtcblxuICAgICAgbGV0IGxpc3Q6IERhdGFEaWN0aW9uYXJ5W10gPSBkaWN0R3JpZC5hcGkuZ2V0U2VsZWN0ZWRSb3dzKCk7XG4gICAgICBpZiAobGlzdC5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgIGxldCBkaWN0ID0gbGlzdFswXTtcblxuICAgICAgICAgaWYgKCFkaWN0LmlzQ29kZUVkaXRhYmxlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkaWN0KVxuICAgICAgICAgICAgLy8gdGhpcy5pc0xvYWRpbmcgPSB0cnVlO1xuICAgICAgICAgICAgLy8ga3ZHcmlkLmFwaS5zaG93TG9hZGluZ092ZXJsYXkoKTtcbiAgICAgICAgICAgIC8vIHRoaXMuZGljdFNlcnZpY2UuZ2V0S3ZQYWlycyhkaWN0KS5maW5hbGx5KCgpID0+IHtcbiAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gICAgdGhpcy5pc0xvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIC8vICAgIGt2R3JpZC5hcGkuaGlkZU92ZXJsYXkoKTtcbiAgICAgICAgICAgIC8vIH0pLnN1YnNjcmliZShpdGVtU2V0ID0+IHtcbiAgICAgICAgICAgIC8vICAgIGNvbnNvbGUubG9nKGt2R3JpZC5hcGkpXG4gICAgICAgICAgICAvLyAgICAvLyB0aGlzLmt2UGFpckdyaWRcbiAgICAgICAgICAgIC8vICAgIGt2R3JpZC5hcGkuc2V0Um93RGF0YShpdGVtU2V0LnJlc3VsdCk7XG4gICAgICAgICAgICAvLyB9LCBlcnJvciA9PiB7XG4gICAgICAgICAgICAvLyAgICB0aGlzLm5vdGlmaWNhdGlvbi5hbGVydChlcnJvci5leGNlcHRpb25OYW1lLCBlcnJvci5kZXNjcmlwdGlvbik7XG4gICAgICAgICAgICAvLyB9KTtcbiAgICAgICAgICAgIC8vIHRoaXMuZmlsdGVyRGljRGF0YSg2LDApXG5cbiAgICAgICAgICAgIGxldCBpZCA9IGRpY3QuaWQ7XG4gICAgICAgICAgICB0aGlzLmh0dHAuZ2V0KGAvaURhdGEvYXBpL2RvbWFpbi8ke2lkfS92YWx1ZS8wLzFgLCB0aGlzLm9wdGlvbnMpLnN1YnNjcmliZSgodGRhdGE6YW55KT0+IHtcbiAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRkYXRhLmpzb24oKSlcbiAgICAgICAgICAgICAgICBsZXQgdG90YWxDb3VudCA9IHRkYXRhLmpzb24oKS50b3RhbDtcbiAgICAgICAgICAgICAgICAgIGxldCBkYXRhU291cmNlID0ge1xuICAgICAgICAgICAgICAgICAgICByb3dDb3VudDogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgZ2V0Um93czogKGl0ZW1zKT0+e1xuICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiYXNraW5nIGZvciBcIiArIGl0ZW1zLnN0YXJ0Um93ICsgXCIgdG8gXCIgKyBpdGVtcy5lbmRSb3cpO1xuICAgICAgICAgICAgICAgICAgICAgIGxldCBsYXN0Um93ID0gLTE7XG4gICAgICAgICAgICAgICAgICAgICAgaWYgKHRvdGFsQ291bnQgPD0gaXRlbXMuZW5kUm93KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsYXN0Um93ID0gdG90YWxDb3VudDtcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy5odHRwLmdldChgL2lEYXRhL2FwaS9kb21haW4vJHtpZH0vdmFsdWUvJHtpdGVtcy5zdGFydFJvd30vMTAwYCwgdGhpcy5vcHRpb25zKS5zdWJzY3JpYmUoKGRhdGE6YW55KT0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXMuc3VjY2Vzc0NhbGxiYWNrKGRhdGEuanNvbigpLnJlc3VsdCwgbGFzdFJvdyk7XG4gICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAga3ZHcmlkLmFwaS5zZXREYXRhc291cmNlKGRhdGFTb3VyY2UpO1xuICAgICAgICAgICAgIH0pO1xuICAgICAgICAgfVxuICAgICAgfVxuICAgfVxuXG4gICBvbkFkZEt2UGFpcihrdkdyaWQ6IEdyaWRPcHRpb25zKSB7XG4gICAgICBjb25zdCBzZWxlY3RlZERpY3QgPSB0aGlzLnNlbGVjdGVkRGljdDtcbiAgICAgIGNvbnN0IGluZGV4ID0ga3ZHcmlkLmFwaS5nZXRNb2RlbCgpLmdldFJvd0NvdW50KCk7XG4gICAgICBsZXQgaXRlbSA9IHt9O1xuICAgICAgaWYoc2VsZWN0ZWREaWN0LmRvbWFpbmNvZGUgPT0gJ3N1YmplY3RDb2RlJyl7XG4gICAgICAgICBpdGVtID0ge1xuICAgICAgICAgICAgZG9tYWluOiBzZWxlY3RlZERpY3QuaWQsXG4gICAgICAgICAgICBkb21haW52YWx1ZWNuOiAn56eR55uuXycraW5kZXgsXG4gICAgICAgICAgICBkb21haW52YWx1ZWNvZGU6ICdCVee8lueggV8nK2luZGV4LFxuICAgICAgICAgICAgZG9tYWludmFsdWVlbjogJ+enkeebrue8lueggV8nK2luZGV4LFxuICAgICAgICAgICAgaXNDb2RlRWRpdGFibGU6IHRydWVcbiAgICAgICAgIH1cbiAgICAgIH1lbHNlIGlmKHNlbGVjdGVkRGljdC5kb21haW5jb2RlID09ICdwcm9kdWN0VHlwZScpe1xuICAgICAgICAgaXRlbSA9IHtcbiAgICAgICAgICAgIGRvbWFpbjogc2VsZWN0ZWREaWN0LmlkLFxuICAgICAgICAgICAgZG9tYWludmFsdWVjbjogJ+aOkuW6j+WPt18nK2luZGV4LFxuICAgICAgICAgICAgZG9tYWludmFsdWVjb2RlOiAnQlXnvJbnoIFfJytpbmRleCxcbiAgICAgICAgICAgIGRvbWFpbnZhbHVlZW46ICfkuqflk4HnsbvlnotfJytpbmRleCxcbiAgICAgICAgICAgIGlzQ29kZUVkaXRhYmxlOiB0cnVlXG4gICAgICAgICB9XG4gICAgICB9ZWxzZSBpZihzZWxlY3RlZERpY3QuZG9tYWluY29kZSA9PSAnY29zdE5hdHVyZV9jb3N0Jyl7XG4gICAgICAgICBpdGVtID0ge1xuICAgICAgICAgICAgZG9tYWluOiBzZWxlY3RlZERpY3QuaWQsXG4gICAgICAgICAgICBkb21haW52YWx1ZWNuOiAn6LS555So5oCn6LSoXycraW5kZXgsXG4gICAgICAgICAgICBkb21haW52YWx1ZWNvZGU6ICdCVee8lueggV8nK2luZGV4LFxuICAgICAgICAgICAgZG9tYWludmFsdWVlbjogJ+i0ueeUqOexu+WIq18nK2luZGV4LFxuICAgICAgICAgICAgaXNDb2RlRWRpdGFibGU6IHRydWVcbiAgICAgICAgIH1cbiAgICAgIH1lbHNlIGlmKHNlbGVjdGVkRGljdC5kb21haW5jb2RlID09ICdjb3N0TmF0dXJlX29yZycpe1xuICAgICAgICAgaXRlbSA9IHtcbiAgICAgICAgICAgIGRvbWFpbjogc2VsZWN0ZWREaWN0LmlkLFxuICAgICAgICAgICAgZG9tYWludmFsdWVjbjogJ+i0ueeUqOaAp+i0qF8nK2luZGV4LFxuICAgICAgICAgICAgZG9tYWludmFsdWVjb2RlOiAnQlXnvJbnoIFfJytpbmRleCxcbiAgICAgICAgICAgIGRvbWFpbnZhbHVlZW46ICfpg6jpl6jlkI3np7BfJytpbmRleCxcbiAgICAgICAgICAgIGlzQ29kZUVkaXRhYmxlOiB0cnVlXG4gICAgICAgICB9XG4gICAgICB9ZWxzZXtcbiAgICAgICAgIGl0ZW0gPSB0aGlzLmRpY3RTZXJ2aWNlLmNyZWF0ZUt2UGFpckluTWVtb3J5KHRoaXMuc2VsZWN0ZWREaWN0LCBrdkdyaWQuYXBpLmdldE1vZGVsKCkuZ2V0Um93Q291bnQoKSlcbiAgICAgIH1cblxuICAgICAgLy8ga3ZHcmlkLmFwaS5hZGRJdGVtcyhbaXRlbV0pO1xuICAgICAga3ZHcmlkLmFwaS5pbnNlcnRJdGVtc0F0SW5kZXgoMCwgW2l0ZW1dKVxuICAgfVxuXG4gICBvbk1vZGVsVXBkYXRlZChncmlkOiBHcmlkT3B0aW9ucykge1xuICAgICAgaWYgKGdyaWQgJiYgZ3JpZC5hcGkpIHtcbiAgICAgICAgIGlmIChncmlkLmFwaS5nZXRNb2RlbCgpLmdldFJvd0NvdW50KCkpIHtcbiAgICAgICAgICAgIGdyaWQuYXBpLmhpZGVPdmVybGF5KCk7XG4gICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZ3JpZC5hcGkuc2hvd05vUm93c092ZXJsYXkoKTtcbiAgICAgICAgIH1cbiAgICAgIH1cbiAgIH1cblxuICAgb25DZWxsQ2hhbmdlZChpdGVtOiBhbnkpIHtcbiAgICAgIGNvbnNvbGUubG9nKGl0ZW0pO1xuICAgfVxuXG4gICBvbkNlbGxEYkNsaWNrZWQoaXRlbTogYW55KSB7XG4gICAgICBpZiAoIWl0ZW0uZGF0YS5pc0NvZGVFZGl0YWJsZSkge1xuICAgICAgICAgaXRlbS5ldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgfVxuICAgfVxufSJdfQ==
