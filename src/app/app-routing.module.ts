import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './Layout/auth/auth.component';
import { EmergencyComponent } from './Components/emergency/emergency.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { PatientsComponent } from './Components/patients/patients.component';
import { PatientProfileComponent } from './Components/patient-profile/patient-profile.component';
import { RoomsComponent } from './Components/rooms/rooms.component';
import { DoctorsComponent } from './Components/doctors/doctors.component';
import { NursesComponent } from './Components/nurses/nurses.component';
import { ReceptionistsComponent } from './Components/receptionists/receptionists.component';
import { CheckupComponent } from './Components/checkup/checkup.component';
import { RadiologyComponent } from './Components/radiology/radiology.component';
import { PharmacyComponent } from './Components/pharmacy/pharmacy.component';
import { ScheduleComponent } from './Components/schedule/schedule.component';
import { BillsComponent } from './Components/bills/bills.component';
import { ReviewsComponent } from './Components/reviews/reviews.component';
import { LoginComponent } from './Components/login/login.component';
import { NotfoundComponent } from './Components/notfound/notfound.component';
import { authGuard } from './Core/Guards/auth.guard';
import { MessagesComponent } from './Components/messages/messages.component';

const routes: Routes = [
  {
    path: '', canActivate: [authGuard], component: AuthComponent, children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'emergency', component: EmergencyComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'patients', component: PatientsComponent },
      { path: 'patients/:id', component: PatientProfileComponent },
      { path: 'rooms', component: RoomsComponent },
      { path: 'doctors', component: DoctorsComponent },
      { path: 'nurses', component: NursesComponent },
      { path: 'receptionist', component: ReceptionistsComponent },
      { path: 'checkup-lab', component: CheckupComponent },
      { path: 'radiology-lab', component: RadiologyComponent },
      { path: 'pharmacy', component: PharmacyComponent },
      { path: 'schedule', component: ScheduleComponent },
      { path: 'bills', component: BillsComponent },
      { path: 'reviews', component: ReviewsComponent },
      { path: 'messages', component: MessagesComponent },
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: '**', component: NotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
