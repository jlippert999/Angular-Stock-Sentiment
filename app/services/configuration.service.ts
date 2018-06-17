import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class ConfigurationService {

    public static readonly appVersion: string = "1.0.0";
    env: string;

    constructor() {
        this.env = environment.env;
    }

    public appVersion(): string {
        return environment.appVersion;
    }

    public baseUrl(): string {
        return environment.paths.apiHost;
    }

    isProdEnv(): boolean {
        return (this.env.toLocaleLowerCase() === 'prod' ||
        this.env.toLocaleLowerCase() === 'production') ? true : false;
    }
    isStageEnv(): boolean {
        return (this.env.toLocaleLowerCase() === 'prod' ||
        this.env.toLocaleLowerCase() === 'production') ? true : false;
    }
    isDevEnv(): boolean {
        return (this.env.toLocaleLowerCase() === 'dev' ||
        this.env.toLocaleLowerCase() === 'development') ? true : false;
    }


}