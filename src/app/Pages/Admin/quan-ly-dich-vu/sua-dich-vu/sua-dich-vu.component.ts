import { Component, OnInit } from '@angular/core';
import { QuanLyDichVuService } from '../../services/DichVu/quan-ly-dich-vu.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup } from '@angular/forms';
import { SuaDichVu } from '../../models/Dich-Vu.model';


@Component({
  selector: 'app-sua-dich-vu',
  templateUrl: './sua-dich-vu.component.html',
  styleUrl: './sua-dich-vu.component.css'
})
export class SuaDichVuComponent implements OnInit {
constructor(
  private DichVuService :QuanLyDichVuService,
  private router:Router,
  private toastr: ToastrService,
  private route :ActivatedRoute
  ){

}
id:any;
  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      this.id=params['id'];
      console.log(this.id);
      this.getDuLieu();

    })
  }
  //
  suaDichVu: FormGroup = new FormGroup({
    idDichVu:new FormControl(''),
    tenDichVu:new FormControl(''),
    donViTinh:new FormControl(''),
    giaTien:new FormControl(''),
    tinhTrang:new FormControl(''),
    gioBatDau:new FormControl(''),
    gioKetThuc:new FormControl(''),
    ngayThem :new FormControl(new Date()),
  });
  //
  dichVu!:any
  getDuLieu(){

    this.DichVuService.getDichVuById(this.id).subscribe((data:any)=>{
      this.dichVu=data;

      this.hienThongTin();
    })
}
//
hienThongTin(){
  this.suaDichVu.getRawValue();

  this.suaDichVu.get('idDichVu')?.setValue(this.dichVu.idDichVu) ;
  this.suaDichVu.get('tenDichVu')?.setValue(this.dichVu.tenDichVu) ;
  this.suaDichVu.get('donViTinh')?.setValue(this.dichVu.donViTinh) ;
  this.suaDichVu.get('giaTien')?.setValue(this.dichVu.giaTien) ;
  this.suaDichVu.get('tinhTrang')?.setValue(this.dichVu.tinhTrang) ;
  this.suaDichVu.get('gioBatDau')?.setValue(this.dichVu.gioBatDau) ;
  this.suaDichVu.get('gioKetThuc')?.setValue(this.dichVu.gioKetThuc) ;
  this.suaDichVu.get('ngayThem')?.setValue(this.dichVu.ngayThem) ;
  ;
}
//
suaDichVutoDb(){
  this.suaDichVu.getRawValue();
   let dichVu:SuaDichVu={
    idDichVu:this.suaDichVu.controls['idDichVu'].value,
    tenDichVu:this.suaDichVu.controls['tenDichVu'].value,
    donViTinh:this.suaDichVu.controls['donViTinh'].value,
    giaTien:this.suaDichVu.controls['giaTien'].value,
    tinhTrang:this.suaDichVu.controls['tinhTrang'].value,
    gioBatDau:this.suaDichVu.controls['gioBatDau'].value,
    gioKetThuc:this.suaDichVu.controls['gioKetThuc'].value, 
    ngayThem:this.suaDichVu.controls['ngayThem'].value
   }
   console.log(dichVu);
 this.DichVuService.updateDichVu(this.id,dichVu).subscribe((data:any)=>{

  this.router.navigateByUrl('/quanLyDichVu');
        this.toastr.success('Sửa dịch vụ thành công', 'Thông báo', {
          timeOut: 1000,
        });
 })

}
//

}
