import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { StaffService } from 'src/app/Core/Services/staff.service';
import Stripe from 'stripe';

@Component({
  selector: 'app-payment-booking',
  templateUrl: './payment-booking.component.html',
  styleUrls: ['./payment-booking.component.scss']
})
export class PaymentBookingComponent implements OnInit {

  startDate!: string
  numberOfDays: number = 0
  total: number = 0
  stripe!: any
  cardDataForm!: FormGroup
  constructor(
    private _StaffService: StaffService,
    private _FormBuilder: FormBuilder,
    private _MatDialogRef: MatDialogRef<PaymentBookingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  submitForm() {
    this._StaffService.payForBooking(this.data).subscribe({
      next: response => {
        this._MatDialogRef.close('paid')
      },
      error: error => {
        console.log(error?.error?.statusCode);
        if(error?.error?.statusCode == 400){
          this._MatDialogRef.close('no')
        }
      }
    })
  }

  ngOnInit(): void {

    this.stripe = new Stripe('pk_test_51PDClRDr4hz1mUokIPSx8UlEnK6MKXsvFdXjAbhkb6yPAdpbx4gDd6Won2PpuHsvUDI1McZ5gs2yOXSXSfmH2p6o00a1bY0iW2')

    this.cardDataForm = this._FormBuilder.group({
      nameOnCard: [this.data?.patient?.firstName, [Validators.required]],
      cardNumber: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
      CVC: ['', [Validators.required]],
      EXP: ['', [Validators.required, Validators.pattern(/^\d{2}\/\d{2}$/)]],
    })

    console.log(this.data);
    // to calculate the time spent in days
    const today = new Date()
    const start = new Date(this.data?.startDate)
    this.startDate = start.toLocaleDateString()
    this.numberOfDays = Math.floor((today.getTime() - start.getTime()) / (1000 * 3600 * 24))

    this._StaffService.getSpecificRoom(this.data?.fK_RoomId).subscribe({
      next: response => {
        console.log(response);
        this.total = this.numberOfDays * response?.pricePerNight
      },
      error: error => {
        console.log(error);
      }
    })
  }

}
