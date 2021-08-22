import {CACHE_MANAGER, Inject, Injectable, Logger} from '@nestjs/common';
import {HttpService} from '@nestjs/axios';
import {AbstractUpdateService} from "../abstract-update-service";
import {buildTargetUrl, createPodcastUpdate, isPodcastReleasedToday} from "./podcast.functions";
import {PodcastUpdate, UserConfig, ZEITUNG_CONFIG} from "../../model/model";
import {Cache} from "cache-manager";


@Injectable()
export class PodcastService extends AbstractUpdateService<PodcastUpdate[]> {

    constructor(private readonly httpService: HttpService,
                @Inject(CACHE_MANAGER) private cacheManager: Cache) {
        super(new Logger(PodcastService.name), 'Podcasts');
    }

    protected execute(): Promise<any> {
        return this.cacheManager.get(ZEITUNG_CONFIG).then((config: UserConfig) => {
            console.log("le confique", config)
            const updates: Promise<PodcastUpdate>[] = config.podcasts.map((podcast) => {
                return this.httpService
                    .get(buildTargetUrl(podcast))
                    .toPromise()
                    .then((res) => isPodcastReleasedToday(res.data, createPodcastUpdate));
            });
            return Promise.all(updates);
        });
    }
}


