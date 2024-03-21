import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { KhachhangService } from '../../services/KhachHang/khachhang.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-them-khach-hang',
  templateUrl: './them-khach-hang.component.html',
  styleUrl: './them-khach-hang.component.css'
})
export class ThemKhachHangComponent {
  themKhachHang:FormGroup = new FormGroup({
    idKhachHang: new FormControl('123'),
    tenKhachHang: new FormControl(''),
    soDienThoai: new FormControl(''),
    diaChi: new FormControl(''),
    cccd: new FormControl(''),
    ngaySinh: new FormControl(new Date()),
    gioiTinh: new FormControl(''),
    email: new FormControl(''),
    tinhTrang: new FormControl(''),
    matKhau: new FormControl(''),
    ngayDangKy: new FormControl(new Date()),
  });

  constructor(private quanlyKhachHangService:KhachhangService, private route:Router, private toastr: ToastrService){}

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
