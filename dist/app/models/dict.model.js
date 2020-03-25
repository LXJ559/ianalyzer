"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by zhongping.lu on 10/18/2016.
 */
var general_model_1 = require("./general.model");
var DictDataSource = (function (_super) {
    __extends(DictDataSource, _super);
    function DictDataSource() {
        return _super.call(this) || this;
    }
    /**
     *
     * @param service
     * @param notification
     * @returns {DictDataSource}
     */
    DictDataSource.create = function (service, notification) {
        var ds = new DictDataSource();
        ds.service = service;
        ds.notification = notification;
        return ds;
    };
    DictDataSource.prototype.getRows = function (params) {
        var _this = this;
        this.service.getDicts().subscribe(function (itemSet) {
            params.successCallback(itemSet.result, itemSet.total);
            _this.onComplete.emit(itemSet.result);
        }, function (error) {
            _this.notification.alert(error.exceptionName, error.description);
            _this.onError.emit(error);
        });
    };
    return DictDataSource;
}(general_model_1.GeneralDataSource));
exports.DictDataSource = DictDataSource;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZGVscy9kaWN0Lm1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOztHQUVHO0FBQ0gsaURBQWtEO0FBa0NsRDtJQUFvQyxrQ0FBaUI7SUFpQmxEO2VBQ0csaUJBQU87SUFDVixDQUFDO0lBZkQ7Ozs7O09BS0c7SUFDSSxxQkFBTSxHQUFiLFVBQWMsT0FBbUIsRUFBRSxZQUFpQztRQUNqRSxJQUFJLEVBQUUsR0FBRyxJQUFJLGNBQWMsRUFBRSxDQUFDO1FBQzlCLEVBQUUsQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3JCLEVBQUUsQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO1FBQy9CLE1BQU0sQ0FBQyxFQUFFLENBQUM7SUFDYixDQUFDO0lBTUQsZ0NBQU8sR0FBUCxVQUFRLE1BQXFCO1FBQTdCLGlCQVFDO1FBUEUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxTQUFTLENBQUMsVUFBQSxPQUFPO1lBQ3RDLE1BQU0sQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDdEQsS0FBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3hDLENBQUMsRUFBRSxVQUFBLEtBQUs7WUFDTCxLQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsYUFBYSxFQUFFLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUNoRSxLQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM1QixDQUFDLENBQUMsQ0FBQztJQUNOLENBQUM7SUFDSixxQkFBQztBQUFELENBOUJBLEFBOEJDLENBOUJtQyxpQ0FBaUIsR0E4QnBEO0FBOUJELHdDQThCQyIsImZpbGUiOiJtb2RlbHMvZGljdC5tb2RlbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ3JlYXRlZCBieSB6aG9uZ3BpbmcubHUgb24gMTAvMTgvMjAxNi5cbiAqL1xuaW1wb3J0IHtHZW5lcmFsRGF0YVNvdXJjZX0gZnJvbSBcIi4vZ2VuZXJhbC5tb2RlbFwiO1xuaW1wb3J0IHtOb3RpZmljYXRpb25zU2VydmljZX0gZnJvbSBcImFuZ3VsYXIyLW5vdGlmaWNhdGlvbnMvY29tcG9uZW50c1wiO1xuaW1wb3J0IHtJR2V0Um93c1BhcmFtc30gZnJvbSBcImFnLWdyaWRcIjtcbmltcG9ydCB7RGljdFNlcnZpY2V9IGZyb20gXCIuLi9zZXJ2aWNlcy9kaWN0LnNlcnZpY2VcIjtcblxuZXhwb3J0IGludGVyZmFjZSBDb2RlRWRpdGFibGUge1xuICAgaXNDb2RlRWRpdGFibGU6Ym9vbGVhbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBEYXRhRGljdGlvbmFyeSBleHRlbmRzIENvZGVFZGl0YWJsZXtcbiAgIGlkPzpudW1iZXI7XG4gICBkb21haW5jb2RlPzpzdHJpbmc7XG4gICBkb21haW5uYW1lY246c3RyaW5nO1xuICAgZG9tYWlubmFtZWVuOnN0cmluZztcbiAgIGNydGltZT86bnVtYmVyO1xuICAgY3JhY3Rvcj86c3RyaW5nO1xuICAgbGFzdHRpbWU/Om51bWJlcjtcbiAgIGxhc3RhY3Rvcj86c3RyaW5nO1xuICAgcmVtYXJrPzpzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgS3ZQYWlyIGV4dGVuZHMgQ29kZUVkaXRhYmxle1xuICAgaWQ/Om51bWJlcjtcbiAgIGRvbWFpbnZhbHVlY29kZTpzdHJpbmc7XG4gICBkb21haW52YWx1ZWNuOnN0cmluZztcbiAgIGRvbWFpbnZhbHVlZW46c3RyaW5nO1xuICAgZG9tYWluOm51bWJlcjtcbiAgIGNydGltZT86bnVtYmVyO1xuICAgY3JhY3Rvcj86c3RyaW5nO1xuICAgbGFzdHRpbWU/Om51bWJlcjtcbiAgIGxhc3RhY3Rvcj86c3RyaW5nO1xuICAgcmVtYXJrPzpzdHJpbmc7XG59XG5cbmV4cG9ydCBjbGFzcyBEaWN0RGF0YVNvdXJjZSBleHRlbmRzIEdlbmVyYWxEYXRhU291cmNlIHtcbiAgIHByaXZhdGUgc2VydmljZTpEaWN0U2VydmljZTtcbiAgIHByaXZhdGUgbm90aWZpY2F0aW9uOk5vdGlmaWNhdGlvbnNTZXJ2aWNlO1xuXG4gICAvKipcbiAgICAqXG4gICAgKiBAcGFyYW0gc2VydmljZVxuICAgICogQHBhcmFtIG5vdGlmaWNhdGlvblxuICAgICogQHJldHVybnMge0RpY3REYXRhU291cmNlfVxuICAgICovXG4gICBzdGF0aWMgY3JlYXRlKHNlcnZpY2U6RGljdFNlcnZpY2UsIG5vdGlmaWNhdGlvbjpOb3RpZmljYXRpb25zU2VydmljZSk6R2VuZXJhbERhdGFTb3VyY2Uge1xuICAgICAgbGV0IGRzID0gbmV3IERpY3REYXRhU291cmNlKCk7XG4gICAgICBkcy5zZXJ2aWNlID0gc2VydmljZTtcbiAgICAgIGRzLm5vdGlmaWNhdGlvbiA9IG5vdGlmaWNhdGlvbjtcbiAgICAgIHJldHVybiBkcztcbiAgIH1cblxuICAgY29uc3RydWN0b3IoKSB7XG4gICAgICBzdXBlcigpO1xuICAgfVxuXG4gICBnZXRSb3dzKHBhcmFtczpJR2V0Um93c1BhcmFtcyk6dm9pZCB7XG4gICAgICB0aGlzLnNlcnZpY2UuZ2V0RGljdHMoKS5zdWJzY3JpYmUoaXRlbVNldCA9PiB7XG4gICAgICAgICBwYXJhbXMuc3VjY2Vzc0NhbGxiYWNrKGl0ZW1TZXQucmVzdWx0LCBpdGVtU2V0LnRvdGFsKTtcbiAgICAgICAgIHRoaXMub25Db21wbGV0ZS5lbWl0KGl0ZW1TZXQucmVzdWx0KTtcbiAgICAgIH0sIGVycm9yID0+IHtcbiAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uLmFsZXJ0KGVycm9yLmV4Y2VwdGlvbk5hbWUsIGVycm9yLmRlc2NyaXB0aW9uKTtcbiAgICAgICAgIHRoaXMub25FcnJvci5lbWl0KGVycm9yKTtcbiAgICAgIH0pO1xuICAgfVxufSJdfQ==
