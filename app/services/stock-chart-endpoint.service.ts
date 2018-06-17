import { Injectable, Injector } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
//import 'rxjs/add/observable/throw';
//import 'rxjs/add/operator/toPromise';

import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';

import { EndpointFactory } from './endpoint-factory.service';
import { ConfigurationService } from './configuration.service';


@Injectable()
export class StockChartEndpoint extends EndpointFactory {

  private readonly _historical: string = "/historical";


  get historicalUrl() { return this.configurationService.baseUrl() + this._historical; }

  constructor(http: Http, protected configurationService: ConfigurationService, injector: Injector) {
    super(http, injector);
  }  
  

  getHistoricalEndpoint(ticker: string, filter: string): Observable<Response> {
    if (filter == null)
    {
      filter = '3m';
    }
    
    let endpointUrl = `${this.historicalUrl}/${ticker}/${filter}`;    

    return this.http.get(endpointUrl)
        .map((response: Response) => {
            return response;
        })
        .catch(error => {
            return this.handleError(error, () => this.getHistoricalEndpoint(ticker, filter));
        });
  }

  // getHistoricalEndpoint(ticker: string): Observable<Response> {
  //     let endpointUrl = `${this.historicalUrl}/${ticker}`;
      

  //     return this.http.get(endpointUrl, this.getAuthHeader())
  //         .timeout(30000)
  //         .map((response: Response) => {
  //             return response;
  //         })
  //         .catch(error => {
  //             return this.handleError(error, () => this.getHistoricalEndpoint(ticker));
  //         });
  // }

}