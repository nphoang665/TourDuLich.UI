import { Component, OnInit } from '@angular/core';
import { QuanLyTourService } from '../services/quan-ly-tour.service';
import { TourDuLich } from '../models/tour-du-lich.model';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-quanlydattour',
  templateUrl: './quanlydattour.component.html',
  styleUrl: './quanlydattour.component.css'
})
export class QuanlydattourComponent implements OnInit {
  constructor(private quanLyTourService: QuanLyTourService) {

  }
  tourDuLich$?: Observable<TourDuLich[]>;
  //khai báo TourDuLich để html sử dụng hiển thị
  TourDuLich: any[] = [];
  ngOnInit(): void {
    this.tourDuLich$ = this.quanLyTourService.getAllTourDuLich();
    this.tourDuLich$.subscribe((data: TourDuLich[]) => {
      this.TourDuLich = data;
      console.log(this.TourDuLich);
      this.Fnc_TinhNgayDem();
    });
  }
  Fnc_TinhNgayDem() {

    // working


    // for (let index = 0; index < this.TourDuLich.length; index++) {
    //   let diffTime = this.TourDuLich[index].thoiGianBatDau.getTime()
    //     - this.TourDuLich[index].thoiGianKetThuc.getTime();
    //   console.log(diffTime);

    // }
  }
}
