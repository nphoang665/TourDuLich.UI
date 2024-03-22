import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { KhachHang } from '../models/khach-hang.model';
import { HttpClient } from '@angular/common/http';
import { KhachhangService } from '../services/KhachHang/khachhang.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-quan-ly-khach-hang',
  templateUrl: './quan-ly-khach-hang.component.html',
  styleUrl: './quan-ly-khach-hang.component.css'
})
export class QuanLyKhachHangComponent implements OnInit{

  khachHang$?:Observable<KhachHang[]>;

  constructor(private quanLyKhachHangService:KhachhangService,private toastr: ToastrService){}

  ngOnInit(): void {
    this.khachHang$ = this.quanLyKhachHangService.getAllTourKhachHang();
  }

  XoaKhachHang(id:string){
    if(id){
      this.quanLyKhachHangService.xoaKhachHang(id)
      .subscribe({
        next:(response)=>{
          this.khachHang$ = this.quanLyKhachHangService.getAllTourKhachHang();
          this.toastr.success('Xóa nhân viên thành công', 'Thông báo', {
            timeOut: 1000,
          });
        }
      })
    }
  }
}
