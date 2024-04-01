import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NhanVienService } from '../../services/NhanVien/nhan-vien.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-them-nhan-vien',
  templateUrl: './them-nhan-vien.component.html',
  styleUrl: './them-nhan-vien.component.css'
})
export class ThemNhanVienComponent implements OnInit{

  themNhanVien:FormGroup = new FormGroup({
    idNhanVien:new FormControl('123'),
    tenNhanVien:new FormControl(''),
    soDienThoai:new FormControl(''),
    diaChi:new FormControl(''),
    cccd:new FormControl(''),
    ngaySinh:new FormControl(''),
    email:new FormControl(''),
    gioiTinh:new FormControl('Nam'),
    chucVu:new FormControl('Nhân viên'),
    ngayVaoLam:new FormControl(new Date()),
    anhNhanVien:new FormControl(''),
    tinhTrang:new FormControl('a'),
    ngayDangKy:new FormControl(new Date())
  })

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
