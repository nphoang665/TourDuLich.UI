import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DichVu } from '../../models/Dich-Vu.model';
import { DichvuService } from '../../../GiaoDienAdmin/services/DichVu/dichvu.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { QuanLyDichVuService } from '../../services/DichVu/quan-ly-dich-vu.service';
import { getPackedSettings } from 'http2';
import { time } from 'console';

@Component({
  selector: 'app-them-dich-vu',
  templateUrl: './them-dich-vu.component.html',
  styleUrl: './them-dich-vu.component.css'
})
export class ThemDichVuComponent implements OnInit {
  themDichVu: FormGroup = new FormGroup({
    idDichVu: new FormControl('11'),
    tenDichVu: new FormControl(''),
    donViTinh: new FormControl(''),
    giaTien: new FormControl(''),
    tinhTrang: new FormControl('11'),
    gioBatDau: new FormControl(''),
    gioKetThuc: new FormControl(''),
    ngayThem: new FormControl(new Date()),
  });
  constructor(
    private dichVuService: QuanLyDichVuService,
    private router: Router,
    private toastr: ToastrService
  ) {

  }

  ngOnInit(): void {

  }
  themDichVuTodb() {

    // this.themDichVu.controls['donViTinh'].setValue(this.themDichVu.controls['donViTinh']?.value);

    this.themDichVu.controls['gioBatDau'].setValue(this.themDichVu.controls['gioBatDau']?.value + ':00');
    this.themDichVu.controls['gioKetThuc'].setValue(this.themDichVu.controls['gioKetThuc']?.value + ':00');

    //  this.themDichVu.controls['ngayThem'].setValue(new Date(this.themDichVu.controls['ngayThem']?.value).toISOString());

    console.log(this.themDichVu);

    this.dichVuService.createDichVu(this.themDichVu.value)
      .subscribe({
        next: (response) => {
          this.router.navigateByUrl('/quanLyDichVu');
          this.toastr.success('Thêm dịch vụ thành công', 'Thông báo', {
            timeOut: 1000,
          });
        }
      })
  }




}
