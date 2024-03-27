import { Injectable } from '@angular/core';
import { BehaviorSubject,Observable,throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {

  private Cart:any[] = [];
  private baseUrl = 'http://localhost:3000/api';
  private loadingSubject = new BehaviorSubject<boolean>(false);

  constructor(private http:HttpClient,private authService: AuthService) {}

  // addToCart(product:any):void {
  //   this.items.push(product);
  // }

  // removeFromCart(product:any): void {
  //   this.items = this.items.filter(item => item.id !== product.id);
  // }

  get loading$(): Observable<boolean> {
    return this.loadingSubject.asObservable();
  }

  private setLoading(value: boolean): void 
  {
    this.loadingSubject.next(value);
  }

  addToCart(productId:number, quantity:number): Observable<any> {
     const userId = this.authService.getUserId();
     console.log(userId);
     const headers = new HttpHeaders({
       Authorization: `Bearer ${localStorage.getItem('token')}`
     });
        
     const existingItem = this.Cart.find(item => item.productId === productId);

     if(existingItem)
     {
        existingItem.quantity += quantity;
        existingItem.totalPrice = existingItem.quantity * existingItem.productPrice;

        return this.http.put<any>(`${this.baseUrl}/cart/${userId}/${productId}`,{quantity: existingItem.quantity}, {headers})

     }
     return this.http.post<any>(`${this.baseUrl}/cart/add`,{productId,userId,quantity}, { headers});
  }
  getCartItems(): Observable<any> {
    // return this.http.get<any>(`${this.baseUrl}/${userId}`);
   const userId = this.authService.getUserId();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
     return this.http.get<any[]>(`${this.baseUrl}/cart/${userId}`);
  }

    // this.setLoading(true);

    // return this.http.get<any>(`${this.baseUrl}/cart/${userId}`,{headers})
    // .pipe(
    //    map(response => {
    //     this.setLoading(false);
    //     return response;
    //    }),

    //    catchError(error=> {
    //      this.setLoading(false);
    //      return throwError(error);
    //    })
    // );

  //    return this.http.get<any[]>(`${this.baseUrl}/cart/${userId}`, {headers});
  // }

  removeCartItem(userId:number, productId: number): Observable<void> {
    const url = `${this.baseUrl}/cart/${userId}/${productId}`;
    return this.http.delete<void>(url);
  }
}
