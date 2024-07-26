import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { StaffService } from 'src/app/Core/Services/staff.service';
import { AddCheckupComponent } from '../add-checkup/add-checkup.component';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { UploadCheckupResultComponent } from '../upload-checkup-result/upload-checkup-result.component';
declare var $: any;

@Component({
  selector: 'app-checkup',
  templateUrl: './checkup.component.html',
  styleUrls: ['./checkup.component.scss'],
})
export class CheckupComponent implements OnInit {

  checkupList: any[] = []
  checkupListToDo: any[] = []
  searchTerm: string = ''

  constructor(
    private _StaffService: StaffService,
    private _ToastrService: ToastrService,
    private _MatDialog: MatDialog,
    private _FormBuilder: FormBuilder
  ) { }

  uploadResult(patient: any, checkup: any, index: number) {
    const dialogRef = this._MatDialog.open(UploadCheckupResultComponent, {
      data: {
        checkup: checkup,
        patient: patient
      }
    });

    dialogRef.afterClosed().subscribe(message => {
      console.log(message);
      if(message == 'uploaded'){
        this._ToastrService.success('Result uploaded successfully')
        this.getCheckupsToDo()
      }
    })
  }

  edit(checkup: any) {
    const dialogRef = this._MatDialog.open(AddCheckupComponent, {
      data: checkup
    })

    dialogRef.afterClosed().subscribe(message => {
      if (message == 'updated') {
        this._ToastrService.success('Checkup updated successfully')
        this.getAllCheckups()
      }
    })
  }

  add() {
    const dialogRef = this._MatDialog.open(AddCheckupComponent)

    dialogRef.afterClosed().subscribe(message => {
      if (message == 'added') {
        this.getAllCheckups()
        this._ToastrService.success('Checkup added successfully')
      }
    })
  }

  delete(id: number) {
    this._StaffService.deleteCheckup(id).subscribe({
      next: response => {
        this.getAllCheckups()
      },
      error: error => {
        console.log(error);
      }
    })
  }

  dropToggle() {
    $('.drop').fadeToggle();
  }

  getAllCheckups() {
    this._StaffService.getAllCheckup().subscribe({
      next: response => {
        this.checkupList = response
      },
      error: error => {
        console.log(error);
      }
    })
  }

  getCheckupsToDo() {
    this._StaffService.getCheckupsToDo().subscribe({
      next: response => {
        this.checkupListToDo = response
        console.log(this.checkupListToDo);

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
    this.getAllCheckups()
    this.getCheckupsToDo()
  }
}
