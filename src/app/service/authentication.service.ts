import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs/operators';
import { User } from '../interface/user';



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  _url = 'https://1cm3ip4iua.execute-api.us-east-2.amazonaws.com/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};


  constructor(private http: HttpClient, public router: Router) { }

    // Sign-in
    signIn(user: User) {
      return this.http.post<any>(`${this._url}/auth/login`, user)
        .subscribe((res: any) => {
          localStorage.setItem('access_token', res.token);
          this.router.navigate(['dashboard']);
        })
    }

    getToken() {
      return localStorage.getItem('access_token');
    }

    get isLoggedIn(): boolean {
      let authToken = localStorage.getItem('access_token');
      return (authToken !== null) ? true : false;
    }

    doLogout() {
      localStorage.removeItem('access_token');
      this.router.navigate(['login']);
    }

    // Error
    handleError(error: HttpErrorResponse) {
      let msg = '';
      if (error.error instanceof ErrorEvent) {
        // client-side error
        msg = error.error.message;
      } else {
        // server-side error
        msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
      return throwError(msg);
    }
  }
