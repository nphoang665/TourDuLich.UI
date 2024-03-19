import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { themTour } from '../../../GiaoDienAdmin/models/them-tour.model';
import { DomSanitizer } from '@angular/platform-browser';
import { QuanLyTourService } from '../../../GiaoDienAdmin/services/quan-ly-tour.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DoitacService } from '../../../GiaoDienAdmin/services/DoiTac/doitac.service';
import { DoiTac } from '../../../GiaoDienAdmin/models/doi-tac.model';

@Component({
  selector: 'app-them-tour',
  templateUrl: './them-tour.component.html',
  styleUrl: './them-tour.component.css'
})
export class ThemTourComponent implements OnInit, OnDestroy {
  submitted = false;
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
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private doiTacServices: DoitacService
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

  onFieldTouched(fieldName: string): void {
    this.ThemTourForm.get(fieldName)?.markAsTouched();
  }

  ngOnDestroy(): void {
    this.addTourSubscribtion?.unsubscribe();
  }
  DoiTac: any[] = [];
  ngOnInit(): void {
    this.ThemTourForm = this.formBuilder.group({
      tenTour: ['',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(100)
        ]
      ],
      loaiTour: ['',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(200)
        ]
      ],
      phuongTienDiChuyen: [[],
      [
        Validators.required,
      ]
      ], mota: ['',
        [
          Validators.required,
          Validators.minLength(4),
        ]
      ], soLuongNguoiLon: [[],
      [
        Validators.required,
      ]
      ], soLuongTreEm: [[],
      [
        Validators.required,
      ]
      ], thoiGianBatDau: [[],
      [
        Validators.required,
      ]
      ], thoiGianKetThuc: [[],
      [
        Validators.required,
      ]
      ], noiKhoiHanh: ['',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(50)
        ]
      ], soChoConNhan: [[],
      [
        Validators.required,
      ]
      ], idDoiTac: [[],
      [
        Validators.required,
      ]
      ], giaTreEm: [[],
      [
        Validators.required,
      ]
      ], giaNguoiLon: [[],
      [
        Validators.required,
      ]
      ], ngayThem: [new Date(),
      [
        Validators.required,
      ]
      ], dichVuDiKem: [[],
      [
        Validators.required,
      ]
      ], tinhTrang: [[],
      [
        Validators.required,
      ]
      ],
    })

    //lấy đối tác
    this.doiTacServices.getAllDoiTac().subscribe((data: DoiTac[]) => {
      this.DoiTac = data;
      console.log(this.DoiTac);

    })
  }


  get sanitizedText() {
    return this.domSanitizer.bypassSecurityTrustHtml(this.model?.moTa || '');
  }

  get f(): { [key: string]: any } {
    return this.ThemTourForm.controls;
  }

  //thêm tour
  ThemTour() {
    console.log(this.model);

    // this.submitted = true;
    // if (this.ThemTourForm.invalid) {
    //   return;
    // }
    // console.log(this.model);

    // const tourData = this.ThemTourForm.value;
    // tourData.NgayThem = new Date().toISOString();
    // tourData.MoTa = this.Text;
    // console.log(tourData);

    // console.log(this.model);

    // Bây giờ bạn có thể sử dụng tourData để thực hiện các thao tác tiếp theo
    this.addTourSubscribtion = this.quanLyTourService.themTourDuLich(this.model)
      .subscribe({
        next: (response) => {
          this.router.navigateByUrl('/quanLyTour');
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
          this.previewingFileImg.push(e.target?.result as string);
        }
        reader.readAsDataURL(file);
      }
    }
    console.log(this.previewingFileImg);

  }
  XoaImgPreviewing(index: number) {
    this.selectedFile.splice(index, 1);
    this.previewingFileImg.splice(index, 1);
  }












































}













































