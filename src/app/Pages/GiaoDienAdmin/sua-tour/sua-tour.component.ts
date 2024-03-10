import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
export class Tour {
  idTour: string = '';
  TenTour: string = '';
  loaiTour: string = '';
  PhuongTienDiChuyen: string = '';
  MoTa: string = '';
  SoLuongNguoiLon: number = 0;
  SoLuongTreEm: number = 0;
  ThoiGianBatDau!: Date;
  ThoiGianKetThuc!: Date;
  NoiKhoiHanh!: string;
  SoChoConNhan!: number;
  idDoiTac!: string;
  giaTreEm!: number;
  giaNguoiLon!: number;
  NgayThem!: Date;
  dichVuDiKem!: string;
  lichTrinh!: string;
  TinhTrang!: string;
}
@Component({
  selector: 'app-sua-tour',
  templateUrl: './sua-tour.component.html',
  styleUrl: './sua-tour.component.css'
})
export class SuaTourComponent implements OnInit {
  Text: string = '';
  tours: Tour[] = []
  IsDisplayPreviewDescription: boolean = false;
  editorConfig = {
    base_url: '/tinymce',
    suffix: '.min',
    plugins: 'lists link image table wordcount'
  };
  constructor(public domSanitizer: DomSanitizer, private route: ActivatedRoute) { }
  Test() {
    console.log(this.Text);
  }
  get sanitizedText() {
    return this.domSanitizer.bypassSecurityTrustHtml(this.Text);
  }
  Fn_Display_Description() {
    if (this.IsDisplayPreviewDescription === false) {
      this.IsDisplayPreviewDescription = true;
    }
    else {
      this.IsDisplayPreviewDescription = false;
    }
  }
  ngOnInit(): void {

    this.tours = [
      {
        idTour: 'TOUR001',
        TenTour: 'Du lịch Đà Nẵng',
        loaiTour: 'Trong nước',
        PhuongTienDiChuyen: 'Ô tô',
        MoTa: 'Tour du lịch Đà Nẵng 3 ngày 2 đêm',
        SoLuongNguoiLon: 2,
        SoLuongTreEm: 1,
        ThoiGianBatDau: new Date('2024-03-15'),
        ThoiGianKetThuc: new Date('2024-03-18'),
        NoiKhoiHanh: 'Hà Nội',
        SoChoConNhan: 30,
        idDoiTac: 'Công ty ABC',
        giaTreEm: 2000000,
        giaNguoiLon: 3000000,
        NgayThem: new Date('2024-01-01'),
        dichVuDiKem: 'Bảo hiểm du lịch, hướng dẫn viên',
        lichTrinh: '',
        TinhTrang: 'Đang hoạt động'
      },
      {
        idTour: 'TOUR002',
        TenTour: 'Du lịch Đà Nẵng',
        loaiTour: 'Trong nước',
        PhuongTienDiChuyen: 'Ô tô',
        MoTa: '<p>Tour du lịch Đà Nẵng 3 ngày 2 đêm</p>',
        SoLuongNguoiLon: 2,
        SoLuongTreEm: 1,
        ThoiGianBatDau: new Date('2024-03-15'),
        ThoiGianKetThuc: new Date('2024-03-18'),
        NoiKhoiHanh: 'Hà Nội',
        SoChoConNhan: 30,
        idDoiTac: 'Công ty ABC',
        giaTreEm: 2000000,
        giaNguoiLon: 3000000,
        NgayThem: new Date('2024-01-01'),
        dichVuDiKem: 'Bảo hiểm du lịch, hướng dẫn viên',
        lichTrinh: '',
        TinhTrang: 'Ngừng hoạt động'
      },
      {
        idTour: 'TOUR003',
        TenTour: 'Du lịch Đà Nẵng',
        loaiTour: 'Trong nước',
        PhuongTienDiChuyen: 'Ô tô',
        MoTa: '<p>Tour du lịch Đà Nẵng 3 ngày 2 đêm</p>',
        SoLuongNguoiLon: 2,
        SoLuongTreEm: 1,
        ThoiGianBatDau: new Date('2024-03-15'),
        ThoiGianKetThuc: new Date('2024-03-18'),
        NoiKhoiHanh: 'Hà Nội',
        SoChoConNhan: 30,
        idDoiTac: 'Công ty ABC',
        giaTreEm: 2000000,
        giaNguoiLon: 3000000,
        NgayThem: new Date('2024-01-01'),
        dichVuDiKem: 'Bảo hiểm du lịch, hướng dẫn viên',
        lichTrinh: '',
        TinhTrang: 'Tạm hoãn'
      },
      {
        idTour: 'TOUR004',
        TenTour: 'Du lịch Đà Nẵng',
        loaiTour: 'Trong nước',
        PhuongTienDiChuyen: 'Ô tô',
        MoTa: '<p>Tour du lịch Đà Nẵng 3 ngày 2 đêm</p>',
        SoLuongNguoiLon: 2,
        SoLuongTreEm: 1,
        ThoiGianBatDau: new Date('2024-03-15'),
        ThoiGianKetThuc: new Date('2024-03-18'),
        NoiKhoiHanh: 'Hà Nội',
        SoChoConNhan: 30,
        idDoiTac: 'Công ty ABC',
        giaTreEm: 2000000,
        giaNguoiLon: 3000000,
        NgayThem: new Date('2024-01-01'),
        dichVuDiKem: 'Bảo hiểm du lịch, hướng dẫn viên',
        lichTrinh: '',
        TinhTrang: 'Tạm hoãn'
      },

    ];

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      const tour = this.tours.find(tour => tour.idTour === id);
      if (tour) {
        const tourData = {
          idTour: tour.idTour,
          TenTour: tour.TenTour,
          loaiTour: tour.loaiTour,
          PhuongTienDiChuyen: tour.PhuongTienDiChuyen,
          MoTa: tour.MoTa,
          SoLuongNguoiLon: tour.SoLuongNguoiLon,
          SoLuongTreEm: tour.SoLuongTreEm,
          ThoiGianBatDau: tour.ThoiGianBatDau.toISOString().slice(0, 16),
          ThoiGianKetThuc: tour.ThoiGianKetThuc.toISOString().slice(0, 16),
          NoiKhoiHanh: tour.NoiKhoiHanh,
          SoChoConNhan: tour.SoChoConNhan,
          idDoiTac: tour.idDoiTac,
          giaTreEm: tour.giaTreEm,
          giaNguoiLon: tour.giaNguoiLon,
          NgayThem: tour.NgayThem.toISOString(),
          dichVuDiKem: tour.dichVuDiKem,
          lichTrinh: tour.lichTrinh,
          TinhTrang: tour.TinhTrang
        };
        this.suaTourForm.patchValue(tourData);
        this.Text = tour.MoTa;
      }
    });


  }

  //sửa tour
  SuaTour() {
    const tourData = this.suaTourForm.value;
    tourData.MoTa = this.Text;
    console.log(tourData, this.Text);
    // Bây giờ bạn có thể sử dụng tourData để thực hiện các thao tác tiếp theo
  }


















































  //form group 
  suaTourForm = new FormGroup({
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
