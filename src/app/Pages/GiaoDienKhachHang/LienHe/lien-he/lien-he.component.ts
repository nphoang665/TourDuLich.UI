import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { DanhgiaService } from '../../../Admin/services/DanhGia/danhgia.service';
@Component({
  selector: 'app-lien-he',
  templateUrl: './lien-he.component.html',
  styleUrl: './lien-he.component.css'
})
export class LienHeComponent {
  constructor(private danhGiaServices: DanhgiaService) {

  }
  TestDl() {
    this.danhGiaServices.LayTrungBinhSaoMotTour("TDL002").subscribe(result => {
      console.log(result);
    });
  }
}
