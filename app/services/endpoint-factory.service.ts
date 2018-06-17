import { Injectable, Injector } from '@angular/core';
import { Http, Headers, RequestOptions, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
//import { SlimLoadingBarService } from 'ng2-slim-loading-bar';


@Injectable()
export class EndpointFactory {

    static readonly apiVersion: string = "1";
    private taskPauser: Subject<any>;
    env: string;

    constructor(protected http: Http, private injector: Injector) {
    }

    // protected getAuthHeader(includeJsonContentType?: boolean): RequestOptions {
    //     let headers = new Headers({ 'Authorization': 'Bearer ' + this.authService.accessToken });

    //     if (includeJsonContentType)
    //         headers.append("Content-Type", "application/json");

    //     headers.append("Accept", `application/vnd.iman.v${EndpointFactory.apiVersion}+json, application/json, text/plain, */*`);
    //     headers.append("App-Version", environment.appVersion);

    //     return new RequestOptions({ headers: headers });
    // }

    
    protected handleError(error, continuation: () => Observable<any>) {

        // if (error.status == 401) {
        //     if (this.isRefreshingLogin) {
        //         return this.pauseTask(continuation);
        //     }

        //     this.isRefreshingLogin = true;

        //     return this.authService.refreshLogin()
        //         .mergeMap(data => {
        //             this.isRefreshingLogin = false;
        //             this.resumeTasks(true);

        //             return continuation();
        //         })
        //         .catch(refreshLoginError => {
        //             this.isRefreshingLogin = false;
        //             this.resumeTasks(false);

        //             if (refreshLoginError.status == 401 || (refreshLoginError.url && refreshLoginError.url.toLowerCase().includes(this.loginUrl.toLowerCase()))) {
        //                 this.authService.reLogin();
        //                 return Observable.throw('session expired');
        //             }
        //             else {
        //                 return Observable.throw(refreshLoginError || 'server error');
        //             }
        //         });
        // }

        // if (error.url && error.url.toLowerCase().includes(this.loginUrl.toLowerCase())) {
        //     this.authService.reLogin();
        //     return Observable.throw('session expired');
        // }
        // else {
        //     return Observable.throw(error || 'server error');
        // }

        return Observable.throw(error || 'server error');
    }



    private pauseTask(continuation: () => Observable<any>) {
        if (!this.taskPauser)
            this.taskPauser = new Subject();

        return this.taskPauser.switchMap(continueOp => {
            return continueOp ? continuation() : Observable.throw('session expired');
        });
    }


    private resumeTasks(continueOp: boolean) {
        setTimeout(() => {
            if (this.taskPauser) {
                this.taskPauser.next(continueOp);
                this.taskPauser.complete();
                this.taskPauser = null;
            }
        });
    }


    // startLoader(delay?: number): void {
    //     delay = delay || typeof delay === 'number' ? delay : 0;
    //     setTimeout(() => {
    //       this.slimLoadingBarService.start(() => {
    //         // Loading Completed;
    //       });
    //     }, delay);
    //   }
    
    //   stopLoader(delay?: number): void {
    //     delay = delay || typeof delay === 'number' ? delay : 0;
    //     setTimeout(() => {
    //       this.slimLoadingBarService.complete();
    //     }, delay);
    //   }
}