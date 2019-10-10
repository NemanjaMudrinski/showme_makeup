import { ScheduleTime } from "./scheduleTime.model";
import { Owner } from "../owner/owner";
import * as moment from 'moment';


export class Schedule {
    id: number;
    day: moment.Moment;;
    time: ScheduleTime;
    owner: Owner


    constructor(day, owner, time){
        this.day = day;
        this.owner = owner;
        this.time = time;
    }

}