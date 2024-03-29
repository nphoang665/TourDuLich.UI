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
import { ErrorStateMatcher } from '@angular/material/core';
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-sua-dich-vu',
  templateUrl: './sua-dich-vu.component.html',
  styleUrl: './sua-dich-vu.component.css'
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
    ngayThem: new FormControl(new Date()),
    
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
      ]),
      donViTinh: new FormControl(this.model?.donViTinh,[
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50), 
        this.noSpecialCharValidator(),
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

    if (this.model && this.id) {
      const suaDichVU: SuaDichVu = { ...this.myForm.value };
      this.dichVuService.updateDichVu(this.id, suaDichVU).subscribe((response) => {
        console.log(response);
        this.toastr.success('Sửa dịch vụ thành công', 'Thông báo', {
          timeOut: 1000,
        });
      })
      this.ref.close();
    }
  }

}
