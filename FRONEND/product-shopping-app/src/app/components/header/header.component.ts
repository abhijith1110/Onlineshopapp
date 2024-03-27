import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isLoggedIn:boolean = false;
  public totalItem:number = 0;
  constructor(private authService:AuthService) { }

   onLogIn(): boolean 
   {
    return this.authService.isLoggedIn();
   }

  onLogOut()
  {
    this.authService.logout();
  }
  ngOnInit(): void {
    //    this.cartService.getProducts():Observable<any>{

    //    }
    //     .subscribe((res:any) => {
    //        this.totalItem = res.length;
    //    });  
    
    this.isLoggedIn = this.authService.isAuthenticatedUser();
  }
}
