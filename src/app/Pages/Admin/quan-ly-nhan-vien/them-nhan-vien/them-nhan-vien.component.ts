import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { NhanVienService } from '../../services/NhanVien/nhan-vien.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
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
  selector: 'app-them-nhan-vien',
  templateUrl: './them-nhan-vien.component.html',
  styleUrl: './them-nhan-vien.component.css'
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
    ngaySinh:new FormControl('',
    Validators.required),
    email:new FormControl('',[
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(50), 
    ]),
    gioiTinh:new FormControl('',
    Validators.required),
    chucVu:new FormControl('Nhân viên'),
    ngayVaoLam:new FormControl(new Date()),
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
    console.log(this.themNhanVien.value);
    
    this.quanLyNhanVienService.themNhanVien(this.themNhanVien.value)
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
