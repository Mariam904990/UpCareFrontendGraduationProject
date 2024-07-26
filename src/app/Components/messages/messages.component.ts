import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Core/Services/auth.service';
import { StaffService } from 'src/app/Core/Services/staff.service';
import { AddDoctorComponent } from '../add-doctor/add-doctor.component';
declare var $: any

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent {

  searchTerm: string = ''
  doctors: any[] = []
  admins: any[] = []
  recentMessages: any[] = []
  openedMessages: any[] = []
  openedAdmin!: any
  isOpen: boolean = false
  receiverId!: string
  sendMessageForm!: FormGroup
  selectedChat?: { id: number, recepientName: string }


  constructor(
    private _StaffService: StaffService,
    private _FormBuilder: FormBuilder,
    public _AuthService: AuthService,
    private _MatDialog: MatDialog,
    private _ToastrService: ToastrService
  ) { }

  dropToggle() {
    $('.drop').fadeToggle();
  }

  selectChat(id: string) {
    this.isOpen = true;
    this.sendMessageForm.get('receiverId')?.setValue(id);
    // continue logic
    this._StaffService.getSpecificAdminMessagesForDoctor(id).subscribe({
      next: response => {
        this.openedMessages = response
      },
      error: error => {
        if (error?.error?.message == 'no messages found') {
          this.openedMessages = []
        }
      }
    })
    this._StaffService.getSpecificAdmin(id).subscribe({
      next: response => {
        this.openedAdmin = response
      },
      error: error => {
        console.log(error);
      }
    })
  }

  sendMessage() {
    this._StaffService.sendMessage(this.sendMessageForm.value).subscribe({
      next: response => {
        console.log(response);
        if (response.message == 'success') {
          this.sendMessageForm.get('content')?.setValue('');
          this.getMessages();
        }
      }, error: err => {
        console.log(err);
      }
    })
  }

  getMessages() {
    switch (this._AuthService.user?.userRole) {
      case 'admin':
        this._StaffService.getMessages(this._AuthService.user?.id!, 0).subscribe({
          next: response => {
            this.recentMessages = response
            console.log(this.recentMessages);

          }, error: err => {
            console.log(err);
          }
        })
        break;
      case 'doctor':
        this._StaffService.getMessages(this._AuthService.user?.id!, 2).subscribe({
          next: response => {
            this.recentMessages = response
            if (this.admins.length == 0) {
              this.recentMessages.forEach(element => {
                this._StaffService.getSpecificAdmin(element.clientId).subscribe({
                  next: response => {
                    this.admins.push(response)
                  },
                  error: error => {
                    console.log(error);
                  }
                })
              })
            }

          }, error: err => {
            console.log(err);
          }
        })
        break;
    }
  }

  getMessagesForOpenedChat() {
    for (let element of this.recentMessages) {
      if (element.clientId == this.openedAdmin?.id) {
        this.openedMessages = element.messages
        break;
      }
    }
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
    this.sendMessageForm = this._FormBuilder.group({
      content: ['', [Validators.required]],
      senderId: [this._AuthService.user?.id, [Validators.required]],
      receiverId: ['', [Validators.required]],
      messageType: [3, [Validators.required]]
    })
    this.recentMessages.forEach(element => {
      this._StaffService.getSpecificAdmin(element.clientId).subscribe({
        next: response => {
          this.admins.push(response);
        },
        error: error => {
          console.log(error);
        }
      })
    });

    let interval = setInterval(() => {
      this.getMessages();
      this.getMessagesForOpenedChat();
    }, 100)
  }
}
