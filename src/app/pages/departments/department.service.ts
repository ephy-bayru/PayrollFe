import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/internal/operators/catchError';
import { retry } from 'rxjs/internal/operators/retry';
import { Department } from 'src/app/interface/department';
import { NotificationService } from 'src/app/service/notification.service';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  apiURL = 'https://1cm3ip4iua.execute-api.us-east-2.amazonaws.com/api';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
    })
  }

  constructor(public http:HttpClient,
    private notificationService: NotificationService

    ) {
  }

  // HttpClient API get() method => Fetch departments list
  getDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(this.apiURL + '/departments')
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  // HttpClient API get() method => Fetch Department
  getDepartment(id): Observable<Department> {
    return this.http.get<Department>(this.apiURL + '/departments/' + id)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  // HttpClient API post() method => Create Department
  createDepartment(department): Observable<Department> {
    return this.http.post<Department>(this.apiURL + '/departments', JSON.stringify(department), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  // HttpClient API put() method => Update Department
  updateDepartment(id, department): Observable<Department> {
    return this.http.put<Department>(this.apiURL + '/departments/' + id, JSON.stringify(department), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  // HttpClient API delete() method => Delete Department
  deleteDepartment(id){
    return this.http.delete<Department>(this.apiURL + '/departments/' + id, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  // Error handling
  handleError(error) {
     let errorMessage = '';
     if(error.error instanceof ErrorEvent) {
       // Get client-side error
       errorMessage = error.error.message;
     } else {
       // Get server-side error
       errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
     }
     this.notificationService.error('errorMessage', 'error')
     return throwError(errorMessage);
  }
}
