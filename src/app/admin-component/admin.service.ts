import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable } from 'rxjs';
import { PatientRecordsView } from './utils/patient-records-view';
import { DoctorRecordsView } from './utils/doctor-records-view';


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private Url = 'http://localhost:3000/adminApi'
  constructor(private http: HttpClient) { }

  public getAllPatients(adminId: string, hospId: string) : Observable<any> {
    return this.http.get<PatientRecordsView>(
      (this.Url+ '/allPatients'),
      {
        headers: new HttpHeaders({
          'hospitalid' : hospId,
          'adminid': adminId
        })
      }
    ).pipe(
      map(
        reponseData => {
          // let responseArray : PatientRecordsView[] = [];
          // for(let response of responseArray){
          //   responseArray.push(response);
          // }
          return reponseData; 
        }),
        catchError(errorRes => {
          throw(errorRes);
        })

    )
  }

  public getAllDoctors(adminId: string, hospId: string) : Observable<any> {
    return this.http.get<DoctorRecordsView>(
      (this.Url+ '/allDoctors'),
      {
        headers: new HttpHeaders({
          'hospitalid' : hospId,
          'adminid': adminId
        })
      }
    ) .pipe(
      map( responseArray => {
        // console.log(res);
        // let responseArray : DoctorRecordsView[] = []
        // for(let response of responseArray){
        //   responseArray.push(response);
        // }
        return responseArray;
        // return reponseData;
      }),
      catchError(
        errorRes => {
          throw(errorRes);
        })
    )
  }

  public registerPatient(adminId: string, hospId: string, patientData: Object){
    // console.log(adminId, hospId);
    // console.log(patientData);
    return this.http.post(
      (this.Url + '/newPatient'),
      patientData,
      {
        headers: new HttpHeaders({
          'hospitalid' : hospId,
          'adminid': adminId
        })
      }
    )
    .pipe(
      map(
        reponseData => {
          return reponseData;
        }
      ),
      catchError(
        err => {
          throw(err);
        }
      )
    )
  }

  public registerDoctor(adminId: string, hospId: string, doctorData: Object){
    return this.http.post(
      (this.Url + '/newDoctor'),
      doctorData,
      {
        headers: new HttpHeaders({
          'hospitalid' : hospId,
          'adminid': adminId
        })
      }
    ) .pipe(
      map(
        responseData => {
          return responseData;
        }
      ),
      catchError(
        err => {
          throw(err);
          console.log(err);
        }
      )
    )
  }
}
