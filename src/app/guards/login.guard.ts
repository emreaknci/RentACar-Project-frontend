import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(
    private authService:AuthService,
    private toastrService:ToastrService,
    private router:Router,
    ){}

  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token=this.authService.getToken();
    if(this.authService.isAuthenticated()){
      return true;
    }
    else{
      this.router.navigate([""]);
      this.toastrService.info("Bu işlemi yapmak için giriş yapmalısınız!");
      setInterval(function(){window.location.reload()},3000)
      return false;
    }
  }
  
}
