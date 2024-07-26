import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable, map, startWith } from 'rxjs';
import { StaffService } from 'src/app/Core/Services/staff.service';

@Component({
  selector: 'app-add-booking',
  templateUrl: './add-booking.component.html',
  styleUrls: ['./add-booking.component.scss']
})
export class AddBookingComponent implements OnInit {

  doctors: any[] = []
  patients: any[] = []
  filteredDoctors!: Observable<any[]>;
  filteredPatients!: Observable<any[]>;
  bookingDataForm!: FormGroup
  patientCtrl = new FormControl('', [Validators.required]);
  doctorCtrl = new FormControl('', [Validators.required]);
  selectedDoctor!: any
  selectedPatient!: any
  constructor(
    private _StaffService: StaffService,
    private _FormBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _MatDialogRef:MatDialogRef<AddBookingComponent>
  ) { }

  submitForm() {
    const model = {
      fK_RoomId: this.data?.id,
      fK_DoctorId: this.selectedDoctor?.id,
      fK_PatientId: this.selectedPatient?.id,
      numberOfRecievedBeds: Number.parseInt(this.bookingDataForm.value.numberOfRecievedBeds)
    }

    this._StaffService.addNewBooking(model).subscribe({
      next: response => {
        this._MatDialogRef.close('booked')
      },
      error: error => {
        console.log(error);
      }
    })
  }

  ngOnInit(): void {
    console.log(this.data);
    this.bookingDataForm = this._FormBuilder.group({
      numberOfRecievedBeds: ['', [Validators.required, Validators.min(1), Validators.max(this.data?.availableBedsNumber)]]
    })

    this._StaffService.getAllDoctors().subscribe({
      next: response => {
        this.doctors = response
        this.filteredDoctors = this.doctorCtrl.valueChanges.pipe(
          startWith(''),
          map(value => this._filterDoctor(value || '')),
        );
      },
      error: error => {
        console.log(error);
      }
    })

    this._StaffService.getAllPatients().subscribe({
      next: response => {
        this.patients = response
        this.filteredPatients = this.patientCtrl.valueChanges.pipe(
          startWith(''),
          map(value => this._filterPatient(value || '')),
        );
      },
      error: error => {
        console.log(error);
      }
    })

  }

  private _filterDoctor(value: any): any[] {    
    return this.doctors.filter(option => `${option?.firstName} ${option?.lastName}`.includes(value));
  }
  
  private _filterPatient(value: any): any[] {
    return this.patients.filter(option => `${option?.firstName} ${option?.lastName}`.includes(value));
  }
  
  onDoctorSelected(event: any): void {
    this.selectedDoctor = event.option.value;
    this.doctorCtrl.setValue(`${this.selectedDoctor?.firstName} ${this.selectedDoctor?.lastName}`);
  }
  
  onPatientSelected(event: any): void {
    this.selectedPatient = event.option.value;
    this.patientCtrl.setValue(`${this.selectedPatient?.firstName} ${this.selectedPatient?.lastName}`);
  }

}
