import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { StaffService } from 'src/app/Core/Services/staff.service';

@Component({
  selector: 'app-add-radiology',
  templateUrl: './add-radiology.component.html',
  styleUrls: ['./add-radiology.component.scss']
})
export class AddRadiologyComponent {
  radiologyDataForm!: FormGroup
  constructor(
    private _StaffService: StaffService,
    private _FormBuilder: FormBuilder,
    private _MatDialogRef: MatDialogRef<AddRadiologyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  submitForm() {
    console.log(this.radiologyDataForm.value);

    if (this.data == null) {
      this.addRadiology()
    } else {
      this.updateRadiology()
    }
  }

  addRadiology() {
    this._StaffService.addRadiology(this.radiologyDataForm.value).subscribe({
      next: response => {
        if(response.message == 'success'){
          this._MatDialogRef.close('added')
        }
      },
      error: error => {
        console.log(error);
      }
    })
  }

  updateRadiology() {
    this._StaffService.updateRadiology(this.radiologyDataForm.value).subscribe({
      next: response => {
        if(response.message == 'success'){
          this._MatDialogRef.close('updated');
        }
      },
      error: error => {
        console.log(error);
      }
    })
  }

  ngOnInit(): void {
    this.radiologyDataForm = this._FormBuilder.group({
      id: [(this.data != null) ? this.data.id : 0, [Validators.required]],
      name: [(this.data != null) ? this.data.name : '', [Validators.required]],
      price: [(this.data != null) ? this.data.price : 0, [Validators.required, Validators.min(1)]]
    })
  }
}
