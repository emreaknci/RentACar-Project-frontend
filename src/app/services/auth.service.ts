import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { LoginModel } from '../models/loginModel';
import { ResponseModel } from '../models/responseModel';
import SingleResponseModel from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';
import { UserAddModel } from '../models/userAddModel';
import { LocalStorageService } from './local-storage.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = 'https://localhost:44342/api/auth/';

  constructor(
    private httpClient: HttpClient,
    private localStorageService:LocalStorageService,
    private jwtHelper:JwtHelperService
  ) {}

  login(loginModel: LoginModel): Observable<SingleResponseModel<TokenModel>> {
    let newPath = this.apiUrl + 'login';
    return this.httpClient.post<SingleResponseModel<TokenModel>>(newPath,loginModel);
  }
  register(userModel: UserAddModel):Observable<SingleResponseModel<TokenModel>>{
  let newPath = this.apiUrl + 'register';
  return this.httpClient.post<SingleResponseModel<TokenModel>>(newPath,userModel);
  }
  
  registerForCustomer(userModel:UserAddModel,compnayName:string):Observable<ResponseModel>{
    let newPath = this.apiUrl + 'registerforcustomer?companyName='+compnayName;
    return this.httpClient.post<ResponseModel>(newPath,userModel);
  }
  isAuthenticated() {
    if (this.localStorageService.getToken()) {
      return true;
    }
    return false;
  }

  decodeToken(token:any){
    console.log("--------------------\n")
    console.log(this.jwtHelper.decodeToken(token));
  }
  getToken(){
    return this.localStorageService.getToken();
  }
}
