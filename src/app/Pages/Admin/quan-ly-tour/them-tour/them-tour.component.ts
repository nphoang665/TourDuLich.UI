import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, ValidationErrors, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { themTour } from '../../models/them-tour.model';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DoiTac } from '../../models/doi-tac.model';
import { QuanLyTourService } from '../../services/quan-ly-tour.service';
import { DoiTacService } from '../../services/DoiTac/doi-tac.service';
import { ChangeEventArgs, DateTimePicker } from '@syncfusion/ej2-calendars';
import { FormsModule, ValidatorFn, } from '@angular/forms';
import { ReactiveFormsModule, Validator, AbstractControl } from '@angular/forms';
import { DateAdapter, ErrorStateMatcher, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as _moment from 'moment';
import { default as _rollupMoment } from 'moment';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'DD-MM-YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};
@Component({
  selector: 'app-them-tour',
  templateUrl: './them-tour.component.html',
  styleUrl: './them-tour.component.css',
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class ThemTourComponent implements OnInit, OnDestroy {
  submitted = false;
  matcher = new MyErrorStateMatcher();
  //form group
  ThemTourForm: FormGroup = new FormGroup({
    idTour: new FormControl('123'),
    tenTour: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(50),
      this.noSpecialCharValidator(),
    ]),
    loaiTour: new FormControl('',
      Validators.required),
    phuongTienDiChuyen: new FormControl('',
      Validators.required),
    moTa: new FormControl('',
      Validators.required),
    soLuongNguoiLon: new FormControl(1, [
      Validators.required,
      Validators.min(0),
      Validators.max(100),

    ]),
    soLuongTreEm: new FormControl(1, [
      Validators.required,
      Validators.min(0),
      Validators.max(100),

    ]),
    thoiGianBatDau: new FormControl(moment().format('DD/MM/YYYY hh:mm'), [
      Validators.required,
      this.kiemLoiNgayNhoHonHienTai(),
      this.kiemLoiNgayBatDauNhoHonNgayKetThuc(),
    ]
    ),
    thoiGianKetThuc: new FormControl(moment().format('DD/MM/YYYY hh:mm'), [
      Validators.required,
      this.kiemLoiNgayNhoHonHienTai(),
      this.kiemLoiNgayBatDauNhoHonNgayKetThuc()]),
    noiKhoiHanh: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(50),

    ]),
    soChoConNhan: new FormControl(''),
    idDoiTac: new FormControl('',
      Validators.required),
    giaTreEm: new FormControl('', [
      Validators.required,
      Validators.min(0),
      Validators.max(10000000),

    ]),
    giaNguoiLon: new FormControl('', [
      Validators.required,
      Validators.min(0),
      Validators.max(10000000),

    ]),
    ngayThem: new FormControl(new Date()),
    dichVuDiKem: new FormControl('', [
      Validators.required,
      Validators.minLength(0),
      Validators.maxLength(50),

    ]),
    tinhTrang: new FormControl('z')
  });
  get tenTour() {
    return this.ThemTourForm.get('tenTour');
  }
  get loaiTour() {
    return this.ThemTourForm.get('loaiTour');
  }
  get phuongTienDiChuyen() {
    return this.ThemTourForm.get('phuongTienDiChuyen');
  }
  get moTa() {
    return this.ThemTourForm.get('moTa');
  }
  get soLuongNguoiLon() {
    return this.ThemTourForm.get('soLuongNguoiLon');
  }
  get soLuongTreEm() {
    return this.ThemTourForm.get('soLuongTreEm');
  }
  get thoiGianBatDau() {
    return this.ThemTourForm.get('thoiGianBatDau');
  }
  get thoiGianKetThuc() {
    return this.ThemTourForm.get('thoiGianKetThuc');
  }
  get noiKhoiHanh() {
    return this.ThemTourForm.get('noiKhoiHanh');
  }
  get idDoiTac() {
    return this.ThemTourForm.get('idDoiTac');
  }
  get giaTreEm() {
    return this.ThemTourForm.get('giaTreEm');
  }
  get giaNguoiLon() {
    return this.ThemTourForm.get('giaNguoiLon');
  }
  get ngayThem() {
    return this.ThemTourForm.get('ngayThem');
  }
  get dichVuDiKem() {
    return this.ThemTourForm.get('dichVuDiKem');
  }
  get tinhTrang() {
    return this.ThemTourForm.get('tinhTrang');
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
  

  private addTourSubscribtion?: Subscription;




  Text: string = '';
  editorConfig = {
    base_url: '/tinymce',
    suffix: '.min',
    plugins: 'lists link image table wordcount media',

  };

  constructor(
    public domSanitizer: DomSanitizer,
    private quanLyTourService: QuanLyTourService,
    private router: Router,
    private toastr: ToastrService,
    private doiTacServices: DoiTacService,

  ) {

  }


  onFieldTouched(fieldName: string): void {
    this.ThemTourForm.get(fieldName)?.markAsTouched();
  }

  ngOnDestroy(): void {
    this.addTourSubscribtion?.unsubscribe();
  }
  DoiTac: any[] = [];
  ngOnInit(): void {
    // this.ThemTourForm.get('soChoConNhan')?.disable();

    this.ThemTourForm.get('soLuongTreEm')?.valueChanges.subscribe(() => {
      this.updateSoChoConNhan();
    });

    this.ThemTourForm.get('soLuongNguoiLon')?.valueChanges.subscribe(() => {
      this.updateSoChoConNhan();
    });


    //lấy đối tác
    this.doiTacServices.getAllDoiTac().subscribe((data: DoiTac[]) => {
      this.DoiTac = data;
      console.log(this.DoiTac);

    })

    let datetimepicker: DateTimePicker = new DateTimePicker({
      placeholder: "Select DateTime",
      change: (args: ChangeEventArgs) => {
        const selectedDate = args.value as Date;
        const hasTime = selectedDate.getHours() !== 0 || selectedDate.getMinutes() !== 0;
        const formattedDate = this.formatDate(selectedDate, hasTime);
        this.ThemTourForm.get('thoiGianBatDau')?.setValue(formattedDate);
      }
      
    });
    datetimepicker.appendTo('#element');
    
    let datetimepicker2: DateTimePicker = new DateTimePicker({
      placeholder: "Select DateTime2",
      change: (args: ChangeEventArgs) => {
        const selectedDate = args.value as Date;
        const hasTime = selectedDate.getHours() !== 0 || selectedDate.getMinutes() !== 0;
        const formattedDate = this.formatDate(selectedDate, hasTime);
        this.ThemTourForm.get('thoiGianKetThuc')?.setValue(formattedDate);
      }
    });
    datetimepicker2.appendTo('#element2');
    
  }
  formatDate(date: Date, hasTime: boolean = false): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
    const year = date.getFullYear();
    
    if (hasTime) {
      let hours = date.getHours().toString().padStart(2, '0');
      let minutes = date.getMinutes().toString().padStart(2, '0');
      return `${day}/${month}/${year} ${hours}:${minutes}`;
    } else {
      return `${day}/${month}/${year} 12:00`;
    }
  }
  
  
  
  
  
  
  updateSoChoConNhan(): void {
    const soLuongTreEm = this.ThemTourForm.get('soLuongTreEm')?.value || 0;
    const soLuongNguoiLon = this.ThemTourForm.get('soLuongNguoiLon')?.value || 0;
    this.ThemTourForm.get('soChoConNhan')?.setValue(soLuongTreEm + soLuongNguoiLon);
  }
  get sanitizedText() {
    const moTaControl = this.ThemTourForm.get('moTa');
    return this.domSanitizer.bypassSecurityTrustHtml(moTaControl?.value || '');
  }
  IsDisplayPreviewDescription: boolean = false;
  Fn_Display_Description() {
    if (this.IsDisplayPreviewDescription === false) {
      this.IsDisplayPreviewDescription = true;
    }
    else {
      this.IsDisplayPreviewDescription = false;
    }
  }
  get f(): { [key: string]: any } {
    return this.ThemTourForm.controls;
  }
  //thêm tour
  ThemTour() {   
    if (this.previewingFileImg.length === 0) {
      this.toastr.warning('Bạn chưa chọn ảnh', 'Thông báo', {
        timeOut: 1000,
      });
      return;
    }
    // Lấy giá trị của soLuongNguoiLon và soLuongTreEm
    // const soLuongNguoiLon = this.ThemTourForm.get('soLuongNguoiLon')?.value || 0;
    // const soLuongTreEm = this.ThemTourForm.get('soLuongTreEm')?.value || 0;

    // Gán soChoConNhan bằng tổng số lượng người lớn và trẻ em
    // this.ThemTourForm.get('soChoConNhan')?.setValue(soLuongNguoiLon + soLuongTreEm);

 // Chuyển đổi định dạng thời gian sang ISO 8601
 const thoiGianBatDauISO = this.formatDateToISO(this.ThemTourForm.get('thoiGianBatDau')?.value);
 const thoiGianKetThucISO = this.formatDateToISO(this.ThemTourForm.get('thoiGianKetThuc')?.value);

 // Cập nhật giá trị của form với định dạng mới
 this.ThemTourForm.get('thoiGianBatDau')?.setValue(thoiGianBatDauISO);
 this.ThemTourForm.get('thoiGianKetThuc')?.setValue(thoiGianKetThucISO);
    this.addTourSubscribtion = this.quanLyTourService.themTourDuLich(this.ThemTourForm.value)
      .subscribe({
        next: (response) => {
          this.router.navigateByUrl('/quanlytour');
          // console.log(response);
          this.toastr.success('Thêm tour thành công', 'Thông báo', {
            timeOut: 1000,
          });
        }
      })
  }
  formatDateToISO(date: string): string {
    const [day, month, yearTime] = date.split('/');
    const [year, time] = yearTime.split(' ');
    const [hour, minute] = time ? time.split(':') : ['00', '00'];
  
    return `${year}-${month}-${day}T${hour}:${minute}:00Z`;
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
          // Khởi tạo hoặc lấy FormArray 'imgSelected'
          let imgSelectedControl = this.ThemTourForm.get('imgSelected') as FormArray<any>;
          if (!imgSelectedControl) {
            imgSelectedControl = new FormArray<any>([]);
            this.ThemTourForm.addControl('imgSelected', imgSelectedControl);
          }
          // Thêm new FormControl vào FormArray và ép kiểu
          imgSelectedControl.push(new FormControl(e.target?.result as string));
          // Thêm chuỗi Base64 vào mảng previewingFileImg
          this.previewingFileImg.push(e.target?.result as string);
        };
        reader.readAsDataURL(file);
      }
    }
  }

  XoaImgPreviewing(index: number) {
    // Lấy FormArray 'imgSelected' và xóa FormControl tương ứng
    let imgSelectedControl = this.ThemTourForm.get('imgSelected') as FormArray<any>;
    if (imgSelectedControl) {
      imgSelectedControl.removeAt(index);
    }

    // Xóa khỏi mảng previewingFileImg
    this.previewingFileImg.splice(index, 1);
  }
}













































