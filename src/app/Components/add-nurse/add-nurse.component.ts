import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/Core/Services/auth.service';
import { StaffService } from 'src/app/Core/Services/staff.service';

@Component({
  selector: 'app-add-nurse',
  templateUrl: './add-nurse.component.html',
  styleUrls: ['./add-nurse.component.scss']
})
export class AddNurseComponent implements OnInit {

  hide: boolean = true
  nurseDataForm!: FormGroup
  constructor(
    private _StaffService: StaffService,
    private _FormBuilder: FormBuilder,
    private _AuthService: AuthService,
    private _MatDialogRef: MatDialogRef<AddNurseComponent>
  ) { }

  submitForm() {
    if (this.nurseDataForm.valid) {
      this.nurseDataForm.get('gender')?.setValue((this.nurseDataForm.value.gender == '0') ? 0 : 1)
      console.log(this.nurseDataForm.value);
      this._StaffService.addNurse(this.nurseDataForm.value).subscribe({
        next: response => {
          this._MatDialogRef.close('success');
        },
        error: err => {
          console.log(err);
          this._MatDialogRef.close('fail');
        }
      })
    }

  }

  ngOnInit(): void {
    this.nurseDataForm = this._FormBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^(01|\+201)[01259]\d{9}$/)]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{1,6}$/)]],
      gender: [0 , [Validators.required]],
      address: ['', [Validators.required]],
      adminId: [this._AuthService.user?.id]
    })
  }

}
