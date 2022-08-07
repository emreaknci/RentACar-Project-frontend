import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Color } from '../models/color';
import SingleResponseModel from '../models/singleResponseModel';
import ListReponseModel from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  apiUrl = 'https://localhost:44342/api/colors/';
  constructor(private httpClient: HttpClient) { }

  getColors(): Observable<ListReponseModel<Color>>{
    let newPath=this.apiUrl+"getall";
    return this.httpClient.get<ListReponseModel<Color>>(newPath);
  }
  
  add(color: Color):Observable<ResponseModel> {
    let newPath = this.apiUrl + 'add';
    return this.httpClient.post<ResponseModel>(newPath, color);
  }

  update(color: Color): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'update';
    return this.httpClient.post<ResponseModel>(newPath,color);
  }
  delete(color: Color): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'delete';
    return this.httpClient.post<ResponseModel>(newPath,color);
  }
  getById(id: number): Observable<SingleResponseModel<Color>> {
    let newPath = this.apiUrl + 'getbyid?id=' + id;
    return this.httpClient.get<SingleResponseModel<Color>>(newPath);
  }
}