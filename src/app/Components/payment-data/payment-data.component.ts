import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { StaffService } from 'src/app/Core/Services/staff.service';
import Stripe from 'stripe';

@Component({
  selector: 'app-payment-data',
  templateUrl: './payment-data.component.html',
  styleUrls: ['./payment-data.component.scss']
})
export class PaymentDataComponent implements OnInit {

  cardDataForm!: FormGroup
  stripe: any
  constructor(
    private _FormBuilder: FormBuilder,
    private _StaffService: StaffService,
    private _MatDialogRef: MatDialogRef<PaymentDataComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }


  submitForm(message: string = 'success') {
    console.log(this.cardDataForm.value);
    const model = {
      fK_PayorId: this.data?.patient?.id,
      deliveredService: "OfflineEmergency",
      paidMoney: this.data?.doctor?.appointmentPrice
    }
    this._StaffService.payForReservation(model).subscribe({
      next: response => {
        console.log('payment request', response);
        this._MatDialogRef.close('success');
      },
      error: error => {
        console.log('payment error', error);
        this._MatDialogRef.close('failed');
        const cancelModel = {
          fK_DoctorId: this.data.doctor.id,
          fK_PatientId: this.data.patient.id,
          dateTime: this.data.dateTime,
          type: this.data.type
        }
        this._StaffService.cancelEmergency(cancelModel).subscribe({
          next: response => {
            if (response.statusCode == 200) {
              this._MatDialogRef.close('failed')
            }
          }
        })
      }
    })
  }

  private confirmPaymentWithStripe() {
    const model = {
      fK_PayorId: this.data?.patient?.id,
      deliveredService: "OfflineEmergency",
      paidMoney: this.data?.doctor?.appointmentPrice
    }
    this._StaffService.payForReservation(model).subscribe({
      next: response => {
        this._MatDialogRef.close('success');
      },
      error: error => {
        console.log('payment error', error);
      }
    })
    // return this.stripe.confirmCardPayment(this.data.clientSecret, { // then stripe will call webhook endpoint
    //   payment_method: {
    //     card: this.cardDataForm.get('cardNumber')?.value,
    //     billing_details: {
    //       name: this.cardDataForm.get('nameOnCard')?.value
    //   }
    //     }
    // });
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
  }
}
