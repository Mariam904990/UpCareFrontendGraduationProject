import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class StaffService {

  constructor(
    private _HttpClient: HttpClient,
    private _AuthService: AuthService
  ) { }

  getSpecialities(): Observable<any> {
    return this._HttpClient.get(environment.baseUrl + 'doctor/specialities')
  }

  getAllCheckup(): Observable<any> {
    return this._HttpClient.get(environment.baseUrl + 'checkup/all');
  }

  getAllEmergency(): Observable<any> {
    return this._HttpClient.get(environment.baseUrl + 'consultation/emergency/all')
  }

  getAllDoctors(): Observable<any> {
    return this._HttpClient.get(environment.baseUrl + 'doctor/all')
  }

  getAllNurses(): Observable<any> {
    return this._HttpClient.get(environment.baseUrl + 'nurse/all')
  }

  getSpecificDoctor(id: string): Observable<any> {
    return this._HttpClient.get(environment.baseUrl + `doctor/${id}`);
  }

  getSpecificNurse(id: string): Observable<any> {
    return this._HttpClient.get(environment.baseUrl + 'nurse/' + id);
  }

  getSpecificReceptionist(id: string): Observable<any> {
    return this._HttpClient.get(environment.baseUrl + 'receptionist/' + id);
  }

  getAllReceptionists(): Observable<any> {
    return this._HttpClient.get(environment.baseUrl + 'receptionist/all');
  }

  getSpecificAdmin(id: string): Observable<any> {
    return this._HttpClient.get(environment.baseUrl + `admin/${id}`);
  }

  getFeedbacks(searchTerm: string): Observable<any> {
    return this._HttpClient.get(environment.baseUrl + `Feedback/all?patientNameSearchTerm=${searchTerm}`);
  }

  getMedicine(): Observable<any> {
    return this._HttpClient.get(environment.baseUrl + 'Medicine/all')
  }

  getScheduleByDoctorId(id: string): Observable<any> {
    return this._HttpClient.get(environment.baseUrl + `doctor/schedule/${id.trim()}`);
  }

  getScheduleForAllDoctors(): Observable<any> {
    return this._HttpClient.get(environment.baseUrl + 'doctor/schedule/all');
  }

  getShortageOfMedicine(amount: number | undefined = 10): Observable<any> {
    return this._HttpClient.get(environment.baseUrl + `medicine/shortage?leastNormalQuantity=${amount}`)
  }

  getSpecificFeedback(id: number): Observable<any> {
    return this._HttpClient.get(environment.baseUrl + 'feedback/' + id);
  }

  getMessages(id: string, role: 0 | 2): Observable<any> {
    switch (role) {
      case 0:
        return this._HttpClient.get(environment.baseUrl + `chat/admin/receive/doctors?role=${role}&id=${id}`);
        break;

      case 2:
        return this._HttpClient.get(environment.baseUrl + `chat/doctor/receive/admins?role=${role}&id=${id}`);
        break;
    }
  }

  getSpecificPatientMessagesForDoctor(patientId: string, doctorId: string): Observable<any> {
    return this._HttpClient.get(environment.baseUrl + `chat/doctor/receive/patient/${patientId}?id=${doctorId}&role=2`)
  }

  getSpecificDoctorMessagesForAdmin(doctorId: string): Observable<any> {
    return this._HttpClient.get(environment.baseUrl + `Chat/admin/receive/doctor/${doctorId}?id=${this._AuthService.user?.id}&role=0`)
  }

  getSpecificAdminMessagesForDoctor(adminId: string): Observable<any> {
    return this._HttpClient.get(environment.baseUrl + `chat/doctor/receive/admin/${adminId}?id=${this._AuthService.user?.id}&role=${2}`)
  }

  getMessagesFromPatients(id: string): Observable<any> {
    return this._HttpClient.get(environment.baseUrl + `/chat/doctor/receive/patients?role=2&id=${id}`)
  }

  sendMessage(data: object): Observable<any> {
    return this._HttpClient.post(environment.baseUrl + 'chat/send', data);
  }

  addMedicine(data: object): Observable<any> {
    return this._HttpClient.post(environment.baseUrl + 'medicine/add', data);
  }

  addRoom(data: object): Observable<any> {
    return this._HttpClient.post(environment.baseUrl + 'room/add', data)
  }

  updateRoom(data: object): Observable<any> {
    return this._HttpClient.post(environment.baseUrl + 'room/update', data)
  }

  updateMedicine(data: object): Observable<any> {
    return this._HttpClient.post(environment.baseUrl + 'medicine/update', data);
  }

  addDoctor(data: object): Observable<any> {
    return this._HttpClient.post(environment.baseUrl + 'doctor/add', data);
  }

  addCheckup(data: object): Observable<any> {
    return this._HttpClient.post(environment.baseUrl + 'checkup/add', data);
  }

  updateCheckup(data: object): Observable<any> {
    return this._HttpClient.post(environment.baseUrl + 'checkup/update', data);
  }

  deleteCheckup(id: number): Observable<any> {
    return this._HttpClient.delete(environment.baseUrl + `checkup/delete?id=${id}`);
  }

  addCheckupResult(data: FormData): Observable<any> {
    return this._HttpClient.post(environment.baseUrl + 'checkup/add/result', data, {
      headers: new HttpHeaders({
        'enctype': 'multipart/form-data'
      })
    })
  }

  addRadiologyResult(data: FormData): Observable<any> {
    return this._HttpClient.post(environment.baseUrl + 'radiology/add/result', data, {
      headers: new HttpHeaders({
        'enctype': 'multipart/form-data'
      })
    })
  }

  getCheckupsToDo(): Observable<any> {
    return this._HttpClient.get(environment.baseUrl + 'checkup/paid/to/do');
  }

  getAllRadiologies(): Observable<any> {
    return this._HttpClient.get(environment.baseUrl + 'radiology/all')
  }

  deleteRadiology(id: number): Observable<any> {
    return this._HttpClient.delete(environment.baseUrl + `radiology/delete?id=${id}`)
  }

  addRadiology(data: object): Observable<any> {
    return this._HttpClient.post(environment.baseUrl + 'radiology/add', data)
  }

  updateRadiology(data: object): Observable<any> {
    return this._HttpClient.post(environment.baseUrl + 'radiology/update', data);
  }

  getAllCheckupResult(): Observable<any> {
    return this._HttpClient.get(environment.baseUrl + 'checkup/results');
  }

  getAllRadiologyResult(): Observable<any> {
    return this._HttpClient.get(environment.baseUrl + 'radiology/results');
  }

  getCheckupsResultForSpecificPatient(id: string): Observable<any> {
    return this._HttpClient.get(environment.baseUrl + `checkup/results/${id}`);
  }

  getRadiologiesResultForSpecificPatient(id: string): Observable<any> {
    return this._HttpClient.get(environment.baseUrl + `radiology/results/${id}`);
  }

  getRadiologiesToDo(): Observable<any> {
    return this._HttpClient.get(environment.baseUrl + 'radiology/paid/to/do');
  }

  addPrescription(data: object): Observable<any> {
    return this._HttpClient.post(environment.baseUrl + 'prescription/add', data)
  }

  addEmergency(data: object): Observable<any> {
    return this._HttpClient.post(environment.baseUrl + 'consultation/emergency', data)
  }

  addPatient(data: object): Observable<any> {
    return this._HttpClient.post(environment.baseUrl + 'patient/register', data)
  }

  getNurseCareRecords(patientId: string, roomId: number): Observable<any> {
    return this._HttpClient.get(environment.baseUrl + `nurse/care/records?patientId=${patientId}&roomId=${roomId}`)
  }

  addNurseCareRecord(data: object): Observable<any> {
    return this._HttpClient.post(environment.baseUrl + 'nurse/care/add', data)
  }

  addReceptionist(data: object): Observable<any> {
    return this._HttpClient.post(environment.baseUrl + 'receptionist/add', data);
  }

  addNurse(data: object): Observable<any> {
    return this._HttpClient.post(environment.baseUrl + 'nurse/add', data);
  }

  getAllBills(searchTerm: string): Observable<any> {
    return this._HttpClient.get(environment.baseUrl + `bill?searchTerm=${searchTerm}`)
  }

  getSpecificBill(id: number): Observable<any> {
    return this._HttpClient.get(environment.baseUrl + `bill/${id}`);
  }

  getAllPatients(): Observable<any> {
    return this._HttpClient.get(environment.baseUrl + 'patient/all')
  }

  getSpecificPatient(id: string): Observable<any> {
    return this._HttpClient.get(environment.baseUrl + `patient/${id}`);
  }

  searchByPatientsName(searchTerm: string): Observable<any> {
    return this._HttpClient.get(environment.baseUrl + 'patient/search?nameSearchTerm=' + searchTerm)
  }

  getPatientProfile(patientId: string): Observable<any> {
    return this._HttpClient.get(environment.baseUrl + 'patient/history/' + patientId)
  }

  getAllHealthRecords(): Observable<any> {
    return this._HttpClient.get(environment.baseUrl + 'care/healthdata');
  }

  getLastHealthRecord(): Observable<any> {
    return this._HttpClient.get(environment.baseUrl + 'care/latestreading');
  }

  getAllRooms(): Observable<any> {
    return this._HttpClient.get(environment.baseUrl + 'room/all')
  }

  getSpecificRoom(id: number): Observable<any> {
    return this._HttpClient.get(environment.baseUrl + `room/${id}`);
  }

  addNewBooking(data: object): Observable<any> {
    return this._HttpClient.post(environment.baseUrl + 'room/book', data);
  }

  payForBooking(data: object): Observable<any> {
    return this._HttpClient.post(environment.baseUrl + 'payment/intent/booking', data);
  }

  endBookingForPatient(data: object): Observable<any> {
    return this._HttpClient.post(environment.baseUrl + 'room/end/booking', data);
  }

  cancelEmergency(data: object): Observable<any> {
    return this._HttpClient.post(environment.baseUrl + 'consultation/cancel', data)
  }

  payForReservation(data: object): Observable<any> {
    return this._HttpClient.post(environment.baseUrl + 'payment/intent/reservation', data);
  }
}
