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
 * Created by zhongping.lu on 10/26/2016.
 */
var core_1 = require("@angular/core");
var auth_service_1 = require("./auth.service");
var http_1 = require("@angular/http");
var rxjs_1 = require("rxjs");
var api_util_1 = require("../utils/api.util");
var RestService = (function () {
    function RestService(auth, http) {
        this.auth = auth;
        this.http = http;
    }
    RestService.prototype.fillToken = function (token) {
        this.auth.updateToken(token);
    };
    RestService.prototype.queryRestApi = function (params) {
        var _this = this;
        console.log(params, '+++++++++++++++++++++---------+++++++++++++++++++++');
        var _a = api_util_1.APIs[params.type], _ = _a[0], method = _a[1], contentType = _a[2];
        var headers = new http_1.Headers();
        var body;
        switch (contentType) {
            case api_util_1.CONTENT_TYPE.FILE:
                headers.append("content-type", "multipart/form-data");
                break;
            case api_util_1.CONTENT_TYPE.JSON:
                headers.append("content-type", "application/json");
                break;
            case api_util_1.CONTENT_TYPE.TEXT:
                headers.append("content-type", "application/text");
                break;
            default:
                headers.append("content-type", "application/json");
        }
        // headers.append("local", navigator.language || navigator.userLanguage);
        var token = this.auth.getToken().token;
        if (token) {
            headers.append("token", token);
            headers.append("username", this.auth.getToken().user.loginname);
        }
        if (params.headers) {
            for (var key in params.headers) {
                headers.append(key, params.headers[key]);
            }
        }
        if (params.body) {
            body = JSON.stringify(params.body);
        }
        if (params.page) {
            if (!params.urlParams) {
                params.urlParams = {};
            }
            params.urlParams["from"] = params.page.from;
            params.urlParams["size"] = params.page.size;
        }
        if (params.category) {
            if (!params.urlParams) {
                params.urlParams = {};
            }
            params.urlParams["category"] = params.category;
        }
        if (params.startTime) {
            if (!params.urlParams) {
                params.urlParams = {};
            }
            params.urlParams["startTime"] = params.startTime;
        }
        if (params.endTime) {
            if (!params.urlParams) {
                params.urlParams = {};
            }
            params.urlParams["endTime"] = params.endTime;
        }
        return rxjs_1.Observable.create(function (observer) {
            _this.http.request(api_util_1.APIs.getApiUri(params.type, params.urlParams), {
                headers: headers,
                method: method,
                body: body,
            }).subscribe(function (response) {
                //Token header handler
                console.log("=========**********+========" + response);
                _this.fillToken(response.headers.get("token"));
                observer.next(response);
                observer.complete();
            }, function (error) { return observer.error(error); });
        });
    };
    return RestService;
}());
RestService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [auth_service_1.AuthService, http_1.Http])
], RestService);
exports.RestService = RestService;

//# sourceMappingURL=data:application/json;charset=utf8;base64,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OUQsT0FBTyxFQUFHLE9BQU87Z0JBQ2pCLE1BQU0sRUFBRyxNQUF1QjtnQkFDaEMsSUFBSSxFQUFHLElBQUk7YUFDYixDQUFDLENBQUMsU0FBUyxDQUFDLFVBQUEsUUFBUTtnQkFDbEIsc0JBQXNCO2dCQUN0QixPQUFPLENBQUMsR0FBRyxDQUFDLDhCQUE4QixHQUFDLFFBQVEsQ0FBQyxDQUFBO2dCQUNwRCxLQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBRTlDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQ3hCLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUN2QixDQUFDLEVBQUUsVUFBQSxLQUFLLElBQUksT0FBQSxRQUFRLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFyQixDQUFxQixDQUFDLENBQUM7UUFDdEMsQ0FBQyxDQUFDLENBQUM7SUFDTixDQUFDO0lBQ0osa0JBQUM7QUFBRCxDQTNGQSxBQTJGQyxJQUFBO0FBM0ZEO0lBREMsaUJBQVUsRUFBRTtxQ0FHZ0IsMEJBQVcsRUFBZ0IsV0FBSTtlQXlGM0Q7QUEzRlksc0JBQUEsV0FBVyxDQUFBIiwiZmlsZSI6InNlcnZpY2VzL3Jlc3Quc2VydmljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ3JlYXRlZCBieSB6aG9uZ3BpbmcubHUgb24gMTAvMjYvMjAxNi5cbiAqL1xuaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtBdXRoU2VydmljZX0gZnJvbSBcIi4vYXV0aC5zZXJ2aWNlXCI7XG5pbXBvcnQge0h0dHAsIFJlc3BvbnNlLCBIZWFkZXJzLCBSZXF1ZXN0TWV0aG9kfSBmcm9tIFwiQGFuZ3VsYXIvaHR0cFwiO1xuaW1wb3J0IHtSZXF1ZXN0UGFyYW1zfSBmcm9tIFwiLi4vbW9kZWxzL2dlbmVyYWwubW9kZWxcIjtcbmltcG9ydCB7T2JzZXJ2YWJsZSwgT2JzZXJ2ZXJ9IGZyb20gXCJyeGpzXCI7XG5pbXBvcnQge0FQSXMsIENPTlRFTlRfVFlQRX0gZnJvbSBcIi4uL3V0aWxzL2FwaS51dGlsXCI7XG5cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFJlc3RTZXJ2aWNlIHtcblxuICAgY29uc3RydWN0b3IocHJpdmF0ZSBhdXRoOiBBdXRoU2VydmljZSwgcHJpdmF0ZSBodHRwOiBIdHRwKSB7fVxuXG4gICBmaWxsVG9rZW4odG9rZW46IHN0cmluZyk6IHZvaWQge1xuICAgICAgdGhpcy5hdXRoLnVwZGF0ZVRva2VuKHRva2VuKTtcbiAgIH1cblxuICAgcXVlcnlSZXN0QXBpKHBhcmFtczogUmVxdWVzdFBhcmFtcyk6IE9ic2VydmFibGU8UmVzcG9uc2U+IHtcbiAgICAgIGNvbnNvbGUubG9nKHBhcmFtcywnKysrKysrKysrKysrKysrKysrKysrLS0tLS0tLS0tKysrKysrKysrKysrKysrKysrKysrJylcbiAgICAgIGxldCBbXywgbWV0aG9kLCBjb250ZW50VHlwZV0gPSBBUElzW3BhcmFtcy50eXBlXTtcbiAgICAgIGxldCBoZWFkZXJzOiBIZWFkZXJzID0gbmV3IEhlYWRlcnMoKTtcbiAgICAgIGxldCBib2R5OiBzdHJpbmc7XG5cbiAgICAgIHN3aXRjaCAoY29udGVudFR5cGUpIHtcbiAgICAgICAgIGNhc2UgQ09OVEVOVF9UWVBFLkZJTEU6XG4gICAgICAgICAgICBoZWFkZXJzLmFwcGVuZChcImNvbnRlbnQtdHlwZVwiLCBcIm11bHRpcGFydC9mb3JtLWRhdGFcIik7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgIGNhc2UgQ09OVEVOVF9UWVBFLkpTT046XG4gICAgICAgICAgICBoZWFkZXJzLmFwcGVuZChcImNvbnRlbnQtdHlwZVwiLCBcImFwcGxpY2F0aW9uL2pzb25cIik7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgIGNhc2UgQ09OVEVOVF9UWVBFLlRFWFQ6XG4gICAgICAgICAgICBoZWFkZXJzLmFwcGVuZChcImNvbnRlbnQtdHlwZVwiLCBcImFwcGxpY2F0aW9uL3RleHRcIik7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBoZWFkZXJzLmFwcGVuZChcImNvbnRlbnQtdHlwZVwiLCBcImFwcGxpY2F0aW9uL2pzb25cIik7XG4gICAgICB9XG5cbiAgICAgIC8vIGhlYWRlcnMuYXBwZW5kKFwibG9jYWxcIiwgbmF2aWdhdG9yLmxhbmd1YWdlIHx8IG5hdmlnYXRvci51c2VyTGFuZ3VhZ2UpO1xuXG4gICAgICBsZXQgdG9rZW4gPSB0aGlzLmF1dGguZ2V0VG9rZW4oKS50b2tlbjtcblxuICAgICAgaWYgKHRva2VuKSB7XG4gICAgICAgICBoZWFkZXJzLmFwcGVuZChcInRva2VuXCIsIHRva2VuKTtcbiAgICAgICAgIGhlYWRlcnMuYXBwZW5kKFwidXNlcm5hbWVcIiwgdGhpcy5hdXRoLmdldFRva2VuKCkudXNlci5sb2dpbm5hbWUpO1xuICAgICAgfVxuXG4gICAgICBpZiAocGFyYW1zLmhlYWRlcnMpIHtcbiAgICAgICAgIGZvciAobGV0IGtleSBpbiBwYXJhbXMuaGVhZGVycykge1xuICAgICAgICAgICAgaGVhZGVycy5hcHBlbmQoa2V5LCBwYXJhbXMuaGVhZGVyc1trZXldKTtcbiAgICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHBhcmFtcy5ib2R5KSB7XG4gICAgICAgICBib2R5ID0gSlNPTi5zdHJpbmdpZnkocGFyYW1zLmJvZHkpO1xuICAgICAgfVxuXG4gICAgICBpZiAocGFyYW1zLnBhZ2UpIHtcbiAgICAgICAgIGlmICghcGFyYW1zLnVybFBhcmFtcykge1xuICAgICAgICAgICAgcGFyYW1zLnVybFBhcmFtcyA9IHt9O1xuICAgICAgICAgfVxuICAgICAgICAgcGFyYW1zLnVybFBhcmFtc1tcImZyb21cIl0gPSBwYXJhbXMucGFnZS5mcm9tO1xuICAgICAgICAgcGFyYW1zLnVybFBhcmFtc1tcInNpemVcIl0gPSBwYXJhbXMucGFnZS5zaXplO1xuICAgICAgfVxuXG4gICAgICBpZihwYXJhbXMuY2F0ZWdvcnkpe1xuICAgICAgICAgaWYgKCFwYXJhbXMudXJsUGFyYW1zKSB7XG4gICAgICAgICAgICBwYXJhbXMudXJsUGFyYW1zID0ge307XG4gICAgICAgICB9XG4gICAgICAgICBwYXJhbXMudXJsUGFyYW1zW1wiY2F0ZWdvcnlcIl0gPSBwYXJhbXMuY2F0ZWdvcnk7XG4gICAgICB9XG5cbiAgICAgIGlmKHBhcmFtcy5zdGFydFRpbWUpe1xuICAgICAgICAgaWYgKCFwYXJhbXMudXJsUGFyYW1zKSB7XG4gICAgICAgICAgICBwYXJhbXMudXJsUGFyYW1zID0ge307XG4gICAgICAgICB9XG4gICAgICAgICBwYXJhbXMudXJsUGFyYW1zW1wic3RhcnRUaW1lXCJdID0gcGFyYW1zLnN0YXJ0VGltZTtcbiAgICAgIH1cblxuICAgICAgaWYocGFyYW1zLmVuZFRpbWUpe1xuICAgICAgICAgaWYgKCFwYXJhbXMudXJsUGFyYW1zKSB7XG4gICAgICAgICAgICBwYXJhbXMudXJsUGFyYW1zID0ge307XG4gICAgICAgICB9XG4gICAgICAgICBwYXJhbXMudXJsUGFyYW1zW1wiZW5kVGltZVwiXSA9IHBhcmFtcy5lbmRUaW1lO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gT2JzZXJ2YWJsZS5jcmVhdGUoKG9ic2VydmVyOiBPYnNlcnZlcjxSZXNwb25zZT4pID0+IHtcbiAgICAgICAgIHRoaXMuaHR0cC5yZXF1ZXN0KEFQSXMuZ2V0QXBpVXJpKHBhcmFtcy50eXBlLCBwYXJhbXMudXJsUGFyYW1zKSwge1xuICAgICAgICAgICAgaGVhZGVyczogIGhlYWRlcnMsXG4gICAgICAgICAgICBtZXRob2Q6ICBtZXRob2QgYXMgUmVxdWVzdE1ldGhvZCxcbiAgICAgICAgICAgIGJvZHk6ICBib2R5LFxuICAgICAgICAgfSkuc3Vic2NyaWJlKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICAgIC8vVG9rZW4gaGVhZGVyIGhhbmRsZXJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiPT09PT09PT09KioqKioqKioqKis9PT09PT09PVwiK3Jlc3BvbnNlKVxuICAgICAgICAgICAgdGhpcy5maWxsVG9rZW4ocmVzcG9uc2UuaGVhZGVycy5nZXQoXCJ0b2tlblwiKSk7XG5cbiAgICAgICAgICAgIG9ic2VydmVyLm5leHQocmVzcG9uc2UpO1xuICAgICAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcbiAgICAgICAgIH0sIGVycm9yID0+IG9ic2VydmVyLmVycm9yKGVycm9yKSk7XG4gICAgICB9KTtcbiAgIH1cbn0iXX0=
