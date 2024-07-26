import { Component, OnInit } from '@angular/core';
import { StaffService } from 'src/app/Core/Services/staff.service';
declare var $: any;

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class PatientsComponent implements OnInit {

  searchTerm!: string
  patients: any[] = []

  constructor(public _StaffService: StaffService) { }

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
  ngOnInit(): void {
    this._StaffService.getAllPatients().subscribe({
      next: response => {
        this.patients = response
      }
    })
  }
}
