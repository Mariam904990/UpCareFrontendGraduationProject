import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ElementRef, Inject, OnInit, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable, map, startWith } from 'rxjs';
import { AuthService } from 'src/app/Core/Services/auth.service';
import { CheckupService } from 'src/app/Core/Services/checkup.service';
import { RadiologyService } from 'src/app/Core/Services/radiology.service';
import { StaffService } from 'src/app/Core/Services/staff.service';

@Component({
  selector: 'app-add-prescription',
  templateUrl: './add-prescription.component.html',
  styleUrls: ['./add-prescription.component.scss']
})
export class AddPrescriptionComponent implements OnInit {

  prescriptionDataForm!: FormGroup

  // Form Controls for the medicine autocomplete
  medicineCtrl = new FormControl('');
  filteredMedicine: Observable<any[]>;
  medicineList: any[] = [];
  checkedMedicine: any[] = [];

  // Form Controls for the checkup autocomplete
  checkupCtrl = new FormControl('');
  filteredCheckup: Observable<any[]>;
  checkupList: any[] = [];
  checkedCheckups: any[] = [];

  // Form Controls for the radiology autocomplete
  radiologyCtrl = new FormControl('');
  filteredRadiology!: Observable<any[]>;
  radiologyList: any[] = []
  checkedRadiologies: any[] = []


  // separatorKeysCodes: number[] = [ENTER, COMMA];
  // [matChipInputSeparatorKeyCodes]="separatorKeysCodes"
  announcer = inject(LiveAnnouncer)

  @ViewChild('medicineInput') medicineInput!: ElementRef<HTMLInputElement>;
  @ViewChild('checkupInput') checkupInput!: ElementRef<HTMLInputElement>;
  @ViewChild('radiologyInput') radiologyInput!: ElementRef<HTMLInputElement>;

  constructor(
    private _StaffService: StaffService,
    private _CheckupService: CheckupService,
    private _RadiologyService: RadiologyService,
    private _AuthService: AuthService,
    private _FormBuilder: FormBuilder,
    private _MatDialogRef: MatDialogRef<AddPrescriptionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.filteredMedicine = this.medicineCtrl.valueChanges.pipe(
      startWith(''),
      map((medicine: string | null) => medicine ? this._filterMedicine(medicine) : this.medicineList.slice())
    );

    this.filteredCheckup = this.checkupCtrl.valueChanges.pipe(
      startWith(''),
      map((medicine: string | null) => medicine ? this._filterCheckup(medicine) : this.checkupList.slice())
    );

    this.filteredRadiology = this.radiologyCtrl.valueChanges.pipe(
      startWith(''),
      map((medicine: string | null) => medicine ? this._filterRadiology(medicine) : this.radiologyList.slice())
    );
  }

  submitForm() {
    const model = {
      fK_MedicineIds: [...this.checkedMedicine.map(m => m.id)],
      fK_CheckupsIds: [...this.checkedCheckups.map(m => m.id)],
      fK_RadiologiesIds: [...this.checkedRadiologies.map(m => m.id)],
      ...this.prescriptionDataForm.value
    }

    this._StaffService.addPrescription(model).subscribe({
      next: response => {
        this._MatDialogRef.close('success');
      },
      error: error => {
        console.log(error);
      }
    })
  }

  addMedicine(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      const selectedMedicine = this.medicineList.find(med => med.name === value.trim());
      if (selectedMedicine && !this.checkedMedicine.includes(selectedMedicine)) {
        this.checkedMedicine.push(selectedMedicine);
      }
    }

    if (input) {
      input.value = '';
    }

    this.medicineCtrl.setValue(null);
  }

  addCheckup(event: MatChipInputEvent): void {

    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      const selectedCheckup = this.checkupList.find(chk => chk.name === value.trim());
      if (selectedCheckup && !this.checkedCheckups.includes(selectedCheckup)) {
        this.checkedCheckups.push(selectedCheckup);
      }
    }

    if (input) {
      input.value = '';
    }

    this.checkupCtrl.setValue(null);
  }

  addRadiology(event: MatChipInputEvent): void {

    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      const selectedRadiology = this.radiologyList.find(chk => chk.name === value.trim());
      if (selectedRadiology && !this.checkedRadiologies.includes(selectedRadiology)) {
        this.checkedRadiologies.push(selectedRadiology);
      }
    }

    if (input) {
      input.value = '';
    }

    this.radiologyCtrl.setValue(null);
  }

  removeMedicine(medicine: any): void {
    const index = this.checkedMedicine.indexOf(medicine);

    if (index >= 0) {
      this.checkedMedicine.splice(index, 1);
    }
  }

  removeCheckup(checkup: any): void {
    const index = this.checkedCheckups.indexOf(checkup);

    if (index >= 0) {
      this.checkedCheckups.splice(index, 1);
    }
  }

  removeRadiology(radiology: any): void {
    const index = this.checkedRadiologies.indexOf(radiology);

    if (index >= 0) {
      this.checkedRadiologies.splice(index, 1);
    }
  }

  selectedMedicine(event: MatAutocompleteSelectedEvent): void {

    const selectedMedicine = event.option.value;
    if (selectedMedicine && !this.checkedMedicine.includes(selectedMedicine)) {
      this.checkedMedicine.push(selectedMedicine);
    }
    this.medicineCtrl.setValue('');
  }

  selectedCheckup(event: MatAutocompleteSelectedEvent): void {

    const selectedCheckup = event.option.value;
    if (selectedCheckup && !this.checkedCheckups.includes(selectedCheckup)) {
      this.checkedCheckups.push(selectedCheckup);
    }
    this.checkupCtrl.setValue('');
  }

  selectedRadiology(event: MatAutocompleteSelectedEvent): void {
    const selectedRadiology = event.option.value;
    if (selectedRadiology && !this.checkedRadiologies.includes(selectedRadiology)) {
      this.checkedRadiologies.push(selectedRadiology);
    }
    this.radiologyCtrl.setValue('');
  }

  ngOnInit(): void {
    this.prescriptionDataForm = this._FormBuilder.group({
      diagnosis: ['', [Validators.required]],
      details: ['', [Validators.required]],
      advice: ['', [Validators.required]],
      fK_DoctorId: [this._AuthService.user?.id, [Validators.required]],
      fK_PatientId: [this.data.patientId, [Validators.required]],
    })

    this._CheckupService.getAll().subscribe({
      next: response => {
        this.checkupList = response;
        this.filteredCheckup = this.checkupCtrl.valueChanges.pipe(
          startWith(''),
          map((medicine: string | null) => medicine ? this._filterCheckup(medicine) : this.checkupList.slice())
        );
      },
      error: error => {
        console.log(error);
      }
    })

    this._RadiologyService.getAll().subscribe({
      next: response => {
        this.radiologyList = response;
        this.filteredRadiology = this.radiologyCtrl.valueChanges.pipe(
          startWith(''),
          map((medicine: string | null) => medicine ? this._filterRadiology(medicine) : this.radiologyList.slice())
        );
      },
      error: error => {
        console.log(error);
      }
    })

    this._StaffService.getMedicine().subscribe({
      next: response => {
        this.medicineList = response

        this.filteredMedicine = this.medicineCtrl.valueChanges.pipe(
          startWith(''),
          map((medicine: string | null) => medicine ? this._filterMedicine(medicine) : this.medicineList.slice())
        );
      },
      error: error => {
        console.log(error);
      }
    })
  }

  private _filterMedicine(value: string): any[] {

    const filterValue = value;
    return this.medicineList.filter(medicine => medicine.name.includes(filterValue));
  }

  private _filterCheckup(value: string): any[] {
    const filterValue = value;
    return this.checkupList.filter(checkup => checkup.name.includes(filterValue));
  }

  private _filterRadiology(value: string): any[] {
    const filterValue = value;
    return this.radiologyList.filter(radiology => radiology.name.includes(filterValue));
  }
}
