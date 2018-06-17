import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { NgModule, ErrorHandler  } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgxDatatableModule, DatatableComponent } from '@swimlane/ngx-datatable';
import { ToastyModule } from 'ng2-toasty';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TooltipModule } from "ngx-bootstrap/tooltip";
import { PopoverModule } from "ngx-bootstrap/popover";
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { ChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppErrorHandler } from './app-error.handler';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';

// new chart: https://github.com/krispo/ng2-nvd3
import { NvD3Module } from 'ng2-nvd3';
//   d3 and nvd3 should be included somewhere
import 'd3';
import 'nvd3';
// https://www.npmjs.com/package/ngx-nvd3
//import { NvD3Module } from 'ngx-nvd3';

// 
import { ConfigurationService } from './services/configuration.service';
import { EndpointFactory } from './services/endpoint-factory.service';
//import { TodoService } from './services/todo.service';
//import { AlertComponent } from './components/alert/alert.component';
import { AlertService } from './services/alert.service';
import { TickerService } from './services/ticker.service';
import { TickerEndpoint } from './services/ticker-endpoint.service';
import { StockChartService } from './services/stock-chart.service';
import { StockChartEndpoint } from './services/stock-chart-endpoint.service';


import { NotFoundComponent } from "./components/not-found/not-found.component";
import { HomeComponent } from "./components/home/home.component";
import { StockAnalysisComponent } from "./components/stock-analysis/stock-analysis.component";


import { StocksGridComponent } from "./components/controls/stocks-grid.component";
import { StockNewsComponent } from './components/controls/stock-news.component';
import { StockSentimentComponent } from './components/controls/stock-sentiment.component';
import { StockHistoricalComponent } from './components/controls/stock-historical.component';
import { StocksGridDtComponent } from './components/controls/stocks-grid-dt.component';

import { DataTablesModule } from 'angular-datatables';
import { StockSentimentV1Component } from './components/controls/stock-sentiment-v1.component';

import { SelectionTrackerService } from './services/selection-tracker.service';


export const ROUTES: Routes = [];

@NgModule({
  declarations: [
    AppComponent,
      NotFoundComponent,
      HomeComponent,
      StockAnalysisComponent,
      StocksGridComponent,
      StockNewsComponent,
      StockSentimentComponent,
      StockHistoricalComponent,
      StocksGridDtComponent,
      StockSentimentV1Component,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    FormsModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(ROUTES),
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    FormsModule,
    AppRoutingModule,        
    NgxDatatableModule,
    ToastyModule.forRoot(),
    TooltipModule.forRoot(),
    PopoverModule.forRoot(),
    BsDropdownModule.forRoot(),
    CarouselModule.forRoot(),
    ModalModule.forRoot(),
    ChartsModule,
    NvD3Module,
    DataTablesModule.forRoot(),
    Ng4LoadingSpinnerModule.forRoot()
    
  ],
  providers: [
    { provide: 'BASE_URL', useFactory: getBaseUrl },
    { provide: ErrorHandler, useClass: AppErrorHandler },
    AlertService,
    ConfigurationService,
    EndpointFactory,
    TickerEndpoint,
    TickerService,
    StockChartService,
    StockChartEndpoint,  
    SelectionTrackerService  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function getBaseUrl() {
  return document.getElementsByTagName('base')[0].href;
}
