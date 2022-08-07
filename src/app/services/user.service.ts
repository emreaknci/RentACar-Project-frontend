import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';
import SingleResponseModel from '../models/singleResponseModel';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = 'https://localhost:44342/api/users/';
  constructor(private httpClient: HttpClient) { }

  getByMail(mail:string):Observable<SingleResponseModel<User>>{
    let newPath=this.apiUrl+"getbymail?mail="+mail;
    return this.httpClient.get<SingleResponseModel<User>>(newPath);
  }
  
}
