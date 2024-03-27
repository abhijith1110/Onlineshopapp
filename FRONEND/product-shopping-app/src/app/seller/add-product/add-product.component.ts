// import { Component,OnInit} from '@angular/core';
// import {FormBuilder, FormGroup, NG_VALIDATORS, Validators} from '@angular/forms';
// import { ProductService } from 'src/app/service/product.service';

// @Component({
//   selector: 'app-add-product',
//   templateUrl: './add-product.component.html',
//   styleUrls: ['./add-product.component.css']
// })


// interface Product 
// {
//   name:string;
//   price:number;
//   description:string;
//   imageUrl:string;

// }
// export class AddProductComponent implements OnInit {

//     product = {
//       name:'',
//       price:0,
//       description:'',
//       imageUrl:''
//     }

//   constructor(private productService: ProductService) {}

//   addProduct():void
//   {
//      this.productService.addProduct(this.product).subscribe(
//       response => {
//         console.log('Product added successfullt:',response);

//         //Clear form fields after successful submission 

//          this.product = 
//          {
//            name:'',
//            price:0,
//            description:'',
//            imageUrl:''
//          };
//       },

//       error => {

//         console.error('Error adding product:',error));
//       }
//      );
//   }

// }