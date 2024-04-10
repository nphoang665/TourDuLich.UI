import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DichVu } from '../models/Dich-Vu.model';
import { QuanLyDichVuService } from '../services/DichVu/quan-ly-dich-vu.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { ThemDichVuComponent } from './them-dich-vu/them-dich-vu.component';
import { SuaDichVuComponent } from './sua-dich-vu/sua-dich-vu.component';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-quan-ly-dich-vu',
  templateUrl: './quan-ly-dich-vu.component.html',
  styleUrls: ['./quan-ly-dich-vu.component.css']
})
export class QuanLyDichVuComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['idDichVu', 'tenDichVu', 'donViTinh', 'giaTien', 'gioBatDau', 'gioKetThuc', 'action'];
  dataSource: MatTableDataSource<DichVu>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private quanLyDichVuService: QuanLyDichVuService, private toastr: ToastrService,
    private dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<DichVu>([]);
    this.getDichVuData();
  }
  ngOnInit(): void {


  }

  ngAfterViewInit() {
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
    const _popup = this.dialog.open(ThemDichVuComponent, {
      width: '40%',
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

  OpenPopupSua(id: any, title: any): void {
    const _popup = this.dialog.open(SuaDichVuComponent, {
      width: '40%',
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
  themDichVu(): void {
    this.OpenPopup(0, 'Thêm dịch vụ');
  }
  suaDichVu(id: any): void {
    this.OpenPopupSua(id, 'Sửa dịch vụ');
  }

  getDichVuData() {
    this.quanLyDichVuService.getAllDichVu().subscribe(
      (data: DichVu[]) => {
        this.dataSource.data = data.filter(dichvu => dichvu.tinhTrang === 'Đang hoạt động');
      },
      (error) => {
        console.error('Error fetching DichVu data: ', error);
      }
    );
  }

  deleteDichVu(id: string): void {
    this.quanLyDichVuService.deleteDichVu(id).subscribe((data: any) => {
      this.toastr.success('Xóa dịch vụ thành công', 'Thông báo', {
        timeOut: 1000,
      });
      this.getDichVuData();
    });
  }

  exportToExcel(data: any[]): void {
    
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
  
    const headings = ['Mã dịch vụ', 'Tên dịch vụ', 'Đơn vị tính', 'Tình trạng', 'Giá tiền', 'Giờ bắt đầu', 'Giờ kết thúc', 'Ngày thêm'];
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
  
 
    XLSX.writeFile(wb, 'dichVu.xlsx');
  }
  
  getDichVuDataAndExportToExcel() {
    this.quanLyDichVuService.getAllDichVu().subscribe(
      (data: DichVu[]) => {
        const filteredData = data.filter(dichvu => dichvu.tinhTrang === 'Đang hoạt động');
        this.exportToExcel(filteredData);
      },
      (error) => {
        console.error('Error fetching DichVu data: ', error);
      }
    );
  }
}
