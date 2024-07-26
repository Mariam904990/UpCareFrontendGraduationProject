import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/Core/Services/auth.service';
import { StaffService } from 'src/app/Core/Services/staff.service';
import { AddReceptionistComponent } from '../add-receptionist/add-receptionist.component';
import { ToastrService } from 'ngx-toastr';
declare var $: any;

@Component({
  selector: 'app-receptionists',
  templateUrl: './receptionists.component.html',
  styleUrls: ['./receptionists.component.scss'],
})
export class ReceptionistsComponent implements OnInit {

  searchTerm: string = ''
  receptionists: any[] = []
  isOpen: boolean = false
  openedNurse!: any
  recentMessages: any[] = []
  openedMessages: any[] = []
  adminAddedUser!: any
  selectedChat?: { id: number, recepientName: string }
  chats: { id: number, recepientName: string }[] = [
    {
      id: 1,
      recepientName: "Nr. Mohamed"
    },
    {
      id: 2,
      recepientName: "Nr. Samy"
    },
    {
      id: 3,
      recepientName: "Nr. Shimaa"
    },
    {
      id: 4,
      recepientName: "Nr. Sanaa"
    },
  ]

  constructor(
    private _StaffService: StaffService,
    private _Renderer2: Renderer2,
    private _ElementRef: ElementRef,
    private _FormBuilder: FormBuilder,
    public _AuthService: AuthService,
    private _MatDialog: MatDialog,
    private _ToastrService: ToastrService

  ) { }

  dropToggle() {
    $('.drop').fadeToggle();
  }

  openDialog() {
    const dialogRef = this._MatDialog.open(AddReceptionistComponent)

    dialogRef.afterClosed().subscribe(message => {
      if (message == 'success') {
        this.getAllReceptionists()
        this._ToastrService.success("Added Successfully")
      }
      else
        this._ToastrService.error("Fail To Add Receptionist")
    })
  }


  selectNurse(id: string) {
    this.isOpen = true;
    // this.sendMessageForm.get('receiverId')?.setValue(id);
    // continue logic
    this._StaffService.getSpecificReceptionist(id).subscribe({
      next: response => {
        this.openedNurse = response
        if (this.openedNurse.fK_AdminId != null && this.openedNurse.fK_AdminId != '') {
          this._StaffService.getSpecificAdmin(this.openedNurse.fK_AdminId).subscribe({
            next: response => {
              this.adminAddedUser = response
            },
            error: err => {
              console.log(err);
            }
          })
        }
      },
      error: err => {
        console.log(err);
      }
    })
  }

  getTimeOnly(dateTime: any): any {
    let date = new Date(dateTime);
    return date.toLocaleTimeString();
  }

  getAllReceptionists() {
    this._StaffService.getAllReceptionists().subscribe({
      next: response => {
        this.receptionists = response
      }
    })
  }
  ngOnInit(): void {
    this.getAllReceptionists();
  }
}

