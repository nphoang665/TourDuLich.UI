import { Component, OnDestroy, OnInit } from '@angular/core';
import { NhanVienService } from '../services/NhanVien/nhan-vien.service';
import { Observable } from 'rxjs';
import { NhanVien } from '../models/nhan-vien.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-quan-ly-nhan-vien',
  templateUrl: './quan-ly-nhan-vien.component.html',
  styleUrl: './quan-ly-nhan-vien.component.css'
})
export class QuanLyNhanVienComponent implements OnInit{

  nhanVien$?:Observable<NhanVien[]>;

constructor(private quanLyNhanVienService:NhanVienService,  private toastr: ToastrService){}


  ngOnInit(): void {
    this.nhanVien$ = this.quanLyNhanVienService.getAllNhanVien();
  }



  XoaNhanVien(id: string) {
    if (id) {
     this.quanLyNhanVienService
        .xoaNhanVien(id)
        .subscribe({
          next: (response) => {
            this.nhanVien$ = this.quanLyNhanVienService.getAllNhanVien();
            this.toastr.success('Xóa nhân viên thành công', 'Thông báo', {
              timeOut: 1000,
            });
          }
        });
    }
  }
    
}
