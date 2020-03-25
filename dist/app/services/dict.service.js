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
 * Created by zhongping.lu on 10/18/2016.
 */
var core_1 = require("@angular/core");
var exception_service_1 = require("./exception.service");
var rxjs_1 = require("rxjs");
var api_util_1 = require("../utils/api.util");
var ng2_translate_1 = require("ng2-translate/ng2-translate");
var rest_service_1 = require("./rest.service");
var DictService = (function () {
    function DictService(rest, exceptionService, i18n) {
        this.rest = rest;
        this.exceptionService = exceptionService;
        this.i18n = i18n;
    }
    DictService.prototype.getDicts = function () {
        var _this = this;
        return rxjs_1.Observable.create(function (observer) {
            _this.rest.queryRestApi({
                type: api_util_1.API_TYPE.R_DICTS,
                urlParams: { from: 0, size: 100 }
            }).subscribe(function (resp) {
                observer.next(resp.json());
                observer.complete();
            }, function (error) {
                _this.exceptionService.handleError(error, observer);
            });
        });
    };
    DictService.prototype.getKvPairs = function (dict) {
        var _this = this;
        return rxjs_1.Observable.create(function (observer) {
            _this.rest.queryRestApi({
                type: api_util_1.API_TYPE.R_KV,
                urlParams: { id: dict.id, from: 0, size: 100 }
            }).subscribe(function (resp) {
                observer.next(resp.json());
                observer.complete();
            }, function (error) { return _this.exceptionService.handleError(error, observer); });
        });
    };
    DictService.prototype.updateDict = function (dict) {
        var _this = this;
        return rxjs_1.Observable.create(function (observer) {
            _this.rest.queryRestApi({
                type: api_util_1.API_TYPE.U_DICT,
                urlParams: { id: dict.id },
                body: dict
            }).subscribe(function (resp) {
                observer.next(resp.json());
                observer.complete();
            }, function (error) { return _this.exceptionService.handleError(error, observer); });
        });
    };
    DictService.prototype.deleteDict = function (dict) {
        var _this = this;
        return rxjs_1.Observable.create(function (observer) {
            _this.rest.queryRestApi({
                type: api_util_1.API_TYPE.D_DICT,
                urlParams: { id: dict.id }
            }).subscribe(function (resp) {
                observer.next(resp.json());
                observer.complete();
            }, function (error) { return _this.exceptionService.handleError(error, observer); });
        });
    };
    DictService.prototype.deleteKvPair = function (pair) {
        var _this = this;
        return rxjs_1.Observable.create(function (observer) {
            _this.rest.queryRestApi({
                type: api_util_1.API_TYPE.D_KV,
                urlParams: { id: pair.domain, kvid: pair.id }
            }).subscribe(function (resp) {
                observer.next(resp.json());
                observer.complete();
            }, function (error) { return _this.exceptionService.handleError(error, observer); });
        });
    };
    DictService.prototype.createDict = function (dict) {
        var _this = this;
        return rxjs_1.Observable.create(function (observer) {
            _this.rest.queryRestApi({
                type: api_util_1.API_TYPE.C_DICT,
                body: dict
            }).subscribe(function (resp) {
                observer.next(resp.json());
                observer.complete();
            }, function (error) { return _this.exceptionService.handleError(error, observer); });
        });
    };
    DictService.prototype.createKvPair = function (pair) {
        var _this = this;
        return rxjs_1.Observable.create(function (observer) {
            _this.rest.queryRestApi({
                type: api_util_1.API_TYPE.C_KV,
                urlParams: { id: pair.domain },
                body: pair
            }).subscribe(function (resp) {
                observer.next(resp.json());
                observer.complete();
            }, function (error) { return _this.exceptionService.handleError(error, observer); });
        });
    };
    DictService.prototype.updateKvPair = function (pair) {
        var _this = this;
        return rxjs_1.Observable.create(function (observer) {
            _this.rest.queryRestApi({
                type: api_util_1.API_TYPE.U_KV,
                urlParams: { id: pair.domain, kvid: pair.id },
                body: pair
            }).subscribe(function (resp) {
                observer.next(resp.json());
                observer.complete();
            }, function (error) { return _this.exceptionService.handleError(error, observer); });
        });
    };
    DictService.prototype.createDictInMemory = function (fragment) {
        return {
            domaincode: this.i18n.instant("admin.dict.generalDomainCode", { index: fragment }),
            domainnamecn: this.i18n.instant("admin.dict.generalDomainName", { index: fragment }),
            domainnameen: this.i18n.instant("admin.dict.generalDomainName", { index: fragment }),
            isCodeEditable: true
        };
    };
    DictService.prototype.createKvPairInMemory = function (dict, fragment) {
        return {
            domainvaluecode: this.i18n.instant("admin.dict.generalDomainValueCode", { index: fragment }),
            domainvaluecn: this.i18n.instant("admin.dict.generalDomainValueName", { index: fragment }),
            domainvalueen: this.i18n.instant("admin.dict.generalDomainValueName", { index: fragment }),
            domain: dict.id,
            isCodeEditable: true
        };
    };
    return DictService;
}());
DictService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [rest_service_1.RestService, exception_service_1.ExceptionService, ng2_translate_1.TranslateService])
], DictService);
exports.DictService = DictService;

//# sourceMappingURL=data:application/json;charset=utf8;base64,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S0FBSyxFQUFHLFFBQVEsRUFBQyxDQUFDO1lBQ3BGLGNBQWMsRUFBRyxJQUFJO1NBQ3ZCLENBQUM7SUFDTCxDQUFDO0lBRUQsMENBQW9CLEdBQXBCLFVBQXFCLElBQW9CLEVBQUUsUUFBdUI7UUFDL0QsTUFBTSxDQUFDO1lBQ0osZUFBZSxFQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLG1DQUFtQyxFQUFFLEVBQUMsS0FBSyxFQUFHLFFBQVEsRUFBQyxDQUFDO1lBQzVGLGFBQWEsRUFBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxtQ0FBbUMsRUFBRSxFQUFDLEtBQUssRUFBRyxRQUFRLEVBQUMsQ0FBQztZQUMxRixhQUFhLEVBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsbUNBQW1DLEVBQUUsRUFBQyxLQUFLLEVBQUcsUUFBUSxFQUFDLENBQUM7WUFDMUYsTUFBTSxFQUFHLElBQUksQ0FBQyxFQUFFO1lBQ2hCLGNBQWMsRUFBRyxJQUFJO1NBQ3ZCLENBQUE7SUFDSixDQUFDO0lBQ0osa0JBQUM7QUFBRCxDQTVIQSxBQTRIQyxJQUFBO0FBNUhEO0lBREMsaUJBQVUsRUFBRTtxQ0FFZ0IsMEJBQVcsRUFBNkIsb0NBQWdCLEVBQWdCLGdDQUFnQjtlQTJIcEg7QUE1SFksc0JBQUEsV0FBVyxDQUFBIiwiZmlsZSI6InNlcnZpY2VzL2RpY3Quc2VydmljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ3JlYXRlZCBieSB6aG9uZ3BpbmcubHUgb24gMTAvMTgvMjAxNi5cbiAqL1xuaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtIdHRwfSBmcm9tIFwiQGFuZ3VsYXIvaHR0cFwiO1xuaW1wb3J0IHtFeGNlcHRpb25TZXJ2aWNlfSBmcm9tIFwiLi9leGNlcHRpb24uc2VydmljZVwiO1xuaW1wb3J0IHtPYnNlcnZhYmxlLCBPYnNlcnZlcn0gZnJvbSBcInJ4anNcIjtcbmltcG9ydCB7UGFnZWRJdGVtU2V0LCBSZXNwb25zZVN0YXR1c30gZnJvbSBcIi4uL21vZGVscy9nZW5lcmFsLm1vZGVsXCI7XG5pbXBvcnQge0RhdGFEaWN0aW9uYXJ5LCBLdlBhaXJ9IGZyb20gXCIuLi9tb2RlbHMvZGljdC5tb2RlbFwiO1xuaW1wb3J0IHtBUElzLCBBUElfVFlQRX0gZnJvbSBcIi4uL3V0aWxzL2FwaS51dGlsXCI7XG5pbXBvcnQge1RyYW5zbGF0ZVNlcnZpY2V9IGZyb20gXCJuZzItdHJhbnNsYXRlL25nMi10cmFuc2xhdGVcIjtcbmltcG9ydCB7UmVzdFNlcnZpY2V9IGZyb20gXCIuL3Jlc3Quc2VydmljZVwiO1xuXG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBEaWN0U2VydmljZSB7XG4gICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlc3Q6IFJlc3RTZXJ2aWNlLCBwcml2YXRlIGV4Y2VwdGlvblNlcnZpY2U6ICBFeGNlcHRpb25TZXJ2aWNlLCBwcml2YXRlIGkxOG46IFRyYW5zbGF0ZVNlcnZpY2UpIHt9XG5cbiAgIGdldERpY3RzKCk6ICBPYnNlcnZhYmxlPFBhZ2VkSXRlbVNldDxEYXRhRGljdGlvbmFyeT4+IHtcbiAgICAgIHJldHVybiBPYnNlcnZhYmxlLmNyZWF0ZSgob2JzZXJ2ZXI6ICBPYnNlcnZlcjxQYWdlZEl0ZW1TZXQ8RGF0YURpY3Rpb25hcnk+PikgPT4ge1xuICAgICAgICAgdGhpcy5yZXN0LnF1ZXJ5UmVzdEFwaSh7XG4gICAgICAgICAgICB0eXBlOiAgQVBJX1RZUEUuUl9ESUNUUyxcbiAgICAgICAgICAgIHVybFBhcmFtczogIHtmcm9tOiAgMCwgc2l6ZTogIDEwMH1cbiAgICAgICAgIH0pLnN1YnNjcmliZShyZXNwID0+IHtcbiAgICAgICAgICAgIG9ic2VydmVyLm5leHQocmVzcC5qc29uKCkpO1xuICAgICAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcbiAgICAgICAgIH0sIGVycm9yID0+IHtcbiAgICAgICAgICAgIHRoaXMuZXhjZXB0aW9uU2VydmljZS5oYW5kbGVFcnJvcihlcnJvciwgb2JzZXJ2ZXIpO1xuICAgICAgICAgfSlcbiAgICAgIH0pO1xuICAgfVxuXG4gICBnZXRLdlBhaXJzKGRpY3Q6IERhdGFEaWN0aW9uYXJ5KTogT2JzZXJ2YWJsZTxQYWdlZEl0ZW1TZXQ8S3ZQYWlyPj4ge1xuXG4gICAgICByZXR1cm4gT2JzZXJ2YWJsZS5jcmVhdGUoKG9ic2VydmVyOiAgT2JzZXJ2ZXI8UGFnZWRJdGVtU2V0PEt2UGFpcj4+KSA9PiB7XG4gICAgICAgICB0aGlzLnJlc3QucXVlcnlSZXN0QXBpKHtcbiAgICAgICAgICAgIHR5cGU6ICBBUElfVFlQRS5SX0tWLFxuICAgICAgICAgICAgdXJsUGFyYW1zOiAge2lkOiAgZGljdC5pZCwgZnJvbTogIDAsIHNpemU6ICAxMDB9XG4gICAgICAgICB9KS5zdWJzY3JpYmUocmVzcCA9PiB7XG5cbiAgICAgICAgICAgIG9ic2VydmVyLm5leHQocmVzcC5qc29uKCkpO1xuICAgICAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcbiAgICAgICAgIH0sIGVycm9yID0+IHRoaXMuZXhjZXB0aW9uU2VydmljZS5oYW5kbGVFcnJvcihlcnJvciwgb2JzZXJ2ZXIpKTtcbiAgICAgIH0pO1xuICAgfVxuXG4gICB1cGRhdGVEaWN0KGRpY3Q6IERhdGFEaWN0aW9uYXJ5KTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgIHJldHVybiBPYnNlcnZhYmxlLmNyZWF0ZSgob2JzZXJ2ZXI6IE9ic2VydmVyPGFueT4pID0+IHtcbiAgICAgICAgIHRoaXMucmVzdC5xdWVyeVJlc3RBcGkoe1xuICAgICAgICAgICAgdHlwZTogIEFQSV9UWVBFLlVfRElDVCxcbiAgICAgICAgICAgIHVybFBhcmFtczogIHtpZDogIGRpY3QuaWR9LFxuICAgICAgICAgICAgYm9keTogIGRpY3RcbiAgICAgICAgIH0pLnN1YnNjcmliZShyZXNwID0+IHtcbiAgICAgICAgICAgIG9ic2VydmVyLm5leHQocmVzcC5qc29uKCkpO1xuICAgICAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcbiAgICAgICAgIH0sIGVycm9yID0+IHRoaXMuZXhjZXB0aW9uU2VydmljZS5oYW5kbGVFcnJvcihlcnJvciwgb2JzZXJ2ZXIpKTtcbiAgICAgIH0pO1xuICAgfVxuXG4gICBkZWxldGVEaWN0KGRpY3Q6IERhdGFEaWN0aW9uYXJ5KTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgIHJldHVybiBPYnNlcnZhYmxlLmNyZWF0ZSgob2JzZXJ2ZXI6IE9ic2VydmVyPGFueT4pID0+IHtcbiAgICAgICAgIHRoaXMucmVzdC5xdWVyeVJlc3RBcGkoe1xuICAgICAgICAgICAgdHlwZTogIEFQSV9UWVBFLkRfRElDVCxcbiAgICAgICAgICAgIHVybFBhcmFtczogIHtpZDogIGRpY3QuaWR9XG4gICAgICAgICB9KS5zdWJzY3JpYmUocmVzcCA9PiB7XG4gICAgICAgICAgICBvYnNlcnZlci5uZXh0KHJlc3AuanNvbigpKTtcbiAgICAgICAgICAgIG9ic2VydmVyLmNvbXBsZXRlKCk7XG4gICAgICAgICB9LCBlcnJvciA9PiB0aGlzLmV4Y2VwdGlvblNlcnZpY2UuaGFuZGxlRXJyb3IoZXJyb3IsIG9ic2VydmVyKSk7XG4gICAgICB9KTtcbiAgIH1cblxuICAgZGVsZXRlS3ZQYWlyKHBhaXI6IEt2UGFpcik6IE9ic2VydmFibGU8UmVzcG9uc2VTdGF0dXM+IHtcbiAgICAgIHJldHVybiBPYnNlcnZhYmxlLmNyZWF0ZSgob2JzZXJ2ZXI6IE9ic2VydmVyPFJlc3BvbnNlU3RhdHVzPikgPT4ge1xuICAgICAgICAgdGhpcy5yZXN0LnF1ZXJ5UmVzdEFwaSh7XG4gICAgICAgICAgICB0eXBlOiAgQVBJX1RZUEUuRF9LVixcbiAgICAgICAgICAgIHVybFBhcmFtczogIHtpZDogIHBhaXIuZG9tYWluLCBrdmlkOiAgcGFpci5pZH1cbiAgICAgICAgIH0pLnN1YnNjcmliZShyZXNwID0+IHtcbiAgICAgICAgICAgIG9ic2VydmVyLm5leHQocmVzcC5qc29uKCkpO1xuICAgICAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcbiAgICAgICAgIH0sIGVycm9yID0+IHRoaXMuZXhjZXB0aW9uU2VydmljZS5oYW5kbGVFcnJvcihlcnJvciwgb2JzZXJ2ZXIpKTtcbiAgICAgIH0pO1xuICAgfVxuXG4gICBjcmVhdGVEaWN0KGRpY3Q6IERhdGFEaWN0aW9uYXJ5KTogT2JzZXJ2YWJsZTxEYXRhRGljdGlvbmFyeT4ge1xuICAgICAgcmV0dXJuIE9ic2VydmFibGUuY3JlYXRlKChvYnNlcnZlcjogT2JzZXJ2ZXI8RGF0YURpY3Rpb25hcnk+KSA9PiB7XG4gICAgICAgICB0aGlzLnJlc3QucXVlcnlSZXN0QXBpKHtcbiAgICAgICAgICAgIHR5cGU6ICBBUElfVFlQRS5DX0RJQ1QsXG4gICAgICAgICAgICBib2R5OiAgZGljdFxuICAgICAgICAgfSkuc3Vic2NyaWJlKHJlc3AgPT4ge1xuICAgICAgICAgICAgb2JzZXJ2ZXIubmV4dChyZXNwLmpzb24oKSk7XG4gICAgICAgICAgICBvYnNlcnZlci5jb21wbGV0ZSgpO1xuICAgICAgICAgfSwgZXJyb3IgPT4gdGhpcy5leGNlcHRpb25TZXJ2aWNlLmhhbmRsZUVycm9yKGVycm9yLCBvYnNlcnZlcikpO1xuICAgICAgfSk7XG4gICB9XG5cbiAgIGNyZWF0ZUt2UGFpcihwYWlyOiBLdlBhaXIpOiBPYnNlcnZhYmxlPFJlc3BvbnNlU3RhdHVzPiB7XG4gICAgICByZXR1cm4gT2JzZXJ2YWJsZS5jcmVhdGUoKG9ic2VydmVyOiBPYnNlcnZlcjxSZXNwb25zZVN0YXR1cz4pID0+IHtcbiAgICAgICAgIHRoaXMucmVzdC5xdWVyeVJlc3RBcGkoe1xuICAgICAgICAgICAgdHlwZTogIEFQSV9UWVBFLkNfS1YsXG4gICAgICAgICAgICB1cmxQYXJhbXM6ICB7aWQ6ICBwYWlyLmRvbWFpbn0sXG4gICAgICAgICAgICBib2R5OiAgcGFpclxuICAgICAgICAgfSkuc3Vic2NyaWJlKHJlc3AgPT4ge1xuICAgICAgICAgICAgb2JzZXJ2ZXIubmV4dChyZXNwLmpzb24oKSk7XG4gICAgICAgICAgICBvYnNlcnZlci5jb21wbGV0ZSgpO1xuICAgICAgICAgfSwgZXJyb3IgPT4gdGhpcy5leGNlcHRpb25TZXJ2aWNlLmhhbmRsZUVycm9yKGVycm9yLCBvYnNlcnZlcikpO1xuICAgICAgfSk7XG4gICB9XG5cbiAgIHVwZGF0ZUt2UGFpcihwYWlyOiBLdlBhaXIpOiBPYnNlcnZhYmxlPFJlc3BvbnNlU3RhdHVzPiB7XG4gICAgICByZXR1cm4gT2JzZXJ2YWJsZS5jcmVhdGUoKG9ic2VydmVyOiBPYnNlcnZlcjxSZXNwb25zZVN0YXR1cz4pID0+IHtcbiAgICAgICAgIHRoaXMucmVzdC5xdWVyeVJlc3RBcGkoe1xuICAgICAgICAgICAgdHlwZTogIEFQSV9UWVBFLlVfS1YsXG4gICAgICAgICAgICB1cmxQYXJhbXM6ICB7aWQ6ICBwYWlyLmRvbWFpbiwga3ZpZDogIHBhaXIuaWR9LFxuICAgICAgICAgICAgYm9keTogIHBhaXJcbiAgICAgICAgIH0pLnN1YnNjcmliZShyZXNwID0+IHtcbiAgICAgICAgICAgIG9ic2VydmVyLm5leHQocmVzcC5qc29uKCkpO1xuICAgICAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcbiAgICAgICAgIH0sIGVycm9yID0+IHRoaXMuZXhjZXB0aW9uU2VydmljZS5oYW5kbGVFcnJvcihlcnJvciwgb2JzZXJ2ZXIpKTtcbiAgICAgIH0pO1xuICAgfVxuXG4gICBjcmVhdGVEaWN0SW5NZW1vcnkoZnJhZ21lbnQ6IHN0cmluZ3xudW1iZXIpOiBEYXRhRGljdGlvbmFyeSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICAgZG9tYWluY29kZTogIHRoaXMuaTE4bi5pbnN0YW50KFwiYWRtaW4uZGljdC5nZW5lcmFsRG9tYWluQ29kZVwiLCB7aW5kZXg6ICBmcmFnbWVudH0pLFxuICAgICAgICAgZG9tYWlubmFtZWNuOiAgdGhpcy5pMThuLmluc3RhbnQoXCJhZG1pbi5kaWN0LmdlbmVyYWxEb21haW5OYW1lXCIsIHtpbmRleDogIGZyYWdtZW50fSksXG4gICAgICAgICBkb21haW5uYW1lZW46ICB0aGlzLmkxOG4uaW5zdGFudChcImFkbWluLmRpY3QuZ2VuZXJhbERvbWFpbk5hbWVcIiwge2luZGV4OiAgZnJhZ21lbnR9KSxcbiAgICAgICAgIGlzQ29kZUVkaXRhYmxlOiAgdHJ1ZVxuICAgICAgfTtcbiAgIH1cblxuICAgY3JlYXRlS3ZQYWlySW5NZW1vcnkoZGljdDogRGF0YURpY3Rpb25hcnksIGZyYWdtZW50OiBzdHJpbmd8bnVtYmVyKTogS3ZQYWlyIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgICBkb21haW52YWx1ZWNvZGU6ICB0aGlzLmkxOG4uaW5zdGFudChcImFkbWluLmRpY3QuZ2VuZXJhbERvbWFpblZhbHVlQ29kZVwiLCB7aW5kZXg6ICBmcmFnbWVudH0pLFxuICAgICAgICAgZG9tYWludmFsdWVjbjogIHRoaXMuaTE4bi5pbnN0YW50KFwiYWRtaW4uZGljdC5nZW5lcmFsRG9tYWluVmFsdWVOYW1lXCIsIHtpbmRleDogIGZyYWdtZW50fSksXG4gICAgICAgICBkb21haW52YWx1ZWVuOiAgdGhpcy5pMThuLmluc3RhbnQoXCJhZG1pbi5kaWN0LmdlbmVyYWxEb21haW5WYWx1ZU5hbWVcIiwge2luZGV4OiAgZnJhZ21lbnR9KSxcbiAgICAgICAgIGRvbWFpbjogIGRpY3QuaWQsXG4gICAgICAgICBpc0NvZGVFZGl0YWJsZTogIHRydWVcbiAgICAgIH1cbiAgIH1cbn0iXX0=
