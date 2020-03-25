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
var UnitManageComponent = (function () {
    function UnitManageComponent(http) {
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
            { headerName: '单位编号', field: 'unitCode' },
            { headerName: '单位名称', field: 'unitName' }
        ];
    }
    UnitManageComponent.prototype.ngAfterViewInit = function () {
        this.initData();
    };
    UnitManageComponent.prototype.ngOnInit = function () {
    };
    UnitManageComponent.prototype.initData = function () {
        var _this = this;
        this.http.post('/iData/api/unit/list', JSON.stringify({ offset: 0, limit: 1000 }), this.options).subscribe(function (data) {
            if (data._body) {
                _this.rowData = data.json().unitList;
            }
        });
    };
    UnitManageComponent.prototype.onFileGridReady = function (grid) {
        grid.api.sizeColumnsToFit();
        grid.api.getRowNodeId = function (item) { return item.attachGroup; };
    };
    Object.defineProperty(UnitManageComponent.prototype, "secletedBu", {
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
    UnitManageComponent.prototype.onRowSelected = function () {
        // this.chooseBu = this.secletedBu;
        this.showItem = true;
        this.isNew = true;
        this.buDetail = this.secletedBu;
        console.log(this.buDetail);
    };
    UnitManageComponent.prototype.removeItem = function () {
        var _this = this;
        this.alert.show().subscribe(function (result) {
            if (result) {
                _this.http.delete('/iData/api/unit/' + _this.buDetail.id, _this.options).subscribe(function (data) {
                    _this.initData();
                    _this.isNew = false;
                    _this.showItem = false;
                });
            }
        });
    };
    UnitManageComponent.prototype.onBtnNewClicked = function () {
        this.showItem = true;
        this.isNew = false;
        this.buDetail = {
            unitCode: '',
            unitName: ''
        };
    };
    UnitManageComponent.prototype.onBtnSure = function () {
        var _this = this;
        this.buDetail.status = 1;
        if (this.buDetail.id) {
            this.http.put('/iData/api/unit/update', JSON.stringify(this.buDetail), this.options).subscribe(function (data) {
                _this.initData();
                _this.showItem = false;
            });
        }
        else {
            this.http.post('/iData/api/unit/add', JSON.stringify(this.buDetail), this.options).subscribe(function (data) {
                _this.initData();
                _this.showItem = false;
            });
        }
    };
    return UnitManageComponent;
}());
__decorate([
    core_1.ViewChild("buGrid"),
    __metadata("design:type", Object)
], UnitManageComponent.prototype, "buGrid", void 0);
__decorate([
    core_1.ViewChild("alert"),
    __metadata("design:type", alert_widget_1.AlertWidget)
], UnitManageComponent.prototype, "alert", void 0);
UnitManageComponent = __decorate([
    core_1.Component({
        selector: "unit",
        templateUrl: "views/dataManage/unit.manage.html"
    }),
    __metadata("design:paramtypes", [http_1.Http])
], UnitManageComponent);
exports.UnitManageComponent = UnitManageComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvdW5pdC5jb21wb25uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxzQ0FBbUQ7QUFDbkQsc0NBQTBEO0FBRTFELHdEQUFvRDtBQU1wRDtJQWlCSSw2QkFBb0IsSUFBUztRQUFULFNBQUksR0FBSixJQUFJLENBQUs7UUFoQnhCLFdBQU0sR0FBYSxFQUFFLENBQUM7UUFHM0IsWUFBTyxHQUFlLEVBQUUsQ0FBQztRQUN6QixvQkFBZSxHQUFhLEVBQUUsQ0FBQztRQUMvQixhQUFRLEdBQU8sRUFBRSxDQUFDO1FBQ2xCLGFBQVEsR0FBVSxLQUFLLENBQUM7UUFDeEIsYUFBUSxHQUFPLEVBQUUsQ0FBQztRQUNsQixVQUFLLEdBQVcsS0FBSyxDQUFDO1FBQ3RCLFlBQU8sR0FBRyxJQUFJLHFCQUFjLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxjQUFPLENBQUMsRUFBRSxjQUFjLEVBQUUsa0JBQWtCLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQVE3RixJQUFJLENBQUMsZUFBZSxHQUFHO1lBQ3BCLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFO1lBQ3pDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFO1NBQzFDLENBQUM7SUFDTCxDQUFDO0lBRUQsNkNBQWUsR0FBZjtRQUNFLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUVsQixDQUFDO0lBRUQsc0NBQVEsR0FBUjtJQUVBLENBQUM7SUFFRCxzQ0FBUSxHQUFSO1FBQUEsaUJBUUE7UUFORSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQUMsSUFBSTtZQUM3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QztRQUFBLElBQUksQ0FBQSxDQUFDO1lBQ0gsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMscUJBQXFCLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFDLElBQUk7Z0JBQ2xHLEtBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQkFDaEIsS0FBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7WUFDekIsQ0FBQyxDQUFDLENBQUE7UUFDRixDQUFDO0lBRUosQ0FBQztJQUNKLDBCQUFDO0FBQUQsQ0F0R0EsQUFzR0MsSUFBQTtBQXpGTTtJQURGLGdCQUFTLENBQUMsUUFBUSxDQUFDOzttREFDRztBQUVyQjtJQURHLGdCQUFTLENBQUMsT0FBTyxDQUFDOzhCQUNkLDBCQUFXO2tEQUFDO0FBZnpCO0lBSkMsZ0JBQVMsQ0FBQztRQUNSLFFBQVEsRUFBRSxNQUFNO1FBQ2hCLFdBQVcsRUFBRSxtQ0FBbUM7S0FDbEQsQ0FBQztxQ0FrQjJCLFdBQUk7dUJBcUZoQztBQXRHWSw4QkFBQSxtQkFBbUIsQ0FBQSIsImZpbGUiOiJjb21wb25lbnRzL3VuaXQuY29tcG9ubmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBWaWV3Q2hpbGR9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge0h0dHAsUmVxdWVzdE9wdGlvbnMsSGVhZGVyc30gZnJvbSBcIkBhbmd1bGFyL2h0dHBcIjtcbmltcG9ydCB7R3JpZE9wdGlvbnMsIENvbERlZn0gZnJvbSBcImFnLWdyaWRcIjtcbmltcG9ydCB7QWxlcnRXaWRnZXR9IGZyb20gXCIuLi93aWRnZXRzL2FsZXJ0LndpZGdldFwiO1xuXG5AQ29tcG9uZW50KHtcbiAgIHNlbGVjdG9yOiBcInVuaXRcIixcbiAgIHRlbXBsYXRlVXJsOiBcInZpZXdzL2RhdGFNYW5hZ2UvdW5pdC5tYW5hZ2UuaHRtbFwiXG59KVxuZXhwb3J0IGNsYXNzIFVuaXRNYW5hZ2VDb21wb25lbnQge1xuXHQgcHVibGljIGJ1TGlzdDogQXJyYXk8YW55Pj1bXTtcbiAgICBncmlkT3B0aW9uczogR3JpZE9wdGlvbnM7XG4gICAgZ3JpZENvbHVtbnM6IENvbERlZltdO1xuICAgIHJvd0RhdGE6IEFycmF5PGFueT4gPSBbXTtcbiAgICBmaWxlR3JpZENvbHVtbnM6IENvbERlZltdID0gW107XG4gICAgY2hvb3NlQnU6YW55ID0ge307XG4gICAgc2hvd0l0ZW06Ym9vbGVhbj0gZmFsc2U7XG4gICAgYnVEZXRhaWw6YW55ID0ge307XG4gICAgaXNOZXc6Ym9vbGVhbiA9IGZhbHNlO1xuICAgIG9wdGlvbnMgPSBuZXcgUmVxdWVzdE9wdGlvbnMoeyBoZWFkZXJzOiBuZXcgSGVhZGVycyh7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSkgfSk7XG5cbiAgICBAVmlld0NoaWxkKFwiYnVHcmlkXCIpXG4gICAgICAgYnVHcmlkOiBHcmlkT3B0aW9ucztcbiAgICAgICAgQFZpZXdDaGlsZChcImFsZXJ0XCIpXG4gICAgICBhbGVydDogQWxlcnRXaWRnZXQ7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6SHR0cCl7XG4gICAgICB0aGlzLmZpbGVHcmlkQ29sdW1ucyA9IFtcbiAgICAgICAgIHsgaGVhZGVyTmFtZTogJ+WNleS9jee8luWPtycsIGZpZWxkOiAndW5pdENvZGUnIH0sXG4gICAgICAgICB7IGhlYWRlck5hbWU6ICfljZXkvY3lkI3np7AnLCBmaWVsZDogJ3VuaXROYW1lJyB9XG4gICAgICAgXTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKXtcbiAgICAgIHRoaXMuaW5pdERhdGEoKTtcbiAgICAgICBcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICBcbiAgICB9XG5cbiAgICBpbml0RGF0YSgpe1xuICAgICAgICAgXG4gICAgICB0aGlzLmh0dHAucG9zdCgnL2lEYXRhL2FwaS91bml0L2xpc3QnLCBKU09OLnN0cmluZ2lmeSh7IG9mZnNldDogMCwgbGltaXQ6IDEwMDAgfSksIHRoaXMub3B0aW9ucykuc3Vic2NyaWJlKChkYXRhKT0+IHtcbiAgICAgICAgIGlmKGRhdGEuX2JvZHkpe1xuICAgICAgICAgdGhpcy5yb3dEYXRhID0gZGF0YS5qc29uKCkudW5pdExpc3Q7XG4gICAgICAgfVxuICAgICAgfSlcblxuICAgfVxuXG4gICBvbkZpbGVHcmlkUmVhZHkoZ3JpZCkge1xuICAgICAgZ3JpZC5hcGkuc2l6ZUNvbHVtbnNUb0ZpdCgpO1xuICAgICAgZ3JpZC5hcGkuZ2V0Um93Tm9kZUlkID0gaXRlbSA9PiBpdGVtLmF0dGFjaEdyb3VwO1xuICAgfVxuXG4gICBnZXQgc2VjbGV0ZWRCdSgpIHtcbiAgICAgIGlmICghdGhpcy5idUdyaWQgfHwgIXRoaXMuYnVHcmlkLmFwaSkge1xuICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG5cbiAgICAgIGxldCByb3dzID0gdGhpcy5idUdyaWQuYXBpLmdldFNlbGVjdGVkUm93cygpO1xuICAgICAgcmV0dXJuIHJvd3MubGVuZ3RoID4gMCA/IHJvd3NbMF0gOiBudWxsO1xuICAgfVxuXG4gICBvblJvd1NlbGVjdGVkKCl7XG4gICAgICAvLyB0aGlzLmNob29zZUJ1ID0gdGhpcy5zZWNsZXRlZEJ1O1xuICAgICAgdGhpcy5zaG93SXRlbSA9IHRydWU7XG4gICAgICB0aGlzLmlzTmV3ID0gdHJ1ZTtcbiAgICAgIHRoaXMuYnVEZXRhaWwgPSB0aGlzLnNlY2xldGVkQnU7XG4gICAgICBjb25zb2xlLmxvZyh0aGlzLmJ1RGV0YWlsKVxuICAgfVxuXG4gICByZW1vdmVJdGVtKCl7XG4gICAgICB0aGlzLmFsZXJ0LnNob3coKS5zdWJzY3JpYmUocmVzdWx0ID0+IHtcbiAgICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgdGhpcy5odHRwLmRlbGV0ZSgnL2lEYXRhL2FwaS91bml0LycrdGhpcy5idURldGFpbC5pZCwgdGhpcy5vcHRpb25zKS5zdWJzY3JpYmUoKGRhdGEpPT4ge1xuICAgICAgICAgICAgdGhpcy5pbml0RGF0YSgpO1xuICAgICAgICAgICAgdGhpcy5pc05ldyA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5zaG93SXRlbSA9IGZhbHNlO1xuICAgICAgICAgfSlcbiAgICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgICAgXG4gICB9XG5cbiAgIG9uQnRuTmV3Q2xpY2tlZCgpe1xuICAgICAgdGhpcy5zaG93SXRlbSA9IHRydWU7XG4gICAgICB0aGlzLmlzTmV3ID0gZmFsc2U7XG4gICAgICB0aGlzLmJ1RGV0YWlsID0ge1xuICAgICAgICAgdW5pdENvZGU6ICcnLFxuICAgICAgICAgdW5pdE5hbWU6ICcnXG4gICAgICB9XG4gICB9XG5cbiAgIG9uQnRuU3VyZSgpe1xuICAgICAgdGhpcy5idURldGFpbC5zdGF0dXMgPSAxO1xuICAgICAgaWYodGhpcy5idURldGFpbC5pZCl7XG4gICAgICAgICB0aGlzLmh0dHAucHV0KCcvaURhdGEvYXBpL3VuaXQvdXBkYXRlJywgSlNPTi5zdHJpbmdpZnkodGhpcy5idURldGFpbCksIHRoaXMub3B0aW9ucykuc3Vic2NyaWJlKChkYXRhKT0+IHtcbiAgICAgICAgIHRoaXMuaW5pdERhdGEoKTtcbiAgICAgICAgIHRoaXMuc2hvd0l0ZW0gPSBmYWxzZTtcbiAgICAgIH0pXG4gICAgICB9ZWxzZXtcbiAgICAgICAgIHRoaXMuaHR0cC5wb3N0KCcvaURhdGEvYXBpL3VuaXQvYWRkJywgSlNPTi5zdHJpbmdpZnkodGhpcy5idURldGFpbCksIHRoaXMub3B0aW9ucykuc3Vic2NyaWJlKChkYXRhKT0+IHtcbiAgICAgICAgIHRoaXMuaW5pdERhdGEoKTtcbiAgICAgICAgIHRoaXMuc2hvd0l0ZW0gPSBmYWxzZTtcbiAgICAgIH0pXG4gICAgICB9XG4gICAgICBcbiAgIH1cbn0iXX0=
