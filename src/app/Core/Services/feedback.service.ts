import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private _HttpClient:HttpClient) { }

  getAllFeedbacks(patientNameSearchTerm:string): Observable<any> {
    return this._HttpClient.get(environment.baseUrl+`feedback/all?patientNameSearchTerm=${patientNameSearchTerm}`);
  }
}
