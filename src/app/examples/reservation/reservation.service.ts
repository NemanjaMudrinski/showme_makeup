import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Reservation } from './reservation.model';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private reservationUrl = "http://localhost:8080/reservation";

  constructor(private httpClient: HttpClient) { 

  }

  getAll() {
    return this.httpClient.get<Reservation[]>(this.reservationUrl + `/all`)
  }

  getConfirmedReservations() {
    return this.httpClient.get<Reservation[]>(this.reservationUrl + `/confirmed-reservation`);
  }
}
