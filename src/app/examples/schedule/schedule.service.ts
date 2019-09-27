import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Schedule } from './schedule.model';
import { ScheduleTime } from './scheduleTime.model';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  private scheduleUrl = "http://localhost:8080/schedule";
  private scheduleTimeUrl = "http://localhost:8080/schedule-time";

  constructor(private httpClient: HttpClient) {

   }

   getSchedules() {
     return this.httpClient.get<Schedule[]>(this.scheduleUrl + `/all`);
   }

   getScheduleById(id: string) {
     return this.httpClient.get<Schedule>(this.scheduleUrl + `/${id}`);
   }

   addSchedule(schedule: Schedule) {
     return this.httpClient.post(this.scheduleUrl + `/add`, schedule);
   }

   editSchedule(id: string, schedule: Schedule){
     return this.httpClient.put(this.scheduleUrl + `/${id}`, schedule);
   }

   deleteSchedule(id: string) {
     return this.httpClient.delete(this.scheduleUrl + `/${id}`);
   }

   getAllScheduleTime() {
     return this.httpClient.get<ScheduleTime[]>(this.scheduleTimeUrl + `/all`);
   }

   getFutureSchedule() {
     return this.httpClient.get<Schedule[]>(this.scheduleUrl + `/future`)
   }
   
}
