import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuth = false;
  userInfo: {};

  constructor(private httpClient: HttpClient) {
    this.checkUseIsConnected();
   }

   checkUseIsConnected() {
     this.httpClient
     .get<any>('https://api.app-tricycle.com/api/user/check')
     .subscribe((response) => {console.log(response)},
    (error) => console.log(error));
   }

   signInUser(email: string, password: string): boolean {
    const body = { mail: email, password: password };
    const httpOptions = { withCredentials: true };
    let error = true;
    
    this.httpClient
      .post('https://api.app-tricycle.com/api/user/login', body, httpOptions)
      .subscribe((data) => {
        this.isAuth = true;
        this.userInfo = data.user;
        error = false;
      },
      (error) => {}
      );

      return error;
   }  

   signOut() {
    
   }
}
