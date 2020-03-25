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
 * Created by zhongping.lu on 9/23/2016.
 */
var core_1 = require("@angular/core");
var dialog_widget_1 = require("../widgets/dialog.widget");
var api_util_1 = require("../utils/api.util");
var ng2_translate_1 = require("ng2-translate/ng2-translate");
var file_model_1 = require("../models/file.model");
var general_util_1 = require("../utils/general.util");
var preview_component_1 = require("./preview.component");
var auth_service_1 = require("../services/auth.service");
var rxjs_1 = require("rxjs");
var file_service_1 = require("../services/file.service");
var angular2_notifications_1 = require("angular2-notifications");
var file_uploader_ex_1 = require("../services/file.uploader.ex");
var http_1 = require("@angular/http");
var CategoryUploadFormComponent = (function () {
    function CategoryUploadFormComponent(http, i18n, auth, fileService, notify) {
        var _this = this;
        this.http = http;
        this.i18n = i18n;
        this.auth = auth;
        this.fileService = fileService;
        this.notify = notify;
        this.dataCommitted = new core_1.EventEmitter();
        this.uploader = new file_uploader_ex_1.FileUploaderEx({
            allowedMimeType: ["text/xml"],
            isHTML5: true
        });
        this.sizeFormatter = general_util_1.Util.formatStorageSize;
        this.categories = [];
        this.cover = 'uncover';
        this.uploader.afterAddingFile.subscribe(function (item) {
            console.log('afterAdd');
            var splitNames = item.file.name.split(".");
            // if (!this.isUpdateVersion) {
            //    this.fileItem = {
            //       attachcategory: this.categories.length > 0 ? this.categories[0].value : null
            //    };
            // }
            _this.fileItem = {};
            _this.fileItem.suffix = splitNames.pop();
            _this.fileItem.attachname = _this.isUpdateVersion ?
                _this.fileItem.attachname : splitNames.join(".");
            _this.fileItem.size = item.file.size;
            _this.fileInput.nativeElement.value = "";
            _this.previewFile = item._file;
        });
        /**
         * 获取分类
         * @param {[type]} '/iData/api/domain/3/value/0/3000').subscribe(                res => {               this.cateOption =             res.json().result;            } [description]
         * @param {[type]} errResp                                        => {                                  }              [description]
         */
        this.http.get('/iData/api/domain/3/value/0/3000').subscribe(function (res) {
            _this.cateOption = res.json().result;
            _this.cateSelect = _this.cateOption[0].domainvaluecode;
        }, function (errResp) {
            _this.notify.error('服务器错误', '服务器错误');
        });
    }
    CategoryUploadFormComponent.prototype.popup = function (selectedFile) {
        this.isUpdateVersion = !!selectedFile;
        this.fileItem = this.isUpdateVersion ? selectedFile : null;
        var title = selectedFile ?
            this.i18n.instant("analyzer.uploadDialog.update.title", { name: selectedFile["attachname"] }) :
            this.i18n.instant("analyzer.uploadDialog.new.title");
        var icon = selectedFile ? "icon-cloud-upload icons" : "icon-note icons";
        this.dialog.popup(title, true, icon).subscribe();
    };
    CategoryUploadFormComponent.prototype.setFileOver = function (event) {
        this.isFileOverDropzone = event;
    };
    CategoryUploadFormComponent.prototype.dismiss = function () {
        // this.uploader.clearQueue();
        // this.fileInput.nativeElement.value = "";
    };
    CategoryUploadFormComponent.prototype.onCommit = function (handler) {
        var _this = this;
        var uploadItem = this.uploader.queue[this.uploader.queue.length - 1];
        var url = this.isUpdateVersion ?
            api_util_1.APIs.getApiUri(api_util_1.API_TYPE.C_TEMPLATE, { uid: this.auth.getToken().user.id }) :
            api_util_1.APIs.getApiUri(api_util_1.API_TYPE.C_TEMPLATE, { uid: this.auth.getToken().user.id });
        // uploadItem.formData = {
        //    fName: this.fileItem.attachname,
        //    // category: this.fileItem.attachcategory,
        //    fGroup: this.isUpdateVersion ? this.fileItem.attachGroup : ""
        // };
        uploadItem.url = url;
        // Add authentication headers for file upload
        var userToken = this.auth.getToken();
        var isCover = !!(this.cover == 'cover');
        if (userToken) {
            this.uploader.setOptions({
                headers: [{
                        name: "token",
                        value: userToken.token
                    }, {
                        name: "username",
                        value: userToken.user.loginname
                    }]
            });
        }
        uploadItem.formData = {
            templateClass: this.cateSelect,
            cover: isCover
        };
        this.uploader.uploadItem(uploadItem).subscribe(function (result) {
            console.log(result, 'result');
            if (result.state === file_uploader_ex_1.UploadState.Progress) {
                return;
            }
            if (result.state === file_uploader_ex_1.UploadState.Complete) {
                // As upload function is not managed by rest service,
                // we need to handle token renew manually.
                // Otherwise, the token won't be updated
                // when user uploads file during last few seconds.
                _this.auth.updateToken(result.headers["token"]);
                _this.dialog.setState(true, _this.i18n.instant("analyzer.uploadDialog.waiting"));
                var item = JSON.parse(result.body);
                if (item.status === file_model_1.FileStatus.Valid) {
                    _this.notify.success(_this.i18n.instant("analyzer.uploadDialog.success.title"), _this.i18n.instant("analyzer.uploadDialog.success.desc"));
                    rxjs_1.Observable.of(true).subscribe(handler);
                    _this.dataCommitted.emit();
                    return;
                }
                if (item.status === file_model_1.FileStatus.Invalid) {
                    rxjs_1.Observable.throw([{
                            exceptionName: _this.i18n.instant("analyzer.uploadDialog.invalid.title"),
                            description: _this.i18n.instant("analyzer.uploadDialog.invalid.desc")
                        }]).subscribe(handler);
                    return;
                }
                // let newVal: FileStatus;
                // this.fileService.loopUntilStatusChange({
                //    duration: 1000,
                //    count: 5,
                //    original: JSON.parse(result.body),
                //    exitOnError: false
                // }).subscribe(status => {
                //    debugger
                //    newVal = status;
                // }, () => {}, (error) => {
                //    console.warn(newVal)
                //    switch (newVal) {
                //       case FileStatus.Valid:
                //          this.notify.success(
                //             this.i18n.instant("analyzer.uploadDialog.success.title"),
                //             this.i18n.instant("analyzer.uploadDialog.success.desc")
                //          );
                //          Observable.of(true).subscribe(handler);
                //          this.dataCommitted.emit();
                //          break;
                //       case FileStatus.Invalid:
                //          Observable.throw([{
                //             exceptionName: this.i18n.instant("analyzer.uploadDialog.invalid.title"),
                //             description: this.i18n.instant("analyzer.uploadDialog.invalid.desc")
                //          }]).subscribe(handler);
                //          break;
                //       default:
                //          this.notify.info(
                //             this.i18n.instant("analyzer.uploadDialog.waitingTimeout.title"),
                //             this.i18n.instant("analyzer.uploadDialog.waitingTimeout.desc")
                //          );
                //          Observable.of(true).subscribe(handler);
                //          this.dataCommitted.emit();
                //          break;
                //    }
                // });
                _this.notify.success(_this.i18n.instant("analyzer.uploadDialog.success.title"), _this.i18n.instant("analyzer.uploadDialog.success.desc"));
                _this.dataCommitted.emit();
                _this.uploader.clearQueue();
                _this.fileInput.nativeElement.value = "";
                rxjs_1.Observable.of(true).subscribe(handler);
            }
        }, function (error) {
            rxjs_1.Observable.throw([{
                    exceptionName: _this.i18n.instant("analyzer.uploadDialog.uploadError.title", { status: error.code }),
                    description: _this.i18n.instant("analyzer.uploadDialog.uploadError.desc", { desc: error.body })
                }]).subscribe(handler);
        });
        this.dialog.setState(true, this.i18n.instant("analyzer.uploadDialog.uploading"));
    };
    return CategoryUploadFormComponent;
}());
__decorate([
    core_1.ViewChild("dialog"),
    __metadata("design:type", dialog_widget_1.DialogWidget)
], CategoryUploadFormComponent.prototype, "dialog", void 0);
__decorate([
    core_1.ViewChild("fileInput"),
    __metadata("design:type", Object)
], CategoryUploadFormComponent.prototype, "fileInput", void 0);
__decorate([
    core_1.ViewChild("preview"),
    __metadata("design:type", preview_component_1.PreviewComponent)
], CategoryUploadFormComponent.prototype, "preview", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], CategoryUploadFormComponent.prototype, "dataCommitted", void 0);
CategoryUploadFormComponent = __decorate([
    core_1.Component({
        selector: "category-upload-form",
        templateUrl: "views/admin/category.upload.form.html"
    }),
    __metadata("design:paramtypes", [http_1.Http, ng2_translate_1.TranslateService, auth_service_1.AuthService, file_service_1.FileService, angular2_notifications_1.NotificationsService])
], CategoryUploadFormComponent);
exports.CategoryUploadFormComponent = CategoryUploadFormComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvY2F0ZWdvcnkudXBsb2FkLmZvcm0uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7R0FFRztBQUNILHNDQUF5RTtBQUN6RSwwREFBc0Q7QUFDdEQsOENBQWlEO0FBQ2pELDZEQUE2RDtBQUM3RCxtREFBb0U7QUFDcEUsc0RBQTJDO0FBQzNDLHlEQUFxRDtBQUNyRCx5REFBcUQ7QUFDckQsNkJBQTBDO0FBQzFDLHlEQUFxRDtBQUVyRCxpRUFBNEQ7QUFDNUQsaUVBQXlFO0FBQ3pFLHNDQUE0QztBQU81QztJQTBCRyxxQ0FBb0IsSUFBVSxFQUFTLElBQXNCLEVBQVUsSUFBaUIsRUFBVSxXQUF3QixFQUFVLE1BQTRCO1FBQWhLLGlCQXFDQztRQXJDbUIsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUFTLFNBQUksR0FBSixJQUFJLENBQWtCO1FBQVUsU0FBSSxHQUFKLElBQUksQ0FBYTtRQUFVLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBc0I7UUFyQnRKLGtCQUFhLEdBQXNCLElBQUksbUJBQVksRUFBRSxDQUFDO1FBTWhFLGFBQVEsR0FBbUIsSUFBSSxpQ0FBYyxDQUFDO1lBQzNDLGVBQWUsRUFBRSxDQUFDLFVBQVUsQ0FBQztZQUM3QixPQUFPLEVBQUUsSUFBSTtTQUNmLENBQUMsQ0FBQztRQUtILGtCQUFhLEdBQUcsbUJBQUksQ0FBQyxpQkFBaUIsQ0FBQztRQUd2QyxlQUFVLEdBQWUsRUFBRSxDQUFDO1FBRXJCLFVBQUssR0FBVSxTQUFTLENBQUM7UUFJN0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLFVBQUMsSUFBUztZQUMvQyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFBO1lBQ3ZCLElBQUksVUFBVSxHQUFhLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZ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QUUsVUFBQyxLQUFrQjtZQUNuQixpQkFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUNmLGFBQWEsRUFBRSxLQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyx5Q0FBeUMsRUFBRSxFQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsSUFBSSxFQUFDLENBQUM7b0JBQ2pHLFdBQVcsRUFBRSxLQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyx3Q0FBd0MsRUFBRSxFQUFDLElBQUksRUFBRSxLQUFLLENBQUMsSUFBSSxFQUFDLENBQUM7aUJBQzlGLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMxQixDQUFDLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDLENBQUM7SUFDcEYsQ0FBQztJQUNKLGtDQUFDO0FBQUQsQ0F2TkEsQUF1TkMsSUFBQTtBQXROdUI7SUFBcEIsZ0JBQVMsQ0FBQyxRQUFRLENBQUM7OEJBQVMsNEJBQVk7MkRBQUM7QUFDbEI7SUFBdkIsZ0JBQVMsQ0FBQyxXQUFXLENBQUM7OzhEQUFnQjtBQUNqQjtJQUFyQixnQkFBUyxDQUFDLFNBQVMsQ0FBQzs4QkFBVSxvQ0FBZ0I7NERBQUM7QUFFdEM7SUFBVCxhQUFNLEVBQUU7OEJBQWdCLG1CQUFZO2tFQUEyQjtBQUxuRTtJQUpDLGdCQUFTLENBQUM7UUFDUixRQUFRLEVBQUUsc0JBQXNCO1FBQ2hDLFdBQVcsRUFBRSx1Q0FBdUM7S0FDdEQsQ0FBQztxQ0EyQjJCLFdBQUksRUFBZSxnQ0FBZ0IsRUFBZ0IsMEJBQVcsRUFBdUIsMEJBQVcsRUFBa0IsNkNBQW9COytCQTZMbEs7QUF2Tlksc0NBQUEsMkJBQTJCLENBQUEiLCJmaWxlIjoiY29tcG9uZW50cy9jYXRlZ29yeS51cGxvYWQuZm9ybS5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENyZWF0ZWQgYnkgemhvbmdwaW5nLmx1IG9uIDkvMjMvMjAxNi5cbiAqL1xuaW1wb3J0IHtDb21wb25lbnQsIFZpZXdDaGlsZCwgT3V0cHV0LCBFdmVudEVtaXR0ZXJ9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge0RpYWxvZ1dpZGdldH0gZnJvbSBcIi4uL3dpZGdldHMvZGlhbG9nLndpZGdldFwiO1xuaW1wb3J0IHtBUElzLCBBUElfVFlQRX0gZnJvbSBcIi4uL3V0aWxzL2FwaS51dGlsXCI7XG5pbXBvcnQge1RyYW5zbGF0ZVNlcnZpY2V9IGZyb20gXCJuZzItdHJhbnNsYXRlL25nMi10cmFuc2xhdGVcIjtcbmltcG9ydCB7RmlsZUl0ZW0sIENhdGVnb3J5LCBGaWxlU3RhdHVzfSBmcm9tIFwiLi4vbW9kZWxzL2ZpbGUubW9kZWxcIjtcbmltcG9ydCB7VXRpbH0gZnJvbSBcIi4uL3V0aWxzL2dlbmVyYWwudXRpbFwiO1xuaW1wb3J0IHtQcmV2aWV3Q29tcG9uZW50fSBmcm9tIFwiLi9wcmV2aWV3LmNvbXBvbmVudFwiO1xuaW1wb3J0IHtBdXRoU2VydmljZX0gZnJvbSBcIi4uL3NlcnZpY2VzL2F1dGguc2VydmljZVwiO1xuaW1wb3J0IHtPYnNlcnZlciwgT2JzZXJ2YWJsZX0gZnJvbSBcInJ4anNcIjtcbmltcG9ydCB7RmlsZVNlcnZpY2V9IGZyb20gXCIuLi9zZXJ2aWNlcy9maWxlLnNlcnZpY2VcIjtcbmltcG9ydCB7VXNlclR5cGV9IGZyb20gXCIuLi9tb2RlbHMvYXV0aC5tb2RlbFwiO1xuaW1wb3J0IHtOb3RpZmljYXRpb25zU2VydmljZX0gZnJvbSBcImFuZ3VsYXIyLW5vdGlmaWNhdGlvbnNcIjtcbmltcG9ydCB7RmlsZVVwbG9hZGVyRXgsIFVwbG9hZFN0YXRlfSBmcm9tIFwiLi4vc2VydmljZXMvZmlsZS51cGxvYWRlci5leFwiO1xuaW1wb3J0IHtIdHRwLCBIZWFkZXJzfSBmcm9tIFwiQGFuZ3VsYXIvaHR0cFwiO1xuXG5cbkBDb21wb25lbnQoe1xuICAgc2VsZWN0b3I6IFwiY2F0ZWdvcnktdXBsb2FkLWZvcm1cIixcbiAgIHRlbXBsYXRlVXJsOiBcInZpZXdzL2FkbWluL2NhdGVnb3J5LnVwbG9hZC5mb3JtLmh0bWxcIlxufSlcbmV4cG9ydCBjbGFzcyBDYXRlZ29yeVVwbG9hZEZvcm1Db21wb25lbnQge1xuICAgQFZpZXdDaGlsZChcImRpYWxvZ1wiKSBkaWFsb2c6IERpYWxvZ1dpZGdldDtcbiAgIEBWaWV3Q2hpbGQoXCJmaWxlSW5wdXRcIikgZmlsZUlucHV0OiBhbnk7XG4gICBAVmlld0NoaWxkKFwicHJldmlld1wiKSBwcmV2aWV3OiBQcmV2aWV3Q29tcG9uZW50O1xuXG4gICBAT3V0cHV0KCkgZGF0YUNvbW1pdHRlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgIC8vIEZpbGVJdGVtIG5hbWUgYW5kIGNhdGVnb3J5IHdpbGwgbm90IGJlIGFibGUgdG8gY2hhbmdlIGlmIHRoaXMgdmFsdWUgaXMgdHJ1ZTtcbiAgIGlzVXBkYXRlVmVyc2lvbjogYm9vbGVhbjtcbiAgIGZpbGVJdGVtOiBGaWxlSXRlbTtcblxuICAgdXBsb2FkZXI6IEZpbGVVcGxvYWRlckV4ID0gbmV3IEZpbGVVcGxvYWRlckV4KHtcbiAgICAgIGFsbG93ZWRNaW1lVHlwZTogW1widGV4dC94bWxcIl0sXG4gICAgICBpc0hUTUw1OiB0cnVlXG4gICB9KTtcbiAgIGNhdGVTZWxlY3Q6c3RyaW5nO1xuICAgY2F0ZU9wdGlvbjphbnlbXTtcblxuICAgaXNGaWxlT3ZlckRyb3B6b25lOiBib29sZWFuO1xuICAgc2l6ZUZvcm1hdHRlciA9IFV0aWwuZm9ybWF0U3RvcmFnZVNpemU7XG4gICBwcmV2aWV3RmlsZTogRmlsZTtcblxuICAgY2F0ZWdvcmllczogQ2F0ZWdvcnlbXSA9IFtdO1xuXG4gICBwdWJsaWMgY292ZXI6c3RyaW5nID0gJ3VuY292ZXInO1xuXG4gICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHAscHJpdmF0ZSBpMThuOiBUcmFuc2xhdGVTZXJ2aWNlLCBwcml2YXRlIGF1dGg6IEF1dGhTZXJ2aWNlLCBwcml2YXRlIGZpbGVTZXJ2aWNlOiBGaWxlU2VydmljZSwgcHJpdmF0ZSBub3RpZnk6IE5vdGlmaWNhdGlvbnNTZXJ2aWNlKSB7XG5cbiAgICAgIHRoaXMudXBsb2FkZXIuYWZ0ZXJBZGRpbmdGaWxlLnN1YnNjcmliZSgoaXRlbTogYW55KTogYW55ID0+IHtcbiAgICAgICAgIGNvbnNvbGUubG9nKCdhZnRlckFkZCcpXG4gICAgICAgICBsZXQgc3BsaXROYW1lczogc3RyaW5nW10gPSBpdGVtLmZpbGUubmFtZS5zcGxpdChcIi5cIik7XG4gICAgICAgICAvLyBpZiAoIXRoaXMuaXNVcGRhdGVWZXJzaW9uKSB7XG4gICAgICAgICAvLyAgICB0aGlzLmZpbGVJdGVtID0ge1xuICAgICAgICAgLy8gICAgICAgYXR0YWNoY2F0ZWdvcnk6IHRoaXMuY2F0ZWdvcmllcy5sZW5ndGggPiAwID8gdGhpcy5jYXRlZ29yaWVzWzBdLnZhbHVlIDogbnVsbFxuICAgICAgICAgLy8gICAgfTtcbiAgICAgICAgIC8vIH1cblxuICAgICAgICAgdGhpcy5maWxlSXRlbSA9IHt9O1xuXG4gICAgICAgICB0aGlzLmZpbGVJdGVtLnN1ZmZpeCA9IHNwbGl0TmFtZXMucG9wKCk7XG4gICAgICAgICB0aGlzLmZpbGVJdGVtLmF0dGFjaG5hbWUgPSB0aGlzLmlzVXBkYXRlVmVyc2lvbiA/XG4gICAgICAgICAgICB0aGlzLmZpbGVJdGVtLmF0dGFjaG5hbWUgOiBzcGxpdE5hbWVzLmpvaW4oXCIuXCIpO1xuICAgICAgICAgdGhpcy5maWxlSXRlbS5zaXplID0gaXRlbS5maWxlLnNpemU7XG5cbiAgICAgICAgIHRoaXMuZmlsZUlucHV0Lm5hdGl2ZUVsZW1lbnQudmFsdWUgPSBcIlwiO1xuICAgICAgICAgdGhpcy5wcmV2aWV3RmlsZSA9IGl0ZW0uX2ZpbGU7XG4gICAgICB9KTtcblxuICAgICAgLyoqXG4gICAgICAgKiDojrflj5bliIbnsbtcbiAgICAgICAqIEBwYXJhbSB7W3R5cGVdfSAnL2lEYXRhL2FwaS9kb21haW4vMy92YWx1ZS8wLzMwMDAnKS5zdWJzY3JpYmUoICAgICAgICAgICAgICAgIHJlcyA9PiB7ICAgICAgICAgICAgICAgdGhpcy5jYXRlT3B0aW9uID0gICAgICAgICAgICAgcmVzLmpzb24oKS5yZXN1bHQ7ICAgICAgICAgICAgfSBbZGVzY3JpcHRpb25dXG4gICAgICAgKiBAcGFyYW0ge1t0eXBlXX0gZXJyUmVzcCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA9PiB7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gICAgICAgICAgICAgIFtkZXNjcmlwdGlvbl1cbiAgICAgICAqL1xuICAgICAgdGhpcy5odHRwLmdldCgnL2lEYXRhL2FwaS9kb21haW4vMy92YWx1ZS8wLzMwMDAnKS5zdWJzY3JpYmUoXG4gICAgICAgICByZXMgPT4ge1xuICAgICAgICAgICAgdGhpcy5jYXRlT3B0aW9uID0gcmVzLmpzb24oKS5yZXN1bHQ7XG4gICAgICAgICAgICB0aGlzLmNhdGVTZWxlY3QgPSB0aGlzLmNhdGVPcHRpb25bMF0uZG9tYWludmFsdWVjb2RlO1xuICAgICAgICAgfSxcbiAgICAgICAgIGVyclJlc3AgPT4ge1xuICAgICAgICAgICAgdGhpcy5ub3RpZnkuZXJyb3IoJ+acjeWKoeWZqOmUmeivrycsJ+acjeWKoeWZqOmUmeivrycpO1xuICAgICAgICAgfVxuICAgICAgKTtcblxuICAgfVxuXG4gICBwb3B1cChzZWxlY3RlZEZpbGU/OiBGaWxlSXRlbSk6IHZvaWQge1xuICAgICAgdGhpcy5pc1VwZGF0ZVZlcnNpb24gPSAhIXNlbGVjdGVkRmlsZTtcbiAgICAgIHRoaXMuZmlsZUl0ZW0gPSB0aGlzLmlzVXBkYXRlVmVyc2lvbiA/IHNlbGVjdGVkRmlsZSA6IG51bGw7XG5cbiAgICAgIGxldCB0aXRsZSA9IHNlbGVjdGVkRmlsZSA/XG4gICAgICAgICB0aGlzLmkxOG4uaW5zdGFudChcImFuYWx5emVyLnVwbG9hZERpYWxvZy51cGRhdGUudGl0bGVcIiwge25hbWU6IHNlbGVjdGVkRmlsZVtcImF0dGFjaG5hbWVcIl19KSA6XG4gICAgICAgICB0aGlzLmkxOG4uaW5zdGFudChcImFuYWx5emVyLnVwbG9hZERpYWxvZy5uZXcudGl0bGVcIik7XG4gICAgICBsZXQgaWNvbiA9IHNlbGVjdGVkRmlsZSA/IFwiaWNvbi1jbG91ZC11cGxvYWQgaWNvbnNcIiA6IFwiaWNvbi1ub3RlIGljb25zXCI7XG5cbiAgICAgIHRoaXMuZGlhbG9nLnBvcHVwKHRpdGxlLCB0cnVlLCBpY29uKS5zdWJzY3JpYmUoKTtcbiAgIH1cblxuICAgc2V0RmlsZU92ZXIoZXZlbnQ6IGFueSkge1xuICAgICAgdGhpcy5pc0ZpbGVPdmVyRHJvcHpvbmUgPSBldmVudDtcbiAgIH1cblxuICAgZGlzbWlzcygpIHtcbiAgICAgIC8vIHRoaXMudXBsb2FkZXIuY2xlYXJRdWV1ZSgpO1xuICAgICAgLy8gdGhpcy5maWxlSW5wdXQubmF0aXZlRWxlbWVudC52YWx1ZSA9IFwiXCI7XG4gICB9XG5cbiAgIG9uQ29tbWl0KGhhbmRsZXI6IE9ic2VydmVyPGFueT4pIHtcbiAgICAgIGxldCB1cGxvYWRJdGVtOiBhbnkgPSB0aGlzLnVwbG9hZGVyLnF1ZXVlW3RoaXMudXBsb2FkZXIucXVldWUubGVuZ3RoIC0gMV07XG4gICAgICBsZXQgdXJsID0gdGhpcy5pc1VwZGF0ZVZlcnNpb24gP1xuICAgICAgICAgQVBJcy5nZXRBcGlVcmkoQVBJX1RZUEUuQ19URU1QTEFURSwge3VpZDogdGhpcy5hdXRoLmdldFRva2VuKCkudXNlci5pZH0pIDpcbiAgICAgICAgIEFQSXMuZ2V0QXBpVXJpKEFQSV9UWVBFLkNfVEVNUExBVEUsIHt1aWQ6IHRoaXMuYXV0aC5nZXRUb2tlbigpLnVzZXIuaWR9KTtcblxuXG4gICAgICAvLyB1cGxvYWRJdGVtLmZvcm1EYXRhID0ge1xuICAgICAgLy8gICAgZk5hbWU6IHRoaXMuZmlsZUl0ZW0uYXR0YWNobmFtZSxcbiAgICAgIC8vICAgIC8vIGNhdGVnb3J5OiB0aGlzLmZpbGVJdGVtLmF0dGFjaGNhdGVnb3J5LFxuICAgICAgLy8gICAgZkdyb3VwOiB0aGlzLmlzVXBkYXRlVmVyc2lvbiA/IHRoaXMuZmlsZUl0ZW0uYXR0YWNoR3JvdXAgOiBcIlwiXG4gICAgICAvLyB9O1xuXG4gICAgICB1cGxvYWRJdGVtLnVybCA9IHVybDtcblxuXG4gICAgICAvLyBBZGQgYXV0aGVudGljYXRpb24gaGVhZGVycyBmb3IgZmlsZSB1cGxvYWRcbiAgICAgIGxldCB1c2VyVG9rZW4gPSB0aGlzLmF1dGguZ2V0VG9rZW4oKTtcblxuICAgICAgbGV0IGlzQ292ZXIgPSAhISh0aGlzLmNvdmVyID09ICdjb3ZlcicpO1xuXG4gICAgICBpZiAodXNlclRva2VuKSB7XG4gICAgICAgICB0aGlzLnVwbG9hZGVyLnNldE9wdGlvbnMoe1xuICAgICAgICAgICAgaGVhZGVyczogW3tcbiAgICAgICAgICAgICAgIG5hbWU6IFwidG9rZW5cIixcbiAgICAgICAgICAgICAgIHZhbHVlOiB1c2VyVG9rZW4udG9rZW5cbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgIG5hbWU6IFwidXNlcm5hbWVcIixcbiAgICAgICAgICAgICAgIHZhbHVlOiB1c2VyVG9rZW4udXNlci5sb2dpbm5hbWVcbiAgICAgICAgICAgIH1dXG4gICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgdXBsb2FkSXRlbS5mb3JtRGF0YSA9IHtcbiAgICAgICAgIHRlbXBsYXRlQ2xhc3M6dGhpcy5jYXRlU2VsZWN0LFxuICAgICAgICAgY292ZXI6aXNDb3ZlclxuICAgICAgfTtcbiAgICAgIHRoaXMudXBsb2FkZXIudXBsb2FkSXRlbSh1cGxvYWRJdGVtKS5zdWJzY3JpYmUocmVzdWx0ID0+IHtcbiAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCwncmVzdWx0JylcbiAgICAgICAgIGlmIChyZXN1bHQuc3RhdGUgPT09IFVwbG9hZFN0YXRlLlByb2dyZXNzKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICB9XG5cbiAgICAgICAgIGlmIChyZXN1bHQuc3RhdGUgPT09IFVwbG9hZFN0YXRlLkNvbXBsZXRlKSB7XG4gICAgICAgICAgICAvLyBBcyB1cGxvYWQgZnVuY3Rpb24gaXMgbm90IG1hbmFnZWQgYnkgcmVzdCBzZXJ2aWNlLFxuICAgICAgICAgICAgLy8gd2UgbmVlZCB0byBoYW5kbGUgdG9rZW4gcmVuZXcgbWFudWFsbHkuXG4gICAgICAgICAgICAvLyBPdGhlcndpc2UsIHRoZSB0b2tlbiB3b24ndCBiZSB1cGRhdGVkXG4gICAgICAgICAgICAvLyB3aGVuIHVzZXIgdXBsb2FkcyBmaWxlIGR1cmluZyBsYXN0IGZldyBzZWNvbmRzLlxuICAgICAgICAgICAgdGhpcy5hdXRoLnVwZGF0ZVRva2VuKHJlc3VsdC5oZWFkZXJzW1widG9rZW5cIl0pO1xuICAgICAgICAgICAgdGhpcy5kaWFsb2cuc2V0U3RhdGUodHJ1ZSwgdGhpcy5pMThuLmluc3RhbnQoXCJhbmFseXplci51cGxvYWREaWFsb2cud2FpdGluZ1wiKSk7XG4gICAgICAgICAgICBsZXQgaXRlbTogRmlsZUl0ZW0gPSBKU09OLnBhcnNlKHJlc3VsdC5ib2R5KTtcblxuICAgICAgICAgICAgaWYgKGl0ZW0uc3RhdHVzID09PSBGaWxlU3RhdHVzLlZhbGlkKSB7XG4gICAgICAgICAgICAgICB0aGlzLm5vdGlmeS5zdWNjZXNzKFxuICAgICAgICAgICAgICAgICAgdGhpcy5pMThuLmluc3RhbnQoXCJhbmFseXplci51cGxvYWREaWFsb2cuc3VjY2Vzcy50aXRsZVwiKSxcbiAgICAgICAgICAgICAgICAgIHRoaXMuaTE4bi5pbnN0YW50KFwiYW5hbHl6ZXIudXBsb2FkRGlhbG9nLnN1Y2Nlc3MuZGVzY1wiKVxuICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgIE9ic2VydmFibGUub2YodHJ1ZSkuc3Vic2NyaWJlKGhhbmRsZXIpO1xuICAgICAgICAgICAgICAgdGhpcy5kYXRhQ29tbWl0dGVkLmVtaXQoKTtcbiAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGl0ZW0uc3RhdHVzID09PSBGaWxlU3RhdHVzLkludmFsaWQpIHtcbiAgICAgICAgICAgICAgIE9ic2VydmFibGUudGhyb3coW3tcbiAgICAgICAgICAgICAgICAgIGV4Y2VwdGlvbk5hbWU6IHRoaXMuaTE4bi5pbnN0YW50KFwiYW5hbHl6ZXIudXBsb2FkRGlhbG9nLmludmFsaWQudGl0bGVcIiksXG4gICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogdGhpcy5pMThuLmluc3RhbnQoXCJhbmFseXplci51cGxvYWREaWFsb2cuaW52YWxpZC5kZXNjXCIpXG4gICAgICAgICAgICAgICB9XSkuc3Vic2NyaWJlKGhhbmRsZXIpO1xuICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG5cblxuICAgICAgICAgICAgLy8gbGV0IG5ld1ZhbDogRmlsZVN0YXR1cztcblxuICAgICAgICAgICAgLy8gdGhpcy5maWxlU2VydmljZS5sb29wVW50aWxTdGF0dXNDaGFuZ2Uoe1xuICAgICAgICAgICAgLy8gICAgZHVyYXRpb246IDEwMDAsXG4gICAgICAgICAgICAvLyAgICBjb3VudDogNSxcbiAgICAgICAgICAgIC8vICAgIG9yaWdpbmFsOiBKU09OLnBhcnNlKHJlc3VsdC5ib2R5KSxcbiAgICAgICAgICAgIC8vICAgIGV4aXRPbkVycm9yOiBmYWxzZVxuICAgICAgICAgICAgLy8gfSkuc3Vic2NyaWJlKHN0YXR1cyA9PiB7XG4gICAgICAgICAgICAvLyAgICBkZWJ1Z2dlclxuICAgICAgICAgICAgLy8gICAgbmV3VmFsID0gc3RhdHVzO1xuICAgICAgICAgICAgLy8gfSwgKCkgPT4ge30sIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgLy8gICAgY29uc29sZS53YXJuKG5ld1ZhbClcbiAgICAgICAgICAgIC8vICAgIHN3aXRjaCAobmV3VmFsKSB7XG4gICAgICAgICAgICAvLyAgICAgICBjYXNlIEZpbGVTdGF0dXMuVmFsaWQ6XG4gICAgICAgICAgICAvLyAgICAgICAgICB0aGlzLm5vdGlmeS5zdWNjZXNzKFxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgdGhpcy5pMThuLmluc3RhbnQoXCJhbmFseXplci51cGxvYWREaWFsb2cuc3VjY2Vzcy50aXRsZVwiKSxcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgIHRoaXMuaTE4bi5pbnN0YW50KFwiYW5hbHl6ZXIudXBsb2FkRGlhbG9nLnN1Y2Nlc3MuZGVzY1wiKVxuICAgICAgICAgICAgLy8gICAgICAgICAgKTtcbiAgICAgICAgICAgIC8vICAgICAgICAgIE9ic2VydmFibGUub2YodHJ1ZSkuc3Vic2NyaWJlKGhhbmRsZXIpO1xuICAgICAgICAgICAgLy8gICAgICAgICAgdGhpcy5kYXRhQ29tbWl0dGVkLmVtaXQoKTtcbiAgICAgICAgICAgIC8vICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgLy8gICAgICAgY2FzZSBGaWxlU3RhdHVzLkludmFsaWQ6XG4gICAgICAgICAgICAvLyAgICAgICAgICBPYnNlcnZhYmxlLnRocm93KFt7XG4gICAgICAgICAgICAvLyAgICAgICAgICAgICBleGNlcHRpb25OYW1lOiB0aGlzLmkxOG4uaW5zdGFudChcImFuYWx5emVyLnVwbG9hZERpYWxvZy5pbnZhbGlkLnRpdGxlXCIpLFxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgZGVzY3JpcHRpb246IHRoaXMuaTE4bi5pbnN0YW50KFwiYW5hbHl6ZXIudXBsb2FkRGlhbG9nLmludmFsaWQuZGVzY1wiKVxuICAgICAgICAgICAgLy8gICAgICAgICAgfV0pLnN1YnNjcmliZShoYW5kbGVyKTtcbiAgICAgICAgICAgIC8vICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgLy8gICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIC8vICAgICAgICAgIHRoaXMubm90aWZ5LmluZm8oXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICB0aGlzLmkxOG4uaW5zdGFudChcImFuYWx5emVyLnVwbG9hZERpYWxvZy53YWl0aW5nVGltZW91dC50aXRsZVwiKSxcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgIHRoaXMuaTE4bi5pbnN0YW50KFwiYW5hbHl6ZXIudXBsb2FkRGlhbG9nLndhaXRpbmdUaW1lb3V0LmRlc2NcIilcbiAgICAgICAgICAgIC8vICAgICAgICAgICk7XG4gICAgICAgICAgICAvLyAgICAgICAgICBPYnNlcnZhYmxlLm9mKHRydWUpLnN1YnNjcmliZShoYW5kbGVyKTtcbiAgICAgICAgICAgIC8vICAgICAgICAgIHRoaXMuZGF0YUNvbW1pdHRlZC5lbWl0KCk7XG4gICAgICAgICAgICAvLyAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIC8vICAgIH1cbiAgICAgICAgICAgIC8vIH0pO1xuXG4gICAgICAgICAgICB0aGlzLm5vdGlmeS5zdWNjZXNzKFxuICAgICAgICAgICAgICB0aGlzLmkxOG4uaW5zdGFudChcImFuYWx5emVyLnVwbG9hZERpYWxvZy5zdWNjZXNzLnRpdGxlXCIpLFxuICAgICAgICAgICAgICB0aGlzLmkxOG4uaW5zdGFudChcImFuYWx5emVyLnVwbG9hZERpYWxvZy5zdWNjZXNzLmRlc2NcIilcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICB0aGlzLmRhdGFDb21taXR0ZWQuZW1pdCgpO1xuICAgICAgICAgICAgdGhpcy51cGxvYWRlci5jbGVhclF1ZXVlKCk7XG4gICAgICAgICAgICB0aGlzLmZpbGVJbnB1dC5uYXRpdmVFbGVtZW50LnZhbHVlID0gXCJcIjtcbiAgICAgICAgICAgIE9ic2VydmFibGUub2YodHJ1ZSkuc3Vic2NyaWJlKGhhbmRsZXIpO1xuXG4gICAgICAgICB9XG4gICAgICB9LCAoZXJyb3I6IFVwbG9hZFN0YXRlKSA9PiB7XG4gICAgICAgICBPYnNlcnZhYmxlLnRocm93KFt7XG4gICAgICAgICAgICBleGNlcHRpb25OYW1lOiB0aGlzLmkxOG4uaW5zdGFudChcImFuYWx5emVyLnVwbG9hZERpYWxvZy51cGxvYWRFcnJvci50aXRsZVwiLCB7c3RhdHVzOiBlcnJvci5jb2RlfSksXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogdGhpcy5pMThuLmluc3RhbnQoXCJhbmFseXplci51cGxvYWREaWFsb2cudXBsb2FkRXJyb3IuZGVzY1wiLCB7ZGVzYzogZXJyb3IuYm9keX0pXG4gICAgICAgICB9XSkuc3Vic2NyaWJlKGhhbmRsZXIpO1xuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuZGlhbG9nLnNldFN0YXRlKHRydWUsIHRoaXMuaTE4bi5pbnN0YW50KFwiYW5hbHl6ZXIudXBsb2FkRGlhbG9nLnVwbG9hZGluZ1wiKSk7XG4gICB9XG59XG4iXX0=
