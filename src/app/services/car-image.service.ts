import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarImage } from '../models/carImage';
import ListReponseModel from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root',
})
export class CarImageService {
  apiUrl = 'https://localhost:44342/api/carImages/';

  constructor(private httpClient: HttpClient) {}
  getImagePath(imagePath:string){
    return this.apiUrl+imagePath
  }
  getImagesByCarId(id:number): Observable<ListReponseModel<CarImage>> {
    let newPath = this.apiUrl + 'getimagesbycarid?id='+id;
    return this.httpClient.get<ListReponseModel<CarImage>>(newPath);
  }
  add(carImage: CarImage): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'add';
    return this.httpClient.post<ResponseModel>(newPath, carImage);
  }}
