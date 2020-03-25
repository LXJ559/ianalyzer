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
var BuManageComponent = (function () {
    function BuManageComponent(http) {
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
            { headerName: 'BUCODE', field: 'bucode' },
            { headerName: 'BU名称', field: 'bunamecn' },
        ];
    }
    BuManageComponent.prototype.ngAfterViewInit = function () {
        this.initData();
    };
    BuManageComponent.prototype.ngOnInit = function () {
        // this.initData();
        // this.fileGridColumns = [
        // { headerName: 'BUCODE', field: 'bucode' },
        // { headerName: 'BU名称', field: 'bunamecn' },
        // ];
    };
    BuManageComponent.prototype.initData = function () {
        var _this = this;
        this.buList = [];
        this.http.post('/iData/api/bu/list', JSON.stringify({ offset: 0, limit: 1000 }), this.options).subscribe(function (data) {
            if (data._body) {
                _this.rowData = data.json().list;
            }
        });
    };
    BuManageComponent.prototype.onFileGridReady = function (grid) {
        grid.api.sizeColumnsToFit();
        grid.api.getRowNodeId = function (item) { return item.attachGroup; };
    };
    Object.defineProperty(BuManageComponent.prototype, "secletedBu", {
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
    BuManageComponent.prototype.onRowSelected = function () {
        // this.chooseBu = this.secletedBu;
        this.showItem = true;
        this.isNew = true;
        this.buDetail = this.secletedBu;
    };
    BuManageComponent.prototype.removeItem = function () {
        var _this = this;
        this.alert.show().subscribe(function (result) {
            if (result) {
                _this.http.delete('/iData/api/bu/' + _this.buDetail.id, _this.options).subscribe(function (data) {
                    _this.initData();
                    _this.isNew = false;
                    _this.showItem = false;
                });
            }
        });
    };
    BuManageComponent.prototype.onBtnNewClicked = function () {
        this.showItem = true;
        this.isNew = false;
        this.buDetail = {
            bucode: '',
            bunamecn: ''
        };
    };
    BuManageComponent.prototype.onBtnSure = function () {
        var _this = this;
        this.buDetail.status = 1;
        if (this.buDetail.id) {
            this.http.put('/iData/api/bu/update', JSON.stringify(this.buDetail), this.options).subscribe(function (data) {
                _this.initData();
                _this.showItem = false;
            });
        }
        else {
            this.http.post('/iData/api/bu/add', JSON.stringify(this.buDetail), this.options).subscribe(function (data) {
                _this.initData();
                _this.showItem = false;
            });
        }
    };
    return BuManageComponent;
}());
__decorate([
    core_1.ViewChild("buGrid"),
    __metadata("design:type", Object)
], BuManageComponent.prototype, "buGrid", void 0);
__decorate([
    core_1.ViewChild("alert"),
    __metadata("design:type", alert_widget_1.AlertWidget)
], BuManageComponent.prototype, "alert", void 0);
BuManageComponent = __decorate([
    core_1.Component({
        selector: "bu",
        templateUrl: "views/dataManage/bu.manage.html"
    }),
    __metadata("design:paramtypes", [http_1.Http])
], BuManageComponent);
exports.BuManageComponent = BuManageComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvYnUuY29tcG9ubmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsc0NBQW1EO0FBQ25ELHNDQUEwRDtBQUUxRCx3REFBb0Q7QUFNcEQ7SUFpQkUsMkJBQW9CLElBQVM7UUFBVCxTQUFJLEdBQUosSUFBSSxDQUFLO1FBaEJ0QixXQUFNLEdBQWEsRUFBRSxDQUFDO1FBRzFCLFlBQU8sR0FBZSxFQUFFLENBQUM7UUFDekIsb0JBQWUsR0FBYSxFQUFFLENBQUM7UUFDbEMsYUFBUSxHQUFPLEVBQUUsQ0FBQztRQUNsQixhQUFRLEdBQVUsS0FBSyxDQUFDO1FBQ3hCLGFBQVEsR0FBTyxFQUFFLENBQUM7UUFDbEIsVUFBSyxHQUFXLEtBQUssQ0FBQztRQUN0QixZQUFPLEdBQUcsSUFBSSxxQkFBYyxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksY0FBTyxDQUFDLEVBQUUsY0FBYyxFQUFFLGtCQUFrQixFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7UUFRMUYsSUFBSSxDQUFDLGVBQWUsR0FBRztZQUNyQixFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRTtZQUN6QyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRTtTQUN4QyxDQUFDO0lBQ1QsQ0FBQztJQUVDLDJDQUFlLEdBQWY7UUFDRyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7SUFFbkIsQ0FBQztJQUVILG9DQUFRLEdBQVI7UUFDQyxtQkFBbUI7UUFDbkIsMkJBQTJCO1FBQzNCLDZDQUE2QztRQUM3Qyw2Q0FBNkM7UUFDN0MsS0FBSztJQUNOLENBQUM7SUFFRCxvQ0FBUSxHQUFSO1FBQUEsaUJBU0U7UUFSRSxJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUVyQixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsTUFB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USxHQUFHLEtBQUssQ0FBQztZQUN2QixDQUFDLENBQUMsQ0FBQTtRQUNBLENBQUM7UUFBQSxJQUFJLENBQUEsQ0FBQztZQUNMLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLG1CQUFtQixFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQyxJQUFJO2dCQUNsRyxLQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7Z0JBQ2hCLEtBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1lBQ3ZCLENBQUMsQ0FBQyxDQUFBO1FBQ0EsQ0FBQztJQUVGLENBQUM7SUFDSix3QkFBQztBQUFELENBMUdBLEFBMEdDLElBQUE7QUE3Rkk7SUFERixnQkFBUyxDQUFDLFFBQVEsQ0FBQzs7aURBQ0c7QUFFckI7SUFERyxnQkFBUyxDQUFDLE9BQU8sQ0FBQzs4QkFDZCwwQkFBVztnREFBQztBQWZ2QjtJQUpDLGdCQUFTLENBQUM7UUFDUixRQUFRLEVBQUUsSUFBSTtRQUNkLFdBQVcsRUFBRSxpQ0FBaUM7S0FDaEQsQ0FBQztxQ0FrQnlCLFdBQUk7cUJBeUY5QjtBQTFHWSw0QkFBQSxpQkFBaUIsQ0FBQSIsImZpbGUiOiJjb21wb25lbnRzL2J1LmNvbXBvbm5lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgVmlld0NoaWxkfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtIdHRwLFJlcXVlc3RPcHRpb25zLEhlYWRlcnN9IGZyb20gXCJAYW5ndWxhci9odHRwXCI7XG5pbXBvcnQge0dyaWRPcHRpb25zLCBDb2xEZWZ9IGZyb20gXCJhZy1ncmlkXCI7XG5pbXBvcnQge0FsZXJ0V2lkZ2V0fSBmcm9tIFwiLi4vd2lkZ2V0cy9hbGVydC53aWRnZXRcIjtcblxuQENvbXBvbmVudCh7XG4gICBzZWxlY3RvcjogXCJidVwiLFxuICAgdGVtcGxhdGVVcmw6IFwidmlld3MvZGF0YU1hbmFnZS9idS5tYW5hZ2UuaHRtbFwiXG59KVxuZXhwb3J0IGNsYXNzIEJ1TWFuYWdlQ29tcG9uZW50IHtcblx0IHB1YmxpYyBidUxpc3Q6IEFycmF5PGFueT49W107XG5cdCBncmlkT3B0aW9uczogR3JpZE9wdGlvbnM7XG4gICBcdCBncmlkQ29sdW1uczogQ29sRGVmW107XG4gICBcdCByb3dEYXRhOiBBcnJheTxhbnk+ID0gW107XG4gICBcdCBmaWxlR3JpZENvbHVtbnM6IENvbERlZltdID0gW107XG5cdCBjaG9vc2VCdTphbnkgPSB7fTtcblx0IHNob3dJdGVtOmJvb2xlYW49IGZhbHNlO1xuXHQgYnVEZXRhaWw6YW55ID0ge307XG5cdCBpc05ldzpib29sZWFuID0gZmFsc2U7XG5cdCBvcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHsgaGVhZGVyczogbmV3IEhlYWRlcnMoeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nIH0pIH0pO1xuXG5cdCBAVmlld0NoaWxkKFwiYnVHcmlkXCIpXG4gICBcdCBidUdyaWQ6IEdyaWRPcHRpb25zO1xuICAgXHQgIEBWaWV3Q2hpbGQoXCJhbGVydFwiKVxuICAgXHRhbGVydDogQWxlcnRXaWRnZXQ7XG5cblx0IGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDpIdHRwKXtcbiAgICAgICB0aGlzLmZpbGVHcmlkQ29sdW1ucyA9IFtcbiAgICAgICAgIHsgaGVhZGVyTmFtZTogJ0JVQ09ERScsIGZpZWxkOiAnYnVjb2RlJyB9LFxuICAgICAgICAgeyBoZWFkZXJOYW1lOiAnQlXlkI3np7AnLCBmaWVsZDogJ2J1bmFtZWNuJyB9LFxuICAgICAgICAgXTtcblx0IH1cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAgICB0aGlzLmluaXREYXRhKCk7XG4gICAgICAgXG4gICAgfVxuXG5cdCBuZ09uSW5pdCgpOiB2b2lkIHtcblx0IFx0Ly8gdGhpcy5pbml0RGF0YSgpO1xuXHQgXHQvLyB0aGlzLmZpbGVHcmlkQ29sdW1ucyA9IFtcblx0XHRcdC8vIHsgaGVhZGVyTmFtZTogJ0JVQ09ERScsIGZpZWxkOiAnYnVjb2RlJyB9LFxuXHRcdFx0Ly8geyBoZWFkZXJOYW1lOiAnQlXlkI3np7AnLCBmaWVsZDogJ2J1bmFtZWNuJyB9LFxuXHRcdFx0Ly8gXTtcblx0IH1cblxuXHQgaW5pdERhdGEoKXtcbiAgICAgIHRoaXMuYnVMaXN0ID0gW107XG5cblx0XHR0aGlzLmh0dHAucG9zdCgnL2lEYXRhL2FwaS9idS9saXN0JywgSlNPTi5zdHJpbmdpZnkoeyBvZmZzZXQ6IDAsIGxpbWl0OiAxMDAwIH0pLCB0aGlzLm9wdGlvbnMpLnN1YnNjcmliZSgoZGF0YSk9PiB7XG4gICAgICAgICBpZihkYXRhLl9ib2R5KXtcbiAgIFx0XHRcdHRoaXMucm93RGF0YSA9IGRhdGEuanNvbigpLmxpc3Q7XG4gICAgICAgICB9XG5cdFx0fSlcblxuICAgfVxuXG4gICBvbkZpbGVHcmlkUmVhZHkoZ3JpZCkge1xuICAgICAgZ3JpZC5hcGkuc2l6ZUNvbHVtbnNUb0ZpdCgpO1xuICAgICAgZ3JpZC5hcGkuZ2V0Um93Tm9kZUlkID0gaXRlbSA9PiBpdGVtLmF0dGFjaEdyb3VwO1xuICAgfVxuXG4gICBnZXQgc2VjbGV0ZWRCdSgpIHtcbiAgICAgIGlmICghdGhpcy5idUdyaWQgfHwgIXRoaXMuYnVHcmlkLmFwaSkge1xuICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG5cbiAgICAgIGxldCByb3dzID0gdGhpcy5idUdyaWQuYXBpLmdldFNlbGVjdGVkUm93cygpO1xuICAgICAgcmV0dXJuIHJvd3MubGVuZ3RoID4gMCA/IHJvd3NbMF0gOiBudWxsO1xuICAgfVxuXG4gICBvblJvd1NlbGVjdGVkKCl7XG4gICBcdC8vIHRoaXMuY2hvb3NlQnUgPSB0aGlzLnNlY2xldGVkQnU7XG4gICBcdHRoaXMuc2hvd0l0ZW0gPSB0cnVlO1xuICAgXHR0aGlzLmlzTmV3ID0gdHJ1ZTtcbiAgIFx0dGhpcy5idURldGFpbCA9IHRoaXMuc2VjbGV0ZWRCdTtcbiAgIH1cblxuICAgcmVtb3ZlSXRlbSgpe1xuICAgXHR0aGlzLmFsZXJ0LnNob3coKS5zdWJzY3JpYmUocmVzdWx0ID0+IHtcbiAgICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgdGhpcy5odHRwLmRlbGV0ZSgnL2lEYXRhL2FwaS9idS8nK3RoaXMuYnVEZXRhaWwuaWQsIHRoaXMub3B0aW9ucykuc3Vic2NyaWJlKChkYXRhKT0+IHtcblx0XHRcdFx0dGhpcy5pbml0RGF0YSgpO1xuXHRcdFx0XHR0aGlzLmlzTmV3ID0gZmFsc2U7XG5cdFx0XHRcdHRoaXMuc2hvd0l0ZW0gPSBmYWxzZTtcblx0XHRcdH0pXG4gICAgICAgICB9XG4gICAgICB9KTtcbiAgIFx0XHRcbiAgIH1cblxuICAgb25CdG5OZXdDbGlja2VkKCl7XG4gICBcdHRoaXMuc2hvd0l0ZW0gPSB0cnVlO1xuICAgXHR0aGlzLmlzTmV3ID0gZmFsc2U7XG4gICBcdHRoaXMuYnVEZXRhaWwgPSB7XG4gICBcdFx0YnVjb2RlOiAnJyxcbiAgIFx0XHRidW5hbWVjbjogJydcbiAgIFx0fVxuICAgfVxuXG4gICBvbkJ0blN1cmUoKXtcbiAgIFx0dGhpcy5idURldGFpbC5zdGF0dXMgPSAxO1xuICAgXHRpZih0aGlzLmJ1RGV0YWlsLmlkKXtcbiAgIFx0XHR0aGlzLmh0dHAucHV0KCcvaURhdGEvYXBpL2J1L3VwZGF0ZScsIEpTT04uc3RyaW5naWZ5KHRoaXMuYnVEZXRhaWwpLCB0aGlzLm9wdGlvbnMpLnN1YnNjcmliZSgoZGF0YSk9PiB7XG5cdFx0XHR0aGlzLmluaXREYXRhKCk7XG5cdFx0XHR0aGlzLnNob3dJdGVtID0gZmFsc2U7XG5cdFx0fSlcbiAgIFx0fWVsc2V7XG4gICBcdFx0dGhpcy5odHRwLnBvc3QoJy9pRGF0YS9hcGkvYnUvYWRkJywgSlNPTi5zdHJpbmdpZnkodGhpcy5idURldGFpbCksIHRoaXMub3B0aW9ucykuc3Vic2NyaWJlKChkYXRhKT0+IHtcblx0XHRcdHRoaXMuaW5pdERhdGEoKTtcblx0XHRcdHRoaXMuc2hvd0l0ZW0gPSBmYWxzZTtcblx0XHR9KVxuICAgXHR9XG4gICBcdFxuICAgfVxufSJdfQ==
