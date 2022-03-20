import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Brand } from 'src/app/models/brand';
import { CarDetail } from 'src/app/models/carDetail';
import { CarImage } from 'src/app/models/carImage';
import { CarDetailService } from 'src/app/services/car-detail.service';
import { CarImageService } from 'src/app/services/car-image.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css'],
})
export class CarDetailComponent implements OnInit {
  currentCars: CarDetail[] = [];
  brands: Brand[] = [];
  carImages: CarImage[] = [];
  imagePath: string = 'https://localhost:44342/';
  dataLoaded = false;
  constructor(
    private carImageService: CarImageService,
    private carDetailService: CarDetailService,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.getCarDetail(params['id']);
      }
      this.getImagesByCarId(params['id']);

    });
  }

  getCarDetail(id: number) {
    this.carDetailService.getCarDetail(id).subscribe((response) => {
      this.currentCars = response.data;
      this.dataLoaded = true;
    });
  }

  getImagesByCarId(id: number) {
    this.carImageService.getImagesByCarId(id).subscribe((response) => {
      this.carImages = response.data;
      this.dataLoaded = true;
      console.log(this.carImageService.getImagesByCarId(id));
    });
  }
}
