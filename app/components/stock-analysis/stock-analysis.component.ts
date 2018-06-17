import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { fadeInOut } from '../../services/animations';
import { AlertService, DialogType, AlertMessage, MessageSeverity } from '../../services/alert.service';


import { Utilities } from "../../services/utilities";
import { StockChartService } from '../../services/stock-chart.service';
import { StockNewsComponent } from '../controls/stock-news.component';
import { StockHistoricalComponent } from '../controls/stock-historical.component';
import { StockSentimentComponent } from '../controls/stock-sentiment.component';
import { StockSentimentV1Component } from '../controls/stock-sentiment-v1.component';

import { StockChart } from '../../models/stock-chart.model';

@Component({
  selector: 'app-stock-analysis',
  templateUrl: './stock-analysis.component.html',
  styleUrls: ['./stock-analysis.component.scss'],
  animations: [fadeInOut]
})
export class StockAnalysisComponent implements OnInit {
  ticker: any;
  private sub: any;
  loadingIndicator: boolean;
  
  // historical data
  stockChart: StockChart[];

  buttonList = [
    '5 day',
    '10 day',
    '1 month',
    '3 month',
    '6 month',
    'max'
  ];   


  // ticker news
  @ViewChild(StockNewsComponent) private stockNews: StockNewsComponent;
  
  // charts
  @ViewChild('chartHistorical') private chartHistorical: StockHistoricalComponent;
  @ViewChild('chartSentiment') private chartSentiment: StockSentimentComponent;
  @ViewChild('chartSentimentV1') private chartSentimentV1: StockSentimentV1Component;

  constructor(private route: ActivatedRoute, private alertService: AlertService, private stockChartService: StockChartService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
            this.ticker = params['ticker']; 
        });

    if (this.ticker != null)
        this.loadData(this.ticker);
    else
        this.loadingIndicator = false;
  }

    loadData(ticker: string) {
        

        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;

        this.ticker = ticker;

        // load news...
        this.stockNews.loadData(this.ticker);  
        // load chart...
        this.loadChart(this.ticker, null);
        
    }

    loadChart(ticker: string, filter: string)
    {
        // load chart data...
        this.stockChartService.getHistorical(ticker, filter)
            .subscribe(stockChart => this.onDataLoadSuccessful(stockChart[0]), error => this.onDataLoadFailed(error));
    }

    chartFilter(filter: string){

        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;

        var type = '3m';
        switch(filter) {
            case '5 day':
                type = '5d';
                break;
            case '10 day':
                type = '10d';
                break;
            case '1 month':
                type = '1m';
                break;
            case '3 month':
                type = '3m';
                break;
            case '6 month':
                type = '6m';
                break;
            case 'max':
                type = 'max';
                break;
        };  
        
        this.loadChart(this.ticker, type);
    }

    onDataLoadSuccessful(stockChart: StockChart[]) {
        
        this.stockChart = stockChart;
        
        // load charts...
        this.chartHistorical.loadHistoricalChart(this.stockChart); 
        this.chartSentiment.chartSentiment(this.stockChart);
        this.chartSentimentV1.chartSentiment(this.stockChart);
        // this.chartSentimentScore.chartSentiment(this.stockAnalysis);
        // this.chartSentimentLinebar.chartSentiment(this.stockAnalysis);

        // refresh grid...
        // this.rows = stockAnalysis.detail;        
        // this.rows = [...this.rows];        

        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;

    }


    onDataLoadFailed(error: any) {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;

        this.alertService.showStickyMessage("Load Error", `Unable to retrieve data from the server.\r\nErrors: "${Utilities.getHttpResponseMessage(error)}"`,
            MessageSeverity.error, error);
    }
}