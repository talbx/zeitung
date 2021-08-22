import {CacheModule, Module} from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import {PodcastService} from "./podcast.service";

@Module({
  imports: [HttpModule, CacheModule.register()],
  controllers: [],
  providers: [PodcastService],
  exports: [PodcastService]
})
export class PodcastModule {}
