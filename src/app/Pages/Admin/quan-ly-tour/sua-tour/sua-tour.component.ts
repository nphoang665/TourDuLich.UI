import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, ValidationErrors, Validators } from '@angular/forms';
import { TourDuLich } from '../../models/tour-du-lich.model';
import { Subscription } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { DoiTac } from '../../models/doi-tac.model';
import { environment } from '../../../../../environments/environment';
import { SuaTour } from '../../models/sua-tour.model';
import { QuanLyTourService } from '../../services/quan-ly-tour.service';
import { DoiTacService } from '../../services/DoiTac/doi-tac.service';
import { ToastrService } from 'ngx-toastr';
import { ChangeEventArgs, DateTimePicker } from '@syncfusion/ej2-calendars';
import { FormsModule, ValidatorFn, } from '@angular/forms';
import { ReactiveFormsModule, Validator, AbstractControl } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-sua-tour',
  templateUrl: './sua-tour.component.html',
  styleUrl: './sua-tour.component.css'
})
export class SuaTourComponent implements OnInit, OnDestroy {
  matcher = new MyErrorStateMatcher();
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
  get tenTour() {
    return this.suaTourForm.get('tenTour');
  }
  get loaiTour() {
    return this.suaTourForm.get('loaiTour');
  }
  get phuongTienDiChuyen() {
    return this.suaTourForm.get('phuongTienDiChuyen');
  }
  get moTa() {
    return this.suaTourForm.get('moTa');
  }
  get soLuongNguoiLon() {
    return this.suaTourForm.get('soLuongNguoiLon');
  }
  get soLuongTreEm() {
    return this.suaTourForm.get('soLuongTreEm');
  }
  get thoiGianBatDau() {
    return this.suaTourForm.get('thoiGianBatDau');
  }
  get thoiGianKetThuc() {
    return this.suaTourForm.get('thoiGianKetThuc');
  }
  get noiKhoiHanh() {
    return this.suaTourForm.get('noiKhoiHanh');
  }
  get idDoiTac() {
    return this.suaTourForm.get('idDoiTac');
  }
  get giaTreEm() {
    return this.suaTourForm.get('giaTreEm');
  }
  get giaNguoiLon() {
    return this.suaTourForm.get('giaNguoiLon');
  }
  get ngayThem() {
    return this.suaTourForm.get('ngayThem');
  }
  get dichVuDiKem() {
    return this.suaTourForm.get('dichVuDiKem');
  }
  get tinhTrang() {
    return this.suaTourForm.get('tinhTrang');
  }
  noSpecialCharValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const invalidChar = /^[^\d~`!@#$%\^&*()_+=\-\[\]\\';,/{}|\\":<>\?]*$/.test(control.value);
      return invalidChar ? null : { 'invalidChar': { value: control.value } };
    };
  }
  kiemLoiNgayNhoHonHienTai(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const ngayChonTuInput = new Date(control.value);
      const ngayHienTai = new Date();
      ngayHienTai.setHours(0, 0, 0, 0);
      return ngayChonTuInput < ngayHienTai ? { 'dateInvalid': true } : null;
    }
  }
  kiemLoiNgayBatDauNhoHonNgayKetThuc(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const ngayBatDau = new Date(control.parent?.get('thoiGianBatDau')?.value);
      const ngayKetThuc = new Date(control.parent?.get('thoiGianKetThuc')?.value);
      // console.log(ngayBatDau, ngayKetThuc);

      return ngayBatDau > ngayKetThuc ? { 'ngayKetThucInvalid': true } : null;
      return { 'ngayKetThucInvalid': true };
    }
  }
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
    private doiTacServices: DoiTacService,
    private toastr: ToastrService,
    private router: Router) { }

  get sanitizedText() {
    console.log(this.model?.moTa);

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

    this.id = this.route.snapshot.paramMap.get('id')

    if (this.id) {
      this.quanLyTourService.getTourDuLichById(this.id).subscribe((data: TourDuLich) => {
        if (data) {
          this.model = data;
          this.HienThiAnhPreview();
          this.initializeForm();
          // this.suaTourForm.get('soChoConNhan')?.disable();
          this.suaTourForm.get('soLuongTreEm')?.valueChanges.subscribe(() => {
            this.updateSoChoConNhan();
          });
          this.suaTourForm.get('soLuongNguoiLon')?.valueChanges.subscribe(() => {
            this.updateSoChoConNhan();
          });
          this.updateSoChoConNhan();
        } else {
          console.error('Không tìm thấy tour có ID: ', this.id);
        }
      })

    }

    this.doiTacServices.getAllDoiTac().subscribe((data: DoiTac[]) => {
      this.DoiTac = data;
    })

    let datetimepicker: DateTimePicker = new DateTimePicker({
      placeholder: "Select DateTime",
      change: (args: ChangeEventArgs) => {
        const selectedDate = args.value as Date;
        const formattedDate = this.formatDate(selectedDate);
        var a = new Date(formattedDate).toISOString();
        this.suaTourForm.get('thoiGianBatDau')?.setValue(a);
      }
    });
    datetimepicker.appendTo('#element');

    let datetimepicker2: DateTimePicker = new DateTimePicker({
      placeholder: "Select DateTime2",
      change: (args: ChangeEventArgs) => {
        const selectedDate = args.value as Date;
        const formattedDate = this.formatDate(selectedDate);
        var a = new Date(formattedDate).toISOString();
        this.suaTourForm.get('thoiGianKetThuc')?.setValue(a);
      }
    });
    datetimepicker2.appendTo('#element2');
  }
  updateSoChoConNhan(): void {
    const soLuongTreEm = this.suaTourForm.get('soLuongTreEm')?.value || 0;
    const soLuongNguoiLon = this.suaTourForm.get('soLuongNguoiLon')?.value || 0;
    console.log(soLuongTreEm, soLuongNguoiLon);

    this.suaTourForm.get('soChoConNhan')?.setValue(soLuongTreEm + soLuongNguoiLon);
  }

  formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // getMonth trả về giá trị từ 0 đến 11
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  initializeForm(): void {
    this.suaTourForm = new FormGroup({
      tenTour: new FormControl(this.model?.tenTour || '', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(50),
        this.noSpecialCharValidator(),
      ]),
      loaiTour: new FormControl(this.model?.loaiTour || '',
        Validators.required),
      phuongTienDiChuyen: new FormControl(this.model?.phuongTienDiChuyen || '',
        Validators.required),
      moTa: new FormControl(this.model?.moTa || '',
        Validators.required),
      soLuongNguoiLon: new FormControl(this.model?.soLuongNguoiLon || 0, [
        Validators.required,
        Validators.min(0),
        Validators.max(50),

      ]),
      soLuongTreEm: new FormControl(this.model?.soLuongTreEm || 0, [
        Validators.required,
        Validators.min(0),
        Validators.max(50),

      ]),
      thoiGianBatDau: new FormControl(this.model?.thoiGianBatDau || '',
        Validators.required),
      thoiGianKetThuc: new FormControl(this.model?.thoiGianKetThuc || '',
        Validators.required),
      noiKhoiHanh: new FormControl(this.model?.noiKhoiHanh || '', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(50),

      ]),
      soChoConNhan: new FormControl(this.model?.soChoConNhan || 0),
      idDoiTac: new FormControl(this.model?.idDoiTac || '',
        Validators.required),
      giaTreEm: new FormControl(this.model?.giaTreEm || 0, [
        Validators.required,
        Validators.min(0),
        Validators.max(10000000),

      ]),
      giaNguoiLon: new FormControl(this.model?.giaNguoiLon || 0, [
        Validators.required,
        Validators.min(0),
        Validators.max(10000000),

      ]),
      ngayThem: new FormControl(this.model?.ngayThem || ''),
      dichVuDiKem: new FormControl(this.model?.dichVuDiKem || '', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(50),

      ]),
      tinhTrang: new FormControl(this.model?.tinhTrang || '',
        Validators.required),
      anhTourDb: new FormControl(this.arrImgPreviewClientHandle || []),
      anhTourBrowse: new FormControl(this.fileImgPreviewFromBrowse || [])
    });
  }

  //hiển thị ảnh từ db
  //khai báo mảng chứa file lấy từ db
  fileImgPreviewFromDb: any[] = [];
  HienThiAnhPreview() {
    for (let index = 0; index < this.model?.anhTour.length; index++) {
      const stringHttpsImg = environment.apiBaseUrl + '/uploads/' + this.model?.anhTour[index].imgTour;
      this.fileImgPreviewFromDb.push(stringHttpsImg);
      console.log(this.fileImgPreviewFromDb);

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
    if (this.fileImgPreviewFromDb.length === 0 && this.fileImgPreviewFromBrowse.length === 0) {
      this.toastr.warning('Một tour phải có ít nhất 1 ảnh', 'Thông báo', {
        timeOut: 1000,
      });
      return;
    }

    if (this.model && this.id) {
      const suaTour: SuaTour = { ...this.suaTourForm.value };
      suaTour.anhTourBrowse = this.fileImgPreviewFromBrowse;
      suaTour.anhTourDb = this.arrImgPreviewClientHandle;
      // console.log(suaTour);

      this.quanLyTourService.suaTourDuLich(this.id, suaTour).subscribe((response) => {
        this.router.navigateByUrl('/quanlytour');
        // console.log(response);
        this.toastr.success('Sửa tour thành công', 'Thông báo', {
          timeOut: 1000,
        });
      })
    }
  }




  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
    this.updateTourSubcription?.unsubscribe();
  }














































}
