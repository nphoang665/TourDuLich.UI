import { Component, ElementRef, Inject, OnInit, PLATFORM_ID, QueryList, ViewChild } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { environment } from '../../../../../environments/environment';
import { DichvuService } from '../../../GiaoDienAdmin/services/DichVu/dichvu.service';

import { AsyncValidatorFn, FormControl, FormGroup, FormGroupDirective, NgForm, ValidationErrors, Validators } from '@angular/forms';
import { QuanLyTourService } from '../../../Admin/services/quan-ly-tour.service';
import { DattourService } from '../../../Admin/services/DatTour/dattour.service';
import { DatTourChoKhachHang } from '../../../Admin/models/dat-tour-khach-hang.model';
import { TourDuLich } from '../../../Admin/models/tour-du-lich.model';
import { DichVu } from '../../../Admin/models/Dich-Vu.model';
import { NguoiDungService } from '../../../Admin/services/NguoiDung/nguoi-dung.service';
import { DichVuChiTietService } from '../../../Admin/services/DichVuChiTiet/dich-vu-chi-tiet.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormsModule, ValidatorFn, } from '@angular/forms';
import { ReactiveFormsModule, Validator, AbstractControl } from '@angular/forms';
import { DateAdapter, ErrorStateMatcher, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { KhachHang } from '../../../Admin/models/khach-hang.model';
import { KhachhangService } from '../../../Admin/services/KhachHang/khachhang.service';
import * as _moment from 'moment';
import { default as _rollupMoment } from 'moment';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'DD-MM-YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};
interface DichVuThemVaoDb {
  idDihVuChiTiet: string;
  idDichVu: string;
  soLuong: number;
  giaTien: number;

}

@Component({
  selector: 'app-thanhtoankhachhang',
  templateUrl: './thanhtoankhachhang.component.html',
  styleUrl: './thanhtoankhachhang.component.css',
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class ThanhtoankhachhangComponent implements OnInit {
  matcher = new MyErrorStateMatcher();
  constructor(private dichVuServices: DichvuService,

    @Inject(PLATFORM_ID) private _platform_id: Object,
    private tourDuLichServices: QuanLyTourService,
    private datTourChoKhachHangServices: DattourService,
    private nguoiDung: NguoiDungService,
    private router: Router,
    private toastr: ToastrService,
    private KhachhangService: KhachhangService,

  ) {

  }
  private nguoiDungLogin = this.nguoiDung.LayNguoiDungTuLocalStorage();

  n: number = 0;
  DichVu: any[] = [];
  _ngDichVuDaChon: string[] = [];
  TongDichVu: any[] = [];
  //mảng được tách để lưu vào db
  TongDichVu_Db: DichVuThemVaoDb[] = [];
  //khai báo số lượng người dùng chọn
  _ngSoLuongDaChon: number[] = [];
  //khai báo model
  datTourKhachHang!: DatTourChoKhachHang;

  ngOnInit(): void {

    this.KhaiBaoContructorDatTour();
    this.GetDichVu();
    this.LayDatTourTuLocalStorage();




  }
  KhaiBaoContructorDatTour() {
    this.datTourKhachHang = {
      IdDatTour: '',
      IdTour: '',
      SoLuongNguoiLon: 0,
      SoLuongTreEm: 0,
      ThoiGianDatTour: '',
      TinhTrangDatTour: '',
      IdKhachHang: '',
      TenKhachHang: '',
      SoDienThoai: '',
      DiaChi: '',
      CCCD: '',
      NgaySinh: moment().format('dd-MM-yyyy'),
      GioiTinh: '',
      Email: '',
      TinhTrangKhachHang: '',
      NgayDangKy: '',
      DichVuChiTiet: [],
    };
  }
  //khai báo cho phần thanh toán
  ItemTourStrage: any;
  ItemTourById: any;
  LayDatTourTuLocalStorage() {

    if (isPlatformBrowser(this._platform_id)) {
      const _itemTour = localStorage.getItem('DatTourKhachHang');
      if (_itemTour) {
        const __itemTour = JSON.parse(_itemTour);

        this.ItemTourStrage = __itemTour;
        this.Sl_NguoiLon_ThanhToan = __itemTour.SoLuongNguoiLon;
        this.Sl_TreEm_ThanhToan = __itemTour.SoLuongTreEm;

        //get tour du lịch theo id
        this.tourDuLichServices.getTourDuLichById(__itemTour.IdTour).subscribe((data: TourDuLich) => {
          this.ItemTourById = data;
          this.TinhTongTienTour();
          this.ItemTourById.HinhAnhDauTien = environment.apiBaseUrl + '/uploads/' + data.anhTour[0].imgTour;
        })

      }

    }

  }

  GetDichVu() {
    this.dichVuServices.LayDichVuMau().subscribe((data: DichVu[]) => {
      this.DichVu = data.filter(dv => dv.tinhTrang === 'Đang hoạt động');


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
  //khai báo sl người lớn, trẻ em sử dụng biến và lưu vào db
  Sl_NguoiLon_ThanhToan: number = 1; // gán =  sl đã đặt trước đó
  Sl_TreEm_ThanhToan: number = 1;// gán =  sl đã đặt trước đó

  XoaDichVuDaChon(i: any) {
    this.TongDichVu.splice(i, 1);
    this._ngDichVuDaChon.splice(i, 1);
    this.TongDichVu_Db.splice(i, 1);
    this._ngSoLuongDaChon.splice(i, 1);
    this.TinhTienDichVu();

  }
  ThayDoiSoLuongNguoiDuTour() {
    this.TinhTongTienTour();
  }
  ThayDoiSoLuong(loaiNguoi: any, loaiNutBam: any) {
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
    this.TinhTongTienTour();
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

  //
  isfalse: boolean = true;

  //tạo formgroup và formcontrol
  private ngaySinh = this.nguoiDungLogin ? new Date(this.nguoiDungLogin.ngaySinh).toISOString().split('T')[0] : '';
  ThanhToan = new FormGroup({
    IdKhachHang: new FormControl(this.nguoiDungLogin ? this.nguoiDungLogin.idKhachHang : ''),
    TenKhachHang: new FormControl(this.nguoiDungLogin ? this.nguoiDungLogin.tenKhachHang : '', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(50),
      this.noSpecialCharValidator(),
    ]),
    SoDienThoai: new FormControl(this.nguoiDungLogin ? this.nguoiDungLogin.soDienThoai : '', {
      validators: [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern(/^(0[0-9]{9})$/)
      ],
      asyncValidators: [this.checkSDT()],
      updateOn: 'change'
    }),
    DiaChi: new FormControl(this.nguoiDungLogin ? this.nguoiDungLogin.diaChi : '', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(50),

    ]),
    CCCD: new FormControl(this.nguoiDungLogin ? this.nguoiDungLogin.cccd : '', {
      validators: [
        Validators.required,
        Validators.maxLength(12),
        Validators.minLength(12),
        Validators.pattern(/^(0|[1-9][0-9]*)$/),
      ],
      asyncValidators: [this.checkCCCD()],
      updateOn: 'change'
    }),
    NgaySinh: new FormControl(this.nguoiDungLogin ? this.ngaySinh : '',
      Validators.required),
    GioiTinh: new FormControl(this.nguoiDungLogin ? this.nguoiDungLogin.gioiTinh : '',
      Validators.required),
    Email: new FormControl(this.nguoiDungLogin ? this.nguoiDungLogin.email : '', {
      validators: [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(50),
        Validators.pattern(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/),
      ],
      asyncValidators: [this.checkEmail()],
      updateOn: 'change'
    }),
    TinhTrangKhachHang: new FormControl('Đang hoạt động'),
  });
  get TenKhachHang() {
    return this.ThanhToan.get('TenKhachHang');
  }
  get SoDienThoai() {
    return this.ThanhToan.get('SoDienThoai');
  }
  get CCCD() {
    return this.ThanhToan.get('CCCD');
  }
  get DiaChi() {
    return this.ThanhToan.get('DiaChi');
  }
  get NgaySinh() {
    return this.ThanhToan.get('NgaySinh');
  }
  get Email() {
    return this.ThanhToan.get('Email');
  }
  get GioiTinh() {
    return this.ThanhToan.get('GioiTinh');
  }
  get TinhTrangKhachHang() {
    return this.ThanhToan.get('TinhTrangKhachHang');
  }
  noSpecialCharValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const invalidChar = /^[^\d~`!@#$%\^&*()_+=\-\[\]\\';,/{}|\\":<>\?]*$/.test(control.value);
      return invalidChar ? null : { 'invalidChar': { value: control.value } };
    };
  }
  checkCCCD(): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> => {
      if (control.value.length === 12) {
        var NguoiDung = this.nguoiDung.LayNguoiDungTuLocalStorage();
        if (NguoiDung && NguoiDung.idKhachHang != '') {
          if (control.value != NguoiDung?.soDienThoai) {
            return this.KhachhangService.checkCCCDCuaKhachHang(control.value).toPromise().then(data => {
              return data ? { 'invalidCCCD': true } : null;
            }).catch(err => {
              console.error(err);
              return null;
            });
          }
        }
        if (!NguoiDung) {
          return this.KhachhangService.checkCCCDCuaKhachHang(control.value).toPromise().then(data => {
            return data ? { 'invalidCCCD': true } : null;
          }).catch(err => {
            console.error(err);
            return null;
          });
        }
        return Promise.resolve(null);
      } else {
        return Promise.resolve(null);
      }
    };
  }
  checkSDT(): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> => {
      if (control.value.length === 10) {
        var NguoiDung = this.nguoiDung.LayNguoiDungTuLocalStorage();
        if (NguoiDung && NguoiDung.idKhachHang != '') {
          if (control.value != NguoiDung?.soDienThoai) {
            return this.KhachhangService.checkSDTCuaKhachHang(control.value).toPromise().then(data => {
              return data ? { 'invalidSDT': true } : null;
            }).catch(err => {
              console.error(err);
              return null;
            });
          }
        }
        if (!NguoiDung) {
          return this.KhachhangService.checkSDTCuaKhachHang(control.value).toPromise().then(data => {
            return data ? { 'invalidSDT': true } : null;
          }).catch(err => {
            console.error(err);
            return null;
          });
        }
        return Promise.resolve(null);
      } else {
        return Promise.resolve(null);
      }
    };
  }
  checkEmail(): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> => {
      if (control.value.length >= 10) {
        var NguoiDung = this.nguoiDung.LayNguoiDungTuLocalStorage();
        if (NguoiDung && NguoiDung.idKhachHang != '') {
          if (control.value != NguoiDung?.soDienThoai) {

            return this.KhachhangService.checkEmailCuaKhachHang(control.value).toPromise().then(data => {
              return data ? { 'invalidEmail': true } : null;
            }).catch(err => {
              console.error(err);
              return null;
            });
          }
        }
        if (!NguoiDung) {
          return this.KhachhangService.checkEmailCuaKhachHang(control.value).toPromise().then(data => {
            return data ? { 'invalidEmail': true } : null;
          }).catch(err => {
            console.error(err);
            return null;
          });
        }
        return Promise.resolve(null);
      } else {
        return Promise.resolve(null);
      }
    };
  }
  XacNhanDatTour() {
    // this.isfalse = !this.isfalse;
    this.DatTourChoKhachHang();
    this.toastr.success('Đặt tour thành công', 'Thông báo', {
      timeOut: 1000,
    });
    this.router.navigateByUrl('/trangchu');

  }
  DatTourChoKhachHang() {
    this.datTourKhachHang = {
      IdDatTour: 'DLRamDom',
      IdTour: this.ItemTourById.idTour,
      SoLuongNguoiLon: this.Sl_NguoiLon_ThanhToan,
      SoLuongTreEm: this.Sl_TreEm_ThanhToan,
      ThoiGianDatTour: new Date().toISOString(),
      TinhTrangDatTour: 'Đang đợi duyệt',
      IdKhachHang: this.ThanhToan.get('IdKhachHang')?.value ?? '',
      TenKhachHang: this.ThanhToan.get('TenKhachHang')?.value ?? '',
      SoDienThoai: this.ThanhToan.get('SoDienThoai')?.value ?? '',
      DiaChi: this.ThanhToan.get('DiaChi')?.value ?? '',
      CCCD: this.ThanhToan.get('CCCD')?.value ?? '',
      NgaySinh: this.ThanhToan.get('NgaySinh')?.value ?? '',
      GioiTinh: this.ThanhToan.get('GioiTinh')?.value ?? '',
      Email: this.ThanhToan.get('Email')?.value ?? '',
      TinhTrangKhachHang: this.ThanhToan.get('TinhTrangKhachHang')?.value ?? '',
      NgayDangKy: new Date().toISOString(),
      DichVuChiTiet: this.TongDichVu_Db.map(dichvu => ({
        IdDichVuChiTiet: '12121',
        IdDichVu: dichvu.idDichVu,
        ThoiGianDichVu: new Date().toISOString(),
        SoLuong: dichvu.soLuong
      })),


    };
    this.datTourChoKhachHangServices.DatTourChoKhachHang(this.datTourKhachHang).subscribe(
      (data: any) => {
        // 'data' chính là dữ liệu trả về từ server

        console.log(data);
      },
      (error: any) => {
        // 'error' chính là lỗi (nếu có) khi gọi API
        console.log(error);
      }
    );

    this.ChuyenTrangThaiNut();
  }

  ChuyenTrangThaiNut() {
    this.isfalse = !this.isfalse;
  }
  //khai báo tổng tiền dịch vụ
  TongTienDichVu: number = 0;
  TinhTienDichVu() {
    console.log('s');

    //reset khi tính tiền 
    this.TongTienDichVu = 0;
    this.TongDichVu_Db.forEach(element => {
      this.TongTienDichVu += element.giaTien * element.soLuong;
    });
    this.TinhTongTienTour();
  }
  //khai báo tổng tiền
  TongTienTour: number = 0;
  TinhTongTienTour() {
    this.TongTienTour = 0;
    this.TongTienTour = this.TongTienDichVu + (this.Sl_NguoiLon_ThanhToan * this.ItemTourById.giaNguoiLon) + (this.Sl_TreEm_ThanhToan * this.ItemTourById.giaTreEm);
  }

}

