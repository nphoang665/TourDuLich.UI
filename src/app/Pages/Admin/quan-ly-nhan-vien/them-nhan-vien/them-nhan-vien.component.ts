import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { NhanVienService } from '../../services/NhanVien/nhan-vien.service';
import { Router } from '@angular/router';
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
  selector: 'app-them-nhan-vien',
  templateUrl: './them-nhan-vien.component.html',
  styleUrl: './them-nhan-vien.component.css',
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class ThemNhanVienComponent implements OnInit{
  matcher = new MyErrorStateMatcher();
  themNhanVien:FormGroup = new FormGroup({
    idNhanVien:new FormControl('123'),
    tenNhanVien:new FormControl('',[
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(50),
      this.noSpecialCharValidator(),
    ]),
    soDienThoai:new FormControl('',[
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10), 
    ]),
    diaChi:new FormControl('',[
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(50), 
    ]),
    cccd:new FormControl('',[
      Validators.required,
      Validators.minLength(0),
      Validators.maxLength(12), 
    ]),
    ngaySinh:new FormControl(moment(new Date('01/01/2000')),
    Validators.required),
    email:new FormControl('',[
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(50), 
    ]),
    gioiTinh:new FormControl('',
    Validators.required),
    chucVu:new FormControl('Nhân viên'),
    ngayVaoLam:new FormControl(moment(), Validators.required),
    anhNhanVien:new FormControl(''),
    tinhTrang:new FormControl('a'),
    ngayDangKy:new FormControl(new Date())
  })
  get tenNhanVien(){
    return this.themNhanVien.get('tenNhanVien');
  }
  get soDienThoai(){
    return this.themNhanVien.get('soDienThoai');
  }
  get cccd(){
    return this.themNhanVien.get('cccd');
  }
  get diaChi(){
    return this.themNhanVien.get('diaChi');
  }
  get ngaySinh(){
    return this.themNhanVien.get('ngaySinh');
  }
  get ngayVaoLam(){
    return this.themNhanVien.get('ngayVaoLam');
  }
  get email(){
    return this.themNhanVien.get('email');
  }
  get gioiTinh(){
    return this.themNhanVien.get('gioiTinh');
  }
  noSpecialCharValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const invalidChar = /^[^\d~`!@#$%\^&*()_+=\-\[\]\\';,/{}|\\":<>\?]*$/.test(control.value);
      return invalidChar ? null : { 'invalidChar': { value: control.value } };
    };
  }
  constructor (
    private quanLyNhanVienService:NhanVienService,
    private router:Router,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<ThemNhanVienComponent>,
    ){

  }
  ClosePopup() {
    this.ref.close();
  }

  ngOnInit(): void {
  }

  ThemNhanVien(){
    let ngaySinhValue = moment(this.themNhanVien.value.ngaySinh).format('YYYY-MM-DD');
    let ngayVaoLamValue = moment(this.themNhanVien.value.ngayVaoLam).format('YYYY-MM-DD');
    const themNhanVienData = {
      ...this.themNhanVien.value,
      ngaySinh:ngaySinhValue,
      ngayVaoLam:ngayVaoLamValue
    }
    
    this.quanLyNhanVienService.themNhanVien(themNhanVienData)
    .subscribe({
      next:(response)=>{
        this.ClosePopup();
        this.toastr.success('Thêm nhân viên thành công', 'Thông báo', {
          timeOut: 1000,
        });
      },
      error: (error) => {
        console.error('Lỗi khi thêm nhân viên:', error);
        this.toastr.error('Đã có lỗi xảy ra', 'Thông báo', {
          timeOut: 1000,
        });
      },
    })
  }
  
  

}
