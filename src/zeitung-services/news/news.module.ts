import {Module} from '@nestjs/common';
import {HttpModule} from '@nestjs/axios';
import {NewsService} from "./news.service";
import {ConfigModule} from "@nestjs/config";

@Module({
    imports: [HttpModule, ConfigModule.forRoot({
        envFilePath: '.development.env',
    })],
    controllers: [],
    providers: [NewsService],
    exports: [NewsService]
})
export class NewsModule {
}
