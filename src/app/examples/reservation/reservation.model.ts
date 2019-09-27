import { Client } from "../client/client";
import { Data } from "@angular/router";
import { Schedule } from "../schedule/schedule.model";

export class Reservation {
    id: number;
    client: Client;
    confirmed: boolean;
    reservationMade: Data;
    schedule: Schedule;
}