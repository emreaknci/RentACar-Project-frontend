import { Component, OnInit } from '@angular/core';
import { CustomerDetailModel } from 'src/app/models/customerDetailmodel';
import { CustomerService } from 'src/app/services/customer.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css'],
})
export class NaviComponent implements OnInit {
  constructor(
    private localStorageService: LocalStorageService,
    private customerService: CustomerService
  ) {}

  isAuthenticated: boolean = false;
  customerValue: any;
  ngOnInit(): void {
    this.isAuthenticated = this.localStorageService.isAuthenticated();
    if (this.isAuthenticated) {
      this.getCustomerValue(); 
    }
  }

  getCustomerValue() {
    //console.log("jwt:",this.localStorageService.decodeToken());
    this.customerService
      .getCustomerInfo(this.localStorageService.decodeToken().email)
      .subscribe((response) => {
        this.customerValue=response.data;
        console.log('fafd: ', this.customerValue);
      });
  }

  logout(){
    this.localStorageService.logOut();
    location.reload();
  }
}
