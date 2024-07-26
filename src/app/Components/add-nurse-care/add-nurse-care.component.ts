import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/Core/Services/auth.service';
import { StaffService } from 'src/app/Core/Services/staff.service';

@Component({
  selector: 'app-add-nurse-care',
  templateUrl: './add-nurse-care.component.html',
  styleUrls: ['./add-nurse-care.component.scss']
})
export class AddNurseCareComponent implements OnInit {

  nurseCareFormData!: FormGroup

  constructor(
    private _StaffService: StaffService,
    private _FormBuilder: FormBuilder,
    private _MatDialogRef: MatDialogRef<AddNurseCareComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _AuthService: AuthService
  ) { }

  submitForm() {
    const model = {
      ...this.data,
      ...this.nurseCareFormData.value,
      fK_NurseId: this._AuthService.user?.id
    }

    this._StaffService.addNurseCareRecord(model).subscribe({
      next: response => {
        if (response.message == 'success') {
          this._MatDialogRef.close('added');
        }
      },
      error: error => {
        console.log(error);
      }
    })
  }

  ngOnInit(): void {
    this.nurseCareFormData = this._FormBuilder.group({
      suger: ['', [Validators.required]],
      beatPerMinute: ['', [Validators.required]],
      oxygenSaturation: ['', [Validators.required]],
      bloodPresure: ['', [Validators.required]],
      notes: ['', [Validators.required]],
    })
  }

}
