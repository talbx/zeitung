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

export interface NewsUpdate {
    urlToImage: string;
    url: string;
    description: string;
    title: string;
    author: string;
}

export interface MailNews {
    podcastUpdates: PodcastUpdate[];
}

export interface UserConfig {
    id: number;
    name: string;
    email: string
    podcasts: number[]
}

export const ZEITUNG_CONFIG = "ZEITUNG_CONFIG";