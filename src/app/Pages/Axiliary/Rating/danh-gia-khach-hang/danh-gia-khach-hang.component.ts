import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DanhgiaService } from '../../../Admin/services/DanhGia/danhgia.service';
import { DanhGia } from '../../../Admin/models/danh-gia.model';
import { ActivatedRoute, Router } from '@angular/router';

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

  ChonSaoDeDanhGia(event: Event) {
    event.stopPropagation();
    const clickedElement = event.target as HTMLInputElement;
    if (clickedElement.tagName === 'INPUT') {
      // Lưu lại vị trí cuộn hiện tại
      this.scrollPosition = window.pageYOffset || this.buttonDanhGiaSort.nativeElement.scrollTop;

      // giá trị số sao input là biến `clickedElement.tagName`
      this.chooseStart = true;

      // Đặt lại vị trí cuộn
      setTimeout(() => {
        window.scrollTo({ top: this.scrollPosition });
      }, 0);
    }
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
  DanhGia!: DanhGia[];
  LayTatCaDanhGia() {
    this.danhGiaServices.layTatCaDanhGia().subscribe((data: DanhGia[]) => {


      if (this.router.snapshot.paramMap.get('id') === null) {
        this.DanhGia = data.filter(data => data.idTour === null);
      }
      else {

        this.DanhGia = data.filter(data => data.idTour === this.router.snapshot.paramMap.get('id'));
      }
      console.log(this.DanhGia);



    });

  }
}
