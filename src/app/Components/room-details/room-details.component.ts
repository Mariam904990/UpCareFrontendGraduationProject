import { Component, Inject, OnInit, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { StaffService } from 'src/app/Core/Services/staff.service';
import { ConfigComponent } from '../config/config.component';
import { ToastrService } from 'ngx-toastr';
import { AddBookingComponent } from '../add-booking/add-booking.component';
import { PaymentBookingComponent } from '../payment-booking/payment-booking.component';
import { AuthService } from 'src/app/Core/Services/auth.service';
import { NurseCareRecordsComponent } from '../nurse-care-records/nurse-care-records.component';

@Component({
  selector: 'app-room-details',
  templateUrl: './room-details.component.html',
  styleUrls: ['./room-details.component.scss']
})
export class RoomDetailsComponent implements OnInit {

  doctors: any[] = []
  constructor(
    private _MatDialogRef: MatDialogRef<RoomDetailsComponent>,
    private _MatDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _StaffService: StaffService,
    private _Router: Router,
    private _ToastrService: ToastrService,
    public _AuthService: AuthService
  ) {

  }

  viewNurseCare(patientId: string, roomId: number) {
    const dialogRef = this._MatDialog.open(NurseCareRecordsComponent, {
      data: {
        patientId: patientId,
        roomId: roomId
      },
      width: '50%'
    })

    dialogRef.afterClosed().subscribe(message => {
      console.log(message);
    })
  }

  goToPatientProfile(id: string) {
    this._Router.navigate([`/patients/${id}`])
    this._MatDialogRef.close()
  }

  ngOnInit(): void {
    console.log('room data: ', this.data);

    this.data.patientBooking.forEach((element: any) => {
      this._StaffService.getSpecificDoctor(element.roomInfo.fK_DoctorId).subscribe({
        next: respose => {
          this.doctors.push(respose)
        },
        error: error => {
          console.log(error);

        }
      })
    });
  }

  startNewBooking() {
    const dialogRef = this._MatDialog.open(AddBookingComponent, {
      data: this.data,
      width: '50%'
    })

    dialogRef.afterClosed().subscribe(message => {
      if (message == 'booked') {
        this._ToastrService.success('Booking added successfully');
        this._MatDialogRef.close('booked')
      }
    })
  }

  deleteRoom() {
    const dialogRef = this._MatDialog.open(ConfigComponent, {
      width: '25%',
    });

    dialogRef.afterClosed().subscribe(message => {
      if (message == 'confirm') {
        this._ToastrService.success('confirmed')
        this._MatDialogRef.close('deleted')
      }
    })
  }

  endBooking(roomInfo: any, index: number) {
    const dialogRef = this._MatDialog.open(ConfigComponent, {
      width: '25%'
    })

    dialogRef.afterClosed().subscribe(message => {
      if (message == 'confirm') {
        const paymentRef = this._MatDialog.open(PaymentBookingComponent, {
          data: roomInfo,
        })

        paymentRef.afterClosed().subscribe(message => {
          if (message == 'paid') {
            this._StaffService.endBookingForPatient(roomInfo).subscribe({
              next: response => {
                this.data.patientBooking.splice(index, 1);
                this._ToastrService.success('Booking ended successfully')
                this._MatDialogRef.close('ended')
              },
              error: error => {
                console.log(error);
              }
            })
          }
          else if (message == 'no') {
            this._ToastrService.info('patient spend 0 days');
            this._ToastrService.info('nothing paid');
          }
        })
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

  calculateAge(dobDate: Date): number {
    const today = new Date();
    const returned = new Date(dobDate);

    const ageInYears = today.getUTCFullYear() - returned.getUTCFullYear();
    if (ageInYears < 0 || ageInYears == today.getUTCFullYear())
      return -1;

    return ageInYears;
  }
}
