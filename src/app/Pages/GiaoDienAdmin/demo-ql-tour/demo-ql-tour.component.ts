import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { TourDuLich } from '../models/tour-du-lich.model';
import { QuanLyTourService } from '../services/quan-ly-tour.service';

@Component({
  selector: 'app-demo-ql-tour',
  templateUrl: './demo-ql-tour.component.html',
  styleUrls: ['./demo-ql-tour.component.css']
})
export class DemoQlTourComponent implements OnInit, AfterViewInit {

  tourDuLich$?: Observable<TourDuLich[]>;

  constructor(private quanLyTourService: QuanLyTourService) { }

  ngOnInit(): void {
    this.tourDuLich$ = this.quanLyTourService.getAllTourDuLich();
    this.tourDuLich$.subscribe((tours: TourDuLich[]) => {
      this.dataSource.data = tours;
    });
  }

  displayedColumns: string[] = ['idTour', 'tenTour', 'loaiTour', 'phuongTienDiChuyen','soLuongNguoiLon', 'soLuongTreEm', 'thoiGianBatDau', 'thoiGianKetThuc','soChoConNhan', 'idDoiTac', 'giaTreEm', 'giaNguoiLon','tinhTrang', 'ngayThem', 'dichVuDiKem', 'noiKhoiHanh', 'moTa'];
  dataSource: MatTableDataSource<TourDuLich> = new MatTableDataSource<TourDuLich>();

  @ViewChild(MatPaginator) paginator?: MatPaginator;

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator!;
  }

}
