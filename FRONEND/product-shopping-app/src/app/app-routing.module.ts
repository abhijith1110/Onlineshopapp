import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
// import {LoggedInGuard} from './auth/logged-in.guard';
// import { ProductsComponent } from './components/products/products.component';
// import { CartComponent } from './components/cart/cart.component';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';

const routes: Routes = [
 
//  {path:'products', component:ProductsComponent},
 {path:'login', component:LoginComponent},
 {path:'products',component:ProductsListComponent},
 {path:'product/:id', component:ProductDetailsComponent},
 {path:'register',component:RegisterComponent},
 {path:'home',component:HomeComponent},
 {path:'cart',component:CartComponent}

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
