import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CarDetail } from '../models/carDetail';
import { CartItem } from '../models/cartItem';
import { CartItems } from '../models/cartItems';
import { CarService } from './car.service';
import { RentalService } from './rental.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(
    private toastrService: ToastrService,
    private rentalService: RentalService
  ) {}

  addToCart(cartItem: CartItem) {
    let item = CartItems.find((c) => c.carDetail.id === cartItem.carDetail.id);

    if (!item) {
      let newCartItem = new CartItem();
      newCartItem.carDetail = cartItem.carDetail;
      newCartItem.rentDate = cartItem.rentDate;
      newCartItem.returnDate = cartItem.returnDate;
      newCartItem.leaseTerm = cartItem.leaseTerm;
      newCartItem.leaseCost =cartItem.leaseCost;

      CartItems.push(cartItem);
      return true;
    }

    return false;
  }

  list(): CartItem[] {
    return CartItems;
  }
  totalPrice() {
    let totalPrice = 0;
    this.list().forEach(
      (p) => (totalPrice += p.carDetail.dailyPrice * p.leaseTerm)
    );
    return totalPrice;
  }
  removeFromCart(id: number) {
    let item = CartItems.find((c) => c.carDetail.id === id);
    CartItems.splice(CartItems.indexOf(item), 1);
  }
  isCarExistsInCart(carDetail: CarDetail) {
    let item = CartItems.find((c) => c.carDetail.id === carDetail.id);
    if (item) {
      return true;
    } else {
      return false;
    }
  }
}
