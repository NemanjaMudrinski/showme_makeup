import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as moment from 'moment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  private messageSource = new BehaviorSubject<moment.Moment>(moment());
  currentMessage = this.messageSource.asObservable();

  constructor(private httpClient: HttpClient){}

  changeMessage(date: moment.Moment){
      this.messageSource.next(date);
  }



}
