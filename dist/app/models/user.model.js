"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by zhongping.lu on 10/27/2016.
 */
var general_model_1 = require("./general.model");
var UserDataSource = (function (_super) {
    __extends(UserDataSource, _super);
    function UserDataSource() {
        return _super.apply(this, arguments) || this;
    }
    UserDataSource.create = function (service, notify) {
        var ds = new UserDataSource();
        ds.service = service;
        ds.notificationService = notify;
        return ds;
    };
    UserDataSource.prototype.getRows = function (params) {
        var _this = this;
        var page = {
            from: params.startRow,
            size: params.endRow - params.startRow
        };
        this.service.getUsers(page).subscribe(function (itemSet) {
            params.successCallback(itemSet.result, itemSet.total);
            _this.onComplete.emit(itemSet.result);
        }, function (error) {
            _this.notificationService.alert(error.exceptionName, error.description);
            _this.onError.emit(error);
        });
    };
    return UserDataSource;
}(general_model_1.GeneralDataSource));
exports.UserDataSource = UserDataSource;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZGVscy91c2VyLm1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOztHQUVHO0FBQ0gsaURBQXdEO0FBb0J4RDtJQUFvQyxrQ0FBaUI7SUFBckQ7O0lBeUJBLENBQUM7SUFyQlMscUJBQU0sR0FBYixVQUFjLE9BQW9CLEVBQUUsTUFBNEI7UUFDN0QsSUFBSSxFQUFFLEdBQUcsSUFBSSxjQUFjLEVBQUUsQ0FBQztRQUM5QixFQUFFLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUNyQixFQUFFLENBQUMsbUJBQW1CLEdBQUcsTUFBTSxDQUFDO1FBQ2hDLE1BQU0sQ0FBQyxFQUFFLENBQUM7SUFDYixDQUFDO0lBRUQsZ0NBQU8sR0FBUCxVQUFRLE1BQXNCO1FBQTlCLGlCQWFDO1FBWkUsSUFBSSxJQUFJLEdBQVM7WUFDZCxJQUFJLEVBQUUsTUFBTSxDQUFDLFFBQVE7WUFDckIsSUFBSSxFQUFFLE1BQU0sQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLFFBQVE7U0FDdkMsQ0FBQztRQUVGLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFBLE9BQU87WUFDMUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN0RCxLQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDeEMsQ0FBQyxFQUFFLFVBQUEsS0FBSztZQUNMLEtBQUksQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLGFBQWEsRUFBRSxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDdkUsS0FBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDNUIsQ0FBQyxDQUFDLENBQUM7SUFDTixDQUFDO0lBQ0oscUJBQUM7QUFBRCxDQXpCQSxBQXlCQyxDQXpCbUMsaUNBQWlCLEdBeUJwRDtBQXpCRCx3Q0F5QkMiLCJmaWxlIjoibW9kZWxzL3VzZXIubW9kZWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENyZWF0ZWQgYnkgemhvbmdwaW5nLmx1IG9uIDEwLzI3LzIwMTYuXG4gKi9cbmltcG9ydCB7R2VuZXJhbERhdGFTb3VyY2UsIFBhZ2V9IGZyb20gXCIuL2dlbmVyYWwubW9kZWxcIjtcbmltcG9ydCB7VXNlclNlcnZpY2V9IGZyb20gXCIuLi9zZXJ2aWNlcy91c2VyLnNlcnZpY2VcIjtcbmltcG9ydCB7SUdldFJvd3NQYXJhbXN9IGZyb20gXCJhZy1ncmlkXCI7XG5pbXBvcnQge05vdGlmaWNhdGlvbnNTZXJ2aWNlfSBmcm9tIFwiYW5ndWxhcjItbm90aWZpY2F0aW9ucy9jb21wb25lbnRzXCI7XG5pbXBvcnQge1VzZXJUeXBlfSBmcm9tIFwiLi9hdXRoLm1vZGVsXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgVXNlclNwZWMge1xuICAgdWlkPzogbnVtYmVyXG4gICB1c2VybmFtZT86IHN0cmluZztcbiAgIGVtYWlsPzogc3RyaW5nO1xuICAgcGFzc3dvcmQ/OiBzdHJpbmc7XG4gICBkaXNwbGF5bmFtZT86IHN0cmluZztcbiAgIHR5cGU/OiBVc2VyVHlwZTtcbiAgIGNhdGVnb3J5Pzogc3RyaW5nO1xuICAgY29uZmlybVB3ZD86IHN0cmluZztcbiAgIGNhdGVnb3J5T3B0aW9ucz86IGFueVtdO1xuICAgaXNVc2VybmFtZVZhbGlkPzogYm9vbGVhbjtcbiAgIHVwZGF0ZVVzZXI/OiBib29sZWFuO1xufVxuXG5leHBvcnQgY2xhc3MgVXNlckRhdGFTb3VyY2UgZXh0ZW5kcyBHZW5lcmFsRGF0YVNvdXJjZSB7XG4gICBwcml2YXRlIHNlcnZpY2U6IFVzZXJTZXJ2aWNlO1xuICAgcHJpdmF0ZSBub3RpZmljYXRpb25TZXJ2aWNlOiBOb3RpZmljYXRpb25zU2VydmljZTtcblxuICAgc3RhdGljIGNyZWF0ZShzZXJ2aWNlOiBVc2VyU2VydmljZSwgbm90aWZ5OiBOb3RpZmljYXRpb25zU2VydmljZSk6IFVzZXJEYXRhU291cmNlIHtcbiAgICAgIGxldCBkcyA9IG5ldyBVc2VyRGF0YVNvdXJjZSgpO1xuICAgICAgZHMuc2VydmljZSA9IHNlcnZpY2U7XG4gICAgICBkcy5ub3RpZmljYXRpb25TZXJ2aWNlID0gbm90aWZ5O1xuICAgICAgcmV0dXJuIGRzO1xuICAgfVxuXG4gICBnZXRSb3dzKHBhcmFtczogSUdldFJvd3NQYXJhbXMpOnZvaWQge1xuICAgICAgbGV0IHBhZ2U6IFBhZ2UgPSB7XG4gICAgICAgICBmcm9tOiBwYXJhbXMuc3RhcnRSb3csXG4gICAgICAgICBzaXplOiBwYXJhbXMuZW5kUm93IC0gcGFyYW1zLnN0YXJ0Um93XG4gICAgICB9O1xuXG4gICAgICB0aGlzLnNlcnZpY2UuZ2V0VXNlcnMocGFnZSkuc3Vic2NyaWJlKGl0ZW1TZXQgPT4ge1xuICAgICAgICAgcGFyYW1zLnN1Y2Nlc3NDYWxsYmFjayhpdGVtU2V0LnJlc3VsdCwgaXRlbVNldC50b3RhbCk7XG4gICAgICAgICB0aGlzLm9uQ29tcGxldGUuZW1pdChpdGVtU2V0LnJlc3VsdCk7XG4gICAgICB9LCBlcnJvciA9PiB7XG4gICAgICAgICB0aGlzLm5vdGlmaWNhdGlvblNlcnZpY2UuYWxlcnQoZXJyb3IuZXhjZXB0aW9uTmFtZSwgZXJyb3IuZGVzY3JpcHRpb24pO1xuICAgICAgICAgdGhpcy5vbkVycm9yLmVtaXQoZXJyb3IpO1xuICAgICAgfSk7XG4gICB9XG59XG4iXX0=
