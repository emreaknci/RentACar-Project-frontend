import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxPaginationModule } from 'ngx-pagination';
import { JwtHelperService, JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarComponent } from './components/home/car/car.component';
import { BrandComponent } from './components/home/brand/brand.component';
import { ColorComponent } from './components/home/color/color.component';
import { CarDetailComponent } from './components/home/car-detail/car-detail.component';
import { NaviComponent } from './components/home/navi/navi.component';
import { RentalComponent } from './components/rental/rental.component';
import { FilterBrandPipe } from './pipes/filter-brand.pipe';
import { FilterColorPipe } from './pipes/filter-color.pipe';
import { FilterCarDescriptionPipe } from './pipes/filter-car-description.pipe';
import { RentalDetailComponent } from './components/admin/rental-detail/rental-detail.component';
import { ToastrModule } from 'ngx-toastr';
import { CartSummaryComponent } from './components/home/cart-summary/cart-summary.component';
import { CarSelectOptionComponent } from './components/home/car-select-option/car-select-option.component';
import { PaymentComponent } from './components/payment/payment.component';
import { CartDetailComponent } from './components/cart-detail/cart-detail.component';
import { BrandAddComponent } from './components/admin/brand-add/brand-add.component';
import { ColorAddComponent } from './components/admin/color-add/color-add.component';
import { BrandUpdateComponent } from './components/admin/brand-update/brand-update.component';
import { ColorUpdateComponent } from './components/admin/color-update/color-update.component';
import { CarAddComponent } from './components/admin/car-add/car-add.component';
import { CarUpdateComponent } from './components/admin/car-update/car-update.component';
import { LoginComponent } from './components/home/login/login.component';
import { RegisterComponent } from './components/home/register/register.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { HomeLayoutComponent } from './components/home/home-layout/home-layout.component';
import { CustomerLayoutComponent } from './components/customer/customer-layout/customer-layout.component';
import { AdminLayoutComponent } from './components/admin/admin-layout/admin-layout.component';
import { CustomerProfileComponent } from './components/customer/customer-profile/customer-profile.component';
import { SidebarComponent } from './components/customer/sidebar/sidebar.component';
import { CreditCardComponent } from './components/customer/credit-card/credit-card.component';
import { CreditCardAddComponent } from './components/customer/credit-card-add/credit-card-add.component';


export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    CarComponent,
    BrandComponent,
    ColorComponent,
    CarDetailComponent,
    NaviComponent,
    RentalComponent,
    FilterBrandPipe,
    FilterColorPipe,
    FilterCarDescriptionPipe,
    RentalDetailComponent,
    CartSummaryComponent,
    CarSelectOptionComponent,
    PaymentComponent,
    CartDetailComponent,
    BrandAddComponent,
    ColorAddComponent,
    BrandUpdateComponent,
    ColorUpdateComponent,
    CarAddComponent,
    CarUpdateComponent,
    LoginComponent,
    RegisterComponent,
    HomeLayoutComponent,
    CustomerLayoutComponent,
    AdminLayoutComponent,
    CustomerProfileComponent,
    SidebarComponent,
    CreditCardComponent,
    CreditCardAddComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      closeButton: true,
      progressBar: true,
      timeOut: 3000,
    }),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['http://localhost:4200/'],
      },
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
