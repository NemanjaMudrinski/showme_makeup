import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { CalendarService } from '../calendar.service';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  todayValue = false;
  date = moment(); // today
  daysArray; // all days
  month; // current month
  monthNumber;
  yearNumber;
  eventNumber;
  events: Event[] = [];
  eventsCount: any[] = [];
  // dayObjects: Day[] = [];

  constructor(calendarService: CalendarService) { }

  ngOnInit() {
  }

}
