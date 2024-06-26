import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ThanhToan } from '../models/thanh-toan.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ThanhToanService } from '../services/ThanhToan/thanh-toan.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { XemThanhToanComponent } from './xem-thanh-toan/xem-thanh-toan.component';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-thanh-toan',
  templateUrl: './thanh-toan.component.html',
  styleUrl: './thanh-toan.component.css'
})
export class ThanhToanComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['idThanhToan', 'idKhachHang', 'idNhanVien', 'tongTien','tinhTrang','ngayThanhToan', 'action'];
  dataSource: MatTableDataSource<ThanhToan>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private thanhToanService: ThanhToanService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    ) {
    this.dataSource = new MatTableDataSource<ThanhToan>([])
    this.getThanhToanData();
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
    
  }

  getThanhToanData() {
    this.thanhToanService.getAllThanhToan().subscribe(
      (data: ThanhToan[]) => {
        this.dataSource.data = data.filter(thanhToan => thanhToan.tinhTrang === 'Đã thanh toán');
      },
      (error) => {
        console.error('Error fetching thanh toan data: ', error);
      }
    );
  }

  OpenPopup(id: any, title: any): void {
    const _popup = this.dialog.open(XemThanhToanComponent, {
      width: '40%',
      enterAnimationDuration: '250ms',
      exitAnimationDuration: '250ms',
      data: {
        title: title,
        idThanhToan: id 
      },
    });
    _popup.afterClosed().subscribe((item) => {
      this.getThanhToanData();
      
    });
  }

    xemThanhToan(id:string):void{
      this.OpenPopup(id,'Xem thanh toán')
    }

    exportToExcel(data: any[]): void {
    
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    
      const headings = ['Mã thanh toán', 'Mã đặt tour', 'Mã khách hàng', 'Mã nhân viên', 'Tổng tiền tour', 'Tổng tiền dịch vụ', 'Tổng tiền',
       'Tình trạng', 'Ngày thanh toán' ,'Phương thức thoanh toán'
    ];
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
    
      
      XLSX.writeFile(wb, 'ThanhToan.xlsx');
    }
      getThanhToanDataAndExportToExcel() {
        this.thanhToanService.getAllThanhToan().subscribe(
          (data: ThanhToan[]) => {
           
            this.exportToExcel(this.dataSource.data);
          },
          (error) => {
            console.error('Error fetching ThanhToan data: ', error);
          }
        );
      }

}
