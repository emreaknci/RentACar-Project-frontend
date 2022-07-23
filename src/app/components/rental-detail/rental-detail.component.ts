import { Component, OnInit } from '@angular/core';
import { RentalDetail } from 'src/app/models/rentalDetail';
import { RentalDetailService } from 'src/app/services/rental-detail.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rental-detail',
  templateUrl: './rental-detail.component.html',
  styleUrls: ['./rental-detail.component.css'],
})
export class RentalDetailComponent implements OnInit {
  rentals: RentalDetail[] = [];
  dataLoaded = false;

  constructor(private rentalDetailService: RentalDetailService) {}

  ngOnInit(): void {
    this.getRentalDetails();
  }

  getRentalDetails() {
    this.rentalDetailService
      .getRentalDetails()
      .subscribe((response) => (this.rentals = response.data));
    this.dataLoaded = true;
  }
}
