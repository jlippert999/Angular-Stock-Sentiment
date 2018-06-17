import { Injectable, Injector } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { EndpointFactory } from './endpoint-factory.service';
import { ConfigurationService } from './configuration.service';

import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Injectable()
export class TickerEndpoint extends EndpointFactory {

    private readonly _tickerUrl: string = "/tickers";
    private readonly _tickerNewsUrl: string = "/news";


    get tickerUrl() { return this.configurationService.baseUrl() + this._tickerUrl; }
    get tickerNewsUrl() { return this.configurationService.baseUrl() + this._tickerNewsUrl; }

    constructor(http: Http, protected configurationService: ConfigurationService, injector: Injector, private spinnerService: Ng4LoadingSpinnerService) {

        super(http, injector);
    }

    getTickersEndpoint(): Observable<Response> {
        let endpointUrl = `${this.tickerUrl}`;
        
        this.spinnerService.show(); 

        return this.http.get(endpointUrl)
            .map((response: Response) => {
                this.spinnerService.hide();
                return response;
            })
            .catch(error => {
                this.spinnerService.hide();
                return this.handleError(error, () => this.getTickersEndpoint());
            });
    }


    getTickerNewsEndpoint(ticker: string): Observable<Response> {
        let endpointUrl = `${this.tickerNewsUrl}/${ticker}`;


        return this.http.get(endpointUrl)
            .map((response: Response) => {
                return response;
            })
            .catch(error => {
                return this.handleError(error, () => this.getTickerNewsEndpoint(ticker));
            });
    }

    
}