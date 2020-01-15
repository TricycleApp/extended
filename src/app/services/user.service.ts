import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userInfo: any;
  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }), withCredentials: true };
  
  constructor(private authService: AuthService, private httpClient: HttpClient) { 
    this.userInfo = this.authService.userInfo;
  }

  getStatsAndHistory() {

    return new Promise((resolve, reject) => {
      this.httpClient
      .get<any>(`https://api.app-tricycle.com/api/user/stat-history/${this.userInfo.userId}`, this.httpOptions)
      .subscribe(data => resolve(data),
      error => reject(error));
    });
  }

  getAllHistory() {

    return new Promise((resolve, reject) => {
      this.httpClient
      .get<any>(`https://api.app-tricycle.com/api/user/history/${this.userInfo.userId}`, this.httpOptions)
      .subscribe(
        data => resolve(data),
        error => reject(error)
      );
    });
  }

  getInformation(userId?: string) {
    if(!userId) {
      userId = this.userInfo.userId;
    }
    return new Promise((resolve, reject) => {
      this.httpClient
      .get<any>(`https://api.app-tricycle.com/api/user/${userId}`, this.httpOptions)
      .subscribe(
        data => resolve(data),
        error => reject(error)
      )
    });
  }

  editInformation(id, user) {
    return new Promise((resolve, reject) => {
      this.httpClient
      .put(`https://api.app-tricycle.com/api/user/${id}`, user, this.httpOptions)
      .subscribe(
        data => resolve(data),
        error => reject(error)
      )
    });
  }

  getAllUsers() {
    return new Promise((resolve, reject) => {
      this.httpClient
        .get<any>('https://api.app-tricycle.com/api/user/all', this.httpOptions)
        .subscribe(
          data => resolve(data),
          error => reject(error)
        )
    });
  }

  deleteUser(id: string) {
    return new Promise((resolve, reject) => {
      this.httpClient
        .delete<any>(`https://api.app-tricycle.com/api/user/delete/${id}`, this.httpOptions)
        .subscribe(
          data => resolve(data),
          error => reject(error)
        )
    });
  }

}
