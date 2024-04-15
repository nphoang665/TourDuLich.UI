import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { QuanLyDichVuService } from '../../services/DichVu/quan-ly-dich-vu.service';
import { ToastrService } from 'ngx-toastr';
import { TimePicker } from '@syncfusion/ej2-calendars/src';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { DichVu, SuaDichVu } from '../../models/Dich-Vu.model';
import { enableRipple } from '@syncfusion/ej2-base';
import { DatePipe } from '@angular/common';
import { FormsModule, ValidatorFn, } from '@angular/forms';
import { ReactiveFormsModule,  Validator, AbstractControl } from '@angular/forms';
import { DateAdapter, ErrorStateMatcher, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as _moment from 'moment';
import {default as _rollupMoment} from 'moment';
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
  selector: 'app-sua-dich-vu',
  templateUrl: './sua-dich-vu.component.html',
  styleUrl: './sua-dich-vu.component.css',
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class SuaDichVuComponent implements OnInit {
  isEditing: boolean = false;
  inputdata: any;
  model?: DichVu;
  matcher = new MyErrorStateMatcher();
  myForm : FormGroup = new FormGroup({
    tenDichVu: new FormControl(''),
    donViTinh: new FormControl(''),
    giaTien: new FormControl(''),
    tinhTrang: new FormControl(''),
    gioBatDau: new FormControl(''),
    gioKetThuc: new FormControl(''),
    ngayThem: new FormControl(moment(new Date())),
    
  })
  get tenDichVu(){
    return this.myForm.get('tenDichVu');
  }
  get donViTinh(){
    return this.myForm.get('donViTinh');
  }
  get giaTien(){
    return this.myForm.get('giaTien');
  }
  get tinhTrang(){
    return this.myForm.get('tinhTrang');
  }
  get gioBatDau(){
    return this.myForm.get('gioBatDau');

  }
  get gioKetThuc(){
    return this.myForm.get('gioKetThuc');
  }
  get ngayThem(){
    return this.myForm.get('ngayThem');
  }
  noSpecialCharValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const invalidChar = /^[^\d~`!@#$%\^&*()_+=\-\[\]\\';,/{}|\\":<>\?]*$/.test(control.value);
      return invalidChar ? null : { 'invalidChar': { value: control.value } };
    };
  }
  noWhitespaceValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const isWhitespace = (control.value || '').trim().length === 0;
      return !isWhitespace ? null : { 'whitespace': true };
    }
  }
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<SuaDichVuComponent>,
    private dichVuService: QuanLyDichVuService,
    private toastr: ToastrService,
    private datePipe: DatePipe
  ) { }
  id?: string | null = null;

  ngOnInit(): void {
    enableRipple(true);
    this.inputdata = this.data;
    this.id = this.data.idDichVu;
    if (this.id) {
      this.dichVuService.getDichVuById(this.id).subscribe((data: DichVu) => {
        if (data) {
          this.model = data;
          this.initalizeForm();
        } else {
          console.error('không tìm thấy dịch vụ', this.id);
        }
      });
    }

    let month: number = new Date().getMonth();
    let fullYear: number = new Date().getFullYear();
    let date: number = new Date().getDate();

    let timeObject: TimePicker = new TimePicker({
      min: new Date(fullYear, month, date, 7),
      max: new Date(fullYear, month, date, 16),
      value: new Date(fullYear, month, date, 20, 0) // 20:00 PM
    });
    timeObject.appendTo('#element');
    timeObject.change = (args: any) => {
      const selectedTime = args.value;
      const hours = selectedTime.getHours();
      const minutes = selectedTime.getMinutes();
      const formattedTime = this.formatTime(hours, minutes);
      this.myForm.get('gioBatDau')?.setValue(formattedTime);
    };

    let timeObject2: TimePicker = new TimePicker({
      min: new Date(fullYear, month, date, 7),
      max: new Date(fullYear, month, date, 16),
      value: new Date(fullYear, month, date, 20, 0) // 20:00 PM
    });
    timeObject2.appendTo('#element2');
    timeObject2.change = (args: any) => {
      const selectedTime = args.value;
      const hours = selectedTime.getHours();
      const minutes = selectedTime.getMinutes();
      const formattedTime = this.formatTime(hours, minutes);
      this.myForm.get('gioKetThuc')?.setValue(formattedTime);
    };
  }
  initalizeForm(): void {
    this.myForm = new FormGroup({
      idDichVu: new FormControl(this.model?.idDichVu),
      tenDichVu: new FormControl(this.model?.tenDichVu,[
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(50),
        this.noSpecialCharValidator(),
        this.noWhitespaceValidator()
      ]),
      donViTinh: new FormControl(this.model?.donViTinh,[
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50), 
        this.noSpecialCharValidator(),
        this.noWhitespaceValidator()
      ]),
      giaTien: new FormControl(this.model?.giaTien,[
        Validators.required,
        Validators.min(10000),
      ]),
      tinhTrang: new FormControl(this.model?.tinhTrang),
      gioBatDau: new FormControl(this.model?.gioBatDau),
      gioKetThuc: new FormControl(this.model?.gioKetThuc),
      // ngayThem: new FormControl(this.datePipe.transform(this.model?.ngayThem, 'dd-MM-yyyy')),
      ngayThem: new FormControl(this.model?.ngayThem)

    })
  }
  formatTime(hours: number, minutes: number): string {
    const period = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${formattedHours}:${formattedMinutes} ${period}`;
  }
  ClosePopup() {
    this.ref.close();
  }

  suaDichVu(event: Event) {
     // Chuyển đổi định dạng giờ từ "5:00 PM" hoặc "20:00 AM" sang "HH:mm"
     const gioBatDauValue = this.convertTimeStringToHHMM(this.myForm.get('gioBatDau')?.value);
     this.myForm.get('gioBatDau')?.setValue(gioBatDauValue);

     const gioKetThucValue = this.convertTimeStringToHHMM(this.myForm.get('gioKetThuc')?.value);
     this.myForm.get('gioKetThuc')?.setValue(gioKetThucValue);

     // Gửi yêu cầu đến backend
     const formData = {
       ...this.myForm.value,
       gioBatDau: this.convertStringToTimeOnly(gioBatDauValue),
       gioKetThuc: this.convertStringToTimeOnly(gioKetThucValue)
     };

    if (this.model && this.id) {
      const suaDichVU: SuaDichVu = { ...this.myForm.value };
      this.dichVuService.updateDichVu(this.id, formData).subscribe((response) => {
        // console.log(response);
        this.toastr.success('Sửa dịch vụ thành công', 'Thông báo', {
          timeOut: 1000,
        });
      })
      this.ref.close();
    }
  }
  convertTimeStringToHHMM(timeString: string): string {
    const [hourMinute, period] = timeString.split(' ');
    let [hour, minute] = hourMinute.split(':').map(Number);

    if (period === 'PM' && hour < 12) {
      hour += 12;
    }

    const formattedTime = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:00`;
    return formattedTime;
  }

  convertStringToTimeOnly(timeString: string): string {
    const [hourStr, minuteStr] = timeString.split(':').map(Number);
    const formattedTime = `${hourStr.toString().padStart(2, '0')}:${minuteStr.toString().padStart(2, '0')}:00`;
    return formattedTime;
  }

}
