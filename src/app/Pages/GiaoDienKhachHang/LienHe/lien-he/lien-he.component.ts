import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { DanhgiaService } from '../../../Admin/services/DanhGia/danhgia.service';
import { QuanLyTourService } from '../../../Admin/services/quan-ly-tour.service';
@Component({
  selector: 'app-lien-he',
  templateUrl: './lien-he.component.html',
  styleUrls: ['./lien-he.component.css', './style.scss']
})
export class LienHeComponent {
  constructor() {

  }

}
