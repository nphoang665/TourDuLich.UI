import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { QuanLyTourService } from '../services/quan-ly-tour.service';
import { TourDuLich } from '../models/tour-du-lich.model';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { KhachhangService } from '../services/KhachHang/khachhang.service';
import { KhachHang } from '../models/khach-hang.model';
import { environment } from '../../../../environments/environment';
import { DattourService } from '../services/DatTour/dattour.service';
import { HttpClient } from '@angular/common/http';
import { ThanhToan } from '../models/thanh-toan.model';
import { ThanhToanService } from '../services/ThanhToan/thanh-toan.service';


@Component({
  selector: 'app-quanlydattour',
  templateUrl: './quanlydattour.component.html',
  styleUrl: './quanlydattour.component.css'
})
export class QuanlydattourComponent implements OnInit {
  themKhachHang: KhachHang;
  TenKhachHang = new FormControl();
  constructor(private quanLyTourService: QuanLyTourService,
    private quanLyKhachHangServices: KhachhangService,
    private datTourService: DattourService,
    private http: HttpClient,
    private thanhToanService:ThanhToanService) {
    var ngayGioHienTai = new Date();
    var ngayGioHienTaiFormatted = ngayGioHienTai.toISOString();
    this.themKhachHang = {
      idKhachHang: '123123',
      tenKhachHang: '',
      soDienThoai: '',
      diaChi: '',
      cccd: '',
      ngaySinh: '',
      gioiTinh: 'Nam',
      email: '',
      tinhTrang: 'Đang hoạt động',
      matKhau: '123123',
      ngayDangKy: ngayGioHienTaiFormatted
    }

  }
  // Tạo mới arr Khách hàng
  khachHang$?: Observable<KhachHang[]>;
  arrKhachHang: any[] = [];
  tourDuLich$?: Observable<TourDuLich[]>;
  //khai báo TourDuLich để html sử dụng hiển thị
  TourDuLich: any[] = [];
  ngOnInit(): void {
    var ngayGioHienTai = new Date();

    console.log(ngayGioHienTai.toISOString());

    this.tourDuLich$ = this.quanLyTourService.getAllTourDuLich();
    this.tourDuLich$.subscribe((data: TourDuLich[]) => {
      this.TourDuLich = data;
      this.TourDuLich.forEach(element => {
        var urlFirstImgTour = environment.apiBaseUrl + '/uploads/' + element.anhTour[0].imgTour;
        element.AnhTourDauTien = urlFirstImgTour;
        element.SoNgayDem = this.calculateDaysAndNights(element.thoiGianBatDau, element.thoiGianKetThuc);
      });

    });
    //lấy khách hàng từ db
    this.khachHang$ = this.quanLyKhachHangServices.getAllTourKhachHang();
    this.khachHang$.subscribe((data: KhachHang[]) => {
      this.arrKhachHang = data;

    })
  }
  //xử lý select khách hàng
  IdKhachHang !: string;
  selectValueKhachHang(event: Event) {
    const input = event.target as HTMLInputElement;
    const khachhang = this.arrKhachHang.find(p => p.soDienThoai === input.value.split('-')[0] || p.email === input.value.split('-')[2]);
    if (khachhang) {
      console.log(khachhang);

      this.TenKhachHang.setValue(khachhang.tenKhachHang)
      this.IdKhachHang = khachhang.idKhachHang;
    }
  }
  TourDuLichById: any;
  TenNhanVien: any;
  model?: TourDuLich;
  NgayDatTour!: string;
  SoLuongNguoiLon_DatTour: number = 1;
  SoLuongTreEm_DatTour: number = 0;
  SoNgayDem: string = '';
  TongTien_DatTour!: number;
  //hàm lấy tour theo id
  LayTourDuLich(idTour: string) {
    this.quanLyTourService.getTourDuLichById(idTour).subscribe((data: TourDuLich) => {
      this.TenNhanVien = 'NV0001';
      this.model = data;
      //convert giá
      this.model.giaNguoiLon = this.model.giaNguoiLon.toLocaleString();
      this.model.giaTreEm = this.model.giaTreEm.toLocaleString();
      let ngayThem: Date = new Date();
      let year: string = ngayThem.getFullYear().toString();
      let month: string = (ngayThem.getMonth() + 1).toString().padStart(2, '0'); // padStart để thêm số 0 phía trước nếu tháng chỉ có 1 chữ số
      let date: string = ngayThem.getDate().toString().padStart(2, '0'); // tương tự như trên
      let hours: string = ngayThem.getHours().toString().padStart(2, '0');
      let minutes: string = ngayThem.getMinutes().toString().padStart(2, '0');
      let NgayGioConvert: string = `${year}-${month}-${date}T${hours}:${minutes}`;
      this.NgayDatTour = NgayGioConvert;
      this.SoNgayDem = this.calculateDaysAndNights(this.model.thoiGianBatDau, this.model.thoiGianKetThuc);
      this.TinhTongTien();
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
  //hàm xử lý tính toán tổng tiền
  TinhTongTien() {
    this.TongTien_DatTour = (this.SoLuongNguoiLon_DatTour * Number(this.model?.giaNguoiLon.replace(/,/g, ''))) + (this.SoLuongTreEm_DatTour * Number(this.model?.giaTreEm.replace(/,/g, '')));
    console.log(this.model?.giaNguoiLon);
  }
  //hàm tính toán số lượng người dự tour
  TinhSoLuongNguoiDuTour(loaiNguoi: string, kieuNutBam: string) {
    //nếu là loaiNguoi = người lớn

    //nếu kiểu nút bấm là  + 
    if (loaiNguoi === "NguoiLon" && kieuNutBam === "Cong") {
      this.SoLuongNguoiLon_DatTour++;
    }
    //nếu kiểu nút bấm là  -
    else if (loaiNguoi === "NguoiLon" && kieuNutBam === "Tru") {
      this.SoLuongNguoiLon_DatTour--;
    }

    //nếu là loaiNguoi = trẻ em

    //nếu kiểu nút bấm là  + 
    else if (loaiNguoi === "TreEm" && kieuNutBam === "Cong") {
      this.SoLuongTreEm_DatTour++;
    }
    //nếu kiểu nút bấm là  -
    else {
      this.SoLuongTreEm_DatTour--;
    }
    this.TinhTongTien();
  }
  GhiChu_DatTour!: string;
  DatTour() {
    let dataToSave = {
      idDatTour: '123',
      idTour: this.model?.idTour,
      idKhachHang: this.IdKhachHang,
      thoiGianDatTour: this.NgayDatTour,
      soLuongNguoiLon: this.SoLuongNguoiLon_DatTour,
      soLuongTreEm: this.SoLuongTreEm_DatTour,
      ghiChu: this.GhiChu_DatTour,
      tinhTrang: 'Đã đặt tour',
      idNhanVien: this.TenNhanVien
    };
    console.log(dataToSave);

    this.http.post<any>(`${environment.apiBaseUrl}/api/datTour`, dataToSave)
      .subscribe(response => {
        console.log(response);
      });
  }


  //các phần khai báo cho thanh toán
  idTour_ThanhToan !: string;
  arrKhachHangThanhToan: any[] = [];
  TenKhachHang_ThanhToan = new FormControl();
  KhachHangBamTraCuu: any[] = [];
  foundKhachHang: boolean = false;
  Tour_ThanhToan: any;
  LayThanhToanTourDuLich(idTour: string) {
    //reset tra cứu khách hàng trước đó
    this.KhachHangBamTraCuu = [];
    this.TenKhachHang_ThanhToan.setValue('');
    this.foundKhachHang = false;

    //đoạn code lấy thanh toán
    this.arrKhachHangThanhToan = [];
    this.idTour_ThanhToan = idTour;
    this.datTourService.getDatTourById(idTour).subscribe((data: any) => {
      this.Tour_ThanhToan = data;
      for (let index = 0; index < data.length; index++) {
        this.arrKhachHangThanhToan.push(data[index].khachHang);
      }
    })
  }
  //lấy datalist 
  selectValueKhachHangThanhToan(event: Event) {
    this.KhachHangBamTraCuu = [];

    const input = event.target as HTMLInputElement;
    const khachhang = this.arrKhachHangThanhToan.find(p => p.soDienThoai === input.value.split('-')[0] || p.email === input.value.split('-')[0] || p.tenKhachHang === input.value.split('-')[0]);
    if (khachhang) {
      this.TenKhachHang_ThanhToan.setValue(khachhang.tenKhachHang)
      this.KhachHangBamTraCuu.push(khachhang);
    }
    this.TraCuuThongTin();
  }
  //nút tra cứu thông tin
  TraCuuThongTin() {
    //lấy id tour và {this.idTour_ThanhToan, this.KhachHangBamTraCuu}
    //nếu KhachHangBamTraCuu có
    if (this.KhachHangBamTraCuu.length > 0) {
      this.foundKhachHang = true;
    }
    else {
      this.foundKhachHang = false;
    }
  }
  //hiển thị toàn bộ thông tin thanh toán
  // đối tượng hiển thị thông tin lên html
  TourThanhToan_HienThi: any;
  LayTourDangThanhToan: any = {};
  ThongTinThanhToan() {
    for (let index = 0; index < this.Tour_ThanhToan.length; index++) {
      if (this.idTour_ThanhToan === this.Tour_ThanhToan[index].idTour) {
        this.TourThanhToan_HienThi = this.Tour_ThanhToan[index]
      }

    }
    this.quanLyTourService.getTourDuLichById(this.idTour_ThanhToan).subscribe((data: TourDuLich) => {

      this.LayTourDangThanhToan = data;
      this.LayTourDangThanhToan.SoNgayDem = this.calculateDaysAndNights(this.LayTourDangThanhToan.thoiGianBatDau, this.LayTourDangThanhToan.thoiGianKetThuc);
      this.TinhTongTienThanhToan();
    });


  }
  //tính tổng tiền thanh toán
  TongTien_ThanhToan!: number;
  TinhTongTienThanhToan() {
    this.TongTien_ThanhToan = (this.TourThanhToan_HienThi.soLuongNguoiLon * Number(this.LayTourDangThanhToan.giaNguoiLon)) + (this.TourThanhToan_HienThi.soLuongTreEm * Number(this.LayTourDangThanhToan.giaTreEm));


  }

  onSubmitThemKhachHang() {
    console.log(this.themKhachHang);

    this.quanLyKhachHangServices.addKhachHang(this.themKhachHang)
      .subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (error) => {
          if (error.status === 400) {
            console.log(error);
          } else {
            console.error('Đã xảy ra lỗi:', error);
          }
        }
      })
  }

  onThanhToan(){
    var ngayGioHienTai = new Date();
    var ngayGioHienTaiFormatted = ngayGioHienTai.toISOString();

     // Kiểm tra xem checkbox "Trả trước" đã được chọn hay không
     const traTruocCheckbox = document.getElementById('traTruoc') as HTMLInputElement;
     const traTruocChecked = traTruocCheckbox.checked;
 
     // Kiểm tra xem checkbox "Trả sau" đã được chọn hay không
     const traSauCheckbox = document.getElementById('traSau') as HTMLInputElement;
     const traSauChecked = traSauCheckbox.checked;

      // Tạo biến phương thức thanh toán và gán giá trị tương ứng
    let phuongThucThanhToan = '';
    if (traTruocChecked && !traSauChecked) {
        phuongThucThanhToan = 'Trả trước';
    } else if (!traTruocChecked && traSauChecked) {
        phuongThucThanhToan = 'Trả sau';
    }

    const tongTienTour = this.TongTien_ThanhToan;

    const thanhToanData = {
      idThanhToan:'',
      idDatTour: this.TourThanhToan_HienThi.idDatTour,
      idKhachHang: this.KhachHangBamTraCuu[0].idKhachHang,
      idNhanVien: this.TourThanhToan_HienThi.idNhanVien,
      tongTienTour: tongTienTour.toString(),
      tongTienDichVu: '0',
      tongTien:tongTienTour.toString(),
      tinhTrang:'',
      ngayThanhToan: ngayGioHienTaiFormatted,
      phuongThucThanhToan: phuongThucThanhToan,

    }
    
    this.thanhToanService.thanhToan(thanhToanData)
    .subscribe({
      next:(response)=>{
        console.log(response);
      }
    })
  }

}
