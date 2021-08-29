import {Injectable, Logger} from "@nestjs/common";
import {AbstractUpdateService} from "../abstract-update-service";
import {Appointment} from "../../model/model";
import {HttpService} from "@nestjs/axios";
import {ConfigService} from "@nestjs/config";
import {format, parseISO} from "date-fns";

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
            .then(res => res.data.map(data => CalendarService.buildAppointment(data)));
    }

    private static buildAppointment(data: any): Appointment {
        return {
            title: data.attributes.title,
            startDate: format(parseISO(data.attributes.start_at), 'dd.MM.yyyy hh:mm'),
            endDate: format(parseISO(data.attributes.end_at), 'dd.MM.yyyy hh:mm'),
            isAllDay: data.attributes.all_day
        }
    }

}