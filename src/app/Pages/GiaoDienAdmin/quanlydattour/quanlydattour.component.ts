import { Component, OnInit } from '@angular/core';
import { QuanLyTourService } from '../services/quan-ly-tour.service';
import { TourDuLich } from '../models/tour-du-lich.model';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { KhachhangService } from '../services/KhachHang/khachhang.service';
import { KhachHang } from '../models/khach-hang.model';


@Component({
  selector: 'app-quanlydattour',
  templateUrl: './quanlydattour.component.html',
  styleUrl: './quanlydattour.component.css'
})
export class QuanlydattourComponent implements OnInit {
  TenKhachHang = new FormControl();
  constructor(private quanLyTourService: QuanLyTourService, private quanLyKhachHangServices: KhachhangService) {

  }
  // Tạo mới arr Khách hàng
  khachHang$?: Observable<KhachHang[]>;
  arrKhachHang: any[] = [];
  tourDuLich$?: Observable<TourDuLich[]>;
  //khai báo TourDuLich để html sử dụng hiển thị
  TourDuLich: any[] = [];
  ngOnInit(): void {
    this.tourDuLich$ = this.quanLyTourService.getAllTourDuLich();
    this.tourDuLich$.subscribe((data: TourDuLich[]) => {
      this.TourDuLich = data;
      console.log(this.TourDuLich);
      this.Fnc_TinhNgayDem();
    });
    //lấy khách hàng từ db
    this.khachHang$ = this.quanLyKhachHangServices.getAllTourKhachHang();
    this.khachHang$.subscribe((data: KhachHang[]) => {
      this.arrKhachHang = data;

    })

  }
  Fnc_TinhNgayDem() {

    // working


    // for (let index = 0; index < this.TourDuLich.length; index++) {
    //   let diffTime = this.TourDuLich[index].thoiGianBatDau.getTime()
    //     - this.TourDuLich[index].thoiGianKetThuc.getTime();
    //   console.log(diffTime);

    // }
  }


  //xử lý select khách hàng
  selectValueKhachHang(event: Event) {
    const input = event.target as HTMLInputElement;
    const khachhang = this.arrKhachHang.find(p => p.soDienThoai === input.value.split('-')[0] || p.email === input.value.split('-')[2]);


    if (khachhang) {
      console.log(khachhang);

      this.TenKhachHang.setValue(khachhang.tenKhachHang)
    }


  }
}
