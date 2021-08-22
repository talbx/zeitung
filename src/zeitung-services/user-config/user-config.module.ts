import {CacheModule, Module} from '@nestjs/common';
import {HttpModule} from '@nestjs/axios';
import {UserConfigService} from "./user-config.service";
import {ConfigModule} from "@nestjs/config";

@Module({
    imports: [CacheModule.register()],
    controllers: [],
    providers: [UserConfigService],
    exports: [UserConfigService]
})
export class UserConfigModule {
}
