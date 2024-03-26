import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { DattourService } from '../../../services/DatTour/dattour.service';
import { TourDuLich } from '../../../models/tour-du-lich.model';
import { DatTour } from '../../../models/dat-tour.model';
import { Observable } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { SuaDatTour } from '../../../models/suaDatTour.model';

@Component({
  selector: 'app-sua-tiep-nhan-dat-tour',
  templateUrl: './sua-tiep-nhan-dat-tour.component.html',
  styleUrl: './sua-tiep-nhan-dat-tour.component.css'
})
export class SuaTiepNhanDatTourComponent implements OnInit{
constructor(private route:ActivatedRoute,private datTourService:DattourService) {
  
}
    id!:string;
  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      this.id=params['id'];
      console.log(this.id);
      this.getDuLieu();
      
    })
  }
  datTour:any={};
 
    suaTiepNhanDatTour: FormGroup = new FormGroup({
      idDatTour:new FormControl(''),
      idKhachHang:new FormControl(''),
      idTour:new FormControl(''),
      soLuongNguoiLon:new FormControl(''),
      soLuongTreEm:new FormControl(''),
      ghiChu:new FormControl(''),
      idNhanVien:new FormControl(''),
      thoiGianDatTour:new FormControl(new Date()),
      khachHang:new FormControl(''),
      tinhTrang:new FormControl(''),

    });
    //
    hienThongTin(){
      this.suaTiepNhanDatTour.getRawValue();
      // console.log(this.datTour)
      this.suaTiepNhanDatTour.get('idDatTour')?.setValue(this.datTour.idDatTour) ;
      this.suaTiepNhanDatTour.get('idKhachHang')?.setValue(this.datTour.idKhachHang) ;
      this.suaTiepNhanDatTour.get('idTour')?.setValue(this.datTour.idTour) ;
      this.suaTiepNhanDatTour.get('soLuongNguoiLon')?.setValue(this.datTour.soLuongNguoiLon) ;
      this.suaTiepNhanDatTour.get('soLuongTreEm')?.setValue(this.datTour.soLuongTreEm) ;
      this.suaTiepNhanDatTour.get('ghiChu')?.setValue(this.datTour.ghiChu) ;
      this.suaTiepNhanDatTour.get('idNhanVien')?.setValue(this.datTour.idNhanVien) ;

      let thoiGianDatTour = new Date(this.datTour.thoiGianDatTour);
      let formattedDate = thoiGianDatTour.getFullYear() + '-' + ('0' + (thoiGianDatTour.getMonth() + 1)).slice(-2) + '-' + ('0' + thoiGianDatTour.getDate()).slice(-2);
      let formattedTime = ('0' + thoiGianDatTour.getHours()).slice(-2) + ':' + ('0' + thoiGianDatTour.getMinutes()).slice(-2) + ':' + ('0' + thoiGianDatTour.getSeconds()).slice(-2);
      this.suaTiepNhanDatTour.get('thoiGianDatTour')?.setValue(formattedDate + 'T' + formattedTime);
      

      this.suaTiepNhanDatTour.get('tinhTrang')?.setValue(this.datTour.tinhTrang) ;
    }
  //
  suaDatTour(){
    this.suaTiepNhanDatTour.getRawValue();
     let DatTour:SuaDatTour={
      IdDatTour:this.suaTiepNhanDatTour.controls['idDatTour'].value,
      IdKhachHang:this.suaTiepNhanDatTour.controls['idKhachHang'].value,
      IdTour:this.suaTiepNhanDatTour.controls['idTour'].value,
      SoLuongNguoiLon:this.suaTiepNhanDatTour.controls['soLuongNguoiLon'].value,
      SoLuongTreEm:this.suaTiepNhanDatTour.controls['soLuongTreEm'].value,
      GhiChu:this.suaTiepNhanDatTour.controls['ghiChu'].value,
      ThoiGianDatTour:this.suaTiepNhanDatTour.controls['thoiGianDatTour'].value,
      TinhTrang:this.suaTiepNhanDatTour.controls['tinhTrang'].value,
      IdNhanVien:this.suaTiepNhanDatTour.controls['idNhanVien'].value,
     }
   this.datTourService.putDatTour(DatTour,this.id).subscribe((data:any)=>{
    console.log(data);
    
   })
    
  }
  //
  getDuLieu(){
    
      this.datTourService.getDatTourByIdDatTour(this.id).subscribe((data:any)=>{
        this.datTour=data;
      
        this.hienThongTin();
      })
  }
}
