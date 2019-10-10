import { Component, OnInit, ViewChild } from '@angular/core';
import { ScheduleService } from '../schedule.service';
import { Schedule } from '../schedule.model';
import { FileService } from 'app/examples/file/file.service';
import { AuthService } from 'app/authorization/auth.service';
import { ScheduleTime } from '../scheduleTime.model';
import { CdkDropList, CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-create-schedule',
  templateUrl: './create-schedule.component.html',
  styleUrls: ['./create-schedule.component.scss']
})
export class CreateScheduleComponent implements OnInit {

  @ViewChild('scheduleTimeList') time: CdkDropList;

  schedules: Schedule[]= [];
  // schedule: Schedule = new Schedule();
  schedulesTime: ScheduleTime[] = [];
  scheime: ScheduleTime = new ScheduleTime();
  copy: ScheduleTime[] = [];
 
  constructor(private scheduleService:ScheduleService, private fileService: FileService, private authService: AuthService, private store: Store) { }

  ngOnInit() {
    let loggedUser = this.authService.getCurrentUser();
    if(loggedUser) {
      
    } else {
      console.log("Unknow user");
    }

    this.getAllSchedulesTime();
  }

  getAllSchedulesTime() {
    this.scheduleService.getAllScheduleTime().subscribe((data: ScheduleTime[]) => {
      this.schedulesTime = data;
      console.log(this.schedulesTime);
    })
  }

}
