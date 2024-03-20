import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, Inject, OnInit, PLATFORM_ID, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuanLyTourService } from '../../../GiaoDienAdmin/services/quan-ly-tour.service';
import { TourDuLich } from '../../../GiaoDienAdmin/models/tour-du-lich.model';
import { DomSanitizer } from '@angular/platform-browser';

import { environment } from '../../../../../environments/environment';
import { isPlatformBrowser } from '@angular/common';

declare var bootstrap: any;
@Component({
  selector: 'app-chi-tiet-tour',
  templateUrl: './chi-tiet-tour.component.html',
  styleUrl: './chi-tiet-tour.component.css'
})

export class ChiTietTourComponent implements OnInit, AfterViewInit {
  Sl_NguoiLon_ThanhToan: number = 1;
  Sl_TreEm_ThanhToan: number = 1;

  constructor(private route: ActivatedRoute,
    private tourDuLichServices: QuanLyTourService,
    public domSanitizer: DomSanitizer,
    private el: ElementRef,
    //đối tượng gọi thủ công dom
    private cdRef: ChangeDetectorRef,

    private router: Router,
    @Inject(PLATFORM_ID) private _platformId: Object
  ) {

  }
  //khai báo đối tượng chứa tour đã lấy
  TourChiTiet: any = {};
  ngOnInit(): void {
    //gọi hàm get tour và truyền biến id tour vào
    this.GetTour(this.LayIdRoute());

    //gọi hàm lấy dịch vụ mẫu



  }
  //các phần khai báo cho slide tour chi tiết
  @ViewChild('carousel') carousel !: ElementRef;
  ngAfterViewInit(): void {
    //lấy index slide tour chi tiết
    const carouselEl = this.carousel.nativeElement;

    // set index = 0;
    this.indexHienTai = 0;
    carouselEl.addEventListener('slid.bs.carousel', (event: any) => {
      this.indexHienTai = event.to;
      this.cdRef.detectChanges();

    })
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


  //lấy dịch vụ mẫu from services
  // biến lấy dịch vụ mẫu




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

  //xử lý ảnh con khi click hiển thị preview

  //khai báo biến toàn cục lấy giá trị index
  indexHienTai: number | null = null;
  //phần biến này chỉ đảm nhiệm click vào ảnh con tăng độ nhanh chóng
  index_phu_img_tour !: number;
  //khai báo viewchildren
  @ViewChildren('carouselButtons') carouselButton!: QueryList<ElementRef>;
  ChonAnhHienThi(index: any) {
    setTimeout(() => {
      this.carouselButton.toArray()[index].nativeElement.click()
    }, 0);
  }


  //xử lý khi kích thước màn hình thay đổi
  //khai báo view child để đọc dom
  @ViewChild('closeModal_ThanhToan') closeButton!: ElementRef;

  screenWidth!: number;

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?: any) {

    this.screenWidth = window.innerWidth;
    if (this.screenWidth > 767) {
      this.closeButton.nativeElement.click();
    }
  }

  ChuyenTrangThanhToan() {
    //xử lý lưu thông tin tour khách của khách hàng vào đây


    if (isPlatformBrowser(this._platformId)) {

      let ObjTour = {
        IdTour: this.TourChiTiet.idTour,
        SoLuongNguoiLon: this.Sl_NguoiLon_ThanhToan,
        SoLuongTreEm: this.Sl_TreEm_ThanhToan
      };
      localStorage.setItem('DatTourKhachHang', JSON.stringify(ObjTour));

    }
    //```````````
    this.router.navigate(['/thanhtoankhachhang']);
  }

  ThayDoiSoLuong(loaiNguoi: any, loaiNutBam: any) {
    console.log(1);

    //nếu loại người =  người lớn 
    if (loaiNguoi === "NguoiLon") {
      //nếu loại nút bấm là cộng
      if (loaiNutBam === "Cong") {
        this.Sl_NguoiLon_ThanhToan++;
      }
      //nếu loại nút bấm là trừ
      else {
        if (this.Sl_NguoiLon_ThanhToan > 1) {
          this.Sl_NguoiLon_ThanhToan--;
        }
      }
    }
    //nếu loại người =  người trẻ em 
    else {
      //nếu loại nút bấm là cộng
      if (loaiNutBam === "Cong") {
        this.Sl_TreEm_ThanhToan++;
      }
      //nếu loại nút bấm là cộng
      else {
        if (this.Sl_TreEm_ThanhToan > 1) {
          this.Sl_TreEm_ThanhToan--;
        }
      }
    }
  }


}
