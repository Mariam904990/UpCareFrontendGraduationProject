import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { WebRtcService } from './../../Core/Services/web-rtc.service';
import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { StaffService } from 'src/app/Core/Services/staff.service';
import { AuthService } from 'src/app/Core/Services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { HealthRecordComponent } from '../health-record/health-record.component';
import { AddPrescriptionComponent } from '../add-prescription/add-prescription.component';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
declare var $: any
@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.scss']
})
export class PatientProfileComponent implements OnInit {

  @ViewChild('localVideo') localVideo!: ElementRef<HTMLVideoElement>;
  @ViewChild('remoteVideo') remoteVideo!: ElementRef<HTMLVideoElement>;
  patientHistory!: any
  sendMessageForm!: FormGroup
  messagesList: any[] = []

  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _StaffService: StaffService,
    private _WebRtcService: WebRtcService,
    private _FormBuilder: FormBuilder,
    public _AuthService: AuthService,
    private _MatDialog: MatDialog,
    private _ToastrService: ToastrService,
    private _HttpClient: HttpClient
  ) {
    _ActivatedRoute.params.subscribe({
      next: (params) => {
        let patientId = params['id']
        _StaffService.getPatientProfile(patientId).subscribe({
          next: (response) => {
            this.patientHistory = response
            // console.log(_AuthService.user?.id);
            console.log(this.patientHistory);
            this.getMessages()
          }
        })
      }
    })

  }
  // data = [
  //   {
  //     id: 1,
  //     title: "Described medicine",
  //     icon: "specialization-image-2.png",
  //     name: "Omez-20"
  //   },
  //   {
  //     id: 2,
  //     title: "Radiography",
  //     icon: "specialization-image.png",
  //     name: "CT Scan"
  //   },
  //   {
  //     id: 3,
  //     title: "Checkup",
  //     icon: "specialization-image-3.png",
  //     name: "Vitamin D Test"
  //   },
  // ]
  // appointments = [
  //   {
  //     id: 1,
  //     name: "Dr. Mona Arafa",
  //     title: "Cardiology"
  //   },
  //   {
  //     id: 2,
  //     name: "Dr. Mohamed Abdel-Fattah",
  //     title: "Gastroenterology"
  //   },
  //   {
  //     id: 3,
  //     name: "Dr. Mohamed Abdel-Fattah",
  //     title: "Gastroenterology"
  //   },
  //   {
  //     id: 4,
  //     name: "Dr. Mohamed Abdel-Fattah",
  //     title: "Gastroenterology"
  //   },
  // ]
  // selectedChat?: { id: number, name: string, title: string } | null


  // chatDisplay(id: number) {
  //   this.selectedChat = this.appointments[id - 1]
  // }

  // closeTheChat() {
  //   this.selectedChat = null
  // }

  isOpen = true
  specializationsOptions: OwlOptions = {
    loop: false,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ["", ""],
    responsive: {
      0: {
        items: 1
      }
    },
    nav: true
  }

  download(url: string, name: string) {
    this._HttpClient.get(url, { responseType: 'blob' }).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, error => {
      console.error('Download error:', error);
    });
  }

  displayChat(id: string) {
    console.log('chat opened');
    $('#chatDiv').fadeIn(200);
  }

  closeChat() {
    $('#chatDiv').fadeOut(200);
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

  sendMessage() {
    this.sendMessageForm.get('receiverId')?.setValue(this.patientHistory?.patientInfo?.id)
    console.log(this.sendMessageForm.value);
    this._StaffService.sendMessage(this.sendMessageForm.value).subscribe({
      next: response => {
        console.log(response);
        if (response.message == 'success') {
          this.sendMessageForm.get('content')?.setValue('');
          this.getMessages();
        }
      },
      error: err => {
        console.log(err);

      }
    })
  }

  getMessages() {
    if (this._AuthService.user?.userRole == 'doctor') {
      this._StaffService.getSpecificPatientMessagesForDoctor(this.patientHistory?.patientInfo?.id, this._AuthService?.user?.id || '').subscribe({
        next: response => {
          console.log(response);
          this.messagesList = response
        },
        error: err => {
          console.log(err);
        }
      })
    }
  }

  viewHealthRecord() {
    const matDialogRef = this._MatDialog.open(HealthRecordComponent);
  }

  openPrescriptionDialog() {
    const dialogRef = this._MatDialog.open(AddPrescriptionComponent, {
      data: {
        patientId: this.patientHistory?.patientInfo?.id
      }
    })

    dialogRef.afterClosed().subscribe(message => {
      if (message == 'success') {
        this._ToastrService.success('Prescription Added Successfully')

        this._StaffService.getPatientProfile(this.patientHistory?.patientInfo?.id).subscribe({
          next: response => {
            this.patientHistory = response
          },
          error: error => {
            console.log(error);
          }
        })
      }
    })
  }

  ngOnInit(): void {
    this._WebRtcService.initializePeerConnection();
    this.sendMessageForm = this._FormBuilder.group({
      content: ['', [Validators.required]],
      senderId: [this._AuthService.user?.id, [Validators.required]],
      receiverId: ['', [Validators.required]],
      messageType: [1, [Validators.required]]
    })
  }

  calculateAge(dobDate: Date): number {
    const today = new Date();
    const returned = new Date(dobDate);

    const ageInYears = today.getUTCFullYear() - returned.getUTCFullYear();
    if (ageInYears < 0 || ageInYears == today.getUTCFullYear())
      return -1;

    return ageInYears;
  }

  async startCall() {
    $('.video-call').fadeIn();
    await this._WebRtcService.startLocalStream(this.localVideo.nativeElement);
    const offer = await this._WebRtcService.createOffer();
    // Send offer to remote peer through signaling server

    // Mock receiving an answer (replace with signaling server logic)
    setTimeout(async () => {
      const answer = await this._WebRtcService.handleOffer(offer!);
      await this._WebRtcService.handleAnswer(answer!);

      // Mock receiving remote ICE candidates
      this.remoteVideo.nativeElement.srcObject = this._WebRtcService.getRemoteStream();
    }, 1000);
  }

  closeCall() {
    $('.video-call').fadeOut();
    this._WebRtcService.closeConnection();
    this.localVideo.nativeElement.srcObject = null;
    this.remoteVideo.nativeElement.srcObject = null;
  }

}
