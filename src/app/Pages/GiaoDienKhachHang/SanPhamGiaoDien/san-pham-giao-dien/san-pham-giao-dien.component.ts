import { Component, OnInit } from '@angular/core';
import { TourDuLich } from '../../../Admin/models/tour-du-lich.model';
import { environment } from '../../../../../environments/environment';
import { QuanLyTourService } from '../../../Admin/services/quan-ly-tour.service';

@Component({
  selector: 'app-san-pham-giao-dien',
  templateUrl: './san-pham-giao-dien.component.html',
  styleUrl: './san-pham-giao-dien.component.css'
})
export class SanPhamGiaoDienComponent implements OnInit {
  constructor(private quanLyTourServices: QuanLyTourService) {

  }

  //khai báo mảng khởi đầu cho tour
  //biến { TourDuLich } dùng để lưu trữ tất cả tour du lịch
  TourDuLich: any[] = [];
  ngOnInit(): void {
    this.quanLyTourServices.getAllTourDuLich().subscribe((data: TourDuLich[]) => {
      this.TourDuLich = data;
      //Tính toán ngày đêm cho tour
      this.TourDuLich.forEach(element => {
        this.quanLyTourServices.getTourDuLichById(element.idTour).subscribe((data: TourDuLich) => {
          element.HinhAnhDauTien = environment.apiBaseUrl + '/uploads/' + data.anhTour[0].imgTour;
        })
        element.SoNgayDem = this.calculateDaysAndNights(element.thoiGianBatDau, element.thoiGianKetThuc);
      });
    })
  }
  //hàm tính toán ngày đêm
  calculateDaysAndNights(thoiGianBatDau: any, thoiGianKetThuc: any): string {
    let startDate = thoiGianBatDau instanceof Date ? thoiGianBatDau : new Date(thoiGianBatDau);
    let endDate = thoiGianKetThuc instanceof Date ? thoiGianKetThuc : new Date(thoiGianKetThuc);
    const oneDay = 24 * 60 * 60 * 1000;
    const diffDays = Math.round(Math.abs((startDate.getTime() - endDate.getTime()) / oneDay));
    return `${diffDays} ngày ${diffDays - 1} đêm`;
  }

}
