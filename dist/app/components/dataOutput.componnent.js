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
var file_service_1 = require("../services/file.service");
var auth_service_1 = require("../services/auth.service");
var components_1 = require("angular2-notifications/components");
var DataOutputComponent = (function () {
    function DataOutputComponent(auth, http, fileService, notification) {
        this.auth = auth;
        this.http = http;
        this.fileService = fileService;
        this.notification = notification;
        this.newUpload = {};
        // options:any = new RequestOptions();
        this.category = '';
        this.categorys = [];
        this.file = {};
        this.fileName = '';
        this.showLoading = false;
        this.timer = {};
        this.loadingText = "·";
        this.options = new http_1.RequestOptions({ headers: new http_1.Headers({ 'Content-Type': 'application/json' }) });
    }
    DataOutputComponent.prototype.ngOnInit = function () {
    };
    DataOutputComponent.prototype.ngAfterViewInit = function () {
        this.getCategorys();
    };
    DataOutputComponent.prototype.getCategorys = function () {
        var _this = this;
        var userId = this.auth.getToken().user.id;
        this.http.get('/iData/api/template/findMainTemplateList?userId=' + userId, this.options).subscribe(function (data) {
            console.log(data);
            if (data._body) {
                _this.categorys = data.json();
            }
        });
    };
    DataOutputComponent.prototype.getUpload = function (e) {
        this.file = {};
        this.fileName = '';
        console.log(e);
        if (e.target.files[0]) {
            this.file = e.target.files[0];
            this.fileName = this.file.name;
        }
        console.log(this.fileName);
        if (this.fileName.indexOf('xls') < 0) {
            this.notification.alert('警告信息', '请上传正确的Excel文件');
            this.file = {};
            this.fileName = '';
        }
    };
    DataOutputComponent.prototype.uploadFile = function (file) {
        var _this = this;
        var uploadFileFormData = new FormData();
        uploadFileFormData.append('file', this.file);
        uploadFileFormData.append('fName', this.fileName);
        // uploadFileFormData.append('fGroup','');
        uploadFileFormData.append('category', this.category);
        uploadFileFormData.append('isGroupCategory', false);
        var user = this.auth.getToken().user;
        this.http.post('/iData/api/import/' + user.id + '/upload', uploadFileFormData, {}).subscribe(function (data) {
            console.log(data);
            _this.showLoading = false;
            clearTimeout(_this.timer);
            if (data.status == 200) {
                _this.notification.info('提示信息', '正在上传...');
                _this.category = '';
                _this.cateGoryChange();
            }
            else {
                _this.notification.alert('提示信息', '提交失败');
                _this.category = '';
                _this.cateGoryChange();
            }
        });
    };
    DataOutputComponent.prototype.cateGoryChange = function () {
        this.file = {};
        this.fileName = '';
    };
    DataOutputComponent.prototype.fileClick = function () {
        console.log('begin');
    };
    DataOutputComponent.prototype.initLoadingText = function () {
        var _this = this;
        this.loadingText = this.loadingText + '·';
        this.timer = setTimeout(function () {
            _this.initLoadingText();
        }, 500);
        if (this.loadingText.length == 4) {
            this.loadingText = '';
        }
    };
    DataOutputComponent.prototype.onSubmit = function () {
        this.showLoading = true;
        this.initLoadingText();
        this.uploadFile(this.file);
    };
    return DataOutputComponent;
}());
__decorate([
    core_1.ViewChild("buGrid"),
    __metadata("design:type", Object)
], DataOutputComponent.prototype, "buGrid", void 0);
__decorate([
    core_1.ViewChild("alert"),
    __metadata("design:type", alert_widget_1.AlertWidget)
], DataOutputComponent.prototype, "alert", void 0);
__decorate([
    core_1.ViewChild("fileInput"),
    __metadata("design:type", Object)
], DataOutputComponent.prototype, "fileInput", void 0);
DataOutputComponent = __decorate([
    core_1.Component({
        selector: "dataOutput",
        templateUrl: "views/dataManage/dataOutput.html"
    }),
    __metadata("design:paramtypes", [auth_service_1.AuthService, http_1.Http, file_service_1.FileService, components_1.NotificationsService])
], DataOutputComponent);
exports.DataOutputComponent = DataOutputComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvZGF0YU91dHB1dC5jb21wb25uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxzQ0FBbUQ7QUFDbkQsc0NBQTBEO0FBRTFELHdEQUFvRDtBQUNwRCx5REFBcUQ7QUFLckQseURBQXFEO0FBQ3JELGdFQUF1RTtBQU12RTtJQW9CSSw2QkFBb0IsSUFBaUIsRUFBUyxJQUFTLEVBQVMsV0FBd0IsRUFBUyxZQUFrQztRQUEvRyxTQUFJLEdBQUosSUFBSSxDQUFhO1FBQVMsU0FBSSxHQUFKLElBQUksQ0FBSztRQUFTLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQVMsaUJBQVksR0FBWixZQUFZLENBQXNCO1FBbEI1SCxjQUFTLEdBQVEsRUFBRSxDQUFDO1FBQ3BCLHNDQUFzQztRQUN0QyxhQUFRLEdBQVUsRUFBRSxDQUFDO1FBQ3JCLGNBQVMsR0FBYyxFQUFFLENBQUM7UUFDMUIsU0FBSSxHQUFPLEVBQUUsQ0FBQztRQUNkLGFBQVEsR0FBVSxFQUFFLENBQUM7UUFDckIsZ0JBQVcsR0FBVyxLQUFLLENBQUM7UUFDNUIsVUFBSyxHQUFLLEVBQUUsQ0FBQztRQUNiLGdCQUFXLEdBQVUsR0FBRyxDQUFDO1FBQ3pCLFlBQU8sR0FBTyxJQUFJLHFCQUFjLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxjQUFPLENBQUMsRUFBRSxjQUFjLEVBQUUsa0JBQWtCLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQVcxRyxDQUFDO0lBRUQsc0NBQVEsR0FBUjtJQUVBLENBQUM7SUFFRCw2Q0FBZSxHQUFmO1FBQ0csSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCwwQ0FBWSxHQUFaO1FBQUEsaUJBUUM7UUFQQyxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7UUFDekMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsa0RB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QUFnQjtBQWxCM0M7SUFKQyxnQkFBUyxDQUFDO1FBQ1IsUUFBUSxFQUFFLFlBQVk7UUFDdEIsV0FBVyxFQUFFLGtDQUFrQztLQUNqRCxDQUFDO3FDQXFCNEIsMEJBQVcsRUFBYyxXQUFJLEVBQXNCLDBCQUFXLEVBQXVCLGlDQUFvQjt1QkE2RnRJO0FBakhZLDhCQUFBLG1CQUFtQixDQUFBIiwiZmlsZSI6ImNvbXBvbmVudHMvZGF0YU91dHB1dC5jb21wb25uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIFZpZXdDaGlsZH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7SHR0cCxSZXF1ZXN0T3B0aW9ucyxIZWFkZXJzfSBmcm9tIFwiQGFuZ3VsYXIvaHR0cFwiO1xuaW1wb3J0IHtHcmlkT3B0aW9ucywgQ29sRGVmfSBmcm9tIFwiYWctZ3JpZFwiO1xuaW1wb3J0IHtBbGVydFdpZGdldH0gZnJvbSBcIi4uL3dpZGdldHMvYWxlcnQud2lkZ2V0XCI7XG5pbXBvcnQge0ZpbGVTZXJ2aWNlfSBmcm9tIFwiLi4vc2VydmljZXMvZmlsZS5zZXJ2aWNlXCI7XG5pbXBvcnQge1V0aWx9IGZyb20gXCIuLi91dGlscy9nZW5lcmFsLnV0aWxcIjtcbmltcG9ydCB7VGVtcGxhdGUsIFRlbXBsYXRlRGF0YVNvdXJjZX0gZnJvbSBcIi4uL21vZGVscy9maWxlLm1vZGVsXCI7XG5pbXBvcnQge0ZpbGVJdGVtLCBDYXRlZ29yeSwgRmlsZVN0YXR1c30gZnJvbSBcIi4uL21vZGVscy9maWxlLm1vZGVsXCI7XG5pbXBvcnQge0ZpbGVVcGxvYWRlckV4LCBVcGxvYWRTdGF0ZX0gZnJvbSBcIi4uL3NlcnZpY2VzL2ZpbGUudXBsb2FkZXIuZXhcIjtcbmltcG9ydCB7QXV0aFNlcnZpY2V9IGZyb20gXCIuLi9zZXJ2aWNlcy9hdXRoLnNlcnZpY2VcIjtcbmltcG9ydCB7Tm90aWZpY2F0aW9uc1NlcnZpY2V9IGZyb20gXCJhbmd1bGFyMi1ub3RpZmljYXRpb25zL2NvbXBvbmVudHNcIjtcblxuQENvbXBvbmVudCh7XG4gICBzZWxlY3RvcjogXCJkYXRhT3V0cHV0XCIsXG4gICB0ZW1wbGF0ZVVybDogXCJ2aWV3cy9kYXRhTWFuYWdlL2RhdGFPdXRwdXQuaHRtbFwiXG59KVxuZXhwb3J0IGNsYXNzIERhdGFPdXRwdXRDb21wb25lbnQge1xuICAgIHB1YmxpYyBpc0ZpbGVPdmVyRHJvcHpvbmU6IGJvb2xlYW47XG4gICAgICAgICAgIG5ld1VwbG9hZDphbnkgPSAge307XG4gICAgICAgICAgIC8vIG9wdGlvbnM6YW55ID0gbmV3IFJlcXVlc3RPcHRpb25zKCk7XG4gICAgICAgICAgIGNhdGVnb3J5OnN0cmluZyA9ICcnO1xuICAgICAgICAgICBjYXRlZ29yeXM6QXJyYXk8YW55PiA9IFtdO1xuICAgICAgICAgICBmaWxlOmFueSA9IHt9O1xuICAgICAgICAgICBmaWxlTmFtZTpzdHJpbmcgPSAnJztcbiAgICAgICAgICAgc2hvd0xvYWRpbmc6Ym9vbGVhbiA9IGZhbHNlO1xuICAgICAgICAgICB0aW1lcjphbnk9e307XG4gICAgICAgICAgIGxvYWRpbmdUZXh0OnN0cmluZyA9IFwiwrdcIjtcbiAgICAgICAgICAgb3B0aW9uczphbnkgPSBuZXcgUmVxdWVzdE9wdGlvbnMoeyBoZWFkZXJzOiBuZXcgSGVhZGVycyh7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSkgfSk7XG5cblxuICAgIEBWaWV3Q2hpbGQoXCJidUdyaWRcIilcbiAgICAgICBidUdyaWQ6IEdyaWRPcHRpb25zO1xuICAgIEBWaWV3Q2hpbGQoXCJhbGVydFwiKVxuICAgICAgIGFsZXJ0OiBBbGVydFdpZGdldDtcbiAgICBAVmlld0NoaWxkKFwiZmlsZUlucHV0XCIpIGZpbGVJbnB1dDogYW55O1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBhdXRoOiBBdXRoU2VydmljZSxwcml2YXRlIGh0dHA6SHR0cCxwcml2YXRlIGZpbGVTZXJ2aWNlOiBGaWxlU2VydmljZSxwcml2YXRlIG5vdGlmaWNhdGlvbjogTm90aWZpY2F0aW9uc1NlcnZpY2Upe1xuXG4gICAgfVxuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG5cbiAgICB9XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgICAgdGhpcy5nZXRDYXRlZ29yeXMoKTtcbiAgICB9XG5cbiAgICBnZXRDYXRlZ29yeXMoKXtcbiAgICAgIGxldCB1c2VySWQgPSB0aGlzLmF1dGguZ2V0VG9rZW4oKS51c2VyLmlkO1xuICAgICAgIHRoaXMuaHR0cC5nZXQoJy9pRGF0YS9hcGkvdGVtcGxhdGUvZmluZE1haW5UZW1wbGF0ZUxpc3Q/dXNlcklkPScrdXNlcklkLCB0aGlzLm9wdGlvbnMpLnN1YnNjcmliZSgoZGF0YSk9PiB7XG4gICAgICAgICBjb25zb2xlLmxvZyhkYXRhKVxuICAgICAgICAgaWYoZGF0YS5fYm9keSl7XG4gICAgICAgICAgICB0aGlzLmNhdGVnb3J5cyA9IGRhdGEuanNvbigpO1xuICAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG5cbiAgICBnZXRVcGxvYWQoZSkge1xuICAgICAgdGhpcy5maWxlID0ge307XG4gICAgICB0aGlzLmZpbGVOYW1lID0gJyc7XG4gICAgICBjb25zb2xlLmxvZyhlKVxuICAgICAgaWYgKGUudGFyZ2V0LmZpbGVzWzBdKSB7XG4gICAgICAgdGhpcy5maWxlID0gZS50YXJnZXQuZmlsZXNbMF07XG4gICAgICAgdGhpcy5maWxlTmFtZSA9IHRoaXMuZmlsZS5uYW1lO1xuICAgICAgfVxuICAgICAgY29uc29sZS5sb2codGhpcy5maWxlTmFtZSlcbiAgICAgIGlmKHRoaXMuZmlsZU5hbWUuaW5kZXhPZigneGxzJyk8MCl7XG4gICAgICAgIHRoaXMubm90aWZpY2F0aW9uLmFsZXJ0KCforablkYrkv6Hmga8nLCfor7fkuIrkvKDmraPnoa7nmoRFeGNlbOaWh+S7ticpO1xuICAgICAgICB0aGlzLmZpbGUgPSB7fTtcbiAgICAgICAgdGhpcy5maWxlTmFtZSA9ICcnO1xuICAgICAgfVxuICAgIH1cblxuICAgIHVwbG9hZEZpbGUoZmlsZSl7XG4gICAgICBsZXQgdXBsb2FkRmlsZUZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XG4gICAgICB1cGxvYWRGaWxlRm9ybURhdGEuYXBwZW5kKCdmaWxlJywgdGhpcy5maWxlKTtcbiAgICAgIHVwbG9hZEZpbGVGb3JtRGF0YS5hcHBlbmQoJ2ZOYW1lJywgdGhpcy5maWxlTmFtZSk7XG4gICAgICAvLyB1cGxvYWRGaWxlRm9ybURhdGEuYXBwZW5kKCdmR3JvdXAnLCcnKTtcbiAgICAgIHVwbG9hZEZpbGVGb3JtRGF0YS5hcHBlbmQoJ2NhdGVnb3J5JywgdGhpcy5jYXRlZ29yeSk7XG4gICAgICB1cGxvYWRGaWxlRm9ybURhdGEuYXBwZW5kKCdpc0dyb3VwQ2F0ZWdvcnknLCBmYWxzZSk7XG5cbiAgICAgIGxldCB1c2VyID0gdGhpcy5hdXRoLmdldFRva2VuKCkudXNlcjtcblxuICAgICAgdGhpcy5odHRwLnBvc3QoJy9pRGF0YS9hcGkvaW1wb3J0LycrdXNlci5pZCsnL3VwbG9hZCcsIHVwbG9hZEZpbGVGb3JtRGF0YSwge30pLnN1YnNjcmliZSgoZGF0YSk9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKGRhdGEpXG4gICAgICAgIHRoaXMuc2hvd0xvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZXIpXG4gICAgICAgICBpZihkYXRhLnN0YXR1cyA9PSAyMDApe1xuXG4gICAgICAgICAgICB0aGlzLm5vdGlmaWNhdGlvbi5pbmZvKCfmj5DnpLrkv6Hmga8nLCfmraPlnKjkuIrkvKAuLi4nKTtcbiAgICAgICAgICAgIHRoaXMuY2F0ZWdvcnkgPSAnJztcbiAgICAgICAgICAgIHRoaXMuY2F0ZUdvcnlDaGFuZ2UoKTtcbiAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb24uYWxlcnQoJ+aPkOekuuS/oeaBrycsJ+aPkOS6pOWksei0pScpO1xuICAgICAgICAgICB0aGlzLmNhdGVnb3J5ID0gJyc7XG4gICAgICAgICAgIHRoaXMuY2F0ZUdvcnlDaGFuZ2UoKTtcbiAgICAgICAgIH1cbiAgICAgIH0pXG5cbiAgICB9XG5cbiAgICBjYXRlR29yeUNoYW5nZSgpe1xuICAgICAgdGhpcy5maWxlID0ge307XG4gICAgICB0aGlzLmZpbGVOYW1lID0gJyc7XG4gICAgfVxuXG4gICAgZmlsZUNsaWNrKCl7XG4gICAgICBjb25zb2xlLmxvZygnYmVnaW4nKVxuICAgIH1cblxuICAgIGluaXRMb2FkaW5nVGV4dCgpe1xuICAgICAgdGhpcy5sb2FkaW5nVGV4dCA9IHRoaXMubG9hZGluZ1RleHQgKyAnwrcnO1xuICAgICAgdGhpcy50aW1lciA9IHNldFRpbWVvdXQoKCk9PntcbiAgICAgICAgdGhpcy5pbml0TG9hZGluZ1RleHQoKTtcbiAgICAgIH0sNTAwKVxuXG4gICAgICBpZih0aGlzLmxvYWRpbmdUZXh0Lmxlbmd0aD09NCl7XG4gICAgICAgIHRoaXMubG9hZGluZ1RleHQgPSAnJztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBvblN1Ym1pdCgpe1xuICAgICAgdGhpcy5zaG93TG9hZGluZyA9IHRydWU7XG4gICAgICB0aGlzLmluaXRMb2FkaW5nVGV4dCgpO1xuICAgICAgdGhpcy51cGxvYWRGaWxlKHRoaXMuZmlsZSlcbiAgICB9XG5cblxufSJdfQ==
