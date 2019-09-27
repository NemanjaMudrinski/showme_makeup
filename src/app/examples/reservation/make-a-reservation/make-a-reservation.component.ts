import { Component, OnInit } from '@angular/core';
import { ScheduleService } from 'app/examples/schedule/schedule.service';
import { ReservationService } from '../reservation.service';
import { AuthService } from 'app/authorization/auth.service';
import { Schedule } from 'app/examples/schedule/schedule.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Reservation } from '../reservation.model';
import { Client } from 'app/examples/client/client';
import { ScheduleTime } from 'app/examples/schedule/scheduleTime.model';

@Component({
  selector: 'app-make-a-reservation',
  templateUrl: './make-a-reservation.component.html',
  styleUrls: ['./make-a-reservation.component.scss']
})
export class MakeAReservationComponent implements OnInit {

  public makeReservation: FormGroup;
  reservation: Reservation = new Reservation;
  loggedUser: Client;
  schedules: Schedule[] = [];
  schedule: Schedule;
  reservationObject = new Reservation();
  
  constructor(private scheduleService: ScheduleService, private reservationService: ReservationService, private authService: AuthService, private formBuilder: FormBuilder) {

  }

  ngOnInit() {
    this.getUserLogin();
    this.getSchedules();
    
    // this.makeReservation = this.formBuilder.group({
    //   schedule: ['', {validators: [Validators.required]}],
    //   client: ['this.loggedUser', {validators: [Validators.required]}]
    // })
    
  }

  getUserLogin() {
    this.authService.getLoggedInUser().subscribe((data:Client) => {
      this.loggedUser = data;
      console.log(this.loggedUser)
    })
  }

  getSchedules() {
    this.scheduleService.getFutureSchedule().subscribe((data) => {
      this.schedules = data;
      console.log(this.schedules);
    })
  }

  save() {
    // this.reservation = this.makeReservation.value;
    // console.log(this.reservation);
    this.reservation.id = null,
    this.reservation.schedule = this.schedule,
    this.reservation.client = this.loggedUser;
    console.log(this.reservation)
    this.reservationService.addReservation(this.reservation).subscribe(_=> {
      
    })
    
  }

 
}
