import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { fadeInOut } from '../../services/animations';
import { AlertService, DialogType, AlertMessage, MessageSeverity } from '../../services/alert.service';

import { Router, NavigationStart } from '@angular/router';
import { Utilities } from "../../services/utilities";

import { StockChart } from '../../models/stock-chart.model';


@Component({
    selector: 'stock-sentiment',
    templateUrl: './stock-sentiment.component.html',
    styleUrls: ['./stock-sentiment.component.scss'],
    animations: [fadeInOut]
})
export class StockSentimentComponent implements OnInit {
    isDataAvailable: boolean = false;
    options: any;
    ticker: any;
    data: Array<any> = [];

    constructor(private alertService: AlertService) {
    }


    ngOnInit() {}
    

    chartSentiment(stockChart: StockChart[]) {
        this.alertService.startLoadingMessage("Loading stock percent change...");
        this.ticker = stockChart[0].Ticker.toUpperCase();

        d3.time.scale.utc();

        // setup chart options...
        // multiBarChart
        this.options = {
            chart: {
                type: 'lineChart', 
                height: 350,
                margin : {
                    top: 20,
                    right: 20,
                    bottom: 40,
                    left: 55
                },                
                x: function(d){ return d.x; },
                y: function(d){ return d.y; },                
                useInteractiveGuideline: true,
                dispatch: {
                    stateChange: function(e){ console.log("stateChange"); },
                    changeState: function(e){ console.log("changeState"); },
                    tooltipShow: function(e){ console.log("tooltipShow"); },
                    tooltipHide: function(e){ console.log("tooltipHide"); }
                }, 
                xAxis: {
                    axisLabel: 'Close Date',
                    tickFormat: function (d) {
                        return d3.time.format('%x')(new Date(d));
                    },                    
                    showMaxMin: false,
                    scale: d3.time.scale.utc()
                },
                yAxis: {
                    axisLabel: '% Change',
                    tickFormat: function(d){
                        return d3.format('.02f')(d);
                    },
                    axisLabelDistance: -10
                }

            }
        };


        this.data = this.formatData(stockChart);
        this.isDataAvailable = true;  
    } 



    formatData(stockChart: StockChart[]) {

        var price = [];
        var twitter = [];
        var rss = [];

        // set data...
        stockChart.forEach(e => {
            price.push({x: new Date(e.CloseDate).getTime(), y: e.PercentChangeNormalized });
            twitter.push({x: new Date(e.CloseDate).getTime(), y: e.TwitterPercentChangeNormalized });
            rss.push({x: new Date(e.CloseDate).getTime(), y: e.RSSPercentChangeNormalizedND });
        });
        
        // Line chart data should be sent as an array of series objects.
        return [
            {
                values: price,          //values - represents the array of {x,y} data points
                key: 'Price % Change',  //key  - the name of the series.
                color: '#336f99'        //color - optional: choose your own line color.
            },
            {
                values: twitter,
                key: 'Twitter % Change',
                color: '#ffb366'
            },
            {
                values: rss,
                key: 'News % Change',
                color: '#add468'
            }
        ];

        
    }
}