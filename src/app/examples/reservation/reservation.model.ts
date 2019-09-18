import { Client } from "../client/client";

export class Reservation {
    id: number;
    client: Client;
    confirmed: boolean;
}