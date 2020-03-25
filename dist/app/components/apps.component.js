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
var http_1 = require("@angular/common/http");
var AppComponent = (function () {
    function AppComponent(http) {
        this.http = http;
        this.columnDefs = [
            {
                headerName: "ID",
                width: 50,
                valueGetter: "node.id",
                cellRenderer: "loadingRenderer"
            },
            {
                headerName: "Athlete",
                field: "athlete",
                width: 150
            },
            {
                headerName: "Age",
                field: "age",
                width: 90
            },
            {
                headerName: "Country",
                field: "country",
                width: 120
            },
            {
                headerName: "Year",
                field: "year",
                width: 90
            },
            {
                headerName: "Date",
                field: "date",
                width: 110
            },
            {
                headerName: "Sport",
                field: "sport",
                width: 110
            },
            {
                headerName: "Gold",
                field: "gold",
                width: 100
            },
            {
                headerName: "Silver",
                field: "silver",
                width: 100
            },
            {
                headerName: "Bronze",
                field: "bronze",
                width: 100
            },
            {
                headerName: "Total",
                field: "total",
                width: 100
            }
        ];
        this.components = {
            loadingRenderer: function (params) {
                if (params.value !== undefined) {
                    return params.value;
                }
                else {
                    return '<img src="../images/loading.gif">';
                }
            }
        };
        this.rowBuffer = 0;
        this.rowSelection = "multiple";
        this.rowModelType = "infinite";
        this.paginationPageSize = 100;
        this.cacheOverflowSize = 2;
        this.maxConcurrentDatasourceRequests = 1;
        this.infiniteInitialRowCount = 1000;
        this.maxBlocksInCache = 10;
    }
    AppComponent.prototype.onGridReady = function (params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        this.http
            .get("https://raw.githubusercontent.com/ag-grid/ag-grid/master/packages/ag-grid-docs/src/olympicWinners.json")
            .subscribe(function (data) {
            var dataSource = {
                rowCount: null,
                getRows: function (params) {
                    console.log("asking for " + params.startRow + " to " + params.endRow);
                    setTimeout(function () {
                        var rowsThisPage = data.slice(params.startRow, params.endRow);
                        var lastRow = -1;
                        if (data.length <= params.endRow) {
                            lastRow = data.length;
                        }
                        params.successCallback(rowsThisPage, lastRow);
                    }, 500);
                }
            };
            params.api.setDatasource(dataSource);
        });
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: "my-app",
        template: "<ag-grid-angular\n    #agGrid\n    style=\"width: 100%; height: 100%;\"\n    id=\"myGrid\"\n    [rowData]=\"rowData\"\n    class=\"ag-theme-balham\"\n    [columnDefs]=\"columnDefs\"\n    [components]=\"components\"\n    [enableColResize]=\"true\"\n    [rowBuffer]=\"rowBuffer\"\n    [rowSelection]=\"rowSelection\"\n    [rowDeselection]=\"true\"\n    [rowModelType]=\"rowModelType\"\n    [paginationPageSize]=\"paginationPageSize\"\n    [cacheOverflowSize]=\"cacheOverflowSize\"\n    [maxConcurrentDatasourceRequests]=\"maxConcurrentDatasourceRequests\"\n    [infiniteInitialRowCount]=\"infiniteInitialRowCount\"\n    [maxBlocksInCache]=\"maxBlocksInCache\"\n    (gridReady)=\"onGridReady($event)\"\n    ></ag-grid-angular>\n"
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof http_1.HttpClient !== "undefined" && http_1.HttpClient) === "function" && _a || Object])
], AppComponent);
exports.AppComponent = AppComponent;
var _a;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvYXBwcy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHNDQUFxRDtBQUNyRCw2Q0FBa0Q7QUEwQmxEO0lBZ0JFLHNCQUFvQixJQUFnQjtRQUFoQixTQUFJLEdBQUosSUFBSSxDQUFZO1FBQ2xDLElBQUksQ0FBQyxVQUFVLEdBQUc7WUFDaEI7Z0JBQ0UsVUFBVSxFQUFFLElBQUk7Z0JBQ2hCLEtBQUssRUFBRSxFQUFFO2dCQUNULFdBQVcsRUFBRSxTQUFTO2dCQUN0QixZQUFZLEVBQUUsaUJBQWlCO2FBQ2hDO1lBQ0Q7Z0JBQ0UsVUFBVSxFQUFFLFNBQVM7Z0JBQ3JCLEtBQUssRUFBRSxTQUFTO2dCQUNoQixLQUFLLEVBQUUsR0FBRzthQUNYO1lBQ0Q7Z0JBQ0UsVUFBVSxFQUFFLEtBQUs7Z0JBQ2pCLEtBQUssRUFBRSxLQUFLO2dCQUNaLEtBQUssRUFBRSxFQUFFO2FBQ1Y7WUFDRDtnQkFDRSxVQUFVLEVBQUUsU0FBUztnQkFDckIsS0FBSyxFQUFFLFNBQVM7Z0JBQ2hCLEtBQUssRUFBRSxHQUFHO2FBQ1g7WUFDRDtnQkFDRSxVQUFVLEVBQUUsTUFBTTtnQkFDbEIsS0FBSyxFQUFFLE1BQU07Z0JBQ2IsS0FBSyxFQUFFLEVBQUU7YUFDVjtZQUNEO2dCQUNFLFVBQVUsRUFBRSxNQUFNO2dCQUNsQixLQUFLLEVBQUUsTUFBTTtnQkFDYixLQUFLLEVBQUUsR0FBRzthQUNYO1lBQ0Q7Z0JBQ0UsVUFBVSxFQUFFLE9BQU87Z0JBQ25CLEtBQUssRUFBRSxPQUFPO2dCQUNkLEtBQUssRUFBRSxHQUFHO2FBQ1g7WUFDRDtnQkFDRSxVQUFVLEVBQUUsTUFBTTtnQkFDbEIsS0FBSyxFQUFFLE1BQU07Z0JBQ2IsS0FBSyxFQUFFLEdBQUc7YUFDWDtZQUNEO2dCQUNFLFVBQVUsRUFBRSxRQUFRO2dCQUNwQixLQUFLLEVBQUUsUUFBUTtnQkFDZixLQUFLLEVBQUUsR0FBRzthQUNYO1lBQ0Q7Z0JBQ0UsVUFBVSxFQUFFLFFBQVE7Z0JBQ3BCLEtBQUssRUFBRSxRQUFRO2dCQUNmLEtBQUssRUFBRSxHQUFHO2FBQ1g7WUFDRDtnQkFDRSxVQUFVLEVBQUUsT0FBTztnQkFDbkIsS0FBSyxFQUFFLE9BQU87Z0JBQ2QsS0FBSyxFQUFFLEdBQUc7YUFDWDtTQUNGLENBQUM7UUFDRixJQUFJLENBQUMsVUFBVSxHQUFHO1lBQ2hCLGVBQWUsRUFBRSxVQUFTLE1BQU07Z0JBQzlCLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQztvQkFDL0IsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7Z0JBQ3RCLENBQUM7Z0JBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ04sTUFBTSxDQUFDLG1DQUFtQyxDQUFDO2dCQUM3QyxDQUFDO1lBQ0gsQ0FBQztTQUNGLENBQUM7UUFDRixJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztRQUNuQixJQUFJLENBQUMsWUFBWSxHQUFHLFVBQVUsQ0FBQztRQUMvQixJQUFJLENBQUMsWUFBWSxHQUFHLFVBQVUsQ0FBQztRQUMvQixJQUFJLENBQUMsa0JBQWtCLEdBQUcsR0FBRyxDQUFDO1FBQzlCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxDQUFDLENBQUM7UUFDM0IsSUFBSSxDQUFDLCtCQUErQixHQUFHLENBQUMsQ0FBQztRQUN6QyxJQUFJLENBQUMsdUJBQXVCLEdBQUcsSUFBSSxDQUFDO1FBQ3BDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUVELGtDQUFXLEdBQVgsVUFBWSxNQUFNO1FBQ2hCLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQztRQUMxQixJQUFJLENBQUMsYUFBYSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUM7UUFFdEMsSUFBSSxDQUFDLElBQUk7YUFDTixHQUFHLENBQUMsd0dBQXdHLENBQUM7YUFDN0csU0FBUyxDQUFDLFVBQUEsSUFBSTtZQUNiLElBQUksVUFBVSxHQUFHO2dCQUNmLFFBQVEsRUFBRSxJQUFJO2dCQUNkLE9BQU8sRUFBRSxVQUFTLE1BQU07b0JBQ3RCLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxHQUFHLE1BQU0sQ0FBQyxRQUFRLEdBQUcsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztvQkFDdEUsVUFBVSxDQUFDO3dCQUNULElBQUksWUFBWSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7d0JBQzlELElBQUksT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDO3dCQUNqQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDOzRCQUNqQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQzt3QkFDeEIsQ0FBQzt3QkFDRCxNQUFNLENBQUMsZUFBZSxDQUFDLFlBQVksRUFBRSxPQUFPLENBQUMsQ0FBQztvQkFDaEQsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2dCQUNWLENBQUM7YUFDRixDQUFDO1lBQ0YsTUFBTSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDdkMsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBQ0gsbUJBQUM7QUFBRCxDQXRIQSxBQXNIQyxJQUFBO0FBdEhEO0lBeEJDLGdCQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsUUFBUTtRQUNsQixRQUFRLEVBQUUsdXRCQW9CWDtLQUNBLENBQUM7eURBaUIwQixpQkFBVSxvQkFBVixpQkFBVTtnQkFzR3JDO0FBdEhZLHVCQUFBLFlBQVksQ0FBQSIsImZpbGUiOiJjb21wb25lbnRzL2FwcHMuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBWaWV3Q2hpbGQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gXCJAYW5ndWxhci9jb21tb24vaHR0cFwiO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IFwibXktYXBwXCIsXG4gIHRlbXBsYXRlOiBgPGFnLWdyaWQtYW5ndWxhclxuICAgICNhZ0dyaWRcbiAgICBzdHlsZT1cIndpZHRoOiAxMDAlOyBoZWlnaHQ6IDEwMCU7XCJcbiAgICBpZD1cIm15R3JpZFwiXG4gICAgW3Jvd0RhdGFdPVwicm93RGF0YVwiXG4gICAgY2xhc3M9XCJhZy10aGVtZS1iYWxoYW1cIlxuICAgIFtjb2x1bW5EZWZzXT1cImNvbHVtbkRlZnNcIlxuICAgIFtjb21wb25lbnRzXT1cImNvbXBvbmVudHNcIlxuICAgIFtlbmFibGVDb2xSZXNpemVdPVwidHJ1ZVwiXG4gICAgW3Jvd0J1ZmZlcl09XCJyb3dCdWZmZXJcIlxuICAgIFtyb3dTZWxlY3Rpb25dPVwicm93U2VsZWN0aW9uXCJcbiAgICBbcm93RGVzZWxlY3Rpb25dPVwidHJ1ZVwiXG4gICAgW3Jvd01vZGVsVHlwZV09XCJyb3dNb2RlbFR5cGVcIlxuICAgIFtwYWdpbmF0aW9uUGFnZVNpemVdPVwicGFnaW5hdGlvblBhZ2VTaXplXCJcbiAgICBbY2FjaGVPdmVyZmxvd1NpemVdPVwiY2FjaGVPdmVyZmxvd1NpemVcIlxuICAgIFttYXhDb25jdXJyZW50RGF0YXNvdXJjZVJlcXVlc3RzXT1cIm1heENvbmN1cnJlbnREYXRhc291cmNlUmVxdWVzdHNcIlxuICAgIFtpbmZpbml0ZUluaXRpYWxSb3dDb3VudF09XCJpbmZpbml0ZUluaXRpYWxSb3dDb3VudFwiXG4gICAgW21heEJsb2Nrc0luQ2FjaGVdPVwibWF4QmxvY2tzSW5DYWNoZVwiXG4gICAgKGdyaWRSZWFkeSk9XCJvbkdyaWRSZWFkeSgkZXZlbnQpXCJcbiAgICA+PC9hZy1ncmlkLWFuZ3VsYXI+XG5gXG59KVxuZXhwb3J0IGNsYXNzIEFwcENvbXBvbmVudCB7XG4gIHByaXZhdGUgZ3JpZEFwaTtcbiAgcHJpdmF0ZSBncmlkQ29sdW1uQXBpO1xuICBwcml2YXRlIHJvd0RhdGE6IGFueVtdO1xuXG4gIHByaXZhdGUgY29sdW1uRGVmcztcbiAgcHJpdmF0ZSBjb21wb25lbnRzO1xuICBwcml2YXRlIHJvd0J1ZmZlcjtcbiAgcHJpdmF0ZSByb3dTZWxlY3Rpb247XG4gIHByaXZhdGUgcm93TW9kZWxUeXBlO1xuICBwcml2YXRlIHBhZ2luYXRpb25QYWdlU2l6ZTtcbiAgcHJpdmF0ZSBjYWNoZU92ZXJmbG93U2l6ZTtcbiAgcHJpdmF0ZSBtYXhDb25jdXJyZW50RGF0YXNvdXJjZVJlcXVlc3RzO1xuICBwcml2YXRlIGluZmluaXRlSW5pdGlhbFJvd0NvdW50O1xuICBwcml2YXRlIG1heEJsb2Nrc0luQ2FjaGU7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50KSB7XG4gICAgdGhpcy5jb2x1bW5EZWZzID0gW1xuICAgICAge1xuICAgICAgICBoZWFkZXJOYW1lOiBcIklEXCIsXG4gICAgICAgIHdpZHRoOiA1MCxcbiAgICAgICAgdmFsdWVHZXR0ZXI6IFwibm9kZS5pZFwiLFxuICAgICAgICBjZWxsUmVuZGVyZXI6IFwibG9hZGluZ1JlbmRlcmVyXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGhlYWRlck5hbWU6IFwiQXRobGV0ZVwiLFxuICAgICAgICBmaWVsZDogXCJhdGhsZXRlXCIsXG4gICAgICAgIHdpZHRoOiAxNTBcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGhlYWRlck5hbWU6IFwiQWdlXCIsXG4gICAgICAgIGZpZWxkOiBcImFnZVwiLFxuICAgICAgICB3aWR0aDogOTBcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGhlYWRlck5hbWU6IFwiQ291bnRyeVwiLFxuICAgICAgICBmaWVsZDogXCJjb3VudHJ5XCIsXG4gICAgICAgIHdpZHRoOiAxMjBcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGhlYWRlck5hbWU6IFwiWWVhclwiLFxuICAgICAgICBmaWVsZDogXCJ5ZWFyXCIsXG4gICAgICAgIHdpZHRoOiA5MFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgaGVhZGVyTmFtZTogXCJEYXRlXCIsXG4gICAgICAgIGZpZWxkOiBcImRhdGVcIixcbiAgICAgICAgd2lkdGg6IDExMFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgaGVhZGVyTmFtZTogXCJTcG9ydFwiLFxuICAgICAgICBmaWVsZDogXCJzcG9ydFwiLFxuICAgICAgICB3aWR0aDogMTEwXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBoZWFkZXJOYW1lOiBcIkdvbGRcIixcbiAgICAgICAgZmllbGQ6IFwiZ29sZFwiLFxuICAgICAgICB3aWR0aDogMTAwXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBoZWFkZXJOYW1lOiBcIlNpbHZlclwiLFxuICAgICAgICBmaWVsZDogXCJzaWx2ZXJcIixcbiAgICAgICAgd2lkdGg6IDEwMFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgaGVhZGVyTmFtZTogXCJCcm9uemVcIixcbiAgICAgICAgZmllbGQ6IFwiYnJvbnplXCIsXG4gICAgICAgIHdpZHRoOiAxMDBcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGhlYWRlck5hbWU6IFwiVG90YWxcIixcbiAgICAgICAgZmllbGQ6IFwidG90YWxcIixcbiAgICAgICAgd2lkdGg6IDEwMFxuICAgICAgfVxuICAgIF07XG4gICAgdGhpcy5jb21wb25lbnRzID0ge1xuICAgICAgbG9hZGluZ1JlbmRlcmVyOiBmdW5jdGlvbihwYXJhbXMpIHtcbiAgICAgICAgaWYgKHBhcmFtcy52YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgcmV0dXJuIHBhcmFtcy52YWx1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gJzxpbWcgc3JjPVwiLi4vaW1hZ2VzL2xvYWRpbmcuZ2lmXCI+JztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gICAgdGhpcy5yb3dCdWZmZXIgPSAwO1xuICAgIHRoaXMucm93U2VsZWN0aW9uID0gXCJtdWx0aXBsZVwiO1xuICAgIHRoaXMucm93TW9kZWxUeXBlID0gXCJpbmZpbml0ZVwiO1xuICAgIHRoaXMucGFnaW5hdGlvblBhZ2VTaXplID0gMTAwO1xuICAgIHRoaXMuY2FjaGVPdmVyZmxvd1NpemUgPSAyO1xuICAgIHRoaXMubWF4Q29uY3VycmVudERhdGFzb3VyY2VSZXF1ZXN0cyA9IDE7XG4gICAgdGhpcy5pbmZpbml0ZUluaXRpYWxSb3dDb3VudCA9IDEwMDA7XG4gICAgdGhpcy5tYXhCbG9ja3NJbkNhY2hlID0gMTA7XG4gIH1cblxuICBvbkdyaWRSZWFkeShwYXJhbXMpIHtcbiAgICB0aGlzLmdyaWRBcGkgPSBwYXJhbXMuYXBpO1xuICAgIHRoaXMuZ3JpZENvbHVtbkFwaSA9IHBhcmFtcy5jb2x1bW5BcGk7XG5cbiAgICB0aGlzLmh0dHBcbiAgICAgIC5nZXQoXCJodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vYWctZ3JpZC9hZy1ncmlkL21hc3Rlci9wYWNrYWdlcy9hZy1ncmlkLWRvY3Mvc3JjL29seW1waWNXaW5uZXJzLmpzb25cIilcbiAgICAgIC5zdWJzY3JpYmUoZGF0YSA9PiB7XG4gICAgICAgIHZhciBkYXRhU291cmNlID0ge1xuICAgICAgICAgIHJvd0NvdW50OiBudWxsLFxuICAgICAgICAgIGdldFJvd3M6IGZ1bmN0aW9uKHBhcmFtcykge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJhc2tpbmcgZm9yIFwiICsgcGFyYW1zLnN0YXJ0Um93ICsgXCIgdG8gXCIgKyBwYXJhbXMuZW5kUm93KTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHZhciByb3dzVGhpc1BhZ2UgPSBkYXRhLnNsaWNlKHBhcmFtcy5zdGFydFJvdywgcGFyYW1zLmVuZFJvdyk7XG4gICAgICAgICAgICAgIHZhciBsYXN0Um93ID0gLTE7XG4gICAgICAgICAgICAgIGlmIChkYXRhLmxlbmd0aCA8PSBwYXJhbXMuZW5kUm93KSB7XG4gICAgICAgICAgICAgICAgbGFzdFJvdyA9IGRhdGEubGVuZ3RoO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHBhcmFtcy5zdWNjZXNzQ2FsbGJhY2socm93c1RoaXNQYWdlLCBsYXN0Um93KTtcbiAgICAgICAgICAgIH0sIDUwMCk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBwYXJhbXMuYXBpLnNldERhdGFzb3VyY2UoZGF0YVNvdXJjZSk7XG4gICAgICB9KTtcbiAgfVxufVxuIl19
