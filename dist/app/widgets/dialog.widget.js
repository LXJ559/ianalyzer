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
 * Created by zhongping.lu on 9/22/2016.
 */
var core_1 = require("@angular/core");
var components_1 = require("angular2-notifications/components");
var rxjs_1 = require("rxjs");
var ng2_bootstrap_1 = require("ng2-bootstrap");
var DialogWidget = (function () {
    function DialogWidget(notification) {
        this.notification = notification;
        this.cleanup = new core_1.EventEmitter();
        this.commit = new core_1.EventEmitter();
    }
    /**
     *
     * @param title
     * @param showClose
     * @param onCommit
     * @param iconClass
     * @returns {Promise<void>}
     */
    DialogWidget.prototype.popup = function (title, showClose, iconClass) {
        if (showClose === void 0) { showClose = true; }
        this.title = title;
        this.titleIcon = iconClass ? iconClass : this.titleIcon;
        this.showClose = showClose ? showClose : this.showClose;
        return rxjs_1.Observable.of(this.dialog.show());
    };
    DialogWidget.prototype.resetProps = function () {
        this.title = this.titleIcon = this.labelCloseBtn = this.labelCloseBtn = null;
        this.showClose = false;
        this.pending = false;
        this.pendingMessage = null;
        this.cleanup.emit();
    };
    DialogWidget.prototype.onCommitFail = function (errors) {
        var _this = this;
        this.pending = false;
        if (Array.isArray(errors)) {
            var exceptions = errors;
            exceptions.forEach(function (error) {
                _this.notification.error(error.exceptionName, error.description);
            });
        }
        else {
            var exception = errors;
            this.notification.error(exception.exceptionName, exception.description);
        }
    };
    DialogWidget.prototype.onCommit = function () {
        var _this = this;
        this.pending = true;
        var handler = {
            next: function (result) {
                _this.pending = false;
                _this.dialog.hide();
            },
            error: function (error) {
                _this.pending = false;
                _this.onCommitFail(error);
            },
            complete: function () { }
        };
        this.commit.emit(handler);
    };
    DialogWidget.prototype.setState = function (isPending, message) {
        this.pending = isPending;
        this.pendingMessage = message;
    };
    return DialogWidget;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DialogWidget.prototype, "titleIcon", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DialogWidget.prototype, "title", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DialogWidget.prototype, "labelCloseBtn", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DialogWidget.prototype, "labelCommitBtn", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], DialogWidget.prototype, "showClose", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DialogWidget.prototype, "pendingMessage", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], DialogWidget.prototype, "cleanup", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], DialogWidget.prototype, "commit", void 0);
__decorate([
    core_1.ViewChild("dialog"),
    __metadata("design:type", ng2_bootstrap_1.ModalDirective)
], DialogWidget.prototype, "dialog", void 0);
DialogWidget = __decorate([
    core_1.Component({
        selector: "dialog-widget",
        template: "\n<div bsModal #dialog=\"bs-modal\" class=\"modal fade \" [config]=\"{backdrop: 'static'}\" (onHide)=\"resetProps()\">\n   <div class=\"modal-dialog\">\n      <div class=\"card\">\n         <div class=\"card-header\">\n            <i [class]=\"titleIcon\" *ngIf=\"titleIcon\"></i>{{title}}\n            <div class=\"card-actions\" *ngIf=\"showClose\">\n               <!-- Style fix for line break in card-actions, needs to find root cause-->\n               <a class=\"btn-close\" href=\"#\" (click)=\"dialog.hide();$event.preventDefault()\"\n                  style=\"height: 45px; padding-top: 14px;\">\n                  <i class=\"icon-close\"></i>\n               </a>\n            </div>\n         </div>\n         <div class=\"card-block\" style=\"position: relative\">\n            <div class=\"dialog-mask\" *ngIf=\"pending\">\n               <div class=\"container h-100\">\n                  <div class=\"row h-100\">\n                     <div class=\"col-xs flex-xs-middle text-xs-center\">\n                        <h4>\n                           <i class=\"fa fa-spinner fa-spin\"></i>\n                           {{pendingMessage || \"widget.dialog.pendingMsg\" | translate}}\n                        </h4>\n                     </div>\n                  </div>\n\n               </div>\n            </div>\n            <ng-content></ng-content>\n         </div>\n         <div class=\"card-footer text-md-right\">\n            <button type=\"button\" class=\"btn btn-outline-secondary\"\n                    data-dismiss=\"modal\" (click)=\"dialog.hide()\">\n               {{labelCloseBtn || \"widget.dialog.cancelLabel\" | translate}}\n            </button>\n            <button type=\"button\" class=\"btn btn-outline-primary\" (click)=\"onCommit()\"\n                    [disabled]=\"pending\">\n               <i class=\"fa fa-spinner fa-spin\" *ngIf=\"pending\"></i>\n               {{labelCommitBtn || \"widget.dialog.commitLabel\" | translate}}\n            </button>\n         </div>\n      </div>\n   </div>\n</div>\n"
    }),
    __metadata("design:paramtypes", [components_1.NotificationsService])
], DialogWidget);
exports.DialogWidget = DialogWidget;

//# sourceMappingURL=data:application/json;charset=utf8;base64,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K0JBQVEsR0FBUixVQUFTLFNBQWtCLEVBQUUsT0FBZ0I7UUFDMUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUM7UUFDekIsSUFBSSxDQUFDLGNBQWMsR0FBRyxPQUFPLENBQUM7SUFDakMsQ0FBQztJQUNKLG1CQUFDO0FBQUQsQ0E3RUEsQUE2RUMsSUFBQTtBQTVFVztJQUFSLFlBQUssRUFBRTs7K0NBQW1CO0FBQ2xCO0lBQVIsWUFBSyxFQUFFOzsyQ0FBZTtBQUNkO0lBQVIsWUFBSyxFQUFFOzttREFBdUI7QUFDdEI7SUFBUixZQUFLLEVBQUU7O29EQUF3QjtBQUN2QjtJQUFSLFlBQUssRUFBRTs7K0NBQW9CO0FBQ25CO0lBQVIsWUFBSyxFQUFFOztvREFBd0I7QUFFdEI7SUFBVCxhQUFNLEVBQUU7OEJBQVUsbUJBQVk7NkNBQXVEO0FBQzVFO0lBQVQsYUFBTSxFQUFFOzhCQUFTLG1CQUFZOzRDQUE2RDtBQUV0RTtJQUFwQixnQkFBUyxDQUFDLFFBQVEsQ0FBQzs4QkFBUyw4QkFBYzs0Q0FBQztBQVgvQztJQWhEQyxnQkFBUyxDQUFDO1FBQ1IsUUFBUSxFQUFFLGVBQWU7UUFDekIsUUFBUSxFQUFFLGdnRUE0Q1o7S0FDQSxDQUFDO3FDQWtCbUMsaUNBQW9CO2dCQTREeEQ7QUE3RVksdUJBQUEsWUFBWSxDQUFBIiwiZmlsZSI6IndpZGdldHMvZGlhbG9nLndpZGdldC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ3JlYXRlZCBieSB6aG9uZ3BpbmcubHUgb24gOS8yMi8yMDE2LlxuICovXG5pbXBvcnQge0NvbXBvbmVudCwgVmlld0NoaWxkLCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXJ9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge05vdGlmaWNhdGlvbnNTZXJ2aWNlfSBmcm9tIFwiYW5ndWxhcjItbm90aWZpY2F0aW9ucy9jb21wb25lbnRzXCI7XG5pbXBvcnQge09ic2VydmVyLCBPYnNlcnZhYmxlfSBmcm9tIFwicnhqc1wiO1xuaW1wb3J0IHtHZW5lcmFsRXhjZXB0aW9ufSBmcm9tIFwiLi4vbW9kZWxzL2V4Y2VwdGlvbi5tb2RlbFwiO1xuaW1wb3J0IHtNb2RhbERpcmVjdGl2ZX0gZnJvbSBcIm5nMi1ib290c3RyYXBcIjtcblxuQENvbXBvbmVudCh7XG4gICBzZWxlY3RvcjogXCJkaWFsb2ctd2lkZ2V0XCIsXG4gICB0ZW1wbGF0ZTogYFxuPGRpdiBic01vZGFsICNkaWFsb2c9XCJicy1tb2RhbFwiIGNsYXNzPVwibW9kYWwgZmFkZSBcIiBbY29uZmlnXT1cIntiYWNrZHJvcDogJ3N0YXRpYyd9XCIgKG9uSGlkZSk9XCJyZXNldFByb3BzKClcIj5cbiAgIDxkaXYgY2xhc3M9XCJtb2RhbC1kaWFsb2dcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJjYXJkXCI+XG4gICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZC1oZWFkZXJcIj5cbiAgICAgICAgICAgIDxpIFtjbGFzc109XCJ0aXRsZUljb25cIiAqbmdJZj1cInRpdGxlSWNvblwiPjwvaT57e3RpdGxlfX1cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLWFjdGlvbnNcIiAqbmdJZj1cInNob3dDbG9zZVwiPlxuICAgICAgICAgICAgICAgPCEtLSBTdHlsZSBmaXggZm9yIGxpbmUgYnJlYWsgaW4gY2FyZC1hY3Rpb25zLCBuZWVkcyB0byBmaW5kIHJvb3QgY2F1c2UtLT5cbiAgICAgICAgICAgICAgIDxhIGNsYXNzPVwiYnRuLWNsb3NlXCIgaHJlZj1cIiNcIiAoY2xpY2spPVwiZGlhbG9nLmhpZGUoKTskZXZlbnQucHJldmVudERlZmF1bHQoKVwiXG4gICAgICAgICAgICAgICAgICBzdHlsZT1cImhlaWdodDogNDVweDsgcGFkZGluZy10b3A6IDE0cHg7XCI+XG4gICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImljb24tY2xvc2VcIj48L2k+XG4gICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgIDwvZGl2PlxuICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmQtYmxvY2tcIiBzdHlsZT1cInBvc2l0aW9uOiByZWxhdGl2ZVwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImRpYWxvZy1tYXNrXCIgKm5nSWY9XCJwZW5kaW5nXCI+XG4gICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyIGgtMTAwXCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93IGgtMTAwXCI+XG4gICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLXhzIGZsZXgteHMtbWlkZGxlIHRleHQteHMtY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aDQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhIGZhLXNwaW5uZXIgZmEtc3BpblwiPjwvaT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7cGVuZGluZ01lc3NhZ2UgfHwgXCJ3aWRnZXQuZGlhbG9nLnBlbmRpbmdNc2dcIiB8IHRyYW5zbGF0ZX19XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2g0PlxuICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgICAgIDwvZGl2PlxuICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmQtZm9vdGVyIHRleHQtbWQtcmlnaHRcIj5cbiAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1vdXRsaW5lLXNlY29uZGFyeVwiXG4gICAgICAgICAgICAgICAgICAgIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCIgKGNsaWNrKT1cImRpYWxvZy5oaWRlKClcIj5cbiAgICAgICAgICAgICAgIHt7bGFiZWxDbG9zZUJ0biB8fCBcIndpZGdldC5kaWFsb2cuY2FuY2VsTGFiZWxcIiB8IHRyYW5zbGF0ZX19XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1vdXRsaW5lLXByaW1hcnlcIiAoY2xpY2spPVwib25Db21taXQoKVwiXG4gICAgICAgICAgICAgICAgICAgIFtkaXNhYmxlZF09XCJwZW5kaW5nXCI+XG4gICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhIGZhLXNwaW5uZXIgZmEtc3BpblwiICpuZ0lmPVwicGVuZGluZ1wiPjwvaT5cbiAgICAgICAgICAgICAgIHt7bGFiZWxDb21taXRCdG4gfHwgXCJ3aWRnZXQuZGlhbG9nLmNvbW1pdExhYmVsXCIgfCB0cmFuc2xhdGV9fVxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgPC9kaXY+XG48L2Rpdj5cbmBcbn0pXG5leHBvcnQgY2xhc3MgRGlhbG9nV2lkZ2V0IHtcbiAgIEBJbnB1dCgpIHRpdGxlSWNvbjogc3RyaW5nO1xuICAgQElucHV0KCkgdGl0bGU6IHN0cmluZztcbiAgIEBJbnB1dCgpIGxhYmVsQ2xvc2VCdG46IHN0cmluZztcbiAgIEBJbnB1dCgpIGxhYmVsQ29tbWl0QnRuOiBzdHJpbmc7XG4gICBASW5wdXQoKSBzaG93Q2xvc2U6IGJvb2xlYW47XG4gICBASW5wdXQoKSBwZW5kaW5nTWVzc2FnZTogc3RyaW5nO1xuXG4gICBAT3V0cHV0KCkgY2xlYW51cDogRXZlbnRFbWl0dGVyPE9ic2VydmVyPHZvaWQ+PiA9IG5ldyBFdmVudEVtaXR0ZXI8T2JzZXJ2ZXI8dm9pZD4+ICgpO1xuICAgQE91dHB1dCgpIGNvbW1pdDogRXZlbnRFbWl0dGVyPE9ic2VydmVyPGJvb2xlYW4+PiA9IG5ldyBFdmVudEVtaXR0ZXI8T2JzZXJ2ZXI8Ym9vbGVhbj4+ICgpO1xuXG4gICBAVmlld0NoaWxkKFwiZGlhbG9nXCIpIGRpYWxvZzogTW9kYWxEaXJlY3RpdmU7XG5cblxuICAgcGVuZGluZzogYm9vbGVhbjtcblxuXG4gICBjb25zdHJ1Y3Rvcihwcml2YXRlIG5vdGlmaWNhdGlvbjogTm90aWZpY2F0aW9uc1NlcnZpY2UpIHt9XG5cbiAgIC8qKlxuICAgICpcbiAgICAqIEBwYXJhbSB0aXRsZVxuICAgICogQHBhcmFtIHNob3dDbG9zZVxuICAgICogQHBhcmFtIG9uQ29tbWl0XG4gICAgKiBAcGFyYW0gaWNvbkNsYXNzXG4gICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn1cbiAgICAqL1xuICAgcG9wdXAodGl0bGU6IHN0cmluZywgc2hvd0Nsb3NlOiBib29sZWFuID0gdHJ1ZSwgaWNvbkNsYXNzPzogc3RyaW5nKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgIHRoaXMudGl0bGUgPSB0aXRsZTtcbiAgICAgIHRoaXMudGl0bGVJY29uID0gaWNvbkNsYXNzID8gaWNvbkNsYXNzIDogdGhpcy50aXRsZUljb247XG4gICAgICB0aGlzLnNob3dDbG9zZSA9IHNob3dDbG9zZSA/IHNob3dDbG9zZSA6IHRoaXMuc2hvd0Nsb3NlO1xuICAgICAgcmV0dXJuIE9ic2VydmFibGUub2YodGhpcy5kaWFsb2cuc2hvdygpKTtcbiAgIH1cblxuICAgcmVzZXRQcm9wcygpOiB2b2lkIHtcbiAgICAgIHRoaXMudGl0bGUgPSB0aGlzLnRpdGxlSWNvbiA9IHRoaXMubGFiZWxDbG9zZUJ0biA9IHRoaXMubGFiZWxDbG9zZUJ0biA9IG51bGw7XG4gICAgICB0aGlzLnNob3dDbG9zZSA9IGZhbHNlO1xuICAgICAgdGhpcy5wZW5kaW5nID0gZmFsc2U7XG4gICAgICB0aGlzLnBlbmRpbmdNZXNzYWdlID0gbnVsbDtcbiAgICAgIHRoaXMuY2xlYW51cC5lbWl0KCk7XG4gICB9XG5cbiAgIHByaXZhdGUgb25Db21taXRGYWlsKGVycm9yczogR2VuZXJhbEV4Y2VwdGlvbltdfEdlbmVyYWxFeGNlcHRpb24pOiB2b2lkIHtcbiAgICAgIHRoaXMucGVuZGluZyA9IGZhbHNlO1xuXG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShlcnJvcnMpKSB7XG4gICAgICAgICBsZXQgZXhjZXB0aW9ucyA9IGVycm9ycyBhcyBHZW5lcmFsRXhjZXB0aW9uW107XG4gICAgICAgICBleGNlcHRpb25zLmZvckVhY2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb24uZXJyb3IoZXJyb3IuZXhjZXB0aW9uTmFtZSwgZXJyb3IuZGVzY3JpcHRpb24pO1xuICAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAgbGV0IGV4Y2VwdGlvbiA9IGVycm9ycyBhcyBHZW5lcmFsRXhjZXB0aW9uO1xuICAgICAgICAgdGhpcy5ub3RpZmljYXRpb24uZXJyb3IoZXhjZXB0aW9uLmV4Y2VwdGlvbk5hbWUsIGV4Y2VwdGlvbi5kZXNjcmlwdGlvbik7XG4gICAgICB9XG4gICB9XG5cbiAgIG9uQ29tbWl0KCk6IHZvaWQge1xuICAgICAgdGhpcy5wZW5kaW5nID0gdHJ1ZTtcblxuICAgICAgbGV0IGhhbmRsZXI6IE9ic2VydmVyPGJvb2xlYW4+ID0ge1xuICAgICAgICAgbmV4dDogKHJlc3VsdDogYm9vbGVhbikgPT4ge1xuICAgICAgICAgICAgdGhpcy5wZW5kaW5nID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmRpYWxvZy5oaWRlKCk7XG4gICAgICAgICB9LFxuICAgICAgICAgZXJyb3I6IChlcnJvcjogR2VuZXJhbEV4Y2VwdGlvbltdKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnBlbmRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMub25Db21taXRGYWlsKGVycm9yKTtcbiAgICAgICAgIH0sXG4gICAgICAgICBjb21wbGV0ZTogKCkgPT4ge31cbiAgICAgIH07XG4gICAgICB0aGlzLmNvbW1pdC5lbWl0KGhhbmRsZXIpO1xuICAgfVxuXG4gICBzZXRTdGF0ZShpc1BlbmRpbmc6IGJvb2xlYW4sIG1lc3NhZ2U/OiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgIHRoaXMucGVuZGluZyA9IGlzUGVuZGluZztcbiAgICAgIHRoaXMucGVuZGluZ01lc3NhZ2UgPSBtZXNzYWdlO1xuICAgfVxufSJdfQ==
