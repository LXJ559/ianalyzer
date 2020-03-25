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
var HospitalManageComponent = (function () {
    function HospitalManageComponent(http) {
        this.http = http;
        this.buList = [];
        this.rowData = [];
        this.fileGridColumns = [];
        this.chooseBu = {};
        this.showItem = false;
        this.buDetail = {};
        this.isNew = false;
        this.options = new http_1.RequestOptions({ headers: new http_1.Headers({ 'Content-Type': 'application/json' }) });
    }
    HospitalManageComponent.prototype.ngOnInit = function () {
        this.initData();
        this.getAllBuList();
        this.fileGridColumns = [
            { headerName: '医院编号', field: 'hospitalcode' },
            { headerName: '医院名称', field: 'hospitalname' },
            { headerName: 'BU', field: 'buNameCn' },
        ];
    };
    HospitalManageComponent.prototype.initData = function () {
        var _this = this;
        this.http.post('/iData/api/hospital/list', JSON.stringify({ offset: 0, limit: 100 }), this.options).subscribe(function (data) {
            _this.rowData = data.json().hospitalList;
            console.log(data.json());
        });
    };
    HospitalManageComponent.prototype.getAllBuList = function () {
        var _this = this;
        this.buList = [];
        this.http.post('/iData/api/bu/list', JSON.stringify({ offset: 0, limit: 100 }), this.options).subscribe(function (data) {
            _this.buList = data.json().list;
        });
    };
    HospitalManageComponent.prototype.onFileGridReady = function (grid) {
        grid.api.sizeColumnsToFit();
        grid.api.getRowNodeId = function (item) { return item.attachGroup; };
    };
    Object.defineProperty(HospitalManageComponent.prototype, "secletedBu", {
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
    HospitalManageComponent.prototype.onRowSelected = function () {
        // this.chooseBu = this.secletedBu;
        this.showItem = true;
        this.isNew = true;
        this.buDetail = this.secletedBu;
        console.log(this.buDetail);
    };
    HospitalManageComponent.prototype.removeItem = function () {
        var _this = this;
        this.alert.show().subscribe(function (result) {
            if (result) {
                _this.http.delete('/iData/api/hospital/' + _this.buDetail.id, _this.options).subscribe(function (data) {
                    _this.initData();
                    _this.isNew = false;
                    _this.showItem = false;
                });
            }
        });
    };
    HospitalManageComponent.prototype.onBtnNewClicked = function () {
        this.showItem = true;
        this.isNew = false;
        this.buDetail = {
            hospitalcode: '',
            hospitalname: '',
            buCode: ''
        };
    };
    HospitalManageComponent.prototype.onBtnSure = function () {
        var _this = this;
        this.buDetail.status = 1;
        if (this.buDetail.id) {
            this.http.put('/iData/api/hospital/update', JSON.stringify(this.buDetail), this.options).subscribe(function (data) {
                _this.initData();
                _this.showItem = false;
            });
        }
        else {
            this.http.post('/iData/api/hospital/add', JSON.stringify(this.buDetail), this.options).subscribe(function (data) {
                _this.initData();
                _this.showItem = false;
            });
        }
    };
    return HospitalManageComponent;
}());
__decorate([
    core_1.ViewChild("buGrid"),
    __metadata("design:type", Object)
], HospitalManageComponent.prototype, "buGrid", void 0);
__decorate([
    core_1.ViewChild("alert"),
    __metadata("design:type", alert_widget_1.AlertWidget)
], HospitalManageComponent.prototype, "alert", void 0);
HospitalManageComponent = __decorate([
    core_1.Component({
        selector: "hospital",
        templateUrl: "views/dataManage/hospital.manage.html"
    }),
    __metadata("design:paramtypes", [http_1.Http])
], HospitalManageComponent);
exports.HospitalManageComponent = HospitalManageComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvaG9zcGl0YWwuY29tcG9ubmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsc0NBQW1EO0FBQ25ELHNDQUEwRDtBQUUxRCx3REFBb0Q7QUFNcEQ7SUFpQkksaUNBQW9CLElBQVM7UUFBVCxTQUFJLEdBQUosSUFBSSxDQUFLO1FBaEJ6QixXQUFNLEdBQWEsRUFBRSxDQUFDO1FBRzFCLFlBQU8sR0FBZSxFQUFFLENBQUM7UUFDekIsb0JBQWUsR0FBYSxFQUFFLENBQUM7UUFDL0IsYUFBUSxHQUFPLEVBQUUsQ0FBQztRQUNsQixhQUFRLEdBQVUsS0FBSyxDQUFDO1FBQ3hCLGFBQVEsR0FBTyxFQUFFLENBQUM7UUFDbEIsVUFBSyxHQUFXLEtBQUssQ0FBQztRQUN0QixZQUFPLEdBQUcsSUFBSSxxQkFBYyxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksY0FBTyxDQUFDLEVBQUUsY0FBYyxFQUFFLGtCQUFrQixFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7SUFTL0YsQ0FBQztJQUVELDBDQUFRLEdBQVI7UUFDRyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDaEIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxlQUFlLEdBQUc7WUFDckIsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxjQUFjLEVBQUU7WUFDN0MsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxjQUFjLEVBQUU7WUFDN0MsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUU7U0FDdEMsQ0FBQztJQUNQLENBQUM7SUFFRCwwQ0FBUSxHQUFSO1FBQUEsaUJBT0E7UUFMRSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQywwQkFBMEIsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFF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QkFBdUIsQ0FBQSIsImZpbGUiOiJjb21wb25lbnRzL2hvc3BpdGFsLmNvbXBvbm5lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgVmlld0NoaWxkfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtIdHRwLFJlcXVlc3RPcHRpb25zLEhlYWRlcnN9IGZyb20gXCJAYW5ndWxhci9odHRwXCI7XG5pbXBvcnQge0dyaWRPcHRpb25zLCBDb2xEZWZ9IGZyb20gXCJhZy1ncmlkXCI7XG5pbXBvcnQge0FsZXJ0V2lkZ2V0fSBmcm9tIFwiLi4vd2lkZ2V0cy9hbGVydC53aWRnZXRcIjtcblxuQENvbXBvbmVudCh7XG4gICBzZWxlY3RvcjogXCJob3NwaXRhbFwiLFxuICAgdGVtcGxhdGVVcmw6IFwidmlld3MvZGF0YU1hbmFnZS9ob3NwaXRhbC5tYW5hZ2UuaHRtbFwiXG59KVxuZXhwb3J0IGNsYXNzIEhvc3BpdGFsTWFuYWdlQ29tcG9uZW50IHtcbiBwdWJsaWMgYnVMaXN0OiBBcnJheTxhbnk+PVtdO1xuICAgIGdyaWRPcHRpb25zOiBHcmlkT3B0aW9ucztcbiAgICBncmlkQ29sdW1uczogQ29sRGVmW107XG4gICAgcm93RGF0YTogQXJyYXk8YW55PiA9IFtdO1xuICAgIGZpbGVHcmlkQ29sdW1uczogQ29sRGVmW10gPSBbXTtcbiAgICBjaG9vc2VCdTphbnkgPSB7fTtcbiAgICBzaG93SXRlbTpib29sZWFuPSBmYWxzZTtcbiAgICBidURldGFpbDphbnkgPSB7fTtcbiAgICBpc05ldzpib29sZWFuID0gZmFsc2U7XG4gICAgb3B0aW9ucyA9IG5ldyBSZXF1ZXN0T3B0aW9ucyh7IGhlYWRlcnM6IG5ldyBIZWFkZXJzKHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyB9KSB9KTtcblxuICAgIEBWaWV3Q2hpbGQoXCJidUdyaWRcIilcbiAgICAgICBidUdyaWQ6IEdyaWRPcHRpb25zO1xuICAgICAgICBAVmlld0NoaWxkKFwiYWxlcnRcIilcbiAgICAgIGFsZXJ0OiBBbGVydFdpZGdldDtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDpIdHRwKXtcblxuICAgIH1cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgIHRoaXMuaW5pdERhdGEoKTtcbiAgICAgICB0aGlzLmdldEFsbEJ1TGlzdCgpO1xuICAgICAgIHRoaXMuZmlsZUdyaWRDb2x1bW5zID0gW1xuICAgICAgICAgeyBoZWFkZXJOYW1lOiAn5Yy76Zmi57yW5Y+3JywgZmllbGQ6ICdob3NwaXRhbGNvZGUnIH0sXG4gICAgICAgICB7IGhlYWRlck5hbWU6ICfljLvpmaLlkI3np7AnLCBmaWVsZDogJ2hvc3BpdGFsbmFtZScgfSxcbiAgICAgICAgIHsgaGVhZGVyTmFtZTogJ0JVJywgZmllbGQ6ICdidU5hbWVDbicgfSxcbiAgICAgICAgIF07XG4gICAgfVxuXG4gICAgaW5pdERhdGEoKXtcbiAgICAgICAgIFxuICAgICAgdGhpcy5odHRwLnBvc3QoJy9pRGF0YS9hcGkvaG9zcGl0YWwvbGlzdCcsIEpTT04uc3RyaW5naWZ5KHsgb2Zmc2V0OiAwLCBsaW1pdDogMTAwIH0pLCB0aGlzLm9wdGlvbnMpLnN1YnNjcmliZSgoZGF0YSk9PiB7XG4gICAgICAgICB0aGlzLnJvd0RhdGEgPSBkYXRhLmpzb24oKS5ob3NwaXRhbExpc3Q7XG4gICAgICAgICBjb25zb2xlLmxvZyhkYXRhLmpzb24oKSlcbiAgICAgIH0pXG5cbiAgIH1cblxuICAgZ2V0QWxsQnVMaXN0KCl7XG4gICAgICB0aGlzLmJ1TGlzdCA9IFtdO1xuICAgICAgdGhpcy5odHRwLnBvc3QoJy9pRGF0YS9hcGkvYnUvbGlzdCcsIEpTT04uc3RyaW5naWZ5KHsgb2Zmc2V0OiAwLCBsaW1pdDogMTAwIH0pLCB0aGlzLm9wdGlvbnMpLnN1YnNjcmliZSgoZGF0YSk9PiB7XG4gICAgICAgICB0aGlzLmJ1TGlzdCA9IGRhdGEuanNvbigpLmxpc3Q7XG4gICAgICB9KVxuICAgfVxuXG4gICBvbkZpbGVHcmlkUmVhZHkoZ3JpZCkge1xuICAgICAgZ3JpZC5hcGkuc2l6ZUNvbHVtbnNUb0ZpdCgpO1xuICAgICAgZ3JpZC5hcGkuZ2V0Um93Tm9kZUlkID0gaXRlbSA9PiBpdGVtLmF0dGFjaEdyb3VwO1xuICAgfVxuXG4gICBnZXQgc2VjbGV0ZWRCdSgpIHtcbiAgICAgIGlmICghdGhpcy5idUdyaWQgfHwgIXRoaXMuYnVHcmlkLmFwaSkge1xuICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG5cbiAgICAgIGxldCByb3dzID0gdGhpcy5idUdyaWQuYXBpLmdldFNlbGVjdGVkUm93cygpO1xuICAgICAgcmV0dXJuIHJvd3MubGVuZ3RoID4gMCA/IHJvd3NbMF0gOiBudWxsO1xuICAgfVxuXG4gICBvblJvd1NlbGVjdGVkKCl7XG4gICAgICAvLyB0aGlzLmNob29zZUJ1ID0gdGhpcy5zZWNsZXRlZEJ1O1xuICAgICAgdGhpcy5zaG93SXRlbSA9IHRydWU7XG4gICAgICB0aGlzLmlzTmV3ID0gdHJ1ZTtcbiAgICAgIHRoaXMuYnVEZXRhaWwgPSB0aGlzLnNlY2xldGVkQnU7XG4gICAgICBjb25zb2xlLmxvZyh0aGlzLmJ1RGV0YWlsKVxuICAgfVxuXG4gICByZW1vdmVJdGVtKCl7XG4gICAgICB0aGlzLmFsZXJ0LnNob3coKS5zdWJzY3JpYmUocmVzdWx0ID0+IHtcbiAgICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgdGhpcy5odHRwLmRlbGV0ZSgnL2lEYXRhL2FwaS9ob3NwaXRhbC8nK3RoaXMuYnVEZXRhaWwuaWQsIHRoaXMub3B0aW9ucykuc3Vic2NyaWJlKChkYXRhKT0+IHtcbiAgICAgICAgICAgIHRoaXMuaW5pdERhdGEoKTtcbiAgICAgICAgICAgIHRoaXMuaXNOZXcgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuc2hvd0l0ZW0gPSBmYWxzZTtcbiAgICAgICAgIH0pXG4gICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgICAgIFxuICAgfVxuXG4gICBvbkJ0bk5ld0NsaWNrZWQoKXtcbiAgICAgIHRoaXMuc2hvd0l0ZW0gPSB0cnVlO1xuICAgICAgdGhpcy5pc05ldyA9IGZhbHNlO1xuICAgICAgdGhpcy5idURldGFpbCA9IHtcbiAgICAgICAgIGhvc3BpdGFsY29kZTogJycsXG4gICAgICAgICBob3NwaXRhbG5hbWU6ICcnLFxuICAgICAgICAgYnVDb2RlOiAnJ1xuICAgICAgfVxuICAgfVxuXG4gICBvbkJ0blN1cmUoKXtcbiAgICAgIHRoaXMuYnVEZXRhaWwuc3RhdHVzID0gMTtcbiAgICAgIGlmKHRoaXMuYnVEZXRhaWwuaWQpe1xuICAgICAgICAgdGhpcy5odHRwLnB1dCgnL2lEYXRhL2FwaS9ob3NwaXRhbC91cGRhdGUnLCBKU09OLnN0cmluZ2lmeSh0aGlzLmJ1RGV0YWlsKSwgdGhpcy5vcHRpb25zKS5zdWJzY3JpYmUoKGRhdGEpPT4ge1xuICAgICAgICAgdGhpcy5pbml0RGF0YSgpO1xuICAgICAgICAgdGhpcy5zaG93SXRlbSA9IGZhbHNlO1xuICAgICAgfSlcbiAgICAgIH1lbHNle1xuICAgICAgICAgdGhpcy5odHRwLnBvc3QoJy9pRGF0YS9hcGkvaG9zcGl0YWwvYWRkJywgSlNPTi5zdHJpbmdpZnkodGhpcy5idURldGFpbCksIHRoaXMub3B0aW9ucykuc3Vic2NyaWJlKChkYXRhKT0+IHtcbiAgICAgICAgIHRoaXMuaW5pdERhdGEoKTtcbiAgICAgICAgIHRoaXMuc2hvd0l0ZW0gPSBmYWxzZTtcbiAgICAgIH0pXG4gICAgICB9XG4gICAgICBcbiAgIH1cbn0iXX0=
