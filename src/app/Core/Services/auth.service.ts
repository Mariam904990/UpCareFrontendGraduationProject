import { User } from './../../Interfaces/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user!: User | null
  constructor(private _HttpClient: HttpClient, private _Router: Router) 
  { 
    if(localStorage.getItem(environment.Token) != null){
      this.user = JSON.parse(localStorage.getItem(environment.Token) || "")
    }
  }

  // login preccesses
  adminLogin(data: object): Observable<any> {
    return this._HttpClient.post(environment.baseUrl + "admin/login", data)
  }

  nurseLogin(data: object): Observable<any> {
    return this._HttpClient.post(environment.baseUrl + "nurse/login", data)
  }

  doctorLogin(data: object): Observable<any> {
    return this._HttpClient.post(environment.baseUrl + "doctor/login", data)
  }

  receptionistLogin(data: object): Observable<any> {
    return this._HttpClient.post(environment.baseUrl + "receptionist/login", data)
  }

  pharmacyLogin(data: object): Observable<any> {
    return this._HttpClient.post(environment.baseUrl + "pharmacy/login", data)
  }

  checkupLogin(data: object): Observable<any> {
    return this._HttpClient.post(environment.baseUrl + "checkuplab/login", data)
  }

  radiologyLogin(data: object): Observable<any> {
    return this._HttpClient.post(environment.baseUrl + "radiologylab/login", data)
  }
  // end of login proccess

  logout() {
    localStorage.removeItem(environment.Token);
    this.user = null
    this._Router.navigate(['/login'])
  }

}
