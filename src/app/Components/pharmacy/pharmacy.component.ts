import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StaffService } from 'src/app/Core/Services/staff.service';
import { AddMedicineComponent } from '../add-medicine/add-medicine.component';
import { ToastrService } from 'ngx-toastr';
import { MatSliderChange } from '@angular/material/slider';
declare var $: any;

@Component({
  selector: 'app-pharmacy',
  templateUrl: './pharmacy.component.html',
  styleUrls: ['./pharmacy.component.scss'],
})
export class PharmacyComponent implements OnInit {

  searchTerm: string = '';
  medicineList: any[] = [];
  shortageList: any[] = [];
  sliderTimeOut: any

  min = 1;
  max = 100;
  step = 1
  thumbLabel = true
  sliderValue = 0
  value = 10

  constructor(
    private _MatDialog: MatDialog,
    private _StaffService: StaffService,
    private _ToastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.getMedicine();
    this.getShortage();
  }

  openDialog() {
    const dialogRef = this._MatDialog.open(AddMedicineComponent);

    dialogRef.afterClosed().subscribe(message => {
      if (message === 'success') {
        this._ToastrService.success('Medicine Added Successfully');
        this.getMedicine();  // Refresh the medicine list
        this.searchTerm = '';
      }
    });
  }

  updateMedicine(data: any) {
    const dialogRef = this._MatDialog.open(AddMedicineComponent, {
      data: data
    });

    dialogRef.afterClosed().subscribe(message => {
      if (message === 'updated') {
        this._ToastrService.success('Medicine Updated Successfully');
        this.getMedicine();  // Refresh the medicine list
        this.searchTerm = '';
      }
    });
  }

  onSliderChange(event: Event) {
    clearTimeout(this.sliderTimeOut)
    this.sliderTimeOut = setTimeout(() => {
      this.getShortage(this.value);
    }, 500);
  }

  getShortage(amount?: number) {
    // console.log('slider', this.sliderValue);
    // console.log('value', this.value);

    this._StaffService.getShortageOfMedicine(amount).subscribe({
      next: response => {
        console.log('shortage', response);
        this.shortageList = response
        /////////////////////////////
        ////////////////////////////
        ////////////////////////////
      },
      error: err => {
        if (err.error.message == 'there is no shortage') {
          this.shortageList = []
        }
      }
    })
  }

  changeSliderValue() {
    console.log(' cccc');

  }

  getMedicine() {
    this._StaffService.getMedicine().subscribe({
      next: response => {
        this.medicineList = response;
        console.log(this.medicineList);
      },
      error: err => {
        console.log(err);
      }
    });
  }

  dropToggle() {
    $('.drop').fadeToggle();
  }
}