import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { CartService } from 'src/app/service/cart.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/auth.service';

import { filter, take } from 'rxjs';

interface Product {
product_img: any;
  product_id: number;
  product_name: string;
  product_price: number;
  product_desc: string;
  quantity: number;
}

interface User{
  user_id:number,
  user_name:string,
  email:string;
}
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {


  product: Product | null = null;
  userId: string | null = null;
  productId: string | null = null;
  quantity: number = 1;
  product_img: string = '';
  cartItems:any[] = [];
  constructor(private route: ActivatedRoute, private apiService: ApiService, private cartService: CartService,private authService: AuthService, private http: HttpClient,private router:Router) {
    //  this.productId = '';

    // this.authService.userId$.pipe(
    //   take(1),
    //   filter(userId=> !!userId)
    // ).subscribe(userId => {
    //   this
    // })
  }

  ngOnInit(): void {



// //     this.authService.userId$.pipe(take(1), filter(userId => !! userId)).subscribe(userId => {
// //        console.log('Recieved userId:',userId);
// //        if(typeof userId === 'string')
// //        {
// //         this.userId =   (userId as unknown) as string;
// //        }

// //        else 

// //        {
// //         console.error('User ID is not a string:',userId);
// // ;       }
       
//     })

    this.route.params.subscribe(params => {
      const productId = +params['id'];
      if (!isNaN(productId)) {
        this.productId = productId.toString();
        this.fetchProductDetails(productId);
      }
    });
  }

  fetchProductDetails(productId: number): void {

    console.log('Fetching product details for productId:', productId);
    this.apiService.getProductById(productId).subscribe(
      (product: Product) => {
        console.log('Product details fetched:', product);
        this.product = product;
      },
      (error) => {
        console.error('Error fetching product details:', error);
      }
    );
  }

  addToCart(productId: number, quantity:number): void {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const existingCartItem = this.cartItems.find((item:any) => item.product_id === productId)
    console.log('Add to Cart function clicked!');
    console.log('UserId:',userId);
    if (!token || !userId)
    {
     console.error('TokenId or userId missing in the local Storage');
     alert('Please login to implement the add to cart functionality.');
     return;
    }

    const headers = new HttpHeaders({
      Authorization:  `Bearer ${token}`
    });

    this.http.post<any>('http://localhost:3000/api/cart/add', {productId, quantity}, {headers}).subscribe((data)=>
    {
      console.log('Item added to cart:',data);
      this.router.navigate(['/cart']);
    },(error)=>{
      console.error('Error adding item to the cart:',error);
    })
  }
  

 
      //  console.log(this.userId);

      //  this.http.post<any>('/api/cart/add',{productId}).subscribe(
      //   (data) => {
      //     console.log('Item added to cart:', data);
      //   },
      //   (error)=>{
      //     console.error('Error adding item to cart:', error);
      //   }
      //  )
  }








