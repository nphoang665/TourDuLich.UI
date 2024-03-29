import { Component, OnInit } from '@angular/core';
import { KhachHang } from '../../models/khach-hang.model';
import { FormControl } from '@angular/forms';
import { QuanLyTourService } from '../../services/quan-ly-tour.service';
import { KhachhangService } from '../../services/KhachHang/khachhang.service';
import { DattourService } from '../../services/DatTour/dattour.service';
import { HttpClient } from '@angular/common/http';
import { ThanhToanService } from '../../services/ThanhToan/thanh-toan.service';
import { Observable } from 'rxjs';
import { TourDuLich } from '../../models/tour-du-lich.model';
import { environment } from '../../../../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { DichvuService } from '../../../GiaoDienAdmin/services/DichVu/dichvu.service';
import { DichVu } from '../../models/Dich-Vu.model';
import { DichVuChiTietDto, ThemDichVuChiTietRequestDto } from '../../models/dich-vu-chi-tiet.model';
import { NguoiDungService } from '../../services/NguoiDung/nguoi-dung.service';
import { DichVuChiTietService } from '../../services/DichVuChiTiet/dich-vu-chi-tiet.service';
interface DichVuThemVaoDb {
  idDihVuChiTiet: string;
  idDichVu: string;
  soLuong: number;
  giaTien: number;

}
@Component({
  selector: 'app-quanlydattour',
  templateUrl: './quanlydattour.component.html',
  styleUrl: './quanlydattour.component.css'
})
export class QuanlydattourComponent implements OnInit {
  themKhachHang: KhachHang;
  TenKhachHang = new FormControl('');
  constructor(private quanLyTourService: QuanLyTourService,
    private quanLyKhachHangServices: KhachhangService,
    private dichVuServices: DichvuService,
    private datTourService: DattourService,
    private http: HttpClient,
    private thanhToanService: ThanhToanService,
    private nguoiDungServices: NguoiDungService,
    private toastr: ToastrService,
    private dichVuChiTietServices: DichVuChiTietService,
    private router: Router) {
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
  //disable khách hàng ở thêm đặt tour khi có ở thêm khách hàng
  checkValue() {
    if (this.themKhachHang.tenKhachHang != '' || this.themKhachHang.soDienThoai != '') {


      this.TenKhachHang.disable();
    } else {
      this.TenKhachHang.enable();
    }
  }
  TypingKhachHang() {
    this.checkValue();
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
    this.GetDichVu();
  }
  //xử lý select khách hàng
  IdKhachHang !: string;
  selectValueKhachHang(event: Event) {
    // tắt form thêm khách hàng
    this.TypingKhachHang();
    const input = event.target as HTMLInputElement;
    const khachhang = this.arrKhachHang.find(p => p.soDienThoai === input.value.split('-')[0] || p.email === input.value.split('-')[2]);
    if (khachhang) {
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
  //hàm đặt tour
  DatTour() {
    //nếu thêm khách hàng không có value
    if (this.themKhachHang.tenKhachHang == '') {
      this.onDatTour(null);
    }
    //nếu thêm khách hàng có value
    else {
      this.onSubmitThemKhachHang();

    }



  }
  //hàm thêm khách hàng
  //biến chứa khách hàng reponse 
  onSubmitThemKhachHang() {


    this.quanLyKhachHangServices.themKhachHang(this.themKhachHang)
      .subscribe({
        next: (response) => {
          console.log(response);

          this.onDatTour(response);
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
  onDatTour(khachHangRes: any) {
    console.log(khachHangRes, this.IdKhachHang);
    let dataToSave = {
      idDatTour: '123',
      idTour: this.model?.idTour,
      idKhachHang: this.IdKhachHang != '' ? this.IdKhachHang : khachHangRes.idKhachHang,
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
        this.onThemDichVuChiTiet(response);
      });
  }
  //hàm thêm dịch vụ chi tiết vào db
  onThemDichVuChiTiet(datTour: any) {
    const nguoiDung = this.nguoiDungServices.LayNguoiDungTuLocalStorage();
    //mảng chứa những dịch vụ chi tiết để thêm vào db
    let arr_TongDichVuRequest: any[] = [];
    this.TongDichVu_Db.forEach(element => {
      const objDichVu: ThemDichVuChiTietRequestDto = {
        idDichVuChiTiet: 'DataDefault',
        idDichVu: element.idDichVu,
        idKhachHang: datTour.idKhachHang,
        idDatTour: datTour.idDatTour,
        idNhanVien: nguoiDung.idNhanVien,
        thoiGianDichVu: new Date().toISOString(),
        soLuong: element.soLuong,
      }
      arr_TongDichVuRequest.push(objDichVu);
    });
    this.dichVuChiTietServices.LuuDichVuChiTietVaoDb(datTour.idDatTour, arr_TongDichVuRequest).subscribe((result: any) => {
      alert(result);
    })
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


  //hàm thanh toán
  onThanhToan() {
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
      idThanhToan: '',
      idDatTour: this.TourThanhToan_HienThi.idDatTour,
      idKhachHang: this.KhachHangBamTraCuu[0].idKhachHang,
      idNhanVien: this.TourThanhToan_HienThi.idNhanVien,
      tongTienTour: tongTienTour.toString(),
      tongTienDichVu: '0',
      tongTien: tongTienTour.toString(),
      tinhTrang: '',
      ngayThanhToan: ngayGioHienTaiFormatted,
      phuongThucThanhToan: phuongThucThanhToan,

    }

    this.thanhToanService.thanhToan(thanhToanData)
      .subscribe({
        next: (response) => {
          console.log(response);
          this.router.navigateByUrl('/quanLyDatTour'),

            this.toastr.success('Thanh toán thành công', 'Thông báo', {
              timeOut: 1000,
            });
        }
      })
  }
  // hàm xử lý dịch vụ
  n: number = 0;
  DichVu: any[] = [];
  _ngDichVuDaChon: string[] = [];
  TongDichVu: any[] = [];
  //mảng được tách để lưu vào db
  TongDichVu_Db: DichVuThemVaoDb[] = [];
  //khai báo số lượng người dùng chọn
  _ngSoLuongDaChon: number[] = [];
  GetDichVu() {
    this.dichVuServices.LayDichVuMau().subscribe((data: DichVu[]) => {
      this.DichVu = data;


    });
  }

  ThemDichVu() {
    this.TongDichVu.push('');
    this._ngDichVuDaChon.push('');
    const servicesMoi: DichVuThemVaoDb = {
      idDihVuChiTiet: '',
      idDichVu: '',
      soLuong: 1,
      giaTien: 0,
    };
    //lấy index cuối cùng của thêm dịch vụ
    this._ngSoLuongDaChon[this.TongDichVu_Db.length] = 1;
    this.TongDichVu_Db.push(servicesMoi);
  }

  KiemTraDichVuDaChon(idDichVu: string, index: number): boolean {

    let flag = false;
    if (index != 0) {
      for (let i = 0; i < this._ngDichVuDaChon.length; i++) {
        if (i != index && this._ngDichVuDaChon[i] == idDichVu) {
          flag = true;
        }
      }
    }
    //sao chép array
    this.TongDichVu_Db[index].idDichVu = this._ngDichVuDaChon[index];
    //lấy giá dịch vụ khi thay đổi


    return flag;
  }
  //xóa dịch vụ 
  XoaDichVuDaChon(i: any) {
    this.TongDichVu.splice(i, 1);
    this._ngDichVuDaChon.splice(i, 1);
    this.TongDichVu_Db.splice(i, 1);
    this._ngSoLuongDaChon.splice(i, 1);
    this.TinhTienDichVu();

  }

  ThayDoiSoLuongDichVu(index: number, kieuNutBam: string) {
    //nếu loại nút bấm là cộng
    if (kieuNutBam === "Cong") {
      this.TongDichVu_Db[index].soLuong++;
      this._ngSoLuongDaChon[index] = this.TongDichVu_Db[index].soLuong;
    }
    //nếu loại nút bấm là trừ
    else {
      if (this.TongDichVu_Db[index].soLuong > 1) {
        this.TongDichVu_Db[index].soLuong--;
        this._ngSoLuongDaChon[index] = this.TongDichVu_Db[index].soLuong;
      }
    }
    this.TinhTienDichVu();
  }
  ThayDoiDichVu(i: number) {
    // console.log(this._ngDichVuDaChon[0], this.DichVu);
    for (let index = 0; index < this.DichVu.length; index++) {
      if (this._ngDichVuDaChon[i] == this.DichVu[index].idDichVu) {

        this.TongDichVu_Db[i].giaTien = this.DichVu[index].giaTien

      }

    }
    //update tiền dịch vụ
    this.TinhTienDichVu();
  }
  //khai báo tổng tiền dịch vụ
  TongTienDichVu: number = 0;
  TinhTienDichVu() {
    //reset khi tính tiền 
    this.TongTienDichVu = 0;
    this.TongDichVu_Db.forEach(element => {
      this.TongTienDichVu += element.giaTien * element.soLuong;
    });

  }
}
