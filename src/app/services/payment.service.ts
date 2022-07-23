import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreditCard } from '../models/creditCard';
import ItemResponseModel from '../models/itemResponseModel';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  apiUrl = 'https://localhost:44342/api/payments/';

  constructor(private httpClient:HttpClient) { }

  getByCardNumber(cardNumber:string):Observable<ItemResponseModel<CreditCard>>{
    let newPath = this.apiUrl + 'getbycardnumber?cardnumber=' + cardNumber;
    return this.httpClient.get<ItemResponseModel<CreditCard>>(newPath);
  }
}
