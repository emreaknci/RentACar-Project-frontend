import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';
import { CustomerDetailModel } from '../models/customerDetailmodel';
import ListReponseModel from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import SingleResponseModel from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  apiUrl = 'https://localhost:44342/api/customers/';
  constructor(private httpClient: HttpClient) {}

  getCustomers(): Observable<ListReponseModel<Customer>> {
    let newPath = this.apiUrl + 'getall';
    return this.httpClient.get<ListReponseModel<Customer>>(newPath);
  }

  add(customerModel: Customer): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'add';
    return this.httpClient.post<ResponseModel>(newPath, customerModel);
  }

  getCustomerInfo(email:string):Observable<SingleResponseModel<CustomerDetailModel>>{
    let newPath=this.apiUrl+"getcustomerwithdetail?email="+email;
    return this.httpClient.get<SingleResponseModel<CustomerDetailModel>>(newPath);
  }
}
