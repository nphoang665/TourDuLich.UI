import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DanhgiaService } from '../../../Admin/services/DanhGia/danhgia.service';
import { DanhGia } from '../../../Admin/models/danh-gia.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ThemDanhGia } from '../../../Admin/models/them-danh-gia.model';

@Component({
  selector: 'app-danh-gia-khach-hang',
  templateUrl: './danh-gia-khach-hang.component.html',
  styleUrls: ['./danh-gia-khach-hang.component.css']
})
export class DanhGiaKhachHangComponent implements AfterViewInit, OnInit {
  @ViewChild('buttonDanhGiaSort') buttonDanhGiaSort !: ElementRef;
  @ViewChild('textarea') textarea!: ElementRef;

  chooseStart: boolean = false;
  scrollPosition = 0;
  constructor(private danhGiaServices: DanhgiaService,
    private router: ActivatedRoute
  ) { }
  DanhGiaItem(event: Event) {
    const clickedElement = event.target as HTMLElement;
    if (clickedElement.tagName === 'BUTTON') {
      const btn = this.buttonDanhGiaSort.nativeElement.querySelectorAll('.btn_User_Review');
      btn.forEach((element: HTMLButtonElement) => {
        element.classList.remove('btn_Active');
      });

      const clickedButton = event.target as HTMLButtonElement;
      clickedButton.classList.add('btn_Active');
    }
  }
  SoSaoDaChon!: number;
  ChonSaoDeDanhGia(event: Event) {
    event.stopPropagation();
    const clickedElement = event.target as HTMLInputElement;
    if (clickedElement.tagName === 'INPUT') {
      // Lưu lại vị trí cuộn hiện tại
      this.scrollPosition = window.pageYOffset || this.buttonDanhGiaSort.nativeElement.scrollTop;
      // giá trị số sao input là biến `clickedElement.tagName`
      this.chooseStart = true;
      console.log(clickedElement.value);
      this.SoSaoDaChon = Number(clickedElement.value);
      // Đặt lại vị trí cuộn
      setTimeout(() => {
        window.scrollTo({ top: this.scrollPosition });
      }, 0);
    }
  }
  NhanXet!: string;
  SendDanhGia() {
    var data_nhanxet: ThemDanhGia;
    data_nhanxet = {
      idDanhGia: '1',
      idKhachHang: 'KH0001',
      idTour: this.router.snapshot.paramMap.get('id') ?? 'null',
      diemDanhGia: this.SoSaoDaChon,
      nhanXet: this.NhanXet,
      thoiGianDanhGia: new Date(),
    }
    this.danhGiaServices.themDanhGia(data_nhanxet).subscribe((data: any) => {

      this.LayTatCaDanhGia();
    })
  }

  ngAfterViewInit(): void {
    if (this.textarea) {
      setTimeout(() => {
        this.adjustHeight(this.textarea.nativeElement);
      });
    }
  }

  adjustHeight(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = (textarea.scrollHeight + 20) + 'px';
    }
  }
  ngOnInit(): void {
    this.LayTatCaDanhGia();
  }
  DanhGia: DanhGia[] = [];
  TrungBinhDiemDanhGia: number = 0;
  LayTatCaDanhGia() {
    this.danhGiaServices.layTatCaDanhGia().subscribe((data: DanhGia[]) => {


      if (this.router.snapshot.paramMap.get('id') === null) {
        this.DanhGia = data.filter(data => data.idTour === null);
      }
      else {

        this.DanhGia = data.filter(data => data.idTour === this.router.snapshot.paramMap.get('id'));
      }
      let totalScore = this.DanhGia.reduce((sum, danhGia) => sum + danhGia.diemDanhGia, 0);
      let averageScore = totalScore / this.DanhGia.length;
      this.TrungBinhDiemDanhGia = Number(averageScore.toFixed(1));

      console.log(this.DanhGia);


    });

  }
}
