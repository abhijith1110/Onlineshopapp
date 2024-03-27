import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, publishBehavior, tap,of } from 'rxjs';
import {Subject,BehaviorSubject} from 'rxjs';
import {Router} from '@angular/router';



interface User 
{
   username:string;
   email:string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated = false;
  private isSeller: boolean;
  private localStorageKey = "isLoggedIn";

  //  private loggedIn = new BehaviorSubject<boolean>(false);
   private apiUrl = 'http://localhost:3000';
   private userIdSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
   userId$: Observable<string | null> = this.userIdSubject.asObservable();
   private loggedIn = false;
  //  private isAuthenticated = false;
   
   constructor(private http:HttpClient, private router:Router) { 
    this.isAuthenticated = localStorage.getItem(this.localStorageKey) === 'true';
    this.isSeller = false;
  
   }

     isLoggedIn():boolean {
      return this.loggedIn;

    }
  login(email: string, password:string): Observable<any>{
    const userData = {email,password};
    return this.http.post<any>(`${this.apiUrl}/login`,userData).pipe(
       tap(response => {
          localStorage.setItem('token', response.token);
          // localStorage.setItem('userId',response.userId);
          // this.setUserId(response.userId);
          // console.log('User Id emitted:',response.userId);

           this.loggedIn = true;
           this.isAuthenticated = true;
           localStorage.setItem(this.localStorageKey,'true');
           localStorage.setItem('userId',response.userId);
      
       })

    );
   
  }

  

  public getIsSeller(): boolean 
  {
    return this.isSeller;
  }


  public SetIsSeller(Value: boolean): void 
  {
    this.isSeller = Value;

  }
   setUserId(userId:string): void {
    console.log('Setting UserId:', userId);
    this.userIdSubject.next(userId);
   }
  logout():void 
  {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    // this.userIdSubject.next(null);

    this.loggedIn = false;
    this.router.navigate(['/login']);
    this.isAuthenticated = false;
    localStorage.removeItem(this.localStorageKey);
  }

  // setLoggedIn(value:boolean)
  // {
  //   this.loggedIn = value;

  // }


  // isLoggedIn():Observable<boolean>
  // {
  //   return this.loggedIn.asObservable();
  // }


  
  // isLoggedIn()
  // {
  //   return this.loggedIn;
  // }
 
  storeToken(token:string)
  {
    localStorage.setItem('token', token);
  }

  getUserId(): string | null {
    return localStorage.getItem('userId');
  }

//  isAuthenticated(): boolean
//  {
//   return this.isAuthenticated;
//  }
  isAuthenticatedUser():boolean 
  {
    return this.isAuthenticated;
  }
}
