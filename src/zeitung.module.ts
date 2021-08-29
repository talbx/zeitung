import {CacheModule, Module} from '@nestjs/common';
import {ZeitungController} from './zeitung.controller';
import {ZeitungService} from './zeitung.service';
import {PodcastModule} from "./zeitung-services/podcasts/podcast.module";
import {NewsModule} from "./zeitung-services/news/news.module";
import {CoronaStatusModule} from "./zeitung-services/corona-status/corona-status.module";
import {MailModule} from "./mail/mail.module";
import {UserConfigModule} from "./user-config/user-config.module";
import {CalendarModule} from "./zeitung-services/calendar/calendar.module";

@Module({
  imports: [PodcastModule, MailModule, NewsModule, UserConfigModule,  CalendarModule, CacheModule.register(), CoronaStatusModule],
  controllers: [ZeitungController],
  providers: [ZeitungService],
})
export class ZeitungModule {}
