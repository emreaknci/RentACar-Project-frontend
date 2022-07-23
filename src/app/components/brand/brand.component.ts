import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css'],
})
export class BrandComponent implements OnInit {
  brands: Brand[] = [];
  currentBrand: Brand | undefined;
  dataLoaded = false;
  filterText = '';

  brandForm: FormGroup;
  brand:Brand
  constructor(private brandService: BrandService,private formBuilder:FormBuilder) {}

  ngOnInit(): void {
    this.brandForm  = this.formBuilder.group({
      brand:[null]
    });
    this.getBrands();
  }

  getBrands() {
    this.brandService
      .getBrands()
      .subscribe((response) => (this.brands = response.data));
    this.dataLoaded = true;
  }


  setCurrentBrand(brand: Brand) {
    this.currentBrand = brand;
  }


  getCurrentBrandClass(brand: Brand) {
    if (brand == this.currentBrand) return 'list-group-item active';
    else return 'list-group-item';
  }


  getAllBrandClass() {
    if (!this.currentBrand) return 'list-group-item active';
    else return 'list-group-item';
  }


  setCurrentBrandEmpty() {
    this.currentBrand = undefined;
  }
  getSelectedBrand(brandName:string){
    if (this.filterText==brandName) {
      return true
    }
    else{
      return false
    }
  }
  submit() {
    console.log("Form Submitted")
    this.currentBrand=this.brandForm.value
    console.log(this.brandForm.value)
  }
}
