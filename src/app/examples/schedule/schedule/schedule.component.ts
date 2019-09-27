import { Component, OnInit } from '@angular/core';
import { FileService } from 'app/examples/file/file.service';
import { Video } from 'app/examples/file/video.module';
import { DomSanitizer } from '@angular/platform-browser'

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {

  video: Video = new Video();
  constructor() { }

  ngOnInit() {
  }

 
}
