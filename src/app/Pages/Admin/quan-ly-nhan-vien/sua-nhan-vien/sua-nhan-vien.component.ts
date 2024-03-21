import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NhanVienService } from '../../services/NhanVien/nhan-vien.service';
import { NhanVien, SuaNhanVien } from '../../models/nhan-vien.model';
import { ToastrService } from 'ngx-toastr';

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
    matKhau:new FormControl(''),
    tinhTrang:new FormControl('a'),
    ngayDangKy:new FormControl(new Date())
  });

  model?:NhanVien;

  id?:string | null = null;

  constructor(private route:ActivatedRoute, private toastr: ToastrService,private quanLyNhanVien:NhanVienService,private router:Router){}
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id'); // Lấy ID từ URL

  if (this.id) {
    this.quanLyNhanVien.getNhanVienById(this.id).subscribe((data: NhanVien) => {
      if (data) {
        this.model = data; // Gán thông tin nhân viên vào model
        this.initializeForm(); // Khởi tạo form khi có dữ liệu nhân viên
      } else {
        console.error('Không tìm thấy nhân viên có ID: ', this.id);
      }
    });
  }
  }
  initializeForm(): void {
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
      matKhau: new FormControl(this.model?.matKhau),
      tinhTrang: new FormControl(this.model?.tinhTrang),
      ngayDangKy: new FormControl(this.model?.ngayDangKy)
    });
  }

  suaNhanVien(){
    if (this.model && this.id) {
      const suaNhanVien: SuaNhanVien = { ...this.suaNhanVienForm.value }; // Lấy dữ liệu từ form

      this.quanLyNhanVien.suaNhanVien(this.id, suaNhanVien).subscribe((result) => {
        this.router.navigateByUrl('/quanLyNhanVien')
        this.toastr.success('Sửa nhân viên thành công', 'Thông báo', {
          timeOut: 1000,
        });
      });
    }
  }
}
