import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  
   private baseUrl = 'http://localhost:3000/api/cart';
  constructor(private http: HttpClient) { }

  checkout( checkoutPayload:{userId:number, cartItems:any[] }): Observable<any> {

    const {userId, cartItems} = checkoutPayload;
    const url = `${this.baseUrl}/checkout/${userId}`;
    return this.http.post<any>(this.baseUrl, {cartItems});
  }
}
