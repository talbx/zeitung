import {Injectable, Logger} from '@nestjs/common';
import {HttpService} from '@nestjs/axios';
import {AbstractUpdateService} from "../abstract-update-service";
import {CoronaUpdate} from "../../model/model";


@Injectable()
export class CoronaStatusService extends AbstractUpdateService<CoronaUpdate> {

    constructor(private readonly httpService: HttpService) {
        super(new Logger(CoronaStatusService.name), 'Corona');
    }

    protected execute(): Promise<any> {
                return this.httpService
                    .get("https://api.corona-zahlen.org/germany")
                    .toPromise()
                    .then((res) => res.data)
    }
}


