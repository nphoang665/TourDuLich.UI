import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { QuanLyDichVuService } from '../../services/DichVu/quan-ly-dich-vu.service';
import { DichVu } from '../../models/Dich-Vu.model';
import { TimePicker } from '@syncfusion/ej2-calendars';
import { enableRipple } from '@syncfusion/ej2-base';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormsModule, ValidatorFn, } from '@angular/forms';
import { ReactiveFormsModule,  Validator, AbstractControl } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-them-dich-vu',
  templateUrl: './them-dich-vu.component.html',
  styleUrl: './them-dich-vu.component.css'
})
export class ThemDichVuComponent implements OnInit {
  isEditing: boolean = false;
  matcher = new MyErrorStateMatcher();
  myForm: FormGroup = new FormGroup({
    idDichVu: new FormControl(''
      
    ),
    tenDichVu: new FormControl('',[
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(50),
      this.noSpecialCharValidator(),
    ]),
    donViTinh: new FormControl('',[
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(50), 
      this.noSpecialCharValidator(),
    ]),
    giaTien: new FormControl('',[
      Validators.required,
      Validators.min(10000),
      
      
    ]),
    tinhTrang: new FormControl('',[
    
      
    ]),
    gioBatDau: new FormControl('',
    Validators.required),
    gioKetThuc: new FormControl('',
    Validators.required),
    ngayThem: new FormControl(new Date()
   ),
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
  noSpecialCharValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const invalidChar = /^[^\d~`!@#$%\^&*()_+=\-\[\]\\';,/{}|\\":<>\?]*$/.test(control.value);
      return invalidChar ? null : { 'invalidChar': { value: control.value } };
    };
  }
  get gioKetThuc(){
    return this.myForm.get('gioKetThuc');
  }
  
  get ngayThem(){
    return this.myForm.get('ngayThem');
  }
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<ThemDichVuComponent>,
    private dichVuService: QuanLyDichVuService,
    private toastr: ToastrService
  ) { }
  formatTime(hours: number, minutes: number): string {
    const period = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${formattedHours}:${formattedMinutes} ${period}`;
  }
  ClosePopup() {
    this.ref.close();
  }

  ngOnInit(): void {
    let month: number = new Date().getMonth();
    let fullYear: number = new Date().getFullYear();
    let date: number = new Date().getDate();

    let timeObject: TimePicker = new TimePicker({
      min: new Date(fullYear, month, date, 4),
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
      min: new Date(fullYear, month, date, 4),
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

  themDichVu() {
    if (!this.isEditing) {
      // Chuyển đổi giá trị giaTien từ chuỗi sang số nguyên
      const giaTienValue = parseInt(this.myForm.get('giaTien')?.value, 10);
      this.myForm.get('giaTien')?.setValue(giaTienValue);

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

      this.dichVuService.createDichVu(formData)
        .subscribe({
          next: (response) => {
            this.ClosePopup();
            this.toastr.success('Thêm dịch vụ thành công', 'Thông báo', {
              timeOut: 1000,
            });

          },
          error: (error) => {
            console.error('Lỗi khi thêm dịch vụ:', error);
            this.toastr.error('Đã có lỗi xảy ra', 'Thông báo', {
              timeOut: 2000,
            });
          },
        });
    }
    console.log(this.myForm.value);
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
