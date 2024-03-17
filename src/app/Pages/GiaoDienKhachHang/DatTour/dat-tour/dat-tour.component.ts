import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { RouterLink } from '@angular/router';
import { QuanLyTourService } from '../../../GiaoDienAdmin/services/quan-ly-tour.service';
import { environment } from '../../../../../environments/environment';
import { TourDuLich } from '../../../GiaoDienAdmin/models/tour-du-lich.model';


@Component({
  selector: 'app-dat-tour',
  templateUrl: './dat-tour.component.html',
  styleUrl: './dat-tour.component.css'
})
export class DatTourComponent implements OnInit {
  constructor(private el: ElementRef,
    private renderer: Renderer2,
    private quanLyTourServices: QuanLyTourService
  ) { }
  ThayDoiMauSort(index: any) {
    let items = this.el.nativeElement.querySelectorAll('.item_sort_tour');
    items.forEach((item: any) => {
      this.renderer.removeClass(item, 'active');

    });
    this.renderer.addClass(items[index - 1], 'active');
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
      console.log(this.TourDuLich);

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
