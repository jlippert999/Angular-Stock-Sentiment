import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

import { AlertService, DialogType, MessageSeverity } from '../../services/alert.service';
import { Utilities } from "../../services/utilities";
import { TickerService } from "../../services/ticker.service";
import { StockNews } from '../../models/stock-news.model';


@Component({
  selector: 'stock-news',
  templateUrl: './stock-news.component.html',
  styleUrls: ['./stock-news.component.scss']
})
export class StockNewsComponent implements OnInit {
  loadingIndicator: boolean;    
  news: any[];

  constructor(private alertService: AlertService, private tickerService: TickerService, public router: Router) {
  }

  ngOnInit() {
  }

  loadData(ticker: string) {
    this.alertService.startLoadingMessage();
    this.loadingIndicator = true;

    this.tickerService.getStocksNews(ticker).subscribe(stockNews => this.onDataLoadSuccessful(stockNews[0]), error => this.onDataLoadFailed(error));        
  }

  onDataLoadSuccessful(stockNews: StockNews[]) {
      this.alertService.stopLoadingMessage();
      this.loadingIndicator = false;

      // refresh grid...
      this.news = stockNews;        
  }

  onDataLoadFailed(error: any) {
      this.alertService.stopLoadingMessage();
      this.loadingIndicator = false;

      this.alertService.showStickyMessage("Load Error", `Unable to retrieve data from the server.\r\nErrors: "${Utilities.getHttpResponseMessage(error)}"`,
          MessageSeverity.error, error);
  }
}



