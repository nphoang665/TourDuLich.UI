import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NhanVienService } from '../services/NhanVien/nhan-vien.service';
import { Observable } from 'rxjs';
import { NhanVien } from '../models/nhan-vien.model';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ThemNhanVienComponent } from './them-nhan-vien/them-nhan-vien.component';
import { SuaNhanVienComponent } from './sua-nhan-vien/sua-nhan-vien.component';

@Component({
  selector: 'app-quan-ly-nhan-vien',
  templateUrl: './quan-ly-nhan-vien.component.html',
  styleUrl: './quan-ly-nhan-vien.component.css'
})
export class QuanLyNhanVienComponent implements AfterViewInit,OnInit{
  displayedColumns: string[] = ['idNhanVien', 'tenNhanVien', 'soDienThoai', 'gioiTinh', 'email','ngaySinh', 'action'];
  dataSource: MatTableDataSource<NhanVien>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

constructor(
  private quanLyNhanVienService:NhanVienService,  
  private toastr: ToastrService,
  private dialog: MatDialog,
  ){
    this.dataSource = new MatTableDataSource<NhanVien>([])
    this.getNhanVienData();
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

  ngOnInit(): void {
    // this.nhanVien$ = this.quanLyNhanVienService.getAllNhanVien();
  }
  getNhanVienData() {
    this.quanLyNhanVienService.getAllNhanVien().subscribe(
      (data: NhanVien[]) => {
        this.dataSource.data = data.filter(nhanVien => nhanVien.tinhTrang === 'Đang hoạt động');
      },
      (error) => {
        console.error('Error fetching Nhân viên data: ', error);
      }
    );
  }

  OpenPopup(id: any, title: any): void {
    const _popup = this.dialog.open(ThemNhanVienComponent, {
      width: '40%',
      enterAnimationDuration: '250ms',
      exitAnimationDuration: '250ms',
      data: {
        title: title,
        idNhanVien: id 
      },
    });
    _popup.afterClosed().subscribe((item) => {
      console.log(item);
      this.getNhanVienData();
    });
  }

  OpenPopupSua(id: any, title: any): void {
    const _popup = this.dialog.open(SuaNhanVienComponent, {
      width: '40%',
      enterAnimationDuration: '250ms',
      exitAnimationDuration: '250ms',
      data: {
        title: title,
        idNhanVien: id 
      },
    });
    _popup.afterClosed().subscribe((item) => {
      console.log(item);
      this.getNhanVienData(); 
    });
  }

  themNhanVien():void{
    this.OpenPopup(0,'Thêm nhân viên')
  }
  suaNhanVien(id:any):void{
    this.OpenPopupSua(id,'Sửa nhân viên')
  }
  XoaNhanVien(id:string){
    this.quanLyNhanVienService.xoaNhanVien(id).subscribe((data: any) => {
      this.toastr.success('Xóa nhân viên thành công', 'Thông báo', {
        timeOut: 1000,
      });
      this.getNhanVienData();
    });
  }
    
}
