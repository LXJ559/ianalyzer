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
var _ = require("lodash");
var UploadDialogComponent = (function () {
    function UploadDialogComponent(i18n, auth, fileService, notify) {
        var _this = this;
        this.i18n = i18n;
        this.auth = auth;
        this.fileService = fileService;
        this.notify = notify;
        this.dataCommitted = new core_1.EventEmitter();
        this.uploader = new file_uploader_ex_1.FileUploaderEx({
            allowedFileType: ["xlsx", "xls"],
            isHTML5: true
        });
        this.sizeFormatter = general_util_1.Util.formatStorageSize;
        this.categories = [];
        this.uploader.afterAddingFile.subscribe(function (item) {
            var splitNames = item.file.name.split(".");
            if (!_this.isUpdateVersion) {
                /**
                 * 让下拉框默认选中第一个
                 */
                _this.fileItem = {
                    categoryCode: _this.categories.length > 0 ? _this.categories[0].category : null
                };
            }
            _this.fileItem.suffix = splitNames.pop();
            _this.fileItem.attachname = _this.isUpdateVersion ?
                _this.fileItem.attachname : splitNames.join(".");
            _this.fileItem.size = item.file.size;
            _this.fileInput.nativeElement.value = "";
            _this.previewFile = item._file;
        });
    }
    UploadDialogComponent.prototype.popup = function (selectedFile) {
        var _this = this;
        this.isUpdateVersion = !!selectedFile;
        this.fileItem = this.isUpdateVersion ? selectedFile : null;
        console.log(this.fileItem);
        var title = selectedFile ?
            this.i18n.instant("analyzer.uploadDialog.update.title", { name: selectedFile["attachname"] }) :
            this.i18n.instant("analyzer.uploadDialog.new.title");
        var icon = selectedFile ? "icon-cloud-upload icons" : "icon-note icons";
        this.dialog.popup(title, true, icon).subscribe(function () {
            _this.dialog.setState(true, _this.i18n.instant("loading"));
            var user = _this.auth.getToken().user;
            _this.fileService.getCateofUpload(user.id).subscribe(function (res) {
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
                _this.categories = groupTemplates.concat(subTemplates);
            }, function () { }, function () { return _this.dialog.setState(false); });
        });
    };
    UploadDialogComponent.prototype.setFileOver = function (event) {
        console.log('setFileOver');
        this.isFileOverDropzone = event;
    };
    UploadDialogComponent.prototype.dismiss = function () {
        // this.uploader.clearQueue();
        // this.fileInput.nativeElement.value = "";
    };
    UploadDialogComponent.prototype.onCommit = function (handler) {
        var _this = this;
        var uploadItem = this.uploader.queue[this.uploader.queue.length - 1];
        var url = this.isUpdateVersion ?
            api_util_1.APIs.getApiUri(api_util_1.API_TYPE.U_FILE, { uid: this.auth.getToken().user.id }) :
            api_util_1.APIs.getApiUri(api_util_1.API_TYPE.C_FILE, { uid: this.auth.getToken().user.id });
        var commitCat = this.fileItem.categoryCode, isGroupCategory;
        _.map(this.categories, function (cat) {
            if (commitCat == cat.category) {
                isGroupCategory = cat.isGroupCategory;
            }
        });
        this.fileItem.categoryType == 1 ? this.fileItem.categoryType = true : this.fileItem.categoryType = false;
        uploadItem.formData = {
            fName: this.fileItem.attachname,
            category: this.fileItem.categoryCode,
            fGroup: this.isUpdateVersion ? this.fileItem.attachGroup : "",
            isGroupCategory: this.isUpdateVersion ? this.fileItem.categoryType : isGroupCategory
        };
        // console.log(url);
        uploadItem.url = url;
        // Add authentication headers for file upload
        var userToken = this.auth.getToken();
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
        console.log("=================");
        console.log(uploadItem);
        this.uploader.uploadItem(uploadItem).subscribe(function (result) {
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
                _this.notify.info(
                // this.i18n.instant("analyzer.uploadDialog.success.title"),
                // this.i18n.instant("analyzer.uploadDialog.success.desc")
                "提示信息", "正在上传...");
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
    return UploadDialogComponent;
}());
__decorate([
    core_1.ViewChild("dialog"),
    __metadata("design:type", dialog_widget_1.DialogWidget)
], UploadDialogComponent.prototype, "dialog", void 0);
__decorate([
    core_1.ViewChild("fileInput"),
    __metadata("design:type", Object)
], UploadDialogComponent.prototype, "fileInput", void 0);
__decorate([
    core_1.ViewChild("preview"),
    __metadata("design:type", preview_component_1.PreviewComponent)
], UploadDialogComponent.prototype, "preview", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], UploadDialogComponent.prototype, "dataCommitted", void 0);
UploadDialogComponent = __decorate([
    core_1.Component({
        selector: "upload-dialog",
        templateUrl: "views/analyzer/upload.dialog.html"
    }),
    __metadata("design:paramtypes", [ng2_translate_1.TranslateService, auth_service_1.AuthService, file_service_1.FileService, angular2_notifications_1.NotificationsService])
], UploadDialogComponent);
exports.UploadDialogComponent = UploadDialogComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvdXBsb2FkLmRpYWxvZy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOztHQUVHO0FBQ0gsc0NBQXlFO0FBQ3pFLDBEQUFzRDtBQUN0RCw4Q0FBaUQ7QUFDakQsNkRBQTZEO0FBQzdELG1EQUFvRTtBQUNwRSxzREFBMkM7QUFDM0MseURBQXFEO0FBQ3JELHlEQUFxRDtBQUNyRCw2QkFBMEM7QUFDMUMseURBQXFEO0FBRXJELGlFQUE0RDtBQUM1RCxpRUFBeUU7QUFDekUsMEJBQTRCO0FBTzVCO0lBdUJHLCtCQUFvQixJQUFzQixFQUFVLElBQWlCLEVBQVUsV0FBd0IsRUFBVSxNQUE0QjtRQUE3SSxpQkFxQkM7UUFyQm1CLFNBQUksR0FBSixJQUFJLENBQWtCO1FBQVUsU0FBSSxHQUFKLElBQUksQ0FBYTtRQUFVLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBc0I7UUFsQm5JLGtCQUFhLEdBQXNCLElBQUksbUJBQVksRUFBRSxDQUFDO1FBTWhFLGFBQVEsR0FBbUIsSUFBSSxpQ0FBYyxDQUFDO1lBQzNDLGVBQWUsRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUM7WUFDaEMsT0FBTyxFQUFFLElBQUk7U0FDZixDQUFDLENBQUM7UUFHSCxrQkFBYSxHQUFHLG1CQUFJLENBQUMsaUJBQWlCLENBQUM7UUFHdkMsZUFBVSxHQUFlLEVBQUUsQ0FBQztRQUl6QixJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsVUFBQyxJQUFTO1lBRS9DLElBQUksVUFBVSxHQUFhLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNyRCxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO2dCQUN6Qjs7bUJBRUc7Z0JBQ0gsS0FBSSxDQUFDLFFBQVEsR0FBRztvQkFD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QUFMbkU7SUFKQyxnQkFBUyxDQUFDO1FBQ1IsUUFBUSxFQUFFLGVBQWU7UUFDekIsV0FBVyxFQUFFLG1DQUFtQztLQUNsRCxDQUFDO3FDQXdCMkIsZ0NBQWdCLEVBQWdCLDBCQUFXLEVBQXVCLDBCQUFXLEVBQWtCLDZDQUFvQjt5QkEwTi9JO0FBalBZLGdDQUFBLHFCQUFxQixDQUFBIiwiZmlsZSI6ImNvbXBvbmVudHMvdXBsb2FkLmRpYWxvZy5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENyZWF0ZWQgYnkgemhvbmdwaW5nLmx1IG9uIDkvMjMvMjAxNi5cbiAqL1xuaW1wb3J0IHtDb21wb25lbnQsIFZpZXdDaGlsZCwgT3V0cHV0LCBFdmVudEVtaXR0ZXJ9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge0RpYWxvZ1dpZGdldH0gZnJvbSBcIi4uL3dpZGdldHMvZGlhbG9nLndpZGdldFwiO1xuaW1wb3J0IHtBUElzLCBBUElfVFlQRX0gZnJvbSBcIi4uL3V0aWxzL2FwaS51dGlsXCI7XG5pbXBvcnQge1RyYW5zbGF0ZVNlcnZpY2V9IGZyb20gXCJuZzItdHJhbnNsYXRlL25nMi10cmFuc2xhdGVcIjtcbmltcG9ydCB7RmlsZUl0ZW0sIENhdGVnb3J5LCBGaWxlU3RhdHVzfSBmcm9tIFwiLi4vbW9kZWxzL2ZpbGUubW9kZWxcIjtcbmltcG9ydCB7VXRpbH0gZnJvbSBcIi4uL3V0aWxzL2dlbmVyYWwudXRpbFwiO1xuaW1wb3J0IHtQcmV2aWV3Q29tcG9uZW50fSBmcm9tIFwiLi9wcmV2aWV3LmNvbXBvbmVudFwiO1xuaW1wb3J0IHtBdXRoU2VydmljZX0gZnJvbSBcIi4uL3NlcnZpY2VzL2F1dGguc2VydmljZVwiO1xuaW1wb3J0IHtPYnNlcnZlciwgT2JzZXJ2YWJsZX0gZnJvbSBcInJ4anNcIjtcbmltcG9ydCB7RmlsZVNlcnZpY2V9IGZyb20gXCIuLi9zZXJ2aWNlcy9maWxlLnNlcnZpY2VcIjtcbmltcG9ydCB7VXNlclR5cGV9IGZyb20gXCIuLi9tb2RlbHMvYXV0aC5tb2RlbFwiO1xuaW1wb3J0IHtOb3RpZmljYXRpb25zU2VydmljZX0gZnJvbSBcImFuZ3VsYXIyLW5vdGlmaWNhdGlvbnNcIjtcbmltcG9ydCB7RmlsZVVwbG9hZGVyRXgsIFVwbG9hZFN0YXRlfSBmcm9tIFwiLi4vc2VydmljZXMvZmlsZS51cGxvYWRlci5leFwiO1xuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuXG5cbkBDb21wb25lbnQoe1xuICAgc2VsZWN0b3I6IFwidXBsb2FkLWRpYWxvZ1wiLFxuICAgdGVtcGxhdGVVcmw6IFwidmlld3MvYW5hbHl6ZXIvdXBsb2FkLmRpYWxvZy5odG1sXCJcbn0pXG5leHBvcnQgY2xhc3MgVXBsb2FkRGlhbG9nQ29tcG9uZW50IHtcbiAgIEBWaWV3Q2hpbGQoXCJkaWFsb2dcIikgZGlhbG9nOiBEaWFsb2dXaWRnZXQ7XG4gICBAVmlld0NoaWxkKFwiZmlsZUlucHV0XCIpIGZpbGVJbnB1dDogYW55O1xuICAgQFZpZXdDaGlsZChcInByZXZpZXdcIikgcHJldmlldzogUHJldmlld0NvbXBvbmVudDtcblxuICAgQE91dHB1dCgpIGRhdGFDb21taXR0ZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAvLyBGaWxlSXRlbSBuYW1lIGFuZCBjYXRlZ29yeSB3aWxsIG5vdCBiZSBhYmxlIHRvIGNoYW5nZSBpZiB0aGlzIHZhbHVlIGlzIHRydWU7XG4gICBpc1VwZGF0ZVZlcnNpb246IGJvb2xlYW47XG4gICBmaWxlSXRlbTogRmlsZUl0ZW07XG5cbiAgIHVwbG9hZGVyOiBGaWxlVXBsb2FkZXJFeCA9IG5ldyBGaWxlVXBsb2FkZXJFeCh7XG4gICAgICBhbGxvd2VkRmlsZVR5cGU6IFtcInhsc3hcIiwgXCJ4bHNcIl0sXG4gICAgICBpc0hUTUw1OiB0cnVlXG4gICB9KTtcblxuICAgaXNGaWxlT3ZlckRyb3B6b25lOiBib29sZWFuO1xuICAgc2l6ZUZvcm1hdHRlciA9IFV0aWwuZm9ybWF0U3RvcmFnZVNpemU7XG4gICBwcmV2aWV3RmlsZTogRmlsZTtcblxuICAgY2F0ZWdvcmllczogQ2F0ZWdvcnlbXSA9IFtdO1xuXG5cbiAgIGNvbnN0cnVjdG9yKHByaXZhdGUgaTE4bjogVHJhbnNsYXRlU2VydmljZSwgcHJpdmF0ZSBhdXRoOiBBdXRoU2VydmljZSwgcHJpdmF0ZSBmaWxlU2VydmljZTogRmlsZVNlcnZpY2UsIHByaXZhdGUgbm90aWZ5OiBOb3RpZmljYXRpb25zU2VydmljZSkge1xuICAgICAgdGhpcy51cGxvYWRlci5hZnRlckFkZGluZ0ZpbGUuc3Vic2NyaWJlKChpdGVtOiBhbnkpOiBhbnkgPT4ge1xuXG4gICAgICAgICBsZXQgc3BsaXROYW1lczogc3RyaW5nW10gPSBpdGVtLmZpbGUubmFtZS5zcGxpdChcIi5cIik7XG4gICAgICAgICBpZiAoIXRoaXMuaXNVcGRhdGVWZXJzaW9uKSB7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIOiuqeS4i+aLieahhum7mOiupOmAieS4reesrOS4gOS4qlxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICB0aGlzLmZpbGVJdGVtID0ge1xuICAgICAgICAgICAgICAgY2F0ZWdvcnlDb2RlOiB0aGlzLmNhdGVnb3JpZXMubGVuZ3RoID4gMCA/IHRoaXMuY2F0ZWdvcmllc1swXS5jYXRlZ29yeSA6IG51bGxcbiAgICAgICAgICAgIH07XG4gICAgICAgICB9XG5cbiAgICAgICAgIHRoaXMuZmlsZUl0ZW0uc3VmZml4ID0gc3BsaXROYW1lcy5wb3AoKTtcbiAgICAgICAgIHRoaXMuZmlsZUl0ZW0uYXR0YWNobmFtZSA9IHRoaXMuaXNVcGRhdGVWZXJzaW9uID9cbiAgICAgICAgICAgIHRoaXMuZmlsZUl0ZW0uYXR0YWNobmFtZSA6IHNwbGl0TmFtZXMuam9pbihcIi5cIik7XG4gICAgICAgICB0aGlzLmZpbGVJdGVtLnNpemUgPSBpdGVtLmZpbGUuc2l6ZTtcblxuICAgICAgICAgdGhpcy5maWxlSW5wdXQubmF0aXZlRWxlbWVudC52YWx1ZSA9IFwiXCI7XG4gICAgICAgICB0aGlzLnByZXZpZXdGaWxlID0gaXRlbS5fZmlsZTtcbiAgICAgIH0pO1xuICAgfVxuXG4gICBwb3B1cChzZWxlY3RlZEZpbGU/OiBGaWxlSXRlbSk6IHZvaWQge1xuICAgICAgdGhpcy5pc1VwZGF0ZVZlcnNpb24gPSAhIXNlbGVjdGVkRmlsZTtcbiAgICAgIHRoaXMuZmlsZUl0ZW0gPSB0aGlzLmlzVXBkYXRlVmVyc2lvbiA/IHNlbGVjdGVkRmlsZSA6IG51bGw7XG5cbiAgICAgIGNvbnNvbGUubG9nKHRoaXMuZmlsZUl0ZW0pO1xuICAgICAgbGV0IHRpdGxlID0gc2VsZWN0ZWRGaWxlID9cbiAgICAgICAgIHRoaXMuaTE4bi5pbnN0YW50KFwiYW5hbHl6ZXIudXBsb2FkRGlhbG9nLnVwZGF0ZS50aXRsZVwiLCB7bmFtZTogc2VsZWN0ZWRGaWxlW1wiYXR0YWNobmFtZVwiXX0pIDpcbiAgICAgICAgIHRoaXMuaTE4bi5pbnN0YW50KFwiYW5hbHl6ZXIudXBsb2FkRGlhbG9nLm5ldy50aXRsZVwiKTtcbiAgICAgIGxldCBpY29uID0gc2VsZWN0ZWRGaWxlID8gXCJpY29uLWNsb3VkLXVwbG9hZCBpY29uc1wiIDogXCJpY29uLW5vdGUgaWNvbnNcIjtcblxuICAgICAgdGhpcy5kaWFsb2cucG9wdXAodGl0bGUsIHRydWUsIGljb24pLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICB0aGlzLmRpYWxvZy5zZXRTdGF0ZSh0cnVlLCB0aGlzLmkxOG4uaW5zdGFudChcImxvYWRpbmdcIikpO1xuXG4gICAgICAgICAgbGV0IHVzZXIgPSB0aGlzLmF1dGguZ2V0VG9rZW4oKS51c2VyO1xuXG4gICAgICAgICAgdGhpcy5maWxlU2VydmljZS5nZXRDYXRlb2ZVcGxvYWQodXNlci5pZCkuc3Vic2NyaWJlKHJlcyA9PiB7XG5cbiAgICAgICAgICAgIC8vIGlmICh1c2VyLnR5cGUgIT09IFVzZXJUeXBlLkFkbWluKSB7XG4gICAgICAgICAgICAvLyAgICBsZXQgdmlzaWJsZUNhdGVnb3J5OiBzdHJpbmdbXSA9IHVzZXIuY2F0ZWdvcnkuc3BsaXQoXCIsXCIpO1xuICAgICAgICAgICAgLy8gICAgdGhpcy5jYXRlZ29yaWVzID0gbGlzdC5maWx0ZXIoY2F0ZWdvcnkgPT4ge1xuICAgICAgICAgICAgLy8gICAgICAgcmV0dXJuIHZpc2libGVDYXRlZ29yeS5pbmRleE9mKGNhdGVnb3J5LnZhbHVlKSA+IC0xO1xuICAgICAgICAgICAgLy8gICAgfSk7XG4gICAgICAgICAgICAvLyB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gICAgdGhpcy5jYXRlZ29yaWVzID0gbGlzdDtcbiAgICAgICAgICAgIC8vIH1cblxuICAgICAgICAgICAgLy8gdGhpcy5jYXRlZ29yaWVzID0gbGlzdDtcblxuICAgICAgICAgICAgbGV0IHtncm91cFRlbXBsYXRlcywgc3ViVGVtcGxhdGVzfSA9IHJlcztcblxuICAgICAgICAgICAgXy5tYXAoZ3JvdXBUZW1wbGF0ZXMsKGdyb3VwKT0+e1xuICAgICAgICAgICAgICAgZ3JvdXAuaXNHcm91cENhdGVnb3J5ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgIGdyb3VwLmNhdGVnb3J5ID0gZ3JvdXAuZ3JvdXBDYXRlZ29yeTtcbiAgICAgICAgICAgICAgIGdyb3VwLnRlbXBsYXRlbmFtZSA9IGdyb3VwLmdyb3VwTmFtZTtcbiAgICAgICAgICAgICAgIGRlbGV0ZSBncm91cC5ncm91cENhdGVnb3J5O1xuICAgICAgICAgICAgICAgZGVsZXRlIGdyb3VwLmdyb3VwbmFtZTtcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIF8ubWFwKHN1YlRlbXBsYXRlcywgKHN1YikgPT4ge1xuICAgICAgICAgICAgICAgc3ViLmlzR3JvdXBDYXRlZ29yeSA9IGZhbHNlO1xuICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgdGhpcy5jYXRlZ29yaWVzID0gZ3JvdXBUZW1wbGF0ZXMuY29uY2F0KHN1YlRlbXBsYXRlcyk7XG5cbiAgICAgICAgIH0sICgpID0+IHt9LCAoKSA9PiB0aGlzLmRpYWxvZy5zZXRTdGF0ZShmYWxzZSkpO1xuICAgICAgfSk7XG4gICB9XG5cbiAgIHNldEZpbGVPdmVyKGV2ZW50OiBhbnkpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdzZXRGaWxlT3ZlcicpXG4gICAgICB0aGlzLmlzRmlsZU92ZXJEcm9wem9uZSA9IGV2ZW50O1xuICAgfVxuXG4gICBkaXNtaXNzKCkge1xuICAgICAgLy8gdGhpcy51cGxvYWRlci5jbGVhclF1ZXVlKCk7XG4gICAgICAvLyB0aGlzLmZpbGVJbnB1dC5uYXRpdmVFbGVtZW50LnZhbHVlID0gXCJcIjtcbiAgIH1cblxuICAgb25Db21taXQoaGFuZGxlcjogT2JzZXJ2ZXI8YW55Pikge1xuICAgICAgbGV0IHVwbG9hZEl0ZW06IGFueSA9IHRoaXMudXBsb2FkZXIucXVldWVbdGhpcy51cGxvYWRlci5xdWV1ZS5sZW5ndGggLSAxXTtcbiAgICAgIGxldCB1cmwgPSB0aGlzLmlzVXBkYXRlVmVyc2lvbiA/XG4gICAgICAgICBBUElzLmdldEFwaVVyaShBUElfVFlQRS5VX0ZJTEUsIHt1aWQ6IHRoaXMuYXV0aC5nZXRUb2tlbigpLnVzZXIuaWR9KSA6XG4gICAgICAgICBBUElzLmdldEFwaVVyaShBUElfVFlQRS5DX0ZJTEUsIHt1aWQ6IHRoaXMuYXV0aC5nZXRUb2tlbigpLnVzZXIuaWR9KTtcblxuICAgICAgbGV0IGNvbW1pdENhdCA9IHRoaXMuZmlsZUl0ZW0uY2F0ZWdvcnlDb2RlLCBpc0dyb3VwQ2F0ZWdvcnk7XG5cbiAgICAgIF8ubWFwKHRoaXMuY2F0ZWdvcmllcywgKGNhdCk9PntcbiAgICAgICAgIGlmIChjb21taXRDYXQgPT0gY2F0LmNhdGVnb3J5KSB7XG4gICAgICAgICAgICBpc0dyb3VwQ2F0ZWdvcnkgPSBjYXQuaXNHcm91cENhdGVnb3J5XG4gICAgICAgICB9XG4gICAgICB9KVxuXG4gICAgICB0aGlzLmZpbGVJdGVtLmNhdGVnb3J5VHlwZSA9PSAxID8gdGhpcy5maWxlSXRlbS5jYXRlZ29yeVR5cGUgPSB0cnVlIDogdGhpcy5maWxlSXRlbS5jYXRlZ29yeVR5cGUgPSBmYWxzZTtcblxuICAgICAgdXBsb2FkSXRlbS5mb3JtRGF0YSA9IHtcbiAgICAgICAgIGZOYW1lOiB0aGlzLmZpbGVJdGVtLmF0dGFjaG5hbWUsXG4gICAgICAgICBjYXRlZ29yeTogdGhpcy5maWxlSXRlbS5jYXRlZ29yeUNvZGUsXG4gICAgICAgICBmR3JvdXA6IHRoaXMuaXNVcGRhdGVWZXJzaW9uID8gdGhpcy5maWxlSXRlbS5hdHRhY2hHcm91cCA6IFwiXCIsXG4gICAgICAgICBpc0dyb3VwQ2F0ZWdvcnk6IHRoaXMuaXNVcGRhdGVWZXJzaW9uID8gdGhpcy5maWxlSXRlbS5jYXRlZ29yeVR5cGUgOiBpc0dyb3VwQ2F0ZWdvcnlcbiAgICAgIH07XG5cbiAgICAgIC8vIGNvbnNvbGUubG9nKHVybCk7XG5cbiAgICAgIHVwbG9hZEl0ZW0udXJsID0gdXJsO1xuXG5cbiAgICAgIC8vIEFkZCBhdXRoZW50aWNhdGlvbiBoZWFkZXJzIGZvciBmaWxlIHVwbG9hZFxuICAgICAgbGV0IHVzZXJUb2tlbiA9IHRoaXMuYXV0aC5nZXRUb2tlbigpO1xuXG4gICAgICBpZiAodXNlclRva2VuKSB7XG4gICAgICAgICB0aGlzLnVwbG9hZGVyLnNldE9wdGlvbnMoe1xuICAgICAgICAgICAgaGVhZGVyczogW3tcbiAgICAgICAgICAgICAgIG5hbWU6IFwidG9rZW5cIixcbiAgICAgICAgICAgICAgIHZhbHVlOiB1c2VyVG9rZW4udG9rZW5cbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgIG5hbWU6IFwidXNlcm5hbWVcIixcbiAgICAgICAgICAgICAgIHZhbHVlOiB1c2VyVG9rZW4udXNlci5sb2dpbm5hbWVcbiAgICAgICAgICAgIH1dXG4gICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGNvbnNvbGUubG9nKFwiPT09PT09PT09PT09PT09PT1cIilcbiAgICAgIGNvbnNvbGUubG9nKHVwbG9hZEl0ZW0pXG5cbiAgICAgIHRoaXMudXBsb2FkZXIudXBsb2FkSXRlbSh1cGxvYWRJdGVtKS5zdWJzY3JpYmUocmVzdWx0ID0+IHtcbiAgICAgICAgIGlmIChyZXN1bHQuc3RhdGUgPT09IFVwbG9hZFN0YXRlLlByb2dyZXNzKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICB9XG5cbiAgICAgICAgIGlmIChyZXN1bHQuc3RhdGUgPT09IFVwbG9hZFN0YXRlLkNvbXBsZXRlKSB7XG4gICAgICAgICAgICAvLyBBcyB1cGxvYWQgZnVuY3Rpb24gaXMgbm90IG1hbmFnZWQgYnkgcmVzdCBzZXJ2aWNlLFxuICAgICAgICAgICAgLy8gd2UgbmVlZCB0byBoYW5kbGUgdG9rZW4gcmVuZXcgbWFudWFsbHkuXG4gICAgICAgICAgICAvLyBPdGhlcndpc2UsIHRoZSB0b2tlbiB3b24ndCBiZSB1cGRhdGVkXG4gICAgICAgICAgICAvLyB3aGVuIHVzZXIgdXBsb2FkcyBmaWxlIGR1cmluZyBsYXN0IGZldyBzZWNvbmRzLlxuICAgICAgICAgICAgdGhpcy5hdXRoLnVwZGF0ZVRva2VuKHJlc3VsdC5oZWFkZXJzW1widG9rZW5cIl0pO1xuICAgICAgICAgICAgdGhpcy5kaWFsb2cuc2V0U3RhdGUodHJ1ZSwgdGhpcy5pMThuLmluc3RhbnQoXCJhbmFseXplci51cGxvYWREaWFsb2cud2FpdGluZ1wiKSk7XG4gICAgICAgICAgICBsZXQgaXRlbTogRmlsZUl0ZW0gPSBKU09OLnBhcnNlKHJlc3VsdC5ib2R5KTtcblxuICAgICAgICAgICAgaWYgKGl0ZW0uc3RhdHVzID09PSBGaWxlU3RhdHVzLlZhbGlkKSB7XG4gICAgICAgICAgICAgICB0aGlzLm5vdGlmeS5zdWNjZXNzKFxuICAgICAgICAgICAgICAgICAgdGhpcy5pMThuLmluc3RhbnQoXCJhbmFseXplci51cGxvYWREaWFsb2cuc3VjY2Vzcy50aXRsZVwiKSxcbiAgICAgICAgICAgICAgICAgIHRoaXMuaTE4bi5pbnN0YW50KFwiYW5hbHl6ZXIudXBsb2FkRGlhbG9nLnN1Y2Nlc3MuZGVzY1wiKVxuICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgIE9ic2VydmFibGUub2YodHJ1ZSkuc3Vic2NyaWJlKGhhbmRsZXIpO1xuICAgICAgICAgICAgICAgdGhpcy5kYXRhQ29tbWl0dGVkLmVtaXQoKTtcbiAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGl0ZW0uc3RhdHVzID09PSBGaWxlU3RhdHVzLkludmFsaWQpIHtcbiAgICAgICAgICAgICAgIE9ic2VydmFibGUudGhyb3coW3tcbiAgICAgICAgICAgICAgICAgIGV4Y2VwdGlvbk5hbWU6IHRoaXMuaTE4bi5pbnN0YW50KFwiYW5hbHl6ZXIudXBsb2FkRGlhbG9nLmludmFsaWQudGl0bGVcIiksXG4gICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogdGhpcy5pMThuLmluc3RhbnQoXCJhbmFseXplci51cGxvYWREaWFsb2cuaW52YWxpZC5kZXNjXCIpXG4gICAgICAgICAgICAgICB9XSkuc3Vic2NyaWJlKGhhbmRsZXIpO1xuICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG5cblxuICAgICAgICAgICAgLy8gbGV0IG5ld1ZhbDogRmlsZVN0YXR1cztcblxuICAgICAgICAgICAgLy8gdGhpcy5maWxlU2VydmljZS5sb29wVW50aWxTdGF0dXNDaGFuZ2Uoe1xuICAgICAgICAgICAgLy8gICAgZHVyYXRpb246IDEwMDAsXG4gICAgICAgICAgICAvLyAgICBjb3VudDogNSxcbiAgICAgICAgICAgIC8vICAgIG9yaWdpbmFsOiBKU09OLnBhcnNlKHJlc3VsdC5ib2R5KSxcbiAgICAgICAgICAgIC8vICAgIGV4aXRPbkVycm9yOiBmYWxzZVxuICAgICAgICAgICAgLy8gfSkuc3Vic2NyaWJlKHN0YXR1cyA9PiB7XG4gICAgICAgICAgICAvLyAgICBkZWJ1Z2dlclxuICAgICAgICAgICAgLy8gICAgbmV3VmFsID0gc3RhdHVzO1xuICAgICAgICAgICAgLy8gfSwgKCkgPT4ge30sIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgLy8gICAgY29uc29sZS53YXJuKG5ld1ZhbClcbiAgICAgICAgICAgIC8vICAgIHN3aXRjaCAobmV3VmFsKSB7XG4gICAgICAgICAgICAvLyAgICAgICBjYXNlIEZpbGVTdGF0dXMuVmFsaWQ6XG4gICAgICAgICAgICAvLyAgICAgICAgICB0aGlzLm5vdGlmeS5zdWNjZXNzKFxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgdGhpcy5pMThuLmluc3RhbnQoXCJhbmFseXplci51cGxvYWREaWFsb2cuc3VjY2Vzcy50aXRsZVwiKSxcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgIHRoaXMuaTE4bi5pbnN0YW50KFwiYW5hbHl6ZXIudXBsb2FkRGlhbG9nLnN1Y2Nlc3MuZGVzY1wiKVxuICAgICAgICAgICAgLy8gICAgICAgICAgKTtcbiAgICAgICAgICAgIC8vICAgICAgICAgIE9ic2VydmFibGUub2YodHJ1ZSkuc3Vic2NyaWJlKGhhbmRsZXIpO1xuICAgICAgICAgICAgLy8gICAgICAgICAgdGhpcy5kYXRhQ29tbWl0dGVkLmVtaXQoKTtcbiAgICAgICAgICAgIC8vICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgLy8gICAgICAgY2FzZSBGaWxlU3RhdHVzLkludmFsaWQ6XG4gICAgICAgICAgICAvLyAgICAgICAgICBPYnNlcnZhYmxlLnRocm93KFt7XG4gICAgICAgICAgICAvLyAgICAgICAgICAgICBleGNlcHRpb25OYW1lOiB0aGlzLmkxOG4uaW5zdGFudChcImFuYWx5emVyLnVwbG9hZERpYWxvZy5pbnZhbGlkLnRpdGxlXCIpLFxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgZGVzY3JpcHRpb246IHRoaXMuaTE4bi5pbnN0YW50KFwiYW5hbHl6ZXIudXBsb2FkRGlhbG9nLmludmFsaWQuZGVzY1wiKVxuICAgICAgICAgICAgLy8gICAgICAgICAgfV0pLnN1YnNjcmliZShoYW5kbGVyKTtcbiAgICAgICAgICAgIC8vICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgLy8gICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIC8vICAgICAgICAgIHRoaXMubm90aWZ5LmluZm8oXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICB0aGlzLmkxOG4uaW5zdGFudChcImFuYWx5emVyLnVwbG9hZERpYWxvZy53YWl0aW5nVGltZW91dC50aXRsZVwiKSxcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgIHRoaXMuaTE4bi5pbnN0YW50KFwiYW5hbHl6ZXIudXBsb2FkRGlhbG9nLndhaXRpbmdUaW1lb3V0LmRlc2NcIilcbiAgICAgICAgICAgIC8vICAgICAgICAgICk7XG4gICAgICAgICAgICAvLyAgICAgICAgICBPYnNlcnZhYmxlLm9mKHRydWUpLnN1YnNjcmliZShoYW5kbGVyKTtcbiAgICAgICAgICAgIC8vICAgICAgICAgIHRoaXMuZGF0YUNvbW1pdHRlZC5lbWl0KCk7XG4gICAgICAgICAgICAvLyAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIC8vICAgIH1cbiAgICAgICAgICAgIC8vIH0pO1xuXG4gICAgICAgICAgICB0aGlzLm5vdGlmeS5pbmZvKFxuICAgICAgICAgICAgICAvLyB0aGlzLmkxOG4uaW5zdGFudChcImFuYWx5emVyLnVwbG9hZERpYWxvZy5zdWNjZXNzLnRpdGxlXCIpLFxuICAgICAgICAgICAgICAvLyB0aGlzLmkxOG4uaW5zdGFudChcImFuYWx5emVyLnVwbG9hZERpYWxvZy5zdWNjZXNzLmRlc2NcIilcbiAgICAgICAgICAgICAgXCLmj5DnpLrkv6Hmga9cIixcIuato+WcqOS4iuS8oC4uLlwiXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgdGhpcy5kYXRhQ29tbWl0dGVkLmVtaXQoKTtcbiAgICAgICAgICAgIHRoaXMudXBsb2FkZXIuY2xlYXJRdWV1ZSgpO1xuICAgICAgICAgICAgdGhpcy5maWxlSW5wdXQubmF0aXZlRWxlbWVudC52YWx1ZSA9IFwiXCI7XG4gICAgICAgICAgICBPYnNlcnZhYmxlLm9mKHRydWUpLnN1YnNjcmliZShoYW5kbGVyKTtcblxuICAgICAgICAgfVxuICAgICAgfSwgKGVycm9yOiBVcGxvYWRTdGF0ZSkgPT4ge1xuICAgICAgICAgT2JzZXJ2YWJsZS50aHJvdyhbe1xuICAgICAgICAgICAgZXhjZXB0aW9uTmFtZTogdGhpcy5pMThuLmluc3RhbnQoXCJhbmFseXplci51cGxvYWREaWFsb2cudXBsb2FkRXJyb3IudGl0bGVcIiwge3N0YXR1czogZXJyb3IuY29kZX0pLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IHRoaXMuaTE4bi5pbnN0YW50KFwiYW5hbHl6ZXIudXBsb2FkRGlhbG9nLnVwbG9hZEVycm9yLmRlc2NcIiwge2Rlc2M6IGVycm9yLmJvZHl9KVxuICAgICAgICAgfV0pLnN1YnNjcmliZShoYW5kbGVyKTtcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLmRpYWxvZy5zZXRTdGF0ZSh0cnVlLCB0aGlzLmkxOG4uaW5zdGFudChcImFuYWx5emVyLnVwbG9hZERpYWxvZy51cGxvYWRpbmdcIikpO1xuICAgfVxufSJdfQ==
