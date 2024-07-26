import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { StaffService } from 'src/app/Core/Services/staff.service';

@Component({
  selector: 'app-upload-checkup-result',
  templateUrl: './upload-checkup-result.component.html',
  styleUrls: ['./upload-checkup-result.component.scss']
})
export class UploadCheckupResultComponent implements OnInit {

  resultFormData!: FormGroup
  selectedFile!: File

  constructor(
    private _MatDialogRef:MatDialogRef<UploadCheckupResultComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _FormBuilder:FormBuilder,
    private _StaffService:StaffService
  ){}

  onFileSelected(event: any) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }

    console.log(this.selectedFile);
  }

  submitForm(form: FormGroup) {
    const formData = new FormData();

    // Append form values to FormData
    Object.keys(form.value).forEach(key => {
      formData.append(key, form.value[key]);
      console.log(formData);
    });
    // Append the selected file to FormData
    if (this.selectedFile) {
      formData.append('result', this.selectedFile, this.selectedFile.name);
      console.log(formData);
    }
    console.log('form-data', formData);
    this._StaffService.addCheckupResult(formData).subscribe({
      next: response => {
        if(response.message == 'success'){
          this._MatDialogRef.close('uploaded')
        }
      },
      error: error => {
        console.log(error);
      }
    })
  }

  ngOnInit(): void {
    console.log(this.data);
    this.resultFormData = this._FormBuilder.group({
      checkupId: [this.data?.checkup?.id, [Validators.required]],
      patientId: [this.data?.patient?.id, [Validators.required]],
      result: ['', [Validators.required]]
    })
  }



}
