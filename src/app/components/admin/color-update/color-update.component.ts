import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';
@Component({
  selector: 'app-color-update',
  templateUrl: './color-update.component.html',
  styleUrls: ['./color-update.component.css'],
})
export class ColorUpdateComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private colorService: ColorService
  ) {}
  color: Color = { id: 0, name: '' };
  colorUpdateForm: FormGroup;
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.getColorById(params['id']);
      }
      this.createColorUpdateForm();
    });
  }

  createColorUpdateForm() {
    this.colorUpdateForm = this.formBuilder.group({
      id: [this.color.id, Validators.required],
      name: [this.color.name, Validators.required],
    });
  }
  getColorById(id: number) {
    this.colorService.getById(id).subscribe((response) => {
      this.color = response.data;
      this.createColorUpdateForm();
    });
  }

  update() {
    let brandModel = Object.assign({}, this.colorUpdateForm.value);
    console.log('model', brandModel);

    if (this.colorUpdateForm.valid) {
      let brandModel = Object.assign({}, this.colorUpdateForm.value);
      this.colorService.update(brandModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı!');
        },
        (responseError) => {
          if (responseError.error.Errors) {
            if (responseError.error.Errors.length > 0) {
              responseError.error.Errors.forEach((p: any) => {
                this.toastrService.error(p.ErrorMessage, 'Doğrulama Hatası!');
              });
            }
          } else {
            this.toastrService.error(
              responseError.error.message,
              'Doğrulama Hatası!'
            );
          }
        }
      );
    } else {
      this.toastrService.error('Formu tamamen doldurmalısınız.', 'Hata!');
    }
  }
  delete() {
    this.colorService.delete(this.color).subscribe(
      (response) => {
        this.toastrService.success(response.message, 'Başarılı!');
      },
      (responseError) => {
        if (responseError.error.Errors.length > 0) {
          responseError.error.Errors.forEach((p: any) => {});
        }
      }
    );
  }
}
