import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'app/authorization/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor( private authorizationService : AuthService) { }

  ngOnInit() {
  }

  login(form: NgForm){
    if (form.invalid) {
      return;
    }
    this.authorizationService.login(form.value.username, form.value.password);
  }

  logout() {
    this.authorizationService.logout();
  }
}
