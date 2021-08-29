import {CACHE_MANAGER, Inject, Injectable, Logger} from "@nestjs/common";
import {Cache} from "cache-manager"
// eslint-disable-next-line @typescript-eslint/no-var-requires
const AWS = require('aws-sdk');

@Injectable()
export class UserConfigService {

    private readonly logger = new Logger(UserConfigService.name);

    constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {
    }

    public async loadUserConfig(): Promise<void> {

        AWS.config.update({region: 'eu-central-1'});
        const docClient = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});

        const params = {
            TableName: 'ZEITUNG_CONFIG',
            Key: {'ID': 1}
        };
        this.logger.log("Loading ZEITUNG_CONFIG for provided user");
        const userConfig = await docClient.get(params)
            .promise()
            .then(data => data.Item);
        this.cacheManager.set('ZEITUNG_CONFIG', userConfig).then(() => this.logger.log("User Config set in cache"));
    }
}