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
    // Gọi hàm getAllTourDuLich từ dịch vụ QuanLyTourService để lấy danh sách tất cả tour du lịch
    const data = await this.quanLyTourServices.getAllTourDuLich().toPromise();
    let now = new Date();
    if (data) {
      // Gán dữ liệu nhận được từ server cho mảng TourDuLich
      this.TourDuLich = data.filter(tour => new Date(tour.thoiGianBatDau) >= now);
      // Khởi tạo object tourCounts để lưu trữ số lượng tour của mỗi loại
      let tourCounts: { [key: string]: number } = {};

      // Duyệt qua mỗi phần tử trong mảng TourDuLich
      this.TourDuLich.forEach(element => {

        // Gọi hàm getTourDuLichById từ dịch vụ QuanLyTourService để lấy thông tin chi tiết của tour
        this.quanLyTourServices.getTourDuLichById(element.idTour).subscribe((data: TourDuLich) => {
          // Gán đường dẫn hình ảnh đầu tiên cho tour
          element.HinhAnhDauTien = environment.apiBaseUrl + '/uploads/' + data.anhTour[0].imgTour;
        })
        this.danhGiaServices.LayTrungBinhSaoMotTour(element.idTour).subscribe((result: any) => {
          element.TrungBinhDiemDanhGia = result.trungBinhDiemDanhGia;
          element.SoLuongDanhGia = result.soLuongDanhGia;


        });
        // Tính toán số ngày đêm của tour
        element.SoNgayDem = this.calculateDaysAndNights(element.thoiGianBatDau, element.thoiGianKetThuc);
        // Tính toán số lượng tour của mỗi loại và lưu vào object tourCounts
        tourCounts[element.loaiTour] = (tourCounts[element.loaiTour] || 0) + 1;
      });

      // Sắp xếp các loại tour theo số lượng tour giảm dần
      let sortedTourTypes = Object.keys(tourCounts).sort((a, b) => tourCounts[b] - tourCounts[a]);
      // Chọn ra 4 loại tour có số lượng tour nhiều nhất
      this.topTourTypes = sortedTourTypes.slice(0, 4);
      // Lấy danh sách các tour thuộc 4 loại tour đã chọn
      this.selectedTours = this.TourDuLich.filter(tour => this.topTourTypes.includes(tour.loaiTour));
      // In danh sách các tour đã chọn ra console


    }
  }
  // Hàm getToursByType nhận vào một loại tour và trả về danh sách các tour thuộc loại tour đó
  getToursByType(tourType: string) {
    return this.selectedTours.filter(tour => tour.loaiTour === tourType).splice(0, 6);
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
