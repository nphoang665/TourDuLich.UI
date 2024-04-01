import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { KhachhangService } from '../../services/KhachHang/khachhang.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormsModule, ValidatorFn, } from '@angular/forms';
import { ReactiveFormsModule,  Validator, AbstractControl } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
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
    
    ]),
    diaChi: new FormControl('',[
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(50), 
      
    ]),
    cccd: new FormControl('',[
      Validators.required,
      Validators.minLength(0),
      Validators.maxLength(16), 
    
    ]),
    ngaySinh: new FormControl(new Date(),
    Validators.required),
    gioiTinh: new FormControl('',
    Validators.required),
    email: new FormControl('',
    Validators.required),
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
  get ngayDangKy(){
    return this.themKhachHang.get('ngayDangKy');

  }
  noSpecialCharValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const invalidChar = /^[^\d~`!@#$%\^&*()_+=\-\[\]\\';,/{}|\\":<>\?]*$/.test(control.value);
      return invalidChar ? null : { 'invalidChar': { value: control.value } };
    };
  }
  constructor(private quanlyKhachHangService:KhachhangService, private route:Router, private toastr: ToastrService){}
  
  ngOnInit(): void {
   
  }

  ThemKhachHang(){
    console.log(this.themKhachHang.value);

    this.quanlyKhachHangService.themKhachHang(this.themKhachHang.value)
    .subscribe({
      next:(response)=>{
        this.route.navigateByUrl('/quanLyKhachHang')
        this.toastr.success('Thêm khách hàng thành công', 'Thông báo', {
          timeOut: 1000,
        });
      }
    })
  }
}
