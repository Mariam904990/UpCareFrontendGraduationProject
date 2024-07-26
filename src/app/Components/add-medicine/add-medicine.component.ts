import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { integerValidator } from 'src/app/Core/Custom.Validators/integer.validator';
import { AuthService } from 'src/app/Core/Services/auth.service';
import { StaffService } from 'src/app/Core/Services/staff.service';

@Component({
  selector: 'app-add-medicine',
  templateUrl: './add-medicine.component.html',
  styleUrls: ['./add-medicine.component.scss']
})
export class AddMedicineComponent implements OnInit {

  medicineFormData!: FormGroup
  constructor(
    private _MatDialogRef: MatDialogRef<AddMedicineComponent>,
    private _FormBuilder: FormBuilder,
    private _StaffService: StaffService,
    private _AuthService: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  submitForm() {
    if (this.data == null) {
      this.addMedicine()
    } else {
      const model = {
        id: this.data.id,
        ...this.medicineFormData.value
      }

      this.updateMedicine(model);
    }
  }

  addMedicine() {
    this._StaffService.addMedicine(this.medicineFormData.value).subscribe({
      next: response => {
        if (response?.message == 'success') {
          this._MatDialogRef.close('success');
        }
      },
      error: err => {
        console.log(err);
      }
    })
  }

  updateMedicine(data: object) {
    console.log(data);
    this._StaffService.updateMedicine(data).subscribe({
      next: response => {
        console.log(response);
        if (response.message == 'success') {
          this._MatDialogRef.close('updated')
        }
      },
      error: err => {
        console.log(err)
      }
    })
  }

  ngOnInit(): void {
    console.log(this.data);
    this.medicineFormData = this._FormBuilder.group({
      name: [(this.data == null) ? '' : this.data.name, [Validators.required]],
      category: [(this.data == null) ? '' : this.data.category, [Validators.required]],
      price: [(this.data == null) ? '' : this.data.price, [Validators.required, Validators.min(1)]],
      quantity: [(this.data == null) ? '' : this.data.quantity, [Validators.required, Validators.min(1), integerValidator()]],
      productionDate: [(this.data == null) ? '' : this.data.productionDate, [Validators.required]],
      expiryDate: [(this.data == null) ? '' : this.data.expiryDate, [Validators.required]],
      indecations: [(this.data == null) ? '' : this.data.indecations, [Validators.required]],
      sideEffects: [(this.data == null) ? '' : this.data.sideEffects, [Validators.required]],
      fK_PharmacyId: [this._AuthService.user?.id, [Validators.required]],
    })
  }
}
