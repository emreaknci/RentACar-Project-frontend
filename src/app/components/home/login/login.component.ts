import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LoginModel } from 'src/app/models/loginModel';
import { AuthService } from 'src/app/services/auth.service';
import { CustomerService } from 'src/app/services/customer.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastrService: ToastrService,
    private localStorageService:LocalStorageService,
  ) {}

  loginForm: FormGroup;

  ngOnInit(): void {
    this.createLoginForm();
    this.localStorageService.deleteToken();
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    let loginModel: LoginModel = Object.assign({}, this.loginForm.value);
    console.log(loginModel);
    this.authService.login(loginModel).subscribe(
      (response) => {
        this.toastrService.success(response.message);
        this.localStorageService.saveTokenInLocalStorage(response.data);
        location.reload();
        console.log(response);
      },
      (responseError) => {
        this.toastrService.warning(responseError.error.message, 'Başarılı!');
        console.log(responseError.error.message);
      }
    );
  }

  
}
