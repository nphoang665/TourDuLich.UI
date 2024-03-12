import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { themTour } from '../models/them-tour.model';
import { QuanLyTourService } from '../services/quan-ly-tour.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ppid } from 'node:process';
import { read } from 'node:fs';

@Component({
  selector: 'app-them-tour',
  templateUrl: './them-tour.component.html',
  styleUrl: './them-tour.component.css'
})
export class ThemTourComponent implements OnInit, OnDestroy {

  //form group
  ThemTourForm: FormGroup = new FormGroup({
    idTour: new FormControl(''),
    tenTour: new FormControl(''),
    loaiTour: new FormControl(''),
    phuongTienDiChuyen: new FormControl(''),
    moTa: new FormControl(''),
    soLuongNguoiLon: new FormControl(0),
    soLuongTreEm: new FormControl(0),
    thoiGianBatDau: new FormControl(''),
    thoiGianKetThuc: new FormControl(''),
    noiKhoiHanh: new FormControl(''),
    soChoConNhan: new FormControl(0),
    idDoiTac: new FormControl(''),
    giaTreEm: new FormControl(0),
    giaNguoiLon: new FormControl(0),
    ngayThem: new FormControl(''),
    dichVuDiKem: new FormControl(''),
    tinhTrang: new FormControl('')
  });



  private addTourSubscribtion?: Subscription;

  model: themTour = {
    idTour: '',
    tenTour: '',
    loaiTour: '',
    phuongTienDiChuyen: '',
    moTa: '',
    soLuongNguoiLon: '',
    soLuongTreEm: '',
    thoiGianBatDau: new Date(),
    thoiGianKetThuc: new Date(),
    noiKhoiHanh: '',
    soChoConNhan: '',
    idDoiTac: '',
    giaTreEm: '',
    giaNguoiLon: '',
    ngayThem: new Date(),
    dichVuDiKem: '',
    tinhTrang: '',
    imgSelected: [],
  }


  Text: string = '';
  editorConfig = {
    base_url: '/tinymce',
    suffix: '.min',
    plugins: 'lists link image table wordcount'
  };

  constructor(
    public domSanitizer: DomSanitizer,
    private quanLyTourService: QuanLyTourService,
    private router: Router,
  ) {
    this.model = {
      idTour: '',
      tenTour: '',
      loaiTour: '',
      phuongTienDiChuyen: '',
      moTa: '',
      soLuongNguoiLon: "0",
      soLuongTreEm: '0',
      thoiGianBatDau: new Date(),
      thoiGianKetThuc: new Date(),
      noiKhoiHanh: '',
      soChoConNhan: '1',
      idDoiTac: '',
      giaTreEm: '1',
      giaNguoiLon: '1',
      ngayThem: new Date(),
      dichVuDiKem: '',
      tinhTrang: '',
      imgSelected: this.selectedFile,
    }
  }
  ngOnDestroy(): void {
    this.addTourSubscribtion?.unsubscribe();
  }
  ngOnInit(): void {

  }

  get sanitizedText() {
    return this.domSanitizer.bypassSecurityTrustHtml(this.model?.moTa || '');
  }

  //thêm tour
  ThemTour() {
    console.log(this.model);

    // const tourData = this.ThemTourForm.value;
    // tourData.NgayThem = new Date().toISOString();
    // tourData.MoTa = this.Text;
    // console.log(tourData);

    // console.log(this.model);

    // Bây giờ bạn có thể sử dụng tourData để thực hiện các thao tác tiếp theo
    this.addTourSubscribtion = this.quanLyTourService.themTourDuLich(this.model)
      .subscribe({
        next: (response) => {
          this.router.navigateByUrl('/quanlytour');
          // console.log(response);

        }
      })


  }

  onFormSubmit() {

  }


  selectedFile: any[] = [];
  previewingFileImg: any[] = [];
  onFileSelected(event: any) {
    const files = event.target.files;
    if (files) {
      for (let index = 0; index < files.length; index++) {
        const file = files[index];
        const reader = new FileReader();
        reader.onload = (e) => {
          // Chuyển đổi hình ảnh thành chuỗi Base64 và thêm vào mảng
          this.model.imgSelected.push(e.target?.result as string);
        }
        reader.readAsDataURL(file);
      }
    }
  }
  XoaImgPreviewing(index: number) {
    this.selectedFile.splice(index, 1);
    this.previewingFileImg.splice(index, 1);
  }












































}













































