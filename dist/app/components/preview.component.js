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
 * Created by zhongping.lu on 10/9/2016.
 */
var core_1 = require("@angular/core");
var file_service_1 = require("../services/file.service");
var components_1 = require("angular2-notifications/components");
var ng2_translate_1 = require("ng2-translate/ng2-translate");
var PreviewComponent = (function () {
    function PreviewComponent(i18n, fileSvc, notificationSvc) {
        this.i18n = i18n;
        this.fileSvc = fileSvc;
        this.notificationSvc = notificationSvc;
        this.previewSheetSet = new Array();
        this.gridOptions = {
            overlayNoRowsTemplate: "<h4 class=\"text-muted\">" + this.i18n.instant("noData") + "</h4>",
            minColWidth: 40
        };
    }
    Object.defineProperty(PreviewComponent.prototype, "file", {
        set: function (file) {
            var _this = this;
            if (file) {
                this.loadingData = true;
                this.previewSheetSet = [];
                this.fileSvc.getLocalFilePreview(file)
                    .then(function (previewDataSet) {
                    _this.previewSheetSet = previewDataSet;
                    return Promise.resolve(previewDataSet.length > 0);
                })
                    .catch(function (error) {
                    _this.notificationSvc.error(error.name, error.message);
                    return Promise.resolve(false);
                })
                    .then(function (result) {
                    _this.loadingData = false;
                    _this.noData = !result;
                });
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PreviewComponent.prototype, "fileData", {
        set: function (file) {
            var _this = this;
            if (file) {
                this.loadingData = true;
                this.previewSheetSet = [];
                this.fileSvc.getFilePreview(file).finally(function () {
                    _this.loadingData = false;
                }).subscribe(function (previewDataSet) {
                    _this.previewSheetSet = previewDataSet;
                    _this.noData = previewDataSet.length === 0;
                }, function (error) {
                    _this.notificationSvc.error(error.exceptionName, error.description);
                    _this.noData = true;
                });
            }
        },
        enumerable: true,
        configurable: true
    });
    PreviewComponent.prototype.fixColumnWidth = function (size, grid) {
        if (size.clientWidth > 0 && grid && grid.api) {
            grid.api.sizeColumnsToFit();
        }
    };
    return PreviewComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", File),
    __metadata("design:paramtypes", [File])
], PreviewComponent.prototype, "file", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], PreviewComponent.prototype, "fileData", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], PreviewComponent.prototype, "styles", void 0);
PreviewComponent = __decorate([
    core_1.Component({
        selector: "excel-preview",
        templateUrl: "views/analyzer/excel.preview.html"
    }),
    __metadata("design:paramtypes", [ng2_translate_1.TranslateService, file_service_1.FileService, components_1.NotificationsService])
], PreviewComponent);
exports.PreviewComponent = PreviewComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvcHJldmlldy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOztHQUVHO0FBQ0gsc0NBQW1GO0FBRW5GLHlEQUFxRDtBQUNyRCxnRUFBdUU7QUFFdkUsNkRBQTZEO0FBTzdEO0lBa0RHLDBCQUFvQixJQUFzQixFQUFVLE9BQW9CLEVBQVUsZUFBcUM7UUFBbkcsU0FBSSxHQUFKLElBQUksQ0FBa0I7UUFBVSxZQUFPLEdBQVAsT0FBTyxDQUFhO1FBQVUsb0JBQWUsR0FBZixlQUFlLENBQXNCO1FBUHZILG9CQUFlLEdBQUcsSUFBSSxLQUFLLEVBQW9CLENBQUM7UUFFaEQsZ0JBQVcsR0FBZ0I7WUFDeEIscUJBQXFCLEVBQUUsOEJBQTBCLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxVQUFPO1lBQ25GLFdBQVcsRUFBRSxFQUFFO1NBQ2pCLENBQUM7SUFFd0gsQ0FBQztJQWpEbEgsc0JBQUksa0NBQUk7YUFBUixVQUFTLElBQVU7WUFBNUIsaUJBbUJDO1lBbEJFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ1IsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7Z0JBQ3hCLElBQUksQ0FBQyxlQUFlLEdBQUcsRUFBRSxDQUFDO2dCQUMxQixJQUFJLENBQUMsT0FBTyxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQztxQkFDbEMsSUFBSSxDQUFDLFVBQUMsY0FBaUM7b0JBQ3JDLEtBQUksQ0FBQyxlQUFlLEdBQUcsY0FBYyxDQUFDO29CQUN0QyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNyRCxDQUFDLENBQUM7cUJBQ0QsS0FBSyxDQUFDLFVBQUEsS0FBSztvQkFDVCxLQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDdEQsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ2pDLENBQUMsQ0FBQztxQkFDRCxJQUFJLENBQUMsVUFBQSxNQUFNO29CQUNULEtBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO29CQUN6QixLQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsTUFBTSxDQUFDO2dCQUV6QixDQUFDLENBQUMsQ0FBQztZQUNULENBQUM7UUFDSixDQUFDOzs7T0FBQTtJQUVRLHNCQUFJLHNDQUFRO2FBQVosVUFBYSxJQUFjO1lBQXBDLGlCQWNDO1lBYkUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDUixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztnQkFDeEIsSUFBSSxDQUFDLGVBQWUsR0FBRyxFQUFFLENBQUM7Z0JBQzFCLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQztvQkFDdkMsS0FBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7Z0JBQzVCLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFBLGNBQWM7b0JBQ3hCLEtBQUksQ0FBQyxlQUFlLEdBQUcsY0FBYyxDQUFDO29CQUN0QyxLQUFJLENBQUMsTUFBTSxHQUFHLGNBQWMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDO2dCQUM3QyxDQUFDLEVBQUUsVUFBQyxLQUF1QjtvQkFDeEIsS0FBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLGFBQWEsRUFBRSxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7b0JBQ25FLEtBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO2dCQUN0QixDQUFDLENBQUMsQ0FBQztZQUNOLENBQUM7UUFDSixDQUFDOzs7T0FBQTtJQWdCRCx5Q0FBYyxHQUFkLFVBQWUsSUFBUyxFQUFFLElBQWtCO1FBQ3pDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUM1QyxJQUFJLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDL0IsQ0FBQztJQUNKLENBQUM7SUFDSix1QkFBQztBQUFELENBekRBLEFBeURDLElBQUE7QUF4RFc7SUFBUixZQUFLLEVBQUU7OEJBQWdCLElBQUk7cUNBQUosSUFBSTs0Q0FtQjNCO0FBRVE7SUFBUixZQUFLLEVBQUU7OztnREFjUDtBQUVRO0lBQVIsWUFBSyxFQUFFOzhCQUFTLE1BQU07Z0RBQUM7QUF0QzNCO0lBSkMsZ0JBQVMsQ0FBQztRQUNSLFFBQVEsRUFBRSxlQUFlO1FBQ3pCLFdBQVcsRUFBRSxtQ0FBbUM7S0FDbEQsQ0FBQztxQ0FtRDJCLGdDQUFnQixFQUFtQiwwQkFBVyxFQUEyQixpQ0FBb0I7b0JBT3pIO0FBekRZLDJCQUFBLGdCQUFnQixDQUFBIiwiZmlsZSI6ImNvbXBvbmVudHMvcHJldmlldy5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENyZWF0ZWQgYnkgemhvbmdwaW5nLmx1IG9uIDEwLzkvMjAxNi5cbiAqL1xuaW1wb3J0IHtDb21wb25lbnQsIElucHV0LCBWaWV3Q2hpbGQsIFF1ZXJ5TGlzdCwgVmlld0NoaWxkcmVufSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtQcmV2aWV3R3JpZERhdGEsIEZpbGVJdGVtfSBmcm9tIFwiLi4vbW9kZWxzL2ZpbGUubW9kZWxcIjtcbmltcG9ydCB7RmlsZVNlcnZpY2V9IGZyb20gXCIuLi9zZXJ2aWNlcy9maWxlLnNlcnZpY2VcIjtcbmltcG9ydCB7Tm90aWZpY2F0aW9uc1NlcnZpY2V9IGZyb20gXCJhbmd1bGFyMi1ub3RpZmljYXRpb25zL2NvbXBvbmVudHNcIjtcbmltcG9ydCB7R3JpZE9wdGlvbnN9IGZyb20gXCJhZy1ncmlkXCI7XG5pbXBvcnQge1RyYW5zbGF0ZVNlcnZpY2V9IGZyb20gXCJuZzItdHJhbnNsYXRlL25nMi10cmFuc2xhdGVcIjtcbmltcG9ydCB7R2VuZXJhbEV4Y2VwdGlvbn0gZnJvbSBcIi4uL21vZGVscy9leGNlcHRpb24ubW9kZWxcIjtcblxuQENvbXBvbmVudCh7XG4gICBzZWxlY3RvcjogXCJleGNlbC1wcmV2aWV3XCIsXG4gICB0ZW1wbGF0ZVVybDogXCJ2aWV3cy9hbmFseXplci9leGNlbC5wcmV2aWV3Lmh0bWxcIlxufSlcbmV4cG9ydCBjbGFzcyBQcmV2aWV3Q29tcG9uZW50IHtcbiAgIEBJbnB1dCgpIHNldCBmaWxlKGZpbGU6IEZpbGUpIHtcbiAgICAgIGlmIChmaWxlKSB7XG4gICAgICAgICB0aGlzLmxvYWRpbmdEYXRhID0gdHJ1ZTtcbiAgICAgICAgIHRoaXMucHJldmlld1NoZWV0U2V0ID0gW107XG4gICAgICAgICB0aGlzLmZpbGVTdmMuZ2V0TG9jYWxGaWxlUHJldmlldyhmaWxlKVxuICAgICAgICAgICAgLnRoZW4oKHByZXZpZXdEYXRhU2V0OiBQcmV2aWV3R3JpZERhdGFbXSkgPT4ge1xuICAgICAgICAgICAgICAgdGhpcy5wcmV2aWV3U2hlZXRTZXQgPSBwcmV2aWV3RGF0YVNldDtcbiAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocHJldmlld0RhdGFTZXQubGVuZ3RoID4gMCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uU3ZjLmVycm9yKGVycm9yLm5hbWUsIGVycm9yLm1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShmYWxzZSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICAgICAgIHRoaXMubG9hZGluZ0RhdGEgPSBmYWxzZTtcbiAgICAgICAgICAgICAgIHRoaXMubm9EYXRhID0gIXJlc3VsdDtcblxuICAgICAgICAgICAgfSk7XG4gICAgICB9XG4gICB9XG5cbiAgIEBJbnB1dCgpIHNldCBmaWxlRGF0YShmaWxlOiBGaWxlSXRlbSkge1xuICAgICAgaWYgKGZpbGUpIHtcbiAgICAgICAgIHRoaXMubG9hZGluZ0RhdGEgPSB0cnVlO1xuICAgICAgICAgdGhpcy5wcmV2aWV3U2hlZXRTZXQgPSBbXTtcbiAgICAgICAgIHRoaXMuZmlsZVN2Yy5nZXRGaWxlUHJldmlldyhmaWxlKS5maW5hbGx5KCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMubG9hZGluZ0RhdGEgPSBmYWxzZTtcbiAgICAgICAgIH0pLnN1YnNjcmliZShwcmV2aWV3RGF0YVNldCA9PiB7XG4gICAgICAgICAgICB0aGlzLnByZXZpZXdTaGVldFNldCA9IHByZXZpZXdEYXRhU2V0O1xuICAgICAgICAgICAgdGhpcy5ub0RhdGEgPSBwcmV2aWV3RGF0YVNldC5sZW5ndGggPT09IDA7XG4gICAgICAgICB9LCAoZXJyb3I6IEdlbmVyYWxFeGNlcHRpb24pID0+IHtcbiAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uU3ZjLmVycm9yKGVycm9yLmV4Y2VwdGlvbk5hbWUsIGVycm9yLmRlc2NyaXB0aW9uKTtcbiAgICAgICAgICAgIHRoaXMubm9EYXRhID0gdHJ1ZTtcbiAgICAgICAgIH0pO1xuICAgICAgfVxuICAgfVxuXG4gICBASW5wdXQoKSBzdHlsZXM6IE9iamVjdDtcblxuICAgbG9hZGluZ0RhdGE6IGJvb2xlYW47XG4gICBub0RhdGE6IGJvb2xlYW47XG5cbiAgIHByZXZpZXdTaGVldFNldCA9IG5ldyBBcnJheTxQcmV2aWV3R3JpZERhdGE+ICgpO1xuXG4gICBncmlkT3B0aW9uczogR3JpZE9wdGlvbnMgPSB7XG4gICAgICBvdmVybGF5Tm9Sb3dzVGVtcGxhdGU6IGA8aDQgY2xhc3M9XCJ0ZXh0LW11dGVkXCI+JHt0aGlzLmkxOG4uaW5zdGFudChcIm5vRGF0YVwiKX08L2g0PmAsXG4gICAgICBtaW5Db2xXaWR0aDogNDBcbiAgIH07XG5cbiAgIGNvbnN0cnVjdG9yKHByaXZhdGUgaTE4bjogVHJhbnNsYXRlU2VydmljZSwgcHJpdmF0ZSBmaWxlU3ZjOiBGaWxlU2VydmljZSwgcHJpdmF0ZSBub3RpZmljYXRpb25TdmM6IE5vdGlmaWNhdGlvbnNTZXJ2aWNlKSB7fVxuXG4gICBmaXhDb2x1bW5XaWR0aChzaXplOiBhbnksIGdyaWQ/OiBHcmlkT3B0aW9ucyk6IHZvaWQge1xuICAgICAgaWYgKHNpemUuY2xpZW50V2lkdGggPiAwICYmIGdyaWQgJiYgZ3JpZC5hcGkpIHtcbiAgICAgICAgIGdyaWQuYXBpLnNpemVDb2x1bW5zVG9GaXQoKTtcbiAgICAgIH1cbiAgIH1cbn0iXX0=
