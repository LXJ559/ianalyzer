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
var CategoryPreview = (function () {
    function CategoryPreview() {
        this.gridOptions = {};
    }
    return CategoryPreview;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], CategoryPreview.prototype, "rowData", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], CategoryPreview.prototype, "columnDef", void 0);
CategoryPreview = __decorate([
    core_1.Component({
        selector: "category-preview",
        templateUrl: "views/admin/category.preview.html"
    }),
    __metadata("design:paramtypes", [])
], CategoryPreview);
exports.CategoryPreview = CategoryPreview;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvY2F0ZWdvcnkucHJldmlldy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOztHQUVHO0FBQ0gsc0NBQW1GO0FBWW5GO0lBT0c7UUFFRyxJQUFJLENBQUMsV0FBVyxHQUFHLEVBRWxCLENBQUE7SUFDSixDQUFDO0lBR0osc0JBQUM7QUFBRCxDQWZBLEFBZUMsSUFBQTtBQVpXO0lBQVIsWUFBSyxFQUFFOztnREFBUztBQUNSO0lBQVIsWUFBSyxFQUFFOztrREFBVztBQUp0QjtJQUpDLGdCQUFTLENBQUM7UUFDUixRQUFRLEVBQUUsa0JBQWtCO1FBQzVCLFdBQVcsRUFBRSxtQ0FBbUM7S0FDbEQsQ0FBQzs7bUJBZ0JEO0FBZlksMEJBQUEsZUFBZSxDQUFBIiwiZmlsZSI6ImNvbXBvbmVudHMvY2F0ZWdvcnkucHJldmlldy5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENyZWF0ZWQgYnkgemhvbmdwaW5nLmx1IG9uIDEwLzkvMjAxNi5cbiAqL1xuaW1wb3J0IHtDb21wb25lbnQsIElucHV0LCBWaWV3Q2hpbGQsIFF1ZXJ5TGlzdCwgVmlld0NoaWxkcmVufSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtQcmV2aWV3R3JpZERhdGEsIEZpbGVJdGVtfSBmcm9tIFwiLi4vbW9kZWxzL2ZpbGUubW9kZWxcIjtcbmltcG9ydCB7RmlsZVNlcnZpY2V9IGZyb20gXCIuLi9zZXJ2aWNlcy9maWxlLnNlcnZpY2VcIjtcbmltcG9ydCB7Tm90aWZpY2F0aW9uc1NlcnZpY2V9IGZyb20gXCJhbmd1bGFyMi1ub3RpZmljYXRpb25zL2NvbXBvbmVudHNcIjtcbmltcG9ydCB7R3JpZE9wdGlvbnN9IGZyb20gXCJhZy1ncmlkXCI7XG5pbXBvcnQge1RyYW5zbGF0ZVNlcnZpY2V9IGZyb20gXCJuZzItdHJhbnNsYXRlL25nMi10cmFuc2xhdGVcIjtcbmltcG9ydCB7R2VuZXJhbEV4Y2VwdGlvbn0gZnJvbSBcIi4uL21vZGVscy9leGNlcHRpb24ubW9kZWxcIjtcblxuQENvbXBvbmVudCh7XG4gICBzZWxlY3RvcjogXCJjYXRlZ29yeS1wcmV2aWV3XCIsXG4gICB0ZW1wbGF0ZVVybDogXCJ2aWV3cy9hZG1pbi9jYXRlZ29yeS5wcmV2aWV3Lmh0bWxcIlxufSlcbmV4cG9ydCBjbGFzcyBDYXRlZ29yeVByZXZpZXcge1xuICAgZ3JpZE9wdGlvbnM6R3JpZE9wdGlvbnM7XG5cbiAgIEBJbnB1dCgpIHJvd0RhdGE7XG4gICBASW5wdXQoKSBjb2x1bW5EZWY7XG5cblxuICAgY29uc3RydWN0b3IoKSB7XG5cbiAgICAgIHRoaXMuZ3JpZE9wdGlvbnMgPSB7XG4gICAgICAgICBcbiAgICAgIH1cbiAgIH1cblxuICAgXG59Il19
