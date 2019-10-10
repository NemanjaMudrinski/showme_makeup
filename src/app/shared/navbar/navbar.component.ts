import { Component, OnInit, ElementRef } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Subscription } from 'rxjs';
import { AuthService } from 'app/authorization/auth.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    private toggleButton: any;
    private sidebarVisible: boolean;

    isLoggedIn = false;
  public loggedUserUsername: String;
  private loggedUserRoles: String[];
  public loggedUserType: String;
  private loggedInSubcription : Subscription;
  roles = [];
  private roleSubcription : Subscription;

    constructor(private authService: AuthService, public location: Location, private element : ElementRef) {
        this.sidebarVisible = false;
    }

    ngOnInit() {
        this.isLoggedIn = this.authService.isLoggedIn();
        
        this.loggedInSubcription = this.authService.loggedInStatusChanged.subscribe(
          (status: boolean)=>{
            this.isLoggedIn = status;
            this.setUserForEditProfile(); // on log in
          }
        );
        this.setUserForEditProfile();
        const navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];

        this.roles = this.authService.getCurrentRoles();
        this.roleSubcription = this.authService.roleChanged.subscribe(
            (roles: [])=>{
        this.roles = roles;
      }
    );
    }
    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const html = document.getElementsByTagName('html')[0];
        // console.log(html);
        // console.log(toggleButton, 'toggle');

        setTimeout(function(){
            toggleButton.classList.add('toggled');
        }, 500);
        html.classList.add('nav-open');

        this.sidebarVisible = true;
    };
    sidebarClose() {
        const html = document.getElementsByTagName('html')[0];
        // console.log(html);
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        html.classList.remove('nav-open');
    };
    sidebarToggle() {
        // const toggleButton = this.toggleButton;
        // const body = document.getElementsByTagName('body')[0];
        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
    };
    // isHome() {
    //   var titlee = this.location.prepareExternalUrl(this.location.path());
    //   if(titlee.charAt(0) === '#'){
    //       titlee = titlee.slice( 1 );
    //   }
    //     if( titlee === '/home' ) {
    //         return true;
    //     }
    //     else {
    //         return false;
    //     }
    // }
    // isDocumentation() {
    //   var titlee = this.location.prepareExternalUrl(this.location.path());
    //   if(titlee.charAt(0) === '#'){
    //       titlee = titlee.slice( 1 );
    //   }
    //     if( titlee === '/documentation' ) {
    //         return true;
    //     }
    //     else {
    //         return false;
    //     }
    // }

    setUserForEditProfile(){
        this.loggedUserUsername = this.authService.getCurrentUser();
        this.loggedUserRoles = this.authService.getCurrentRoles();
        this.loggedUserRoles.forEach(role => {
          if(role == "ROLE_ADMINISTRATOR"){
            this.loggedUserType = "administrator";
          }
          else if(role == "ROLE_OWNER"){
            this.loggedUserType = "owner";
          }
          else if(role == "ROLE_EMPLOYEE"){
            this.loggedUserType = "employee";
          }
          else if(role == "ROLE_CLIENT"){
            this.loggedUserType = "client";
          }
        });
      }
    
      onLogout(){
        this.authService.logout();
      }
      
      ngOnDestroy(){
        this.loggedInSubcription.unsubscribe();
      }
}
