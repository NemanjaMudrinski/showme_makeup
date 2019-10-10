import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/authorization/auth.service';
import { Owner } from 'app/examples/owner/owner';
import { FileService } from 'app/examples/file/file.service';
import { ReservationService } from 'app/examples/reservation/reservation.service';
import { Reservation } from 'app/examples/reservation/reservation.model';

@Component({
  selector: 'app-profile-owner',
  templateUrl: './profile-owner.component.html',
  styleUrls: ['./profile-owner.component.scss']
})
export class ProfileOwnerComponent implements OnInit {

  loggedUserOwner;
  public fileUrl: string = this.fileService.fileUrl;
  public profileImageUrl: string = "images/profile_images/default.png";
  
  
  constructor(private authService: AuthService, private fileService: FileService) { }

  ngOnInit() {
    this.getLoggedUser();
   
  }

  getLoggedUser() {
    this.authService.getLoggedInUserOwner().subscribe((data: Owner) => {
      this.loggedUserOwner = data;
      console.log(this.loggedUserOwner)
    })
  }

  

}
