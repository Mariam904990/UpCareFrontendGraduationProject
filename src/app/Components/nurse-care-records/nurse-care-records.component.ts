import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Core/Services/auth.service';
import { StaffService } from 'src/app/Core/Services/staff.service';
import { AddNurseCareComponent } from '../add-nurse-care/add-nurse-care.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nurse-care-records',
  templateUrl: './nurse-care-records.component.html',
  styleUrls: ['./nurse-care-records.component.scss']
})
export class NurseCareRecordsComponent implements OnInit {


  patient!: any
  records: any[] = []

  constructor(
    private _MatDialog: MatDialog,
    private _MatDialogRef: MatDialogRef<NurseCareRecordsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _StaffService: StaffService,
    public _AuthService: AuthService,
    private _Router: Router,
    private _ToastrService: ToastrService
  ) { }

  open() {
    const dialogRef = this._MatDialog.open(AddNurseCareComponent, {
      data: {
        fK_patientId: this.data.patientId,
        fK_roomId: this.data.roomId
      },
      width: '50%',
    })

    dialogRef.afterClosed().subscribe(message => {
      if (message == 'added') {
        this.getNurseCareRecords();
        this._ToastrService.success('Record added successfully');
      }
    })
  }

  goToPatientProfile() {
    this._Router.navigate(['/patients/' + this.patient?.id])
    this._MatDialog.closeAll()
  }

  getNurseCareRecords() {
    this._StaffService.getNurseCareRecords(this.data.patientId, this.data.roomId).subscribe({
      next: response => {
        this.records = response
        console.log(this.records);
      },
      error: error => {
        console.log(error);
      }
    })
  }

  getTimeOnly(dateTime: any): any {
    let date = new Date(dateTime);
    return date.toLocaleTimeString();
  }

  getDateOnly(dateTime?: any): any {
    if (dateTime == undefined) {
      let today = new Date();
      return today.toLocaleDateString();
    } else {
      let date = new Date(dateTime);
      return date.toLocaleDateString();
    }
  }

  ngOnInit(): void {
    console.log(this.data);
    this._StaffService.getSpecificPatient(this.data.patientId).subscribe({
      next: response => {
        this.patient = response
      },
      error: error => {
        console.log(error);
      }
    })

    this.getNurseCareRecords();
  }
}
