import {Module} from '@nestjs/common';
import {HttpModule} from "@nestjs/axios";
import {CoronaStatusService} from "./corona-status.service";

@Module({
    imports: [HttpModule],
    controllers: [],
    providers: [CoronaStatusService],
    exports: [CoronaStatusService]
})
export class CoronaStatusModule {}
