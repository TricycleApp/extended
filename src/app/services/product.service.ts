import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) { }

  getProduct(barcode: string) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }), withCredentials: true };

    return new Promise((resolve, reject) => {
      this.httpClient
      .get<any>(`https://api.app-tricycle.com/api/product/${barcode}`, httpOptions)
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
}
