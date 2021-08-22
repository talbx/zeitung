import {CACHE_MANAGER, Inject, Injectable, Logger} from '@nestjs/common';
import {PodcastService} from "./zeitung-services/podcasts/podcast.service";
import {MailingService} from "./zeitung-services/mail/mailing.service";
import {MailTemplateGenerator} from "./zeitung-services/mail/mail-template-generator.service";
import {PodcastUpdate} from "./model/model";
import {NewsService} from "./zeitung-services/news/news.service";
import {UserConfigService} from "./zeitung-services/user-config/user-config.service";
import {Cache} from "cache-manager"

@Injectable()
export class ZeitungService {
  constructor(
    private readonly podcastService: PodcastService,
    private readonly mailingService: MailingService,
    private readonly newsService: NewsService,
    private readonly userConfigService: UserConfigService,
    private readonly contentWriter: MailTemplateGenerator,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  private readonly logger = new Logger(ZeitungService.name);

  async trigger(): Promise<any> {
    await this.userConfigService.loadUserConfig();
    this.logger.log('Starting Update');
    const x: PodcastUpdate[] = await this.podcastService.getUpdate();
    const news = await this.newsService.getUpdate();
    this.logger.log('Finished Update');
    await this.contentWriter.generateTemplate();

    const promise = await this.mailingService.mail(x, news);
    return {
      podcastUpdates: x,
      newsUpdates: news
    };
  }
}
