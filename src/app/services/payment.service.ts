import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreditCard } from '../models/creditCard';
import ListReponseModel from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import SingleResponseModel from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  apiUrl = 'https://localhost:44342/api/payments/';

  constructor(private httpClient:HttpClient) { }

  getByCardNumber(cardNumber:string):Observable<SingleResponseModel<CreditCard>>{
    let newPath = this.apiUrl + 'getbycardnumber?cardnumber=' + cardNumber;
    return this.httpClient.get<SingleResponseModel<CreditCard>>(newPath);
  }

  getCreditCardsByCustomerId(id:number):Observable<ListReponseModel<CreditCard>>{
    let newPath = this.apiUrl + 'getbycustomerid?id=' + id;
    return this.httpClient.get<ListReponseModel<CreditCard>>(newPath);
  }

  getCreditCardsByCustomerMail(email:string):Observable<ListReponseModel<CreditCard>>{
    let newPath = this.apiUrl + 'getbycustomermail?email=' + email;
    return this.httpClient.get<ListReponseModel<CreditCard>>(newPath);
  }
  deleteCreditCard(creditCard:CreditCard):Observable<ResponseModel>{
    let newPath = this.apiUrl + 'delete';
    return this.httpClient.post<ResponseModel>(newPath, creditCard);
  }
  addCreditCard(creditCard:any):Observable<ResponseModel>{
    let newPath = this.apiUrl + 'add';
    return this.httpClient.post<ResponseModel>(newPath, creditCard);
  }
}
