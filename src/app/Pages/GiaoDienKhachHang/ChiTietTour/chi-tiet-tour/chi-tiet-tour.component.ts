import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuanLyTourService } from '../../../GiaoDienAdmin/services/quan-ly-tour.service';
import { TourDuLich } from '../../../GiaoDienAdmin/models/tour-du-lich.model';
import { DomSanitizer } from '@angular/platform-browser';

import { environment } from '../../../../../environments/environment';
@Component({
  selector: 'app-chi-tiet-tour',
  templateUrl: './chi-tiet-tour.component.html',
  styleUrl: './chi-tiet-tour.component.css'
})

export class ChiTietTourComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private tourDuLichServices: QuanLyTourService,
    public domSanitizer: DomSanitizer,
    private el: ElementRef
  ) {

  }
  //khai báo đối tượng chứa tour đã lấy
  TourChiTiet: any = {};
  ngOnInit(): void {
    //gọi hàm get tour và truyền biến id tour vào
    this.GetTour(this.LayIdRoute());
    // this.images = [...this.images, ...this.images, ...this.images, ...this.images, ...this.images];


  }
  //hàm lấy tour từ services
  GetTour(idTour: string): void {
    //gọi services lấy tour
    this.tourDuLichServices.getTourDuLichById(idTour).subscribe((data: TourDuLich) => {
      //trả về data dạng tour
      this.TourChiTiet = data;

      this.TourChiTiet.HinhAnhDauTien = environment.apiBaseUrl + '/uploads/' + data.anhTour[0].imgTour;
      this.TourChiTiet.SoNgayDem = this.calculateDaysAndNights(this.TourChiTiet.thoiGianBatDau, this.TourChiTiet.thoiGianKetThuc);

      //gán ảnh tour vào mảng 
      //xử lý ảnh và gán vào mảng tour
      for (let index = 0; index < this.TourChiTiet.anhTour.length; index++) {
        //lấy linkanh từ đối tượng
        this.images.push(environment.apiBaseUrl + '/uploads/' + this.TourChiTiet.anhTour[index].imgTour)
        //sao chép img gốc thành mảng clone
        this.images_clone.push(environment.apiBaseUrl + '/uploads/' + this.TourChiTiet.anhTour[index].imgTour)
      }




    })
  }
  calculateDaysAndNights(thoiGianBatDau: any, thoiGianKetThuc: any): string {
    let startDate = thoiGianBatDau instanceof Date ? thoiGianBatDau : new Date(thoiGianBatDau);
    let endDate = thoiGianKetThuc instanceof Date ? thoiGianKetThuc : new Date(thoiGianKetThuc);
    const oneDay = 24 * 60 * 60 * 1000;
    const diffDays = Math.round(Math.abs((startDate.getTime() - endDate.getTime()) / oneDay));
    return `${diffDays} ngày ${diffDays - 1} đêm`;
  }
  //convert text mô tả
  get TextMoTa() {
    return this.domSanitizer.bypassSecurityTrustHtml(this.TourChiTiet?.moTa || '');
  }
  //hàm lấy id router
  //khai báo id lấy mã tour
  id!: string;
  LayIdRoute(): string {
    this.route.params.subscribe(params => {
      this.id = params['id'];

    });
    return this.id;
  }




  // tạo mảng chứa imgTour
  images: string[] = [

  ];
  //tạo 1 mảng clone sao chép imgTour gốc
  images_clone: string[] = [];
  loadMoreImages = (direction: 'start' | 'end' | undefined) => {
    if (direction === 'end') {


    } else if (direction === 'start') {

    }

  }





}
