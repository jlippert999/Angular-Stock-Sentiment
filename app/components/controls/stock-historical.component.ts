import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { fadeInOut } from '../../services/animations';
import { AlertService, DialogType, AlertMessage, MessageSeverity } from '../../services/alert.service';

import { Router, NavigationStart } from '@angular/router';
import { Utilities } from "../../services/utilities";

import { StockChart } from '../../models/stock-chart.model';
//import { HistoricalDetail } from '../../models/historical.detail.model';
//import { stockAnalysisDetail } from '../../models/stock.analysis.detail.model';
//declare var require: any
//require('chart.js');



@Component({
    selector: 'stock-historical',
    templateUrl: './stock-historical.component.html',
    styleUrls: ['./stock-historical.component.scss'],
    animations: [fadeInOut]
})
export class StockHistoricalComponent implements OnInit {
    isDataAvailable: boolean = false;
    options: any;
    //candlestickBarChart: Array<any> = [];
    data: Array<any> = [];
    ticker: any;

    constructor(private alertService: AlertService) {
    }


    ngOnInit() {

        
    }
    

    loadHistoricalChart(stockChart: StockChart[]) {
        this.alertService.startLoadingMessage("Loading historical chart for: " + stockChart[0].Ticker);

        this.ticker = stockChart[0].Ticker.toUpperCase();

        // set data...
        let historical: any[] = [];
        historical = stockChart.map(o => {
            return { date: new Date(o.CloseDate).getTime(), open: o.Open, high: o.High, low: o.Low, close: o.Close, volume: o.Volume, };
        });

        
        this.data = [{ values: historical }];

        d3.time.scale.utc();

        // setup chart options...
        this.options = {
            chart: {
                type: 'candlestickBarChart',
                height: 300,
                margin: {
                    top: 20,
                    right: 20,
                    bottom: 40,
                    left: 60
                },
                x: function (d) { return d['date']; },
                y: function (d) { return d['close']; },
                duration: 100,
                xAxis: {                    
                    axisLabel: 'Dates',
                    tickFormat: function (d) {
                        return d3.time.format('%x')(new Date(d));
                    },                    
                    showMaxMin: false,
                    scale: d3.time.scale.utc()
                },
                yAxis: {
                    axisLabel: 'Stock Price',
                    tickFormat: function (d) {
                        return '$' + d3.format(',.1f')(d);
                    },
                    showMaxMin: false
                }                
            }
        };        

        this.isDataAvailable = true;  
        
        




        // this.options = {
        //     chart: {
        //       type: 'lineChart',
        //       useInteractiveGuideline: true,
        //       height: 450,
        //       transitionDuration: 350,
        //       showLegend: false,
        //       margin: {
        //         top: 20,
        //         right: 20,
        //         bottom: 40,
        //         left: 55
        //       },
        //       x: (d) => { return d.x; },
        //       y: (d) => { return d.y; },
        //       xScale: d3.time.scale(),
        //       xAxis: {
        //         ticks: d3.time.months,
        //         tickFormat: (d) => {
        //             return d3.time.format('%b')(new Date(d));
        //         }
        //       },
        //       yAxis: {
        //         axisLabel: 'Gross volume',
        //         tickFormat: (d) => {
        //             if (d == null) {
        //                 return 0;
        //             }
        //             return d3.format('.02f')(d);
        //         },
        //         axisLabelDistance: 400
        //       }
        //     }
        //   };

        // this.data = [
        //     {
        //       key: "Cumulative Return",
        //       values: [
        //         {
        //           "label" : "A" ,
        //           "value" : -29.765957771107
        //         } ,
        //         {
        //           "label" : "B" ,
        //           "value" : 0
        //         } ,
        //         {
        //           "label" : "C" ,
        //           "value" : 32.807804682612
        //         } ,
        //       ]
        //     }
        //   ];



    } 
}