import { Component, Inject, OnInit } from '@angular/core';
import { ThanhToan, ThanhToanDto } from '../../models/thanh-toan.model';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ThanhToanService } from '../../services/ThanhToan/thanh-toan.service';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatTour } from '../../models/dat-tour.model';
import { QuanLyTourService } from '../../services/quan-ly-tour.service';
import { TourDuLich } from '../../models/tour-du-lich.model';
import { DichVuChiTiet } from '../../models/dat-tour-khach-hang.model';
import { DichVuChiTietDto } from '../../models/dich-vu-chi-tiet.model';
import { DichvuService } from '../../../GiaoDienAdmin/services/DichVu/dichvu.service';
import { DichVuChiTietService } from '../../services/DichVuChiTiet/dich-vu-chi-tiet.service';

@Component({
  selector: 'app-xem-thanh-toan',
  templateUrl: './xem-thanh-toan.component.html',
  styleUrl: './xem-thanh-toan.component.css'
})
export class XemThanhToanComponent implements OnInit {
  id: string | null = null;
  model?: ThanhToan;
  datTour?: any;
  thanhToanDto$?: ThanhToanDto;
  thanhToan$?: Observable<ThanhToan[]>;

  constructor(
    private route: ActivatedRoute,
    private thanhToanService: ThanhToanService,
    private quanLyTourService: QuanLyTourService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private tourDuLichServices: QuanLyTourService,
    private dichVuChiTietServices: DichVuChiTietService

  ) {

  }
  DichVuChiTiet: DichVuChiTietDto[] = []
  ngOnInit(): void {
    this.id = this.data.idThanhToan;

    this.thanhToan$ = this.thanhToanService.getAllThanhToan();
    this.route.paramMap.subscribe({
      next: (prams) => {
        this.id = this.data.idThanhToan;

        if (this.id) {
          this.thanhToanService.getThanhToanById(this.id).subscribe({
            next: (response: ThanhToanDto) => {
              this.thanhToanDto$ = response;
              this.thanhToanService.getDatTourById(this.thanhToanDto$.idDatTour).subscribe({
                next: (datTour: any) => {
                  this.datTour = datTour;
                  //lấy full thông tin tour theo id tour
                  this.tourDuLichServices.getTourDuLichById(datTour.idTour).subscribe((resultTour: TourDuLich) => {
                    this.datTour.TourDuLich = resultTour;
                  })
                  this.dichVuChiTietServices.GetAllDichVuChiTietByIdDatTour(datTour.idDatTour).subscribe((resultDichVuChiTiet: DichVuChiTietDto[]) => {
                    this.DichVuChiTiet = resultDichVuChiTiet;
                  })


                }
              });
            }
          })
        }
      }
    })
  }
}
