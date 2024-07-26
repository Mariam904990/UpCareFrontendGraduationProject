import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { StaffService } from 'src/app/Core/Services/staff.service';

@Component({
  selector: 'app-add-checkup',
  templateUrl: './add-checkup.component.html',
  styleUrls: ['./add-checkup.component.scss']
})
export class AddCheckupComponent implements OnInit {

  checkupDataForm!: FormGroup
  constructor(
    private _StaffService: StaffService,
    private _FormBuilder: FormBuilder,
    private _MatDialogRef: MatDialogRef<AddCheckupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  submitForm() {
    console.log(this.checkupDataForm.value);

    if (this.data == null) {
      this.addCheckup()
    } else {
      this.updateCheckup()
    }
  }

  addCheckup() {
    this._StaffService.addCheckup(this.checkupDataForm.value).subscribe({
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

  updateCheckup() {
    this._StaffService.updateCheckup(this.checkupDataForm.value).subscribe({
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
    this.checkupDataForm = this._FormBuilder.group({
      id: [(this.data != null) ? this.data.id : 0, [Validators.required]],
      name: [(this.data != null) ? this.data.name : '', [Validators.required]],
      price: [(this.data != null) ? this.data.price : 0, [Validators.required, Validators.min(1)]]
    })
  }

}
