import { Injectable } from '@angular/core';
import { Router, NavigationExtras } from "@angular/router";
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

import { StockChartEndpoint } from './stock-chart-endpoint.service';
import { StockChart } from '../models/stock-chart.model';
// import { ChartData } from '../models/chart.data.model';
// import { ChartDetail } from '../models/chart.detail.model';


@Injectable()
export class StockChartService {

  constructor(private router: Router, private http: Http, private stockChartEndpoint: StockChartEndpoint) {
  }
  
  getHistorical(ticker: string, filter: string) {

    return Observable.forkJoin(
        this.stockChartEndpoint.getHistoricalEndpoint(ticker, filter)
            .map((response: Response) => <StockChart[]>response.json().data));

  }
}