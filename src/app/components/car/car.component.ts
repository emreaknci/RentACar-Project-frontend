import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarDetail } from 'src/app/models/carDetail';
import { CarDetailService } from 'src/app/services/car-detail.service';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  cars: CarDetail[] = [];
  imagePath: string = 'https://localhost:44342/';
  dataLoaded = false;
  currentCar: CarDetail | undefined;

  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.getCarDetailByCar(params['id']);
      } else if (params['brandId']) {
        this.getCarsByBrand(params['brandId']);
      } else if (params['colorId']) {
        this.getCarsByColor(params['colorId']);
      } else this.getCars();
    });
  }

  getCars() {
    this.carService.getCars().subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }
  getCarsByBrand(id: number) {
    this.carService.getCarByBrand(id).subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }
  getCarsByColor(id: number) {
    this.carService.getCarByColor(id).subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }

  getCarDetailByCar(id: number) {
    this.carService.getCarDetailByCar(id).subscribe((response) => {
      this.cars = response.data;
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
}
