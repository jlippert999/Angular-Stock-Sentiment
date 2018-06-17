// import { Component, OnInit } from '@angular/core';
// import { DataTableResource } from 'angular-4-data-table';

// @Component({
//   selector: 'app-stocks-grid-dt',
//   templateUrl: './stocks-grid-dt.component.html',
//   styleUrls: ['./stocks-grid-dt.component.scss']
// })
// export class StocksGridDtComponent implements OnInit {
//   itemResource = new DataTableResource(persons);
//   items = [];
//   itemCount = 0;

//   constructor() {
//     this.itemResource.count().then(count => this.itemCount = count);
//   }

//   ngOnInit() {
//   }

  

    

//   reloadItems(params) {
//       this.itemResource.query(params).then(items => this.items = items);
//   }

//   // special properties:
//   rowClick(rowEvent) {
//       console.log('Clicked: ' + rowEvent.row.item.name);
//   }

//   rowDoubleClick(rowEvent) {
//       alert('Double clicked: ' + rowEvent.row.item.name);
//   }

//   rowTooltip(item) { return item.jobTitle; }

// }



import { Component, OnInit, OnDestroy, TemplateRef, ViewChild, Input, ElementRef } from '@angular/core';

import { AlertService, DialogType, MessageSeverity } from '../../services/alert.service';
import { Utilities } from "../../services/utilities";
import { Router, NavigationStart } from '@angular/router';

import { TickerService } from "../../services/ticker.service";
import { StockTicker } from '../../models/stock-ticker.model';

//import { DataTable, DataTableResource } from 'angular-4-data-table';
import { DataTablesModule } from 'angular-datatables';

@Component({
    selector: 'stocks-grid-dt',
    templateUrl: './stocks-grid-dt.component.html',
    styleUrls: ['./stocks-grid-dt.component.scss']
})
export class StocksGridDtComponent implements OnInit {

  loaded = false;
  dtOptions: DataTables.Settings = {};
  public data: Object;

  constructor(private alertService: AlertService, private tickerService: TickerService, public router: Router) {
  }


  ngOnInit() {

    this.dtOptions = {
        pageLength: 20     
    };

    

        this.loadData();        
  }

  loadData() {
      this.alertService.startLoadingMessage();
      
      this.tickerService.getStocks()
          .subscribe(
              tickers => this.onDataLoadSuccessful(tickers[0]), error => this.onDataLoadFailed(error));

              
  }

    onDataLoadSuccessful(analysisCollection: StockTicker[]) {
        this.alertService.stopLoadingMessage();
        
        this.data = analysisCollection;
        this.loaded = true;
    }
    
    onDataLoadFailed(error: any) {
        this.alertService.stopLoadingMessage();
        this.loaded = true;

        this.alertService.showStickyMessage("Load Error", `Unable to retrieve data from the server.\r\nErrors: "${Utilities.getHttpResponseMessage(error)}"`,
            MessageSeverity.error, error);
    
    
    }

    onSelect({ selected }) {
        //console.log('Select Event', selected, this.selected);
        console.log(selected[0].ticker);
        console.log('Select Event', selected);

        // version 1...
        //this.router.navigate(['/stockanalysis', selected[0].ticker]);
        this.router.navigate(['/stockanalysis', selected[0].ticker]);
    }

    editRow = function(row) {
        console.log(row);
    }
}
