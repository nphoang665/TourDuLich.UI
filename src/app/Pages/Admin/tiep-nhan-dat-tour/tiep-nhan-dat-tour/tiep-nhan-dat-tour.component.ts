import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { DattourService } from '../../services/DatTour/dattour.service';
import { DatTour } from '../../models/dat-tour.model';
import { Observable } from 'rxjs';
import { NguoiDungService } from '../../services/NguoiDung/nguoi-dung.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { SuaTiepNhanDatTourComponent } from '../suaTiepNhanDatTour/sua-tiep-nhan-dat-tour/sua-tiep-nhan-dat-tour.component';

@Component({
  selector: 'app-tiep-nhan-dat-tour',
  templateUrl: './tiep-nhan-dat-tour.component.html',
  styleUrl: './tiep-nhan-dat-tour.component.css'
})
export class TiepNhanDatTourComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['idDatTour', 'idKhachHang', 'idTour', 'thoiGianDatTour', 'nhanVien', 'tinhTrang', 'action'];
  dataSource: MatTableDataSource<DatTour>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private datToursServices: DattourService,
    private nguoiDungServices: NguoiDungService,
    private toastr: ToastrService,
    private dialog: MatDialog,) {
    this.dataSource = new MatTableDataSource<DatTour>([])
    this.getDatTourData();
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  datTour: any;
  ngOnInit(): void {
    // this.datToursServices.getAllDatTour().subscribe((data: any) => { this.datTour = data })

  }

  getDatTourData() {
    this.datToursServices.getAllDatTour().subscribe(
      (data: DatTour[]) => {
        this.dataSource.data = data;
        this.datTour = data;
      },
      (error) => {
        console.error('Error fetching Đặt tour data: ', error);
      }
    )
  }
  tourById: any;
  chapNhanDatTour(id: string) {
    const nguoiDung = this.nguoiDungServices.LayNguoiDungTuLocalStorage();

    for (let index = 0; index < this.datTour.length; index++) {
      if (this.datTour[index].idDatTour == id) {
        this.tourById = this.datTour[index];
        this.tourById.idNhanVien = nguoiDung.idNhanVien;
        this.tourById.tinhTrang = "Đã được duyệt";
        this.tourById.ghiChu = `Nhân viên ${nguoiDung.idNhanVien} chấp nhận tour`;
      }

    }
    this.datToursServices.putDatTour(this.tourById, id).subscribe((data: any) => {
      console.log(data);

    })
  }

  //
  huyDatTour(id: string) {
    const nguoiDung = this.nguoiDungServices.LayNguoiDungTuLocalStorage();

    for (let index = 0; index < this.datTour.length; index++) {
      if (this.datTour[index].idDatTour == id) {
        this.tourById = this.datTour[index];
        this.tourById.tinhTrang = "Đã từ chối";
        this.tourById.idNhanVien = nguoiDung.idNhanVien;
        this.tourById.ghiChu = `Nhân viên ${nguoiDung.idNhanVien} hủy tour`;

      }

    }
    this.datToursServices.putDatTour(this.tourById, id).subscribe((data: any) => {
      console.log(data);

    })
  }
}
