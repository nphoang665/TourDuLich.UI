import { Component, OnInit } from '@angular/core';
import { DichvuService } from '../../GiaoDienAdmin/services/DichVu/dichvu.service';
import { QuanLyDichVuService } from '../services/DichVu/quan-ly-dich-vu.service';

@Component({
  selector: 'app-quan-ly-dich-vu',
  templateUrl: './quan-ly-dich-vu.component.html',
  styleUrl: './quan-ly-dich-vu.component.css'
})
export class QuanLyDichVuComponent implements OnInit {
        constructor(private dichVuServices :QuanLyDichVuService){

        }
  dichVu:any;
  ngOnInit(): void {
    this.dichVuServices.getAllDichVu().subscribe((data:any)=>{
      this.dichVu=data;
    })
  }
  DichVuByid:any;
  deleteDichVu(id:string){
    
   for (let index = 0; index < this.dichVu.length; index++) {
    if(this.dichVu[index].idDatTour==id){
      this.DichVuByid=this.dichVu[index];
     
    }
    
   }
   this.dichVuServices.deleteDichVu(id).subscribe((data:any)=>{
    console.log(data);
    
   })
  }
}
