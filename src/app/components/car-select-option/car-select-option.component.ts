import { Component, OnInit } from '@angular/core';
import { CarSelectOption } from 'src/app/models/carSelectOption';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-select-option',
  templateUrl: './car-select-option.component.html',
  styleUrls: ['./car-select-option.component.css'],
})
export class CarSelectOptionComponent implements OnInit {
  constructor(private carService: CarService) {}
  carSelectOptions: CarSelectOption[] = [
    { id: 1, name: 'Kiralanabilir Araçlar', router: '/cars/rentable' },
    { id: 2, name: 'Kiralanmış araçlar', router: '/cars/rented' },
  ];
  currentSelectOption: CarSelectOption | undefined;

  ngOnInit(): void {}

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

