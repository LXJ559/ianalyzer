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
var ProductManageComponent = (function () {
    function ProductManageComponent(http) {
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
    ProductManageComponent.prototype.ngAfterViewInit = function () {
        var bYear = 1970;
        var eYear = 2050;
        for (var i = bYear; i <= eYear; i++) {
            this.yesrs.push(i);
        }
        this.getAllBuList();
        this.fileGridColumns = [
            { headerName: 'BU编码', field: 'buCode' },
            { headerName: 'BU名称', field: 'buName' },
            { headerName: '数据来源', field: 'dataSource' },
            { headerName: '产品大类代码', field: 'productCategoryCode' },
            { headerName: '描述', field: 'remark' },
            { headerName: '预算产品', field: 'budgetProduct' },
            { headerName: 'BI产品类别编码', field: 'biCategoryCode' },
            { headerName: 'BI产品类别中文', field: 'biCategoryCN' },
            { headerName: 'BI产品类别英文', field: 'biCategoryEN' },
            { headerName: 'BU产品类别编码', field: 'buProductType' },
            { headerName: 'BU产品类别中文', field: 'buProductTypeCN' },
            { headerName: 'BU产品类别英文', field: 'buProductTypeEN' },
            { headerName: '集团产品类别编码', field: 'groupProductType' },
            { headerName: '集团产品类别中文', field: 'groupProductTypeCN' },
            { headerName: '集团产品类别英文', field: 'groupProductTypeEN' },
            { headerName: '是否停产', field: 'isStopProduction' },
            { headerName: '备注', field: 'comment' },
            { headerName: 'BU重点产品', field: 'buKeyProduct' },
            { headerName: '集团重点产品', field: 'groupKeyProduct' },
            { headerName: '市场份额产品类别编码', field: 'marketShareProductType' },
            { headerName: '市场份额产品类别中文', field: 'marketShareProductTypeCN' },
            { headerName: '市场份额产品类别英文', field: 'marketShareProductTypeEN' },
        ];
    };
    ProductManageComponent.prototype.ngOnInit = function () {
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
    ProductManageComponent.prototype.initData = function () {
        var _this = this;
        this.http.post('/iData/api/product/list', JSON.stringify({ offset: 0, limit: 1 }), this.options).subscribe(function (tdata) {
            var totalCount;
            if (tdata._body) {
                totalCount = tdata.json().totalCount;
                console.log(totalCount);
            }
            var dataSource = {
                rowCount: null,
                getRows: function (items) {
                    console.log("asking for " + items.startRow + " to " + items.endRow);
                    var lastRow = -1;
                    if (totalCount <= items.endRow) {
                        lastRow = totalCount;
                    }
                    _this.http.post('/iData/api/product/list', JSON.stringify({ offset: items.startRow, limit: 100 }), _this.options).subscribe(function (data) {
                        console.log(data.json().productList);
                        if (data._body) {
                            items.successCallback(data.json().productList, lastRow);
                        }
                    });
                }
            };
            _this.params.api.setDatasource(dataSource);
        });
    };
    ProductManageComponent.prototype.getAllBuList = function () {
        var _this = this;
        this.buList = [];
        this.http.post('/iData/api/bu/list', JSON.stringify({ offset: 0, limit: 100 }), this.options).subscribe(function (data) {
            if (data._body) {
                _this.buList = data.json().list;
            }
        });
    };
    ProductManageComponent.prototype.onFileGridReady = function (grid) {
        this.params = grid;
        this.initData();
        grid.api.sizeColumnsToFit();
        grid.api.getRowNodeId = function (item) { return item.attachGroup; };
    };
    Object.defineProperty(ProductManageComponent.prototype, "secletedBu", {
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
    ProductManageComponent.prototype.onRowSelected = function () {
        // this.chooseBu = this.secletedBu;
        this.showItem = true;
        this.isNew = true;
        this.buDetail = this.secletedBu;
        this.secletedBu.buStr = this.secletedBu.buCode + '-' + this.secletedBu.buName;
    };
    ProductManageComponent.prototype.removeItem = function () {
        var _this = this;
        this.alert.show().subscribe(function (result) {
            if (result) {
                _this.http.delete('/iData/api/product/' + _this.buDetail.id, _this.options).subscribe(function (data) {
                    _this.initData();
                    _this.isNew = false;
                    _this.showItem = false;
                });
            }
        });
    };
    ProductManageComponent.prototype.onBtnNewClicked = function () {
        this.showItem = true;
        this.isNew = false;
        this.buDetail = {};
        this.buDetail.year = (new Date()).getFullYear();
        this.buDetail.categoryCode = 'product01';
    };
    ProductManageComponent.prototype.onBtnSure = function () {
        var _this = this;
        this.buDetail.status = 1;
        var str = this.buDetail.buStr;
        this.buDetail.buCode = str.split('-')['0'];
        this.buDetail.buName = str.split('-')['1'];
        if (this.buDetail.id) {
            this.http.put('/iData/api/product/update', JSON.stringify(this.buDetail), this.options).subscribe(function (data) {
                _this.initData();
                _this.showItem = false;
            });
        }
        else {
            this.http.post('/iData/api/product/add', JSON.stringify(this.buDetail), this.options).subscribe(function (data) {
                _this.initData();
                _this.showItem = false;
            });
        }
    };
    return ProductManageComponent;
}());
__decorate([
    core_1.ViewChild("buGrid"),
    __metadata("design:type", Object)
], ProductManageComponent.prototype, "buGrid", void 0);
__decorate([
    core_1.ViewChild("alert"),
    __metadata("design:type", alert_widget_1.AlertWidget)
], ProductManageComponent.prototype, "alert", void 0);
ProductManageComponent = __decorate([
    core_1.Component({
        selector: "product",
        templateUrl: "views/dataManage/product.manage.html"
    }),
    __metadata("design:paramtypes", [http_1.Http])
], ProductManageComponent);
exports.ProductManageComponent = ProductManageComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvcHJvZHVjdC5jb21wb25uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxzQ0FBbUQ7QUFDbkQsc0NBQTBEO0FBRTFELHdEQUFvRDtBQUNwRCxzREFBMkM7QUFNM0M7SUFvQkUsZ0NBQW9CLElBQVM7UUFBVCxTQUFJLEdBQUosSUFBSSxDQUFLO1FBbEJ2QixXQUFNLEdBQWEsRUFBRSxDQUFDO1FBRzVCLFlBQU8sR0FBZSxFQUFFLENBQUM7UUFDekIsb0JBQWUsR0FBYSxFQUFFLENBQUM7UUFDL0IsYUFBUSxHQUFPLEVBQUUsQ0FBQztRQUNsQixhQUFRLEdBQVUsS0FBSyxDQUFDO1FBQ3hCLGFBQVEsR0FBTyxFQUFFLENBQUM7UUFDbEIsVUFBSyxHQUFXLEtBQUssQ0FBQztRQUNwQixVQUFLLEdBQWUsRUFBRSxDQUFDO1FBRXpCLFlBQU8sR0FBTyxJQUFJLHFCQUFjLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxjQUFPLENBQUMsRUFBRSxjQUFjLEVBQUUsa0JBQWtCLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQVNuRyxDQUFDO0lBRUMsZ0RBQWUsR0FBZjtRQUNFLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDakIsR0FBRyxDQUFBLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxFQUFDLENBQUMsSUFBRSxLQUFLLEVBQUMsQ0FBQyxFQUFFLEVBQUMsQ0FBQztZQUM3QixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUNyQixDQUFDO1FBQ0QsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxlQUFlLEdBQUc7WUFDckIsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUU7WUFDdkMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxRQUFR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QUMsVUFBQyxJQUFJO2dCQUN2RyxLQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7Z0JBQ2hCLEtBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1lBQ3ZCLENBQUMsQ0FBQyxDQUFBO1FBQ0EsQ0FBQztJQUVGLENBQUM7SUFDSiw2QkFBQztBQUFELENBakxBLEFBaUxDLElBQUE7QUFqS0k7SUFERixnQkFBUyxDQUFDLFFBQVEsQ0FBQzs7c0RBQ0c7QUFFckI7SUFERyxnQkFBUyxDQUFDLE9BQU8sQ0FBQzs4QkFDZCwwQkFBVztxREFBQztBQWxCdkI7SUFKQyxnQkFBUyxDQUFDO1FBQ1IsUUFBUSxFQUFFLFNBQVM7UUFDbkIsV0FBVyxFQUFFLHNDQUFzQztLQUNyRCxDQUFDO3FDQXFCeUIsV0FBSTswQkE2SjlCO0FBakxZLGlDQUFBLHNCQUFzQixDQUFBIiwiZmlsZSI6ImNvbXBvbmVudHMvcHJvZHVjdC5jb21wb25uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIFZpZXdDaGlsZH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7SHR0cCxSZXF1ZXN0T3B0aW9ucyxIZWFkZXJzfSBmcm9tIFwiQGFuZ3VsYXIvaHR0cFwiO1xuaW1wb3J0IHtHcmlkT3B0aW9ucywgQ29sRGVmfSBmcm9tIFwiYWctZ3JpZFwiO1xuaW1wb3J0IHtBbGVydFdpZGdldH0gZnJvbSBcIi4uL3dpZGdldHMvYWxlcnQud2lkZ2V0XCI7XG5pbXBvcnQge1V0aWx9IGZyb20gXCIuLi91dGlscy9nZW5lcmFsLnV0aWxcIjtcblxuQENvbXBvbmVudCh7XG4gICBzZWxlY3RvcjogXCJwcm9kdWN0XCIsXG4gICB0ZW1wbGF0ZVVybDogXCJ2aWV3cy9kYXRhTWFuYWdlL3Byb2R1Y3QubWFuYWdlLmh0bWxcIlxufSlcbmV4cG9ydCBjbGFzcyBQcm9kdWN0TWFuYWdlQ29tcG9uZW50IHtcblxuXHRwdWJsaWMgYnVMaXN0OiBBcnJheTxhbnk+PVtdO1xuXHQgZ3JpZE9wdGlvbnM6IEdyaWRPcHRpb25zO1xuXHQgZ3JpZENvbHVtbnM6IENvbERlZltdO1xuXHQgcm93RGF0YTogQXJyYXk8YW55PiA9IFtdO1xuXHQgZmlsZUdyaWRDb2x1bW5zOiBDb2xEZWZbXSA9IFtdO1xuXHQgY2hvb3NlQnU6YW55ID0ge307XG5cdCBzaG93SXRlbTpib29sZWFuPSBmYWxzZTtcblx0IGJ1RGV0YWlsOmFueSA9IHt9O1xuXHQgaXNOZXc6Ym9vbGVhbiA9IGZhbHNlO1xuICAgIHllc3JzOiBBcnJheTxhbnk+ID0gW107XG4gICAgcGFyYW1zOiBhbnk7XG5cdCBvcHRpb25zOmFueSA9IG5ldyBSZXF1ZXN0T3B0aW9ucyh7IGhlYWRlcnM6IG5ldyBIZWFkZXJzKHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyB9KSB9KTtcbi8vIFxuXHQgQFZpZXdDaGlsZChcImJ1R3JpZFwiKVxuICAgXHQgYnVHcmlkOiBHcmlkT3B0aW9ucztcbiAgIFx0ICBAVmlld0NoaWxkKFwiYWxlcnRcIilcbiAgIFx0YWxlcnQ6IEFsZXJ0V2lkZ2V0O1xuXG5cdCBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6SHR0cCl7XG5cblx0IH1cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpe1xuICAgICAgbGV0IGJZZWFyID0gMTk3MDtcbiAgICAgIGxldCBlWWVhciA9IDIwNTA7XG4gICAgICBmb3IobGV0IGkgPSBiWWVhcjtpPD1lWWVhcjtpKyspe1xuICAgICAgICAgdGhpcy55ZXNycy5wdXNoKGkpXG4gICAgICB9XG4gICAgICB0aGlzLmdldEFsbEJ1TGlzdCgpO1xuICAgICAgIHRoaXMuZmlsZUdyaWRDb2x1bW5zID0gW1xuICAgICAgICAgeyBoZWFkZXJOYW1lOiAnQlXnvJbnoIEnLCBmaWVsZDogJ2J1Q29kZScgfSxcbiAgICAgICAgIHsgaGVhZGVyTmFtZTogJ0JV5ZCN56ewJywgZmllbGQ6ICdidU5hbWUnIH0sXG4gICAgICAgICB7IGhlYWRlck5hbWU6ICfmlbDmja7mnaXmupAnLCBmaWVsZDogJ2RhdGFTb3VyY2UnIH0sXG4gICAgICAgICB7IGhlYWRlck5hbWU6ICfkuqflk4HlpKfnsbvku6PnoIEnLCBmaWVsZDogJ3Byb2R1Y3RDYXRlZ29yeUNvZGUnIH0sXG4gICAgICAgICB7IGhlYWRlck5hbWU6ICfmj4/ov7AnLCBmaWVsZDogJ3JlbWFyaycgfSxcbiAgICAgICAgIHsgaGVhZGVyTmFtZTogJ+mihOeul+S6p+WTgScsIGZpZWxkOiAnYnVkZ2V0UHJvZHVjdCcgfSxcbiAgICAgICAgIHsgaGVhZGVyTmFtZTogJ0JJ5Lqn5ZOB57G75Yir57yW56CBJywgZmllbGQ6ICdiaUNhdGVnb3J5Q29kZScgfSxcbiAgICAgICAgIHsgaGVhZGVyTmFtZTogJ0JJ5Lqn5ZOB57G75Yir5Lit5paHJywgZmllbGQ6ICdiaUNhdGVnb3J5Q04nIH0sXG4gICAgICAgICB7IGhlYWRlck5hbWU6ICdCSeS6p+WTgeexu+WIq+iLseaWhycsIGZpZWxkOiAnYmlDYXRlZ29yeUVOJyB9LFxuICAgICAgICAgeyBoZWFkZXJOYW1lOiAnQlXkuqflk4HnsbvliKvnvJbnoIEnLCBmaWVsZDogJ2J1UHJvZHVjdFR5cGUnIH0sXG4gICAgICAgICB7IGhlYWRlck5hbWU6ICdCVeS6p+WTgeexu+WIq+S4reaWhycsIGZpZWxkOiAnYnVQcm9kdWN0VHlwZUNOJyB9LFxuICAgICAgICAgeyBoZWFkZXJOYW1lOiAnQlXkuqflk4HnsbvliKvoi7HmlocnLCBmaWVsZDogJ2J1UHJvZHVjdFR5cGVFTicgfSxcbiAgICAgICAgIHsgaGVhZGVyTmFtZTogJ+mbhuWbouS6p+WTgeexu+WIq+e8lueggScsIGZpZWxkOiAnZ3JvdXBQcm9kdWN0VHlwZScgfSxcbiAgICAgICAgIHsgaGVhZGVyTmFtZTogJ+mbhuWbouS6p+WTgeexu+WIq+S4reaWhycsIGZpZWxkOiAnZ3JvdXBQcm9kdWN0VHlwZUNOJyB9LFxuICAgICAgICAgeyBoZWFkZXJOYW1lOiAn6ZuG5Zui5Lqn5ZOB57G75Yir6Iux5paHJywgZmllbGQ6ICdncm91cFByb2R1Y3RUeXBlRU4nIH0sXG4gICAgICAgICB7IGhlYWRlck5hbWU6ICfmmK/lkKblgZzkuqcnLCBmaWVsZDogJ2lzU3RvcFByb2R1Y3Rpb24nIH0sXG4gICAgICAgICB7IGhlYWRlck5hbWU6ICflpIfms6gnLCBmaWVsZDogJ2NvbW1lbnQnIH0sXG4gICAgICAgICB7IGhlYWRlck5hbWU6ICdCVemHjeeCueS6p+WTgScsIGZpZWxkOiAnYnVLZXlQcm9kdWN0JyB9LFxuICAgICAgICAgeyBoZWFkZXJOYW1lOiAn6ZuG5Zui6YeN54K55Lqn5ZOBJywgZmllbGQ6ICdncm91cEtleVByb2R1Y3QnIH0sXG4gICAgICAgICB7IGhlYWRlck5hbWU6ICfluILlnLrku73pop3kuqflk4HnsbvliKvnvJbnoIEnLCBmaWVsZDogJ21hcmtldFNoYXJlUHJvZHVjdFR5cGUnIH0sXG4gICAgICAgICB7IGhlYWRlck5hbWU6ICfluILlnLrku73pop3kuqflk4HnsbvliKvkuK3mlocnLCBmaWVsZDogJ21hcmtldFNoYXJlUHJvZHVjdFR5cGVDTicgfSxcbiAgICAgICAgIHsgaGVhZGVyTmFtZTogJ+W4guWcuuS7vemineS6p+WTgeexu+WIq+iLseaWhycsIGZpZWxkOiAnbWFya2V0U2hhcmVQcm9kdWN0VHlwZUVOJyB9LFxuICAgICAgICAgXTtcbiAgICB9XG5cblx0IG5nT25Jbml0KCk6IHZvaWQge1xuXHQgXHR0aGlzLmdyaWRPcHRpb25zID0gVXRpbC5nZXRMYXp5TG9hZGluZ0dyaWRPcHRpb25zKFxuICAgICAgICAgXCLliqDovb3kuK1cIixcbiAgICAgICAgIFwi5peg5pWw5o2uXCJcbiAgICAgICk7XG4gICAgICAgdGhpcy5ncmlkT3B0aW9ucy5yb3dCdWZmZXIgPSAwO1xuICAgICAgIHRoaXMuZ3JpZE9wdGlvbnMucm93U2VsZWN0aW9uID0gXCJtdWx0aXBsZVwiO1xuICAgICAgIHRoaXMuZ3JpZE9wdGlvbnMucm93TW9kZWxUeXBlID0gXCJ2aXJ0dWFsXCI7XG4gICAgICAgdGhpcy5ncmlkT3B0aW9ucy5wYWdpbmF0aW9uUGFnZVNpemUgPSAxMDA7XG4gICAgICAgdGhpcy5ncmlkT3B0aW9ucy5jYWNoZU92ZXJmbG93U2l6ZSA9IDI7XG4gICAgICAgdGhpcy5ncmlkT3B0aW9ucy5tYXhDb25jdXJyZW50RGF0YXNvdXJjZVJlcXVlc3RzID0gMTtcbiAgICAgICB0aGlzLmdyaWRPcHRpb25zLmluZmluaXRlSW5pdGlhbFJvd0NvdW50ID0gMTAwMDtcbiAgICAgICB0aGlzLmdyaWRPcHRpb25zLm1heEJsb2Nrc0luQ2FjaGUgPSAxMDtcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5ncmlkT3B0aW9ucylcblx0IH1cblxuXHQgaW5pdERhdGEoKXtcbiAgICAgIFx0XG5cdFx0dGhpcy5odHRwLnBvc3QoJy9pRGF0YS9hcGkvcHJvZHVjdC9saXN0JywgSlNPTi5zdHJpbmdpZnkoeyBvZmZzZXQ6IDAsIGxpbWl0OiAxIH0pLCB0aGlzLm9wdGlvbnMpLnN1YnNjcmliZSgodGRhdGE6YW55KT0+IHtcbiAgICAgICAgIGxldCB0b3RhbENvdW50O1xuICAgICAgICAgaWYodGRhdGEuX2JvZHkpe1xuICAgICAgICAgICB0b3RhbENvdW50ID0gdGRhdGEuanNvbigpLnRvdGFsQ291bnQ7XG4gICAgICAgICAgIGNvbnNvbGUubG9nKHRvdGFsQ291bnQpXG4gICAgICAgICB9XG4gICAgICAgICBsZXQgZGF0YVNvdXJjZSA9IHtcbiAgICAgICAgICAgICAgcm93Q291bnQ6IG51bGwsXG4gICAgICAgICAgICAgIGdldFJvd3M6IChpdGVtcyk9PntcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImFza2luZyBmb3IgXCIgKyBpdGVtcy5zdGFydFJvdyArIFwiIHRvIFwiICsgaXRlbXMuZW5kUm93KTtcbiAgICAgICAgICAgICAgICBsZXQgbGFzdFJvdyA9IC0xO1xuICAgICAgICAgICAgICAgIGlmICh0b3RhbENvdW50IDw9IGl0ZW1zLmVuZFJvdykge1xuICAgICAgICAgICAgICAgICAgbGFzdFJvdyA9IHRvdGFsQ291bnQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuaHR0cC5wb3N0KCcvaURhdGEvYXBpL3Byb2R1Y3QvbGlzdCcsIEpTT04uc3RyaW5naWZ5KHsgb2Zmc2V0OiBpdGVtcy5zdGFydFJvdywgbGltaXQ6IDEwMCB9KSwgdGhpcy5vcHRpb25zKS5zdWJzY3JpYmUoKGRhdGE6YW55KT0+IHtcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEuanNvbigpLnByb2R1Y3RMaXN0KVxuICAgICAgICAgICAgICAgICAgaWYoZGF0YS5fYm9keSl7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zLnN1Y2Nlc3NDYWxsYmFjayhkYXRhLmpzb24oKS5wcm9kdWN0TGlzdCwgbGFzdFJvdyk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnBhcmFtcy5hcGkuc2V0RGF0YXNvdXJjZShkYXRhU291cmNlKTtcblx0XHRcblx0XHR9KVxuICAgfVxuXG4gICBnZXRBbGxCdUxpc3QoKXtcbiAgICAgIHRoaXMuYnVMaXN0ID0gW107XG4gICAgICB0aGlzLmh0dHAucG9zdCgnL2lEYXRhL2FwaS9idS9saXN0JywgSlNPTi5zdHJpbmdpZnkoeyBvZmZzZXQ6IDAsIGxpbWl0OiAxMDAgfSksIHRoaXMub3B0aW9ucykuc3Vic2NyaWJlKChkYXRhOmFueSk9PiB7XG4gICAgICAgICBpZihkYXRhLl9ib2R5KXtcbiAgICAgICAgIHRoaXMuYnVMaXN0ID0gZGF0YS5qc29uKCkubGlzdDtcbiAgICAgIH1cbiAgICAgIH0pXG5cblxuICAgfVxuXG4gICBvbkZpbGVHcmlkUmVhZHkoZ3JpZCkge1xuICAgICAgdGhpcy5wYXJhbXMgPSBncmlkO1xuICAgICAgdGhpcy5pbml0RGF0YSgpO1xuICAgICAgZ3JpZC5hcGkuc2l6ZUNvbHVtbnNUb0ZpdCgpO1xuICAgICAgZ3JpZC5hcGkuZ2V0Um93Tm9kZUlkID0gaXRlbSA9PiBpdGVtLmF0dGFjaEdyb3VwO1xuICAgfVxuXG4gICBnZXQgc2VjbGV0ZWRCdSgpIHtcbiAgICAgIGlmICghdGhpcy5idUdyaWQgfHwgIXRoaXMuYnVHcmlkLmFwaSkge1xuICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG5cbiAgICAgIGxldCByb3dzID0gdGhpcy5idUdyaWQuYXBpLmdldFNlbGVjdGVkUm93cygpO1xuICAgICAgcmV0dXJuIHJvd3MubGVuZ3RoID4gMCA/IHJvd3NbMF0gOiBudWxsO1xuICAgfVxuXG4gICBvblJvd1NlbGVjdGVkKCl7XG4gICBcdC8vIHRoaXMuY2hvb3NlQnUgPSB0aGlzLnNlY2xldGVkQnU7XG4gICBcdHRoaXMuc2hvd0l0ZW0gPSB0cnVlO1xuICAgXHR0aGlzLmlzTmV3ID0gdHJ1ZTtcbiAgIFx0dGhpcy5idURldGFpbCA9IHRoaXMuc2VjbGV0ZWRCdTtcbiAgICAgIHRoaXMuc2VjbGV0ZWRCdS5idVN0ciA9IHRoaXMuc2VjbGV0ZWRCdS5idUNvZGUrJy0nK3RoaXMuc2VjbGV0ZWRCdS5idU5hbWVcbiAgIH1cblxuICAgcmVtb3ZlSXRlbSgpe1xuICAgXHR0aGlzLmFsZXJ0LnNob3coKS5zdWJzY3JpYmUocmVzdWx0ID0+IHtcbiAgICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgdGhpcy5odHRwLmRlbGV0ZSgnL2lEYXRhL2FwaS9wcm9kdWN0LycrdGhpcy5idURldGFpbC5pZCwgdGhpcy5vcHRpb25zKS5zdWJzY3JpYmUoKGRhdGEpPT4ge1xuXHRcdFx0XHR0aGlzLmluaXREYXRhKCk7XG5cdFx0XHRcdHRoaXMuaXNOZXcgPSBmYWxzZTtcblx0XHRcdFx0dGhpcy5zaG93SXRlbSA9IGZhbHNlO1xuXHRcdFx0fSlcbiAgICAgICAgIH1cbiAgICAgIH0pO1xuICAgXHRcdFxuICAgfVxuXG4gICBvbkJ0bk5ld0NsaWNrZWQoKXtcbiAgIFx0dGhpcy5zaG93SXRlbSA9IHRydWU7XG4gICBcdHRoaXMuaXNOZXcgPSBmYWxzZTtcbiAgIFx0dGhpcy5idURldGFpbCA9IHt9O1xuICAgICAgdGhpcy5idURldGFpbC55ZWFyID0gKG5ldyBEYXRlKCkpLmdldEZ1bGxZZWFyKCk7XG4gICAgICB0aGlzLmJ1RGV0YWlsLmNhdGVnb3J5Q29kZSA9ICdwcm9kdWN0MDEnO1xuICAgfVxuXG4gICBvbkJ0blN1cmUoKXtcbiAgIFx0dGhpcy5idURldGFpbC5zdGF0dXMgPSAxO1xuICAgICAgbGV0IHN0ciA9IHRoaXMuYnVEZXRhaWwuYnVTdHI7XG4gICAgICAgdGhpcy5idURldGFpbC5idUNvZGUgPSBzdHIuc3BsaXQoJy0nKVsnMCddO1xuICAgICAgIHRoaXMuYnVEZXRhaWwuYnVOYW1lID0gc3RyLnNwbGl0KCctJylbJzEnXTtcbiAgIFx0aWYodGhpcy5idURldGFpbC5pZCl7XG4gICBcdFx0dGhpcy5odHRwLnB1dCgnL2lEYXRhL2FwaS9wcm9kdWN0L3VwZGF0ZScsIEpTT04uc3RyaW5naWZ5KHRoaXMuYnVEZXRhaWwpLCB0aGlzLm9wdGlvbnMpLnN1YnNjcmliZSgoZGF0YSk9PiB7XG5cdFx0XHR0aGlzLmluaXREYXRhKCk7XG5cdFx0XHR0aGlzLnNob3dJdGVtID0gZmFsc2U7XG5cdFx0fSlcbiAgIFx0fWVsc2V7XG4gICBcdFx0dGhpcy5odHRwLnBvc3QoJy9pRGF0YS9hcGkvcHJvZHVjdC9hZGQnLCBKU09OLnN0cmluZ2lmeSh0aGlzLmJ1RGV0YWlsKSwgdGhpcy5vcHRpb25zKS5zdWJzY3JpYmUoKGRhdGEpPT4ge1xuXHRcdFx0dGhpcy5pbml0RGF0YSgpO1xuXHRcdFx0dGhpcy5zaG93SXRlbSA9IGZhbHNlO1xuXHRcdH0pXG4gICBcdH1cbiAgIFx0XG4gICB9XG59Il19
