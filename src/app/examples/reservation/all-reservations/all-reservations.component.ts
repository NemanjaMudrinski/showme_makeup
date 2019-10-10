import { Component, OnInit, ViewChild } from '@angular/core';
import { ReservationService } from '../reservation.service';
import { Reservation } from '../reservation.model';
import { MatTableDataSource, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-all-reservations',
  templateUrl: './all-reservations.component.html',
  styleUrls: ['./all-reservations.component.scss']
})
export class AllReservationsComponent implements OnInit {

  reservations: Reservation[] = []
  reservation: Reservation;
  displayedColumns: string[] = ['id', 'client.personalData.firstName', 'client.personalData.lastName', 'client.personalData.phoneNumber', 'schedule.day'];
  dataSource = new MatTableDataSource<Reservation>(this.reservations);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private reservationService: ReservationService) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.getAllReservation();
  }

  getAllReservation() {
    this.reservationService.getAll().subscribe((data: Reservation[]) => {
      this.reservations = data;
      console.log(this.reservations)
      this.dataSource.data = data;
    });
  }

  

}
