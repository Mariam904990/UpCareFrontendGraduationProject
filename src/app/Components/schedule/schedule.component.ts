import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Core/Services/auth.service';
import { StaffService } from 'src/app/Core/Services/staff.service';
declare var $: any;

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
})
export class ScheduleComponent implements OnInit {

  isOpen: boolean = false
  searchTerm: string = ''
  schedule: any[] = []
  openedSchedule: any[] = []
  doctors: any[] = []
  selectedDoctor!: any

  constructor(
    public _AuthService: AuthService,
    private _StaffService: StaffService,
    private _Router: Router
  ) { }

  selectedChat?: { id: number, recepientName: string }
  chats: { id: number, recepientName: string }[] = [
    {
      id: 1,
      recepientName: "Dr. Mohamed"
    },
    {
      id: 2,
      recepientName: "Dr. Samy"
    },
    {
      id: 3,
      recepientName: "Dr. Shimaa"
    },
    {
      id: 4,
      recepientName: "Dr. Sanaa"
    },
  ]

  ngOnInit(): void {
    if (['admin', 'receptionist'].includes(this._AuthService.user?.userRole!)) {
      this._StaffService.getAllDoctors().subscribe({
        next: response => {
          console.log('200OK', response);
          this.doctors = response;
        },
        error: error => {
          console.log('error', error);
        }
      })
      
      this._StaffService.getScheduleForAllDoctors().subscribe({
        next: response => {
          console.log('200OK response', response);
          this.schedule = response;
        },
        error: error => {
          console.log('error', error);
        }
      })
    }
    else if (this._AuthService.user?.userRole == 'doctor') {
      this.getDoctorSchedule(this._AuthService.user.id!)
    }
  }

  getSpecificDoctor(id: string) {
    this._StaffService.getSpecificDoctor(id).subscribe({
      next: response => {
        console.log(response);
      },
      error: error => {
        console.log(error);
      }
    })
  }
  selectDoctorSchedule(doctorId: string) {
    this.isOpen = true
    this.getDoctorSchedule(doctorId)
  }

  getDoctorSchedule(doctorId: string) {
    this._StaffService.getSpecificDoctor(doctorId).subscribe({
      next: response => {
        this.selectedDoctor = response
        console.log(this.selectedDoctor);
      },
      error: error => {
        console.log(error);
      }
    })
    this._StaffService.getScheduleByDoctorId(doctorId).subscribe({
      next: response => {
        console.log('200OK', response);
        this.openedSchedule = response
      },
      error: error => {
        if (error?.error?.statusCode == 404) {
          this.openedSchedule = []
        }
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

  viewPatientProfile(patientId: string) {
    this._Router.navigate([`./patients/${patientId}`])
  }

  dropToggle() {
    $('.drop').fadeToggle();
  }

  chatDisplay(id: number) {
    this.isOpen = true

    this.selectedChat = this.chats[id - 1]
  }

}
