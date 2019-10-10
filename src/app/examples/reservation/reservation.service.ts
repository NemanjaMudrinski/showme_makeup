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
    return this.httpClient.get<Reservation[]>(this.reservationUrl + `/future`)
  }

  getConfirmedReservations() {
    return this.httpClient.get<Reservation[]>(this.reservationUrl + `/confirmed-reservation`);
  }

  addReservation(reservation: Reservation) {
    return this.httpClient.post(this.reservationUrl + `/add`, reservation)
  }

  getConfirmedReservationByUser(username: String) {
    return this.httpClient.get<Reservation[]>(this.reservationUrl + `/confirmed/client/${username}`);
  }

  getAllReservationByUser(username: String) {
    return this.httpClient.get<Reservation[]>(this.reservationUrl + `/all-by-username/${username}`);
  }
}
