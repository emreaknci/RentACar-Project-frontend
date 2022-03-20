import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarDetail } from '../models/carDetail';
import ListReponseModel from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarDetailService {
  apiUrl = 'https://localhost:44342/api/';
  constructor(private httpClient: HttpClient) { }

  getCarDetail(id:number): Observable<ListReponseModel<CarDetail>>{
    let newPath=this.apiUrl+"cars/getcardetailbycarid?id="+id;
    return this.httpClient.get<ListReponseModel<CarDetail>>(newPath);
  }
}