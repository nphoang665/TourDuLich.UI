import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { TourDuLich } from '../models/tour-du-lich.model';
import { QuanLyTourService } from '../services/quan-ly-tour.service';
import { SuaTour } from '../models/sua-tour.model';
import { Subscription } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { DoitacService } from '../services/DoiTac/doitac.service';
import { DoiTac } from '../models/doi-tac.model';
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

  ///////
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
  DoiTac: any[] = [];
  constructor(
    public domSanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private quanLyTourService: QuanLyTourService,
    private doiTacServices: DoitacService,

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
    });
    this.doiTacServices.getAllDoiTac().subscribe((data: DoiTac[]) => {
      this.DoiTac = data;
      console.log(this.DoiTac);

    })


  }

  //hiển thị ảnh từ db
  //khai báo mảng chứa file lấy từ db
  fileImgPreviewFromDb: any[] = [];
  HienThiAnhPreview() {
    for (let index = 0; index < this.model?.anhTour.length; index++) {
      const stringHttpsImg = environment.apiBaseUrl + '/uploads/' + this.model?.anhTour[index].imgTour;
      this.fileImgPreviewFromDb.push(stringHttpsImg);
    }
  }

  //hàm thêm mới ảnh
  //khai báo mảng chứa file thêm mới chưa có trong db
  fileImgPreviewFromBrowse: any[] = [];
  OnFileSelected(event: any) {
    const files = event.target.files;
    if (files) {
      for (let index = 0; index < files.length; index++) {
        const file = files[index];
        const reader = new FileReader();
        reader.onload = (e) => {
          this.fileImgPreviewFromBrowse.push(e.target?.result as string);
          // console.log(e.target?.result as string);

        }
        reader.readAsDataURL(file);

      }
    }


  }

  //xóa ảnh previewing
  //khai báo mảng chứa những phần tử trong db được người dùng xóa
  arrImgPreviewClientHandle: any[] = [];
  XoaImgPreviewing(item: any) {
    //duyệt xem item có trong arr không? 
    // 1. Duyệt trong mảng fileImgPreviewFromDb xem đã có dữ liệu chưa? 
    let found_fileImgPreviewFromDb = this.fileImgPreviewFromDb.find(el => el === item);
    if (found_fileImgPreviewFromDb) {
      //nếu tìm thấy trong mảng found_fileImgPreviewFromDb
      console.log('có trong mảng fileImgPreviewFromDb');
      // 3. Nếu fileImgPreviewFromDb có thì xóa và dừng hàm.
      // dùng filter để xóa phần tử trong mảng
      this.arrImgPreviewClientHandle.push(item);
      this.fileImgPreviewFromDb = this.fileImgPreviewFromDb.filter(itm => itm !== item);
      return;
    }
    else {
      // 2. Nếu không có tiếp tục duyệt mảng fileImgPreviewFromBrowse xem có chưa? 
      let found_fileImgPreviewFromBrowse = this.fileImgPreviewFromBrowse.find(el => el === item);
      if (found_fileImgPreviewFromBrowse) {
        // nếu tìm thấy trong mảng fileImgPreviewFromBrowse 
        // 4. Nếu fileImgPreviewFromBrowse có thì xóa và dừng hàm. 
        console.log('có trong mảng fileImgPreviewFromBrowse');
        // dùng filter để xóa phần tử trong mảng
        this.fileImgPreviewFromBrowse = this.fileImgPreviewFromBrowse.filter(itm => itm !== item);
        return;
      }
      else {

        // 5. Nếu cả 2 không có thì log exception
        console.log("Không tìm thấy ảnh trong 2 mảng");

      }
    }


    // ```````````````````````````````
    // Các array đùng để post vào api
    // fileImgPreviewFromBrowse  &&  arrImgPreviewClientHandle
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
        anhTourDb: this.arrImgPreviewClientHandle,
        anhTourBrowse: this.fileImgPreviewFromBrowse

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
