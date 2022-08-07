import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './components/admin/admin-layout/admin-layout.component';
import { BrandAddComponent } from './components/admin/brand-add/brand-add.component';
import { BrandUpdateComponent } from './components/admin/brand-update/brand-update.component';
import { CarAddComponent } from './components/admin/car-add/car-add.component';
import { CarDetailComponent } from './components/home/car-detail/car-detail.component';
import { CarUpdateComponent } from './components/admin/car-update/car-update.component';
import { CarComponent } from './components/home/car/car.component';
import { CartDetailComponent } from './components/cart-detail/cart-detail.component';
import { ColorAddComponent } from './components/admin/color-add/color-add.component';
import { ColorUpdateComponent } from './components/admin/color-update/color-update.component';
import { CustomerLayoutComponent } from './components/customer/customer-layout/customer-layout.component';
import { HomeLayoutComponent } from './components/home/home-layout/home-layout.component';
import { PaymentComponent } from './components/payment/payment.component';
import { LoginGuard } from './guards/login.guard';
import { CustomerProfileComponent } from './components/customer/customer-profile/customer-profile.component';
import { CreditCardComponent } from './components/customer/credit-card/credit-card.component';

const routes: Routes = [
  {path:"",redirectTo:"/home",pathMatch:"full"},
  {path:"home",component:HomeLayoutComponent,children:[
    {path:"",component:CarComponent},
    {path:"cars/all",component:CarComponent},
    {path:"cars/all?sortValue=:id",component:CarComponent},
    {path:"cars/rented",component:CarComponent},
    {path:"cars/rented?sortValue:id",component:CarComponent},
    {path:"cars/rentable",component:CarComponent},
    {path:"cars/rentable?sortValue:id",component:CarComponent},
    {path:"cars/brand/:brandId",component:CarComponent},
    {path:"cars/color/:colorId",component:CarComponent},
    {path:"cars/cardetail/:id",component:CarDetailComponent},
   ]
  },



  {path:"customer",component:CustomerLayoutComponent,canActivate:[LoginGuard],children:[
    {path:"editProfile",component:CustomerProfileComponent},
    {path:"creditCard",component:CreditCardComponent}
    ]
  },

  {path:"admin",component:AdminLayoutComponent,canActivate:[LoginGuard],children:[
    {path:"cars/add",component:CarAddComponent},
    {path:"brands/add",component:BrandAddComponent},
    {path:"colors/add",component:ColorAddComponent},
    {path:"cars/update/:id",component:CarUpdateComponent},
    {path:"brands/update/:id",component:BrandUpdateComponent},
    {path:"colors/update/:id",component:ColorUpdateComponent},
    ]
  },
 
{path:"cart/detail",component:CartDetailComponent},
{path:"payment",component:PaymentComponent,canActivate:[LoginGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
