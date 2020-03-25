"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var general_model_1 = require("./general.model");
var ColumnType = (function () {
    function ColumnType(type) {
        this.type = type;
    }
    return ColumnType;
}());
exports.ColumnType = ColumnType;
ColumnType.DATE = new ColumnType("DATE");
(function (FileStatus) {
    FileStatus[FileStatus["Uploaded"] = 0] = "Uploaded";
    FileStatus[FileStatus["Analyzing"] = 1] = "Analyzing";
    FileStatus[FileStatus["Valid"] = 2] = "Valid";
    FileStatus[FileStatus["Invalid"] = 3] = "Invalid";
})(exports.FileStatus || (exports.FileStatus = {}));
var FileStatus = exports.FileStatus;
/**
 * Pagination data source for file versions
 */
var VersionDataSource = (function (_super) {
    __extends(VersionDataSource, _super);
    function VersionDataSource() {
        return _super.apply(this, arguments) || this;
    }
    VersionDataSource.create = function (service, notify, fileItem) {
        var ds = new VersionDataSource();
        ds.service = service;
        ds.notify = notify;
        ds.fileItem = fileItem;
        return ds;
    };
    VersionDataSource.prototype.getRows = function (params) {
        var _this = this;
        this.service.getFileVersions(this.getPage(params), this.fileItem).finally(function () {
            _this.onComplete.emit();
        }).subscribe(function (fileSet) {
            var list = fileSet.result.sort(function (a, b) {
                if (a.version > b.version) {
                    return -1;
                }
                else if (a.version < b.version) {
                    return 1;
                }
                else {
                    return 0;
                }
            });
            params.successCallback(list, fileSet.total);
        }, function (error) {
            _this.notify.alert(error.exceptionName, error.description);
            params.failCallback();
        });
    };
    return VersionDataSource;
}(general_model_1.GeneralDataSource));
exports.VersionDataSource = VersionDataSource;
/**
 * Pagination data source for file list
 */
var FileDataSource = (function (_super) {
    __extends(FileDataSource, _super);
    function FileDataSource() {
        return _super.apply(this, arguments) || this;
    }
    FileDataSource.create = function (service, notify, userId, category, startTime, endTime) {
        var ds = new FileDataSource();
        ds.service = service;
        ds.notify = notify;
        ds.userId = userId;
        ds.category = category;
        ds.startTime = startTime;
        ds.endTime = endTime;
        return ds;
    };
    FileDataSource.prototype.getRows = function (params) {
        var _this = this;
        console.log(111111);
        this.service.getFiles(this.getPage(params), this.userId, this.category, this.startTime, this.endTime).finally(function () {
            _this.onComplete.emit();
        }).subscribe(function (fileSet) {
            params.successCallback(fileSet.result, fileSet.total);
        }, function (error) {
            _this.notify.alert(error.exceptionName, error.description);
            params.failCallback();
        });
    };
    return FileDataSource;
}(general_model_1.GeneralDataSource));
exports.FileDataSource = FileDataSource;
var TemplateDataSource = (function (_super) {
    __extends(TemplateDataSource, _super);
    function TemplateDataSource() {
        return _super.apply(this, arguments) || this;
    }
    TemplateDataSource.create = function (service, notify) {
        var ds = new TemplateDataSource();
        ds.service = service;
        ds.notify = notify;
        return ds;
    };
    TemplateDataSource.prototype.getRows = function (params) {
        var _this = this;
        this.service.getTemplates(this.getPage(params)).subscribe(function (templateSet) {
            params.successCallback(templateSet.result, templateSet.total);
            _this.onComplete.emit(templateSet.result);
        }, function (error) {
            _this.notify.alert(error.exceptionName, error.description);
            params.failCallback();
        });
    };
    return TemplateDataSource;
}(general_model_1.GeneralDataSource));
exports.TemplateDataSource = TemplateDataSource;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZGVscy9maWxlLm1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBLGlEQUFrRDtBQXVDbEQ7SUFDRyxvQkFBb0IsSUFBSTtRQUFKLFNBQUksR0FBSixJQUFJLENBQUE7SUFBRyxDQUFDO0lBRy9CLGlCQUFDO0FBQUQsQ0FKQSxBQUlDO0FBSkQsZ0NBSUM7QUFEUyxlQUFJLEdBQWUsSUFBSSxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7QUFTcEQsV0FBWSxVQUFVO0lBQ25CLG1EQUFRLENBQUE7SUFBRSxxREFBUyxDQUFBO0lBQUUsNkNBQUssQ0FBQTtJQUFFLGlEQUFPLENBQUE7QUFDdEMsQ0FBQyxFQUZXLGtCQUFVLEtBQVYsa0JBQVUsUUFFckI7QUFGRCxvQ0FFQztBQWdDRDs7R0FFRztBQUNIO0lBQXVDLHFDQUFpQjtJQUF4RDs7SUFtQ0EsQ0FBQztJQTlCUyx3QkFBTSxHQUFiLFVBQWMsT0FBb0IsRUFBRSxNQUE0QixFQUNsRCxRQUFrQjtRQUM3QixJQUFJLEVBQUUsR0FBRyxJQUFJLGlCQUFpQixFQUFFLENBQUM7UUFDakMsRUFBRSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDckIsRUFBRSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDbkIsRUFBRSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDdkIsTUFBTSxDQUFDLEVBQUUsQ0FBQztJQUNiLENBQUM7SUFFRCxtQ0FBTyxHQUFQLFVBQVEsTUFBdUI7UUFBL0IsaUJBb0JDO1FBbkJFLElBQUksQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQztZQUN2RSxLQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQzFCLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFBLE9BQU87WUFDakIsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBQyxDQUFXLEVBQUUsQ0FBVztnQkFDckQsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztvQkFDekIsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNiLENBQUM7Z0JBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7b0JBQ2hDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQ1osQ0FBQztnQkFBQyxJQUFJLENBQUMsQ0FBQztvQkFDTCxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUNaLENBQUM7WUFDSixDQUFDLENBQUMsQ0FBQztZQUVILE1BQU0sQ0FBQyxlQUFlLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMvQyxDQUFDLEVBQUUsVUFBQSxLQUFLO1lBQ0wsS0FBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLGFBQWEsRUFBRSxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDMUQsTUFBTSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3pCLENBQUMsQ0FBQyxDQUFDO0lBRU4sQ0FBQztJQUNKLHdCQUFDO0FBQUQsQ0FuQ0EsQUFtQ0MsQ0FuQ3NDLGlDQUFpQixHQW1DdkQ7QUFuQ0QsOENBbUNDO0FBRUQ7O0dBRUc7QUFDSDtJQUFvQyxrQ0FBaUI7SUFBckQ7O0lBaUNBLENBQUM7SUF4QlMscUJBQU0sR0FBYixVQUFjLE9BQW9CLEVBQUUsTUFBNEIsRUFDbEQsTUFBZSxFQUFDLFFBQWUsRUFBRSxTQUFnQixFQUFDLE9BQWM7UUFDM0UsSUFBSSxFQUFFLEdBQUcsSUFBSSxjQUFjLEVBQUUsQ0FBQztRQUM5QixFQUFFLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUNyQixFQUFFLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNuQixFQUFFLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNuQixFQUFFLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUN2QixFQUFFLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztRQUN6QixFQUFFLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUNyQixNQUFNLENBQUMsRUFBRSxDQUFDO0lBQ2IsQ0FBQztJQUVELGdDQUFPLEdBQVAsVUFBUSxNQUF1QjtRQUEvQixpQkFXQztRQVZFLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUE7UUFDbkIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFDLElBQUksQ0FBQyxRQUFRLEVBQUMsSUFBSSxDQUFDLFNBQVMsRUFBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDO1lBQ3hHLEtBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDMUIsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQUEsT0FBTztZQUNqQixNQUFNLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3pELENBQUMsRUFBRSxVQUFBLEtBQUs7WUFDTCxLQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsYUFBYSxFQUFFLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUMxRCxNQUFNLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDekIsQ0FBQyxDQUFDLENBQUM7SUFFTixDQUFDO0lBQ0oscUJBQUM7QUFBRCxDQWpDQSxBQWlDQyxDQWpDbUMsaUNBQWlCLEdBaUNwRDtBQWpDRCx3Q0FpQ0M7QUFFRDtJQUF3QyxzQ0FBaUI7SUFBekQ7O0lBcUJBLENBQUM7SUFqQlMseUJBQU0sR0FBYixVQUFjLE9BQW9CLEVBQUUsTUFBNEI7UUFDN0QsSUFBSSxFQUFFLEdBQUcsSUFBSSxrQkFBa0IsRUFBRSxDQUFDO1FBQ2xDLEVBQUUsQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3JCLEVBQUUsQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ25CLE1BQU0sQ0FBQyxFQUFFLENBQUM7SUFDYixDQUFDO0lBRUQsb0NBQU8sR0FBUCxVQUFRLE1BQXNCO1FBQTlCLGlCQVNDO1FBUkUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFBLFdBQVc7WUFDbEUsTUFBTSxDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUM5RCxLQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDNUMsQ0FBQyxFQUFFLFVBQUEsS0FBSztZQUNMLEtBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxhQUFhLEVBQUUsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQzFELE1BQU0sQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN6QixDQUFDLENBQUMsQ0FBQztJQUVOLENBQUM7SUFDSix5QkFBQztBQUFELENBckJBLEFBcUJDLENBckJ1QyxpQ0FBaUIsR0FxQnhEO0FBckJELGdEQXFCQyIsImZpbGUiOiJtb2RlbHMvZmlsZS5tb2RlbC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29sRGVmLCBJR2V0Um93c1BhcmFtc30gZnJvbSBcImFnLWdyaWRcIjtcbmltcG9ydCB7R2VuZXJhbERhdGFTb3VyY2V9IGZyb20gXCIuL2dlbmVyYWwubW9kZWxcIjtcbmltcG9ydCB7RmlsZVNlcnZpY2V9IGZyb20gXCIuLi9zZXJ2aWNlcy9maWxlLnNlcnZpY2VcIjtcbmltcG9ydCB7Tm90aWZpY2F0aW9uc1NlcnZpY2V9IGZyb20gXCJhbmd1bGFyMi1ub3RpZmljYXRpb25zXCI7XG4vKipcbiAqIENyZWF0ZWQgYnkgemhvbmdwaW5nLmx1IG9uIDkvMjcvMjAxNi5cbiAqL1xuXG5leHBvcnQgaW50ZXJmYWNlIEZpbGVJdGVtIHtcbiAgIGlkPzogbnVtYmVyO1xuICAgYXR0YWNoR3JvdXA/OiBzdHJpbmc7XG4gICBhdHRhY2huYW1lPzogc3RyaW5nO1xuICAgc2l6ZT86IHN0cmluZztcbiAgIHN1ZmZpeD86IHN0cmluZztcbiAgIHZlcnNpb24/OiBudW1iZXI7XG4gICBjcnRpbWU/OiBudW1iZXI7XG4gICBsYXN0VGltZT86IG51bWJlcjtcbiAgIC8vYXR0YWNoY2F0ZWdvcnk/OiBzdHJpbmc7XG4gICBjYXRlZ29yeUNvZGU/OiBzdHJpbmc7XG4gICBhdHRhY2hwYXRoPzogc3RyaW5nO1xuICAgc3RhdHVzPzogRmlsZVN0YXR1cztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBQcmV2aWV3RGF0YSB7XG4gICBoZWFkZXI6IHtba2V5OiBzdHJpbmddOiBzdHJpbmd9W107XG4gICByZXN1bHQ6IHtba2V5OiBzdHJpbmddOiBzdHJpbmd8bnVtYmVyfVtdO1xuICAgdG90YWw6IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBDYXRlZ29yeSB7XG4gICBsYWJlbDogc3RyaW5nO1xuICAgdmFsdWU6IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBQcmV2aWV3R3JpZERhdGEge1xuICAgc2hlZXROYW1lOiBzdHJpbmc7XG4gICBjb2x1bW5EZWY6IENvbERlZltdO1xuICAgcm93RGF0YTogYW55W107XG59XG5cbmV4cG9ydCBjbGFzcyBDb2x1bW5UeXBlIHtcbiAgIGNvbnN0cnVjdG9yKHByaXZhdGUgdHlwZSkge31cblxuICAgc3RhdGljIERBVEU6IENvbHVtblR5cGUgPSBuZXcgQ29sdW1uVHlwZShcIkRBVEVcIik7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUHJldmlld0hlYWRlciB7XG4gICBuYW1lOiBzdHJpbmc7XG4gICB0aXRsZTogc3RyaW5nO1xuICAgdHlwZTogc3RyaW5nO1xufVxuXG5leHBvcnQgZW51bSBGaWxlU3RhdHVzIHtcbiAgIFVwbG9hZGVkLCBBbmFseXppbmcsIFZhbGlkLCBJbnZhbGlkXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRmlsZVN0YXR1c0Rlc2NyaWJlciB7XG4gICBzdGF0dXM6IEZpbGVTdGF0dXM7XG4gICBkZXNjcmlwdGlvbjogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFRlbXBsYXRlIHtcbiAgIGlkPzogbnVtYmVyO1xuICAgY2F0ZWdvcnk/OiBzdHJpbmc7XG4gICBjcnRpbWU/OiBudW1iZXI7XG4gICBjcmFjdG9yPzogc3RyaW5nO1xuICAgc3RhdHVzPzogc3RyaW5nO1xuICAgdGVtcGxldGVjb250ZW50Pzogc3RyaW5nO1xuICAgdGVtcGxldGVuYW1lPzogc3RyaW5nO1xufVxuXG5cbi8qKlxuICogUXVlcnkgc3BlYyB3aGljaCBpcyB1c2VkIGZvciBsb29waW5nIHF1ZXJ5IGZpbGUgc3RhdHVzXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgU3RhdHVzTG9vcFF1ZXJ5U3BlYyB7XG4gICBkdXJhdGlvbjogbnVtYmVyO1xuICAgY291bnQ/OiBudW1iZXI7XG4gICBvcmlnaW5hbDogRmlsZUl0ZW07XG4gICAvKipcbiAgICAqIFRoZSB0YXJnZXQgc3RhdHVzLCBpZiBub3Qgc2V0LCBsb29wIHdpbGwgZW5kIG9uY2Ugc3RhdHVzIGlzIGRpZmZlcmVudCB3aXRoIG9yaWdpbmFsIG9uZVxuICAgICovXG4gICB0YXJnZXQ/OiBGaWxlU3RhdHVzO1xuICAgZXhpdE9uRXJyb3I/OiBib29sZWFuO1xufVxuXG4vKipcbiAqIFBhZ2luYXRpb24gZGF0YSBzb3VyY2UgZm9yIGZpbGUgdmVyc2lvbnNcbiAqL1xuZXhwb3J0IGNsYXNzIFZlcnNpb25EYXRhU291cmNlIGV4dGVuZHMgR2VuZXJhbERhdGFTb3VyY2Uge1xuICAgcHJpdmF0ZSBmaWxlSXRlbTogRmlsZUl0ZW07XG4gICBwcml2YXRlIHNlcnZpY2U6IEZpbGVTZXJ2aWNlO1xuICAgcHJpdmF0ZSBub3RpZnk6IE5vdGlmaWNhdGlvbnNTZXJ2aWNlO1xuXG4gICBzdGF0aWMgY3JlYXRlKHNlcnZpY2U6IEZpbGVTZXJ2aWNlLCBub3RpZnk6IE5vdGlmaWNhdGlvbnNTZXJ2aWNlLFxuICAgICAgICAgICAgICAgICBmaWxlSXRlbTogRmlsZUl0ZW0pIHtcbiAgICAgIGxldCBkcyA9IG5ldyBWZXJzaW9uRGF0YVNvdXJjZSgpO1xuICAgICAgZHMuc2VydmljZSA9IHNlcnZpY2U7XG4gICAgICBkcy5ub3RpZnkgPSBub3RpZnk7XG4gICAgICBkcy5maWxlSXRlbSA9IGZpbGVJdGVtO1xuICAgICAgcmV0dXJuIGRzO1xuICAgfVxuXG4gICBnZXRSb3dzKHBhcmFtczogIElHZXRSb3dzUGFyYW1zKTogdm9pZCB7XG4gICAgICB0aGlzLnNlcnZpY2UuZ2V0RmlsZVZlcnNpb25zKHRoaXMuZ2V0UGFnZShwYXJhbXMpLCB0aGlzLmZpbGVJdGVtKS5maW5hbGx5KCgpID0+IHtcbiAgICAgICAgIHRoaXMub25Db21wbGV0ZS5lbWl0KCk7XG4gICAgICB9KS5zdWJzY3JpYmUoZmlsZVNldCA9PiB7XG4gICAgICAgICBsZXQgbGlzdCA9IGZpbGVTZXQucmVzdWx0LnNvcnQoKGE6IEZpbGVJdGVtLCBiOiBGaWxlSXRlbSkgPT4ge1xuICAgICAgICAgICAgaWYgKGEudmVyc2lvbiA+IGIudmVyc2lvbikge1xuICAgICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChhLnZlcnNpb24gPCBiLnZlcnNpb24pIHtcbiAgICAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgfSk7XG5cbiAgICAgICAgIHBhcmFtcy5zdWNjZXNzQ2FsbGJhY2sobGlzdCwgZmlsZVNldC50b3RhbCk7XG4gICAgICB9LCBlcnJvciA9PiB7XG4gICAgICAgICB0aGlzLm5vdGlmeS5hbGVydChlcnJvci5leGNlcHRpb25OYW1lLCBlcnJvci5kZXNjcmlwdGlvbik7XG4gICAgICAgICBwYXJhbXMuZmFpbENhbGxiYWNrKCk7XG4gICAgICB9KTtcblxuICAgfVxufVxuXG4vKipcbiAqIFBhZ2luYXRpb24gZGF0YSBzb3VyY2UgZm9yIGZpbGUgbGlzdFxuICovXG5leHBvcnQgY2xhc3MgRmlsZURhdGFTb3VyY2UgZXh0ZW5kcyBHZW5lcmFsRGF0YVNvdXJjZSB7XG4gICBwcml2YXRlIHVzZXJJZDogbnVtYmVyO1xuICAgcHJpdmF0ZSBjYXRlZ29yeTogc3RyaW5nO1xuICAgcHJpdmF0ZSBzdGFydFRpbWU6IHN0cmluZztcbiAgIHByaXZhdGUgZW5kVGltZTogc3RyaW5nO1xuICAgcHJpdmF0ZSBzZXJ2aWNlOiBGaWxlU2VydmljZTtcbiAgIHByaXZhdGUgbm90aWZ5OiBOb3RpZmljYXRpb25zU2VydmljZTtcblxuXG4gICBzdGF0aWMgY3JlYXRlKHNlcnZpY2U6IEZpbGVTZXJ2aWNlLCBub3RpZnk6IE5vdGlmaWNhdGlvbnNTZXJ2aWNlLFxuICAgICAgICAgICAgICAgICB1c2VySWQ/OiBudW1iZXIsY2F0ZWdvcnk6c3RyaW5nLCBzdGFydFRpbWU6c3RyaW5nLGVuZFRpbWU6c3RyaW5nKSB7XG4gICAgICBsZXQgZHMgPSBuZXcgRmlsZURhdGFTb3VyY2UoKTtcbiAgICAgIGRzLnNlcnZpY2UgPSBzZXJ2aWNlO1xuICAgICAgZHMubm90aWZ5ID0gbm90aWZ5O1xuICAgICAgZHMudXNlcklkID0gdXNlcklkO1xuICAgICAgZHMuY2F0ZWdvcnkgPSBjYXRlZ29yeTtcbiAgICAgIGRzLnN0YXJ0VGltZSA9IHN0YXJ0VGltZTtcbiAgICAgIGRzLmVuZFRpbWUgPSBlbmRUaW1lO1xuICAgICAgcmV0dXJuIGRzO1xuICAgfVxuXG4gICBnZXRSb3dzKHBhcmFtczogIElHZXRSb3dzUGFyYW1zKTogdm9pZCB7XG4gICAgICBjb25zb2xlLmxvZygxMTExMTEpXG4gICAgICB0aGlzLnNlcnZpY2UuZ2V0RmlsZXModGhpcy5nZXRQYWdlKHBhcmFtcyksIHRoaXMudXNlcklkLHRoaXMuY2F0ZWdvcnksdGhpcy5zdGFydFRpbWUsdGhpcy5lbmRUaW1lKS5maW5hbGx5KCgpID0+IHtcbiAgICAgICAgIHRoaXMub25Db21wbGV0ZS5lbWl0KCk7XG4gICAgICB9KS5zdWJzY3JpYmUoZmlsZVNldCA9PiB7XG4gICAgICAgICBwYXJhbXMuc3VjY2Vzc0NhbGxiYWNrKGZpbGVTZXQucmVzdWx0LCBmaWxlU2V0LnRvdGFsKTtcbiAgICAgIH0sIGVycm9yID0+IHtcbiAgICAgICAgIHRoaXMubm90aWZ5LmFsZXJ0KGVycm9yLmV4Y2VwdGlvbk5hbWUsIGVycm9yLmRlc2NyaXB0aW9uKTtcbiAgICAgICAgIHBhcmFtcy5mYWlsQ2FsbGJhY2soKTtcbiAgICAgIH0pO1xuXG4gICB9XG59XG5cbmV4cG9ydCBjbGFzcyBUZW1wbGF0ZURhdGFTb3VyY2UgZXh0ZW5kcyBHZW5lcmFsRGF0YVNvdXJjZSB7XG4gICBwcml2YXRlIHNlcnZpY2U6IEZpbGVTZXJ2aWNlO1xuICAgcHJpdmF0ZSBub3RpZnk6IE5vdGlmaWNhdGlvbnNTZXJ2aWNlO1xuXG4gICBzdGF0aWMgY3JlYXRlKHNlcnZpY2U6IEZpbGVTZXJ2aWNlLCBub3RpZnk6IE5vdGlmaWNhdGlvbnNTZXJ2aWNlKSB7XG4gICAgICBsZXQgZHMgPSBuZXcgVGVtcGxhdGVEYXRhU291cmNlKCk7XG4gICAgICBkcy5zZXJ2aWNlID0gc2VydmljZTtcbiAgICAgIGRzLm5vdGlmeSA9IG5vdGlmeTtcbiAgICAgIHJldHVybiBkcztcbiAgIH1cblxuICAgZ2V0Um93cyhwYXJhbXM6IElHZXRSb3dzUGFyYW1zKTogdm9pZCB7XG4gICAgICB0aGlzLnNlcnZpY2UuZ2V0VGVtcGxhdGVzKHRoaXMuZ2V0UGFnZShwYXJhbXMpKS5zdWJzY3JpYmUodGVtcGxhdGVTZXQgPT4ge1xuICAgICAgICAgcGFyYW1zLnN1Y2Nlc3NDYWxsYmFjayh0ZW1wbGF0ZVNldC5yZXN1bHQsIHRlbXBsYXRlU2V0LnRvdGFsKTtcbiAgICAgICAgIHRoaXMub25Db21wbGV0ZS5lbWl0KHRlbXBsYXRlU2V0LnJlc3VsdCk7XG4gICAgICB9LCBlcnJvciA9PiB7XG4gICAgICAgICB0aGlzLm5vdGlmeS5hbGVydChlcnJvci5leGNlcHRpb25OYW1lLCBlcnJvci5kZXNjcmlwdGlvbik7XG4gICAgICAgICBwYXJhbXMuZmFpbENhbGxiYWNrKCk7XG4gICAgICB9KTtcblxuICAgfVxufSJdfQ==
