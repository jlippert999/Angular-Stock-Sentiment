import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class SelectionTrackerService {

    private subject = new Subject<any>();
    private selectedTickers: any[];
 
    public tickerSelected(ticker) {
      this.selectedTickers.push(ticker); 
      this.sendMessage(ticker); 
    }

    public tickerRemove(ticker) {
      for (var i = 0, len = this.selectedTickers.length; i < len; i++) {
        if (this.selectedTickers[i] === ticker) {
          this.selectedTickers.slice(i, 1);
          break;
        }
      }
    }

    sendMessage(message: string) {
        this.subject.next({ text: message });
    }
 
    clearMessage() {
        this.subject.next();
    }
 
    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }
}
