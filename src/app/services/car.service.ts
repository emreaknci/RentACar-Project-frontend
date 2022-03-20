import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { CarDetail } from '../models/carDetail';
import ListReponseModel from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  apiUrl = 'https://localhost:44342/api/';
  constructor(private httpClient: HttpClient) { }

  getCars(): Observable<ListReponseModel<CarDetail>>{
    let newPath=this.apiUrl+"cars/getcardetails";
    return this.httpClient.get<ListReponseModel<CarDetail>>(newPath);
  }
  getCarByBrand(id:number):Observable<ListReponseModel<CarDetail>> {
    let newPath=this.apiUrl+"cars/getcardetailsbybrandid?id="+id;
    return this.httpClient.get<ListReponseModel<CarDetail>>(newPath);
  }
  getCarByColor(id:number):Observable<ListReponseModel<CarDetail>> {
    let newPath=this.apiUrl+"cars/getcardetailsbybrandid?id="+id;
    return this.httpClient.get<ListReponseModel<CarDetail>>(newPath);
  }
  getCarDetailByCar(id:number):Observable<ListReponseModel<CarDetail>> {
    let newPath=this.apiUrl+"cars/getcardetailbycarid?id="+id;
    return this.httpClient.get<ListReponseModel<CarDetail>>(newPath);
  }
}