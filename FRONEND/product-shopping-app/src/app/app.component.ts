import { Component,OnInit } from '@angular/core';
import {Router} from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  

  title = 'product-shopping-app';
  showRegistration = false;
  showLogin = false;
  showProductList = true;
  constructor(private router:Router) {}

  ngOnInit(): void {
     if (this.router.url === '/') {
        this.router.navigate(['/products']);
     }
  }
  toggleRegistration() 
  {
    this.showRegistration =true;
    this.showLogin  = false;
    this.showProductList = !this.showRegistration;
    console.log('Registration is logged');
    
  }

  toggleLogin()
  {
    this.showLogin = true;
    this.showRegistration = false; 
    this.showProductList = !this.showLogin;
    //To ensure registration is hidden when toggling Login.
    console.log('Loggin is toggled');

  }
}
