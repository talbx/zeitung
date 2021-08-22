import {CACHE_MANAGER, Inject, Injectable, Logger} from '@nestjs/common';
import {buildReplacementString, MAIL_TEMPLATE} from "./mail.functions";
import {UserConfig, ZEITUNG_CONFIG, ZeitungUpdates} from "../../model/model";
import {Cache} from "cache-manager";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const AWS = require('aws-sdk');

@Injectable()
export class MailingService {

    private readonly logger = new Logger(MailingService.name);

    constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {
    }
    async mail(allUpdates: ZeitungUpdates): Promise<any> {

        AWS.config.update({region: 'eu-central-1'});
        const userConfig: UserConfig = await this.cacheManager.get(ZEITUNG_CONFIG);

        const params = {
            Destination: {
                CcAddresses: [],
                ToAddresses: [userConfig.email]
            },
            Source: userConfig.email,
            Template: MAIL_TEMPLATE,
            TemplateData: buildReplacementString(allUpdates, userConfig),
            ReplyToAddresses: [],
        };

        return new AWS.SES({apiVersion: '2010-12-01'})
            .sendTemplatedEmail(params)
            .promise()
            .then(data => {
                this.logger.log("Message Sent! " + data.MessageId)
                return data;
            })
            .catch(err => console.error(err, err.stack));
    }
}

