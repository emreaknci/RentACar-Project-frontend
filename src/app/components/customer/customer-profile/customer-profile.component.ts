import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CustomerDetailModel } from 'src/app/models/customerDetailmodel';
import { CustomerService } from 'src/app/services/customer.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.css'],
})
export class CustomerProfileComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private customerService: CustomerService,
    private localStorageService: LocalStorageService
  ) {}

  customerDetail:CustomerDetailModel ={id:undefined,firstName:"",lastName:"",companyName:"",creditCards:[],email:""};
  customerEditForm:FormGroup;

  ngOnInit(): void {
    this.createCustomerEditForm();

    this.getCustomerValue()
  }

  createCustomerEditForm() {
    this.customerEditForm = this.formBuilder.group({
      id: [this.customerDetail.id, Validators.required],
      firstName: [this.customerDetail.firstName, Validators.required],
      lastName: [this.customerDetail.lastName, Validators.required],
      email: [this.customerDetail.email, Validators.required],
      companyName: [this.customerDetail.companyName, Validators.required],

    });
  }
  getCustomerValue() {
    console.log("jwt:",this.localStorageService.decodeToken());
    this.customerService
      .getCustomerInfo(this.localStorageService.decodeToken().email)
      .subscribe((response) => {
        this.customerDetail=response.data;
        // console.log('fafd: ', this.customerDetail);
        this.createCustomerEditForm();
      });
  }
  update(){
    
  }
}
