import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
//import { CoreSubscriptions } from '../subscriptions';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class CoreApiService {
  private headers: HttpHeaders;

  constructor(protected httpClient: HttpClient) {
    
    this.headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
  }

  get(url: string): Observable<string[]> {
    return this.httpClient.get(url)
      .catch((error) => Observable.throw(error));
  }

  getJsonp(url: string): Observable<string[]> {
    return this.httpClient.jsonp(url,'callback')        
      .catch((error) => Observable.throw(error));
  }



  post(url: string, params: any): Observable<string[]> {
    return this.httpClient.post(url, params, {headers: this.headers})
      .catch((error) => Observable.throw(error));
  }

  
}
