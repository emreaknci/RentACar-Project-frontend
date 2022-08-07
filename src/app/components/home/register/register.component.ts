import { Component, OnInit } from '@angular/core';
import { UserAddModel } from 'src/app/models/userAddModel';
import { AuthService } from 'src/app/services/auth.service';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from 'src/app/services/customer.service';
import { UserService } from 'src/app/services/user.service';
import { Customer } from 'src/app/models/customer';
import { User } from 'src/app/models/user';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastrService: ToastrService
  ) {}
  registerForm: FormGroup;
  customer: Customer;
  user: User;

  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      companyName: ['', Validators.required],
    });
  }

  registerForCustomer() {
    console.log(this.returnUserModel());
    console.log(this.returnCompanyName());
    this.authService.registerForCustomer(this.returnUserModel(),this.returnCompanyName()).subscribe(
      (response)=>{
        this.toastrService.success(response.message);   
      },
      (responseError)=>{
        if(responseError.error.Errors.length){
          for (let i = 0; i < responseError.error.Errors.length; i++) {
            this.toastrService.warning(responseError.error.Errors[i].ErrorMessage);          
          }
        }
      }

      );
  }

  returnUserModel() {
    let registerModel = Object.assign({}, this.registerForm.value);
    let userModel: UserAddModel = {
      firstName: registerModel.firstName,
      lastName: registerModel.lastName,
      email: registerModel.email,
      password: registerModel.password,
    };
    return userModel;
  }
  returnCompanyName(){
    return this.registerForm.value.companyName;
  }
}
