import { Component, OnInit } from '@angular/core';
import { CarDetail } from 'src/app/models/carDetail';
import { CartItem } from 'src/app/models/cartItem';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-detail',
  templateUrl: './cart-detail.component.html',
  styleUrls: ['./cart-detail.component.css'],
})
export class CartDetailComponent implements OnInit {
  constructor(private cartService: CartService) {}
  imagePath: string = 'https://localhost:44342/';
  cartItems: CartItem[] = [];
  totalprice: any;
  ngOnInit(): void {
    this.getCartItems();
  }

  getCartItems() {
    this.cartItems = this.cartService.list();
    this.totalprice= this.totalPrice();
  }
  removeFromCart(carId:number){
    this.cartService.removeFromCart(carId);
  }
  totalPrice() {
    return this.cartService.totalPrice();
  }
}
