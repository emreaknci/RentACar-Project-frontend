import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import ListReponseModel from '../models/listResponseModel';
import { Rental } from '../models/rental';
import { RentalDetail } from '../models/rentalDetail';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root',
})
export class RentalDetailService {
  apiUrl = 'https://localhost:44342/api/rentals/';
  constructor(private httpClient: HttpClient) { }

  getRentalDetails(): Observable<ListReponseModel<RentalDetail>>{
    let newPath=this.apiUrl+"getrentaldetails";
    return this.httpClient.get<ListReponseModel<RentalDetail>>(newPath);
  }
}
