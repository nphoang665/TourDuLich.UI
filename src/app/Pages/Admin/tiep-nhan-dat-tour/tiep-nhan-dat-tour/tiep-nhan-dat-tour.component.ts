import { Component, OnInit } from '@angular/core';
import { DattourService } from '../../services/DatTour/dattour.service';
import { DatTour } from '../../models/dat-tour.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tiep-nhan-dat-tour',
  templateUrl: './tiep-nhan-dat-tour.component.html',
  styleUrl: './tiep-nhan-dat-tour.component.css'
})
export class TiepNhanDatTourComponent implements OnInit {
  constructor( private datToursServices:DattourService){
    
  }
  datTour:any;
  ngOnInit(): void {
    this.datToursServices.getAllDatTour().subscribe((data:any)=>{this.datTour=data})
    
  }
  tourById:any;
  chapNhanDatTour(id:string){
    
   for (let index = 0; index < this.datTour.length; index++) {
    if(this.datTour[index].idDatTour==id){
      this.tourById=this.datTour[index];
      this.tourById.tinhTrang="Đã được duyệt";
    }
    
   }
   this.datToursServices.putDatTour(this.tourById,id).subscribe((data:any)=>{
    console.log(data);
    
   })
  }

//
huyDatTour(id:string){
    
  for (let index = 0; index < this.datTour.length; index++) {
   if(this.datTour[index].idDatTour==id){
     this.tourById=this.datTour[index];
     this.tourById.tinhTrang="Đã từ chối";
   }
   
  }
  this.datToursServices.putDatTour(this.tourById,id).subscribe((data:any)=>{
   console.log(data);
   
  })
 }
}
