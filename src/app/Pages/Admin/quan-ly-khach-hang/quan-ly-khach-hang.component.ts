import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { KhachHang } from '../models/khach-hang.model';
import { HttpClient } from '@angular/common/http';
import { KhachhangService } from '../services/KhachHang/khachhang.service';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ThemKhachHangComponent } from './them-khach-hang/them-khach-hang.component';
import { SuaKhachHangComponent } from './sua-khach-hang/sua-khach-hang.component';

@Component({
  selector: 'app-quan-ly-khach-hang',
  templateUrl: './quan-ly-khach-hang.component.html',
  styleUrl: './quan-ly-khach-hang.component.css'
})
export class QuanLyKhachHangComponent implements AfterViewInit,OnInit{
  displayedColumns: string[] = ['idKhachHang', 'tenKhachHang', 'soDienThoai', 'gioiTinh', 'email','ngaySinh', 'action'];
  dataSource: MatTableDataSource<KhachHang>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(
    private quanLyKhachHangService:KhachhangService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    ){
      this.dataSource = new MatTableDataSource<KhachHang>([])
      this.getKhachHangData();
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
  
  getKhachHangData() {
    this.quanLyKhachHangService.getAllKhachHang().subscribe(
      (data: KhachHang[]) => {
        this.dataSource.data = data.filter(khachHang => khachHang.tinhTrang === 'Đang hoạt động');
      },
      (error) => {
        console.error('Error fetching DichVu data: ', error);
      }
    );
  }
  ngOnInit(): void {
    // this.khachHang$ = this.quanLyKhachHangService.getAllTourKhachHang();
  }
  OpenPopup(id: any, title: any): void {
    const _popup = this.dialog.open(ThemKhachHangComponent, {
      width: '40%',
      enterAnimationDuration: '250ms',
      exitAnimationDuration: '250ms',
      data: {
        title: title,
        idKhachHang: id 
      },
    });
    _popup.afterClosed().subscribe((item) => {
      console.log(item);
      this.getKhachHangData();
    });
  }

  OpenPopupSua(id: any, title: any): void {
    const _popup = this.dialog.open(SuaKhachHangComponent, {
      width: '40%',
      enterAnimationDuration: '250ms',
      exitAnimationDuration: '250ms',
      data: {
        title: title,
        idKhachHang: id 
      },
    });
    _popup.afterClosed().subscribe((item) => {
      console.log(item);
      this.getKhachHangData(); 
    });
  }

  themKhachHang():void{
    this.OpenPopup(0,'Thêm khách hàng')
  }
  suaKhachHang(id:any):void{
    this.OpenPopupSua(id,'Sửa khách hàng')
  }
  XoaKhachHang(id:string){
    this.quanLyKhachHangService.xoaKhachHang(id).subscribe((data: any) => {
      this.toastr.success('Xóa khách hàng thành công', 'Thông báo', {
        timeOut: 1000,
      });
      this.getKhachHangData();
    });
  }
}

