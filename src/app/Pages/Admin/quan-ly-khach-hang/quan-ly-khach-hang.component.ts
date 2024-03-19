import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { KhachHang } from '../models/khach-hang.model';
import { HttpClient } from '@angular/common/http';
import { KhachhangService } from '../services/KhachHang/khachhang.service';

@Component({
  selector: 'app-quan-ly-khach-hang',
  templateUrl: './quan-ly-khach-hang.component.html',
  styleUrl: './quan-ly-khach-hang.component.css'
})
export class QuanLyKhachHangComponent implements OnInit{

  khachHang$?:Observable<KhachHang[]>;

  constructor(private quanLyKhachHangService:KhachhangService){}

  ngOnInit(): void {
    this.khachHang$ = this.quanLyKhachHangService.getAllTourKhachHang();
  }

  XoaKhachHang(){
    
  }
}
