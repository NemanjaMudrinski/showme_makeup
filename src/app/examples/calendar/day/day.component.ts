import { Component, OnInit, Input } from '@angular/core';
import { Day } from './day.model'
import * as moment from 'moment';
import { Event } from '../calendar/event.model';
import { CalendarComponent } from '../calendar/calendar.component';
import { CalendarService } from '../calendar.service';
import { Schedule } from 'app/examples/schedule/schedule.model';
import { ScheduleService } from 'app/examples/schedule/schedule.service';
import { AuthService } from 'app/authorization/auth.service';
import { Client } from 'app/examples/client/client';
import { Owner } from 'app/examples/owner/owner';
import { ScheduleTime } from 'app/examples/schedule/scheduleTime.model';


@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.scss']
})
export class DayComponent implements OnInit {

  @Input() day: Day;
  clicked: moment.Moment;
  schedule: Schedule;
  listOfEvents: Schedule[] = [];
  schedulesTime: ScheduleTime[] = [];
  scheduleTime: ScheduleTime;
  loggedIn;
  clickedd = false;

  addSchedule: Schedule = {
    'id': null,
    'day':this.clicked,
    'owner': this.loggedIn,
    'time': this.scheduleTime
  }

  constructor(private authService: AuthService, private scheduleService: ScheduleService, private data:CalendarService, private calendar: CalendarComponent) { }

  ngOnInit() {
    // Subscribed on Calendar Component
    this.data.currentMessage.subscribe(message => {
      this.clicked = message;
      this.getCurrentEvents(this.clicked);
    });
    this.getUserLogin();
    this.getScheduleTime();
  }


  // Get Events for Clicked Day
  getCurrentEvents(date: moment.Moment){
    this.listOfEvents = [];
    this.scheduleService.getCurrentEvents(date.date(), date.month()+1, date.year()).subscribe((data:Schedule[]) => {
      this.listOfEvents = data;
      console.log(this.listOfEvents)
      // this.converter(this.listOfEvents);
    })
  }

  // converter(list){
  //   this.listOfEvents = [];
  //   list.forEach(element => {
  //     let ev = new Schedule(moment(element.day), element.owner, element.time);
  //     this.listOfEvents.push(ev);
  //   });
  // }



  newEvent(){  // FORMAT ?
    const date = this.clicked;
    let e = new Schedule (this.clicked.add(1, 'days').format("YYYY-MM-DD") , this.addSchedule.owner = this.loggedIn, this.addSchedule.time);
    console.log(e);
    this.scheduleService.addSchedule(e).subscribe(() => {
      this.ngOnInit();
      this.calendar.ngOnInit();
    })
  }

  getUserLogin() {
    this.authService.getLoggedInUserOwner().subscribe((data:Owner) => {
      this.loggedIn = data;
      console.log(this.loggedIn)
    });
  }

  getScheduleTime() {
    this.scheduleService.getAllScheduleTime().subscribe((data: ScheduleTime[]) => {
      this.schedulesTime = data;
      console.log(this.schedulesTime);
    });
  }


}
