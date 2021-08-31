import {Injectable, Logger} from "@nestjs/common";
import {AbstractUpdateService} from "../abstract-update-service";
import {NewsUpdate} from "../../model/model";
import {HttpService} from "@nestjs/axios";
import {ConfigService} from "@nestjs/config";

@Injectable()
export class NewsService extends AbstractUpdateService<NewsUpdate[]> {

    constructor(private readonly httpService: HttpService,
                private configService: ConfigService) {
        super(new Logger(NewsService.name), 'News');
    }

    protected execute(): Promise<NewsUpdate[]> {
        const newsapikey = this.configService.get("NEWS_API_KEY");
        return this.httpService.get(`https://newsapi.org/v2/top-headlines?country=de&apiKey=${newsapikey}`)
            .toPromise()
            .then(res => res.data.articles)
            .then((articles: NewsUpdate[]) => articles.map(article => {
                return {
                    ...article,
                    title: this.fixContent(article.title),
                    description: this.fixContent(article.description),
                };
            }))
    }


    fixContent = (str: string): string => str?.replace(/"/g, " ").replace(/\n/g, " ")

}