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
var http_1 = require("@angular/http");
var alert_widget_1 = require("../widgets/alert.widget");
var general_util_1 = require("../utils/general.util");
var AgentManageComponent = (function () {
    function AgentManageComponent(http) {
        this.http = http;
        this.buList = [];
        this.rowData = [];
        this.fileGridColumns = [];
        this.chooseBu = {};
        this.showItem = false;
        this.buDetail = {};
        this.isNew = false;
        this.yesrs = [];
        this.options = new http_1.RequestOptions({ headers: new http_1.Headers({ 'Content-Type': 'application/json' }) });
    }
    AgentManageComponent.prototype.ngAfterViewInit = function () {
        this.getAllBuList();
        this.fileGridColumns = [
            { headerName: 'SAP/K3开票代理商编码', field: 'agentCode' },
            { headerName: '开票代理商名称', field: 'agentNameCN' },
            { headerName: '代理商简称编码', field: 'agentShortCode' },
            { headerName: '代理商简称中文名', field: 'agentShortNameCn' },
            { headerName: '代理商简称英文名', field: 'agentShortNameEn' },
            { headerName: '起始合作年月', field: 'startDate' },
            { headerName: '终止合作年月', field: 'endDate' },
            { headerName: '合作状态', field: 'cooperativeStatus' },
            { headerName: '业务条线名称', field: 'buName' },
            { headerName: '业务条线编码', field: 'buCode' },
            { headerName: '是否平台代理商', field: 'isPlatformAgents' },
            { headerName: '级别', field: 'level' },
        ];
    };
    AgentManageComponent.prototype.ngOnInit = function () {
        this.gridOptions = general_util_1.Util.getLazyLoadingGridOptions("加载中", "无数据");
        this.gridOptions.rowBuffer = 0;
        this.gridOptions.rowSelection = "multiple";
        this.gridOptions.rowModelType = "virtual";
        this.gridOptions.paginationPageSize = 100;
        this.gridOptions.cacheOverflowSize = 2;
        this.gridOptions.maxConcurrentDatasourceRequests = 1;
        this.gridOptions.infiniteInitialRowCount = 1000;
        this.gridOptions.maxBlocksInCache = 10;
        console.log(this.gridOptions);
    };
    AgentManageComponent.prototype.initData = function () {
        var _this = this;
        this.http.post('/iData/api/agent/list', JSON.stringify({ offset: 0, limit: 1 }), this.options).subscribe(function (tdata) {
            var totalCount;
            if (tdata._body) {
                totalCount = tdata.json().totalCount;
            }
            var dataSource = {
                rowCount: null,
                getRows: function (items) {
                    console.log("asking for " + items.startRow + " to " + items.endRow);
                    var lastRow = -1;
                    if (totalCount <= items.endRow) {
                        lastRow = totalCount;
                    }
                    _this.http.post('/iData/api/agent/list', JSON.stringify({ offset: items.startRow, limit: 100 }), _this.options).subscribe(function (data) {
                        console.log(data.json().agentList);
                        if (data._body) {
                            items.successCallback(data.json().agentList, lastRow);
                        }
                    });
                }
            };
            _this.params.api.setDatasource(dataSource);
        });
    };
    AgentManageComponent.prototype.getAllBuList = function () {
        var _this = this;
        this.buList = [];
        this.http.post('/iData/api/bu/list', JSON.stringify({ offset: 0, limit: 100 }), this.options).subscribe(function (data) {
            if (data._body) {
                _this.buList = data.json().list;
            }
        });
    };
    AgentManageComponent.prototype.onFileGridReady = function (grid) {
        this.params = grid;
        this.initData();
        grid.api.sizeColumnsToFit();
        grid.api.getRowNodeId = function (item) { return item.attachGroup; };
    };
    Object.defineProperty(AgentManageComponent.prototype, "secletedBu", {
        get: function () {
            if (!this.buGrid || !this.buGrid.api) {
                return null;
            }
            var rows = this.buGrid.api.getSelectedRows();
            return rows.length > 0 ? rows[0] : null;
        },
        enumerable: true,
        configurable: true
    });
    AgentManageComponent.prototype.onRowSelected = function () {
        this.showItem = true;
        this.isNew = true;
        this.buDetail = this.secletedBu;
        this.secletedBu.buStr = this.secletedBu.buCode + '-' + this.secletedBu.buName;
        this.buDetail.endDate = this.filterTime(this.buDetail.endDate);
        this.buDetail.startDate = this.filterTime(this.buDetail.startDate);
        console.log(this.buDetail);
    };
    AgentManageComponent.prototype.removeItem = function () {
        var _this = this;
        this.alert.show().subscribe(function (result) {
            if (result) {
                _this.http.delete('/iData/api/agent/' + _this.buDetail.id, _this.options).subscribe(function (data) {
                    _this.initData();
                    _this.isNew = false;
                    _this.showItem = false;
                });
            }
        });
    };
    AgentManageComponent.prototype.buOnchange = function (name) {
        console.log(name);
    };
    AgentManageComponent.prototype.onBtnNewClicked = function () {
        this.showItem = true;
        this.isNew = false;
        this.buDetail = {};
    };
    AgentManageComponent.prototype.filterTime = function (time) {
        if (time) {
            return time.substring(0, 4) + "-" + time.substring(4, 6);
        }
        else {
            return "";
        }
    };
    AgentManageComponent.prototype.replaceStr = function (data) {
        return data.replace("-", "");
    };
    AgentManageComponent.prototype.onBtnSure = function () {
        var _this = this;
        if (new Date(this.buDetail.startDate).getTime() >= new Date(this.buDetail.endDate).getTime()) {
            alert('终止日期必须大于起始日期');
            return;
        }
        this.buDetail.status = 1;
        var str = this.buDetail.buStr;
        this.buDetail.buCode = str.split('-')['0'];
        this.buDetail.buName = str.split('-')['1'];
        this.buDetail.startDate = this.replaceStr(this.buDetail.startDate);
        this.buDetail.endDate = this.replaceStr(this.buDetail.endDate);
        if (this.buDetail.id) {
            this.http.put('/iData/api/agent/update', JSON.stringify(this.buDetail), this.options).subscribe(function (data) {
                _this.initData();
                _this.showItem = false;
            });
        }
        else {
            this.http.post('/iData/api/agent/add', JSON.stringify(this.buDetail), this.options).subscribe(function (data) {
                _this.initData();
                _this.showItem = false;
            });
        }
    };
    return AgentManageComponent;
}());
__decorate([
    core_1.ViewChild("buGrid"),
    __metadata("design:type", Object)
], AgentManageComponent.prototype, "buGrid", void 0);
__decorate([
    core_1.ViewChild("alert"),
    __metadata("design:type", alert_widget_1.AlertWidget)
], AgentManageComponent.prototype, "alert", void 0);
AgentManageComponent = __decorate([
    core_1.Component({
        selector: "agent",
        templateUrl: "views/dataManage/agent.manage.html"
    }),
    __metadata("design:paramtypes", [http_1.Http])
], AgentManageComponent);
exports.AgentManageComponent = AgentManageComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvYWdlbnQuY29tcG9ubmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsc0NBQW1EO0FBQ25ELHNDQUEwRDtBQUUxRCx3REFBb0Q7QUFDcEQsc0RBQTJDO0FBTTNDO0lBb0JHLDhCQUFvQixJQUFTO1FBQVQsU0FBSSxHQUFKLElBQUksQ0FBSztRQWxCdkIsV0FBTSxHQUFhLEVBQUUsQ0FBQztRQUc1QixZQUFPLEdBQWUsRUFBRSxDQUFDO1FBQ3pCLG9CQUFlLEdBQWEsRUFBRSxDQUFDO1FBQy9CLGFBQVEsR0FBTyxFQUFFLENBQUM7UUFDbEIsYUFBUSxHQUFVLEtBQUssQ0FBQztRQUN4QixhQUFRLEdBQU8sRUFBRSxDQUFDO1FBQ2xCLFVBQUssR0FBVyxLQUFLLENBQUM7UUFDdEIsVUFBSyxHQUFlLEVBQUUsQ0FBQztRQUV2QixZQUFPLEdBQUcsSUFBSSxxQkFBYyxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksY0FBTyxDQUFDLEVBQUUsY0FBYyxFQUFFLGtCQUFrQixFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7SUFTL0YsQ0FBQztJQUVBLDhDQUFlLEdBQWY7UUFDRSxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLGVBQWUsR0FBRztZQUNyQixFQUFFLFVBQVUsRUFBRSxlQUFlLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRTtZQUNuRCxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLGFBQWEsRUFBRTtZQUMvQyxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLGdCQUFnQixFQUFFO1lBQ2xELEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsa0JBQWtCLEVBQUU7WUFDckQsRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxrQkFBa0IsRUFBRTtZQUNyRCxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLFdBQVcs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QztRQUFBLElBQUksQ0FBQSxDQUFDO1lBQ0gsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsc0JBQXNCLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFDLElBQUk7Z0JBQ25HLEtBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQkFDaEIsS0FBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7WUFDekIsQ0FBQyxDQUFDLENBQUE7UUFDRixDQUFDO0lBRUosQ0FBQztJQUNKLDJCQUFDO0FBQUQsQ0ExTEEsQUEwTEMsSUFBQTtBQTFLSztJQURGLGdCQUFTLENBQUMsUUFBUSxDQUFDOztvREFDRztBQUVyQjtJQURHLGdCQUFTLENBQUMsT0FBTyxDQUFDOzhCQUNkLDBCQUFXO21EQUFDO0FBbEJ4QjtJQUpDLGdCQUFTLENBQUM7UUFDUixRQUFRLEVBQUUsT0FBTztRQUNqQixXQUFXLEVBQUUsb0NBQW9DO0tBQ25ELENBQUM7cUNBcUIwQixXQUFJO3dCQXNLL0I7QUExTFksK0JBQUEsb0JBQW9CLENBQUEiLCJmaWxlIjoiY29tcG9uZW50cy9hZ2VudC5jb21wb25uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIFZpZXdDaGlsZH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7SHR0cCxSZXF1ZXN0T3B0aW9ucyxIZWFkZXJzfSBmcm9tIFwiQGFuZ3VsYXIvaHR0cFwiO1xuaW1wb3J0IHtHcmlkT3B0aW9ucywgQ29sRGVmfSBmcm9tIFwiYWctZ3JpZFwiO1xuaW1wb3J0IHtBbGVydFdpZGdldH0gZnJvbSBcIi4uL3dpZGdldHMvYWxlcnQud2lkZ2V0XCI7XG5pbXBvcnQge1V0aWx9IGZyb20gXCIuLi91dGlscy9nZW5lcmFsLnV0aWxcIjtcblxuQENvbXBvbmVudCh7XG4gICBzZWxlY3RvcjogXCJhZ2VudFwiLFxuICAgdGVtcGxhdGVVcmw6IFwidmlld3MvZGF0YU1hbmFnZS9hZ2VudC5tYW5hZ2UuaHRtbFwiXG59KVxuZXhwb3J0IGNsYXNzIEFnZW50TWFuYWdlQ29tcG9uZW50IHtcblxuICBwdWJsaWMgYnVMaXN0OiBBcnJheTxhbnk+PVtdO1xuICAgZ3JpZE9wdGlvbnM6IEdyaWRPcHRpb25zO1xuICAgZ3JpZENvbHVtbnM6IENvbERlZltdO1xuICAgcm93RGF0YTogQXJyYXk8YW55PiA9IFtdO1xuICAgZmlsZUdyaWRDb2x1bW5zOiBDb2xEZWZbXSA9IFtdO1xuICAgY2hvb3NlQnU6YW55ID0ge307XG4gICBzaG93SXRlbTpib29sZWFuPSBmYWxzZTtcbiAgIGJ1RGV0YWlsOmFueSA9IHt9O1xuICAgaXNOZXc6Ym9vbGVhbiA9IGZhbHNlO1xuICAgeWVzcnM6IEFycmF5PGFueT4gPSBbXTtcbiAgIHBhcmFtczphbnk7XG4gICBvcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHsgaGVhZGVyczogbmV3IEhlYWRlcnMoeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nIH0pIH0pO1xuXG4gICBAVmlld0NoaWxkKFwiYnVHcmlkXCIpXG4gICAgICBidUdyaWQ6IEdyaWRPcHRpb25zO1xuICAgICAgIEBWaWV3Q2hpbGQoXCJhbGVydFwiKVxuICAgICBhbGVydDogQWxlcnRXaWRnZXQ7XG5cbiAgIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDpIdHRwKXtcblxuICAgfVxuXG4gICAgbmdBZnRlclZpZXdJbml0KCl7XG4gICAgICB0aGlzLmdldEFsbEJ1TGlzdCgpO1xuICAgICAgIHRoaXMuZmlsZUdyaWRDb2x1bW5zID0gW1xuICAgICAgICAgeyBoZWFkZXJOYW1lOiAnU0FQL0sz5byA56Wo5Luj55CG5ZWG57yW56CBJywgZmllbGQ6ICdhZ2VudENvZGUnIH0sXG4gICAgICAgICB7IGhlYWRlck5hbWU6ICflvIDnpajku6PnkIbllYblkI3np7AnLCBmaWVsZDogJ2FnZW50TmFtZUNOJyB9LFxuICAgICAgICAgeyBoZWFkZXJOYW1lOiAn5Luj55CG5ZWG566A56ew57yW56CBJywgZmllbGQ6ICdhZ2VudFNob3J0Q29kZScgfSxcbiAgICAgICAgIHsgaGVhZGVyTmFtZTogJ+S7o+eQhuWVhueugOensOS4reaWh+WQjScsIGZpZWxkOiAnYWdlbnRTaG9ydE5hbWVDbicgfSxcbiAgICAgICAgIHsgaGVhZGVyTmFtZTogJ+S7o+eQhuWVhueugOensOiLseaWh+WQjScsIGZpZWxkOiAnYWdlbnRTaG9ydE5hbWVFbicgfSxcbiAgICAgICAgIHsgaGVhZGVyTmFtZTogJ+i1t+Wni+WQiOS9nOW5tOaciCcsIGZpZWxkOiAnc3RhcnREYXRlJyB9LFxuICAgICAgICAgeyBoZWFkZXJOYW1lOiAn57uI5q2i5ZCI5L2c5bm05pyIJywgZmllbGQ6ICdlbmREYXRlJyB9LFxuICAgICAgICAgeyBoZWFkZXJOYW1lOiAn5ZCI5L2c54q25oCBJywgZmllbGQ6ICdjb29wZXJhdGl2ZVN0YXR1cycgfSxcbiAgICAgICAgIHsgaGVhZGVyTmFtZTogJ+S4muWKoeadoee6v+WQjeensCcsIGZpZWxkOiAnYnVOYW1lJyB9LFxuICAgICAgICAgeyBoZWFkZXJOYW1lOiAn5Lia5Yqh5p2h57q/57yW56CBJywgZmllbGQ6ICdidUNvZGUnIH0sXG4gICAgICAgICB7IGhlYWRlck5hbWU6ICfmmK/lkKblubPlj7Dku6PnkIbllYYnLCBmaWVsZDogJ2lzUGxhdGZvcm1BZ2VudHMnIH0sXG4gICAgICAgICB7IGhlYWRlck5hbWU6ICfnuqfliKsnLCBmaWVsZDogJ2xldmVsJyB9LFxuICAgICAgICAgXTtcbiAgICB9XG5cbiAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICBcbiAgICAgdGhpcy5ncmlkT3B0aW9ucyA9IFV0aWwuZ2V0TGF6eUxvYWRpbmdHcmlkT3B0aW9ucyhcbiAgICAgICAgIFwi5Yqg6L295LitXCIsXG4gICAgICAgICBcIuaXoOaVsOaNrlwiXG4gICAgICApO1xuICAgIHRoaXMuZ3JpZE9wdGlvbnMucm93QnVmZmVyID0gMDtcbiAgICB0aGlzLmdyaWRPcHRpb25zLnJvd1NlbGVjdGlvbiA9IFwibXVsdGlwbGVcIjtcbiAgICB0aGlzLmdyaWRPcHRpb25zLnJvd01vZGVsVHlwZSA9IFwidmlydHVhbFwiO1xuICAgIHRoaXMuZ3JpZE9wdGlvbnMucGFnaW5hdGlvblBhZ2VTaXplID0gMTAwO1xuICAgIHRoaXMuZ3JpZE9wdGlvbnMuY2FjaGVPdmVyZmxvd1NpemUgPSAyO1xuICAgIHRoaXMuZ3JpZE9wdGlvbnMubWF4Q29uY3VycmVudERhdGFzb3VyY2VSZXF1ZXN0cyA9IDE7XG4gICAgdGhpcy5ncmlkT3B0aW9ucy5pbmZpbml0ZUluaXRpYWxSb3dDb3VudCA9IDEwMDA7XG4gICAgdGhpcy5ncmlkT3B0aW9ucy5tYXhCbG9ja3NJbkNhY2hlID0gMTA7XG4gICAgIGNvbnNvbGUubG9nKHRoaXMuZ3JpZE9wdGlvbnMpXG5cbiAgIH1cblxuICAgaW5pdERhdGEoKXtcbiAgICAgIHRoaXMuaHR0cC5wb3N0KCcvaURhdGEvYXBpL2FnZW50L2xpc3QnLCBKU09OLnN0cmluZ2lmeSh7IG9mZnNldDogMCwgbGltaXQ6IDEgfSksIHRoaXMub3B0aW9ucykuc3Vic2NyaWJlKCh0ZGF0YTphbnkpPT4ge1xuICAgICAgICAgICAgbGV0IHRvdGFsQ291bnRcbiAgICAgICAgICAgIGlmKHRkYXRhLl9ib2R5KXtcbiAgICAgICAgICAgICAgdG90YWxDb3VudCA9IHRkYXRhLmpzb24oKS50b3RhbENvdW50O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IGRhdGFTb3VyY2UgPSB7XG4gICAgICAgICAgICAgIHJvd0NvdW50OiBudWxsLFxuICAgICAgICAgICAgICBnZXRSb3dzOiAoaXRlbXMpPT57XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJhc2tpbmcgZm9yIFwiICsgaXRlbXMuc3RhcnRSb3cgKyBcIiB0byBcIiArIGl0ZW1zLmVuZFJvdyk7XG4gICAgICAgICAgICAgICAgbGV0IGxhc3RSb3cgPSAtMTtcbiAgICAgICAgICAgICAgICBpZiAodG90YWxDb3VudCA8PSBpdGVtcy5lbmRSb3cpIHtcbiAgICAgICAgICAgICAgICAgIGxhc3RSb3cgPSB0b3RhbENvdW50O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmh0dHAucG9zdCgnL2lEYXRhL2FwaS9hZ2VudC9saXN0JywgSlNPTi5zdHJpbmdpZnkoeyBvZmZzZXQ6IGl0ZW1zLnN0YXJ0Um93LCBsaW1pdDogMTAwIH0pLCB0aGlzLm9wdGlvbnMpLnN1YnNjcmliZSgoZGF0YTphbnkpPT4ge1xuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YS5qc29uKCkuYWdlbnRMaXN0KVxuICAgICAgICAgICAgICAgICAgaWYoZGF0YS5fYm9keSl7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zLnN1Y2Nlc3NDYWxsYmFjayhkYXRhLmpzb24oKS5hZ2VudExpc3QsIGxhc3RSb3cpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5wYXJhbXMuYXBpLnNldERhdGFzb3VyY2UoZGF0YVNvdXJjZSk7XG4gICAgICB9KVxuXG4gICB9XG5cbiAgIGdldEFsbEJ1TGlzdCgpe1xuICAgICAgdGhpcy5idUxpc3QgPSBbXTtcbiAgICAgIHRoaXMuaHR0cC5wb3N0KCcvaURhdGEvYXBpL2J1L2xpc3QnLCBKU09OLnN0cmluZ2lmeSh7IG9mZnNldDogMCwgbGltaXQ6IDEwMCB9KSwgdGhpcy5vcHRpb25zKS5zdWJzY3JpYmUoKGRhdGE6YW55KT0+IHtcbiAgICAgICAgIGlmKGRhdGEuX2JvZHkpe1xuICAgICAgICAgICB0aGlzLmJ1TGlzdCA9IGRhdGEuanNvbigpLmxpc3Q7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICB9XG5cbiAgIG9uRmlsZUdyaWRSZWFkeShncmlkKSB7XG4gICAgICB0aGlzLnBhcmFtcyA9IGdyaWQ7XG4gICAgICB0aGlzLmluaXREYXRhKCk7XG4gICAgICBncmlkLmFwaS5zaXplQ29sdW1uc1RvRml0KCk7XG4gICAgICBncmlkLmFwaS5nZXRSb3dOb2RlSWQgPSBpdGVtID0+IGl0ZW0uYXR0YWNoR3JvdXA7XG4gICB9XG5cbiAgIGdldCBzZWNsZXRlZEJ1KCkge1xuICAgICAgaWYgKCF0aGlzLmJ1R3JpZCB8fCAhdGhpcy5idUdyaWQuYXBpKSB7XG4gICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cblxuICAgICAgbGV0IHJvd3MgPSB0aGlzLmJ1R3JpZC5hcGkuZ2V0U2VsZWN0ZWRSb3dzKCk7XG4gICAgICByZXR1cm4gcm93cy5sZW5ndGggPiAwID8gcm93c1swXSA6IG51bGw7XG4gICB9XG5cbiAgIG9uUm93U2VsZWN0ZWQoKXtcbiAgICAgIHRoaXMuc2hvd0l0ZW0gPSB0cnVlO1xuICAgICAgdGhpcy5pc05ldyA9IHRydWU7XG4gICAgICB0aGlzLmJ1RGV0YWlsID0gdGhpcy5zZWNsZXRlZEJ1O1xuICAgICAgdGhpcy5zZWNsZXRlZEJ1LmJ1U3RyID0gdGhpcy5zZWNsZXRlZEJ1LmJ1Q29kZSsnLScrdGhpcy5zZWNsZXRlZEJ1LmJ1TmFtZTtcbiAgICAgIHRoaXMuYnVEZXRhaWwuZW5kRGF0ZSA9IHRoaXMuZmlsdGVyVGltZSh0aGlzLmJ1RGV0YWlsLmVuZERhdGUpO1xuICAgICAgdGhpcy5idURldGFpbC5zdGFydERhdGUgPSB0aGlzLmZpbHRlclRpbWUodGhpcy5idURldGFpbC5zdGFydERhdGUpO1xuICAgICAgY29uc29sZS5sb2codGhpcy5idURldGFpbClcbiAgIH1cblxuICAgcmVtb3ZlSXRlbSgpe1xuICAgICAgdGhpcy5hbGVydC5zaG93KCkuc3Vic2NyaWJlKHJlc3VsdCA9PiB7XG4gICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgIHRoaXMuaHR0cC5kZWxldGUoJy9pRGF0YS9hcGkvYWdlbnQvJyt0aGlzLmJ1RGV0YWlsLmlkLCB0aGlzLm9wdGlvbnMpLnN1YnNjcmliZSgoZGF0YSk9PiB7XG4gICAgICAgICAgICB0aGlzLmluaXREYXRhKCk7XG4gICAgICAgICAgICB0aGlzLmlzTmV3ID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLnNob3dJdGVtID0gZmFsc2U7XG4gICAgICAgICB9KVxuICAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgIH1cblxuICAgYnVPbmNoYW5nZShuYW1lKXtcbiAgICBjb25zb2xlLmxvZyhuYW1lKVxuICAgfVxuXG4gICBvbkJ0bk5ld0NsaWNrZWQoKXtcbiAgICAgIHRoaXMuc2hvd0l0ZW0gPSB0cnVlO1xuICAgICAgdGhpcy5pc05ldyA9IGZhbHNlO1xuICAgICAgdGhpcy5idURldGFpbCA9IHt9XG5cbiAgIH1cblxuICAgZmlsdGVyVGltZSAodGltZSkge1xuICAgICBpZih0aW1lKXtcbiAgICAgICByZXR1cm4gdGltZS5zdWJzdHJpbmcoMCw0KStcIi1cIit0aW1lLnN1YnN0cmluZyg0LDYpO1xuICAgICB9ZWxzZXtcbiAgICAgICByZXR1cm4gXCJcIjtcbiAgICAgfVxuICAgICBcbiAgIH1cblxuICAgcmVwbGFjZVN0cihkYXRhKXtcbiAgICAgIHJldHVybiBkYXRhLnJlcGxhY2UoXCItXCIsIFwiXCIpO1xuICAgfVxuXG4gICBvbkJ0blN1cmUoKXtcbiAgICAgIGlmIChuZXcgRGF0ZSh0aGlzLmJ1RGV0YWlsLnN0YXJ0RGF0ZSkuZ2V0VGltZSgpID49IG5ldyBEYXRlKHRoaXMuYnVEZXRhaWwuZW5kRGF0ZSkuZ2V0VGltZSgpKSB7XG4gICAgICAgICBhbGVydCgn57uI5q2i5pel5pyf5b+F6aG75aSn5LqO6LW35aeL5pel5pyfJylcbiAgICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHRoaXMuYnVEZXRhaWwuc3RhdHVzID0gMTtcbiAgICAgIGxldCBzdHIgPSB0aGlzLmJ1RGV0YWlsLmJ1U3RyO1xuICAgICAgdGhpcy5idURldGFpbC5idUNvZGUgPSBzdHIuc3BsaXQoJy0nKVsnMCddO1xuICAgICAgdGhpcy5idURldGFpbC5idU5hbWUgPSBzdHIuc3BsaXQoJy0nKVsnMSddO1xuXG4gICAgICB0aGlzLmJ1RGV0YWlsLnN0YXJ0RGF0ZSA9IHRoaXMucmVwbGFjZVN0cih0aGlzLmJ1RGV0YWlsLnN0YXJ0RGF0ZSk7XG4gICAgICB0aGlzLmJ1RGV0YWlsLmVuZERhdGUgPSB0aGlzLnJlcGxhY2VTdHIodGhpcy5idURldGFpbC5lbmREYXRlKVxuXG4gICAgICBpZih0aGlzLmJ1RGV0YWlsLmlkKXtcbiAgICAgICAgIHRoaXMuaHR0cC5wdXQoJy9pRGF0YS9hcGkvYWdlbnQvdXBkYXRlJywgSlNPTi5zdHJpbmdpZnkodGhpcy5idURldGFpbCksIHRoaXMub3B0aW9ucykuc3Vic2NyaWJlKChkYXRhKT0+IHtcbiAgICAgICAgIHRoaXMuaW5pdERhdGEoKTtcbiAgICAgICAgIHRoaXMuc2hvd0l0ZW0gPSBmYWxzZTtcbiAgICAgIH0pXG4gICAgICB9ZWxzZXtcbiAgICAgICAgIHRoaXMuaHR0cC5wb3N0KCcvaURhdGEvYXBpL2FnZW50L2FkZCcsIEpTT04uc3RyaW5naWZ5KHRoaXMuYnVEZXRhaWwpLCB0aGlzLm9wdGlvbnMpLnN1YnNjcmliZSgoZGF0YSk9PiB7XG4gICAgICAgICB0aGlzLmluaXREYXRhKCk7XG4gICAgICAgICB0aGlzLnNob3dJdGVtID0gZmFsc2U7XG4gICAgICB9KVxuICAgICAgfVxuXG4gICB9XG59Il19
