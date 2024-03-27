import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
// import { HeaderComponent } from './components/header/header.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
// import { ProductsComponent } from './components/products/products.component';
// import { CartComponent } from './components/cart/cart.component';
import { CartService } from './service/cart.service';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { PurchaseComponent } from './components/purchase/purchase.component';
import { PurchaseHistoryComponent } from './components/purchase-history/purchase-history.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { CommonModule } from '@angular/common';
import { CartComponent } from './components/cart/cart.component';
// import { AddProductComponent } from './seller/add-product/add-product.component';
import { SellerGuardService } from './service/seller-guard.service';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { CategoriesComponent } from './components/categories/categories.component';
import { RouterModule } from '@angular/router';

 @NgModule({
  declarations: [
    AppComponent,
    ProductDetailsComponent,
    ProductsListComponent,
    RegisterComponent,
    LoginComponent,
    PurchaseComponent,
    PurchaseHistoryComponent,
    HeaderComponent,
    HomeComponent,
    CartComponent,
    CategoriesComponent,
  
    
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatCheckboxModule,
    CommonModule,
    CarouselModule,
    RouterModule
    
  ],
  providers: [CartService,SellerGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
