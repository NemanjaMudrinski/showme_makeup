import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/authorization/auth.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {

    constructor(private authService: AuthService,) { }

    ngOnInit() {
        let loggedUser = this.authService.getCurrentUser();
        if (loggedUser) {
          console.log(loggedUser);
        }
        else {
          console.log("unknown username");
        }
      }

      s() {
        console.log("Succes")
      }
}
