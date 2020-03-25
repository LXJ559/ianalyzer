/**
 * Created by zhongping.lu on 9/22/2016.
 */
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
var rxjs_1 = require("rxjs");
var api_util_1 = require("../utils/api.util");
var exception_service_1 = require("./exception.service");
var rest_service_1 = require("./rest.service");
var general_util_1 = require("../utils/general.util");
var ng2_translate_1 = require("ng2-translate");
var common_1 = require("@angular/common");
var FileService = (function () {
    function FileService(rest, errorService, i18n) {
        this.rest = rest;
        this.errorService = errorService;
        this.i18n = i18n;
    }
    /**
     * Get formatted grid data set from local file
     * @param file
     * @returns {Promise<PreviewGridData[]>}
     */
    FileService.prototype.getLocalFilePreview = function (file) {
        return new Promise(function (resolve, reject) {
            if (!file) {
                reject(new Error("no file provided"));
                return;
            }
            var reader = new FileReader();
            reader.addEventListener("load", function (event) {
                var previewSheetSet = [];
                var workbook = XLSX.read(event.target.result, { type: "binary" });
                var _loop_1 = function (name_1) {
                    var sheetGridData = {
                        sheetName: name_1,
                        columnDef: [],
                        rowData: []
                    };
                    var sheet = workbook.Sheets[name_1];
                    var rowData = {};
                    var fieldSet = [];
                    var infoSet = {};
                    var maxRowId = 0;
                    for (var key in sheet) {
                        var result = /\d+$/g.exec(key);
                        if (result) {
                            var index = result.index;
                            var rowId = parseInt(result[0]) - 1;
                            maxRowId = Math.max(maxRowId, rowId);
                            var field = key.substring(0, index);
                            if (!rowData[rowId]) {
                                rowData[rowId] = {};
                            }
                            var data = rowData[rowId];
                            data[field] = sheet[key].w;
                            if (fieldSet.indexOf(field) === -1) {
                                fieldSet.push(field);
                            }
                        }
                        else {
                            infoSet[key] = sheet[key];
                        }
                    }
                    // Sort field from a to z
                    fieldSet = fieldSet.sort(function (one, two) {
                        if (one < two) {
                            return -1;
                        }
                        else if (one > two) {
                            return 1;
                        }
                        else {
                            return 0;
                        }
                    });
                    // Remove rows of which contains merged cells
                    if (infoSet.hasOwnProperty("!merges")) {
                        var mergeCols = infoSet["!merges"];
                        mergeCols.forEach(function (merge) {
                            var _a = [merge["s"], merge["e"]], begin = _a[0], end = _a[1];
                            rxjs_1.Observable.range(begin.r, end.r + 1).subscribe(function (skip) {
                                delete rowData[skip];
                            });
                        });
                    }
                    var columnSet = fieldSet.map(function (field) {
                        return {
                            headerName: field,
                            field: field,
                            width: 80,
                            cellClass: function (params) { return params.node.childIndex === 0 ? "preview-header" : ""; }
                        };
                    });
                    columnSet.unshift({
                        headerName: "",
                        field: "rowCount",
                        minWith: 20,
                        width: 30,
                        maxWidth: 40,
                        cellClass: ["row-header"],
                        pinned: "left"
                    });
                    // console.log(rowData, columnSet, infoSet);
                    sheetGridData.columnDef = columnSet;
                    rxjs_1.Observable.range(0, maxRowId + 1).subscribe(function (idx) {
                        if (rowData.hasOwnProperty(idx)) {
                            rowData[idx]["rowCount"] = sheetGridData.rowData.push(rowData[idx]);
                        }
                    });
                    previewSheetSet.push(sheetGridData);
                    resolve(previewSheetSet);
                };
                for (var name_1 in workbook.Sheets) {
                    _loop_1(name_1);
                }
            });
            reader.readAsBinaryString(file);
        });
    };
    /**
     * Retrieve file preview data from back-end and format it to proper grid data
     * @param file
     * @returns {Promise<void>|Promise<PreviewGridData[]>}
     */
    FileService.prototype.getFilePreview = function (file) {
        var _this = this;
        return rxjs_1.Observable.create(function (observer) {
            _this.rest.queryRestApi({
                type: api_util_1.API_TYPE.R_PREVIEW,
                urlParams: { fid: file.id }
            }).subscribe(function (response) {
                var resultSet = response.json();
                var columnSet = [];
                // TODO:  need to handle the condition of multiple sheets, back-end only support first one now
                var gridData = {
                    sheetName: "sheet1",
                    columnDef: [],
                    rowData: []
                };
                var headerRow = {};
                // When there is no header provided, return the empty grid and exit handler
                if (!resultSet.header) {
                    observer.next([gridData]);
                    observer.complete();
                    return;
                }
                var _loop_2 = function (idx) {
                    var item = resultSet.header[idx];
                    headerRow[item["name"]] = item["title"];
                    var colDef = {
                        headerName: general_util_1.Util.getExcelHeader(idx),
                        field: item["name"],
                        width: 80,
                        cellClass: function (params) { return params.node.childIndex === 0 ? "preview-header" : ""; }
                    };
                    if (item["type"] === "DATE") {
                        var pipe_1 = new common_1.DatePipe(_this.i18n.getBrowserLang());
                        colDef.cellFormatter = function (params) { return params.value && !isNaN(+params.value) ?
                            pipe_1.transform(params.value, general_util_1.Util.LONG_TIME_STRING) : params.value; };
                    }
                    columnSet.push(colDef);
                };
                for (var idx = 0; idx < resultSet.header.length; ++idx) {
                    _loop_2(idx);
                }
                headerRow["rowCount"] = 1;
                columnSet.unshift({
                    headerName: "",
                    field: "rowCount",
                    minWidth: 20,
                    width: 30,
                    maxWidth: 40,
                    cellClass: ["row-header"],
                    pinned: "left"
                });
                gridData.columnDef = columnSet;
                gridData.rowData = resultSet.result.map(function (row, index) {
                    var data = Object.create(row);
                    data["rowCount"] = index + 2;
                    return data;
                });
                gridData.rowData.unshift(headerRow);
                observer.next([gridData]);
                observer.complete();
            }, function (error) {
                _this.errorService.handleError(error, observer);
            });
        });
    };
    /**
     *
     * @param page
     * @param file
     * @returns {Observable<FileItem[]>}
     */
    FileService.prototype.getFileVersions = function (page, file) {
        var _this = this;
        return rxjs_1.Observable.create(function (observer) {
            _this.rest.queryRestApi({
                type: api_util_1.API_TYPE.R_VERSION,
                urlParams: { fid: file.attachGroup },
                page: page
            }).subscribe(function (response) {
                observer.next(response.json());
                observer.complete();
            }, function (error) {
                console.log(1111111222222221);
                _this.errorService.handleError(error, observer);
            });
        });
    };
    /**
     * Get all files with latest version (by user)
     * @param page
     * @param userId
     * @returns Observable<FileItem[]>
     */
    FileService.prototype.getFiles = function (page, userId, category, startTime, endTime) {
        var _this = this;
        return rxjs_1.Observable.create(function (observer) {
            console.log(category, startTime, endTime);
            _this.rest.queryRestApi({
                type: userId ? api_util_1.API_TYPE.R_FILES_BY_USER : api_util_1.API_TYPE.R_FILES,
                urlParams: userId ? { uid: userId } : null,
                page: page,
                category: category,
                startTime: startTime,
                endTime: endTime
            }).subscribe(function (response) {
                observer.next(response.json());
                observer.complete();
            }, function (error) {
                console.log(11111111);
                _this.errorService.handleError(error, observer);
            });
        });
    };
    FileService.prototype.getFileStatus = function () {
        var _this = this;
        return rxjs_1.Observable.create(function (observer) {
            var results = JSON.parse(window.localStorage.getItem("fileStatus"));
            if (results && results.length > 0) {
                observer.next(results);
                observer.complete();
            }
            else {
                results = [];
                _this.rest.queryRestApi({ type: api_util_1.API_TYPE.R_FILE_STATUS }).subscribe(function (resp) {
                    var raw = resp.json().result;
                    for (var key in raw) {
                        results.push({
                            status: +key,
                            description: raw[key]
                        });
                    }
                    window.localStorage.setItem("fileStatus", JSON.stringify(results));
                    observer.next(results);
                    observer.complete();
                }, function (error) { return _this.errorService.handleError(error, observer); });
            }
        });
    };
    FileService.prototype.getCategories = function (user) {
        var _this = this;
        return rxjs_1.Observable.create(function (observer) {
            var queryType = user ? api_util_1.API_TYPE.R_CATEGORY_BY_USER : api_util_1.API_TYPE.R_CATEGORYS;
            _this.rest.queryRestApi({
                type: queryType,
                urlParams: user ? { uid: user.id } : null
            }).subscribe(function (resp) {
                observer.next(resp.json());
                observer.complete();
            }, function (error) { return _this.errorService.handleError(error, observer); });
        });
    };
    FileService.prototype.getCateofUpload = function (id) {
        var _this = this;
        return rxjs_1.Observable.create(function (observer) {
            var queryType = api_util_1.API_TYPE.R_CATEGORYUPLOAD;
            _this.rest.queryRestApi({
                type: queryType,
                urlParams: { uid: id }
            }).subscribe(function (resp) {
                observer.next(resp.json());
                observer.complete();
            }, function (error) { return _this.errorService.handleError(error, observer); });
        });
    };
    FileService.prototype.getFile = function (id) {
        var _this = this;
        return rxjs_1.Observable.create(function (observer) {
            _this.rest.queryRestApi({
                type: api_util_1.API_TYPE.R_FILE,
                urlParams: { id: id }
            }).subscribe(function (resp) {
                observer.next(resp.json()["result"]);
                observer.complete();
            }, function (error) { return _this.errorService.handleError(error, observer); });
        });
    };
    FileService.prototype.getSingleFileStatus = function (id) {
        var response = new rxjs_1.Subject();
        this.getFile(id).subscribe(function (item) {
            response.next(item.status);
            response.complete();
        }, function (error) { return response.error(error); });
        return response.asObservable();
    };
    FileService.prototype.loopUntilStatusChange = function (spec) {
        var _this = this;
        var response = new rxjs_1.Subject();
        var timer = rxjs_1.Observable.timer(spec.duration, spec.duration);
        timer = spec.count ? timer.take(spec.count) : timer;
        if (spec.original.status === spec.target) {
            response.complete();
            return response.asObservable();
        }
        var exitOnChange = general_util_1.Util.isNullOrUndefined(spec.target);
        var subscription = timer.subscribe(function () {
            _this.getSingleFileStatus(spec.original.id).subscribe(function (status) {
                if (status !== spec.original.status) {
                    if (exitOnChange || status === spec.target) {
                        response.next(status);
                        response.complete();
                        subscription.unsubscribe();
                    }
                }
            }, function (error) {
                if (spec.exitOnError) {
                    response.error(error);
                    subscription.unsubscribe();
                }
                else {
                    console.log(error);
                }
            });
        }, function () { }, function () {
            response.complete();
        });
        return response.asObservable();
    };
    FileService.prototype.downloadFile = function (path) {
        window.open(api_util_1.APIs.getDownloadUri(path), "_blank");
    };
    FileService.prototype.getTemplates = function (page) {
        var _this = this;
        var response = new rxjs_1.Subject();
        this.rest.queryRestApi({ type: api_util_1.API_TYPE.R_TEMPLATES, page: page }).subscribe(function (resp) {
            response.next(resp.json());
            response.complete();
        }, function (error) { return _this.errorService.handleError(error, response); });
        return response.asObservable();
    };
    FileService.prototype.getTemplatesCat = function (page) {
        var _this = this;
        var response = new rxjs_1.Subject();
        this.rest.queryRestApi({ type: api_util_1.API_TYPE.R_CATEGORYS, page: page }).subscribe(function (resp) {
            response.next(resp.json());
            response.complete();
        }, function (error) { return _this.errorService.handleError(error, response); });
        return response.asObservable();
    };
    FileService.prototype.removeTemplate = function (id) {
        var _this = this;
        var result = new rxjs_1.Subject();
        this.rest.queryRestApi({
            type: api_util_1.API_TYPE.D_TEMPLATE,
            urlParams: { id: id }
        }).subscribe(function (resp) {
            result.next(resp.json());
            result.complete();
        }, function (error) { return _this.errorService.handleError(error, result); });
        return result.asObservable();
    };
    return FileService;
}());
FileService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [rest_service_1.RestService, exception_service_1.ExceptionService, ng2_translate_1.TranslateService])
], FileService);
exports.FileService = FileService;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZpY2VzL2ZpbGUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7R0FFRzs7Ozs7Ozs7Ozs7QUFHSCxzQ0FBeUM7QUFDekMsNkJBQW1EO0FBVW5ELDhDQUFpRDtBQUNqRCx5REFBcUQ7QUFFckQsK0NBQTJDO0FBRzNDLHNEQUEyQztBQUMzQywrQ0FBK0M7QUFDL0MsMENBQXlDO0FBTXpDO0lBQ0cscUJBQW9CLElBQWlCLEVBQVUsWUFBOEIsRUFBVSxJQUFzQjtRQUF6RixTQUFJLEdBQUosSUFBSSxDQUFhO1FBQVUsaUJBQVksR0FBWixZQUFZLENBQWtCO1FBQVUsU0FBSSxHQUFKLElBQUksQ0FBa0I7SUFBRyxDQUFDO0lBQ2pIOzs7O09BSUc7SUFDSCx5Q0FBbUIsR0FBbkIsVUFBb0IsSUFBVTtRQUMzQixNQUFNLENBQUMsSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPLEVBQUUsTUFBTTtZQUNoQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ1QsTUFBTSxDQUFDLElBQUksS0FBSyxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQztnQkFDdEMsTUFBTSxDQUFDO1lBQ1YsQ0FBQztZQUVELElBQUksTUFBTSxHQUFHLElBQUksVUFBVSxFQUFFLENBQUM7WUFDOUIsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxVQUFDLEtBQVU7Z0JBQ3hDLElBQUksZUFBZSxHQUFzQixFQUFFLENBQUM7Z0JBQzVDLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsRUFBQyxJQUFJLEVBQUcsUUFBUSxFQUFDLENBQUMsQ0FBQzt3Q0FDeEQsTUFBSTtvQkFDVixJQUFJLGFBQWEsR0FBRzt3QkFDakIsU0FBUyxFQUFHLE1BQUk7d0JBQ2hCLFNBQVMsRUFBRyxFQUFFO3dCQUNkLE9BQU8sRUFBRyxFQUFFO3FCQUNkLENBQUM7b0JBRUYsSUFB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QUMsWUFBWSxFQUFFLENBQUM7SUFDbEMsQ0FBQztJQUVELG9DQUFjLEdBQWQsVUFBZSxFQUFVO1FBQXpCLGlCQVdDO1FBVkUsSUFBSSxNQUFNLEdBQUcsSUFBSSxjQUFPLEVBQW1CLENBQUM7UUFDNUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUM7WUFDcEIsSUFBSSxFQUFFLG1CQUFRLENBQUMsVUFBVTtZQUN6QixTQUFTLEVBQUUsRUFBQyxFQUFFLEVBQUUsRUFBRSxFQUFDO1NBQ3JCLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQSxJQUFJO1lBQ2QsTUFBTSxDQUFDLElBQUksQ0FBa0IsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7WUFDMUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3JCLENBQUMsRUFBRSxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsRUFBNUMsQ0FBNEMsQ0FBQyxDQUFDO1FBRTFELE1BQU0sQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDaEMsQ0FBQztJQUNKLGtCQUFDO0FBQUQsQ0E5WUEsQUE4WUMsSUFBQTtBQTlZRDtJQURDLGlCQUFVLEVBQUU7cUNBRWdCLDBCQUFXLEVBQXdCLG9DQUFnQixFQUFnQixnQ0FBZ0I7ZUE2WS9HO0FBOVlZLHNCQUFBLFdBQVcsQ0FBQSIsImZpbGUiOiJzZXJ2aWNlcy9maWxlLnNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENyZWF0ZWQgYnkgemhvbmdwaW5nLmx1IG9uIDkvMjIvMjAxNi5cbiAqL1xuXG5cbmltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7T2JzZXJ2YWJsZSwgT2JzZXJ2ZXIsIFN1YmplY3R9IGZyb20gXCJyeGpzXCI7XG5pbXBvcnQge1xuICAgUHJldmlld0dyaWREYXRhLFxuICAgRmlsZUl0ZW0sXG4gICBGaWxlU3RhdHVzRGVzY3JpYmVyLFxuICAgQ2F0ZWdvcnksXG4gICBQcmV2aWV3RGF0YSxcbiAgIEZpbGVTdGF0dXMsXG4gICBTdGF0dXNMb29wUXVlcnlTcGVjXG59IGZyb20gXCIuLi9tb2RlbHMvZmlsZS5tb2RlbFwiO1xuaW1wb3J0IHtBUElfVFlQRSwgQVBJc30gZnJvbSBcIi4uL3V0aWxzL2FwaS51dGlsXCI7XG5pbXBvcnQge0V4Y2VwdGlvblNlcnZpY2V9IGZyb20gXCIuL2V4Y2VwdGlvbi5zZXJ2aWNlXCI7XG5pbXBvcnQge1BhZ2VkSXRlbVNldCwgUGFnZSwgUmVzcG9uc2VTdGF0dXN9IGZyb20gXCIuLi9tb2RlbHMvZ2VuZXJhbC5tb2RlbFwiO1xuaW1wb3J0IHtSZXN0U2VydmljZX0gZnJvbSBcIi4vcmVzdC5zZXJ2aWNlXCI7XG5pbXBvcnQge1VzZXJ9IGZyb20gXCIuLi9tb2RlbHMvYXV0aC5tb2RlbFwiO1xuaW1wb3J0IHtDb2xEZWZ9IGZyb20gXCJhZy1ncmlkXCI7XG5pbXBvcnQge1V0aWx9IGZyb20gXCIuLi91dGlscy9nZW5lcmFsLnV0aWxcIjtcbmltcG9ydCB7VHJhbnNsYXRlU2VydmljZX0gZnJvbSBcIm5nMi10cmFuc2xhdGVcIjtcbmltcG9ydCB7RGF0ZVBpcGV9IGZyb20gXCJAYW5ndWxhci9jb21tb25cIjtcbmltcG9ydCB7Tm90aWZpY2F0aW9uc1NlcnZpY2V9IGZyb20gXCJhbmd1bGFyMi1ub3RpZmljYXRpb25zXCI7XG5cbmRlY2xhcmUgdmFyIFhMU1g6IGFueVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRmlsZVNlcnZpY2Uge1xuICAgY29uc3RydWN0b3IocHJpdmF0ZSByZXN0OiBSZXN0U2VydmljZSwgcHJpdmF0ZSBlcnJvclNlcnZpY2U6IEV4Y2VwdGlvblNlcnZpY2UsIHByaXZhdGUgaTE4bjogVHJhbnNsYXRlU2VydmljZSkge31cbiAgIC8qKlxuICAgICogR2V0IGZvcm1hdHRlZCBncmlkIGRhdGEgc2V0IGZyb20gbG9jYWwgZmlsZVxuICAgICogQHBhcmFtIGZpbGVcbiAgICAqIEByZXR1cm5zIHtQcm9taXNlPFByZXZpZXdHcmlkRGF0YVtdPn1cbiAgICAqL1xuICAgZ2V0TG9jYWxGaWxlUHJldmlldyhmaWxlOiBGaWxlKTogUHJvbWlzZTxhbnk+IHtcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICBpZiAoIWZpbGUpIHtcbiAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoXCJubyBmaWxlIHByb3ZpZGVkXCIpKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgIH1cblxuICAgICAgICAgbGV0IHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgICAgICByZWFkZXIuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgKGV2ZW50OiBhbnkpID0+IHtcbiAgICAgICAgICAgIGxldCBwcmV2aWV3U2hlZXRTZXQ6IFByZXZpZXdHcmlkRGF0YVtdID0gW107XG4gICAgICAgICAgICBsZXQgd29ya2Jvb2sgPSBYTFNYLnJlYWQoZXZlbnQudGFyZ2V0LnJlc3VsdCwge3R5cGU6ICBcImJpbmFyeVwifSk7XG4gICAgICAgICAgICBmb3IgKGxldCBuYW1lIGluIHdvcmtib29rLlNoZWV0cykge1xuICAgICAgICAgICAgICAgbGV0IHNoZWV0R3JpZERhdGEgPSB7XG4gICAgICAgICAgICAgICAgICBzaGVldE5hbWU6ICBuYW1lLFxuICAgICAgICAgICAgICAgICAgY29sdW1uRGVmOiAgW10sXG4gICAgICAgICAgICAgICAgICByb3dEYXRhOiAgW11cbiAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgIGxldCBzaGVldCA9IHdvcmtib29rLlNoZWV0c1tuYW1lXTtcbiAgICAgICAgICAgICAgIGxldCByb3dEYXRhOiB7W2luZGV4OiBudW1iZXJdOiAgYW55fSA9IHt9O1xuICAgICAgICAgICAgICAgbGV0IGZpZWxkU2V0OiBzdHJpbmdbXSA9IFtdO1xuICAgICAgICAgICAgICAgbGV0IGluZm9TZXQ6IE9iamVjdCA9IHt9O1xuICAgICAgICAgICAgICAgbGV0IG1heFJvd0lkOiBudW1iZXIgPSAwO1xuXG4gICAgICAgICAgICAgICBmb3IgKGxldCBrZXkgaW4gc2hlZXQpIHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IC9cXGQrJC9nLmV4ZWMoa2V5KTtcblxuICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgY29uc3QgaW5kZXggPSByZXN1bHQuaW5kZXg7XG4gICAgICAgICAgICAgICAgICAgICBjb25zdCByb3dJZCA9IHBhcnNlSW50KHJlc3VsdFswXSkgLSAxO1xuICAgICAgICAgICAgICAgICAgICAgbWF4Um93SWQgPSBNYXRoLm1heChtYXhSb3dJZCwgcm93SWQpO1xuICAgICAgICAgICAgICAgICAgICAgY29uc3QgZmllbGQgPSBrZXkuc3Vic3RyaW5nKDAsIGluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgIGlmICghcm93RGF0YVtyb3dJZF0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvd0RhdGFbcm93SWRdID0ge307XG4gICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgIGxldCBkYXRhOiBPYmplY3QgPSByb3dEYXRhW3Jvd0lkXTtcbiAgICAgICAgICAgICAgICAgICAgIGRhdGFbZmllbGRdID0gc2hlZXRba2V5XS53O1xuXG4gICAgICAgICAgICAgICAgICAgICBpZiAoZmllbGRTZXQuaW5kZXhPZihmaWVsZCkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmaWVsZFNldC5wdXNoKGZpZWxkKTtcbiAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICBpbmZvU2V0W2tleV0gPSBzaGVldFtrZXldO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAvLyBTb3J0IGZpZWxkIGZyb20gYSB0byB6XG4gICAgICAgICAgICAgICBmaWVsZFNldCA9IGZpZWxkU2V0LnNvcnQoKG9uZTogc3RyaW5nLCB0d286IHN0cmluZyk6IG51bWJlciA9PiB7XG4gICAgICAgICAgICAgICAgICBpZiAob25lIDwgdHdvKSB7XG4gICAgICAgICAgICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG9uZSA+IHR3bykge1xuICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgLy8gUmVtb3ZlIHJvd3Mgb2Ygd2hpY2ggY29udGFpbnMgbWVyZ2VkIGNlbGxzXG4gICAgICAgICAgICAgICBpZiAoaW5mb1NldC5oYXNPd25Qcm9wZXJ0eShcIiFtZXJnZXNcIikpIHtcbiAgICAgICAgICAgICAgICAgIGxldCBtZXJnZUNvbHM6IE9iamVjdFtdID0gaW5mb1NldFtcIiFtZXJnZXNcIl07XG4gICAgICAgICAgICAgICAgICBtZXJnZUNvbHMuZm9yRWFjaChtZXJnZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICBsZXQgW2JlZ2luLCBlbmRdID0gW21lcmdlW1wic1wiXSwgbWVyZ2VbXCJlXCJdXTtcbiAgICAgICAgICAgICAgICAgICAgIE9ic2VydmFibGUucmFuZ2UoYmVnaW4uciwgZW5kLnIgKyAxKS5zdWJzY3JpYmUoc2tpcCA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgcm93RGF0YVtza2lwXTtcbiAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgIGxldCBjb2x1bW5TZXQ6IGFueVtdID0gZmllbGRTZXQubWFwKGZpZWxkID0+IHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICBoZWFkZXJOYW1lOiAgZmllbGQsXG4gICAgICAgICAgICAgICAgICAgICBmaWVsZDogIGZpZWxkLFxuICAgICAgICAgICAgICAgICAgICAgd2lkdGg6ICA4MCxcbiAgICAgICAgICAgICAgICAgICAgIGNlbGxDbGFzczogIHBhcmFtcyA9PiBwYXJhbXMubm9kZS5jaGlsZEluZGV4ID09PSAwID8gXCJwcmV2aWV3LWhlYWRlclwiIDogIFwiXCJcbiAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgIGNvbHVtblNldC51bnNoaWZ0KHtcbiAgICAgICAgICAgICAgICAgIGhlYWRlck5hbWU6ICBcIlwiLFxuICAgICAgICAgICAgICAgICAgZmllbGQ6ICBcInJvd0NvdW50XCIsXG4gICAgICAgICAgICAgICAgICBtaW5XaXRoOiAgMjAsXG4gICAgICAgICAgICAgICAgICB3aWR0aDogIDMwLFxuICAgICAgICAgICAgICAgICAgbWF4V2lkdGg6ICA0MCxcbiAgICAgICAgICAgICAgICAgIGNlbGxDbGFzczogIFtcInJvdy1oZWFkZXJcIl0sXG4gICAgICAgICAgICAgICAgICBwaW5uZWQ6ICBcImxlZnRcIlxuICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhyb3dEYXRhLCBjb2x1bW5TZXQsIGluZm9TZXQpO1xuXG4gICAgICAgICAgICAgICBzaGVldEdyaWREYXRhLmNvbHVtbkRlZiA9IGNvbHVtblNldDtcblxuICAgICAgICAgICAgICAgT2JzZXJ2YWJsZS5yYW5nZSgwLCBtYXhSb3dJZCArIDEpLnN1YnNjcmliZShpZHggPT4ge1xuICAgICAgICAgICAgICAgICAgaWYgKHJvd0RhdGEuaGFzT3duUHJvcGVydHkoaWR4KSkge1xuICAgICAgICAgICAgICAgICAgICAgcm93RGF0YVtpZHhdW1wicm93Q291bnRcIl0gPSBzaGVldEdyaWREYXRhLnJvd0RhdGEucHVzaChyb3dEYXRhW2lkeF0pO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgIHByZXZpZXdTaGVldFNldC5wdXNoKHNoZWV0R3JpZERhdGEpO1xuXG4gICAgICAgICAgICAgICByZXNvbHZlKHByZXZpZXdTaGVldFNldCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICB9KTtcbiAgICAgICAgIHJlYWRlci5yZWFkQXNCaW5hcnlTdHJpbmcoZmlsZSk7XG4gICAgICB9KTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBSZXRyaWV2ZSBmaWxlIHByZXZpZXcgZGF0YSBmcm9tIGJhY2stZW5kIGFuZCBmb3JtYXQgaXQgdG8gcHJvcGVyIGdyaWQgZGF0YVxuICAgICogQHBhcmFtIGZpbGVcbiAgICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fFByb21pc2U8UHJldmlld0dyaWREYXRhW10+fVxuICAgICovXG4gICBnZXRGaWxlUHJldmlldyhmaWxlOiBGaWxlSXRlbSk6IE9ic2VydmFibGU8UHJldmlld0dyaWREYXRhW10+IHtcbiAgICAgIHJldHVybiBPYnNlcnZhYmxlLmNyZWF0ZSgob2JzZXJ2ZXI6IE9ic2VydmVyPFByZXZpZXdHcmlkRGF0YVtdPikgPT4ge1xuICAgICAgICAgdGhpcy5yZXN0LnF1ZXJ5UmVzdEFwaSh7XG4gICAgICAgICAgICB0eXBlOiAgQVBJX1RZUEUuUl9QUkVWSUVXLFxuICAgICAgICAgICAgdXJsUGFyYW1zOiAge2ZpZDogIGZpbGUuaWR9XG4gICAgICAgICB9KS5zdWJzY3JpYmUoXG4gICAgICAgICAgICByZXNwb25zZSA9PiB7XG4gICAgICAgICAgICAgICBsZXQgcmVzdWx0U2V0OiBQcmV2aWV3RGF0YSA9IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgICAgICAgIGxldCBjb2x1bW5TZXQ6IENvbERlZltdID0gW107XG5cbiAgICAgICAgICAgICAgIC8vIFRPRE86ICBuZWVkIHRvIGhhbmRsZSB0aGUgY29uZGl0aW9uIG9mIG11bHRpcGxlIHNoZWV0cywgYmFjay1lbmQgb25seSBzdXBwb3J0IGZpcnN0IG9uZSBub3dcbiAgICAgICAgICAgICAgIGxldCBncmlkRGF0YTogUHJldmlld0dyaWREYXRhID0ge1xuICAgICAgICAgICAgICAgICAgc2hlZXROYW1lOiAgXCJzaGVldDFcIixcbiAgICAgICAgICAgICAgICAgIGNvbHVtbkRlZjogIFtdLFxuICAgICAgICAgICAgICAgICAgcm93RGF0YTogIFtdXG4gICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICBsZXQgaGVhZGVyUm93ID0ge307XG5cbiAgICAgICAgICAgICAgIC8vIFdoZW4gdGhlcmUgaXMgbm8gaGVhZGVyIHByb3ZpZGVkLCByZXR1cm4gdGhlIGVtcHR5IGdyaWQgYW5kIGV4aXQgaGFuZGxlclxuICAgICAgICAgICAgICAgaWYgKCFyZXN1bHRTZXQuaGVhZGVyKSB7XG4gICAgICAgICAgICAgICAgICBvYnNlcnZlci5uZXh0KFtncmlkRGF0YV0pO1xuICAgICAgICAgICAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcbiAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgZm9yIChsZXQgaWR4ID0gMDsgaWR4IDwgcmVzdWx0U2V0LmhlYWRlci5sZW5ndGg7ICsraWR4KSB7XG4gICAgICAgICAgICAgICAgICBjb25zdCBpdGVtID0gcmVzdWx0U2V0LmhlYWRlcltpZHhdO1xuICAgICAgICAgICAgICAgICAgaGVhZGVyUm93W2l0ZW1bXCJuYW1lXCJdXSA9IGl0ZW1bXCJ0aXRsZVwiXTtcbiAgICAgICAgICAgICAgICAgIGxldCBjb2xEZWY6IENvbERlZiA9IHtcbiAgICAgICAgICAgICAgICAgICAgIGhlYWRlck5hbWU6ICBVdGlsLmdldEV4Y2VsSGVhZGVyKGlkeCksXG4gICAgICAgICAgICAgICAgICAgICBmaWVsZDogIGl0ZW1bXCJuYW1lXCJdLFxuICAgICAgICAgICAgICAgICAgICAgd2lkdGg6ICA4MCxcbiAgICAgICAgICAgICAgICAgICAgIGNlbGxDbGFzczogIHBhcmFtcyA9PiBwYXJhbXMubm9kZS5jaGlsZEluZGV4ID09PSAwID8gXCJwcmV2aWV3LWhlYWRlclwiIDogIFwiXCJcbiAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgIGlmIChpdGVtW1widHlwZVwiXSA9PT0gXCJEQVRFXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgIGxldCBwaXBlID0gbmV3IERhdGVQaXBlKHRoaXMuaTE4bi5nZXRCcm93c2VyTGFuZygpKTtcbiAgICAgICAgICAgICAgICAgICAgIGNvbERlZi5jZWxsRm9ybWF0dGVyID0gcGFyYW1zID0+IHBhcmFtcy52YWx1ZSAmJiAhaXNOYU4oK3BhcmFtcy52YWx1ZSkgP1xuICAgICAgICAgICAgICAgICAgICAgICAgcGlwZS50cmFuc2Zvcm0ocGFyYW1zLnZhbHVlLCBVdGlsLkxPTkdfVElNRV9TVFJJTkcpIDogIHBhcmFtcy52YWx1ZTtcbiAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgY29sdW1uU2V0LnB1c2goY29sRGVmKTtcbiAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgaGVhZGVyUm93W1wicm93Q291bnRcIl0gPSAxO1xuXG4gICAgICAgICAgICAgICBjb2x1bW5TZXQudW5zaGlmdCh7XG4gICAgICAgICAgICAgICAgICBoZWFkZXJOYW1lOiAgXCJcIixcbiAgICAgICAgICAgICAgICAgIGZpZWxkOiAgXCJyb3dDb3VudFwiLFxuICAgICAgICAgICAgICAgICAgbWluV2lkdGg6ICAyMCxcbiAgICAgICAgICAgICAgICAgIHdpZHRoOiAgMzAsXG4gICAgICAgICAgICAgICAgICBtYXhXaWR0aDogIDQwLFxuICAgICAgICAgICAgICAgICAgY2VsbENsYXNzOiAgW1wicm93LWhlYWRlclwiXSxcbiAgICAgICAgICAgICAgICAgIHBpbm5lZDogIFwibGVmdFwiXG4gICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgZ3JpZERhdGEuY29sdW1uRGVmID0gY29sdW1uU2V0O1xuICAgICAgICAgICAgICAgZ3JpZERhdGEucm93RGF0YSA9IHJlc3VsdFNldC5yZXN1bHQubWFwKChyb3csIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgICBsZXQgZGF0YSA9IE9iamVjdC5jcmVhdGUocm93KTtcbiAgICAgICAgICAgICAgICAgIGRhdGFbXCJyb3dDb3VudFwiXSA9IGluZGV4ICsgMjtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgICAgICAgICAgfSk7XG5cblxuICAgICAgICAgICAgICAgZ3JpZERhdGEucm93RGF0YS51bnNoaWZ0KGhlYWRlclJvdyk7XG5cbiAgICAgICAgICAgICAgIG9ic2VydmVyLm5leHQoW2dyaWREYXRhXSk7XG4gICAgICAgICAgICAgICBvYnNlcnZlci5jb21wbGV0ZSgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yID0+IHtcbiAgICAgICAgICAgICAgIHRoaXMuZXJyb3JTZXJ2aWNlLmhhbmRsZUVycm9yKGVycm9yLCBvYnNlcnZlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICApO1xuICAgICAgfSk7XG4gICB9XG5cbiAgIC8qKlxuICAgICpcbiAgICAqIEBwYXJhbSBwYWdlXG4gICAgKiBAcGFyYW0gZmlsZVxuICAgICogQHJldHVybnMge09ic2VydmFibGU8RmlsZUl0ZW1bXT59XG4gICAgKi9cbiAgIGdldEZpbGVWZXJzaW9ucyhwYWdlOiBQYWdlLCBmaWxlOiBGaWxlSXRlbSk6IE9ic2VydmFibGU8UGFnZWRJdGVtU2V0PEZpbGVJdGVtPj4ge1xuICAgICAgcmV0dXJuIE9ic2VydmFibGUuY3JlYXRlKChvYnNlcnZlcjogT2JzZXJ2ZXI8UGFnZWRJdGVtU2V0PEZpbGVJdGVtPj4pID0+IHtcbiAgICAgICAgIHRoaXMucmVzdC5xdWVyeVJlc3RBcGkoe1xuICAgICAgICAgICAgdHlwZTogQVBJX1RZUEUuUl9WRVJTSU9OLFxuICAgICAgICAgICAgdXJsUGFyYW1zOiB7ZmlkOiAgZmlsZS5hdHRhY2hHcm91cH0sXG4gICAgICAgICAgICBwYWdlOiBwYWdlXG4gICAgICAgICB9KS5zdWJzY3JpYmUoXG4gICAgICAgICAgICByZXNwb25zZSA9PiB7XG4gICAgICAgICAgICAgICBvYnNlcnZlci5uZXh0KHJlc3BvbnNlLmpzb24oKSk7XG4gICAgICAgICAgICAgICBvYnNlcnZlci5jb21wbGV0ZSgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yID0+IHtcbiAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKDExMTExMTEyMjIyMjIyMjEpXG4gICAgICAgICAgICAgICB0aGlzLmVycm9yU2VydmljZS5oYW5kbGVFcnJvcihlcnJvciwgb2JzZXJ2ZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgKTtcbiAgICAgIH0pO1xuICAgfVxuXG4gICAvKipcbiAgICAqIEdldCBhbGwgZmlsZXMgd2l0aCBsYXRlc3QgdmVyc2lvbiAoYnkgdXNlcilcbiAgICAqIEBwYXJhbSBwYWdlXG4gICAgKiBAcGFyYW0gdXNlcklkXG4gICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPEZpbGVJdGVtW10+XG4gICAgKi9cbiAgIGdldEZpbGVzKHBhZ2U6IFBhZ2UsIHVzZXJJZD86IG51bWJlciwgY2F0ZWdvcnk6c3RyaW5nLCBzdGFydFRpbWU6c3RyaW5nLGVuZFRpbWU6c3RyaW5nKTogT2JzZXJ2YWJsZTxQYWdlZEl0ZW1TZXQ8RmlsZUl0ZW0+PiB7XG4gICAgICByZXR1cm4gT2JzZXJ2YWJsZS5jcmVhdGUoKG9ic2VydmVyOiBPYnNlcnZlcjxQYWdlZEl0ZW1TZXQ8RmlsZUl0ZW0+PikgPT4ge1xuICAgICAgICAgY29uc29sZS5sb2coY2F0ZWdvcnksc3RhcnRUaW1lLGVuZFRpbWUpXG4gICAgICAgICB0aGlzLnJlc3QucXVlcnlSZXN0QXBpKHtcbiAgICAgICAgICAgIHR5cGU6ICB1c2VySWQgPyBBUElfVFlQRS5SX0ZJTEVTX0JZX1VTRVIgOiAgQVBJX1RZUEUuUl9GSUxFUyxcbiAgICAgICAgICAgIHVybFBhcmFtczogIHVzZXJJZCA/IHt1aWQ6ICB1c2VySWR9IDogIG51bGwsXG4gICAgICAgICAgICBwYWdlOiAgcGFnZSxcbiAgICAgICAgICAgIGNhdGVnb3J5OiBjYXRlZ29yeSxcbiAgICAgICAgICAgIHN0YXJ0VGltZTogc3RhcnRUaW1lLFxuICAgICAgICAgICAgZW5kVGltZTogZW5kVGltZVxuICAgICAgICAgfSkuc3Vic2NyaWJlKFxuICAgICAgICAgICAgcmVzcG9uc2UgPT4ge1xuXG4gICAgICAgICAgICAgICBvYnNlcnZlci5uZXh0KHJlc3BvbnNlLmpzb24oKSk7XG4gICAgICAgICAgICAgICBvYnNlcnZlci5jb21wbGV0ZSgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yID0+IHtcbiAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKDExMTExMTExKVxuICAgICAgICAgICAgICAgdGhpcy5lcnJvclNlcnZpY2UuaGFuZGxlRXJyb3IoZXJyb3IsIG9ic2VydmVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICk7XG4gICAgICB9KTtcbiAgIH1cblxuICAgZ2V0RmlsZVN0YXR1cygpOiBPYnNlcnZhYmxlPEZpbGVTdGF0dXNEZXNjcmliZXJbXT4ge1xuICAgICAgcmV0dXJuIE9ic2VydmFibGUuY3JlYXRlKChvYnNlcnZlcjogT2JzZXJ2ZXI8RmlsZVN0YXR1c0Rlc2NyaWJlcltdPikgPT4ge1xuICAgICAgICAgbGV0IHJlc3VsdHM6IEZpbGVTdGF0dXNEZXNjcmliZXJbXSA9IEpTT04ucGFyc2Uod2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiZmlsZVN0YXR1c1wiKSk7XG5cbiAgICAgICAgIGlmIChyZXN1bHRzICYmIHJlc3VsdHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgb2JzZXJ2ZXIubmV4dChyZXN1bHRzKTtcbiAgICAgICAgICAgIG9ic2VydmVyLmNvbXBsZXRlKCk7XG4gICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzdWx0cyA9IFtdO1xuICAgICAgICAgICAgdGhpcy5yZXN0LnF1ZXJ5UmVzdEFwaSh7dHlwZTogIEFQSV9UWVBFLlJfRklMRV9TVEFUVVN9KS5zdWJzY3JpYmUocmVzcCA9PiB7XG4gICAgICAgICAgICAgICBsZXQgcmF3OiBPYmplY3QgPSByZXNwLmpzb24oKS5yZXN1bHQ7XG5cbiAgICAgICAgICAgICAgIGZvciAobGV0IGtleSBpbiByYXcpIHtcbiAgICAgICAgICAgICAgICAgIHJlc3VsdHMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICBzdGF0dXM6ICAra2V5LFxuICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246ICByYXdba2V5XVxuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShcImZpbGVTdGF0dXNcIiwgSlNPTi5zdHJpbmdpZnkocmVzdWx0cykpO1xuICAgICAgICAgICAgICAgb2JzZXJ2ZXIubmV4dChyZXN1bHRzKTtcbiAgICAgICAgICAgICAgIG9ic2VydmVyLmNvbXBsZXRlKCk7XG4gICAgICAgICAgICB9LCBlcnJvciA9PiB0aGlzLmVycm9yU2VydmljZS5oYW5kbGVFcnJvcihlcnJvciwgb2JzZXJ2ZXIpKTtcbiAgICAgICAgIH1cbiAgICAgIH0pO1xuICAgfVxuXG4gICBnZXRDYXRlZ29yaWVzKHVzZXI/OiBVc2VyKTogT2JzZXJ2YWJsZTxDYXRlZ29yeVtdPiB7XG4gICAgICByZXR1cm4gT2JzZXJ2YWJsZS5jcmVhdGUoKG9ic2VydmVyOiBPYnNlcnZlcjxDYXRlZ29yeVtdPikgPT4ge1xuICAgICAgICAgbGV0IHF1ZXJ5VHlwZTogQVBJX1RZUEUgPSB1c2VyID8gQVBJX1RZUEUuUl9DQVRFR09SWV9CWV9VU0VSIDogIEFQSV9UWVBFLlJfQ0FURUdPUllTO1xuICAgICAgICAgdGhpcy5yZXN0LnF1ZXJ5UmVzdEFwaSh7XG4gICAgICAgICAgICB0eXBlOiAgcXVlcnlUeXBlLFxuICAgICAgICAgICAgdXJsUGFyYW1zOiAgdXNlciA/IHt1aWQ6ICB1c2VyLmlkfSA6ICBudWxsXG4gICAgICAgICB9KS5zdWJzY3JpYmUocmVzcCA9PiB7XG4gICAgICAgICAgICBvYnNlcnZlci5uZXh0KHJlc3AuanNvbigpKTtcbiAgICAgICAgICAgIG9ic2VydmVyLmNvbXBsZXRlKCk7XG4gICAgICAgICB9LCBlcnJvciA9PiB0aGlzLmVycm9yU2VydmljZS5oYW5kbGVFcnJvcihlcnJvciwgb2JzZXJ2ZXIpKTtcbiAgICAgIH0pO1xuICAgfVxuXG4gICBnZXRDYXRlb2ZVcGxvYWQoaWQpOiBPYnNlcnZhYmxlPGFueVtdPiB7XG4gICAgICByZXR1cm4gT2JzZXJ2YWJsZS5jcmVhdGUoKG9ic2VydmVyOiBPYnNlcnZlcjxhbnlbXT4pID0+IHtcbiAgICAgICAgIGxldCBxdWVyeVR5cGU6IEFQSV9UWVBFID0gQVBJX1RZUEUuUl9DQVRFR09SWVVQTE9BRDtcbiAgICAgICAgIHRoaXMucmVzdC5xdWVyeVJlc3RBcGkoe1xuICAgICAgICAgICAgdHlwZTogIHF1ZXJ5VHlwZSxcbiAgICAgICAgICAgIHVybFBhcmFtczogIHt1aWQ6aWR9XG4gICAgICAgICB9KS5zdWJzY3JpYmUocmVzcCA9PiB7XG4gICAgICAgICAgICBvYnNlcnZlci5uZXh0KHJlc3AuanNvbigpKTtcbiAgICAgICAgICAgIG9ic2VydmVyLmNvbXBsZXRlKCk7XG4gICAgICAgICB9LCBlcnJvciA9PiB0aGlzLmVycm9yU2VydmljZS5oYW5kbGVFcnJvcihlcnJvciwgb2JzZXJ2ZXIpKTtcbiAgICAgIH0pO1xuICAgfVxuXG4gICBnZXRGaWxlKGlkOiBudW1iZXIpOiBPYnNlcnZhYmxlPEZpbGVJdGVtPiB7XG4gICAgICByZXR1cm4gT2JzZXJ2YWJsZS5jcmVhdGUoKG9ic2VydmVyOiBPYnNlcnZlcjxGaWxlSXRlbT4pID0+IHtcbiAgICAgICAgIHRoaXMucmVzdC5xdWVyeVJlc3RBcGkoe1xuICAgICAgICAgICAgdHlwZTogIEFQSV9UWVBFLlJfRklMRSxcbiAgICAgICAgICAgIHVybFBhcmFtczogIHtpZDogIGlkfVxuICAgICAgICAgfSkuc3Vic2NyaWJlKHJlc3AgPT4ge1xuICAgICAgICAgICAgb2JzZXJ2ZXIubmV4dChyZXNwLmpzb24oKVtcInJlc3VsdFwiXSk7XG4gICAgICAgICAgICBvYnNlcnZlci5jb21wbGV0ZSgpO1xuICAgICAgICAgfSwgZXJyb3IgPT4gdGhpcy5lcnJvclNlcnZpY2UuaGFuZGxlRXJyb3IoZXJyb3IsIG9ic2VydmVyKSk7XG4gICAgICB9KTtcbiAgIH1cblxuICAgZ2V0U2luZ2xlRmlsZVN0YXR1cyhpZDogbnVtYmVyKTogT2JzZXJ2YWJsZTxGaWxlU3RhdHVzPiB7XG4gICAgICBsZXQgcmVzcG9uc2UgPSBuZXcgU3ViamVjdDxGaWxlU3RhdHVzPiAoKTtcblxuICAgICAgdGhpcy5nZXRGaWxlKGlkKS5zdWJzY3JpYmUoaXRlbSA9PiB7XG4gICAgICAgICByZXNwb25zZS5uZXh0KGl0ZW0uc3RhdHVzKTtcbiAgICAgICAgIHJlc3BvbnNlLmNvbXBsZXRlKCk7XG4gICAgICB9LCBlcnJvciA9PiByZXNwb25zZS5lcnJvcihlcnJvcikpO1xuXG4gICAgICByZXR1cm4gcmVzcG9uc2UuYXNPYnNlcnZhYmxlKCk7XG4gICB9XG5cbiAgIGxvb3BVbnRpbFN0YXR1c0NoYW5nZShzcGVjOiBTdGF0dXNMb29wUXVlcnlTcGVjKTogT2JzZXJ2YWJsZTxGaWxlU3RhdHVzPiB7XG4gICAgICBsZXQgcmVzcG9uc2UgPSBuZXcgU3ViamVjdDxGaWxlU3RhdHVzPiAoKTtcblxuICAgICAgbGV0IHRpbWVyID0gT2JzZXJ2YWJsZS50aW1lcihzcGVjLmR1cmF0aW9uLCBzcGVjLmR1cmF0aW9uKTtcbiAgICAgIHRpbWVyID0gc3BlYy5jb3VudCA/IHRpbWVyLnRha2Uoc3BlYy5jb3VudCkgOiB0aW1lcjtcblxuICAgICAgaWYgKHNwZWMub3JpZ2luYWwuc3RhdHVzID09PSBzcGVjLnRhcmdldCkge1xuICAgICAgICAgcmVzcG9uc2UuY29tcGxldGUoKTtcbiAgICAgICAgIHJldHVybiByZXNwb25zZS5hc09ic2VydmFibGUoKTtcbiAgICAgIH1cblxuICAgICAgbGV0IGV4aXRPbkNoYW5nZSA9IFV0aWwuaXNOdWxsT3JVbmRlZmluZWQoc3BlYy50YXJnZXQpO1xuXG4gICAgICBsZXQgc3Vic2NyaXB0aW9uID0gdGltZXIuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgIHRoaXMuZ2V0U2luZ2xlRmlsZVN0YXR1cyhzcGVjLm9yaWdpbmFsLmlkKS5zdWJzY3JpYmUoc3RhdHVzID0+IHtcbiAgICAgICAgICAgIGlmIChzdGF0dXMgIT09IHNwZWMub3JpZ2luYWwuc3RhdHVzKSB7XG4gICAgICAgICAgICAgICBpZiAoZXhpdE9uQ2hhbmdlIHx8IHN0YXR1cyA9PT0gc3BlYy50YXJnZXQpIHtcbiAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLm5leHQoc3RhdHVzKTtcbiAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLmNvbXBsZXRlKCk7XG4gICAgICAgICAgICAgICAgICBzdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgIH0sIGVycm9yID0+IHtcbiAgICAgICAgICAgIGlmIChzcGVjLmV4aXRPbkVycm9yKSB7XG4gICAgICAgICAgICAgICByZXNwb25zZS5lcnJvcihlcnJvcik7XG4gICAgICAgICAgICAgICBzdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICB9KTtcbiAgICAgIH0sICgpID0+IHt9LCAoKSA9PiB7XG4gICAgICAgICByZXNwb25zZS5jb21wbGV0ZSgpO1xuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiByZXNwb25zZS5hc09ic2VydmFibGUoKTtcbiAgIH1cblxuICAgZG93bmxvYWRGaWxlKHBhdGg6IHN0cmluZyk6IHZvaWQge1xuICAgICAgd2luZG93Lm9wZW4oQVBJcy5nZXREb3dubG9hZFVyaShwYXRoKSwgXCJfYmxhbmtcIik7XG4gICB9XG5cbiAgIGdldFRlbXBsYXRlcyhwYWdlOiBQYWdlKTogT2JzZXJ2YWJsZTxQYWdlZEl0ZW1TZXQ8YW55Pj4ge1xuICAgICAgbGV0IHJlc3BvbnNlID0gbmV3IFN1YmplY3Q8UGFnZWRJdGVtU2V0PGFueT4+ICgpO1xuICAgICAgdGhpcy5yZXN0LnF1ZXJ5UmVzdEFwaSh7dHlwZTogQVBJX1RZUEUuUl9URU1QTEFURVMsIHBhZ2U6IHBhZ2V9KS5zdWJzY3JpYmUocmVzcCA9PiB7XG4gICAgICAgICByZXNwb25zZS5uZXh0KDxQYWdlZEl0ZW1TZXQ8YW55Pj4gcmVzcC5qc29uKCkpO1xuICAgICAgICAgcmVzcG9uc2UuY29tcGxldGUoKTtcbiAgICAgIH0sIGVycm9yID0+IHRoaXMuZXJyb3JTZXJ2aWNlLmhhbmRsZUVycm9yKGVycm9yLCByZXNwb25zZSkpO1xuXG4gICAgICByZXR1cm4gcmVzcG9uc2UuYXNPYnNlcnZhYmxlKCk7XG4gICB9XG5cbiAgIGdldFRlbXBsYXRlc0NhdChwYWdlOiBQYWdlKTogT2JzZXJ2YWJsZTxQYWdlZEl0ZW1TZXQ8YW55Pj4ge1xuICAgICAgbGV0IHJlc3BvbnNlID0gbmV3IFN1YmplY3Q8UGFnZWRJdGVtU2V0PGFueT4+ICgpO1xuICAgICAgdGhpcy5yZXN0LnF1ZXJ5UmVzdEFwaSh7dHlwZTogQVBJX1RZUEUuUl9DQVRFR09SWVMsIHBhZ2U6IHBhZ2V9KS5zdWJzY3JpYmUocmVzcCA9PiB7XG4gICAgICAgICByZXNwb25zZS5uZXh0KDxQYWdlZEl0ZW1TZXQ8YW55Pj4gcmVzcC5qc29uKCkpO1xuICAgICAgICAgcmVzcG9uc2UuY29tcGxldGUoKTtcbiAgICAgIH0sIGVycm9yID0+IHRoaXMuZXJyb3JTZXJ2aWNlLmhhbmRsZUVycm9yKGVycm9yLCByZXNwb25zZSkpO1xuXG4gICAgICByZXR1cm4gcmVzcG9uc2UuYXNPYnNlcnZhYmxlKCk7XG4gICB9XG5cbiAgIHJlbW92ZVRlbXBsYXRlKGlkOiBudW1iZXIpOiBPYnNlcnZhYmxlPFJlc3BvbnNlU3RhdHVzPiB7XG4gICAgICBsZXQgcmVzdWx0ID0gbmV3IFN1YmplY3Q8UmVzcG9uc2VTdGF0dXM+ICgpO1xuICAgICAgdGhpcy5yZXN0LnF1ZXJ5UmVzdEFwaSh7XG4gICAgICAgICB0eXBlOiBBUElfVFlQRS5EX1RFTVBMQVRFLFxuICAgICAgICAgdXJsUGFyYW1zOiB7aWQ6IGlkfVxuICAgICAgfSkuc3Vic2NyaWJlKHJlc3AgPT4ge1xuICAgICAgICAgcmVzdWx0Lm5leHQoPFJlc3BvbnNlU3RhdHVzPiByZXNwLmpzb24oKSk7XG4gICAgICAgICByZXN1bHQuY29tcGxldGUoKTtcbiAgICAgIH0sIGVycm9yID0+IHRoaXMuZXJyb3JTZXJ2aWNlLmhhbmRsZUVycm9yKGVycm9yLCByZXN1bHQpKTtcblxuICAgICAgcmV0dXJuIHJlc3VsdC5hc09ic2VydmFibGUoKTtcbiAgIH1cbn0iXX0=
