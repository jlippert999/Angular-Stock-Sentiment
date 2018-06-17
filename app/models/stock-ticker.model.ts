export class StockTicker {
    // Note: Using only optional constructor properties without backing store disables typescript's type checking for the type
    constructor(ticker?: string, companyName?: string,
        industry?: string, exchange?: string,
        sector?: string) {

        this.Ticker = ticker;
        this.CompanyName = companyName;
        this.Industry = industry;
        this.Exchange = exchange;
        this.Sector = sector;
    }
    
    public Ticker: string;
    public CompanyName: string;
    public Industry: string;
    public Exchange: string;
    public Sector: string;

}