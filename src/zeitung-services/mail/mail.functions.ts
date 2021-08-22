import {NewsUpdate, PodcastUpdate, UserConfig} from "../../model/model";

export const constructMailTemplate = (): string => {

    const mailHeader = "<link href=\"https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css\" rel=\"stylesheet\" integrity=\"sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We\" crossorigin=\"anonymous\">" +
        "<div class=\"container\">" +
        "<h1>Hi {{name}}!</h1>\n" +
        "<p>Hier sind die neusten Updates des Tages für Dich:</p>\n" +
        "";

    const podcastContent =
        "<div class=\"card\" style=\"margin: 25px;\">\n" +
        "  <div class=\"card-body\">\n" +
        "<h2 class=\"card-title\">Die folgenden Podcasts, für die du dich interessierst haben eine neue Episode veröffentlicht!</h2>" +
        "  <div class=\"row\">\n" +
        "                   {{#each podcastUpdate}}\n" +
        "    <div class=\"col-sm\">\n" +
        "<div class=\"card shadow-lg\" style=\"width: 18rem;\">\n" +
        "  <img src={{artworkUrl}} class=\"card-img-top\" alt=\"...\">\n" +
        "  <div class=\"card-body\">\n" +
        "    <h5 class=\"card-title\">{{podcastTitle}}</h5>\n" +
        "    <p class=\"card-text\">{{episodeTitle}}.</p>\n" +
        "      <footer class=\"blockquote-footer\">{{releaseDate}}</footer>\n" +
        "  </div>\n" +
        "</div>" +
        "    </div>\n" +
        "                   {{/each}}\n" +
        "  </div>" +
        "  </div>\n" +
        "</div>";

    const newsContent =
        "<div class=\"card\" style=\"margin: 25px;\">\n" +
        "  <div class=\"card-body\">\n" +
        "<h2 class=\"card-title\">Die Nachrichten des Tages</h2>" +
        "  <div class=\"row\">\n" +
        "                   {{#each articleUpdate}}\n" +
        "    <div class=\"col-sm\">\n" +
        "<div class=\"card shadow-lg\" style=\"width: 18rem; margin: 4px;\">\n" +
        "  <img src={{urlToImage}} class=\"card-img-top\" alt=\"...\">\n" +
        "  <div class=\"card-body\">\n" +
        "    <h5 class=\"card-title\">{{title}}</h5>\n" +
        "    <p class=\"card-text\">{{description}}.</p>\n" +
        "      <footer class=\"blockquote-footer\">{{author}}</footer>\n" +
        "  </div>\n" +
        "</div>" +
        "    </div>\n" +
        "                   {{/each}}\n" +
        "  </div>" +
        "  </div>\n" +
        "</div>";


    return mailHeader + podcastContent + newsContent + "</div>";
}

export const MAIL_TEMPLATE = "ZEITUNG_TEMPLATE_V1";


export const buildReplacementString = (podcasts: PodcastUpdate[], news: NewsUpdate[], userConfig: UserConfig): string => {
    const poddyUpdates = podcasts
        .filter(val => val !== undefined)
        .map(update => "{\"podcastTitle\": \"" + update.podcastName + "\", \"episodeTitle\": \"" + update.episodeTitle + "\", \"artworkUrl\": \"" + update.artworkUrl + "\", \"releaseDate\": \"" + update.date + "\"}")

    const newsUpdates = news
        .filter(val => val !== undefined)
        .map(update => "{\"title\": \"" + update.title + "\", \"description\": \"" + update.description + "\", \"urlToImage\": \"" + update.urlToImage + "\", \"author\": \"" + update.author + "\"}")

    let finalString = "{\"name\": \"" + userConfig.name + "\", ";

    if (poddyUpdates.length !== 0) {
        finalString += "\"podcastUpdate\": [" + poddyUpdates.join(", ") + "],";
    }

    if (newsUpdates.length !== 0) {
        finalString += "\"articleUpdate\": [" + newsUpdates.join(", ") + "]}";
    }
    console.log(finalString)
    return finalString;
}