import { Component, OnInit } from '@angular/core';
import { AgmCoreModule } from '@agm/core';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  latitude = 45.32070954752601;
  longitude = 19.350073274966576;
  
  constructor() { }

  ngOnInit() {
  }

  onChoseLocation(event) {
    console.log(event);
  }
}
