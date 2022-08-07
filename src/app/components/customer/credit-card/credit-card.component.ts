import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CreditCard } from 'src/app/models/creditCard';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.css']
})
export class CreditCardComponent implements OnInit {

  constructor(
    private paymentService:PaymentService,
   private localStorageService:LocalStorageService,
   private toastrService:ToastrService
   ) { }

  creditCards:CreditCard[]=[];

  ngOnInit(): void {
    this.getCreditCardsByCustomer();
    console.log(this.localStorageService.decodeToken())
  }

  getCreditCardsByCustomer(){
    this.paymentService.getCreditCardsByCustomerMail(this.localStorageService.decodeToken().email).subscribe((response)=>{
      this.creditCards=response.data;
      console.log(this.creditCards)
    })
  }
  deleteCreditCard(creditCard:CreditCard){
    this.paymentService.deleteCreditCard(creditCard).subscribe((response)=>{
      this.toastrService.success(response.message,"Başarılı!");
      this.ngOnInit();
    })
    console.log("kart id:" ,creditCard);
  }
}
