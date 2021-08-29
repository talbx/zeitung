import {Injectable, Logger} from "@nestjs/common";
import {AbstractUpdateService} from "../abstract-update-service";
import {Appointment} from "../../model/model";
import {HttpService} from "@nestjs/axios";
import {ConfigService} from "@nestjs/config";

@Injectable()
export class CalendarService extends AbstractUpdateService<Appointment[]> {

    constructor(private readonly httpService: HttpService,
                private configService: ConfigService) {
        super(new Logger(CalendarService.name), 'Calendar');
    }

    protected execute(): Promise<Appointment[]> {

        const authHeader = {
            headers: {
                Authorization: `Bearer ${this.configService.get("CALENDAR_API_KEY")}`
            }
        }

        return this.httpService
            .get(`https://timetreeapis.com/calendars/${this.configService.get("CALENDAR_ID")}/upcoming_events?timezone=Europe/Berlin&days=1`, authHeader)
            .toPromise()
            .then((res) => res.data)
            .then(res => {
                return res.data.map(data => {
                    return {
                        title: data.attributes.title,
                        startDate: data.attributes.start_at,
                        endDate: data.attributes.end_at,
                        isAllDay: data.attributes.all_day
                    }
                });
            });
    }

}