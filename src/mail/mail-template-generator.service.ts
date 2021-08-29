import {CACHE_MANAGER, Inject, Injectable, Logger} from "@nestjs/common";
import {constructMailTemplate, MAIL_TEMPLATE} from "./mail.functions";
import {Cache} from "cache-manager";
import {UserConfig, ZEITUNG_CONFIG} from "../model/model";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const AWS = require('aws-sdk');

@Injectable()
export class MailTemplateGenerator {

    private readonly logger = new Logger(MailTemplateGenerator.name);

    constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {
    }
    public async generateTemplate(): Promise<any> {
        AWS.config.update({region: 'eu-central-1'});
        const recipient: UserConfig = await this.cacheManager.get(ZEITUNG_CONFIG);
        const params = {
            Template: {
                TemplateName: MAIL_TEMPLATE,
                HtmlPart: constructMailTemplate(),
                SubjectPart: `Dein tägliches Update, ${recipient.name}`,
                TextPart: "\""
            }
        };

        return new AWS.SES({apiVersion: '2010-12-01'})
            .updateTemplate(params)
            .promise()
            .then(data => {
                this.logger.log("Template Updated Successfully " + data.$response.requestId)
                return data;
            })
            .catch(err => console.log("THERE WAS ONE ERROR", err));
    }
}