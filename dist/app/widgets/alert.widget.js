/**
 * Created by zhongping.lu on 11/8/2016.
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
var ng2_bootstrap_1 = require("ng2-bootstrap");
var rxjs_1 = require("rxjs");
var AlertWidget = (function () {
    function AlertWidget() {
        this.alertType = AlertWidget.WARNING.type;
        this.iconClass = AlertWidget.WARNING.iconClass;
    }
    Object.defineProperty(AlertWidget.prototype, "type", {
        set: function (value) {
            this.alertType = value;
            switch (this.alertType) {
                case AlertWidget.WARNING.type:
                    this.iconClass = AlertWidget.WARNING.iconClass;
                    break;
                case AlertWidget.INFO.type:
                    this.iconClass = AlertWidget.INFO.iconClass;
                    break;
                case AlertWidget.DANGER.type:
                    this.iconClass = AlertWidget.DANGER.iconClass;
                    break;
                default:
                    this.iconClass = AlertWidget.WARNING.iconClass;
            }
        },
        enumerable: true,
        configurable: true
    });
    ;
    AlertWidget.prototype.show = function () {
        this.activeSubject = new rxjs_1.Subject();
        this.modal.show();
        return this.activeSubject;
    };
    AlertWidget.prototype.btnClicked = function (result) {
        this.activeSubject.next(result);
        this.activeSubject.complete();
        this.modal.hide();
    };
    return AlertWidget;
}());
AlertWidget.WARNING = { type: "warning", iconClass: "fa fa-warning fa-lg" };
AlertWidget.INFO = { type: "info", iconClass: "fa fa-info-circle fa-lg" };
AlertWidget.DANGER = { type: "danger", iconClass: "fa fa-times-circle fa-lg" };
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], AlertWidget.prototype, "title", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], AlertWidget.prototype, "message", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], AlertWidget.prototype, "type", null);
__decorate([
    core_1.ViewChild("alert"),
    __metadata("design:type", ng2_bootstrap_1.ModalDirective)
], AlertWidget.prototype, "modal", void 0);
AlertWidget = __decorate([
    core_1.Component({
        selector: "alert-widget",
        template: "\n<div bsModal #alert=\"bs-modal\" class=\"modal fade\" [config]=\"{backdrop: 'static'}\">\n   <div class=\"modal-dialog\">\n      <div class=\"alert alert-{{alertType}}\">\n         <h4><i *ngIf=\"iconClass\" [class]=\"iconClass\"></i> {{title}}</h4>\n         <p>{{message}}</p>\n         <div class=\"text-xs-right\">\n            <button role=\"button\" class=\"btn btn-link alert-link\" (click)=\"btnClicked(false)\">{{\"widget.alert.No\"|translate}}</button>\n            <button role=\"button\" class=\"btn btn-link alert-link\" (click)=\"btnClicked(true)\">{{\"widget.alert.yes\"|translate}}</button>\n         </div>\n      </div>\n   </div>\n</div>\n"
    }),
    __metadata("design:paramtypes", [])
], AlertWidget);
exports.AlertWidget = AlertWidget;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndpZGdldHMvYWxlcnQud2lkZ2V0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOztHQUVHOzs7Ozs7Ozs7OztBQUdILHNDQUEwRDtBQUMxRCwrQ0FBNkM7QUFDN0MsNkJBQTZCO0FBbUI3QjtJQWpCQTtRQTJDRyxjQUFTLEdBQVcsV0FBVyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7UUFDN0MsY0FBUyxHQUFZLFdBQVcsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDO0lBZXRELENBQUM7SUFuQ1csc0JBQUksNkJBQUk7YUFBUixVQUFTLEtBQWE7WUFDNUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7WUFDdkIsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RCLEtBQUssV0FBVyxDQUFDLE9BQU8sQ0FBQyxJQUFJO29CQUMxQixJQUFJLENBQUMsU0FBUyxHQUFHLFdBQVcsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDO29CQUMvQyxLQUFLLENBQUM7Z0JBQ1QsS0FBSyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUk7b0JBQ3ZCLElBQUksQ0FBQyxTQUFTLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7b0JBQzVDLEtBQUssQ0FBQztnQkFDVCxLQUFLLFdBQVcsQ0FBQyxNQUFNLENBQUMsSUFBSTtvQkFDekIsSUFBSSxDQUFDLFNBQVMsR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQztvQkFDOUMsS0FBSyxDQUFDO2dCQUNUO29CQUNHLElBQUksQ0FBQyxTQUFTLEdBQUcsV0FBVyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUM7WUFDckQsQ0FBQztRQUNKLENBQUM7OztPQUFBO0lBQUEsQ0FBQztJQVNGLDBCQUFJLEdBQUo7UUFDRyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksY0FBTyxFQUFZLENBQUM7UUFDN0MsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNsQixNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQztJQUM3QixDQUFDO0lBRU8sZ0NBQVUsR0FBbEIsVUFBbUIsTUFBZTtRQUMvQixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNoQyxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQzlCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUNKLGtCQUFDO0FBQUQsQ0ExQ0EsQUEwQ0MsSUFBQTtBQXpDUyxtQkFBTyxHQUFHLEVBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUscUJBQXFCLEVBQUMsQ0FBQztBQUM5RCxnQkFBSSxHQUFHLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUseUJBQXlCLEVBQUMsQ0FBQztBQUM1RCxrQkFBTSxHQUFHLEVBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsMEJBQTBCLEVBQUMsQ0FBQztBQUUvRDtJQUFSLFlBQUssRUFBRTs7MENBQWU7QUFDZDtJQUFSLFlBQUssRUFBRTs7NENBQWlCO0FBQ2hCO0lBQVIsWUFBSyxFQUFFOzs7dUNBZVA7QUFFbUI7SUFBbkIsZ0JBQVMsQ0FBQyxPQUFPLENBQUM7OEJBQVEsOEJBQWM7MENBQUM7QUF4QjdDO0lBakJDLGdCQUFTLENBQUM7UUFDUixRQUFRLEVBQUUsY0FBYztRQUN4QixRQUFRLEVBQUUsc3BCQWFaO0tBQ0EsQ0FBQzs7ZUEyQ0Q7QUExQ1ksc0JBQUEsV0FBVyxDQUFBIiwiZmlsZSI6IndpZGdldHMvYWxlcnQud2lkZ2V0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDcmVhdGVkIGJ5IHpob25ncGluZy5sdSBvbiAxMS84LzIwMTYuXG4gKi9cblxuXG5pbXBvcnQge0NvbXBvbmVudCwgSW5wdXQsIFZpZXdDaGlsZH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7TW9kYWxEaXJlY3RpdmV9IGZyb20gXCJuZzItYm9vdHN0cmFwXCI7XG5pbXBvcnQge1N1YmplY3R9IGZyb20gXCJyeGpzXCI7XG5cbkBDb21wb25lbnQoe1xuICAgc2VsZWN0b3I6IFwiYWxlcnQtd2lkZ2V0XCIsXG4gICB0ZW1wbGF0ZTogYFxuPGRpdiBic01vZGFsICNhbGVydD1cImJzLW1vZGFsXCIgY2xhc3M9XCJtb2RhbCBmYWRlXCIgW2NvbmZpZ109XCJ7YmFja2Ryb3A6ICdzdGF0aWMnfVwiPlxuICAgPGRpdiBjbGFzcz1cIm1vZGFsLWRpYWxvZ1wiPlxuICAgICAgPGRpdiBjbGFzcz1cImFsZXJ0IGFsZXJ0LXt7YWxlcnRUeXBlfX1cIj5cbiAgICAgICAgIDxoND48aSAqbmdJZj1cImljb25DbGFzc1wiIFtjbGFzc109XCJpY29uQ2xhc3NcIj48L2k+IHt7dGl0bGV9fTwvaDQ+XG4gICAgICAgICA8cD57e21lc3NhZ2V9fTwvcD5cbiAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LXhzLXJpZ2h0XCI+XG4gICAgICAgICAgICA8YnV0dG9uIHJvbGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tbGluayBhbGVydC1saW5rXCIgKGNsaWNrKT1cImJ0bkNsaWNrZWQoZmFsc2UpXCI+e3tcIndpZGdldC5hbGVydC5Ob1wifHRyYW5zbGF0ZX19PC9idXR0b24+XG4gICAgICAgICAgICA8YnV0dG9uIHJvbGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tbGluayBhbGVydC1saW5rXCIgKGNsaWNrKT1cImJ0bkNsaWNrZWQodHJ1ZSlcIj57e1wid2lkZ2V0LmFsZXJ0Lnllc1wifHRyYW5zbGF0ZX19PC9idXR0b24+XG4gICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgPC9kaXY+XG48L2Rpdj5cbmBcbn0pXG5leHBvcnQgY2xhc3MgQWxlcnRXaWRnZXQge1xuICAgc3RhdGljIFdBUk5JTkcgPSB7dHlwZTogXCJ3YXJuaW5nXCIsIGljb25DbGFzczogXCJmYSBmYS13YXJuaW5nIGZhLWxnXCJ9O1xuICAgc3RhdGljIElORk8gPSB7dHlwZTogXCJpbmZvXCIsIGljb25DbGFzczogXCJmYSBmYS1pbmZvLWNpcmNsZSBmYS1sZ1wifTtcbiAgIHN0YXRpYyBEQU5HRVIgPSB7dHlwZTogXCJkYW5nZXJcIiwgaWNvbkNsYXNzOiBcImZhIGZhLXRpbWVzLWNpcmNsZSBmYS1sZ1wifTtcblxuICAgQElucHV0KCkgdGl0bGU6IHN0cmluZztcbiAgIEBJbnB1dCgpIG1lc3NhZ2U6IHN0cmluZztcbiAgIEBJbnB1dCgpIHNldCB0eXBlKHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgIHRoaXMuYWxlcnRUeXBlID0gdmFsdWU7XG4gICAgICBzd2l0Y2ggKHRoaXMuYWxlcnRUeXBlKSB7XG4gICAgICAgICBjYXNlIEFsZXJ0V2lkZ2V0LldBUk5JTkcudHlwZTpcbiAgICAgICAgICAgIHRoaXMuaWNvbkNsYXNzID0gQWxlcnRXaWRnZXQuV0FSTklORy5pY29uQ2xhc3M7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgIGNhc2UgQWxlcnRXaWRnZXQuSU5GTy50eXBlOlxuICAgICAgICAgICAgdGhpcy5pY29uQ2xhc3MgPSBBbGVydFdpZGdldC5JTkZPLmljb25DbGFzcztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgY2FzZSBBbGVydFdpZGdldC5EQU5HRVIudHlwZTpcbiAgICAgICAgICAgIHRoaXMuaWNvbkNsYXNzID0gQWxlcnRXaWRnZXQuREFOR0VSLmljb25DbGFzcztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHRoaXMuaWNvbkNsYXNzID0gQWxlcnRXaWRnZXQuV0FSTklORy5pY29uQ2xhc3M7XG4gICAgICB9XG4gICB9O1xuXG4gICBAVmlld0NoaWxkKFwiYWxlcnRcIikgbW9kYWw6IE1vZGFsRGlyZWN0aXZlO1xuXG4gICBhbGVydFR5cGU6IHN0cmluZyA9IEFsZXJ0V2lkZ2V0LldBUk5JTkcudHlwZTtcbiAgIGljb25DbGFzczogc3RyaW5nID0gIEFsZXJ0V2lkZ2V0LldBUk5JTkcuaWNvbkNsYXNzO1xuICAgcHJpdmF0ZSBhY3RpdmVTdWJqZWN0OiBTdWJqZWN0PGJvb2xlYW4+O1xuXG5cbiAgIHNob3coKTogU3ViamVjdDxib29sZWFuPiB7XG4gICAgICB0aGlzLmFjdGl2ZVN1YmplY3QgPSBuZXcgU3ViamVjdDxib29sZWFuPiAoKTtcbiAgICAgIHRoaXMubW9kYWwuc2hvdygpO1xuICAgICAgcmV0dXJuIHRoaXMuYWN0aXZlU3ViamVjdDtcbiAgIH1cblxuICAgcHJpdmF0ZSBidG5DbGlja2VkKHJlc3VsdDogYm9vbGVhbik6IHZvaWQge1xuICAgICAgdGhpcy5hY3RpdmVTdWJqZWN0Lm5leHQocmVzdWx0KTtcbiAgICAgIHRoaXMuYWN0aXZlU3ViamVjdC5jb21wbGV0ZSgpO1xuICAgICAgdGhpcy5tb2RhbC5oaWRlKCk7XG4gICB9XG59Il19
