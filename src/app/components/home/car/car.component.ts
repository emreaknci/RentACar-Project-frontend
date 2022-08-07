import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterModule,
} from '@angular/router';
import { CarDetail } from 'src/app/models/carDetail';
import { CarService } from 'src/app/services/car.service';

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
  sortSelectOptions: any[] = [
    { id: 1, name: 'Artan Fiyata Göre Sırala' },
    { id: 2, name: 'Azalan Fiyata Göre Sırala' },
    { id: 3, name: 'Son Eklenenler' },
  ];

  routePath: string | undefined;
  pageNumber: number = 1;
  carsLength: number = 0;

  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.routePath = this.activatedRoute.routeConfig.path;
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
        } else if (this.activatedRoute.routeConfig.path === 'cars/rentable') {
          this.getRentableCarDetails();
        } else if (
          this.activatedRoute.routeConfig.path === 'cars/all' ||
          this.activatedRoute.routeConfig.path === ''
        ) {
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
  pageChangeEvent(event: number) {
    this.pageNumber = event;
    // if (
    //   this.activatedRoute.routeConfig.path == '' ||
    //   this.activatedRoute.routeConfig.path == 'cars'
    // ) {
    //   this.getCars();
    // }
  }

  changeOption(event: any) {
    this.routePath = this.activatedRoute.routeConfig.path;
    let options=this.sortSelectOptions.filter(option=>option.id==event.value);
    if (event.value == 1) {
      this.sortCarsByAscendingPrice();
      this.routePath += '?sortType=' + options[0].name;
    } else if (event.value == 2) {
      this.sortCarsByDescendingPrice();
      this.routePath += '?sortType=' + options[0].name;
    } else if (event.value == 3) {
      this.sortCarsByAscendingDate();
      this.routePath += '?sortType=' + options[0].name;
    }
    this.router.navigateByUrl(this.routePath);
    console.log(this.carDetails.map((p) => p.dailyPrice));
  }
  sortCarsByDescendingPrice() {
    this.carDetails.sort((a, b) => {
      return b.dailyPrice - a.dailyPrice;
    });
  }
  sortCarsByAscendingPrice() {
    this.carDetails.sort((a, b) => {
      return a.dailyPrice - b.dailyPrice;
    });
  }
  sortCarsByAscendingDate() {
    this.carDetails.sort((a, b) => {
      return b.id - a.id;
    });
  }
}
