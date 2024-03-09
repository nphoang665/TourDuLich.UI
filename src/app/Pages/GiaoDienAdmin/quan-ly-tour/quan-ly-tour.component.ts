import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

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
  selector: 'app-quan-ly-tour',
  templateUrl: './quan-ly-tour.component.html',
  styleUrl: './quan-ly-tour.component.css'
})
export class QuanLyTourComponent implements OnInit {
  tours: Tour[] = []
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
        TinhTrang: 'Còn chỗ'
      },
      {
        idTour: 'TOUR002',
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
        TinhTrang: 'Còn chỗ'
      },
      {
        idTour: 'TOUR003',
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
        TinhTrang: 'Còn chỗ'
      },
      {
        idTour: 'TOUR004',
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
        TinhTrang: 'Còn chỗ'
      },

    ];
  }
}
