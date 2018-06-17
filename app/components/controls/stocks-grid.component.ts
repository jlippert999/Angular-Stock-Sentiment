//  https://github.com/swimlane/ngx-datatable/blob/master/demo/basic/scrolling.component.ts
import { Component, OnInit, OnDestroy, TemplateRef, ViewChild, Input, ElementRef } from '@angular/core';

import { AlertService, DialogType, MessageSeverity } from '../../services/alert.service';
import { Utilities } from "../../services/utilities";
import { Router, NavigationStart } from '@angular/router';

import { TickerService } from "../../services/ticker.service";
import { StockTicker } from '../../models/stock-ticker.model';

@Component({
    selector: 'stocks-grid',
    templateUrl: './stocks-grid.component.html',
    styleUrls: ['./stocks-grid.component.scss']
})
export class StocksGridComponent implements OnInit {
    columns: any[] = [];
    rows: any[] = [];
    temp = [];
    selected = [];
    loadingIndicator: boolean;
    renderTable = false;

    constructor(private el: ElementRef, private alertService: AlertService, private tickerService: TickerService, public router: Router) {
    }

    ngOnInit() {

        this.columns = [
            { prop: "Ticker", name: 'Ticker', width: 40 },
            { prop: "Company", name: 'Company', width: 40 },
            { prop: "Exchange", name: 'Exchange', width: 40 },
            { prop: "Sector", name: 'Sector', width: 40 },
            { prop: "Industry", name: 'Industry', width: 40 }
        ];

        this.loadData();
        
    }

    loadData() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;

        this.tickerService.getStocks()
            .subscribe(
                tickers => this.onDataLoadSuccessful(tickers[0]), error => this.onDataLoadFailed(error));
    }

    updateFilter(event) {
        //console.log(event.target.value);
        const val = event.target.value.toLowerCase();

        // filter our data
        const temp = this.temp.filter(function (d) {
            return d.Ticker.toLowerCase().indexOf(val) !== -1 ||
                   d.Company.toLowerCase().indexOf(val) !== -1 || !val;
        });

        // update the rows
        this.rows = temp;        
    }

    onDataLoadSuccessful(analysisCollection: StockTicker[]) {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;        

        this.rows = analysisCollection;
        this.temp = [...this.rows];  
        this.rows = [...this.rows];        

        this.renderTable = true;
    }
    
    onDataLoadFailed(error: any) {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;

        this.alertService.showStickyMessage("Load Error", `Unable to retrieve data from the server.\r\nErrors: "${Utilities.getHttpResponseMessage(error)}"`,
            MessageSeverity.error, error);
    }

    onSelect({ selected }) {
        //console.log('Select Event', selected[0].Ticker);
        
        // show stock analysis
        this.router.navigate(['/stockanalysis', selected[0].Ticker]);
    }
}