import { Component, OnInit } from '@angular/core';
import { KhachHang } from '../../models/khach-hang.model';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { QuanLyTourService } from '../../services/quan-ly-tour.service';
import { KhachhangService } from '../../services/KhachHang/khachhang.service';
import { DattourService } from '../../services/DatTour/dattour.service';
import { HttpClient } from '@angular/common/http';
import { ThanhToanService } from '../../services/ThanhToan/thanh-toan.service';
import { Observable, map, startWith } from 'rxjs';
import { TourDuLich } from '../../models/tour-du-lich.model';
import { environment } from '../../../../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { DichvuService } from '../../../GiaoDienAdmin/services/DichVu/dichvu.service';
import { DichVu } from '../../models/Dich-Vu.model';
import { DichVuChiTietDto, ThemDichVuChiTietRequestDto } from '../../models/dich-vu-chi-tiet.model';
import { NguoiDungService } from '../../services/NguoiDung/nguoi-dung.service';
import { DichVuChiTietService } from '../../services/DichVuChiTiet/dich-vu-chi-tiet.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { DichVuChiTiet } from '../../models/dat-tour-khach-hang.model';
import { FormsModule, ValidatorFn, } from '@angular/forms';
import { ReactiveFormsModule, Validator, AbstractControl } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { NhanVienService } from '../../services/NhanVien/nhan-vien.service';
import { NhanVien } from '../../models/nhan-vien.model';
import { DatTour } from '../../models/dat-tour.model';
import { log } from 'console';
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
interface DichVuThemVaoDb {
  idDihVuChiTiet: string;
  idDichVu: string;
  soLuong: number;
  giaTien: number;

}
const icon_DauTru = `
<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M9 12H15" stroke="#323232" stroke-width="1.224" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
`;
const icon_DauCong = `
<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <rect width="24" height="24" ></rect> <path d="M12 6V18" stroke="#000000" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M6 12H18" stroke="#000000" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
`
const icon_Xoa = `
<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><defs><style> .cls-1 { fill: #9f4c4c; fill-rule: evenodd; } </style></defs><path class="cls-1" d="M940,510a30,30,0,1,1,30-30A30,30,0,0,1,940,510Zm15-20.047A3.408,3.408,0,0,1,955,494.77l-0.221.22a3.42,3.42,0,0,1-4.833,0l-8.764-8.755a1.71,1.71,0,0,0-2.417,0l-8.741,8.747a3.419,3.419,0,0,1-4.836,0l-0.194-.193a3.408,3.408,0,0,1,.017-4.842l8.834-8.735a1.7,1.7,0,0,0,0-2.43l-8.831-8.725a3.409,3.409,0,0,1-.018-4.844l0.193-.193a3.413,3.413,0,0,1,2.418-1c0.944,0,3.255,1.835,3.872,2.455l7.286,7.287a1.708,1.708,0,0,0,2.417,0l8.764-8.748a3.419,3.419,0,0,1,4.832,0L955,465.243a3.408,3.408,0,0,1,0,4.818l-8.727,8.737a1.7,1.7,0,0,0,0,2.407Z" id="uncheck" transform="translate(-910 -450)"></path></g></svg>
`;
const MIN_DATE = new Date(2024, 3, 1); // Set your minimum date here
@Component({
  selector: 'app-quanlydattour',
  templateUrl: './quanlydattour.component.html',
  styleUrls: ['./quanlydattour.component.css']
})
export class QuanlydattourComponent implements OnInit {
  //table thông tin tuor
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['soChoNguoiLon', 'soChoTreEm', 'giaNguoiLon', 'giaTreEm'];
  NguoiDung: any;

  mauButton = 0;

  selectedStatus: string = '';
  filteredTours: any[] = [];
  filterTours() {
    if (this.selectedStatus === '') {
      this.filteredTours = this.TourDuLich;
      this.mauButton = 0;
    } else if (this.selectedStatus === 'Đang hoạt động') {
      this.filteredTours = this.TourDuLich.filter(tour => tour.tinhTrang === this.selectedStatus);
      this.mauButton = 1;
    }
    else if (this.selectedStatus === 'Tạm hoãn') {
      this.filteredTours = this.TourDuLich.filter(tour => tour.tinhTrang === this.selectedStatus);
      this.mauButton = 2;
    }
  }
  matcher = new MyErrorStateMatcher();


  // themKhachHang: KhachHang;
  myForm: FormGroup = new FormGroup({
    idKhachHang: new FormControl('231233'),
    tenKhachHang: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(50),
      this.noSpecialCharValidator(),
    ]),
    soDienThoai: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),

    ]),
    diaChi: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(50),

    ]),
    cccd: new FormControl('', [
      Validators.required,
      Validators.minLength(0),
      Validators.maxLength(16),

    ]),
    ngaySinh: new FormControl('',
      Validators.required,
      ),
    gioiTinh: new FormControl('',
      Validators.required),
    email: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(50),

    ]),
    tinhTrang: new FormControl('Đang hoạt động'),
  });
  get tenKhachHang() {
    return this.myForm.get('tenKhachHang');
  }
  get soDienThoai() {
    return this.myForm.get('soDienThoai');
  }
  get cccd() {
    return this.myForm.get('cccd');
  }
  get diaChi() {
    return this.myForm.get('diaChi');
  }
  get ngaySinh() {
    return this.myForm.get('ngaySinh');

  }
  get email() {
    return this.myForm.get('email');

  }
  get gioiTinh() {
    return this.myForm.get('gioiTinh');

  }
  get tinhTrang() {
    return this.myForm.get('tinhTrang');

  }
  noSpecialCharValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const invalidChar = /^[^\d~`!@#$%\^&*()_+=\-\[\]\\';,/{}|\\":<>\?]*$/.test(control.value);
      return invalidChar ? null : { 'invalidChar': { value: control.value } };
    };
  }
  
  constructor(private quanLyTourService: QuanLyTourService,
    private quanLyKhachHangServices: KhachhangService,
    private dichVuServices: DichvuService,
    private datTourService: DattourService,
    private http: HttpClient,
    private thanhToanService: ThanhToanService,
    private nguoiDungServices: NguoiDungService,
    private toastr: ToastrService,
    private dichVuChiTietServices: DichVuChiTietService,
    private router: Router,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    private nhanvienServices: NhanVienService
  ) {
    var ngayGioHienTai = new Date();
    var ngayGioHienTaiFormatted = ngayGioHienTai.toISOString();
    iconRegistry.addSvgIconLiteral('icon_DauTru', sanitizer.bypassSecurityTrustHtml(icon_DauTru));
    iconRegistry.addSvgIconLiteral('icon_DauCong', sanitizer.bypassSecurityTrustHtml(icon_DauCong));
    iconRegistry.addSvgIconLiteral('icon_Xoa', sanitizer.bypassSecurityTrustHtml(icon_Xoa));
  }
  //disable khách hàng ở thêm đặt tour khi có ở thêm khách hàng
  checkValue() {
    let formValues = { ...this.myForm.getRawValue() };
    delete formValues.tinhTrang; // loại bỏ trường 'tinhTrang'

    const allFieldsEmpty = Object.values(formValues).every(x => (x == null || x == ''));

    if (allFieldsEmpty) {
      this.KhachHang.enable();
    } else {
      this.KhachHang.disable();
    }
  }
  getTinhTrangClass(tinhTrang: string): string {
    switch (tinhTrang) {
      case 'Đang hoạt động':
        return 'bg-success';
      case 'Ngưng hoạt động':
        return 'bg-danger';
      case 'Tạm hoãn':
        return 'bg-warning';
      default:
        return '';
    }
  }
  TypingKhachHang() {
    this.checkValue();
  }
  // Tạo mới arr Khách hàng
  khachHang$?: Observable<KhachHang[]>;
  // arrKhachHang: any[] = [];
  tourDuLich$?: Observable<TourDuLich[]>;
  //khai báo TourDuLich để html sử dụng hiển thị
  TourDuLich: any[] = [];
  ngOnInit(): void {
    this.NguoiDung = this.nguoiDungServices.LayNguoiDungTuLocalStorage();
    this.tourDuLich$ = this.quanLyTourService.getAllTourDuLich();
    this.tourDuLich$.subscribe((data: TourDuLich[]) => {
      this.TourDuLich = data;
      this.filterTours();
      this.TourDuLich.forEach(element => {
        var urlFirstImgTour = environment.apiBaseUrl + '/uploads/' + element.anhTour[0].imgTour;
        element.AnhTourDauTien = urlFirstImgTour;
        element.SoNgayDem = this.calculateDaysAndNights(element.thoiGianBatDau, element.thoiGianKetThuc);
      });
    });
    this.GetDichVu();
    this.KiemTraChonKhachHangThanhToan();
    //Get data tableThongTinTour
    this.dataSource.data = [
      { soChoNguoiLon: 1, soChoTreEm: 2, giaNguoiLon: this.model?.giaNguoiLon, giaTreEm: this.model?.giaTreEm }
    ];
  }
  //xử lý select khách hàng
  IdKhachHang!: string;
  KhachHang = new FormControl();
  optionsKhachHang: KhachHang[] = []; // Danh sách các tùy chọn cho autocomplete
  filteredOptionsKhachHang!: Observable<KhachHang[]>;
  LayKhachHang(idTour: string) {
    this.quanLyKhachHangServices.getAllKhachHang().subscribe(khachhangs => {
      //lọc những khách hàng đã đặt cùng idtour và id khách hàng trừ tình trạng đã từ chối 
      //  data need to test [khachhangs ]
      //đầu tiên lấy những khách hàng nào đã đăt tour và đã đặt tour đó có tình trạng từ chối
      this.datTourService.getAllDatTour().subscribe((resDatTour: any) => {
        let arrKhachHangCopy = [...khachhangs];
        arrKhachHangCopy.forEach(element => {
          let existsKhachHang = resDatTour.find((datTour: any) => datTour.idTour == idTour && datTour.idKhachHang == element.idKhachHang);
          if (existsKhachHang) {
            if (existsKhachHang.tinhTrang != 'Đã từ chối' && existsKhachHang.tinhTrang != 'Đã thanh toán') {
              for (let index = 0; index < arrKhachHangCopy.length; index++) {
                if (arrKhachHangCopy[index].idKhachHang === existsKhachHang.idKhachHang) {
                  arrKhachHangCopy.splice(index, 1);
                }
              }
            }
          }
        });
        khachhangs = arrKhachHangCopy;
        console.log(arrKhachHangCopy);
        this.optionsKhachHang = khachhangs;
        if (this.KhachHang) {
          this.filteredOptionsKhachHang = this.KhachHang.valueChanges.pipe(
            startWith(''),
            map(value => value && typeof value === 'string' ? value : value?.tenKhachHang),
            map(name => name ? this._filter(name) : this.optionsKhachHang.slice())
          );
        }
      })

    })
  }
  displayFnKhachHang(kh: KhachHang): string {
    return kh && kh.tenKhachHang && kh.email ? `${kh.tenKhachHang}` : '';
  }
  private _filter(value: string): KhachHang[] {
    const filterValue = value.toLowerCase();
    // Lọc các tùy chọn dựa trên đoạn văn bản tìm kiếm
    let filteredOptions = this.optionsKhachHang.filter(option => {
      // Kiểm tra xem người dùng đã nhập tên khách hàng, email, cccd hay soDienThoai
      const isTenKhachHang = option.tenKhachHang.toLowerCase().includes(filterValue);
      const isEmail = option.email.toLowerCase().includes(filterValue);
      const isCccd = option.cccd.toLowerCase().includes(filterValue);
      const isSoDienThoai = option.soDienThoai.toLowerCase().includes(filterValue);
      switch (true) {
        case isTenKhachHang && !isEmail && !isCccd && !isSoDienThoai:
          return option.tenKhachHang.toLowerCase().includes(filterValue);
        case !isTenKhachHang && isEmail && !isCccd && !isSoDienThoai:
          return option.email.toLowerCase().includes(filterValue);
        case !isTenKhachHang && !isEmail && isCccd && !isSoDienThoai:
          return option.cccd.toLowerCase().includes(filterValue);
        case !isTenKhachHang && !isEmail && !isCccd && isSoDienThoai:
          return option.soDienThoai.toLowerCase().includes(filterValue);
        default:
          return (option.tenKhachHang.toLowerCase() + ' ' + option.email.toLowerCase() + ' ' + option.cccd.toLowerCase() + ' ' + option.soDienThoai.toLowerCase()).includes(filterValue);
      }
    });
    // Sắp xếp các tùy chọn dựa trên mức độ phù hợp với đoạn văn bản tìm kiếm
    filteredOptions.sort((a, b) =>
      (b.tenKhachHang.toLowerCase() + ' ' + b.email.toLowerCase() + ' ' + b.cccd.toLowerCase() + ' ' + b.soDienThoai.toLowerCase()).indexOf(filterValue) -
      (a.tenKhachHang.toLowerCase() + ' ' + a.email.toLowerCase() + ' ' + a.cccd.toLowerCase() + ' ' + a.soDienThoai.toLowerCase()).indexOf(filterValue)
    );
    return filteredOptions;
  }




  TourDuLichById: any;
  model?: TourDuLich;
  NgayDatTour!: string;
  SoLuongNguoiLon_DatTour: number = 1;
  SoLuongTreEm_DatTour: number = 0;
  SoNgayDem: string = '';
  TongTien_DatTour!: number;
  //hàm lấy tour theo id
  LayTourDuLich(idTour: string) {


    this.quanLyTourService.getTourDuLichById(idTour).subscribe((data: TourDuLich) => {
      this.model = data;
      this.LayKhachHang(idTour);

      //gọi services xử lý số lượng người dùng
      this.datTourService.tinhSoLuongNguoiConNhan(idTour).subscribe({
        next: (responseTinhSoLuongNguoiConNhan: any) => {
          if (this.model) {
            this.model.soLuongNguoiLon = responseTinhSoLuongNguoiConNhan.TongSoLuongNguoiLonDaDatTrongTour;
            this.model.soLuongTreEm = responseTinhSoLuongNguoiConNhan.TongSoLuongTreEmDaDatTrongTour;
            this.model.soChoConNhan = responseTinhSoLuongNguoiConNhan.SoChoConNhanTrongTour;
          }
        },
        error: (err: any) => {
          console.error(err);
        }
      })
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
    this.TongTien_DatTour = (this.SoLuongNguoiLon_DatTour * Number(this.model?.giaNguoiLon.replace(/,/g, ''))) + (this.SoLuongTreEm_DatTour * Number(this.model?.giaTreEm.replace(/,/g, '')) + (this.TongTienDichVu || 0));
    // console.log(this.TongTien_DatTour);

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
    let formValues = { ...this.myForm.getRawValue() };
    delete formValues.tinhTrang; // loại bỏ trường 'tinhTrang'

    const allFieldsEmpty = Object.values(formValues).every(x => (x == null || x == ''));
    //nếu khách hàng cũ có value
    if (this.KhachHang.value) {
      this.onDatTour(null);
      return;
    }
    else if (!allFieldsEmpty) {
      this.onSubmitThemKhachHang();
      return;
    }
    //nếu thêm khách hàng có value
    else if (!this.KhachHang.value) {

      alert('Không có thông tin khách hàng cũ');
    }
    else {
      alert('Không có thông tin khách hàng mới');

    }

    // this.onSubmitThemKhachHang();
  }
  //hàm thêm khách hàng
  //biến chứa khách hàng reponse 
  onSubmitThemKhachHang() {
    let formValue = { ...this.myForm.value };
    formValue.cccd = String(formValue.cccd);
    this.quanLyKhachHangServices.themKhachHang(formValue)
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
    if (this.NguoiDung) {
      // console.log(this.KhachHang.value, khachHangRes);

      let dataToSave = {
        idDatTour: '123',
        idTour: this.model?.idTour,
        idKhachHang: this.KhachHang && this.KhachHang.value ? this.KhachHang.value.idKhachHang : khachHangRes.idKhachHang,
        thoiGianDatTour: this.NgayDatTour,
        soLuongNguoiLon: this.SoLuongNguoiLon_DatTour,
        soLuongTreEm: this.SoLuongTreEm_DatTour,
        ghiChu: this.GhiChu_DatTour,
        tinhTrang: 'Đã đặt tour',
        idNhanVien: this.NguoiDung.idNhanVien
      };
      // console.log(dataToSave);
      this.http.post<any>(`${environment.apiBaseUrl}/api/datTour?addAuth=true`, dataToSave)
        .subscribe(response => {
          // console.log(response);
          if (this.TongDichVu_Db.length > 0) {
            this.onThemDichVuChiTiet(response);
          }

          this.toastr.success('Đặt tour thành công', 'Thông báo', {
            timeOut: 1000,
          });
          return;
        });
    } else {
      this.toastr.warning('Chưa có thông tin nhân viên', 'Thông báo', {
        timeOut: 1000,
      });
    }
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
  Tour_ThanhToan: any;
  optionsKhachHangThanhToan: KhachHang[] = []; // Danh sách các tùy chọn cho autocomplete
  filteredOptionsKhachHangThanhToan!: Observable<KhachHang[]>;
  DichVuChiTiet: DichVuChiTietDto[] = [];
  LayThanhToanTourDuLich(idTour: string) {
    //reset tra cứu khách hàng trước đó
    //đoạn code lấy thanh toán
    this.TenKhachHang_ThanhToan.setValue('');
    this.arrKhachHangThanhToan = [];
    this.idTour_ThanhToan = idTour;
    this.datTourService.getDatTourById(idTour).subscribe((data: any) => {
      this.Tour_ThanhToan = data;
      for (let index = 0; index < data.length; index++) {
        if (data[index].tinhTrang != "Đang đợi duyệt" && data[index].tinhTrang != "Đã thanh toán") {
          // console.log(data);

          this.arrKhachHangThanhToan.push(data[index].khachHang);
        }
      }

      if (this.arrKhachHangThanhToan != null) {
        this.optionsKhachHangThanhToan = this.arrKhachHangThanhToan;
        this.filteredOptionsKhachHangThanhToan = this.TenKhachHang_ThanhToan.valueChanges.pipe(
          startWith(''),
          map(value => value && typeof value === 'string' ? value : value?.tenKhachHang),
          map(name => name ? this._filterKhachHangThanhToan(name) : this.optionsKhachHangThanhToan.slice())
        );
      }
    })
    //get dịch vụ chi tiết

  }
  displayFnKhachHang_ThanhToan(kh: KhachHang): string {
    return kh && kh.tenKhachHang && kh.email ? `${kh.tenKhachHang}` : '';
  }
  private _filterKhachHangThanhToan(value: string): KhachHang[] {
    const filterValue = value.toLowerCase();
    // Lọc các tùy chọn dựa trên đoạn văn bản tìm kiếm
    let filteredOptionsThanhToan = this.optionsKhachHangThanhToan.filter(option => {
      // Kiểm tra xem người dùng đã nhập tên khách hàng, email, cccd hay soDienThoai
      const isTenKhachHang = option.tenKhachHang.toLowerCase().includes(filterValue);
      const isEmail = option.email.toLowerCase().includes(filterValue);
      const isCccd = option.cccd.toLowerCase().includes(filterValue);
      const isSoDienThoai = option.soDienThoai.toLowerCase().includes(filterValue);

      switch (true) {
        case isTenKhachHang && !isEmail && !isCccd && !isSoDienThoai:
          return option.tenKhachHang.toLowerCase().includes(filterValue);
        case !isTenKhachHang && isEmail && !isCccd && !isSoDienThoai:
          return option.email.toLowerCase().includes(filterValue);
        case !isTenKhachHang && !isEmail && isCccd && !isSoDienThoai:
          return option.cccd.toLowerCase().includes(filterValue);
        case !isTenKhachHang && !isEmail && !isCccd && isSoDienThoai:
          return option.soDienThoai.toLowerCase().includes(filterValue);
        default:
          return (option.tenKhachHang.toLowerCase() + ' ' + option.email.toLowerCase() + ' ' + option.cccd.toLowerCase() + ' ' + option.soDienThoai.toLowerCase()).includes(filterValue);
      }
    });
    // Sắp xếp các tùy chọn dựa trên mức độ phù hợp với đoạn văn bản tìm kiếm
    filteredOptionsThanhToan.sort((a, b) =>
      (b.tenKhachHang.toLowerCase() + ' ' + b.email.toLowerCase() + ' ' + b.cccd.toLowerCase() + ' ' + b.soDienThoai.toLowerCase()).indexOf(filterValue) -
      (a.tenKhachHang.toLowerCase() + ' ' + a.email.toLowerCase() + ' ' + a.cccd.toLowerCase() + ' ' + a.soDienThoai.toLowerCase()).indexOf(filterValue)
    );

    return filteredOptionsThanhToan;
  }
  //hiển thị toàn bộ thông tin thanh toán
  // đối tượng hiển thị thông tin lên html
  TourThanhToan_HienThi: any;
  LayTourDangThanhToan: any = {};
  ThongTinDichVuThanhToan: DichVuChiTietDto[] = [];
  ThongTinThanhToan() {

    this.TourThanhToan_HienThi = [];
    this.TourThanhToan_HienThi = this.Tour_ThanhToan.filter((s: any) => s.idTour == this.idTour_ThanhToan && s.idKhachHang === this.TenKhachHang_ThanhToan.value.idKhachHang);
    this.nhanvienServices.getNhanVienById(this.TourThanhToan_HienThi[0].idNhanVien).subscribe((resultNhanVien: NhanVien) => {
      this.TourThanhToan_HienThi[0].tenNhanVien = resultNhanVien.tenNhanVien;
      console.log(this.TourThanhToan_HienThi);
    });
    this.quanLyTourService.getTourDuLichById(this.idTour_ThanhToan).subscribe((data: TourDuLich) => {
      this.LayTourDangThanhToan = data;
      this.TongTien_DichVu_ThanhToan = 0;
      this.dichVuChiTietServices.GetAllDichVuChiTietByIdDatTour(this.TourThanhToan_HienThi[0].idDatTour).subscribe((result: DichVuChiTietDto[]) => {
        this.ThongTinDichVuThanhToan = result;
        this.ThongTinDichVuThanhToan.forEach(element => {
          this.TongTien_DichVu_ThanhToan += element.soLuong * element.dichVu.giaTien;
        });
      })
      this.LayTourDangThanhToan.SoNgayDem = this.calculateDaysAndNights(this.LayTourDangThanhToan.thoiGianBatDau, this.LayTourDangThanhToan.thoiGianKetThuc);
      this.TinhTongTienThanhToan();
    });
  }
  KiemTraChonKhachHangThanhToan() {
    this.TenKhachHang_ThanhToan.valueChanges.subscribe(value => {
      if (this.optionsKhachHangThanhToan.indexOf(value) === -1) {
        this.TenKhachHang_ThanhToan.setErrors({ 'invalid': true });
      }
    });

    this.KhachHang.valueChanges.subscribe(value => {
      if (this.optionsKhachHang.indexOf(value) === -1) {
        this.KhachHang.setErrors({ 'invalid': true });
      }
    });

  }
  //tính tổng tiền thanh toán
  TongTien_DichVu_ThanhToan: number = 0;
  TongTien_ThanhToan!: number;
  TinhTongTienThanhToan() {
    //tính tổng tiền dịch vụ
    //
    this.TongTien_ThanhToan = (this.TourThanhToan_HienThi[0].soLuongNguoiLon * Number(this.LayTourDangThanhToan.giaNguoiLon)) + (this.TourThanhToan_HienThi[0].soLuongTreEm * Number(this.LayTourDangThanhToan.giaTreEm) + this.TongTien_DichVu_ThanhToan);
  }
  //hàm thanh toán
  PhuongThucThanhToan!: string;
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
    // let phuongThucThanhToan = '';
    if (traTruocChecked && !traSauChecked) {
      this.PhuongThucThanhToan = 'Trả trước';
    } else if (!traTruocChecked && traSauChecked) {
      this.PhuongThucThanhToan = 'Trả sau';
    }
    const tongTienTour = this.TongTien_ThanhToan;
    const thanhToanData = {
      idThanhToan: 'Test',
      idDatTour: this.TourThanhToan_HienThi[0].idDatTour,
      idKhachHang: this.TenKhachHang_ThanhToan.value.idKhachHang,
      idNhanVien: this.TourThanhToan_HienThi[0].idNhanVien,
      tongTienTour: tongTienTour.toString(),
      tongTienDichVu: this.TongTien_DichVu_ThanhToan.toString(),
      tongTien: tongTienTour.toString(),
      // tinhTrang: 'Đã thanh toán',
      tinhTrang: 'Đã thanh toán',
      ngayThanhToan: ngayGioHienTaiFormatted,
      phuongThucThanhToan: this.PhuongThucThanhToan,
    }
    // biến id đặt tour thanh toán
    let idDatTour = this.TourThanhToan_HienThi[0].idDatTour
    //nếu phương thức thanh toán == trả sau thì thay đổi tình trạng đặt tour thành đợi thanh toán
    // nếu phương thức thanh toán == trả trước thì thay đổi tình trạng đặt tour thành đã thanh toán và lưu vào thanh toán
    // //gọi hàm lấy đặt tour tại đây
    this.datTourService.getDatTourByIdDatTour(idDatTour).subscribe({
      next: (resultDatTour: DatTour) => {
        resultDatTour.TinhTrang = this.PhuongThucThanhToan === 'Trả trước' ? 'Đã thanh toán' : 'Đợi thanh toán';
        console.log(resultDatTour);
        this.datTourService.putDatTour(resultDatTour, idDatTour).subscribe({
          next: (responseSuaTour: any) => {
            console.log(responseSuaTour);
            // nếu sửa thành công
            if (responseSuaTour.tinhTrang == 'Đã thanh toán') {
              console.log(thanhToanData);

              this.thanhToanService.thanhToan(thanhToanData)
                .subscribe({
                  next: (response) => {
                    this.router.navigateByUrl('/quanLyDatTour'),
                      this.toastr.success('Thanh toán thành công', 'Thông báo', {
                        timeOut: 1000,
                      });
                  },
                  error: (err) => {
                    console.log(err);
                    this.toastr.error('Thanh toán thất bại', 'Thông báo', {
                      timeOut: 1000,
                    });
                  }
                })
            }
            this.toastr.success('Sửa đặt tour thành công', 'Thông báo', {
              timeOut: 1000,
            });
          },
          error: (err) => {
            this.toastr.error('Sửa đặt tour thất bại', 'Thông báo', {
              timeOut: 1000,
            });
          }
        })
      },
      error: (err) => {
        this.toastr.error('Lấy đặt tour theo id thất bại', 'Thông báo', {
          timeOut: 1000,
        });
      }
    });

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
    this.TinhTongTien();
  }

  //test services

}
