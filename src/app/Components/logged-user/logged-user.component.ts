import { Component } from '@angular/core';
import { AuthService } from 'src/app/Core/Services/auth.service';
declare var $: any;

@Component({
  selector: 'app-logged-user',
  templateUrl: './logged-user.component.html',
  styleUrls: ['./logged-user.component.scss']
})
export class LoggedUserComponent {
  constructor(public _AuthService:AuthService){}
  
  dropToggle() {
    $('.drop').fadeToggle()
  }
}
