import {CACHE_MANAGER, Inject, Injectable, Logger} from '@nestjs/common';
import {PodcastService} from "./zeitung-services/podcasts/podcast.service";
import {MailingService} from "./zeitung-services/mail/mailing.service";
import {MailTemplateGenerator} from "./zeitung-services/mail/mail-template-generator.service";
import {PodcastUpdate, ZeitungUpdates} from "./model/model";
import {NewsService} from "./zeitung-services/news/news.service";
import {UserConfigService} from "./zeitung-services/user-config/user-config.service";
import {Cache} from "cache-manager"
import {CoronaStatusService} from "./zeitung-services/corona-status/corona-status.service";

@Injectable()
export class ZeitungService {
    constructor(
        private readonly podcastService: PodcastService,
        private readonly mailingService: MailingService,
        private readonly newsService: NewsService,
        private readonly userConfigService: UserConfigService,
        private readonly contentWriter: MailTemplateGenerator,
        private readonly coronaService: CoronaStatusService,
        @Inject(CACHE_MANAGER) private cacheManager: Cache
    ) {
    }

    private readonly logger = new Logger(ZeitungService.name);

    async trigger(event: any): Promise<any> {
        this.logger.log("Incoming Event " + JSON.stringify(event));
        await this.userConfigService.loadUserConfig();
        this.logger.log('Starting Update');
        const x: PodcastUpdate[] = await this.podcastService.getUpdate();
        const news = await this.newsService.getUpdate();
        const covid = await this.coronaService.getUpdate();
        this.logger.log('Finished Update');
        await this.contentWriter.generateTemplate();

        const allUpdates: ZeitungUpdates = {
            coronaUpdate: covid,
            newsUpdates: news,
            podcastUpdate: x
        };
        await this.mailingService.mail(allUpdates);
        return allUpdates;
    }
}
