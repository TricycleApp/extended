import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuth = false;
  userInfo: any;

  constructor(private httpClient: HttpClient) {
  }

  signInUser(email: string, password: string) {
    const body = { mail: email, password: password };
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }), withCredentials: true };

    return new Promise((resolve, reject) => {
      this.httpClient
        .post('https://api.app-tricycle.com/api/user/login', body, httpOptions)
        .subscribe(
          (data: any) => {
            this.userInfo = data.user;
            this.isAuth = true;
            resolve()
          },
          (error) => reject(error)
        );
    });
  }


  signOut() {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }), withCredentials: true };

    return new Promise((resolve, reject) => {
      this.httpClient
        .get<any>('https://api.app-tricycle.com/api/user/auth/logout', httpOptions)
        .subscribe(
          (data) => {
            this.isAuth = false;
            this.userInfo = null;
            resolve(data)
          },
          (error) => reject(error)
        )
    });

  }
}


