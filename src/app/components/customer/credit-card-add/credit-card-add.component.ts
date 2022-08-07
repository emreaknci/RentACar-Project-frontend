import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { PaymentService } from 'src/app/services/payment.service';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-credit-card-add',
  templateUrl: './credit-card-add.component.html',
  styleUrls: ['./credit-card-add.component.css'],
})
export class CreditCardAddComponent implements OnInit {
  constructor(
    private customerService: CustomerService,
    private localStorageService: LocalStorageService,
    private paymentService: PaymentService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService
  ) {}

  currentCustomerId: number = 0;
  creditCardAddForm: FormGroup;

  ngOnInit(): void {
    this.getCustomerId();
    this.createCreditCardAddForm();
  }

  createCreditCardAddForm() {
    this.creditCardAddForm = this.formBuilder.group({
      cardNumber: ['', Validators.required],
      cvv: ['', Validators.required],
      expirationDate: ['', Validators.required],
    });
  }
  getCustomerId() {
    this.customerService
      .getCustomerInfo(this.localStorageService.decodeToken().email)
      .subscribe((response) => {
        this.currentCustomerId = response.data.id;
        // console.log('cust id: ', this.currentCustomerId);
      });
  }

  addCreditCard() {
    if (this.creditCardAddForm.valid) {
      let formModel = Object.assign({}, this.creditCardAddForm.value);
          let creditCardModel={
        customerId:this.currentCustomerId,
        cardNumber:formModel.cardNumber,
        cvv:formModel.cvv,
        expirationDate:formModel.expirationDate
      }
      this.paymentService.addCreditCard(creditCardModel).subscribe((response)=>{
        this.toastrService.success("Kart başarıyla eklendi!");
      },(responseError)=>{
        console.log(responseError);
        for (let i = 0; i < responseError.error.Errors.length; i++) {
          this.toastrService.warning(responseError.error.Errors[i].ErrorMessage);          
        }
      })
    } else {
      let formModel = Object.assign({}, this.creditCardAddForm.value);
      console.log(formModel);
      this.toastrService.error(
        'Tüm alanları doldurduğunuzdan emin olun.',
        'Hata!'
      );
    }
  }
}
