import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'app/authorization/auth.service';
import { Client } from '../client/client';
import { FileService } from '../file/file.service';
import { Owner } from '../owner/owner';
import { ReservationService } from '../reservation/reservation.service';
import { Reservation } from '../reservation/reservation.model';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {

  private loggedUser;
  
  public fileUrl: string = this.fileService.fileUrl;
  // public profileImageUrl: string = "{{loggedUser.personalData.profileImagePath}}";


  reservations: Reservation[] = []
  reservation:Reservation = new Reservation();
  displayedColumns: string[] = ['id', 'reservationMade', 'confirmed'];
  dataSource = new MatTableDataSource<Reservation>(this.reservations);

  @ViewChild(MatPaginator ) paginator: MatPaginator;


  constructor(private authService: AuthService, private fileService: FileService, private reservationService: ReservationService, private titleService:Title) {
    this.titleService.setTitle("Showme_makeup: Profile")
  }

  ngOnInit() {
    this.getUserLogin();
    
    let loggedInUser = this.authService.getCurrentUser();
    if (loggedInUser) {
      this.dataSource.paginator = this.paginator;
      this.getAllReservationByUser(loggedInUser);
          console.log(loggedInUser)
    } else {
    
    }
    
  }

  getUserLogin() {
    this.authService.getLoggedInUser().subscribe((data:Client) => {
    this.loggedUser = data;
    console.log(this.loggedUser)
    })
  }

  getAllReservationByUser(username: String) {
    this.reservationService.getAllReservationByUser(username).subscribe((data: Reservation[]) => {
      this.reservations = data;
      console.log(this.reservations)
    })
  }
  

  
}
