import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {FormBuilder, FormGroup,Validators} from '@angular/forms';
import {Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
   registerForm: FormGroup;
   registrationError:string = '';
  constructor(private http: HttpClient,private formBuilder: FormBuilder,private router:Router) { 
    this.registerForm = this.formBuilder.group({
      username:['',Validators.required],
      email:['',[Validators.required,Validators.email]],
      password:['',Validators.required]
    });
  }

  registerUser(){
   if (this.registerForm.valid){
    const userData = this.registerForm.value;

    this.http.post<any>('http://localhost:3000/register',userData).subscribe(response => {
      console.log(response.message);
      console.log("Before Navigation:");
      this.router.navigate(['/login']);
      console.log("After Navigation");
    }, error => {
      console.error('Error registering user:',error);
      if(error.status === 409){
        this.registrationError = 'User already exists.Please try with a different username or email.';

      } else 
      {
        this.registrationError  = 'An error occured while registering.Please try again later.';
      }
    });
   } else 

   {
    console.error('Form is not valid');
   }

    // this.router.navigate(['/login']);
  }

}
