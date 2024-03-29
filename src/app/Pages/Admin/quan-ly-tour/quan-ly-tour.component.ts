import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TourDuLich } from '../models/tour-du-lich.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { ThemTourComponent } from './them-tour/them-tour.component';
import { QuanLyTourService } from '../services/quan-ly-tour.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-quan-ly-tour',
  templateUrl: './quan-ly-tour.component.html',
  styleUrl: './quan-ly-tour.component.css'
})
export class QuanLyTourComponent implements AfterViewInit, OnInit{
  displayedColumns: string[] = ['idTour','tenTour', 'loaiTour', 'phuongTienDiChuyen', 'soChoConNhan', 'action'];
  dataSource: MatTableDataSource<TourDuLich>;
  

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  tourDuLich$?: Observable<TourDuLich[]>;

  constructor(private quanLyTourService: QuanLyTourService, private toastr: ToastrService,
    private dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<TourDuLich>([]);
    this.getDichVuData();
  }

  ngOnInit(): void {

  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  OpenPopup(id: any, title: any): void {
    const _popup = this.dialog.open(ThemTourComponent, {
      width: '60%',
      enterAnimationDuration: '250ms',
      exitAnimationDuration: '250ms',
      data: {
        title: title,
        idDichVu: id // Pass idDichVu to PopupComponent
      },
    });
    _popup.afterClosed().subscribe((item) => {
      console.log(item);
      this.getDichVuData(); // Reload the list after closing the popup
    });
  }

  themTour(): void {
    this.OpenPopup(0, 'Thêm dịch vụ');
  }

  getDichVuData() {
    this.quanLyTourService.getAllTourDuLich().subscribe(
      (data: TourDuLich[]) => {
        this.dataSource.data = data;
      },
      (error) => {
        console.error('Error fetching DichVu data: ', error);
      }
    );
  }

  XoaTour(id: string) {
    if (id) {
      this.quanLyTourService
        .xoaTourDuLich(id)
        .subscribe({
          next: (response) => {
            this.tourDuLich$ = this.quanLyTourService.getAllTourDuLich();
            this.toastr.success('Xóa tour thành công', 'Thông báo', {
              timeOut: 1000,
            });
          }
        });
    }
  }
}
