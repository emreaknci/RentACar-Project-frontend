import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
import { Car } from 'src/app/models/car';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css'],
})
export class CarUpdateComponent implements OnInit {
  constructor(
    private brandService: BrandService,
    private colorService: ColorService,
    private carService: CarService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute
  ) {}

  carUpdateForm: FormGroup;
  brands: Brand[];
  colors: Color[];
  car: Car = {
    brandId: 0,
    colorId: 0,
    dailyPrice: new DecimalPipe('0'),
    description: '',
    id: 0,
    modelYear: 0,
  };
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.getCarById(params['id']);
      }
      this.createCarUpdateForm();
      this.getColors();
      this.getBrands();
    });
  }

  createCarUpdateForm() {
    this.carUpdateForm = this.formBuilder.group({
      id: [this.car.id, Validators.required],
      brandId: [this.car.brandId, Validators.required],
      colorId: [this.car.colorId, Validators.required],
      modelYear: [this.car.modelYear, Validators.required],
      dailyPrice: [this.car.dailyPrice, Validators.required],
      description: [this.car.description, Validators.required],
    });
  }
  getCarById(id: number) {
    this.carService.getById(id).subscribe((response) => {
      this.car = response.data;
      this.createCarUpdateForm();
    });
  }
  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
    });
  }

  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
    });
  }
  update() {
    // if (this.carUpdateForm.valid) {
    //   let carModel = Object.assign({}, this.carUpdateForm.value);
    //   this.carService.update(carModel).subscribe(
    //     (response) => {
    //       this.toastrService.success(response.message, 'Başarılı!');
    //     },
    //     (responseError) => {
    //       if (responseError.error.Errors) {
    //         if (responseError.error.Errors.length > 0) {
    //           responseError.error.Errors.forEach((p: any) => {
    //             this.toastrService.error(p.ErrorMessage, 'Doğrulama Hatası!');
    //           });
    //         }
    //       } else {
    //         this.toastrService.error(
    //           responseError.error.message,
    //           'Doğrulama Hatası!'
    //         );
    //       }
    //     }
    //   );
    // } else {
    //   this.toastrService.error('Formu tamamen doldurmalısınız.', 'Hata!');
    // }

    if (this.carUpdateForm.valid) {
      let carModel = Object.assign({}, this.carUpdateForm.value);
      carModel.brandId = parseInt(carModel.brandId);
      carModel.colorId = parseInt(carModel.colorId);

      this.carService.update(carModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı!');
        },
        (responseError) => {
          console.log(responseError.error);

          if (responseError.error.Errors) {
            if (responseError.error.Errors.length > 0) {
              responseError.error.Errors.forEach((p: any) => {
                this.toastrService.error(p.ErrorMessage, 'Hatası!');
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
    this.carService.delete(this.car).subscribe(
      (response) => {
        this.toastrService.success(response.message, 'Başarılı!');
      },
      (responseError) => {
        console.log(responseError.error);
        if (responseError.error.Errors.length > 0) {
          responseError.error.Errors.forEach((p: any) => {});
        }
      }
    );
  }

  
}
