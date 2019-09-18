import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { ComponentsComponent } from './components/components.component';
import { ProfileComponent } from './examples/profile/profile.component';
import { SignupComponent } from './examples/signup/signup.component';
import { LandingComponent } from './examples/landing/landing.component';
import { NucleoiconsComponent } from './components/nucleoicons/nucleoicons.component';
import { LoginComponent } from './examples/login/login.component';
import { RoleGuard } from './authorization/role.guard';
import { AboutComponent } from './examples/about/about/about.component';
import { ContactComponent } from './examples/contact/contact/contact.component';
import { DashboardComponent } from './examples/dashboard/dashboard/dashboard.component';
import { ReservationComponent } from './examples/reservation/reservation/reservation.component';

const routes: Routes =[
    { path: 'home',             component: ComponentsComponent },
    { path: 'user-profile',     component: ProfileComponent, 
        canActivate: [RoleGuard], data: { expectedRoles: ['ROLE_ADMINISTRATOR', 'ROLE_OWNER', 'ROLE_EMPLOYEE', 'ROLE_CLIENT']}},
    { path: 'register',         component: SignupComponent },
    { path: 'reservations',     component: ReservationComponent},
    { path: 'login',            component: LoginComponent},
    { path: 'landing',          component: LandingComponent },
    { path: 'about',            component: AboutComponent},
    { path: 'contact',          component: ContactComponent},
    { path: 'nucleoicons',      component: NucleoiconsComponent },
    { path: 'dashboard',        component: DashboardComponent,
        canActivate: [RoleGuard], data: { expectedRoles: ['ROLE_OWNER']}},
    { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
      useHash: false
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
