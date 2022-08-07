import { Component, OnInit } from '@angular/core';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarImage } from 'src/app/models/carImage';
@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css'],
})
export class CarAddComponent implements OnInit {
  constructor(
    private brandService: BrandService,
    private colorService: ColorService,
    private carService: CarService,
    private carImageService: CarImageService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService
  ) {}

  carAddForm: FormGroup;
  brands: Brand[];
  colors: Color[];
  ngOnInit(): void {
    this.createCarAddForm();
    this.getBrands();
    this.getColors();
  }

  createCarAddForm() {
    this.carAddForm = this.formBuilder.group({
      brandId: ['', Validators.required],
      colorId: ['', Validators.required],
      modelYear: ['', Validators.required],
      dailyPrice: ['', Validators.required],
      description: ['', Validators.required],
      // carImage: ['', Validators.required],
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

  add() {
    // if (this.carAddForm.valid) {
    //   let img=document.getElementById("imagepath") as HTMLInputElement | null;
    //   let carImageModel: any = {
    //     carId: 4004,
    //     imagePath: img.value,
    //     date: new Date().toJSON(),
    //   };
    //   console.log(carImageModel);
    //   this.carImageService.add(carImageModel).subscribe(
    //     (response) => {
    //       console.log(response);
    //     },
    //     (responseError) => {
    //       console.log(responseError);
    //       this.toastrService.error(responseError.error.message, 'Hata!');
    //     }
    //   );
    // } else {
    //   this.toastrService.error('Formu tamamen doldurmalısınız.', 'Hata!');
    // }

    if (this.carAddForm.valid) {
      let carModel = Object.assign({}, this.carAddForm.value);
      carModel.brandId = parseInt(carModel.brandId);
      carModel.colorId = parseInt(carModel.colorId);

      this.carService.add(carModel).subscribe(
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
}
