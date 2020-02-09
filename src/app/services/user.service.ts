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

  /**
   * Get statistics and history of user logged
   * @returns Promise
   */
  getStatsAndHistory() {

    return new Promise((resolve, reject) => {
      this.httpClient
      .get<any>(`https://api.app-tricycle.com/api/user/stat-history/${this.userInfo.userId}`, this.httpOptions)
      .subscribe(data => resolve(data),
      error => reject(error));
    });
  }

  /**
   * Get all products scanned by user
   * @returns Promise
   */
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

  /**
   * Get informations of user logged
   * @param userId
   * @returns Promise
   */
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

  /**
   * Update informations of user logged
   * @param id 
   * @param user
   * @returns Promise
   */
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

  /**
   * Get all users
   * @returns Promise
   */
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

  /**
   * Delete user
   * @param id
   * @returns Promise
   */
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

  /**
   * Add existing product in our database in history of user
   * @param product
   * @returns Promise
   */
  addProductInHistory(product) {
    const userId = this.userInfo.userId;
    return new Promise((resolve, reject) => {
      this.httpClient
        .post(`https://api.app-tricycle.com/api/user/add-product/history/${userId}`, product, this.httpOptions)
        .subscribe(
          data => resolve(data),
          error => reject(error)
        )
    })
  }

}
