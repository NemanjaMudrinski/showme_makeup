import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

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

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgbModule,
        ReactiveFormsModule,
        Material
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
        DashboardComponent
    ],
    entryComponents: [NgbdModalContent],
})
export class ExamplesModule { }
