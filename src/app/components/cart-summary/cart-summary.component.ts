import { Component, OnInit } from '@angular/core';
import { CarDetail } from 'src/app/models/carDetail';
import { CartItem } from 'src/app/models/cartItem';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.css'],
})
export class CartSummaryComponent implements OnInit {
  cartItems: CartItem[] = [];
  totalprice:any;


  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.getCart();
  }
  getCart() {
    this.cartItems = this.cartService.list();
    this.totalprice=this.cartService.totalPrice();
  }
  totalPrice(){
    return this.cartService.totalPrice();
  }
  removeFromCart(id:number){
    this.cartService.removeFromCart(id);
  }
}
