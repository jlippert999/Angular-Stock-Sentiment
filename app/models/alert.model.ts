export class Alert {
    type: AlertType;
    message: string;

    constructor() {
        this.type = AlertType.Info
        this.message = ""
    }
}

export enum AlertType {
    Success,
    Error,
    Info,
    Warning
}
