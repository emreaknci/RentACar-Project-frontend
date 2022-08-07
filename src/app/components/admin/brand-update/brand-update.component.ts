import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-update',
  templateUrl: './brand-update.component.html',
  styleUrls: ['./brand-update.component.css'],
})
export class BrandUpdateComponent implements OnInit {
  constructor(
    private brandService: BrandService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService
  ) {}

  brand: Brand = { id: 0, name: '' };
  brandUpdateForm: FormGroup;
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.getBrandById(params['id']);
      }
      this.createBrandUpdateForm();
    });
  }

  createBrandUpdateForm() {
    this.brandUpdateForm = this.formBuilder.group({
      id: [this.brand.id, Validators.required],
      name: [this.brand.name, Validators.required],
    });
  }
  getBrandById(id: number) {
    this.brandService.getById(id).subscribe((response) => {
      this.brand = response.data;
      this.createBrandUpdateForm();
    });
  }

  update() {
    let brandModel = Object.assign({}, this.brandUpdateForm.value);
    console.log('model', brandModel);

    if (this.brandUpdateForm.valid) {
      let brandModel = Object.assign({}, this.brandUpdateForm.value);
      this.brandService.update(brandModel).subscribe(
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
  delete() {
    this.brandService.delete(this.brand).subscribe(
      (response) => {
        this.toastrService.success(response.message, 'Başarılı!');
      },
      (responseError) => {
        if (responseError.error.Errors.length > 0) {
          responseError.error.Errors.forEach((p: any) => {});
        }
      }
    );
  }
}
