import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BrandService } from 'src/app/services/brand.service';
@Component({
  selector: 'app-brand-add',
  templateUrl: './brand-add.component.html',
  styleUrls: ['./brand-add.component.css'],
})
export class BrandAddComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private brandService: BrandService,
    private toastrService: ToastrService
  ) {}
  brandAddForm: FormGroup;

  ngOnInit(): void {
    this.createBrandAddForm();
  }

  createBrandAddForm() {
    this.brandAddForm = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }

  add() {
    if (this.brandAddForm.valid) {
      let brandModel = Object.assign({}, this.brandAddForm.value);
      this.brandService.add(brandModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı!');
        },
        (responseError) => {
          if (responseError.error.Errors) {
            if (responseError.error.Errors.length > 0) {
              responseError.error.Errors.forEach((p: any) => {
                this.toastrService.error(p.ErrorMessage, 'Doğrulama Hatası!');
              });
            }
          } else {
            this.toastrService.error(
              responseError.error.message,
              'Doğrulama Hatası!'
            );
          }
        }
      );
    } else {
      this.toastrService.error('Formu tamamen doldurmalısınız.', 'Hata!');
    }
  }
}
