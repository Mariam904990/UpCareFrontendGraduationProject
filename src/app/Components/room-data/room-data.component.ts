import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Toast, ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Core/Services/auth.service';
import { StaffService } from 'src/app/Core/Services/staff.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-room-data',
  templateUrl: './room-data.component.html',
  styleUrls: ['./room-data.component.scss']
})
export class RoomDataComponent implements OnInit {

  roomForm!: FormGroup

  constructor(
    private _FormBuilder: FormBuilder,
    private _AuthService: AuthService,
    private _StaffService: StaffService,
    private _MatDialogRef: MatDialogRef<RoomDataComponent>,
    private _ToastrService: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log(data);
    

  }

  submitForm() {
    if (this.roomForm.status == 'VALID') {
      if (this.data == null) {
        this.addRoom()
      } else {
        this.updateRoom()
      }
    }
  }

  addRoom() {
    this._StaffService.addRoom(this.roomForm.value).subscribe({
      next: (response: any) => {
        this._MatDialogRef.close("added")
      }, error: error => {
        this._ToastrService.error(error.error.message);
      }
    })
  }
  updateRoom() {
    const model = {
      ...this.roomForm.value,
      id: this.data.id
    }
    this._StaffService.updateRoom(model).subscribe({
      next: (response: any) => {
        this._MatDialogRef.close("updated")
      }, error: error => {
        this._ToastrService.error(error.error.message);
      }
    })
  }

  ngOnInit(): void {
    this.roomForm = this._FormBuilder.group({
      pricePerNight: [(this.data == null) ? '' : this.data.pricePerNight, [Validators.required]],
      numberOfBeds: [(this.data == null) ? '' : this.data.numberOfBeds, [Validators.required]],
      fK_ReceptionistId: [this._AuthService.user?.id]
    })
  }


}
