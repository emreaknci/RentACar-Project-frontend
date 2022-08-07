import { Injectable } from '@angular/core';
import { TokenModel } from '../models/tokenModel';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor(private jwtHelper: JwtHelperService) {}

  saveTokenInLocalStorage(tokenModel: TokenModel) {
    localStorage.setItem('token', tokenModel.token);
    localStorage.setItem('expiration', tokenModel.expiration);
  }
  getToken() {
    return localStorage.getItem('token');
  }

  isAuthenticated() {
    if (!this.jwtHelper.isTokenExpired(this.getToken())) {
      return true;
    } else {
      return false;
    }
  }

  deleteToken() {
    //console.log('şimdi', now, '\ntoken', tokenExp);
    if (this.jwtHelper.isTokenExpired(this.getToken())) {
      //console.log('tokenin süresi dolmuş');
      localStorage.removeItem('token');
      localStorage.removeItem('expiration');
    }// else {
    //   console.log('tokenin süresi devam ediyor');
    // }
  }
  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
  }
  decodeToken() {
    var decodedToken = this.jwtHelper.decodeToken(this.getToken());
    return decodedToken;
  }
}
