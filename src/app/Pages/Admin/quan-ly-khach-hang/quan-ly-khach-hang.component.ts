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
import * as XLSX from 'xlsx';
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
        console.error('Error fetching khách hàng data: ', error);
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
  exportToExcel(data: any[]): void {
    
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
  
    const headings = ['Mã khách hàng', 'Tên khách hàng', 'Số điện thoại', 'Địa chỉ', 'Căn cước công dân', 'Ngày sinh', 'Giới tính', 'Email', 'Tình trạng' ,'Ngày đăng ký'];
    XLSX.utils.sheet_add_aoa(ws, [headings], { origin: 'A1' });
  
  
    const headerRange = ws['!ref'];
    if (headerRange) {
      const decodedHeaderRange: XLSX.Range = XLSX.utils.decode_range(headerRange);
      for (let col = decodedHeaderRange.s.c; col <= decodedHeaderRange.e.c; col++) {
        const headerCell: XLSX.CellObject = ws[XLSX.utils.encode_cell({ r: decodedHeaderRange.s.r, c: col })];
        if (headerCell) {
          headerCell.s = {
            font: { bold: true }, 
            alignment: { horizontal: 'center' }
          };
        }
      }
    }
  
  
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  
    
    XLSX.writeFile(wb, 'khachHang.xlsx');
  }
    getKhachHanngDataAndExportToExcel() {
      this.quanLyKhachHangService.getAllKhachHang().subscribe(
        (data: KhachHang[]) => {
          this.dataSource.data = data.filter(khachHang => khachHang.tinhTrang === 'Đang hoạt động');
          this.exportToExcel(this.dataSource.data);
        },
        (error) => {
          console.error('Error fetching khachHang data: ', error);
        }
      );
    }
}

