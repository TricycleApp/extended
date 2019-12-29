import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userInfo: any;
  
  constructor(private authService: AuthService, private httpClient: HttpClient) { 
    this.userInfo = this.authService.userInfo;
  }

  getStatsAndHistory() {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }), withCredentials: true };

    return new Promise((resolve, reject) => {
      this.httpClient
      .get<any>(`https://api.app-tricycle.com/api/user/stat-history/${this.userInfo.userId}`, httpOptions)
      .subscribe(data => resolve(data),
      error => reject(error));
    });
    
  }

}
