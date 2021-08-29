import {CACHE_MANAGER, Inject, Injectable, Logger} from '@nestjs/common';
import {PodcastService} from "./zeitung-services/podcasts/podcast.service";
import {ZeitungUpdates} from "./model/model";
import {NewsService} from "./zeitung-services/news/news.service";
import {Cache} from "cache-manager"
import {CoronaStatusService} from "./zeitung-services/corona-status/corona-status.service";
import {MailingService} from "./mail/mailing.service";
import {UserConfigService} from "./user-config/user-config.service";
import {MailTemplateGenerator} from "./mail/mail-template-generator.service";
import {CalendarService} from "./zeitung-services/calendar/calendar.service";

@Injectable()
export class ZeitungService {
    constructor(
        private readonly podcastService: PodcastService,
        private readonly mailingService: MailingService,
        private readonly newsService: NewsService,
        private readonly userConfigService: UserConfigService,
        private readonly contentWriter: MailTemplateGenerator,
        private readonly coronaService: CoronaStatusService,
        private readonly calendarService: CalendarService,
        @Inject(CACHE_MANAGER) private cacheManager: Cache
    ) {
    }

    private readonly logger = new Logger(ZeitungService.name);

    async trigger(event: any): Promise<any> {
        this.logger.log("Incoming Event " + JSON.stringify(event));
        await this.userConfigService.loadUserConfig();
        const allUpdates = await this.runUpdates();
        await this.contentWriter.generateTemplate();
        //await this.mailingService.mail(allUpdates);
        return allUpdates;
    }

    private async runUpdates(): Promise<ZeitungUpdates> {
        this.logger.log('Starting Update');
        const appointments = await this.calendarService.getUpdate();
        const podcastUpdate = await this.podcastService.getUpdate();
        const coronaUpdate = await this.coronaService.getUpdate();
        const newsUpdates = await this.newsService.getUpdate();
        this.logger.log('Finished Update');
        return {
            newsUpdates, coronaUpdate, podcastUpdate, appointments
        };
    }
}
