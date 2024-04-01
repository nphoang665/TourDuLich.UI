import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NhanVienService } from '../../services/NhanVien/nhan-vien.service';
import { NhanVien, SuaNhanVien } from '../../models/nhan-vien.model';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-sua-nhan-vien',
  templateUrl: './sua-nhan-vien.component.html',
  styleUrl: './sua-nhan-vien.component.css'
})
export class SuaNhanVienComponent implements OnInit{
  suaNhanVienForm: FormGroup = new FormGroup({
    tenNhanVien:new FormControl(''),
    soDienThoai:new FormControl(''),
    diaChi:new FormControl(''),
    cccd:new FormControl(''),
    ngaySinh:new FormControl(new Date()),
    email:new FormControl(''),
    gioiTinh:new FormControl(''),
    chucVu:new FormControl(''),
    ngayVaoLam:new FormControl(new Date()),
    anhNhanVien:new FormControl(''),
    tinhTrang:new FormControl(''),
    ngayDangKy:new FormControl(new Date())
  });

  model?:NhanVien;

  id?:string | null = null;
  inputdata: any;

  constructor(
    private route:ActivatedRoute, 
    private toastr: ToastrService,
    private quanLyNhanVien:NhanVienService,
    private router:Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<SuaNhanVienComponent>,
    ){}
  ngOnInit(): void {
    this.inputdata = this.data;
    this.id = this.data.idNhanVien;
    if (this.id) {
      this.quanLyNhanVien.getNhanVienById(this.id).subscribe((data: NhanVien) => {
        if (data) {
          this.model = data;
          this.initalizeForm();
        } else {
          console.error('không tìm thấy dịch vụ', this.id);
        }
      });
    }
  }
  initalizeForm(): void {
    this.suaNhanVienForm = new FormGroup({
      tenNhanVien: new FormControl(this.model?.tenNhanVien),
      soDienThoai: new FormControl(this.model?.soDienThoai),
      diaChi: new FormControl(this.model?.diaChi),
      cccd: new FormControl(this.model?.cccd),
      ngaySinh: new FormControl(this.model?.ngaySinh),
      email: new FormControl(this.model?.email),
      gioiTinh: new FormControl(this.model?.gioiTinh),
      chucVu: new FormControl(this.model?.chucVu),
      ngayVaoLam: new FormControl(this.model?.ngayVaoLam),
      anhNhanVien: new FormControl(this.model?.anhNhanVien),
      tinhTrang: new FormControl(this.model?.tinhTrang),
      ngayDangKy: new FormControl(this.model?.ngayDangKy)
    });
  }
  ClosePopup() {
    this.ref.close();
  }

  SuaNhanVien(event: Event) {

    if (this.model && this.id) {
      const suaNhanVien: SuaNhanVien = { ...this.suaNhanVienForm.value };
      this.quanLyNhanVien.suaNhanVien(this.id, suaNhanVien).subscribe((response) => {
        console.log(response);
        this.toastr.success('Sửa nhân viên thành công', 'Thông báo', {
          timeOut: 1000,
        });
      })
      this.ref.close();
    }
  }
}
