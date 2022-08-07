import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarDetail } from '../models/carDetail';
import ListReponseModel from '../models/listResponseModel';
import { Rental } from '../models/rental';
import { RentalAddModel } from '../models/rental-add';
import { ResponseModel } from '../models/responseModel';
import ResponseModel2 from '../models/singleResponseModel';
import SingleResponseModel from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class RentalService {
  apiUrl = 'https://localhost:44342/api/rentals/';
  constructor(private httpClient: HttpClient) {}

  getRentals(): Observable<ListReponseModel<Rental>> {
    let newPath = this.apiUrl + 'getall';
    return this.httpClient.get<ListReponseModel<Rental>>(newPath);
  }

  getRentalByCarId(id: number): Observable<ListReponseModel<Rental>> {
    let newPath = this.apiUrl + 'getrentalbycarid?id=' + id;
    return this.httpClient.get<ListReponseModel<Rental>>(newPath);
  }

  rent(rentalModel: RentalAddModel): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'add';
    return this.httpClient.post<ResponseModel>(newPath, rentalModel);
  }

  isRentable(id: number): Observable<SingleResponseModel<Rental>> {
    let newPath = this.apiUrl + 'isrentable?carId=' + id;
    return this.httpClient.get<SingleResponseModel<Rental>>(newPath);
  }
}
