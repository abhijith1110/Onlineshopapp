import { Component,OnInit} from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { CartService } from 'src/app/service/cart.service';
import {Router} from '@angular/router';

 interface Product 
{
  product_id:number;
  product_name:string;
  product_price:number;
  product_desc:string;
  quantity:number;
  product_img:string;

}

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent {

  showProductList = true;
  productId!:number;
  constructor(private apiService:ApiService,private cartService: CartService,private router:Router) {}
  products:Product[] = [];

//   get productRows(): Product[]
// {
//   const rows:Product[] = [];
//   for(let i =0; i < this.products.length; i += 3)
//   {
//     rows.push(this.products.slice(i, i + 3));
//   }

//   return rows;
// }
  ngOnInit():void {
      this.fetchProducts();
}

//    addToCart(product):void {
//     this.cartService.addToCart(product);
//    }
// }

fetchProducts(): void {
  this.apiService.getProducts().subscribe(products => {
     this.products = products;
     console.log(products);
  });
}

 goToProductDetails(productId:number){
     this.router.navigate(['/product', productId]);
 }

 viewProductDetails(productId:number):void
 {
      this.showProductList = false;
      this.productId = productId;
      this.router.navigateByUrl(`/product/${productId}`);
      console.log(productId);
      console.log('Product is clicked!!!')
 }



 showRegistration = false;
  showLogin = false;

  toggleRegistration() 
  {
    this.showRegistration = !this.showRegistration;
  }

  toggleLogin()
  {
    this.showLogin = !this.showLogin;
    this.showRegistration = false; //To ensure registration is hidden when toggling Login.

  }

  // addToCart():void {
  //   if (this.productId! == null)
  //   {
  //     this.cartService.addToCart(parseInt(this.productId));
  //   }
  // }
}