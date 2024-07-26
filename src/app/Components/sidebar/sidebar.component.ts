import { Component } from '@angular/core';
import { AuthService } from 'src/app/Core/Services/auth.service';
declare var $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  constructor(public _AuthService:AuthService){}
  slideToggleStaff() {
    $('.optional-list').slideUp()
    $('.fa-angle-down').css('transform', 'rotate(0)')
    const list = document.querySelector('.optional-list')
    const arrow = document.querySelector('.fa-angle-down')
    $(arrow).css('transform', 'rotate(180deg)')
    if($(arrow).css('transform') == 'matrix(-1, 0, 0, -1, 0, 0)'){
      $(arrow).css('transform', 'rotate(0)')
      $(list).slideUp(500)
    }else{
      $(list).slideDown(500)
      console.log($(arrow).css('transform'));       
    }
  }

  slideToggleLabs(){
    $('.optional-list').slideUp()
    $('.fa-angle-down').css('transform', 'rotate(0)')
    const list = document.querySelectorAll('.optional-list');
    const arrow = document.querySelectorAll('.fa-angle-down');
    $(arrow[1]).css('transform', 'rotate(180deg)')
    if($(arrow[1]).css('transform') == 'matrix(-1, 0, 0, -1, 0, 0)'){
      $(arrow[1]).css('transform', 'rotate(0)')
      $(list[1]).slideUp()
    }else{
      $(list[1]).slideDown()
      console.log($(arrow[1]).css('transform'));       
    }

  }
}
