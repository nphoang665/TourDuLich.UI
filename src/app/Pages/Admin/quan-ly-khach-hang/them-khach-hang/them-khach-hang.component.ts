import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { KhachhangService } from '../../services/KhachHang/khachhang.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-them-khach-hang',
  templateUrl: './them-khach-hang.component.html',
  styleUrl: './them-khach-hang.component.css'
})
export class ThemKhachHangComponent implements OnInit{
  themKhachHang:FormGroup = new FormGroup({
    idKhachHang: new FormControl('123'),
    tenKhachHang: new FormControl(''),
    soDienThoai: new FormControl(''),
    diaChi: new FormControl(''),
    cccd: new FormControl(''),
    ngaySinh: new FormControl(''),
    gioiTinh: new FormControl('Nam'),
    email: new FormControl(''),
    tinhTrang: new FormControl(''),
    ngayDangKy: new FormControl(new Date()),
  });

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
