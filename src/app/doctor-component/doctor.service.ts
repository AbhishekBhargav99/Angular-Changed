import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  private Url = 'http://localhost:3000/doctorApi'
  constructor(private http: HttpClient) { }

  public getPatients(doctorId:string, hospitalId: string) : Observable<any>{
    return this.http.get(
      (this.Url+ '/allPermissionedPatients'),
      {
        headers: new HttpHeaders({
          'hospitalid' : hospitalId,
          'doctorId': doctorId
        })
      }
    ).pipe(
      map(
        reponseData => {
          return reponseData; 
        }),
        catchError(errorRes => {
          throw(errorRes);
        })

    )

  }

  public addMedicalRecords(patientId: string, doctorId:string, hospitalId: string, medRecord: Object) : Observable<any>{
    console.log(hospitalId, patientId, doctorId);
    return this.http.patch(
      (this.Url+ `/${hospitalId}/${doctorId}/addRecords/${patientId}`),
      medRecord,
      {
        headers: new HttpHeaders({
          'hospitalid' : hospitalId,
          'doctorId': doctorId,
          'patientId': patientId
        })
      }
    ) .pipe(
      map( response => {
        return response;
      }),
      catchError(
        errorRes => {
          throw(errorRes);
        })
    )
  }

  public addMedicalRecs(patientId: string, doctorId:string, hospitalId: string, medRecord: Object) : Observable<any>{
    console.log(hospitalId, patientId, doctorId);
    return this.http.patch(
      (this.Url+ `/${hospitalId}/${doctorId}/addRecs/${patientId}`),
      {medRecord : medRecord},
      {
        headers: new HttpHeaders({
          'hospitalid' : hospitalId,
          'doctorId': doctorId,
          'patientId': patientId
        })
      }
    ) .pipe(
      map( response => {
        return response;
      }),
      catchError(
        errorRes => {
          throw(errorRes);
        })
    )
  }

  public getPatientRecords(patientId: string, doctorId:string, hospitalId: string) :Observable<any> {
    return this.http.get(
      ( this.Url + '/getMedicalHistory'),
      {
        headers: new HttpHeaders({
          'hospitalid' : hospitalId,
          'doctorId': doctorId,
          'patientId': patientId,
        })
      }
    ) .pipe(
      map(
        responseData => {
          return responseData;
        }),
        catchError(errorRes => {
          throw(errorRes);
        })
    )
  }
}
