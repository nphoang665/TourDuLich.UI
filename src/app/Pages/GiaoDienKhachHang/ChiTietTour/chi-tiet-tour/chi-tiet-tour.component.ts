import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuanLyTourService } from '../../../GiaoDienAdmin/services/quan-ly-tour.service';
import { TourDuLich } from '../../../GiaoDienAdmin/models/tour-du-lich.model';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-chi-tiet-tour',
  templateUrl: './chi-tiet-tour.component.html',
  styleUrl: './chi-tiet-tour.component.css'
})
export class ChiTietTourComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private tourDuLichServices: QuanLyTourService,
    public domSanitizer: DomSanitizer,
  ) {

  }
  //khai báo đối tượng chứa tour đã lấy
  TourChiTiet: any = {};
  ngOnInit(): void {
    //gọi hàm get tour và truyền biến id tour vào
    this.GetTour(this.LayIdRoute());
  }
  //hàm lấy tour từ services
  GetTour(idTour: string): void {
    //gọi services lấy tour
    this.tourDuLichServices.getTourDuLichById(idTour).subscribe((data: TourDuLich) => {
      //trả về data dạng tour
      this.TourChiTiet = data;
      console.log(this.TourChiTiet);


    })
  }
  //convert text mô tả
  get TextMoTa() {
    return this.domSanitizer.bypassSecurityTrustHtml(this.TourChiTiet?.moTa || '');
  }
  //hàm lấy id router
  //khai báo id lấy mã tour
  id!: string;
  LayIdRoute(): string {
    this.route.params.subscribe(params => {
      this.id = params['id'];

    });
    return this.id;
  }
}
