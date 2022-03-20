import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import ListReponseModel from '../models/listResponseModel';
import { Rental } from '../models/rental';

@Injectable({
  providedIn: 'root'
})
export class RentalService {
  apiUrl = 'https://localhost:44342/api/rentals/getall';
  constructor(private httpClient: HttpClient) { }

  getRentals(): Observable<ListReponseModel<Rental>>{
    return this.httpClient.get<ListReponseModel<Rental>>(this.apiUrl);
  }
}