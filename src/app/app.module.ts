import { ToastrModule } from 'ngx-toastr';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './Layout/auth/auth.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { LoginComponent } from './Components/login/login.component';
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
import { SidebarComponent } from './Components/sidebar/sidebar.component';
import { NotfoundComponent } from './Components/notfound/notfound.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { MatRadioModule } from '@angular/material/radio';
import { LoggedUserComponent } from './Components/logged-user/logged-user.component';
import { SearchPipe } from './Core/Pipes/search.pipe';
import { MatDialogModule } from '@angular/material/dialog';
import { AddDataComponent } from './Components/add-data/add-data.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { SearchForPatientPipe } from './Core/Pipes/search-for-patient.pipe';
import { SearchForRoomNumberPipe } from './Core/Pipes/search-for-room-number.pipe';
import { RoomDataComponent } from './Components/room-data/room-data.component';
import { PaymentDataComponent } from './Components/payment-data/payment-data.component';
import { AddDoctorComponent } from './Components/add-doctor/add-doctor.component';
import { AddNurseComponent } from './Components/add-nurse/add-nurse.component';
import { AddReceptionistComponent } from './Components/add-receptionist/add-receptionist.component';
import { SearchInFeedbackPipe } from './Core/Pipes/search-in-feedback.pipe';
import { SearchMedicinePipe } from './Core/Pipes/search-medicine.pipe';
import { AddMedicineComponent } from './Components/add-medicine/add-medicine.component';
import { MatSliderModule } from '@angular/material/slider';
import { SearchBillPipe } from './Core/Pipes/search-bill.pipe';
import { HealthRecordComponent } from './Components/health-record/health-record.component';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AddPrescriptionComponent } from './Components/add-prescription/add-prescription.component';
import { MatChipsModule } from '@angular/material/chips';
import { RoomDetailsComponent } from './Components/room-details/room-details.component';
import { ConfigComponent } from './Components/config/config.component';
import { AddBookingComponent } from './Components/add-booking/add-booking.component';
import { PaymentBookingComponent } from './Components/payment-booking/payment-booking.component';
import { MessagesComponent } from './Components/messages/messages.component';
import { AddCheckupComponent } from './Components/add-checkup/add-checkup.component';
import { UploadCheckupResultComponent } from './Components/upload-checkup-result/upload-checkup-result.component';
import { UploadRadiologyResultComponent } from './Componentts/upload-radiology-result/upload-radiology-result.component';
import { CheckupSearchPipe } from './Core/Pipes/checkup-search.pipe';
import { AddRadiologyComponent } from './Components/add-radiology/add-radiology.component';
import { NurseCareRecordsComponent } from './Components/nurse-care-records/nurse-care-records.component';
import { AddNurseCareComponent } from './Components/add-nurse-care/add-nurse-care.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    LoginComponent,
    EmergencyComponent,
    DashboardComponent,
    PatientsComponent,
    PatientProfileComponent,
    RoomsComponent,
    DoctorsComponent,
    NursesComponent,
    ReceptionistsComponent,
    CheckupComponent,
    RadiologyComponent,
    PharmacyComponent,
    ScheduleComponent,
    BillsComponent,
    ReviewsComponent,
    SidebarComponent,
    NotfoundComponent,
    LoggedUserComponent,
    SearchPipe,
    AddDataComponent,
    SearchForPatientPipe,
    SearchForRoomNumberPipe,
    RoomDataComponent,
    PaymentDataComponent,
    AddDoctorComponent,
    AddNurseComponent,
    AddReceptionistComponent,
    SearchInFeedbackPipe,
    SearchMedicinePipe,
    AddMedicineComponent,
    SearchBillPipe,
    HealthRecordComponent,
    AddPrescriptionComponent,
    RoomDetailsComponent,
    ConfigComponent,
    AddBookingComponent,
    PaymentBookingComponent,
    MessagesComponent,
    AddCheckupComponent,
    UploadCheckupResultComponent,
    UploadRadiologyResultComponent,
    CheckupSearchPipe,
    AddRadiologyComponent,
    NurseCareRecordsComponent,
    AddNurseCareComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    CommonModule,
    RouterOutlet,
    CanvasJSAngularChartsModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatSelectModule,
    MatDatepickerModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatNativeDateModule,
    MatChipsModule,
    MatIconModule,
    MatSliderModule,
    MatRadioModule,
    MatCheckboxModule,
    HttpClientModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
