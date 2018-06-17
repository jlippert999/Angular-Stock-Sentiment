export class StockNews {
    // Note: Using only optional constructor properties without backing store disables typescript's type checking for the type
    constructor(title?: string, summary?: string,
        url?: string, thumbnail?: string,
        published?: Date, publishedBy?: string) {

        this.title = title;
        this.summary = summary;
        this.url = url;
        this.thumbnail = thumbnail;
        this.published = published;
        this.publishedBy = publishedBy;
    }
    
    public title: string;
    public summary: string;
    public url: string;
    public thumbnail: string;
    public published: Date;
    public publishedBy: string;

}