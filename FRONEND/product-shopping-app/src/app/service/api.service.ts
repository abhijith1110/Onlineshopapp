import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse} from '@angular/common/http';
import { Observable,throwError} from 'rxjs';
import { catchError, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
 
  private apiUrl = 'http://localhost:3000/api/product';
  getProducts(): Observable<any[]>
  {
     return this.http.get<any>(this.apiUrl);
  }

  getProductDetails(productId:number) 
  {
    return this.http.get<any>(`http://localhost:3000/api/product/${productId}`)
    .pipe(
        map(response => response),
        catchError(this.handleError)
    );
  }

  getProductById(productId:number):Observable<any> {

    if(isNaN(productId))
    {
      return throwError('Invalid productId');
    }
    const url = `${this.apiUrl}/${productId}`;
    console.log('Fetching product details from:', url);
    return this.http.get<any>(url).pipe(
      catchError(error => {
        console.error('Error fetching product details',error);
        return throwError('Error fetching product details.Please try again');
      })
    );

  }

  getUserId(userId:number): number | null {
    console.log(userId);
    return userId ? +userId : null;
  }

  private handleError(error: HttpErrorResponse)
  {
    if(error.error instanceof ErrorEvent){
      console.error('An error occured:', error.error.message);
    } else
    {

       console.error (
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
       
    }

    return throwError('Something went wrong.Please try again later.');
  }
}
