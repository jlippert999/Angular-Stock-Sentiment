// ======================================
// Author: Ebenezer Monney
// Email:  info@ebenmonney.com
// Copyright (c) 2017 www.ebenmonney.com
// 
// ==> Gun4Hire: contact@ebenmonney.com
// ======================================

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { StockAnalysisComponent } from './components/stock-analysis/stock-analysis.component';
import { NotFoundComponent } from './components/not-found/not-found.component';


@NgModule({
    imports: [
        RouterModule.forRoot([
            //{ path: "", component: HomeComponent, canActivate: [AuthGuard], data: { title: "Home" } },
            { path: "", component: HomeComponent, data: { title: "Home" } },
            { path: "stockanalysis", component: StockAnalysisComponent, data: { title: "Stock Analysis" } },
            { path: "stockanalysis/:ticker", component: StockAnalysisComponent, data: { title: "Stock Analysis" } },
            
            { path: "home", redirectTo: "/", pathMatch: "full" },
            { path: "**", component: NotFoundComponent, data: { title: "Page Not Found" } },
        ])
    ],
    exports: [
        RouterModule
    ],
    providers: []
})
export class AppRoutingModule { }