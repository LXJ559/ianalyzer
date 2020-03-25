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
/**
 * Allows the sidebar to be toggled via click.
 */
var SidebarToggleDirective = (function () {
    function SidebarToggleDirective() {
    }
    //Check if element has class
    SidebarToggleDirective.prototype.hasClass = function (target, elementClassName) {
        return new RegExp("(\\s|^)" + elementClassName + "(\\s|$)").test(target.className);
    };
    //Toggle element class
    SidebarToggleDirective.prototype.toggleClass = function (elem, elementClassName) {
        var newClass = " " + elem.className.replace(/[\t\r\n]/g, " ") + " ";
        if (this.hasClass(elem, elementClassName)) {
            while (newClass.indexOf(" " + elementClassName + " ") >= 0) {
                newClass = newClass.replace(" " + elementClassName + " ", " ");
            }
            elem.className = newClass.replace(/^\s+|\s+$/g, "");
        }
        else {
            elem.className += " " + elementClassName;
        }
    };
    SidebarToggleDirective.prototype.toggleOpen = function ($event) {
        $event.preventDefault();
        var bodyClass = localStorage.getItem("body-class");
        if (this.hasClass(document.querySelector("body"), "sidebar-off-canvas")) {
            this.toggleClass(document.querySelector("body"), "sidebar-opened");
            this.toggleClass(document.querySelector("html"), "sidebar-opened");
        }
        else if (this.hasClass(document.querySelector("body"), "sidebar-nav") || bodyClass == "sidebar-nav") {
            this.toggleClass(document.querySelector("body"), "sidebar-nav");
            localStorage.setItem("body-class", "sidebar-nav");
            if (bodyClass == "sidebar-nav") {
                localStorage.removeItem("body-class");
            }
        }
    };
    return SidebarToggleDirective;
}());
__decorate([
    core_1.HostListener("click", ["$event"]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SidebarToggleDirective.prototype, "toggleOpen", null);
SidebarToggleDirective = __decorate([
    core_1.Directive({
        selector: ".sidebar-toggle",
    }),
    __metadata("design:paramtypes", [])
], SidebarToggleDirective);
exports.SidebarToggleDirective = SidebarToggleDirective;
/**
 * Allows the off-canvas sidebar to be closed via click.
 */
var SidebarOffCanvasCloseDirective = (function () {
    function SidebarOffCanvasCloseDirective() {
    }
    //Check if element has class
    SidebarOffCanvasCloseDirective.prototype.hasClass = function (target, elementClassName) {
        return new RegExp("(\\s|^)" + elementClassName + "(\\s|$)").test(target.className);
    };
    //Toggle element class
    SidebarOffCanvasCloseDirective.prototype.toggleClass = function (elem, elementClassName) {
        var newClass = " " + elem.className.replace(/[\t\r\n]/g, " ") + " ";
        if (this.hasClass(elem, elementClassName)) {
            while (newClass.indexOf(" " + elementClassName + " ") >= 0) {
                newClass = newClass.replace(" " + elementClassName + " ", " ");
            }
            elem.className = newClass.replace(/^\s+|\s+$/g, "");
        }
        else {
            elem.className += " " + elementClassName;
        }
    };
    SidebarOffCanvasCloseDirective.prototype.toggleOpen = function ($event) {
        $event.preventDefault();
        if (this.hasClass(document.querySelector("body"), "sidebar-off-canvas")) {
            this.toggleClass(document.querySelector("body"), "sidebar-opened");
        }
    };
    return SidebarOffCanvasCloseDirective;
}());
__decorate([
    core_1.HostListener("click", ["$event"]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SidebarOffCanvasCloseDirective.prototype, "toggleOpen", null);
SidebarOffCanvasCloseDirective = __decorate([
    core_1.Directive({
        selector: ".sidebar-close",
    }),
    __metadata("design:paramtypes", [])
], SidebarOffCanvasCloseDirective);
exports.SidebarOffCanvasCloseDirective = SidebarOffCanvasCloseDirective;
exports.SIDEBAR_TOGGLE_DIRECTIVES = [SidebarToggleDirective, SidebarOffCanvasCloseDirective];

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRpcmVjdGl2ZXMvc2lkZWJhci5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHNDQUF3RDtBQUV4RDs7R0FFRztBQUlIO0lBQ0k7SUFBZ0IsQ0FBQztJQUVqQiw0QkFBNEI7SUFDcEIseUNBQVEsR0FBaEIsVUFBaUIsTUFBVSxFQUFFLGdCQUF1QjtRQUNoRCxNQUFNLENBQUMsSUFBSSxNQUFNLENBQUMsU0FBUyxHQUFHLGdCQUFnQixHQUFHLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDdkYsQ0FBQztJQUVELHNCQUFzQjtJQUNkLDRDQUFXLEdBQW5CLFVBQW9CLElBQVEsRUFBRSxnQkFBdUI7UUFDakQsSUFBSSxRQUFRLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFFLFdBQVcsRUFBRSxHQUFHLENBQUUsR0FBRyxHQUFHLENBQUM7UUFDdEUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDeEMsT0FBTyxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsR0FBRyxnQkFBZ0IsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUcsQ0FBQztnQkFDMUQsUUFBUSxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUUsR0FBRyxHQUFHLGdCQUFnQixHQUFHLEdBQUcsRUFBRyxHQUFHLENBQUUsQ0FBQztZQUN0RSxDQUFDO1lBQ0QsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxFQUFFLENBQUMsQ0FBQztRQUN4RCxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixJQUFJLENBQUMsU0FBUyxJQUFJLEdBQUcsR0FBRyxnQkFBZ0IsQ0FBQztRQUM3QyxDQUFDO0lBQ0wsQ0FBQztJQUdELDJDQUFVLEdBQVYsVUFBVyxN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QVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLEVBQUUsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxFQUFFLGdCQUFnQixDQUFDLENBQUM7UUFDdkUsQ0FBQztJQUNMLENBQUM7SUFDTCxxQ0FBQztBQUFELENBN0JBLEFBNkJDLElBQUE7QUFQRztJQURDLG1CQUFZLENBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7Ozs7Z0VBT2pDO0FBNUJMO0lBSEMsZ0JBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxnQkFBZ0I7S0FDN0IsQ0FBQzs7a0NBOEJEO0FBN0JZLHlDQUFBLDhCQUE4QixDQUFBO0FBK0I5QixRQUFBLHlCQUF5QixHQUFHLENBQUMsc0JBQXNCLEVBQUUsOEJBQThCLENBQUMsQ0FBQyIsImZpbGUiOiJkaXJlY3RpdmVzL3NpZGViYXIuZGlyZWN0aXZlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBIb3N0TGlzdGVuZXIgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuXG4vKipcbiAqIEFsbG93cyB0aGUgc2lkZWJhciB0byBiZSB0b2dnbGVkIHZpYSBjbGljay5cbiAqL1xuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6IFwiLnNpZGViYXItdG9nZ2xlXCIsXG59KVxuZXhwb3J0IGNsYXNzIFNpZGViYXJUb2dnbGVEaXJlY3RpdmUge1xuICAgIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgICAvL0NoZWNrIGlmIGVsZW1lbnQgaGFzIGNsYXNzXG4gICAgcHJpdmF0ZSBoYXNDbGFzcyh0YXJnZXQ6YW55LCBlbGVtZW50Q2xhc3NOYW1lOnN0cmluZykge1xuICAgICAgICByZXR1cm4gbmV3IFJlZ0V4cChcIihcXFxcc3xeKVwiICsgZWxlbWVudENsYXNzTmFtZSArIFwiKFxcXFxzfCQpXCIpLnRlc3QodGFyZ2V0LmNsYXNzTmFtZSk7XG4gICAgfVxuXG4gICAgLy9Ub2dnbGUgZWxlbWVudCBjbGFzc1xuICAgIHByaXZhdGUgdG9nZ2xlQ2xhc3MoZWxlbTphbnksIGVsZW1lbnRDbGFzc05hbWU6c3RyaW5nKSB7XG4gICAgICAgIGxldCBuZXdDbGFzcyA9IFwiIFwiICsgZWxlbS5jbGFzc05hbWUucmVwbGFjZSggL1tcXHRcXHJcXG5dL2csIFwiIFwiICkgKyBcIiBcIjtcbiAgICAgICAgaWYgKHRoaXMuaGFzQ2xhc3MoZWxlbSwgZWxlbWVudENsYXNzTmFtZSkpIHtcbiAgICAgICAgICAgIHdoaWxlIChuZXdDbGFzcy5pbmRleE9mKFwiIFwiICsgZWxlbWVudENsYXNzTmFtZSArIFwiIFwiKSA+PSAwICkge1xuICAgICAgICAgICAgICAgIG5ld0NsYXNzID0gbmV3Q2xhc3MucmVwbGFjZSggXCIgXCIgKyBlbGVtZW50Q2xhc3NOYW1lICsgXCIgXCIgLCBcIiBcIiApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxlbS5jbGFzc05hbWUgPSBuZXdDbGFzcy5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCBcIlwiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGVsZW0uY2xhc3NOYW1lICs9IFwiIFwiICsgZWxlbWVudENsYXNzTmFtZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoXCJjbGlja1wiLCBbXCIkZXZlbnRcIl0pXG4gICAgdG9nZ2xlT3BlbigkZXZlbnQ6YW55KSB7XG4gICAgICAgICRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIGxldCBib2R5Q2xhc3MgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImJvZHktY2xhc3NcIik7XG5cbiAgICAgICAgaWYgKHRoaXMuaGFzQ2xhc3MoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJvZHlcIiksIFwic2lkZWJhci1vZmYtY2FudmFzXCIpKSB7XG4gICAgICAgICAgICB0aGlzLnRvZ2dsZUNsYXNzKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJib2R5XCIpLCBcInNpZGViYXItb3BlbmVkXCIpO1xuICAgICAgICAgICAgdGhpcy50b2dnbGVDbGFzcyhkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiaHRtbFwiKSwgXCJzaWRlYmFyLW9wZW5lZFwiKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmhhc0NsYXNzKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJib2R5XCIpLCBcInNpZGViYXItbmF2XCIpIHx8IGJvZHlDbGFzcyA9PSBcInNpZGViYXItbmF2XCIpIHtcbiAgICAgICAgICAgIHRoaXMudG9nZ2xlQ2xhc3MoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJvZHlcIiksIFwic2lkZWJhci1uYXZcIik7XG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcImJvZHktY2xhc3NcIiwgXCJzaWRlYmFyLW5hdlwiKTtcbiAgICAgICAgICAgIGlmIChib2R5Q2xhc3MgPT0gXCJzaWRlYmFyLW5hdlwiKSB7XG4gICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oXCJib2R5LWNsYXNzXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG4vKipcbiAqIEFsbG93cyB0aGUgb2ZmLWNhbnZhcyBzaWRlYmFyIHRvIGJlIGNsb3NlZCB2aWEgY2xpY2suXG4gKi9cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiBcIi5zaWRlYmFyLWNsb3NlXCIsXG59KVxuZXhwb3J0IGNsYXNzIFNpZGViYXJPZmZDYW52YXNDbG9zZURpcmVjdGl2ZSB7XG4gICAgY29uc3RydWN0b3IoKSB7IH1cblxuICAgIC8vQ2hlY2sgaWYgZWxlbWVudCBoYXMgY2xhc3NcbiAgICBwcml2YXRlIGhhc0NsYXNzKHRhcmdldDphbnksIGVsZW1lbnRDbGFzc05hbWU6c3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBuZXcgUmVnRXhwKFwiKFxcXFxzfF4pXCIgKyBlbGVtZW50Q2xhc3NOYW1lICsgXCIoXFxcXHN8JClcIikudGVzdCh0YXJnZXQuY2xhc3NOYW1lKTtcbiAgICB9XG5cbiAgICAvL1RvZ2dsZSBlbGVtZW50IGNsYXNzXG4gICAgcHJpdmF0ZSB0b2dnbGVDbGFzcyhlbGVtOmFueSwgZWxlbWVudENsYXNzTmFtZTpzdHJpbmcpIHtcbiAgICAgICAgbGV0IG5ld0NsYXNzID0gXCIgXCIgKyBlbGVtLmNsYXNzTmFtZS5yZXBsYWNlKCAvW1xcdFxcclxcbl0vZywgXCIgXCIgKSArIFwiIFwiO1xuICAgICAgICBpZiAodGhpcy5oYXNDbGFzcyhlbGVtLCBlbGVtZW50Q2xhc3NOYW1lKSkge1xuICAgICAgICAgICAgd2hpbGUgKG5ld0NsYXNzLmluZGV4T2YoXCIgXCIgKyBlbGVtZW50Q2xhc3NOYW1lICsgXCIgXCIpID49IDAgKSB7XG4gICAgICAgICAgICAgICAgbmV3Q2xhc3MgPSBuZXdDbGFzcy5yZXBsYWNlKCBcIiBcIiArIGVsZW1lbnRDbGFzc05hbWUgKyBcIiBcIiAsIFwiIFwiICk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbGVtLmNsYXNzTmFtZSA9IG5ld0NsYXNzLnJlcGxhY2UoL15cXHMrfFxccyskL2csIFwiXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZWxlbS5jbGFzc05hbWUgKz0gXCIgXCIgKyBlbGVtZW50Q2xhc3NOYW1lO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcihcImNsaWNrXCIsIFtcIiRldmVudFwiXSlcbiAgICB0b2dnbGVPcGVuKCRldmVudDphbnkpIHtcbiAgICAgICAgJGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgaWYgKHRoaXMuaGFzQ2xhc3MoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJvZHlcIiksIFwic2lkZWJhci1vZmYtY2FudmFzXCIpKSB7XG4gICAgICAgICAgICB0aGlzLnRvZ2dsZUNsYXNzKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJib2R5XCIpLCBcInNpZGViYXItb3BlbmVkXCIpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgY29uc3QgU0lERUJBUl9UT0dHTEVfRElSRUNUSVZFUyA9IFtTaWRlYmFyVG9nZ2xlRGlyZWN0aXZlLCBTaWRlYmFyT2ZmQ2FudmFzQ2xvc2VEaXJlY3RpdmVdO1xuIl19
