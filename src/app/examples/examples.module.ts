import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgmCoreModule } from '@agm/core';

import { LandingComponent } from './landing/landing.component';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { AdministratorComponent } from './administrator/administrator/administrator.component';
import { AccountDataComponent } from './account-data/account-data/account-data.component';
import { PersonalDataComponent } from './personal-data/personal-data/personal-data.component';
import { ClientComponent } from './client/client/client.component';
import { NgbdModalContent, NgbdModalComponent } from 'app/components/modal/modal.component';
import { AboutComponent } from './about/about/about.component';
import { ContactComponent } from './contact/contact/contact.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { Material } from './utils/material';
import { ReservationComponent } from './reservation/reservation/reservation.component';
import { ScheduleComponent } from './schedule/schedule/schedule.component';
import { CreateScheduleComponent } from './schedule/create-schedule/create-schedule.component';
import { NgxsModule } from '@ngxs/store';
import { environment } from 'environments/environment';
import { CalendarComponent } from './calendar/calendar/calendar.component';
import { MakeAReservationComponent } from './reservation/make-a-reservation/make-a-reservation.component';
import { ProfileOwnerComponent } from './profile/profile-owner/profile-owner.component';
// import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgbModule,
        ReactiveFormsModule,
        Material,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyBSS--jig4u8mPllqaaU7Rg5tzQ4V7PRRc'
        }),
        NgxsModule.forRoot([],
             { developmentMode: !environment.production }),
        //   NgxsReduxDevtoolsPluginModule.forRoot()
    ],
    declarations: [
        LandingComponent,
        SignupComponent,
        ProfileComponent,
        LoginComponent,
        AdministratorComponent,
        AccountDataComponent,
        PersonalDataComponent,
        ClientComponent,
        NgbdModalComponent,
        NgbdModalContent,
        ReservationComponent,
        AboutComponent,
        ContactComponent,
        DashboardComponent,
        ScheduleComponent,
        CreateScheduleComponent,
        CalendarComponent,
        MakeAReservationComponent,
        ProfileOwnerComponent
    ],
    entryComponents: [NgbdModalContent],
})
export class ExamplesModule { }
