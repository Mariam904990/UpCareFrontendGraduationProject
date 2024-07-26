import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/Core/Services/auth.service';
import { StaffService } from 'src/app/Core/Services/staff.service';

@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.scss']
})
export class AddDoctorComponent implements OnInit {

  doctorDataForm!: FormGroup
  hide: boolean = true

  constructor(
    private _FormBuilder: FormBuilder,
    private _AuthService: AuthService,
    private _StaffService: StaffService,
    private _MatDialogRef: MatDialogRef<AddDoctorComponent>
  ) { }

  submitForm() {
    this.doctorDataForm.get('gender')?.setValue(Number.parseInt(this.doctorDataForm.value.gender))
    console.log(this.doctorDataForm.value);
    this._StaffService.addDoctor(this.doctorDataForm.value).subscribe({
      next: response => {
        this._MatDialogRef.close(response.firstName);
      },
      error: error => {
        console.log(error);
      }
    })
  }

  ngOnInit(): void {
    this.doctorDataForm = this._FormBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^(01|\+201)[01259]\d{9}$/)]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{1,6}$/)]],
      gender: ['0', [Validators.required]],
      speciality: ['', [Validators.required]],
      isSurgeon: [false, [Validators.required]],
      consultationPrice: [0, [Validators.required, Validators.min(1), Validators.max(500)]],
      appointmentPrice: [0, [Validators.required, Validators.min(1), Validators.max(500)]],
      address: ['', [Validators.required]],
      adminId: [this._AuthService.user?.id]
    })
  }
}
