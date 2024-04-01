import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { KhachHang, SuaKhachHang } from '../../models/khach-hang.model';
import { ActivatedRoute, Router } from '@angular/router';
import { KhachhangService } from '../../services/KhachHang/khachhang.service';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-sua-khach-hang',
  templateUrl: './sua-khach-hang.component.html',
  styleUrl: './sua-khach-hang.component.css'
})
export class SuaKhachHangComponent implements OnInit {
  suaKhachHangForm:FormGroup = new FormGroup({
    tenKhachHang: new FormControl(''),
    soDienThoai: new FormControl(''),
    diaChi: new FormControl(''),
    cccd: new FormControl(''),
    ngaySinh: new FormControl(new Date()),
    gioiTinh: new FormControl(''),
    email: new FormControl(''),
    tinhTrang: new FormControl(''),
    ngayDangKy: new FormControl(new Date()),
  });

  model?:KhachHang;

  id?:string | null = null;
  inputdata: any;

  constructor(
    private quanLyKhachHangSerice:KhachhangService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<SuaKhachHangComponent>,
    ){}
  ngOnInit(): void {
    this.inputdata = this.data;
    this.id = this.data.idKhachHang;
    if (this.id) {
      this.quanLyKhachHangSerice.getKhachHangById(this.id).subscribe((data: KhachHang) => {
        if (data) {
          this.model = data;
          this.initalizeForm();
        } else {
          console.error('không tìm thấy dịch vụ', this.id);
        }
      });
    }
  }
  initalizeForm():void{
    this.suaKhachHangForm = new FormGroup({
      tenKhachHang: new FormControl(this.model?.tenKhachHang),
      soDienThoai: new FormControl(this.model?.soDienThoai),
      diaChi: new FormControl(this.model?.diaChi),
      cccd: new FormControl(this.model?.cccd),
      ngaySinh: new FormControl(this.model?.ngaySinh),
      gioiTinh: new FormControl(this.model?.gioiTinh),
      email: new FormControl(this.model?.email),
      tinhTrang: new FormControl(this.model?.tinhTrang),
      ngayDangKy: new FormControl(this.model?.ngayDangKy),
    })
  }
  ClosePopup() {
    this.ref.close();
  }

  SuaKhachHang(event: Event) {

    if (this.model && this.id) {
      const suaKhachHang: SuaKhachHang = { ...this.suaKhachHangForm.value };
      this.quanLyKhachHangSerice.suaKhachHang(this.id, suaKhachHang).subscribe((response) => {
        console.log(response);
        this.toastr.success('Sửa khách hàng thành công', 'Thông báo', {
          timeOut: 1000,
        });
      })
      this.ref.close();
    }
  }
}
