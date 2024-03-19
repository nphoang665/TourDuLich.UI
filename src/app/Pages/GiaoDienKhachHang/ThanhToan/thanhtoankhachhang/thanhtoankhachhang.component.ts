import { Component, ElementRef, OnInit, QueryList, ViewChild } from '@angular/core';
import { DichVuTestDataService } from '../../services/dich-vu-test-data.service';
interface DichVuThemVaoDb {
  IdDichVu: string;
  SoLuong: number;
}

@Component({
  selector: 'app-thanhtoankhachhang',
  templateUrl: './thanhtoankhachhang.component.html',
  styleUrl: './thanhtoankhachhang.component.css'
})
export class ThanhtoankhachhangComponent implements OnInit {
  constructor(private dichVuServices: DichVuTestDataService) { }
  n: number = 0;
  DichVu: any[] = [];
  _ngDichVuDaChon: string[] = [];
  TongDichVu: any[] = [];
  //mảng được tách để lưu vào db
  TongDichVu_Db: DichVuThemVaoDb[] = [];
  //khai báo số lượng người dùng chọn
  _ngSoLuongDaChon: number[] = [];

  ngOnInit(): void {
    this.GetDichVu();

  }

  GetDichVu() {
    this.DichVu = this.dichVuServices.LayDichVuMau();
  }

  ThemDichVu() {
    this.TongDichVu.push('');
    this._ngDichVuDaChon.push('');
    const servicesMoi: DichVuThemVaoDb = {
      IdDichVu: '',
      SoLuong: 1
    };
    //lấy index cuối cùng của thêm dịch vụ
    this._ngSoLuongDaChon[this.TongDichVu_Db.length] = 1;
    console.log(this._ngSoLuongDaChon);
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
    this.TongDichVu_Db[index].IdDichVu = this._ngDichVuDaChon[index];
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
      this.TongDichVu_Db[index].SoLuong++;
      this._ngSoLuongDaChon[index] = this.TongDichVu_Db[index].SoLuong;
    }
    //nếu loại nút bấm là trừ
    else {
      if (this.TongDichVu_Db[index].SoLuong > 1) {
        this.TongDichVu_Db[index].SoLuong--;
        this._ngSoLuongDaChon[index] = this.TongDichVu_Db[index].SoLuong;
      }
    }
  }
}

