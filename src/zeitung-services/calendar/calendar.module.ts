import {CacheModule, Module} from '@nestjs/common';
import {HttpModule} from '@nestjs/axios';
import {CalendarService} from "./calendar.service";
import {ConfigModule} from "@nestjs/config";

@Module({
    imports: [HttpModule, CacheModule.register(), ConfigModule.forRoot({
        envFilePath: '.development.env',
    })],
    controllers: [],
    providers: [CalendarService],
    exports: [CalendarService]
})
export class CalendarModule {}
