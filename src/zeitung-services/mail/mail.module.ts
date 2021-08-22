import {CacheModule, Module} from '@nestjs/common';
import {HttpModule} from '@nestjs/axios';
import {MailingService} from "./mailing.service";
import {MailTemplateGenerator} from "./mail-template-generator.service";

@Module({
    imports: [HttpModule, CacheModule.register()],
    controllers: [],
    providers: [MailingService, MailTemplateGenerator],
    exports: [MailingService, MailTemplateGenerator],
})
export class MailModule {
}
