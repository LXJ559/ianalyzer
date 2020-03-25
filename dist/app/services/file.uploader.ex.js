/**
 * Created by zhongping.lu on 11/12/2016.
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ng2_file_upload_1 = require("ng2-file-upload");
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var UploadState = (function () {
    function UploadState() {
    }
    UploadState.createProgress = function (progress) {
        console.log(1);
        var instance = new UploadState();
        instance.state = UploadState.Progress;
        instance.progress = progress;
        return instance;
    };
    UploadState.createComplete = function (resp, status, headers) {
        console.log(1);
        var instance = new UploadState();
        instance.state = UploadState.Complete;
        instance.body = resp;
        instance.code = status;
        instance.headers = headers;
        return instance;
    };
    UploadState.createError = function (resp, status, headers) {
        console.log(1);
        var instance = new UploadState();
        instance.state = UploadState.Error;
        instance.body = resp;
        instance.code = status;
        instance.headers = headers;
        return instance;
    };
    return UploadState;
}());
exports.UploadState = UploadState;
UploadState.Progress = 0;
UploadState.Complete = 1;
UploadState.Error = 2;
var FileUploaderEx = (function (_super) {
    __extends(FileUploaderEx, _super);
    function FileUploaderEx(options) {
        var _this = _super.call(this, options) || this;
        _this.afterAddingFile = new core_1.EventEmitter();
        return _this;
    }
    FileUploaderEx.prototype.onAfterAddingFile = function (item) {
        this.afterAddingFile.emit(item);
        return _super.prototype.onAfterAddingFile.call(this, item);
    };
    FileUploaderEx.prototype.onBuildItemForm = function (item, form) {
        for (var key in item.formData) {
            form.append(key, item.formData[key]);
        }
    };
    FileUploaderEx.prototype.uploadItem = function (item) {
        var response = new rxjs_1.Subject();
        item.onProgress = function (progress) { return response.next(UploadState.createProgress(progress)); };
        item.onSuccess = function (resp, status, headers) {
            response.next(UploadState.createComplete(resp, status, headers));
            response.complete();
        };
        item.onError = function (resp, status, headers) { return response.error(UploadState.createError(resp, status, headers)); };
        item.onCancel = item.onError;
        _super.prototype.uploadItem.call(this, item);
        return response.asObservable();
    };
    return FileUploaderEx;
}(ng2_file_upload_1.FileUploader));
exports.FileUploaderEx = FileUploaderEx;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZpY2VzL2ZpbGUudXBsb2FkZXIuZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0dBRUc7Ozs7Ozs7QUFFSCxtREFBeUY7QUFDekYsc0NBQTJDO0FBQzNDLDZCQUF5QztBQUV6QztJQUFBO0lBc0NBLENBQUM7SUEzQlMsMEJBQWMsR0FBckIsVUFBc0IsUUFBZ0I7UUFDbkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUNkLElBQUksUUFBUSxHQUFHLElBQUksV0FBVyxFQUFFLENBQUM7UUFDakMsUUFBUSxDQUFDLEtBQUssR0FBRyxXQUFXLENBQUMsUUFBUSxDQUFDO1FBQ3RDLFFBQVEsQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQzdCLE1BQU0sQ0FBQyxRQUFRLENBQUM7SUFDbkIsQ0FBQztJQUVNLDBCQUFjLEdBQXJCLFVBQXNCLElBQVksRUFBRSxNQUFjLEVBQUUsT0FBOEI7UUFDL0UsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUNkLElBQUksUUFBUSxHQUFHLElBQUksV0FBVyxFQUFFLENBQUM7UUFDakMsUUFBUSxDQUFDLEtBQUssR0FBRyxXQUFXLENBQUMsUUFBUSxDQUFDO1FBQ3RDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLFFBQVEsQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDO1FBQ3ZCLFFBQVEsQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQzNCLE1BQU0sQ0FBQyxRQUFRLENBQUM7SUFDbkIsQ0FBQztJQUVNLHVCQUFXLEdBQWxCLFVBQW1CLElBQVksRUFBRSxNQUFjLEVBQUUsT0FBOEI7UUFDNUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUNkLElBQUksUUFBUSxHQUFHLElBQUksV0FBVyxFQUFFLENBQUM7UUFDakMsUUFBUSxDQUFDLEtBQUssR0FBRyxXQUFXLENBQUMsS0FBSyxDQUFDO1FBQ25DLFFBQVEsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLFFBQVEsQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDO1FBQ3ZCLFFBQVEsQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQzNCLE1BQU0sQ0FBQyxRQUFRLENBQUM7SUFDbkIsQ0FBQztJQUNKLGtCQUFDO0FBQUQsQ0F0Q0EsQUFzQ0M7QUF0Q0Qsa0NBc0NDO0FBckNTLG9CQUFRLEdBQUcsQ0FBQyxDQUFDO0FBQ2Isb0JBQVEsR0FBRyxDQUFDLENBQUM7QUFDYixpQkFBSyxHQUFHLENBQUMsQ0FBQztBQXFDcEI7SUFBb0Msa0NBQVk7SUFHN0Msd0JBQVksT0FBNEI7UUFBeEMsWUFDRyxrQkFBTSxPQUFPLENBQUMsU0FDaEI7UUFKRCxxQkFBZSxHQUFzQixJQUFJLG1CQUFZLEVBQVEsQ0FBQzs7SUFJOUQsQ0FBQztJQUVELDBDQUFpQixHQUFqQixVQUFrQixJQUFTO1FBQ3hCLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2hDLE1BQU0sQ0FBQyxpQkFBTSxpQkFBaUIsWUFBQyxJQUFJLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBRUQsd0NBQWUsR0FBZixVQUFnQixJQUFTLEVBQUUsSUFBYztRQUN0QyxHQUFHLENBQUMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUM3QixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDeEMsQ0FBQztJQUNKLENBQUM7SUFFRCxtQ0FBVSxHQUFWLFVBQVcsSUFBUztRQUNqQixJQUFJLFFBQVEsR0FBRyxJQUFJLGNBQU8sRUFBZ0IsQ0FBQztRQUMzQyxJQUFJLENBQUMsVUFBVSxHQUFHLFVBQUEsUUFBUSxJQUFJLE9BQUEsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQW5ELENBQW1ELENBQUM7UUFDbEYsSUFBSSxDQUFDLFNBQVMsR0FBRyxVQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTztZQUNwQyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ2pFLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUN2QixDQUFDLENBQUM7UUFDRixJQUFJLENBQUMsT0FBTyxHQUFHLFVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLElBQUssT0FBQSxRQUFRLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQyxFQUE5RCxDQUE4RCxDQUFDO1FBQ3pHLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUU3QixpQkFBTSxVQUFVLFlBQUMsSUFBSSxDQUFDLENBQUM7UUFFdkIsTUFBTSxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUNsQyxDQUFDO0lBQ0oscUJBQUM7QUFBRCxDQWhDQSxBQWdDQyxDQWhDbUMsOEJBQVksR0FnQy9DO0FBaENELHdDQWdDQyIsImZpbGUiOiJzZXJ2aWNlcy9maWxlLnVwbG9hZGVyLmV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDcmVhdGVkIGJ5IHpob25ncGluZy5sdSBvbiAxMS8xMi8yMDE2LlxuICovXG5cbmltcG9ydCB7RmlsZVVwbG9hZGVyLCBGaWxlVXBsb2FkZXJPcHRpb25zLCBQYXJzZWRSZXNwb25zZUhlYWRlcnN9IGZyb20gXCJuZzItZmlsZS11cGxvYWRcIjtcbmltcG9ydCB7RXZlbnRFbWl0dGVyfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtPYnNlcnZhYmxlLCBTdWJqZWN0fSBmcm9tIFwicnhqc1wiO1xuXG5leHBvcnQgY2xhc3MgVXBsb2FkU3RhdGUge1xuICAgc3RhdGljIFByb2dyZXNzID0gMDtcbiAgIHN0YXRpYyBDb21wbGV0ZSA9IDE7XG4gICBzdGF0aWMgRXJyb3IgPSAyO1xuXG4gICBzdGF0ZTogbnVtYmVyO1xuICAgYm9keTogc3RyaW5nO1xuICAgY29kZTogbnVtYmVyO1xuICAgcHJvZ3Jlc3M6IG51bWJlcjtcbiAgIGhlYWRlcnM6IFBhcnNlZFJlc3BvbnNlSGVhZGVycztcblxuICAgc3RhdGljIGNyZWF0ZVByb2dyZXNzKHByb2dyZXNzOiBudW1iZXIpOiBVcGxvYWRTdGF0ZSB7XG4gICAgICBjb25zb2xlLmxvZygxKVxuICAgICAgbGV0IGluc3RhbmNlID0gbmV3IFVwbG9hZFN0YXRlKCk7XG4gICAgICBpbnN0YW5jZS5zdGF0ZSA9IFVwbG9hZFN0YXRlLlByb2dyZXNzO1xuICAgICAgaW5zdGFuY2UucHJvZ3Jlc3MgPSBwcm9ncmVzcztcbiAgICAgIHJldHVybiBpbnN0YW5jZTtcbiAgIH1cblxuICAgc3RhdGljIGNyZWF0ZUNvbXBsZXRlKHJlc3A6IHN0cmluZywgc3RhdHVzOiBudW1iZXIsIGhlYWRlcnM6IFBhcnNlZFJlc3BvbnNlSGVhZGVycyk6IFVwbG9hZFN0YXRlIHtcbiAgICAgIGNvbnNvbGUubG9nKDEpXG4gICAgICBsZXQgaW5zdGFuY2UgPSBuZXcgVXBsb2FkU3RhdGUoKTtcbiAgICAgIGluc3RhbmNlLnN0YXRlID0gVXBsb2FkU3RhdGUuQ29tcGxldGU7XG4gICAgICBpbnN0YW5jZS5ib2R5ID0gcmVzcDtcbiAgICAgIGluc3RhbmNlLmNvZGUgPSBzdGF0dXM7XG4gICAgICBpbnN0YW5jZS5oZWFkZXJzID0gaGVhZGVycztcbiAgICAgIHJldHVybiBpbnN0YW5jZTtcbiAgIH1cblxuICAgc3RhdGljIGNyZWF0ZUVycm9yKHJlc3A6IHN0cmluZywgc3RhdHVzOiBudW1iZXIsIGhlYWRlcnM6IFBhcnNlZFJlc3BvbnNlSGVhZGVycyk6IFVwbG9hZFN0YXRlIHtcbiAgICAgIGNvbnNvbGUubG9nKDEpXG4gICAgICBsZXQgaW5zdGFuY2UgPSBuZXcgVXBsb2FkU3RhdGUoKTtcbiAgICAgIGluc3RhbmNlLnN0YXRlID0gVXBsb2FkU3RhdGUuRXJyb3I7XG4gICAgICBpbnN0YW5jZS5ib2R5ID0gcmVzcDtcbiAgICAgIGluc3RhbmNlLmNvZGUgPSBzdGF0dXM7XG4gICAgICBpbnN0YW5jZS5oZWFkZXJzID0gaGVhZGVycztcbiAgICAgIHJldHVybiBpbnN0YW5jZTtcbiAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIEZpbGVVcGxvYWRlckV4IGV4dGVuZHMgRmlsZVVwbG9hZGVyIHtcbiAgIGFmdGVyQWRkaW5nRmlsZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4gKCk7XG5cbiAgIGNvbnN0cnVjdG9yKG9wdGlvbnM6IEZpbGVVcGxvYWRlck9wdGlvbnMpIHtcbiAgICAgIHN1cGVyKG9wdGlvbnMpO1xuICAgfVxuXG4gICBvbkFmdGVyQWRkaW5nRmlsZShpdGVtOiBhbnkpOiBhbnkge1xuICAgICAgdGhpcy5hZnRlckFkZGluZ0ZpbGUuZW1pdChpdGVtKTtcbiAgICAgIHJldHVybiBzdXBlci5vbkFmdGVyQWRkaW5nRmlsZShpdGVtKTtcbiAgIH1cblxuICAgb25CdWlsZEl0ZW1Gb3JtKGl0ZW06IGFueSwgZm9ybTogRm9ybURhdGEpOiB2b2lkIHtcbiAgICAgIGZvciAobGV0IGtleSBpbiBpdGVtLmZvcm1EYXRhKSB7XG4gICAgICAgICBmb3JtLmFwcGVuZChrZXksIGl0ZW0uZm9ybURhdGFba2V5XSk7XG4gICAgICB9XG4gICB9XG5cbiAgIHVwbG9hZEl0ZW0oaXRlbTogYW55KTogT2JzZXJ2YWJsZTxVcGxvYWRTdGF0ZT4ge1xuICAgICAgbGV0IHJlc3BvbnNlID0gbmV3IFN1YmplY3Q8VXBsb2FkU3RhdGU+ICgpO1xuICAgICAgaXRlbS5vblByb2dyZXNzID0gcHJvZ3Jlc3MgPT4gcmVzcG9uc2UubmV4dChVcGxvYWRTdGF0ZS5jcmVhdGVQcm9ncmVzcyhwcm9ncmVzcykpO1xuICAgICAgaXRlbS5vblN1Y2Nlc3MgPSAocmVzcCwgc3RhdHVzLCBoZWFkZXJzKSA9PiB7XG4gICAgICAgICByZXNwb25zZS5uZXh0KFVwbG9hZFN0YXRlLmNyZWF0ZUNvbXBsZXRlKHJlc3AsIHN0YXR1cywgaGVhZGVycykpO1xuICAgICAgICAgcmVzcG9uc2UuY29tcGxldGUoKTtcbiAgICAgIH07XG4gICAgICBpdGVtLm9uRXJyb3IgPSAocmVzcCwgc3RhdHVzLCBoZWFkZXJzKSA9PiByZXNwb25zZS5lcnJvcihVcGxvYWRTdGF0ZS5jcmVhdGVFcnJvcihyZXNwLCBzdGF0dXMsIGhlYWRlcnMpKTtcbiAgICAgIGl0ZW0ub25DYW5jZWwgPSBpdGVtLm9uRXJyb3I7XG5cbiAgICAgIHN1cGVyLnVwbG9hZEl0ZW0oaXRlbSk7XG5cbiAgICAgIHJldHVybiByZXNwb25zZS5hc09ic2VydmFibGUoKTtcbiAgIH1cbn0iXX0=
