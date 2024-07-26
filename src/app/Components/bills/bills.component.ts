import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Core/Services/auth.service';
import { StaffService } from 'src/app/Core/Services/staff.service';
declare var $: any;

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.scss'],
})
export class BillsComponent implements OnInit {

  bills: any[] = []
  isOpen: boolean = false
  searchTerm: string = ''
  selectedBill!: any
  medicineTotal: number = 0
  checkupsTotal: number = 0
  radiologyTotal: number = 0

  constructor(
    private _StaffService: StaffService,
    public _AuthService: AuthService
  ) { }

  selectedChat?: { id: number, recepientName: string }
  chats: { id: number, recepientName: string }[] = [
    {
      id: 1,
      recepientName: "Mohamed Abdo"
    },
    {
      id: 2,
      recepientName: "Sanaa Radwan"
    },
    {
      id: 3,
      recepientName: "Shimaa tarek"
    },
    {
      id: 4,
      recepientName: "Alaa mokhtar"
    },
  ]

  chatDisplay(id: number) {
    this.isOpen = true
    this.selectedChat = this.chats[id - 1]
  }

  selectBill(billId: number) {
    //////////////// logic continued... //////////////
    this._StaffService.getSpecificBill(billId).subscribe({
      next: response => {
        this.selectedBill = response
        this.isOpen = true
        console.log(this.selectedBill);
        if (this.selectedBill?.deliveredService == 'prescription') {
          for (const iterator of this.selectedBill?.medicines) {
            this.medicineTotal += iterator?.price
          }
          for (const iterator of this.selectedBill?.checkups) {
            this.checkupsTotal += iterator?.price
          }
          for (const iterator of this.selectedBill?.radiologies) {
            this.radiologyTotal += iterator?.price
          }
        }
      },
      error: error => {
        console.log(error);
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



  dropToggle() {
    $('.drop').fadeToggle();
  }

  ngOnInit(): void {
    this._StaffService.getAllBills('').subscribe({
      next: response => {
        this.bills = response
      },
      error: error => {
        console.log(error);
        this.bills = []
      }
    })
  }

}
