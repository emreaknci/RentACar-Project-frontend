import { Component, OnInit } from '@angular/core';
import { SelectOption } from 'src/app/models/selectOption';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-select-option',
  templateUrl: './car-select-option.component.html',
  styleUrls: ['./car-select-option.component.css'],
})
export class CarSelectOptionComponent implements OnInit {
  constructor(private carService: CarService) {}
  carSelectOptions: SelectOption[] = [
    { id: 1, name: 'Kiralanabilir Araçlar', router: '/home/cars/rentable' },
    { id: 2, name: 'Kiralanmış araçlar', router: '/home/cars/rented' },
  ];
  currentSelectOption: SelectOption | undefined;

  ngOnInit(): void {}

  setCurrentCarSelectOption(option: SelectOption) {
    this.currentSelectOption = option;
  }
  getCurrentCarSelectOptionClass(option: SelectOption) {
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

