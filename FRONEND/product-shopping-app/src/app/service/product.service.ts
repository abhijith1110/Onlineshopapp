import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'http://localhost:3000/api/products';
  constructor(private http: HttpClient) { }

  addProduct(productData:any): Observable<any> {
    return this.http.post<any>(this.baseUrl, productData);
  }
}
