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
    private dichVuChiTiet: DichVuChiTietService) {

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
    // console.log(this.datTour)
    this.suaTiepNhanDatTour.get('idDatTour')?.setValue(this.datTour.idDatTour);
    this.suaTiepNhanDatTour.get('idKhachHang')?.setValue(this.datTour.idKhachHang);
    this.suaTiepNhanDatTour.get('idTour')?.setValue(this.datTour.idTour);
    this.suaTiepNhanDatTour.get('soLuongNguoiLon')?.setValue(this.datTour.soLuongNguoiLon);
    this.suaTiepNhanDatTour.get('soLuongTreEm')?.setValue(this.datTour.soLuongTreEm);
    this.suaTiepNhanDatTour.get('ghiChu')?.setValue(this.datTour.ghiChu);
    this.suaTiepNhanDatTour.get('idNhanVien')?.setValue(this.datTour.idNhanVien);

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

    })

  }
  //


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
        this.ThemDichVu();
        this._ngDichVuDaChon[count] = element.idDichVu;
        this._ngSoLuongDaChon[count] = element.soLuong;
        console.log(this._ngDichVuDaChon);
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
  Sl_NguoiLon_ThanhToan: number = 1; // gán =  sl đã đặt trước đó
  Sl_TreEm_ThanhToan: number = 1;// gán =  sl đã đặt trước đó

  XoaDichVuDaChon(i: any) {
    this.TongDichVu.splice(i, 1);
    this._ngDichVuDaChon.splice(i, 1);
    this.TongDichVu_Db.splice(i, 1);
    this._ngSoLuongDaChon.splice(i, 1);
    this.TinhTienDichVu();

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
