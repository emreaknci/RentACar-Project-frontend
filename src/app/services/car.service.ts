import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { CarDetail } from '../models/carDetail';
import SingleResponseModel from '../models/singleResponseModel';
import ListReponseModel from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  apiUrl = 'https://localhost:44342/api/cars/';
  constructor(private httpClient: HttpClient) {}

  getCars(): Observable<ListReponseModel<CarDetail>> {
    let newPath = this.apiUrl + 'getcardetails';
    return this.httpClient.get<ListReponseModel<CarDetail>>(newPath);
  }
  getById(id: number): Observable<SingleResponseModel<Car>> {
    let newPath = this.apiUrl + 'getbyid?id=' + id;
    return this.httpClient.get<SingleResponseModel<Car>>(newPath);
  }
  getCarDetailsByBrandId(id: number): Observable<ListReponseModel<CarDetail>> {
    let newPath = this.apiUrl + 'getcardetailsbybrandid?id=' + id;
    return this.httpClient.get<ListReponseModel<CarDetail>>(newPath);
  }
  getCarDetailsByColorId(id: number): Observable<ListReponseModel<CarDetail>> {
    let newPath = this.apiUrl + 'getcardetailsbycolorid?id=' + id;
    return this.httpClient.get<ListReponseModel<CarDetail>>(newPath);
  }
  getCarDetailByCar(id: number): Observable<ListReponseModel<CarDetail>> {
    let newPath = this.apiUrl + 'getcardetailbycarid?id=' + id;
    return this.httpClient.get<ListReponseModel<CarDetail>>(newPath);
  }
  getCarsByBrandAndColorId(
    brandId: number,
    colorId: number
  ): Observable<ListReponseModel<CarDetail>> {
    let newPath =
      this.apiUrl +
      'getcarsbybrandidandcolorid?brandid=' +
      brandId +
      '&colorId=' +
      colorId;
    return this.httpClient.get<ListReponseModel<CarDetail>>(newPath);
  }
  getRentedCarDetails(): Observable<ListReponseModel<CarDetail>> {
    let newPath = this.apiUrl + 'getrentedcardetails';
    return this.httpClient.get<ListReponseModel<CarDetail>>(newPath);
  }
  getRentableCarDetails(): Observable<ListReponseModel<CarDetail>> {
    let newPath = this.apiUrl + 'getrentalablecardetails';
    return this.httpClient.get<ListReponseModel<CarDetail>>(newPath);
  }

  add(car: Car): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'add';
    return this.httpClient.post<ResponseModel>(newPath, car);
  }
  update(car: Car): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'update';
    return this.httpClient.post<ResponseModel>(newPath, car);
  }
  delete(car: Car): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'delete';
    return this.httpClient.post<ResponseModel>(newPath, car);
  }
}
