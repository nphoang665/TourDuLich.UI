import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { KhachHang, SuaKhachHang } from '../../models/khach-hang.model';
import { ActivatedRoute, Router } from '@angular/router';
import { KhachhangService } from '../../services/KhachHang/khachhang.service';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormsModule, ValidatorFn, } from '@angular/forms';
import { ReactiveFormsModule,  Validator, AbstractControl } from '@angular/forms';
import { DateAdapter, ErrorStateMatcher, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as _moment from 'moment';
import {default as _rollupMoment} from 'moment';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'DD-MM-YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};

@Component({
  selector: 'app-sua-khach-hang',
  templateUrl: './sua-khach-hang.component.html',
  styleUrl: './sua-khach-hang.component.css',
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class SuaKhachHangComponent implements OnInit {
  matcher = new MyErrorStateMatcher();
  suaKhachHangForm:FormGroup = new FormGroup({
    tenKhachHang: new FormControl(''),
    soDienThoai: new FormControl('',),
    diaChi: new FormControl(''),
    cccd: new FormControl(''),
    ngaySinh: new FormControl(moment()),
    gioiTinh: new FormControl(''),
    email: new FormControl(''),
    tinhTrang: new FormControl(''),
    ngayDangKy: new FormControl(new Date()),
  });
  get tenKhachHang(){
    return this.suaKhachHangForm.get('tenKhachHang');
  }
  get soDienThoai(){
    return this.suaKhachHangForm.get('soDienThoai');
  }
  get cccd(){
    return this.suaKhachHangForm.get('cccd');
  }
  get diaChi(){
    return this.suaKhachHangForm.get('diaChi');
  }
  get ngaySinh(){
    return this.suaKhachHangForm.get('ngaySinh');

  }
  get email(){
    return this.suaKhachHangForm.get('email');

  }
  get gioiTinh(){
    return this.suaKhachHangForm.get('gioiTinh');

  }
  get tinhTrang(){
    return this.suaKhachHangForm.get('tinhTrang');

  }
  noSpecialCharValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const invalidChar = /^[^\d~`!@#$%\^&*()_+=\-\[\]\\';,/{}|\\":<>\?]*$/.test(control.value);
      return invalidChar ? null : { 'invalidChar': { value: control.value } };
    };
  }
  model?:KhachHang;

  id?:string | null = null;
  inputdata: any;

  constructor(
    private quanLyKhachHangSerice:KhachhangService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<SuaKhachHangComponent>,
    ){}
  ngOnInit(): void {
    this.inputdata = this.data;
    this.id = this.data.idKhachHang;
    if (this.id) {
      this.quanLyKhachHangSerice.getKhachHangById(this.id).subscribe((data: KhachHang) => {
        if (data) {
          this.model = data;
          this.initalizeForm();
        } else {
          console.error('không tìm thấy dịch vụ', this.id);
        }
      });
    }
  }
  initalizeForm():void{
    this.suaKhachHangForm = new FormGroup({
      tenKhachHang: new FormControl(this.model?.tenKhachHang,[
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(50),
        this.noSpecialCharValidator(),
      ]),
      soDienThoai: new FormControl(this.model?.soDienThoai,[
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10), 
      ]),
      diaChi: new FormControl(this.model?.diaChi,[
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(50), 
      ]),
      cccd: new FormControl(this.model?.cccd,[
        Validators.required,
        Validators.minLength(0),
        Validators.maxLength(12), 
      ]),
      ngaySinh: new FormControl(this.model?.ngaySinh,
        Validators.required),
      gioiTinh: new FormControl(this.model?.gioiTinh,
        Validators.required),
      email: new FormControl(this.model?.email,[
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(50), 
      ]),
      tinhTrang: new FormControl(this.model?.tinhTrang),
      ngayDangKy: new FormControl(this.model?.ngayDangKy),
    })
  }
  ClosePopup() {
    this.ref.close();
  }

  SuaKhachHang(event: Event) {

    if (this.model && this.id) {
      let ngaySinhValue = moment(this.suaKhachHangForm.value.ngaySinh).format('YYYY-MM-DD');
      const suaKhachHang: SuaKhachHang = { ...this.suaKhachHangForm.value, ngaySinh: ngaySinhValue };
      this.quanLyKhachHangSerice.suaKhachHang(this.id, suaKhachHang).subscribe((response) => {
        this.toastr.success('Sửa khách hàng thành công', 'Thông báo', {
          timeOut: 1000,
        });
      })
      this.ref.close();
    }
  }
}
