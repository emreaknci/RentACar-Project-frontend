import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDetail } from 'src/app/models/carDetail';
import { CarSelectOption } from 'src/app/models/carSelectOption';
import { CarService } from 'src/app/services/car.service';
import { CartService } from 'src/app/services/cart.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  carDetails: CarDetail[] = [];
  imagePath: string = 'https://localhost:44342/';
  dataLoaded = false;
  currentCar: CarDetail | undefined;
  filterText = '';
  carSelectOptions: CarSelectOption[] = [
    { id: 1, name: 'Tüm Kiralık Araçlar', router: '/cars' },
    { id: 2, name: 'Kiralanabilir Araçlar', router: '/cars/rentable' },
    { id: 3, name: 'Kiralanmış araçlar', router: '/cars/rented' },
  ];
  currentSelectOption: CarSelectOption | undefined;
  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private cartService: CartService,
    private toastrService: ToastrService,
    private rentalService:RentalService
  ) {}
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.getCarDetailByCar(params['id']);
      } else if (params['brandId']) {
        this.getCarsByBrand(params['brandId']);
      } else if (params['colorId']) {
        this.getCarsByColor(params['colorId']);
      } else if (params['colorId'] && params['brandId']) {
        this.getCarsByBrandIdAndColorId(params['brandId'], params['colorId']);
      } else if (params['rented']) {
        this.getRentedCarDetails();
      } else {
        if (this.activatedRoute.routeConfig.path === 'cars/rented') {
          this.getRentedCarDetails();
        }
        else if(this.activatedRoute.routeConfig.path === 'cars/rentable'){
          this.getRentableCarDetails();
        }
        else if(this.activatedRoute.routeConfig.path === 'cars' || this.activatedRoute.routeConfig.path === ''){
          this.getCars();
        }
      }
    });
  }

  getCars() {
    this.carService.getCars().subscribe((response) => {
      this.carDetails = response.data;
      this.dataLoaded = true;
    });
  }
  getRentedCarDetails() {
    this.carService.getRentedCarDetails().subscribe((response) => {
      this.carDetails = response.data;
      this.dataLoaded = true;
    });
  }
  getRentableCarDetails() {
    this.carService.getRentableCarDetails().subscribe((response) => {
      this.carDetails = response.data;
      this.dataLoaded = true;
    });
  }
  getCarsByBrand(id: number) {
    this.carService.getCarDetailsByBrandId(id).subscribe((response) => {
      this.carDetails = response.data;
      this.dataLoaded = true;
    });
  }
  getCarsByColor(id: number) {
    this.carService.getCarDetailsByColorId(id).subscribe((response) => {
      this.carDetails = response.data;
      this.dataLoaded = true;
    });
  }
  getCarsByBrandIdAndColorId(brandId: number, colorId: number) {
    this.carService
      .getCarsByBrandAndColorId(brandId, colorId)
      .subscribe((response) => {
        this.carDetails = response.data;
        this.dataLoaded = true;
      });
  }
  getCarDetailByCar(id: number) {
    this.carService.getCarDetailByCar(id).subscribe((response) => {
      this.carDetails = response.data;
      this.dataLoaded = true;
    });
  }

  setCurrentCar(car: CarDetail) {
    this.currentCar = car;
  }
  getCurrentCarClass(car: CarDetail) {
    if (car == this.currentCar) return 'table-active';
    else return '';
  }
  getAllCarClass() {
    if (!this.currentCar) return 'table-active';
    else return '';
  }
  setCurrentCarEmpty() {
    this.currentCar = undefined;
  }
  // addToCart(carDetail: CarDetail) {
  //   if (this.rentalService.isRentable(carDetail.id)) {
  //     if (this.cartService.isCarExistsInCart(carDetail)) {
  //       this.toastrService.error(carDetail.carDescription, 'Sepette zaten var');
  //     } else {
  //       this.toastrService.success(carDetail.carDescription, 'Sepete eklendi');
  //       this.cartService.addToCart(carDetail);
  //     }
  //   }
  //   else{
  //     this.toastrService.error(carDetail.carDescription, 'Bu araç kiralık');

  //   }
  // }
  setCurrentCarSelectOption(option: CarSelectOption) {
    this.currentSelectOption = option;
  }
  getCurrentCarSelectOptionClass(option: CarSelectOption) {
    if (option == this.currentSelectOption) return 'list-group-item active';
    else return 'list-group-item ';
  }
  getAllCarSelectOptionClass() {
    if (!this.currentSelectOption) return 'list-group-item active';
    else return 'list-group-item';
  }
  setCurrentCarSelectOptionEmpty() {
    this.currentSelectOption = undefined;
  }
}
