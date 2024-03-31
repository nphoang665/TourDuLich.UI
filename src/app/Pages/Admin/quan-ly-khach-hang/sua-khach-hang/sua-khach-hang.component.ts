import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { KhachHang, SuaKhachHang } from '../../models/khach-hang.model';
import { ActivatedRoute, Router } from '@angular/router';
import { KhachhangService } from '../../services/KhachHang/khachhang.service';
import { ToastrService } from 'ngx-toastr';

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

  constructor(private route:ActivatedRoute,private quanLyKhachHangSerice:KhachhangService,private router:Router, private toastr: ToastrService){}
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id'); // Lấy ID từ URL

  if (this.id) {
    this.quanLyKhachHangSerice.getKhachHangById(this.id).subscribe((data: KhachHang) => {
      if (data) {
        this.model = data; // Gán thông tin nhân viên vào model
        this.initializeForm(); // Khởi tạo form khi có dữ liệu nhân viên
      } else {
        console.error('Không tìm thấy nhân viên có ID: ', this.id);
      }
    });
  }
  }
  initializeForm():void{
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

  SuaKhachHang(){
    if(this.model && this.id){
      const suaKhachHang:SuaKhachHang = {...this.suaKhachHangForm.value};

      this.quanLyKhachHangSerice.suaKhachHang(this.id,suaKhachHang).subscribe((response)=>{
        this.router.navigateByUrl('/quanLyKhachHang')
        this.toastr.success('Sửa khách hàng thành công', 'Thông báo', {
          timeOut: 1000,
        });
      })
    }
  }
}
