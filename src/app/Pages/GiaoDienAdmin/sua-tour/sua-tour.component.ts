import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { TourDuLich } from '../models/tour-du-lich.model';
import { QuanLyTourService } from '../services/quan-ly-tour.service';
import { SuaTour } from '../models/sua-tour.model';
import { Subscription } from 'rxjs';
import { environment } from '../../../../environments/environment';
@Component({
  selector: 'app-sua-tour',
  templateUrl: './sua-tour.component.html',
  styleUrl: './sua-tour.component.css'
})
export class SuaTourComponent implements OnInit, OnDestroy {
  //form group 
  suaTourForm: FormGroup = new FormGroup({
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


  id?: string | null = null;
  model?: TourDuLich;

  routeSubscription?: Subscription;
  updateTourSubcription?: Subscription;

  Text: string = '';
  IsDisplayPreviewDescription: boolean = false;
  editorConfig = {
    base_url: '/tinymce',
    suffix: '.min',
    plugins: 'lists link image table wordcount'
  };
  constructor(
    public domSanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private quanLyTourService: QuanLyTourService,
    private router: Router) { }
  Test() {
    console.log(this.model?.moTa);
  }
  get sanitizedText() {
    return this.domSanitizer.bypassSecurityTrustHtml(this.model?.moTa || '');
  }
  Fn_Display_Description() {
    if (this.IsDisplayPreviewDescription === false) {
      this.IsDisplayPreviewDescription = true;
    }
    else {
      this.IsDisplayPreviewDescription = false;
    }
  }
  previewingFileImg: any[] = [];
  ngOnInit(): void {

    this.routeSubscription = this.route.paramMap.subscribe({
      next: (prams) => {
        this.id = prams.get('id');

        if (this.id) {
          this.quanLyTourService.getTourDuLichById(this.id)
            .subscribe({
              next: (response) => {
                this.model = response;



                this.HienThiAnhPreview()
              }
            })
        }
      }
    })


  }
  HienThiAnhPreview() {
    for (let index = 0; index < this.model?.anhTour.length; index++) {
      const stringHttpsImg = environment.apiBaseUrl + '/uploads/' + this.model?.anhTour[index].imgTour;
      this.previewingFileImg.push(stringHttpsImg);
    }
  }
  XoaImgPreviewing(index: number) {

  }
  //sửa tour
  SuaTour() {
    // const tourData = this.suaTourForm.value;
    // tourData.moTa = this.Text;
    // console.log(tourData, this.Text);
    // Bây giờ bạn có thể sử dụng tourData để thực hiện các thao tác tiếp theo

    if (this.model && this.id) {
      var updateTourDuLich: SuaTour = {
        tenTour: this.model.tenTour,
        loaiTour: this.model.loaiTour,
        phuongTienDiChuyen: this.model.phuongTienDiChuyen,
        moTa: this.model.moTa,
        soLuongNguoiLon: this.model.soLuongNguoiLon,
        soLuongTreEm: this.model.soLuongTreEm,
        thoiGianBatDau: this.model.thoiGianBatDau,
        thoiGianKetThuc: this.model.thoiGianKetThuc,
        noiKhoiHanh: this.model.noiKhoiHanh,
        soChoConNhan: this.model.soChoConNhan,
        idDoiTac: this.model.idDoiTac,
        giaTreEm: this.model.giaTreEm,
        giaNguoiLon: this.model.giaNguoiLon,
        ngayThem: this.model.ngayThem,
        dichVuDiKem: this.model.dichVuDiKem,
        tinhTrang: this.model.tinhTrang,
        anhTour: ''
      }

      this.updateTourSubcription = this.quanLyTourService.suaTourDuLich(this.id, updateTourDuLich)
        .subscribe({
          next: (response) => {
            this.router.navigateByUrl('/quanlytour');
            console.log(response);

          }
        })
    }
  }




  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
    this.updateTourSubcription?.unsubscribe();
  }














































}
