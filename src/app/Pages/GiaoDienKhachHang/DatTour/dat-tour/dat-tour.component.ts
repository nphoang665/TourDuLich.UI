import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { environment } from '../../../../../environments/environment';
import { TourDuLich } from '../../../Admin/models/tour-du-lich.model';
import { QuanLyTourService } from '../../../Admin/services/quan-ly-tour.service';
import { DanhgiaService } from '../../../Admin/services/DanhGia/danhgia.service';
import { DattourService } from '../../../Admin/services/DatTour/dattour.service';
import { LoadingSanphamService } from '../../../Admin/services/Loading/loading-sanpham.service';

export enum SortCriteria {
  DeXuat = 'DeXuat',
  ThoiLuong = 'ThoiLuong',
  KhoiHanh = 'KhoiHanh',
  GiaTour = 'GiaTour'
}
@Component({
  selector: 'app-dat-tour',
  templateUrl: './dat-tour.component.html',
  styleUrl: './dat-tour.component.css'
})

export class DatTourComponent implements OnInit {
  activeIndex: number = 1;
  constructor(private el: ElementRef,
    private renderer: Renderer2,
    private quanLyTourServices: QuanLyTourService,
    private route: ActivatedRoute,
    private danhGiaServices: DanhgiaService,
    private tourServices: QuanLyTourService,
    private datTourService: DattourService
  ) {

  }
  ThayDoiMauSort(index: number) {
    this.activeIndex = index;
    this.sortTourDuLich();
  }

  //khai báo mảng khởi đầu cho tour
  //biến { TourDuLich } dùng để lưu trữ tất cả tour du lịch
  TourDuLich: any[] = [];
  ngOnInit(): void {

    this.ThayDoiMauSort(1);
    this.GetUniqueTypeTour();
  }
  //
  getUniqueTypeTour: any[] = [];
  GetUniqueTypeTour() {
    this.tourServices.getUniqueTypeOfTour().subscribe((result: any) => {
      if (result) {
        this.getUniqueTypeTour = result;
      }
    });

  }

  isLoading: boolean = true;
  // Lấy các tham số tìm kiếm
  TuKhoaTimKiem: string = '';
  NgayDi: string = '';
  SoNguoiLon: string = '';
  SoTreEm: string = '';

  async TimKiem() {
    let tentour = this.route.snapshot.paramMap.get('tentour');
    let ngaydi = this.route.snapshot.paramMap.get('ngaydi');
    let songuoilon = this.route.snapshot.paramMap.get('songuoilon');
    let sotreem = this.route.snapshot.paramMap.get('sotreem');

    if (tentour == 'tatca') {
      await this.TimKiemTatCa();
    } else {
      this.TuKhoaTimKiem = tentour ?? '';
      this.NgayDi = ngaydi ?? '';
      this.SoNguoiLon = songuoilon ?? '';
      this.SoTreEm = sotreem ?? '';
      await this.TimKiemTheoYeuCauKhachHang(this.TuKhoaTimKiem, this.NgayDi, this.SoNguoiLon, this.SoTreEm);
    }
    this.isLoading = false;
  }

  async TimKiemTatCa() {
    const data = await this.quanLyTourServices.getAllTourDuLich().toPromise();
    let now = new Date();
    if (data) {
      // this.TourDuLich = data;
      this.TourDuLich = data.filter(tour => new Date(tour.thoiGianBatDau) >= now);


      // Tính toán ngày đêm cho tour
      for (const element of this.TourDuLich) {
        this.datTourService.tinhSoLuongNguoiConNhan(element.idTour).subscribe((resulDt: any) => {
          element.soChoConNhan = resulDt.SoChoConNhanTrongTour;
        });
        const tourData = await this.quanLyTourServices.getTourDuLichById(element.idTour).toPromise();
        element.HinhAnhDauTien = environment.apiBaseUrl + '/uploads/' + tourData?.anhTour[0].imgTour;
        element.SoNgayDem = this.calculateDaysAndNights(element.thoiGianBatDau, element.thoiGianKetThuc);
        this.danhGiaServices.LayTrungBinhSaoMotTour(element.idTour).subscribe((result: any) => {
          element.TrungBinhDiemDanhGia = result.trungBinhDiemDanhGia;
          element.SoLuongDanhGia = result.soLuongDanhGia;



        });
      }
    }
  }
  async TimKiemTheoYeuCauKhachHang(tentour: string, ngaydi: string, songuoilon: string, sotreem: string) {
    const data = await this.quanLyTourServices.getAllTourDuLich().toPromise();

    // Lọc danh sách tour dựa trên các tham số tìm kiếm
    let now = new Date();
    if (data) {
      const promises = data.map(element =>
        this.datTourService.tinhSoLuongNguoiConNhan(element.idTour).toPromise().then((result: any) => {
          element.soLuongNguoiLon = result.TongSoLuongNguoiLonDaDatTrongTour;
          element.soLuongTreEm = result.TongSoLuongTreEmDaDatTrongTour;
        })
      );
      await Promise.all(promises);

      console.log(tentour, new Date(ngaydi), songuoilon, sotreem);
      this.TourDuLich = data?.filter((tour: any) =>
        (this.LocString(tour.loaiTour.toLowerCase()).includes(this.LocString(tentour.toLowerCase())) ||
          this.LocString(tour.tenTour.toLowerCase()).includes(this.LocString(tentour.toLowerCase())))
        &&
        new Date(tour.thoiGianBatDau) >= new Date(ngaydi)
        &&
        tour.soLuongNguoiLon >= parseInt(songuoilon) &&
        tour.soLuongTreEm >= parseInt(sotreem)
      );

      // Tính toán ngày đêm cho tour
      for (const element of this.TourDuLich) {
        const tourData = await this.quanLyTourServices.getTourDuLichById(element.idTour).toPromise();
        element.HinhAnhDauTien = environment.apiBaseUrl + '/uploads/' + tourData?.anhTour[0].imgTour;
        element.SoNgayDem = this.calculateDaysAndNights(element.thoiGianBatDau, element.thoiGianKetThuc);
      }
    }
  }

  //lọc string
  LocString(tukhoa: any) {
    return tukhoa.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  CheckNullTourDuLich() {
    return this.TourDuLich && this.TourDuLich.length > 0;
  }
  //hàm tính toán ngày đêm
  calculateDaysAndNights(thoiGianBatDau: any, thoiGianKetThuc: any): string {
    let startDate = thoiGianBatDau instanceof Date ? thoiGianBatDau : new Date(thoiGianBatDau);
    let endDate = thoiGianKetThuc instanceof Date ? thoiGianKetThuc : new Date(thoiGianKetThuc);
    const oneDay = 24 * 60 * 60 * 1000;
    const diffDays = Math.round(Math.abs((startDate.getTime() - endDate.getTime()) / oneDay));
    return `${diffDays} ngày ${diffDays - 1} đêm`;
  }
  currentSortCriteria: SortCriteria = SortCriteria.DeXuat;
  sortTourDuLich() {
    switch (this.activeIndex) {
      case 1:
        // Sắp xếp theo đề xuất
        // Thêm logic của bạn ở đây
        this.TimKiem();
        break;
      case 2:
        // Sắp xếp theo thời lượng (số ngày)
        this.TourDuLich.sort((a, b) => this.calculateDays(a.thoiGianBatDau, a.thoiGianKetThuc) - this.calculateDays(b.thoiGianBatDau, b.thoiGianKetThuc));
        break;
      case 3:
        // Sắp xếp theo ngày khởi hành gần nhất
        this.TourDuLich.sort((a, b) => new Date(a.thoiGianBatDau).getTime() - new Date(b.thoiGianBatDau).getTime());
        break;
      case 4:
        // Sắp xếp theo giá từ thấp đến cao
        this.TourDuLich.sort((a, b) => parseFloat(a.giaNguoiLon) - parseFloat(b.giaNguoiLon));
        break;
    }
  }
  calculateDays(thoiGianBatDau: any, thoiGianKetThuc: any): number {
    let startDate = thoiGianBatDau instanceof Date ? thoiGianBatDau : new Date(thoiGianBatDau);
    let endDate = thoiGianKetThuc instanceof Date ? thoiGianKetThuc : new Date(thoiGianKetThuc);
    const oneDay = 24 * 60 * 60 * 1000;
    const diffDays = Math.round(Math.abs((startDate.getTime() - endDate.getTime()) / oneDay));
    return diffDays;
  }
  @ViewChild('sortClientForTour') sortClientForTour !: ElementRef;

  SortClientForTour(event: Event) {
    const eventFilter = event.target as HTMLInputElement;
    if (eventFilter.tagName === "INPUT") {
      let checkedInput = this.sortClientForTour.nativeElement.querySelectorAll('input:checked');
      let arrCheckedInput: any[] = [];
      checkedInput.forEach((input: any) => {

        arrCheckedInput.push(input.value);

      }); this.SwitchOptionSortTour(arrCheckedInput);



    }

  }
  async SwitchOptionSortTour(option: any) {
    await this.TimKiem();
    option.forEach((element: any) => {


      switch (element) {
        case 'SortDuoi500k':
          this.TourDuLich = this.TourDuLich.filter(s => s.giaNguoiLon <= 500000);
          console.log(this.TourDuLich);

          break;
        case 'Sort500kDen2Trieu':
          this.TourDuLich = this.TourDuLich.filter(s => s.giaNguoiLon > 500000 && s.giaNguoiLon <= 2000000);

          break;
        case 'Sort2TrieuDen4Trieu':
          this.TourDuLich = this.TourDuLich.filter(s => s.giaNguoiLon > 2000000 && s.giaNguoiLon <= 4000000);

          break;
        case 'SortTren4Trieu':
          this.TourDuLich = this.TourDuLich.filter(s => s.giaNguoiLon > 4000000);
          break;

        case 'SortDuoi2Ngay1Dem':
          this.TourDuLich = this.TourDuLich.filter(s => {
            const duration = Math.ceil((new Date(s.thoiGianKetThuc).getTime() - new Date(s.thoiGianBatDau).getTime()) / (1000 * 60 * 60 * 24));
            return duration < 2;
          });
          break;

        case 'Sort2Ngay1Dem':
          this.TourDuLich = this.TourDuLich.filter(s => {
            const duration = Math.ceil((new Date(s.thoiGianKetThuc).getTime() - new Date(s.thoiGianBatDau).getTime()) / (1000 * 60 * 60 * 24));
            return duration === 2;
          });
          break;

        case 'Sort3Ngay2Dem':
          this.TourDuLich = this.TourDuLich.filter(s => {
            const duration = Math.ceil((new Date(s.thoiGianKetThuc).getTime() - new Date(s.thoiGianBatDau).getTime()) / (1000 * 60 * 60 * 24));
            return duration === 3;
          });
          break;

        case 'Sort4Ngay3Dem':
          this.TourDuLich = this.TourDuLich.filter(s => {
            const duration = Math.ceil((new Date(s.thoiGianKetThuc).getTime() - new Date(s.thoiGianBatDau).getTime()) / (1000 * 60 * 60 * 24));
            return duration === 4;
          });
          break;

        case 'SortTren4Ngay3Dem':
          this.TourDuLich = this.TourDuLich.filter(s => {
            const duration = Math.ceil((new Date(s.thoiGianKetThuc).getTime() - new Date(s.thoiGianBatDau).getTime()) / (1000 * 60 * 60 * 24));
            return duration > 4;
          });
          break;
        case 'SortTatCaGia':
          break;
        case 'SortTatCaThoiGian':
          break;
        case 'SortTatCaDanhGia':
          break;
        case 'SortTour5Sao':
          this.TourDuLich = this.TourDuLich.filter(s => s.TrungBinhDiemDanhGia === 5);
          break;
        case 'SortTour4Sao':
          this.TourDuLich = this.TourDuLich.filter(s => s.TrungBinhDiemDanhGia >= 4);

          break;
        case 'SortTour3Sao':
          this.TourDuLich = this.TourDuLich.filter(s => s.TrungBinhDiemDanhGia >= 3);
          break;
        default:

          this.SortTourTheoLoaiTour(element);
          break;
      }


    });


  }
  async SortTourTheoLoaiTour(option: string) {
    if (option === 'SortTatCaLoaiTour') {
      this.TourDuLich = this.TourDuLich.filter(s => s.loaiTour);

    }
    else {
      this.TourDuLich = this.TourDuLich.filter(s => s.loaiTour === option);
    }

  }

}
