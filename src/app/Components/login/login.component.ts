import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Core/Services/auth.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup
  roleInput!: FormControl

  hide = true;
  roles: string[] = ["Admin", "Receptionist", "Doctor", "Nurse", "Pharmacy", "Checkup", "Radiology"]
  selectedRole!: string
  constructor(private _Router: Router,
    public _AuthService: AuthService,
    private _fb: FormBuilder,
    private _ToastrService: ToastrService) {

  }

  login() {
    if (this.loginForm.valid) {
        switch (this.selectedRole) {
          case 'Admin':
            this._AuthService.adminLogin(this.loginForm.value).subscribe({
              next: (response) => {
                localStorage.setItem(environment.Token, JSON.stringify(response));
                this._ToastrService.success(`Welcome ${response.firstName}`);
                this._AuthService.user = response
                this._Router.navigate(['/dashboard'])
              }, error: (err) => {
                this._ToastrService.error(err.error.message)
              }
            }
            )
            break;
          case 'Receptionist':
            this._AuthService.receptionistLogin(this.loginForm.value).subscribe({
              next: (response) => {
                localStorage.setItem(environment.Token, JSON.stringify(response));

                this._ToastrService.success(`Welcome ${response.firstName}`);
                this._AuthService.user = response
                this._Router.navigate(['/dashboard'])
              }, error: (err) => {
                this._ToastrService.error(err.error.message)
              }
            }
            )
            break;
          case 'Doctor':
            this._AuthService.doctorLogin(this.loginForm.value).subscribe({
              next: (response) => {
                localStorage.setItem(environment.Token, JSON.stringify(response));

                this._ToastrService.success(`Welcome ${response.firstName}`);
                this._AuthService.user = response
                this._Router.navigate(['/dashboard'])
              }, error: (err) => {
                this._ToastrService.error(err.error.message)
              }
            }
            )
            break;
          case 'Nurse':
            this._AuthService.nurseLogin(this.loginForm.value).subscribe({
              next: (response) => {
                localStorage.setItem(environment.Token, JSON.stringify(response));

                this._ToastrService.success(`Welcome ${response.firstName}`);
                this._AuthService.user = response
                this._Router.navigate(['/dashboard'])
              }, error: (err) => {
                this._ToastrService.error(err.error.message)
              }
            }
            )
            break;
          case 'Pharmacy':
            this._AuthService.pharmacyLogin(this.loginForm.value).subscribe({
              next: (response) => {
                localStorage.setItem(environment.Token, JSON.stringify(response));

                this._ToastrService.success(`Welcome ${response.firstName}`);
                this._AuthService.user = response
                this._Router.navigate(['/dashboard'])
              }, error: (err) => {
                this._ToastrService.error(err.error.message)
              }
            }
            )
            break;
          case 'Checkup':
            this._AuthService.checkupLogin(this.loginForm.value).subscribe({
              next: (response) => {
                localStorage.setItem(environment.Token, JSON.stringify(response));

                this._ToastrService.success(`Welcome ${response.firstName}`);
                this._AuthService.user = response
                this._Router.navigate(['/dashboard'])
              }, error: (err) => {
                this._ToastrService.error(err.error.message)
              }
            }
            )
            break;
          case 'Radiology':
            this._AuthService.radiologyLogin(this.loginForm.value).subscribe({
              next: (response) => {
                localStorage.setItem(environment.Token, JSON.stringify(response));
                this._ToastrService.success(`Welcome ${response.firstName}`);
                this._AuthService.user = response
                this._Router.navigate(['/dashboard'])
              }, error: (err) => {
                this._ToastrService.error(err.error.message)
              }
            }
            )
            break;
          default:
            this._ToastrService.error("Please select role!")
            break;
        }
    }
    else {
      this._ToastrService.error("Please fill required data !")
    }
  }

  ngOnInit(): void {
    this.loginForm = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }
}
