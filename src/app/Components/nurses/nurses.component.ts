import { DialogRef } from '@angular/cdk/dialog';
import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/Core/Services/auth.service';
import { StaffService } from 'src/app/Core/Services/staff.service';
import { AddNurseComponent } from '../add-nurse/add-nurse.component';
import { ToastrService } from 'ngx-toastr';
declare var $: any;

@Component({
  selector: 'app-nurses',
  templateUrl: './nurses.component.html',
  styleUrls: ['./nurses.component.scss'],
})
export class NursesComponent implements OnInit {

  searchTerm!: string
  nurses: any[] = []
  isOpen: boolean = false
  sendMessageForm!: FormGroup
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
    private _ToastrService: ToastrService,
    private _MatDialog: MatDialog

  ) { }
  chatDisplay(id: number) {
    this.isOpen = true

    this.selectedChat = this.chats[id - 1]
  }

  dropToggle() {
    $('.drop').fadeToggle();
  }


  selectNurse(id: string) {
    this.isOpen = true;
    this.sendMessageForm.get('receiverId')?.setValue(id);
    // continue logic
    console.log(id);
    this._StaffService.getSpecificNurse(id).subscribe({
      next: response => {
        console.log(response);
        this.openedNurse = response
        console.log(this.openedNurse.fK_AdminId);
        if (this.openedNurse.fK_AdminId != null && this.openedNurse.fK_AdminId != '') {
          this._StaffService.getSpecificAdmin(this.openedNurse.fK_AdminId).subscribe({
            next: response => {
              this.adminAddedUser = response
              console.log(this.adminAddedUser);

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

  openDialog() {
    const dialogRef = this._MatDialog.open(AddNurseComponent)

    dialogRef.afterClosed().subscribe(message => {
      if (message == 'success') {
        this._ToastrService.success('Nurse added sucessfully')
        this.getAllNurses()
      }else {
        this._ToastrService.error('Fail To Add Nurse')
      }
    })
  }

  getTimeOnly(dateTime: any): any {
    let date = new Date(dateTime);
    return date.toLocaleTimeString();
  }

  getAllNurses() {
    this._StaffService.getAllNurses().subscribe({
      next: response => {
        this.nurses = response
        console.log(this.nurses);
      }
    })
  }
  ngOnInit(): void {
    this.sendMessageForm = this._FormBuilder.group({
      content: ['', [Validators.required]],
      senderId: [this._AuthService.user?.id, [Validators.required]],
      receiverId: ['', [Validators.required]],
      messageType: [2, [Validators.required]]
    })
    this.getAllNurses()
    // let interval = setInterval(() => {
    //   this.getMessages();
    //   this.getMessagesForOpenedChat();
    // }, 100)
  }
}
