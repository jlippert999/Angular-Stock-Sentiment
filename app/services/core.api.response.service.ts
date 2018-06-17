import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CoreApiService } from './core.api.service';
//import { CoreApiStateService } from './core.api.state.service';
import { CoreApiErrorInterface } from '../models/api-state';

@Injectable()
export class CoreApiResponseService extends CoreApiService {
  disableLoader: boolean;
  errorCount = 0;

//   constructor(protected httpClient: HttpClient,
//     protected state: CoreApiStateService) {
//     super(httpClient);
//     }
  constructor(protected httpClient: HttpClient) {
    super(httpClient);
  }

  toggleLoader(loader: boolean) {
    if (!this.disableLoader) {
      //this.state.fetchLoader(loader);
    }
  }

  complete(data: any[]) {
    this.disableLoader = false;
    if (data.length > 0) {
      this.errorCount = 0;
      this.toggleLoader(false);
      //this.state.fetchFulfilled(data);
    } else {
      this.failed('Yahoo\'s API didn\'t return any data.');
    }
  }

  failed(error: string = null) {
    if (!this.disableLoader) {
      this.errorCount++;

      if (!error) {
        error = 'Yahoo\'s API was unable to load.';
        if (this.errorCount > 3) {
          error = 'Yahoo\'s API failed multiple times.  Please wait a minute before trying again.';
        }
      }

    //   this.state.fetchError(<CoreApiErrorInterface>{
    //     value: error,
    //     date: String(Date.now()),
    //     count: this.errorCount
    //   });
    }
  }
}
