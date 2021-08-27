import {sub} from "date-fns";
import {isPodcastReleasedWithinLast24Hours} from "./podcast.functions";
import {PodcastUpdate} from "../../model/model";

describe("podcast functions tests", () => {
    function test(inputData: { results: ({ collectionName: string } | { releaseDate: string; trackName: string; artWorkUrl: string })[] }) {
        return isPodcastReleasedWithinLast24Hours(inputData, (n, t, d, a): PodcastUpdate => {
            return {
                date: d,
                episodeTitle: t,
                podcastName: n,
                artworkUrl: a
            };
        });
    }

    function buildInputData(n: number) {
        return {
            results: [
                {
                    collectionName: "foo",
                },
                {
                    releaseDate: sub(new Date(), {hours: n}).toISOString(),
                    trackName: "bar",
                    artWorkUrl: "http://google.com"
                }
            ]
        };
    }


    it("should return podcast if it is released within last 24hours", () => {

        const inputData = buildInputData(19);
        const respo = test(inputData)
        expect(respo).not.toBeUndefined();
    })

    it("should not return podcast if it is released before last 24hours", () => {

        const inputData = buildInputData(25);

        const respo = test(inputData);
        expect(respo).toBeUndefined();
    })
})