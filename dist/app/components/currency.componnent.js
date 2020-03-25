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
var CurrencyManageComponent = (function () {
    function CurrencyManageComponent(http) {
        this.http = http;
        this.buList = [];
        this.rowData = [];
        this.fileGridColumns = [];
        this.chooseBu = {};
        this.showItem = false;
        this.buDetail = {};
        this.isNew = false;
        this.options = new http_1.RequestOptions({ headers: new http_1.Headers({ 'Content-Type': 'application/json' }) });
        this.fileGridColumns = [
            { headerName: '货币简称', field: 'currencyShortName' },
            { headerName: '货币名称', field: 'currencyName' },
        ];
    }
    CurrencyManageComponent.prototype.ngAfterViewInit = function () {
        this.initData();
        this.getAllBuList();
    };
    CurrencyManageComponent.prototype.ngOnInit = function () {
    };
    CurrencyManageComponent.prototype.initData = function () {
        var _this = this;
        this.http.post('/iData/api/currency/list', JSON.stringify({ offset: 0, limit: 1000 }), this.options).subscribe(function (data) {
            if (data._body) {
                _this.rowData = data.json().CurrencyList;
            }
        });
    };
    CurrencyManageComponent.prototype.getAllBuList = function () {
        var _this = this;
        this.buList = [];
        this.http.post('/iData/api/bu/list', JSON.stringify({ offset: 0, limit: 100 }), this.options).subscribe(function (data) {
            _this.buList = data.json().list;
        });
    };
    CurrencyManageComponent.prototype.onFileGridReady = function (grid) {
        grid.api.sizeColumnsToFit();
        grid.api.getRowNodeId = function (item) { return item.attachGroup; };
    };
    Object.defineProperty(CurrencyManageComponent.prototype, "secletedBu", {
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
    CurrencyManageComponent.prototype.onRowSelected = function () {
        // this.chooseBu = this.secletedBu;
        this.showItem = true;
        this.isNew = true;
        this.buDetail = this.secletedBu;
        console.log(this.buDetail);
    };
    CurrencyManageComponent.prototype.removeItem = function () {
        var _this = this;
        this.alert.show().subscribe(function (result) {
            if (result) {
                _this.http.delete('/iData/api/currency/' + _this.buDetail.id, _this.options).subscribe(function (data) {
                    _this.initData();
                    _this.isNew = false;
                    _this.showItem = false;
                });
            }
        });
    };
    CurrencyManageComponent.prototype.onBtnNewClicked = function () {
        this.showItem = true;
        this.isNew = false;
        this.buDetail = {
            currencyShortName: '',
            currencyName: '',
        };
    };
    CurrencyManageComponent.prototype.onBtnSure = function () {
        var _this = this;
        this.buDetail.status = 1;
        if (this.buDetail.id) {
            this.http.put('/iData/api/currency/update', JSON.stringify(this.buDetail), this.options).subscribe(function (data) {
                _this.initData();
                _this.showItem = false;
            });
        }
        else {
            this.http.post('/iData/api/currency/add', JSON.stringify(this.buDetail), this.options).subscribe(function (data) {
                _this.initData();
                _this.showItem = false;
            });
        }
    };
    return CurrencyManageComponent;
}());
__decorate([
    core_1.ViewChild("buGrid"),
    __metadata("design:type", Object)
], CurrencyManageComponent.prototype, "buGrid", void 0);
__decorate([
    core_1.ViewChild("alert"),
    __metadata("design:type", alert_widget_1.AlertWidget)
], CurrencyManageComponent.prototype, "alert", void 0);
CurrencyManageComponent = __decorate([
    core_1.Component({
        selector: "currency",
        templateUrl: "views/dataManage/currency.manage.html"
    }),
    __metadata("design:paramtypes", [http_1.Http])
], CurrencyManageComponent);
exports.CurrencyManageComponent = CurrencyManageComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvY3VycmVuY3kuY29tcG9ubmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsc0NBQW1EO0FBQ25ELHNDQUEwRDtBQUUxRCx3REFBb0Q7QUFNcEQ7SUFpQkksaUNBQW9CLElBQVM7UUFBVCxTQUFJLEdBQUosSUFBSSxDQUFLO1FBaEJ6QixXQUFNLEdBQWEsRUFBRSxDQUFDO1FBRzFCLFlBQU8sR0FBZSxFQUFFLENBQUM7UUFDekIsb0JBQWUsR0FBYSxFQUFFLENBQUM7UUFDL0IsYUFBUSxHQUFPLEVBQUUsQ0FBQztRQUNsQixhQUFRLEdBQVUsS0FBSyxDQUFDO1FBQ3hCLGFBQVEsR0FBTyxFQUFFLENBQUM7UUFDbEIsVUFBSyxHQUFXLEtBQUssQ0FBQztRQUN0QixZQUFPLEdBQUcsSUFBSSxxQkFBYyxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksY0FBTyxDQUFDLEVBQUUsY0FBYyxFQUFFLGtCQUFrQixFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7UUFRN0YsSUFBSSxDQUFDLGVBQWUsR0FBRztZQUN0QixFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLG1CQUFtQixFQUFFO1lBQ2xELEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsY0FBYyxFQUFFO1NBQzVDLENBQUM7SUFDTCxDQUFDO0lBRUQsaURBQWUsR0FBZjtRQUNFLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNqQixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7SUFFckIsQ0FBQztJQUVELDBDQUFRLEdBQVI7SUFFQSxDQUFDO0lBRUQsMENBQVEsR0FBUjtRQUFBLGlCQVFBO1FBTkUsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsMEJBQTBCLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLE9B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bmN5LmNvbXBvbm5lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgVmlld0NoaWxkfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtIdHRwLFJlcXVlc3RPcHRpb25zLEhlYWRlcnN9IGZyb20gXCJAYW5ndWxhci9odHRwXCI7XG5pbXBvcnQge0dyaWRPcHRpb25zLCBDb2xEZWZ9IGZyb20gXCJhZy1ncmlkXCI7XG5pbXBvcnQge0FsZXJ0V2lkZ2V0fSBmcm9tIFwiLi4vd2lkZ2V0cy9hbGVydC53aWRnZXRcIjtcblxuQENvbXBvbmVudCh7XG4gICBzZWxlY3RvcjogXCJjdXJyZW5jeVwiLFxuICAgdGVtcGxhdGVVcmw6IFwidmlld3MvZGF0YU1hbmFnZS9jdXJyZW5jeS5tYW5hZ2UuaHRtbFwiXG59KVxuZXhwb3J0IGNsYXNzIEN1cnJlbmN5TWFuYWdlQ29tcG9uZW50IHtcblx0cHVibGljIGJ1TGlzdDogQXJyYXk8YW55Pj1bXTtcbiAgICBncmlkT3B0aW9uczogR3JpZE9wdGlvbnM7XG4gICAgZ3JpZENvbHVtbnM6IENvbERlZltdO1xuICAgIHJvd0RhdGE6IEFycmF5PGFueT4gPSBbXTtcbiAgICBmaWxlR3JpZENvbHVtbnM6IENvbERlZltdID0gW107XG4gICAgY2hvb3NlQnU6YW55ID0ge307XG4gICAgc2hvd0l0ZW06Ym9vbGVhbj0gZmFsc2U7XG4gICAgYnVEZXRhaWw6YW55ID0ge307XG4gICAgaXNOZXc6Ym9vbGVhbiA9IGZhbHNlO1xuICAgIG9wdGlvbnMgPSBuZXcgUmVxdWVzdE9wdGlvbnMoeyBoZWFkZXJzOiBuZXcgSGVhZGVycyh7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSkgfSk7XG5cbiAgICBAVmlld0NoaWxkKFwiYnVHcmlkXCIpXG4gICAgICAgYnVHcmlkOiBHcmlkT3B0aW9ucztcbiAgICAgICAgQFZpZXdDaGlsZChcImFsZXJ0XCIpXG4gICAgICBhbGVydDogQWxlcnRXaWRnZXQ7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6SHR0cCl7XG4gICAgICB0aGlzLmZpbGVHcmlkQ29sdW1ucyA9IFtcbiAgICAgICB7IGhlYWRlck5hbWU6ICfotKfluIHnroDnp7AnLCBmaWVsZDogJ2N1cnJlbmN5U2hvcnROYW1lJyB9LFxuICAgICAgIHsgaGVhZGVyTmFtZTogJ+i0p+W4geWQjeensCcsIGZpZWxkOiAnY3VycmVuY3lOYW1lJyB9LFxuICAgICAgIF07XG4gICAgfVxuXG4gICAgbmdBZnRlclZpZXdJbml0KCl7XG4gICAgICB0aGlzLmluaXREYXRhKCk7XG4gICAgIHRoaXMuZ2V0QWxsQnVMaXN0KCk7XG4gICAgIFxuICAgIH1cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgIFxuICAgIH1cblxuICAgIGluaXREYXRhKCl7XG4gICAgICAgICBcbiAgICAgIHRoaXMuaHR0cC5wb3N0KCcvaURhdGEvYXBpL2N1cnJlbmN5L2xpc3QnLCBKU09OLnN0cmluZ2lmeSh7IG9mZnNldDogMCwgbGltaXQ6IDEwMDAgfSksIHRoaXMub3B0aW9ucykuc3Vic2NyaWJlKChkYXRhKT0+IHtcbiAgICAgICAgIGlmKGRhdGEuX2JvZHkpe1xuICAgICAgICAgdGhpcy5yb3dEYXRhID0gZGF0YS5qc29uKCkuQ3VycmVuY3lMaXN0O1xuICAgICAgIH1cbiAgICAgIH0pXG5cbiAgIH1cblxuICAgZ2V0QWxsQnVMaXN0KCl7XG4gICAgICB0aGlzLmJ1TGlzdCA9IFtdO1xuICAgICAgdGhpcy5odHRwLnBvc3QoJy9pRGF0YS9hcGkvYnUvbGlzdCcsIEpTT04uc3RyaW5naWZ5KHsgb2Zmc2V0OiAwLCBsaW1pdDogMTAwIH0pLCB0aGlzLm9wdGlvbnMpLnN1YnNjcmliZSgoZGF0YSk9PiB7XG4gICAgICAgICB0aGlzLmJ1TGlzdCA9IGRhdGEuanNvbigpLmxpc3Q7XG4gICAgICB9KVxuICAgfVxuXG4gICBvbkZpbGVHcmlkUmVhZHkoZ3JpZCkge1xuICAgICAgZ3JpZC5hcGkuc2l6ZUNvbHVtbnNUb0ZpdCgpO1xuICAgICAgZ3JpZC5hcGkuZ2V0Um93Tm9kZUlkID0gaXRlbSA9PiBpdGVtLmF0dGFjaEdyb3VwO1xuICAgfVxuXG4gICBnZXQgc2VjbGV0ZWRCdSgpIHtcbiAgICAgIGlmICghdGhpcy5idUdyaWQgfHwgIXRoaXMuYnVHcmlkLmFwaSkge1xuICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG5cbiAgICAgIGxldCByb3dzID0gdGhpcy5idUdyaWQuYXBpLmdldFNlbGVjdGVkUm93cygpO1xuICAgICAgcmV0dXJuIHJvd3MubGVuZ3RoID4gMCA/IHJvd3NbMF0gOiBudWxsO1xuICAgfVxuXG4gICBvblJvd1NlbGVjdGVkKCl7XG4gICAgICAvLyB0aGlzLmNob29zZUJ1ID0gdGhpcy5zZWNsZXRlZEJ1O1xuICAgICAgdGhpcy5zaG93SXRlbSA9IHRydWU7XG4gICAgICB0aGlzLmlzTmV3ID0gdHJ1ZTtcbiAgICAgIHRoaXMuYnVEZXRhaWwgPSB0aGlzLnNlY2xldGVkQnU7XG4gICAgICBjb25zb2xlLmxvZyh0aGlzLmJ1RGV0YWlsKVxuICAgfVxuXG4gICByZW1vdmVJdGVtKCl7XG4gICAgICB0aGlzLmFsZXJ0LnNob3coKS5zdWJzY3JpYmUocmVzdWx0ID0+IHtcbiAgICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgdGhpcy5odHRwLmRlbGV0ZSgnL2lEYXRhL2FwaS9jdXJyZW5jeS8nK3RoaXMuYnVEZXRhaWwuaWQsIHRoaXMub3B0aW9ucykuc3Vic2NyaWJlKChkYXRhKT0+IHtcbiAgICAgICAgICAgIHRoaXMuaW5pdERhdGEoKTtcbiAgICAgICAgICAgIHRoaXMuaXNOZXcgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuc2hvd0l0ZW0gPSBmYWxzZTtcbiAgICAgICAgIH0pXG4gICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgICAgIFxuICAgfVxuXG4gICBvbkJ0bk5ld0NsaWNrZWQoKXtcbiAgICAgIHRoaXMuc2hvd0l0ZW0gPSB0cnVlO1xuICAgICAgdGhpcy5pc05ldyA9IGZhbHNlO1xuICAgICAgdGhpcy5idURldGFpbCA9IHtcbiAgICAgICAgIGN1cnJlbmN5U2hvcnROYW1lOiAnJyxcbiAgICAgICAgIGN1cnJlbmN5TmFtZTogJycsXG4gICAgICB9XG4gICB9XG5cbiAgIG9uQnRuU3VyZSgpe1xuICAgICAgdGhpcy5idURldGFpbC5zdGF0dXMgPSAxO1xuICAgICAgaWYodGhpcy5idURldGFpbC5pZCl7XG4gICAgICAgICB0aGlzLmh0dHAucHV0KCcvaURhdGEvYXBpL2N1cnJlbmN5L3VwZGF0ZScsIEpTT04uc3RyaW5naWZ5KHRoaXMuYnVEZXRhaWwpLCB0aGlzLm9wdGlvbnMpLnN1YnNjcmliZSgoZGF0YSk9PiB7XG4gICAgICAgICB0aGlzLmluaXREYXRhKCk7XG4gICAgICAgICB0aGlzLnNob3dJdGVtID0gZmFsc2U7XG4gICAgICB9KVxuICAgICAgfWVsc2V7XG4gICAgICAgICB0aGlzLmh0dHAucG9zdCgnL2lEYXRhL2FwaS9jdXJyZW5jeS9hZGQnLCBKU09OLnN0cmluZ2lmeSh0aGlzLmJ1RGV0YWlsKSwgdGhpcy5vcHRpb25zKS5zdWJzY3JpYmUoKGRhdGEpPT4ge1xuICAgICAgICAgdGhpcy5pbml0RGF0YSgpO1xuICAgICAgICAgdGhpcy5zaG93SXRlbSA9IGZhbHNlO1xuICAgICAgfSlcbiAgICAgIH1cbiAgICAgIFxuICAgfVxufSJdfQ==
