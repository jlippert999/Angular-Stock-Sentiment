export class StockChart {
    // Note: Using only optional constructor properties without backing store disables typescript's type checking for the type
    constructor(ticker?: string, CloseDate?: Date,
        Open?: number, High?: number,
        Low?: number, Close?: number,
        Volume?: number, TwitterTotal?: number,
        PercentChangeNormalized? : number, 
        TwitterPercentChangeNormalized? : number, 
        RSSPercentChangeNormalized?: number,
        RSSPercentChangeNormalizedND?: number,
        RSSPercentChangeNormalizedC?: number) {

        this.Ticker = ticker;
        this.CloseDate = CloseDate;
        this.Open = Open;
        this.High = High;
        this.Low = Low;
        this.Close = Close;
        this.Volume = Volume;
        this.TwitterTotal = TwitterTotal;
        this.PercentChangeNormalized = PercentChangeNormalized;
        this.TwitterPercentChangeNormalized = TwitterPercentChangeNormalized;
        this.RSSPercentChangeNormalized = RSSPercentChangeNormalized;
        this.RSSPercentChangeNormalizedND = RSSPercentChangeNormalizedND;
        this.RSSPercentChangeNormalizedC = RSSPercentChangeNormalizedC;
    }
    
    public Ticker: string;
    public CloseDate: Date;
    public Open: number;
    public High: number;
    public Low: number;
    public Close: number;
    public Volume: number;
    public TwitterTotal: number;
    public PercentChangeNormalized: number;
    public TwitterPercentChangeNormalized: number;
    public RSSPercentChangeNormalized: number;
    public RSSPercentChangeNormalizedND: number;
    public RSSPercentChangeNormalizedC: number;
}