import { Injectable } from '@angular/core';
import { CanActivate,ActivatedRouteSnapshot,RouterStateSnapshot,Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{
    
 
  constructor(private authService: AuthService, private router:Router ) {
   
   }

   canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
   ): Observable<boolean> | Promise<boolean> | boolean {
    const isAuthenticated = this.authService.isLoggedIn();
    if(!isAuthenticated)
    {
      this.router.navigate(['/login']);
      return false;
    }
    return isAuthenticated;
   }
    
  }


