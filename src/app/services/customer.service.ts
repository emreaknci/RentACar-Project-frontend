import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';
import ListReponseModel from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  apiUrl = 'https://localhost:44342/api/customers/getall';
  constructor(private httpClient: HttpClient) { }

  getCustomers(): Observable<ListReponseModel<Customer>>{
    return this.httpClient.get<ListReponseModel<Customer>>(this.apiUrl);
  }
}