import { Component, Inject, OnInit } from '@angular/core';
import { ThanhToan } from '../../models/thanh-toan.model';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ThanhToanService } from '../../services/ThanhToan/thanh-toan.service';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-xem-thanh-toan',
  templateUrl: './xem-thanh-toan.component.html',
  styleUrl: './xem-thanh-toan.component.css'
})
export class XemThanhToanComponent implements OnInit {
  id: string | null = null;
  model?: ThanhToan;
  thanhToan$?: Observable<ThanhToan[]>;

  constructor(
    private route:ActivatedRoute,
    private thanhToanService:ThanhToanService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any,

    ){

  }
  ngOnInit(): void {
    this.id = this.data.idThanhToan;
    
    this.thanhToan$ = this.thanhToanService.getAllThanhToan();
    this.route.paramMap.subscribe({
      next:(prams)=>{
        this.id = this.data.idThanhToan;

       if(this.id){
        this.thanhToanService.getThanhToanById(this.id).subscribe({
          next:(response)=>{
            this.model = response;
          }
        })
       }
      }
    })
  }
}
