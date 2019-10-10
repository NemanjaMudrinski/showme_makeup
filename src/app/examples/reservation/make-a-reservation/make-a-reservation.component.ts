import { Component, OnInit } from '@angular/core';
import { ScheduleService } from 'app/examples/schedule/schedule.service';
import { ReservationService } from '../reservation.service';
import { AuthService } from 'app/authorization/auth.service';
import { Schedule } from 'app/examples/schedule/schedule.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Reservation } from '../reservation.model';
import { Client } from 'app/examples/client/client';
import { ScheduleTime } from 'app/examples/schedule/scheduleTime.model';
import * as moment from 'moment';
import { Day } from 'app/examples/calendar/day/day.model';
import { CalendarService } from 'app/examples/calendar/calendar.service';
import { Router } from "@angular/router";
@Component({
  selector: 'app-make-a-reservation',
  templateUrl: './make-a-reservation.component.html',
  styleUrls: ['./make-a-reservation.component.scss']
})
export class MakeAReservationComponent implements OnInit {

  reservation: Reservation = new Reservation;
  loggedUser: Client;
  schedules: Schedule[] = [];
  schedule: Schedule;
  
  todayValue = false;
  date = moment();
  daysArray;
  month;
  monthNumber;
  yearNumber;
  appointmentNumber;
  events: Schedule[] = [];
  appointments: any[] = [];
  dayObjects: Day[] = [];
  clicked: moment.Moment;

  
  constructor(private router: Router, private calendarService: CalendarService, private scheduleService: ScheduleService, private reservationService: ReservationService, private authService: AuthService, private formBuilder: FormBuilder) {

  }

  ngOnInit() {
    let loggedInUser = this.authService.getCurrentUser();
    if(loggedInUser) {
      this.daysArray = this.createCalendar(this.date, this.date.month()+1, this.date.year());
      this.getUserLogin();
      // this.getSchedules();
  
      this.calendarService.currentMessage.subscribe(message => {
        this.clicked = message;
        this.getCurrentEvents(this.clicked);
      });
    } else {
      this.daysArray = this.createCalendar(this.date, this.date.month()+1, this.date.year());
    
      this.calendarService.currentMessage.subscribe(message => {
        this.clicked = message;
        this.getCurrentEvents(this.clicked);
      });
    }
    
    
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

  // save() {
  //   this.reservation.id = null,
  //   this.reservation.schedule = this.schedule,
  //   this.reservation.client = this.loggedUser;
  //   console.log(this.reservation)
  //   this.reservationService.addReservation(this.reservation).subscribe(_=> {
      
  //   })
    
  // }

  save(){  // FORMAT
    if(this.loggedUser) {
      this.reservation.id = null,
      this.reservation.schedule = this.schedule,
      this.reservation.client = this.loggedUser;
        
      console.log(this.reservation);
      this.reservationService.addReservation(this.reservation);
    } else {
      this.router.navigate(['/login']);
    }
    
  }

  // ----------------------------------------------
 
  getCurrentEvents(date: moment.Moment){
    this.schedules = [];
    this.scheduleService.getCurrentEvents(date.date(), date.month()+1, date.year()).subscribe((data:Schedule[]) => {
      this.schedules = data;
      console.log(this.schedules)
      // this.converter(this.listOfEvents);
    })
  }
  

  // Events for active month
  getEventsCount(month: Number, year: Number){
    this.scheduleService.getEventsCount(month, year).subscribe((data) => {
      this.appointments = data;
      this.appointmentNumber = this.appointments.length;
      this.convertToEvent();
      this.createEventsBadges();
    })
  }
  
  convertToEvent(){
    this.events = [];
    this.appointments.forEach(element => {
      let e = new Schedule(moment(element.day).format(), element.owner, element.time);
      this.events.push(e);
    });
  }


  createEventsBadges(){
    this.dayObjects = [];
    let counter = 0;

    for (const day of this.daysArray) {
      if (day != null) {
        for (const event of this.events) {
          if (day.isSame(event.day)) {
            counter += 1;
          }
        }
        let d = new Day(day, counter);
        this.dayObjects.push(d);
        counter = 0;
      } else {
        let b = new Day(day, counter);
        this.dayObjects.push(b);
      }
      
        
    }
  }

  // Calendar creator
  createCalendar(month, newMonth: Number, newYear: Number) {
    let firstDay = moment(month).startOf("M");
    let lastDay = moment(month).endOf("M");
    // data for eventCount
    this.monthNumber = moment().format('M');
    this.yearNumber = moment().format('YYYY');
    // console.log(newMonth);
    // console.log(newYear);
    this.getEventsCount(newMonth, newYear);

    let days = Array.apply(null, {length: month.daysInMonth()})
      .map(Number.call, Number)
      .map((n)=>{
        return moment(firstDay).add(n, 'd');
      })    
    
    for(let n=0; n < firstDay.weekday(); n++){  
      days.unshift(null);
    }

    while(days.length < 35 || days.length > 35 && days.length < 42){
      days.push(null);
    }

    return days;
  }


  prevMonth(){
    this.date.subtract(1,'M');
    this.daysArray = this.createCalendar(this.date, this.date.month()+1, this.date.year());
  }

  nextMonth(){
    this.date.add(1, 'M');
    this.daysArray = this.createCalendar(this.date, this.date.month()+1, this.date.year());
  }

  clickedd(date: moment.Moment){
    this.calendarService.changeMessage(date);
  }

}
