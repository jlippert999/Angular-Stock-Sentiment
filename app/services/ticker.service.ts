
    import { Injectable } from '@angular/core';
    import { Router, NavigationExtras } from "@angular/router";
    import { Http, Headers, Response } from '@angular/http';
    import { Observable } from 'rxjs/Observable';
    import { Subject } from 'rxjs/Subject';
    import 'rxjs/add/observable/forkJoin';
    import 'rxjs/add/operator/do';
    import 'rxjs/add/operator/map';

    import { TickerEndpoint } from './ticker-endpoint.service';
    import { StockTicker } from '../models/stock-ticker.model';
    import { StockNews } from '../models/stock-news.model';



    @Injectable()
    export class TickerService {


        constructor(private router: Router, private http: Http, private tickerEndpoint: TickerEndpoint) {

        }
    

        getStocks() {

            return Observable.forkJoin(
                this.tickerEndpoint.getTickersEndpoint()
                    .map((response: Response) => <StockTicker[]>response.json().data));
        }


        getStocksNews(ticker: string) {

            return Observable.forkJoin(
                this.tickerEndpoint.getTickerNewsEndpoint(ticker)
                    .map((response: Response) => <StockNews[]>response.json().data));

        }
    
    }