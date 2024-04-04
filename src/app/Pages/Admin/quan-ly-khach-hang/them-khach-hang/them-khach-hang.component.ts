import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { KhachhangService } from '../../services/KhachHang/khachhang.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormsModule, ValidatorFn, } from '@angular/forms';
import { ReactiveFormsModule,  Validator, AbstractControl } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import {  ValidationErrors } from '@angular/forms';
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'app-them-khach-hang',
  templateUrl: './them-khach-hang.component.html',
  styleUrl: './them-khach-hang.component.css'
})
export class ThemKhachHangComponent implements OnInit{
  matcher = new MyErrorStateMatcher();
  themKhachHang:FormGroup = new FormGroup({
    idKhachHang: new FormControl('123'),
    tenKhachHang: new FormControl('',[
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(50),
      this.noSpecialCharValidator(),
    ]),
    soDienThoai: new FormControl('',[
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10), 
      // this.duplicatePhoneNumberValidator(),
    ]),
    diaChi: new FormControl('',[
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(50), 
      
    ]),
    cccd: new FormControl('',[
      Validators.required,
      Validators.minLength(0),
      Validators.maxLength(12), 
    
    ]),
    ngaySinh: new FormControl('',
    Validators.required),
    gioiTinh: new FormControl('',
    Validators.required),
    email: new FormControl('',[
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(50), 
      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'),
    ]),
    tinhTrang: new FormControl(''),
    ngayDangKy: new FormControl(new Date()),
  });
  get tenKhachHang(){
    return this.themKhachHang.get('tenKhachHang');
  }
  get soDienThoai(){
    return this.themKhachHang.get('soDienThoai');
  }
  get cccd(){
    return this.themKhachHang.get('cccd');
  }
  get diaChi(){
    return this.themKhachHang.get('diaChi');
  }
  get ngaySinh(){
    return this.themKhachHang.get('ngaySinh');

  }
  get email(){
    return this.themKhachHang.get('email');

  }
  get gioiTinh(){
    return this.themKhachHang.get('gioiTinh');

  }
  get tinhTrang(){
    return this.themKhachHang.get('tinhTrang');

  }
  noSpecialCharValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const invalidChar = /^[^\d~`!@#$%\^&*()_+=\-\[\]\\';,/{}|\\":<>\?]*$/.test(control.value);
      return invalidChar ? null : { 'invalidChar': { value: control.value } };
    };
  }

  duplicatePhoneNumberValidator(existingPhoneNumbers: string[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const soDienThoai = control.value;
  
      if (!soDienThoai) {
        return null; // Không có giá trị, không có lỗi
      }
  
      // Kiểm tra xem số điện thoại đã tồn tại trong danh sách số điện thoại khác hay chưa
      if (existingPhoneNumbers.includes(soDienThoai)) {
        return { duplicatePhoneNumber: true }; // Số điện thoại đã tồn tại
      }
  
      return null; // Số điện thoại hợp lệ
    };
  }
  constructor(
    private quanlyKhachHangService:KhachhangService, 
    private route:Router, 
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<ThemKhachHangComponent>,
    ){}

    ClosePopup() {
      this.ref.close();
    }

  ngOnInit(): void {
   
  }

  ThemKhachHang(){
    console.log(this.themKhachHang.value);


    this.quanlyKhachHangService.themKhachHang(this.themKhachHang.value)
    .subscribe({
      next:(response)=>{
        this.ClosePopup();
        this.toastr.success('Thêm khách hàng thành công', 'Thông báo', {
          timeOut: 1000,
        });
      },
      error: (error) => {
        console.error('Lỗi khi thêm khách hàng:', error);
        this.toastr.error('Đã có lỗi xảy ra', 'Thông báo', {
          timeOut: 1000,
        });
      },
    })
  }
}
