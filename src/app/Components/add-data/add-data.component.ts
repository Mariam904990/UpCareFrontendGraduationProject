import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Observable, map, startWith } from 'rxjs';
import { AuthService } from 'src/app/Core/Services/auth.service';
import { StaffService } from 'src/app/Core/Services/staff.service';

@Component({
  selector: 'app-add-data',
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.scss']
})
export class AddDataComponent implements OnInit {
  selectedItem: FormControl = new FormControl()
  gender: string = 'male'
  specialities: any[] = []
  filteredOptions!: Observable<any> | undefined;
  patientForm!: FormGroup
  emergency!: FormGroup
  hide: boolean = true

  constructor(
    public _AuthService: AuthService,
    private _FormBuilder: FormBuilder,
    private _StaffService: StaffService,
    private _MatDialogRef: MatDialogRef<AddDataComponent>,
    private _ToastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.patientForm = this._FormBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      dateOfBirth: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^(01|\+201)[01259]\d{9}$/)]],
      bloodType: [''],
      gender: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{1,6}$/)]],
      receptionistId: this._AuthService.user?.id,
      address: ['', [Validators.required]],
    })

    this.emergency = this._FormBuilder.group({
      patientId: ['', [Validators.required]],
      speciality: ['', [Validators.required]],
      type: ['', [Validators.required, Validators.min(3), Validators.max(4)]]
    })

    this._StaffService.getSpecialities().subscribe({
      next: response => {
        this.specialities = response
      }
    })
    this.filteredOptions = this.emergency.get('speciality')?.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.specialities.filter(option => option.toLowerCase().includes(filterValue));
  }

  submitForm() {
    if (this.patientForm.status == 'VALID') {
      console.log('patient', this.patientForm.value);
      this._StaffService.addPatient(this.patientForm.value).subscribe({
        next: (response) => {
          this.emergency.setValue({
            patientId: response.id,
            speciality: this.selectedItem.value,
            type: 4
          })
          console.log('emergency', this.emergency.value);
          this._MatDialogRef.close(this.emergency.value)
        },
        error: err => {
          console.log(err);
          this._ToastrService.error(err.message);

        }
      })
    }
  }
}
