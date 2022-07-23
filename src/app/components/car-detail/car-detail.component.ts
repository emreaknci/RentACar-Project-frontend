import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { CarDetail } from 'src/app/models/carDetail';
import { CarImage } from 'src/app/models/carImage';
import { CartItem } from 'src/app/models/cartItem';
import { Rental } from 'src/app/models/rental';
import { RentalAddModel } from 'src/app/models/rental-add';
import { CarDetailService } from 'src/app/services/car-detail.service';
import { CarImageService } from 'src/app/services/car-image.service';
import { CartService } from 'src/app/services/cart.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css'],
})
export class CarDetailComponent implements OnInit {
  currentCars: CarDetail[] = [];
  carImages: CarImage[] = [];
  imagePath: string = 'https://localhost:44342/';
  dataLoaded = false;
  isrentable = false;
  rentDate: any;
  returnDate: any;
  rentedCarDetail: Rental;

  constructor(
    private carImageService: CarImageService,
    private carDetailService: CarDetailService,
    private activatedRoute: ActivatedRoute,
    private cartService: CartService,
    private toastrService: ToastrService,
    private rentalService: RentalService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.getCarDetail(params['id']);
        this.getImagesByCarId(params['id']);
        this.isRentable(params['id']);
      }
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
    });
  }


  addToCart(carDetail: CarDetail) {
    let dateDiff =
      new Date(this.returnDate).getTime() - new Date(this.rentDate).getTime();
      dateDiff=dateDiff/(1000*3600*24);

    if (this.rentDate != null && this.returnDate != null) {
      if (this.rentDate < this.returnDate) {
        if (this.cartService.isCarExistsInCart(carDetail)) {
          this.toastrService.error(
            carDetail.carDescription,
            'Sepette zaten var'
          );
        } else {
          let cartModel= new CartItem();
          cartModel.carDetail=carDetail;
          console.log(cartModel.carDetail.id)
          cartModel.rentDate=this.rentDate;
          cartModel.returnDate=this.returnDate;
          cartModel.leaseTerm=dateDiff;
          cartModel.leaseCost=dateDiff*carDetail.dailyPrice
          this.toastrService.success(
            carDetail.carDescription,
            'Sepete eklendi'
          );
          this.cartService.addToCart(cartModel);
        }
      } else {
        this.toastrService.error(
          'Dönüş Tarihi Kiralama Tarihinden önce olamaz.',
          'Hata!'
        );
      }
    } else {
      this.toastrService.error('Tarih alanları boş bırakılamaz.', 'Hata!');
    }
  }

  isRentable(id: number) {
    this.rentalService.isRentable(id).subscribe(
      (response) => {
        this.isrentable = true;
        this.rentedCarDetail = response.data;
        console.log(this.rentedCarDetail);
      },
      (responseError) => {
        this.isrentable = false;
        console.log(responseError.message);
        this.rentedCarDetail = responseError.data;
        console.log(this.rentedCarDetail);
      }
    );
  }
}
