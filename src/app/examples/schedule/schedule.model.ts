import { ScheduleTime } from "./scheduleTime.model";
import { Owner } from "../owner/owner";

export class Schedule {
    id: number;
    day: Date;
    time: ScheduleTime;
    owner: Owner
}