import { Component, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { CalendarService } from '../calendar.service';
import { Day } from '../day/day.model';
import { Event } from './event.model';
import { ScheduleService } from 'app/examples/schedule/schedule.service';
import { CdkDropList } from '@angular/cdk/drag-drop';
import { Schedule } from 'app/examples/schedule/schedule.model';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  @ViewChild('trainingsList') train: CdkDropList;

  todayValue = false;
  date = moment(); // today
  daysArray; // all days
  month; // current month
  monthNumber;
  yearNumber;
  appointmentNumber;
  events: Schedule[] = [];
  appointments: any[] = [];
  dayObjects: Day[] = [];

  constructor(private calendarService: CalendarService, private scheduleService: ScheduleService) { }

  ngOnInit() {
    this.daysArray = this.createCalendar(this.date, this.date.month()+1, this.date.year());
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

  clicked(date: moment.Moment){
    this.calendarService.changeMessage(date);
  }




}


