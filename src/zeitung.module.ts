import {CacheModule, Module} from '@nestjs/common';
import {ZeitungController} from './zeitung.controller';
import {ZeitungService} from './zeitung.service';
import {PodcastModule} from "./zeitung-services/podcasts/podcast.module";
import {MailModule} from "./zeitung-services/mail/mail.module";
import {NewsModule} from "./zeitung-services/news/news.module";
import {UserConfigModule} from "./zeitung-services/user-config/user-config.module";

@Module({
  imports: [PodcastModule, MailModule, NewsModule, UserConfigModule, CacheModule.register()],
  controllers: [ZeitungController],
  providers: [ZeitungService],
})
export class ZeitungModule {}
