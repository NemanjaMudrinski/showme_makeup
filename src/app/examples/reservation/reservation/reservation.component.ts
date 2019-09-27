import { Component, OnInit, ViewChild } from '@angular/core';
import { ReservationService } from '../reservation.service';
import { Reservation } from '../reservation.model';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { AuthService } from 'app/authorization/auth.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit {

  reservations:Reservation[] = [];
  reservation:Reservation = new Reservation();
  displayedColumns: string[] = ['id', 'client.personalData.firstName', 'client.personalData.lastName', 'schedule.day'];
  dataSource = new MatTableDataSource<Reservation>(this.reservations);

  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(private reservationService: ReservationService, private authService: AuthService) { }

  ngOnInit() {
    let loggedInUser = this.authService.getCurrentUser();
    this.dataSource.paginator = this.paginator;
    this.getAllReservations(loggedInUser);
  }

  getAllReservations(username: String) {
    this.reservationService.getAllReservationByUser(username).subscribe((data:Reservation[]) => {
      this.reservations = data;
      console.log(this.reservations);
      this.dataSource.data = data;
    });
  }
}
