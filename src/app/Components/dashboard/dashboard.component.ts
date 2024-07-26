import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { AuthService } from 'src/app/Core/Services/auth.service';
import { CheckupService } from 'src/app/Core/Services/checkup.service';
import { FeedbackService } from 'src/app/Core/Services/feedback.service';
import { RadiologyService } from 'src/app/Core/Services/radiology.service';
import { StaffService } from 'src/app/Core/Services/staff.service';
import { Checkup } from 'src/app/Interfaces/checkup';
import { Radiology } from 'src/app/Interfaces/radiology';
import { Speciality } from 'src/app/Interfaces/speciality';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  checkupAvailable!: Checkup[]
  radiologyAvailable!: Radiology[]
  specialities!: Speciality[]
  feedbacks: any[] = []
  services: any[] = []
  constructor(
    public _AuthService: AuthService,
    private _CheckupService: CheckupService,
    private _RadiologyService: RadiologyService,
    private _StaffService: StaffService,
    private _FeedbackService: FeedbackService,
    private _Router: Router
  ) {
    switch (_AuthService.user?.userRole) {
      case 'doctor':
        _Router.navigate(['/schedule']);
        break;
      case 'nurse':
        _Router.navigate(['/patients']);
        break;
      case 'receptionist':
        _Router.navigate(['/emergency']);
        break;
      case 'radiologyLab':
        _Router.navigate(['/radiology-lab']);
        break;
      case 'checkupLab':
        _Router.navigate(['/checkup-lab']);
        break;
    }
    _CheckupService.getAll().subscribe({
      next: (response) => {
        this.checkupAvailable = response
      }
    })

    _RadiologyService.getAll().subscribe({
      next: (response) => {
        this.radiologyAvailable = response
      }
    })

    _StaffService.getSpecialities().subscribe({
      next: (response) => {
        this.specialities = response
      }
    })

    _StaffService.getAllBills('').subscribe({
      next: (response) => {
        this.services = response
      }, error: (err) => {
        console.log(err);
      }
    })

    _FeedbackService.getAllFeedbacks('').subscribe({
      next: (response) => {
        this.feedbacks = response
        console.log(this.feedbacks);

      }, error: (err) => {
        console.log(err.error);
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
}
