import { Component, Input, OnInit } from '@angular/core';
import { cartItem } from 'cart-item.model';
import { CartService } from 'src/app/service/cart.service';
import { AuthService } from 'src/app/auth.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CheckoutService } from 'src/app/service/checkout.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  // @Input() cartItems: cartItem[] = [];
  
  cartItems: any[] = [];
  userId: number = 36;
  cartId: number = 10;
  quantity:number = 1;
  checkoutPayload: {userId:number;cartItems: any[]} =  {userId: 0, cartItems: []};
  constructor(private cartService: CartService,private authService: AuthService, private http:HttpClient, private checkoutService:CheckoutService,private router:Router) {}
//   get cartTotal(): number {
//     return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
//   }
    ngOnInit(): void 
    { 
      //  const userIdString = this.authService.getUserId();
      //  const userId = userIdString? parseInt(userIdString,10) : 0;
      //  this.cartService.getCartItems(userId).subscribe(items => {
      //   this.cartItems = items;
      //   console.log(this.cartItems);
      //  }, (error) =>
      //  {
      //   console.error('Error fetching cart items:',error);
      //   this.error = 'Failed to fetch cart items';
      //  })

      this.checkoutPayload = 
      {
        userId: Number(this.authService.getUserId()),
        cartItems: this.cartItems
      }

       this.fetchCartItems();
    }

     fetchCartItems(): void
     {
        
        // this.http.get<any[]>('http://localhost:3000/api/cart/${userId').subscribe((response)=> {
        //   this.cartItems = response;
        // },(error) => {
        //    console.error('Error fetching cart items',error);
        // })

        this.cartService.getCartItems().subscribe(
           cartItems => {
              this.cartItems = cartItems;

              this.cartItems.forEach(item => {
                item.quantity = 1;
              });
           },
           error => {
            console.error('Error fetching cart items:',error);
           }
        )
     }
  removeItem(userId:number,productId: number): void {
      // const url = `${this.cartService.baseUrl}/cart/${cartId}`;
      // console.log(`Deleting item from URL: ${url}`);

      if (!userId || !productId)
      {
        console.error('Invalid userId or productId');
        return;
      }
      console.log(`Removing item with productId:${productId}`);
    this.cartService.removeCartItem(userId,productId).subscribe(
      ()=> {
           console.log("Item removed successfully!!!");
           this.cartItems = this.cartItems.filter(item => item.productId !== productId);
      },
       error => {

        console.error('Error removing item from the cart:',error);
       }
    )

    console.log("Remove cart item executed successfully!!!!");
    console.log('Removing item with cartId:${cartId}');
    console.log('Current cartItems', this.cartItems.map(item => ({cart_id: item.cart_id,product_name:item.product_name, product_id: item.product_id })));
  }


  getTotalPrice():number 
  {
    return this.cartItems.reduce((total, item)=> total + (item.price * item.quantity));
  }

   updateQuantity(item:any, quantity:number) : void 

   {
     item.quantity = quantity;
   }
  checkout(): void {
    // Implement your checkout logic here
    alert('Checkout functionality coming soon!');

    const checkoutPayload = {

      userId:this.userId,
      cartItems:this.cartItems
    };




    // const 

    // this.cartService.checkout(this.userId,this.cartItems).subscribe(
    //   ()=> 
    //   {
    //     t
    //   }
    // )
  

  // addItem(product: any)
  // {
  //   const existingItem = this.cartItems.find(item => item.product_id === product.product_id);
  //   if(existingItem) {
  //     existingItem.quantity +=1;
  //     existingItem.product_price += product.product_price;
  //   }

  //   else 

  //   {
  //      this.cartItems.push({...product,quantity:1});
  //   }
  // }


//   cartItems: { imageFileName:String }[] = [

//   {
//     imageFileName:'blackcasio.jpg'
//   },
//   {
//     imageFileName:'casioMTPSeries.jpg'
//   },
//  {
//   imageFileName:'octago_series.jpg'
//  },
//  {
//    imageFileName:'Resinsolar.jpg'
//  },


//   this.checkoutService.checkout(this.userId, this.cartItems).subscribe({
//      next:() => {

//       console.log('Checkout successful', Response);
//      },

//      error:(error)=> {
//          console.error('Error during checkout',error);
//      }
  

// //   ]

//     });

//Call the API service to process checkout

this.checkoutService.checkout(this.checkoutPayload).subscribe(
  (data:any)=> {
    //Show a success message

    alert('Checkout successful!');
    //Reset the cart.

    this.resetCart();
  },
 (error)=> {
  console.error('Checkout error:',error);
  alert('An error occured during checkout. Please try again later');
 }
);
  }

  private resetCart():void 
  {
    this.cartItems = [];
  }
}