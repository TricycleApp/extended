import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }), withCredentials: true };

  constructor(private httpClient: HttpClient) { }

  getProduct(barcode: string) {

    return new Promise((resolve, reject) => {
      this.httpClient
      .get<any>(`https://api.app-tricycle.com/api/product/${barcode}`, this.httpOptions)
      .subscribe(data => resolve(data),
      (error => reject(error))
      );
    });
  }

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
