import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class RadiologyService {

  constructor(private _HttpClient: HttpClient) { }

  getAll(): Observable<any> {
    return this._HttpClient.get(environment.baseUrl + 'radiology/all')
  }
}
