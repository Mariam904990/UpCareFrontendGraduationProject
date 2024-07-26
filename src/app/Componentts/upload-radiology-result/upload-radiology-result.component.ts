import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UploadCheckupResultComponent } from 'src/app/Components/upload-checkup-result/upload-checkup-result.component';
import { StaffService } from 'src/app/Core/Services/staff.service';

@Component({
  selector: 'app-upload-radiology-result',
  templateUrl: './upload-radiology-result.component.html',
  styleUrls: ['./upload-radiology-result.component.scss']
})
export class UploadRadiologyResultComponent implements OnInit {

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
    this._StaffService.addRadiologyResult(formData).subscribe({
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
      radiologyId: [this.data?.radiology?.id, [Validators.required]],
      patientId: [this.data?.patient?.id, [Validators.required]],
      result: ['', [Validators.required]]
    })
    
  }


}
