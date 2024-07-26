import { Component, OnInit } from '@angular/core';
import { StaffService } from 'src/app/Core/Services/staff.service';
declare var $: any;

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss'],
})
export class ReviewsComponent implements OnInit {
  isOpen: boolean = false
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

  searchTerm: string = ''

  reviews: any[] = []
  selectedFeedback!: any
  constructor(private _StaffService: StaffService) { }


  selectReview(id: number) {
    this.isOpen = true
    this._StaffService.getSpecificFeedback(id).subscribe({
      next: response => {
        this.selectedFeedback = response
        console.log(this.selectedFeedback);
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
    this._StaffService.getFeedbacks('').subscribe({
      next: response => {
        this.reviews = response
        console.log(this.reviews);
      },
      error: err => {
        console.log(err);
      }
    })
  }

  chatDisplay(id: number) {
    this.isOpen = true

    this.selectedChat = this.chats[id - 1]
  }

  dropToggle() {
    $('.drop').fadeToggle();
  }

}
