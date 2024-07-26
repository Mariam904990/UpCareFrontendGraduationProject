import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { StaffService } from 'src/app/Core/Services/staff.service';
import { AddRadiologyComponent } from '../add-radiology/add-radiology.component';
import { UploadRadiologyResultComponent } from 'src/app/Componentts/upload-radiology-result/upload-radiology-result.component';
declare var $: any;

@Component({
  selector: 'app-radiology',
  templateUrl: './radiology.component.html',
  styleUrls: ['./radiology.component.scss'],
})
export class RadiologyComponent implements OnInit{

  radiologyList: any[] = []
  radiologyListToDo: any[] = []
  searchTerm: string = ''

  constructor(
    private _StaffService:StaffService,
    private _ToastrService: ToastrService,
    private _MatDialog: MatDialog,
    private _FormBuilder: FormBuilder
  ){}

  uploadResult(patient: any, checkup: any, index: number) {
    const dialogRef = this._MatDialog.open(UploadRadiologyResultComponent, {
      data: {
        radiology: checkup,
        patient: patient
      }
    });

    dialogRef.afterClosed().subscribe(message => {
      console.log(message);
      if(message == 'uploaded'){
        this._ToastrService.success('Result uploaded successfully')
        this.getRadiologiesToDo()
      }
    })
  }

  edit(checkup: any) {
    const dialogRef = this._MatDialog.open(AddRadiologyComponent, {
      data: checkup
    })

    dialogRef.afterClosed().subscribe(message => {
      if (message == 'updated') {
        this._ToastrService.success('Checkup updated successfully')
        this.getAllRadiologies()
      }
    })
  }

  add() {
    const dialogRef = this._MatDialog.open(AddRadiologyComponent)

    dialogRef.afterClosed().subscribe(message => {
      if (message == 'added') {
        this.getAllRadiologies()
        this._ToastrService.success('Radiology added successfully')
      }
    })
  }

  delete(id: number) {
    this._StaffService.deleteRadiology(id).subscribe({
      next: response => {
        this.getAllRadiologies()
      },
      error: error => {
        console.log(error);
      }
    })
  }

  getAllRadiologies() {
    this._StaffService.getAllRadiologies().subscribe({
      next: response => {
        this.radiologyList = response
      },
      error: error => {
        console.log(error);
      }
    })
  }

  getRadiologiesToDo() {
    this._StaffService.getRadiologiesToDo().subscribe({
      next: response => {
        this.radiologyListToDo = response
        console.log(this.radiologyListToDo);

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
    this.getAllRadiologies()
    this.getRadiologiesToDo()
  }
  dropToggle() {
    $('.drop').fadeToggle();
  }
}
