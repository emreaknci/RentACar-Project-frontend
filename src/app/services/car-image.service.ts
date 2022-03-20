import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarImage } from '../models/carImage';
import ListReponseModel from '../models/listResponseModel';

@Injectable({
  providedIn: 'root',
})
export class CarImageService {
  apiUrl = 'https://localhost:44342/api/';

  constructor(private httpClient: HttpClient) {}
  getImagePath(imagePath:string){
    return this.apiUrl+imagePath
  }
  getImagesByCarId(id:number): Observable<ListReponseModel<CarImage>> {
    let newPath = this.apiUrl + 'carImages/getimagesbycarid?carId='+id;
    return this.httpClient.get<ListReponseModel<CarImage>>(newPath);
  }
}
