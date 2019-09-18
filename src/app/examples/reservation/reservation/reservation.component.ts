import { Component, OnInit, ViewChild } from '@angular/core';
import { ReservationService } from '../reservation.service';
import { Reservation } from '../reservation.model';
import { MatTableDataSource, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit {

  reservations:Reservation[] = [];
  reservation:Reservation = new Reservation();
  displayedColumns: string[] = ['id', 'client.personalData.firstName', 'client.personalData.lastName', 'confirmed'];
  dataSource = new MatTableDataSource<Reservation>(this.reservations);

  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(private reservationService: ReservationService) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.getAllReservations();
  }

  getAllReservations() {
    this.reservationService.getAll().subscribe((data:Reservation[]) => {
      this.reservations = data;
      console.log(this.reservations);
      this.dataSource.data = data;
    });
  }
}
