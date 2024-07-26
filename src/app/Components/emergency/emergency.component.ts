import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StaffService } from 'src/app/Core/Services/staff.service';
import { Consultation } from 'src/app/Interfaces/consultation';
import { AddDataComponent } from '../add-data/add-data.component';
import { PaymentDataComponent } from '../payment-data/payment-data.component';
import Stripe from 'stripe'
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Core/Services/auth.service';
declare var $: any;

@Component({
  selector: 'app-emergency',
  templateUrl: './emergency.component.html',
  styleUrls: ['./emergency.component.scss']
})
export class EmergencyComponent /*implements OnInit*/ {

  emergencyList: any[] = []
  patientSearchTerm!: string
  selectedType: string = 'all'
  // stripe: any

  constructor(
    private _StaffService: StaffService,
    public _MatDialog: MatDialog,
    private _ToastrService: ToastrService,
    public _AuthService: AuthService
  ) {
    this.getEmergency()
    // var cardDataDialogRef = this._MatDialog.open(PaymentDataComponent)

    // cardDataDialogRef.afterClosed().subscribe({
    //   next: response2 => {
    //     console.log(response2);
    //     if(response2 == 'success')
    //       _ToastrService.success('Payment Succeeded')
    //     else
    //     _ToastrService.error('Payment Failed')
    //   }
    // })
  }
  // ngOnInit(): void {
  //   this.stripe = new Stripe('pk_test_51PDClRDr4hz1mUokIPSx8UlEnK6MKXsvFdXjAbhkb6yPAdpbx4gDd6Won2PpuHsvUDI1McZ5gs2yOXSXSfmH2p6o00a1bY0iW2')
  // }




  openDialog() {
    const patientDataDialogRef = this._MatDialog.open(AddDataComponent);

    patientDataDialogRef.afterClosed().subscribe(message => {
      this._StaffService.addEmergency(message).subscribe({
        next: response => {
          this.getEmergency()
          this.patientSearchTerm = ''
          var cardDataDialogRef = this._MatDialog.open(PaymentDataComponent, {
            data: response.data
          })
          cardDataDialogRef.afterClosed().subscribe(message => {
            if (message == 'success') {
              this.patientSearchTerm = ''
              this._ToastrService.success('Payment Succeeded')
            } else {
              this._ToastrService.error('Payment Failed')
            }
          }
          )
        },
        error: err => {
          console.log(err);
        }
      })
    });
  }

  getEmergency() {
    this._StaffService.getAllEmergency().subscribe({
      next: (response) => {
        this.emergencyList = response
        console.log(this.emergencyList);

      },
      error: (err) => {
        console.log(err.error);
      }
    })
  }


  dropToggle() {
    $('.drop').fadeToggle()
  }

  calculateAge(dobDate: Date): number {
    const today = new Date();
    const returned = new Date(dobDate);

    const ageInYears = today.getUTCFullYear() - returned.getUTCFullYear();
    if (ageInYears < 0 || ageInYears == today.getUTCFullYear())
      return -1;

    return ageInYears;
  }
}
