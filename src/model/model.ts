export interface PodcastUpdate {
    podcastName: string;
    episodeTitle: string;
    date: string;
    artworkUrl: string
}

export const buildNewsUpdate = (urlToImage: string, url: string, description: string, title: string, author: string): NewsUpdate => {
    return {
        urlToImage,
        url,
        description,
        title,
        author
    }
}

export interface Appointment {
    title: string;
    startDate: string;
    endDate: string;
    isAllDay: boolean
}

export interface NewsUpdate {
    urlToImage: string;
    url: string;
    description: string;
    title: string;
    author: string;
}

export interface ZeitungUpdates {
    podcastUpdate: PodcastUpdate[];
    newsUpdates: NewsUpdate[];
    coronaUpdate: CoronaUpdate;
    appointments: Appointment[];
}

export interface UserConfig {
    id: number;
    name: string;
    email: string
    podcasts: number[]
}

export interface CoronaUpdate {
    cases: number;
    deaths: number;
    weekIncidence: number
}

export const ZEITUNG_CONFIG = "ZEITUNG_CONFIG";