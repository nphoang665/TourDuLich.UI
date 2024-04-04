import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { DattourService } from '../../../services/DatTour/dattour.service';
import { TourDuLich } from '../../../models/tour-du-lich.model';
import { DatTour } from '../../../models/dat-tour.model';
import { Observable } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { SuaDatTour } from '../../../models/suaDatTour.model';
import { DichVu } from '../../../models/Dich-Vu.model';
import { DichvuService } from '../../../../GiaoDienAdmin/services/DichVu/dichvu.service';
import { DichVuChiTietService } from '../../../services/DichVuChiTiet/dich-vu-chi-tiet.service';
import { DichVuChiTietDto, ThemDichVuChiTietRequestDto } from '../../../models/dich-vu-chi-tiet.model';
import { NguoiDungService } from '../../../services/NguoiDung/nguoi-dung.service';
import { ToastrService } from 'ngx-toastr';
interface DichVuThemVaoDb {
  idDihVuChiTiet: string;
  idDichVu: string;
  soLuong: number;
  giaTien: number;

}
@Component({
  selector: 'app-sua-tiep-nhan-dat-tour',
  templateUrl: './sua-tiep-nhan-dat-tour.component.html',
  styleUrl: './sua-tiep-nhan-dat-tour.component.css'
})
export class SuaTiepNhanDatTourComponent implements OnInit {
  constructor(private route: ActivatedRoute,
    private datTourService: DattourService,
    private dichVuServices: DichvuService,
    private dichVuChiTiet: DichVuChiTietService,
    private nguoiDungServices: NguoiDungService,
    private toastr: ToastrService,
    private router:Router

  ) {

  }
  id!: string;
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.getDuLieu();
      this.GetDichVu();

    })
  }

  datTour: any = {};

  suaTiepNhanDatTour: FormGroup = new FormGroup({
    idDatTour: new FormControl(''),
    idKhachHang: new FormControl(''),
    idTour: new FormControl(''),
    soLuongNguoiLon: new FormControl(''),
    soLuongTreEm: new FormControl(''),
    ghiChu: new FormControl(''),
    idNhanVien: new FormControl(''),
    thoiGianDatTour: new FormControl(new Date()),
    khachHang: new FormControl(''),
    tinhTrang: new FormControl(''),
  });
  //
  hienThongTin() {
    this.suaTiepNhanDatTour.getRawValue();
    const nguoiDung = this.nguoiDungServices.LayNguoiDungTuLocalStorage();
    // console.log(this.datTour)


    this.suaTiepNhanDatTour.get('idDatTour')?.setValue(this.datTour.idDatTour);
    this.suaTiepNhanDatTour.get('idKhachHang')?.setValue(this.datTour.idKhachHang);
    this.suaTiepNhanDatTour.get('idTour')?.setValue(this.datTour.idTour);
    this.suaTiepNhanDatTour.get('soLuongNguoiLon')?.setValue(this.datTour.soLuongNguoiLon);
    this.suaTiepNhanDatTour.get('soLuongTreEm')?.setValue(this.datTour.soLuongTreEm);
    this.suaTiepNhanDatTour.get('ghiChu')?.setValue(this.datTour.ghiChu);
    if (this.datTour.idNhanVien) {
      this.suaTiepNhanDatTour.get('idNhanVien')?.setValue(this.datTour.idNhanVien);
    }
    else {
      this.suaTiepNhanDatTour.get('idNhanVien')?.setValue(nguoiDung.idNhanVien);

    }

    let thoiGianDatTour = new Date(this.datTour.thoiGianDatTour);
    let formattedDate = thoiGianDatTour.getFullYear() + '-' + ('0' + (thoiGianDatTour.getMonth() + 1)).slice(-2) + '-' + ('0' + thoiGianDatTour.getDate()).slice(-2);
    let formattedTime = ('0' + thoiGianDatTour.getHours()).slice(-2) + ':' + ('0' + thoiGianDatTour.getMinutes()).slice(-2) + ':' + ('0' + thoiGianDatTour.getSeconds()).slice(-2);
    this.suaTiepNhanDatTour.get('thoiGianDatTour')?.setValue(formattedDate + 'T' + formattedTime);


    this.suaTiepNhanDatTour.get('tinhTrang')?.setValue(this.datTour.tinhTrang);
  }
  //
  suaDatTour() {
    this.suaTiepNhanDatTour.getRawValue();
    let DatTour: SuaDatTour = {
      IdDatTour: this.suaTiepNhanDatTour.controls['idDatTour'].value,
      IdKhachHang: this.suaTiepNhanDatTour.controls['idKhachHang'].value,
      IdTour: this.suaTiepNhanDatTour.controls['idTour'].value,
      SoLuongNguoiLon: this.suaTiepNhanDatTour.controls['soLuongNguoiLon'].value,
      SoLuongTreEm: this.suaTiepNhanDatTour.controls['soLuongTreEm'].value,
      GhiChu: this.suaTiepNhanDatTour.controls['ghiChu'].value,
      ThoiGianDatTour: this.suaTiepNhanDatTour.controls['thoiGianDatTour'].value,
      TinhTrang: this.suaTiepNhanDatTour.controls['tinhTrang'].value,
      IdNhanVien: this.suaTiepNhanDatTour.controls['idNhanVien'].value,
    }


    this.datTourService.putDatTour(DatTour, this.id).subscribe((data: any) => {
      console.log(data);
      this.toastr.success('Sửa đặt tour thành công', 'Thông báo', {
        timeOut: 1000,
      });
      this.router.navigateByUrl('/tiepNhanDatTour');
    });
    this.LuuDichVuChiTietVaoDb(DatTour);

  }
  //

  LuuDichVuChiTietVaoDb(DatTour: SuaDatTour) {
    const db_ObjDichVuChiTiet: ThemDichVuChiTietRequestDto[] = [];
    let dichVuChiTiet: ThemDichVuChiTietRequestDto;
    // console.log(this.nguoiDungServices.LayNguoiDungTuLocalStorage());
    const nguoiDung = this.nguoiDungServices.LayNguoiDungTuLocalStorage();
    if (nguoiDung) {


      this.TongDichVu_Db.forEach(element => {
        dichVuChiTiet = {
          idDichVuChiTiet: 'test',
          idDichVu: element.idDichVu,
          soLuong: element.soLuong,
          thoiGianDichVu: new Date().toISOString(),
          idKhachHang: this.datTour.idKhachHang,
          idDatTour: this.datTour.idDatTour,
          idNhanVien: nguoiDung.idNhanVien,
        }
        db_ObjDichVuChiTiet.push(dichVuChiTiet);
      });
      //push vào mảng
      this.dichVuChiTiet.LuuDichVuChiTietVaoDb(DatTour.IdDatTour, db_ObjDichVuChiTiet).subscribe((data: any) => {
        alert(data);

      });
      console.log(this.TongDichVu_Db);


    }
    else {
      alert('Người dùng không tồn tại');
    }





    // this.dichVuChiTiet.LuuDichVuChiTietVaoDb(DatTour.IdDatTour, )
  }


  getDuLieu() {

    this.datTourService.getDatTourByIdDatTour(this.id).subscribe((data: any) => {
      this.datTour = data;
      this.hienThongTin();

      this.dichVuChiTiet.GetDichVuChiTietById(this.datTour.idDatTour).subscribe((resultDichVuChiTiet: any) => {
        this.dichVuDaDatTrongDatTour = resultDichVuChiTiet;

        this.ThucHienFillDataCoSan();
      });
    })
  }

  //module dịch vụ
  n: number = 0;
  DichVu: any[] = [];
  _ngDichVuDaChon: string[] = [];
  TongDichVu: any[] = [];
  //mảng được tách để lưu vào db
  TongDichVu_Db: DichVuThemVaoDb[] = [];
  _ngSoLuongDaChon: number[] = [];
  dichVuDaDatTrongDatTour: any[] = [];

  GetDichVu() {
    this.dichVuServices.LayDichVuMau().subscribe((data: DichVu[]) => {
      this.DichVu = data;
      //kiểm tra dịch vụ có trong đặt tour này chưa 


    });
  }
  ThucHienFillDataCoSan() {
    if (this.dichVuDaDatTrongDatTour) {
      let count = 0;
      this.dichVuDaDatTrongDatTour.forEach((element: any) => {
        // console.log(element);
        //gọi hàm để thêm mới 1 dịch vụ
        this.ThemDichVu();
        //gán id dịch vụ để hiển thị 
        this._ngDichVuDaChon[count] = element.idDichVu;
        //gán vào số lượng hiển thị
        this._ngSoLuongDaChon[count] = element.soLuong;
        //gán vào db tổng dịch vụ để thao tác tăng số lượng và lưu vào db
        this.TongDichVu_Db[count].soLuong = element.soLuong,
          // console.log(this._ngDichVuDaChon);
          count++;
      })
    }
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
