import {UserConfig, ZeitungUpdates} from "../model/model";

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


    const coronaContent =
        "<div class=\"card\" style=\"margin: 25px;\">\n" +
        "  <div class=\"card-body\">\n" +
        "<h2 class=\"card-title\">Die heutigen Corona Zahlen</h2>" +
        "                   {{#each coronaUpdate}}\n" +
        "<ul class=\"list-group\">\n" +
        "  <li class=\"list-group-item d-flex justify-content-between align-items-center\">\n" +
        "    <h3>Corona Fälle Insgesamt" +
        "    <span class=\"badge bg-primary rounded-pill\">{{cases}}</span></h3>\n" +
        "  </li>\n" +
        "  <li class=\"list-group-item d-flex justify-content-between align-items-center\">\n" +
        "    <h3>Tote" +
        "    <span class=\"badge bg-primary rounded-pill\">{{deaths}}</span></h3>\n" +
        "  </li>\n" +
        "  <li class=\"list-group-item d-flex justify-content-between align-items-center\">\n" +
        "    <h3>7-Tages Inzidenz" +
        "    <span class=\"badge bg-primary rounded-pill\">{{weekIncidence}}</span></h3>\n" +
        "  </li>\n" +
        "</ul>" +
        "                   {{/each}}\n" +
        "  </div>\n" +
        "</div>";


    const calendarContent =
        "<div class=\"card\" style=\"margin: 25px;\">\n" +
        "  <div class=\"card-body\">\n" +
        "<h2 class=\"card-title\">Heute stehen folgende Termine an!</h2>" +
        "  <div class=\"row\">\n" +
        "                   {{#each appointment}}\n" +
        "    <div class=\"col-sm\">\n" +
        "<div class=\"card shadow-lg\" style=\"width: 18rem;\">\n" +
        "  <div css=\"card-body\">\n" +
        "    <h5 class=\"card-title\">{{title}}</h5>\n" +
        "    <p class=\"card-text\">{{startDate}}.</p>\n" +
        "      <footer class=\"blockquote-footer\">{{endDate}}</footer>\n" +
        "  </div>\n" +
        "</div>" +
        "    </div>\n" +
        "                   {{/each}}\n" +
        "  </div>" +
        "  </div>\n" +
        "</div>";


    return mailHeader + calendarContent + podcastContent + newsContent + coronaContent + "</div>";
}

export const MAIL_TEMPLATE = "ZEITUNG_TEMPLATE_V1";


export const buildReplacementString = (allUpdates: ZeitungUpdates, userConfig: UserConfig): string => {
    const appointmentUpdates = allUpdates.appointments
        .filter(val => val !== undefined)
        .map(update => "{\"title\": \"" + update.title + "\", \"startDate\": \"" + update.startDate + "\", \"endDate\": \"" + update.endDate + "\"}")
    const poddyUpdates = allUpdates.podcastUpdate
        .filter(val => val !== undefined)
        .map(update => "{\"podcastTitle\": \"" + update.podcastName + "\", \"episodeTitle\": \"" + update.episodeTitle + "\", \"artworkUrl\": \"" + update.artworkUrl + "\", \"releaseDate\": \"" + update.date + "\"}")

    const newsUpdates = allUpdates.newsUpdates
        .filter(val => val !== undefined)
        .map(update => "{\"title\": \"" + update.title + "\", \"description\": \"" + update.description + "\", \"urlToImage\": \"" + update.urlToImage + "\", \"author\": \"" + update.author + "\"}")

    let finalString = "{\"name\": \"" + userConfig.name + "\", ";

    if (poddyUpdates.length !== 0) {
        finalString += "\"podcastUpdate\": [" + poddyUpdates.join(", ") + "],";
    }
    if(appointmentUpdates.length !== 0) {
        finalString += "\"appointment\": [" + appointmentUpdates.join(", ") + "],";
    }

    if (newsUpdates.length !== 0) {
        finalString += "\"articleUpdate\": [" + newsUpdates.join(", ") + "], ";
    }
    const covidUpdate = "\"coronaUpdate\": [{\"cases\": " + allUpdates.coronaUpdate.cases + ",\"deaths\": " + allUpdates.coronaUpdate.deaths + ",\"weekIncidence\": " + allUpdates.coronaUpdate.weekIncidence.toFixed(2) + "}]}"

    finalString += covidUpdate;
    console.log(finalString)
    return finalString.replace(/\n/, "");
}