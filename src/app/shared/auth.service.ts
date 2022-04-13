import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL = 'http://localhost:3000';


  constructor(private http: HttpClient) { }

  addUser(role : string){
    localStorage.setItem('role', role);
  }

  removeUser(){
    localStorage.removeItem('role');
  }

  loginAdmin(user : User) : Observable<any>{
    return this.http.post((this.URL + '/login'),
    user, 
    {
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    })
    .pipe(
      catchError(this.handleError)
    )
  
  }

  loginPatient(user: User): Observable<any>{
    return this.http.post((this.URL + '/login'),
    user, 
    {
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    })
    .pipe(
      catchError(this.handleError)
    )
  }

  loginDoctor(user: User) : Observable<any>{
    return this.http.post((this.URL + '/login'),
    user, 
    {
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    })
    .pipe(
      catchError(this.handleError)
    )
  }

  getOtp(hospitalId: string, role: string, user: Object) : Observable<any>{
    return this.http.post((this.URL+ '/signup'),
    user,
    {
      headers: new HttpHeaders({
        'hospitalid' : hospitalId,
        'role': role
      })
    }
    )
    .pipe(
      map( res => {
        return res;
        // return reponseData;
      }),
      catchError(
        errorRes => {
          throw(errorRes);
        })
    )
  }

  resetPassword(hospitalId: string, role: string, user: Object): Observable<any> {
    return this.http.post((this.URL+ '/resetPassword'),
    user,
    {
      headers: new HttpHeaders({
        'hospitalid' : hospitalId,
        'role': role
      })
    }
    )
    .pipe(
      map( res => {
        return res;
        // return reponseData;
      }),
      catchError(
        errorRes => {
          throw(errorRes);
        })
    )
  }

  handleError(error: HttpErrorResponse){  
    return  throwError({
        "status" : error.status,
        "message" : error.message || "Something went worng",
      }
    )
  }
}
