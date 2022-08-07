import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-add',
  templateUrl: './color-add.component.html',
  styleUrls: ['./color-add.component.css'],
})
export class ColorAddComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private colorService: ColorService,
    private toastrService: ToastrService
  ) {}

  colorAddForm: FormGroup;
  ngOnInit(): void {
    this.createColorAddForm();
  }

  createColorAddForm(){
    this.colorAddForm = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }

  add() {
    if (this.colorAddForm.valid) {
      let brandModel = Object.assign({}, this.colorAddForm.value);
      console.log(brandModel);
      this.colorService.add(brandModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı!');
        },
        (responseError) => {
          if (responseError.error.Errors.length > 0) {
            responseError.error.Errors.forEach((p: any) => {
              this.toastrService.error(p.ErrorMessage, 'Doğrulama Hatası!');
            });
          }
        }
      );
    } else {
      this.toastrService.error('Formu tamamen doldurmalısınız.', 'Hata!');
    }
  }
}
