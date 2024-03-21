import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { environment } from '../../../../../environments/environment';
import { TourDuLich } from '../../../Admin/models/tour-du-lich.model';
import { QuanLyTourService } from '../../../Admin/services/quan-ly-tour.service';


@Component({
  selector: 'app-dat-tour',
  templateUrl: './dat-tour.component.html',
  styleUrl: './dat-tour.component.css'
})
export class DatTourComponent implements OnInit {
  constructor(private el: ElementRef,
    private renderer: Renderer2,
    private quanLyTourServices: QuanLyTourService,
    private route: ActivatedRoute,
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

    this.TimKiem();
  }

  isLoading: boolean = true;
  //lấy id tìm kiếm
  TuKhoaTimKiem: string = '';
  async TimKiem() {
    let id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.TuKhoaTimKiem = id;

      if (id == 'tatca') {
        await this.TimKiemTatCa();
      } else {
        await this.TimKiemTheoYeuCauKhachHang(id);
      }
      this.isLoading = false;
    }
  }

  async TimKiemTatCa() {
    const data = await this.quanLyTourServices.getAllTourDuLich().toPromise();
    if (data) {
      this.TourDuLich = data;
      // Tính toán ngày đêm cho tour
      for (const element of this.TourDuLich) {
        const tourData = await this.quanLyTourServices.getTourDuLichById(element.idTour).toPromise();
        element.HinhAnhDauTien = environment.apiBaseUrl + '/uploads/' + tourData?.anhTour[0].imgTour;
        element.SoNgayDem = this.calculateDaysAndNights(element.thoiGianBatDau, element.thoiGianKetThuc);
      }
    }



  }

  async TimKiemTheoYeuCauKhachHang(TuKhoaTimKiem: string) {
    const data = await this.quanLyTourServices.getAllTourDuLich().toPromise();

    // Lọc danh sách tour dựa trên TuKhoaTimKiem
    if (data) {
      this.TourDuLich = data?.filter(tour => this.LocString(tour.loaiTour.toLowerCase()).includes(this.LocString(TuKhoaTimKiem.toLowerCase())));

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
}
