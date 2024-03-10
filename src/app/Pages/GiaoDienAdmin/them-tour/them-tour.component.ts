import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-them-tour',
  templateUrl: './them-tour.component.html',
  styleUrl: './them-tour.component.css'
})
export class ThemTourComponent {
  Text: string = '';
  editorConfig = {
    base_url: '/tinymce',
    suffix: '.min',
    plugins: 'lists link image table wordcount'
  };
  constructor(public domSanitizer: DomSanitizer) { }
  Test() {
    console.log(this.Text);
  }
  get sanitizedText() {
    return this.domSanitizer.bypassSecurityTrustHtml(this.Text);
  }

  //thêm tour
  ThemTour() {
    const tourData = this.ThemTourForm.value;
    tourData.NgayThem = new Date().toISOString();
    tourData.MoTa = this.Text;
    console.log(tourData);
    // Bây giờ bạn có thể sử dụng tourData để thực hiện các thao tác tiếp theo
  }

















































  //form group
  ThemTourForm = new FormGroup({
    idTour: new FormControl(''),
    TenTour: new FormControl(''),
    loaiTour: new FormControl(''),
    PhuongTienDiChuyen: new FormControl(''),
    MoTa: new FormControl(''),
    SoLuongNguoiLon: new FormControl(0),
    SoLuongTreEm: new FormControl(0),
    ThoiGianBatDau: new FormControl(''),
    ThoiGianKetThuc: new FormControl(''),
    NoiKhoiHanh: new FormControl(''),
    SoChoConNhan: new FormControl(0),
    idDoiTac: new FormControl(''),
    giaTreEm: new FormControl(0),
    giaNguoiLon: new FormControl(0),
    NgayThem: new FormControl(''),
    dichVuDiKem: new FormControl(''),
    TinhTrang: new FormControl('')
  });

}













































