import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Color } from '../models/color';
import ListReponseModel from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  apiUrl = 'https://localhost:44342/api/colors/getall';
  constructor(private httpClient: HttpClient) { }

  getColors(): Observable<ListReponseModel<Color>>{
    return this.httpClient.get<ListReponseModel<Color>>(this.apiUrl);
  }
}