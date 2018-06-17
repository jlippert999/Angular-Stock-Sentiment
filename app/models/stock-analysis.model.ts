import { stockAnalysisDetail } from './stock-analysis-detail.model';

export class StockAnalysis {

    constructor(ticker?: string,
        title?: string,
        min?: number,
        max?: number,
        totalTwitter?: number,
        totalRSS?: number,
        detail?: stockAnalysisDetail[]) {

        this.ticker = ticker;
        this.title = title;
        this.min = min;
        this.max = max;
        this.totalTwitter = totalTwitter;
        this.totalRSS = totalRSS;
        this.detail = detail;
    }


    public ticker: string;
    public title: string;
    public min: number;
    public max: number;
    public totalTwitter: number;
    public totalRSS: number;
    public detail: stockAnalysisDetail[];
}                