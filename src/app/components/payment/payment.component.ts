import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartItem } from 'src/app/models/cartItem';
import { CreditCard } from 'src/app/models/creditCard';
import { CartService } from 'src/app/services/cart.service';
import { PaymentService } from 'src/app/services/payment.service';
import { RentalService } from 'src/app/services/rental.service';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { RentalAddModel } from 'src/app/models/rental-add';
import { CustomerService } from 'src/app/services/customer.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  constructor(
    private cartService: CartService,
    private paymentService: PaymentService,
    private rentalService: RentalService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private customerService: CustomerService,
    private localStorageService: LocalStorageService,
  ) {}
  paymentForm: FormGroup;
  imagePath: string = 'https://localhost:44342/';

  cartItems: CartItem[] = [];
  rentals: RentalAddModel[] = [];
  totalprice: any;
  isCardExist: boolean;
  cardNumber: string;

  ngOnInit(): void {
    this.getCustomerId();
    this.createPaymentForm();
    this.getCartItems();
    this.totalPrice();
  }

  createPaymentForm() {
    this.paymentForm = this.formBuilder.group({
      cvv: ['', Validators.required],
      expDate: ['', Validators.required],
      cardNumber: ['', Validators.required],
    });
  }
  getCartItems() {
    this.cartItems = this.cartService.list();
    return this.cartItems;
  }
  totalPrice() {
    this.totalprice = this.cartService.totalPrice();
    return this.totalprice;
  }
  getRentalsDetail(customerId:number) {
    for (let i = 0; i < this.getCartItems().length; i++) {
      this.rentals[i] = {
        carId: this.getCartItems()[i].carDetail.id,
        customerId: customerId,
        rentDate: this.getCartItems()[i].rentDate,
        returnDate: this.getCartItems()[i].returnDate,
      };
      console.log(this.rentals[i]);
    }
    return this.rentals;
  }
  rent(rentalModel: RentalAddModel) {
    if (rentalModel.rentDate != null && rentalModel.returnDate != null) {
      if (rentalModel.rentDate < rentalModel.returnDate) {
        this.rentalService.rent(rentalModel).subscribe((response) => {
          this.cartService.removeFromCart(rentalModel.carId);
          this.toastrService.success(response.message, 'Başarılı!');
          this.totalPrice();
        });
      } else {
        this.toastrService.error(
          'Dönüş Tarihi Kiralama Tarihinden önce olamaz.',
          'Hata!'
        );
      }
    } else {
      this.toastrService.error('Tarih alanları boş bırakılamaz.', 'Hata!');
    }
  }

  getCreditCardByCardNumber() {
    if (this.paymentForm.valid) {
      let formModel = Object.assign({}, this.paymentForm.value);

      if (formModel.cardNumber.length === 16) {
        this.paymentService
          .getByCardNumber(formModel.cardNumber)
          .subscribe((response) => {
            let item = response.data;
            if (item != null) {
              if (
                item.cvv == formModel.cvv &&
                item.expirationDate == formModel.expDate
              ) {
                this.rentals.forEach((p) => this.rent(p));
              } else {
                this.toastrService.error('Kart bulunamadı', 'Oops');
              }
            }
          });
      } else if (
        formModel.cardNumber == null ||
        formModel.cardNumber.length !== 16
      ) {
        this.toastrService.error('Kart numarası 16 haneli olmalı', 'Oops');
      }
    } else {
      this.toastrService.error('Lütfen formu tamamen doldurunuz!', 'Hata!');
    }
  }

  getCustomerId() {
    this.customerService
      .getCustomerInfo(this.localStorageService.decodeToken().email)
      .subscribe((response) => {
        this.getRentalsDetail(response.data.id);
      });
  }
}
