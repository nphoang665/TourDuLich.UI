// Nhập các module cần thiết từ thư viện Angular
import { AfterViewInit, ChangeDetectorRef, Component, Input, NgZone, OnInit, Output } from '@angular/core';
// Nhập model TourDuLich từ thư mục models
import { TourDuLich } from '../../../Admin/models/tour-du-lich.model';
// Nhập biến môi trường từ file environment
import { environment } from '../../../../../environments/environment';
// Nhập dịch vụ QuanLyTourService từ thư mục services
import { QuanLyTourService } from '../../../Admin/services/quan-ly-tour.service';
import { EventEmitter } from '@angular/core';
import { LoadingSanphamService } from '../../../Admin/services/Loading/loading-sanpham.service';
import { Observable } from 'rxjs';
import { DanhgiaService } from '../../../Admin/services/DanhGia/danhgia.service';
import { now } from 'moment';
import { Router } from '@angular/router';
import { DattourService } from '../../../Admin/services/DatTour/dattour.service';


// Định nghĩa metadata cho component
@Component({
  selector: 'app-san-pham-giao-dien', // tên selector để sử dụng component trong template
  templateUrl: './san-pham-giao-dien.component.html', // đường dẫn tới file template của component
  // styleUrl: './san-pham-giao-dien.component.css' 
  styleUrls: ['./san-pham-giao-dien.component.css', './style.scss'],
})
// Khai báo class SanPhamGiaoDienComponent kế thừa từ interface OnInit của Angular
export class SanPhamGiaoDienComponent implements OnInit, AfterViewInit {
  //khai báo output để loading
  // Khởi tạo dịch vụ QuanLyTourService
  constructor(
    private quanLyTourServices: QuanLyTourService,
    private cdr: ChangeDetectorRef,
    public loaderServices: LoadingSanphamService,
    private danhGiaServices: DanhgiaService,
    private datTourServices: DattourService,
    private router: Router
  ) {
  }
  // Khai báo và nhận dữ liệu đầu vào từ component cha thông qua property binding
  @Input() tour: any;
  // Khai báo mảng TourDuLich để lưu trữ danh sách tour du lịch
  TourDuLich: any[] = [];
  // Khai báo mảng topTourTypes để lưu trữ 4 loại tour có số lượng tour nhiều nhất
  topTourTypes: string[] = [];
  // Khai báo mảng selectedTours để lưu trữ danh sách tour thuộc 4 loại tour đã chọn
  selectedTours: any[] = [];

  // Hàm ngOnInit được gọi sau khi Angular khởi tạo xong component
  ngOnInit(): void {
    this.LayTour();
  }

  ngAfterViewInit(): void {

  }

  //lấy tour

  strUrlTour(tourType: string) {

    let now = new Date();
    let formattedDate = now.toLocaleDateString();

    let stringUrl = '/dattour/' + tourType + '/' + now + '/1/1';
    console.log(stringUrl);
    this.router.navigate([stringUrl]);


  }
  async LayTour() {
    let allBookings = await this.datTourServices.getAllDatTour().toPromise();
    let allReviews = await this.danhGiaServices.layTatCaDanhGia().toPromise();

    const data = await this.quanLyTourServices.getAllTourDuLich().toPromise();
    let now = new Date();
    if (data) {
      this.TourDuLich = data.filter(tour => new Date(tour.thoiGianBatDau) >= now);
      let tourCounts: { [key: string]: number } = {};

      // Add two more tour types
      let hotTours: TourDuLich[] = [];
      let mostReviewedTours: TourDuLich[] = [];

      this.TourDuLich.forEach(element => {
        this.quanLyTourServices.getTourDuLichById(element.idTour).subscribe((data: TourDuLich) => {
          element.HinhAnhDauTien = environment.apiBaseUrl + '/uploads/' + data.anhTour[0].imgTour;
        })
        this.danhGiaServices.LayTrungBinhSaoMotTour(element.idTour).subscribe((result: any) => {
          element.TrungBinhDiemDanhGia = result.trungBinhDiemDanhGia;
          element.SoLuongDanhGia = result.soLuongDanhGia;

          // Update the hotTours and mostReviewedTours lists
          if (allBookings) {
            let tourBookings = allBookings.filter((booking: any) => booking.idTour === element.idTour);
            console.log(tourBookings);

            if (tourBookings.length >= 1) {
              element.isHotTour = true; // Set the hot tour flag
              hotTours.push(element);
            }
            if (element.SoLuongDanhGia >= 1) {
              element.isMostReviewed = true; // Set the most reviewed flag
              mostReviewedTours.push(element);
            }
          }

        });
        element.SoNgayDem = this.calculateDaysAndNights(element.thoiGianBatDau, element.thoiGianKetThuc);
        tourCounts[element.loaiTour] = (tourCounts[element.loaiTour] || 0) + 1;
      });

      let sortedTourTypes = Object.keys(tourCounts).sort((a, b) => tourCounts[b] - tourCounts[a]);
      this.topTourTypes = sortedTourTypes.slice(0, 6);


      // Add the new tour types to the topTourTypes list
      this.topTourTypes.push("Tour hot", "Đánh giá nhiều");

      this.selectedTours = this.TourDuLich.filter(tour => this.topTourTypes.includes(tour.loaiTour) || tour.isHotTour || tour.isMostReviewed);


      // Add the hotTours and mostReviewedTours to the selectedTours list
      this.selectedTours = this.selectedTours.concat(hotTours, mostReviewedTours);
      //để tour hot lên đầu mảng 
      // Tìm vị trí của "Tour hot" và "Đánh giá nhiều"
      let tourHotIndex = this.topTourTypes.indexOf("Tour hot");
      let danhGiaNhieuIndex = this.topTourTypes.indexOf("Đánh giá nhiều");

      // Xóa "Tour hot" và "Đánh giá nhiều" khỏi mảng
      this.topTourTypes.splice(tourHotIndex, 1);
      this.topTourTypes.splice(danhGiaNhieuIndex - 1, 1); // Trừ đi 1 vì mảng đã bị xóa 1 phần tử

      // Thêm "Tour hot" và "Đánh giá nhiều" vào đầu mảng
      this.topTourTypes.unshift("Đánh giá nhiều");
      this.topTourTypes.unshift("Tour hot");

      // console.log(topTourTypes);
    }
  }

  getToursByType(tourType: string) {
    if (tourType === "Tour hot") {
      return this.selectedTours.filter(tour => tour.isHotTour).splice(0, 6);
    } else if (tourType === "Đánh giá nhiều") {
      return this.selectedTours.filter(tour => tour.isMostReviewed).splice(0, 6);
    } else {
      return this.selectedTours.filter(tour => tour.loaiTour === tourType).splice(0, 6);
    }
  }




  // Hàm calculateDaysAndNights nhận vào thời gian bắt đầu và kết thúc của tour, và trả về số ngày đêm của tour
  calculateDaysAndNights(thoiGianBatDau: any, thoiGianKetThuc: any): string {
    let startDate = thoiGianBatDau instanceof Date ? thoiGianBatDau : new Date(thoiGianBatDau);
    let endDate = thoiGianKetThuc instanceof Date ? thoiGianKetThuc : new Date(thoiGianKetThuc);
    const oneDay = 24 * 60 * 60 * 1000;
    const diffDays = Math.round(Math.abs((startDate.getTime() - endDate.getTime()) / oneDay));
    return `${diffDays} ngày ${diffDays - 1} đêm`;
  }
  //hàm convert id
  convertToSlug(tourType: string) {
    return tourType
      .normalize('NFD') // chuyển đổi chuỗi sang dạng Unicode tổ hợp
      .replace(/[\u0300-\u036f]/g, '') // loại bỏ các dấu
      .replace(/\s+/g, '-') // thay thế khoảng trắng bằng dấu gạch ngang
      .toLowerCase(); // chuyển đổi chuỗi sang chữ thường
  }

}
