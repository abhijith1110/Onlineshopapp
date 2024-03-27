import { Component,OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';
import {FormGroup,FormControl, FormBuilder,Validators} from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
   
 loginForm: FormGroup;
 loginError: string = '';
   errorMessage: string = '';

   constructor(private authservice:AuthService,private formBuilder: FormBuilder,private router: Router) { 
      this.loginForm = this.formBuilder.group({
         email: ['',Validators.required],
         password:['', Validators.required]
     });
   }

   // ngOnInit():void {
      
   // }
 

//  onSubmit()
//  {
//    if(this.loginForm.valid) {
//       const {email,password} = this.loginForm.value;
//       console.log(email+":"+password);
      
//       this.authservice.login(email,password).subscribe( 
//          (response)=> {
//             localStorage.setItem('token',response.token);
//             this.router.navigate(['/products']);
//          },
//          (error) => {
//             console.error('Error logging in', error);
//             this.loginError = 'Invalid email or password';
//          }
//       );

//       this.router.navigate(['/product-list']);
//    }
//  }
   
 login():void
 {
   const {email,password} = this.loginForm.value;
   this.authservice.login(email,password).subscribe(
      (response) => {
         localStorage.setItem('token',response.token);
         localStorage.setItem('userId',response.userId);
         this.authservice.setUserId(response.userId);

         if(response.role === 'seller')
         {
            this.router.navigate(['/seller/add-product']);
         }

         else
         {
             this.router.navigate(['/products']);
         }
         // this.router.navigate(['/products']);
      },

      (error)=> {
         console.error('Login error:',error);

         if(error.status === 401)
         {
            this.errorMessage = 'Invalid email or password';
          } else if(error.status === 404){
            alert('Invalid user.Please register to continue.');
          } else 
          {
            this.errorMessage = 'An error occured.Please try again later.';
          }
         // {
         //    this.errorMessage = 'User not found.Please register.';
         // }

         // {
         //    this.errorMessage = 'An error occured. Please try again later.';
         // }
      }

   );
 }
}
