import {format, isToday, parseISO} from "date-fns";
import {PodcastUpdate} from "../../model/model";

export const buildTargetUrl = (podcast: number) => `https://itunes.apple.com/lookup?id=${podcast}&media=podcast&entity=podcastEpisode&limit=1`;

export const createPodcastUpdate = (
    name: string,
    title: string,
    date: Date,
    artworkUrl: string
): PodcastUpdate => {
    const result = format(date, 'dd.MM.yyyy hh:mm');

    return <PodcastUpdate>{
        podcastName: name,
        episodeTitle: title,
        date: result,
        artworkUrl: artworkUrl
    };
};

export const isPodcastReleasedToday = (data: any, callbackFn: (name: any, title: any, date: any, artworkUrl: any) => PodcastUpdate) => {
    const x = parseISO(data.results[1].releaseDate);

    if (isToday(x)) {
        return callbackFn(data.results[0].collectionName,
            splice1(data.results[1].trackName),
            x,
            data.results[1].artworkUrl600)
    }
}

const splice1 = (str: string) => str.length > 50 ? str.slice(0, 50) + "..." : str;