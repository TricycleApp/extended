import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }), withCredentials: true };

  constructor(private httpClient: HttpClient) { }

  /**
   * Get product
   * @param barcode -  Barcode of product
   * @returns Promise with product data
   */
  getProduct(barcode: string) {

    return new Promise((resolve, reject) => {
      this.httpClient
      .get<any>(`https://api.app-tricycle.com/api/product/${barcode}`, this.httpOptions)
      .subscribe(data => resolve(data),
      (error => reject(error))
      );
    });
  }

  /**
   * Update information of product
   * @param barcode 
   * @param product 
   * @param image
   * @returns Promise 
   */
  updateProduct(barcode: string, product: Product, image?: File) {
    const httpOptions = { withCredentials: true };
    
    const productData = new FormData();
    productData.append('product', JSON.stringify(product));
    productData.append('image', image);

    return new Promise((resolve, reject) => {
      this.httpClient
      .put(`https://api.app-tricycle.com/api/product/edit/${barcode}`, productData, httpOptions)
      .subscribe(
        data => resolve(data),
        error => reject(error)
      );
    }); 
  }

  /**
   * Delete product
   * @param idProduct
   * @returns Promise
   */
  deleteProduct(idProduct: string) {

    return new Promise((resolve, reject) => {
      this.httpClient
        .delete(`https://api.app-tricycle.com/api/product/delete/${idProduct}`, this.httpOptions)
        .subscribe(
          data => resolve(data),
          error => reject(error)
        )
    });
  }

  /**
   * Get all products
   * @returns Promise
   */
  getAll() {
    return new Promise((resolve, reject) => {
      this.httpClient
      .get('https://api.app-tricycle.com/api/product/all', this.httpOptions)
      .subscribe(
        data => resolve(data),
        error => reject(error)
      )
    });
  }

  /**
   * Add new product
   * @param product 
   * @param image 
   * @returns Promise
   */
  addProduct(product: Product, image?: File) {
    let httpOptions = null;
    let productData = null;

    if(image) {
      httpOptions = { withCredentials: true };
      productData = new FormData();
      productData.append('product', JSON.stringify(product));
      productData.append('image', image);
    } else {
      httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }), withCredentials: true };
      productData = product;
    }

    return new Promise((resolve, reject) => {
      this.httpClient
        .post(`https://api.app-tricycle.com/api/product/add`, productData, httpOptions)
        .subscribe(
          data => resolve(data),
          error => reject(error)
        );
    });
  }

}
