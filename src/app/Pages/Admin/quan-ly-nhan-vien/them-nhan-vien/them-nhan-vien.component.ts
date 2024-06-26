import { Component, Inject, OnInit } from '@angular/core';
import { AsyncValidatorFn, FormControl, FormGroup, FormGroupDirective, NgForm, ValidationErrors, Validators } from '@angular/forms';
import { NhanVienService } from '../../services/NhanVien/nhan-vien.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
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
  selector: 'app-them-nhan-vien',
  templateUrl: './them-nhan-vien.component.html',
  styleUrl: './them-nhan-vien.component.css',
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class ThemNhanVienComponent implements OnInit{
  matcher = new MyErrorStateMatcher();
  themNhanVien:FormGroup = new FormGroup({
    idNhanVien:new FormControl('123'),
    tenNhanVien:new FormControl('',[
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(50),
      this.noSpecialCharValidator(),
      this.noWhitespaceValidator()
    ]),
    soDienThoai:new FormControl('', {
      validators:[
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10), 
      Validators.pattern(/^(0[0-9]{9})$/),
      this.noWhitespaceValidator()
    ],
    asyncValidators: [this.checkSDT()],
    updateOn:'change'
  }),
    diaChi:new FormControl('',[
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(50), 
      this.noWhitespaceValidator()
    ]),
    
    cccd:new FormControl('', {
      validators: [
        Validators.required,
        Validators.maxLength(12),
        Validators.minLength(12),
        // Validators.pattern(/^(0|[1-9][0-9]*)$/),
        this.noWhitespaceValidator()
      ],
      asyncValidators: [this.checkCCCD()],
      updateOn: 'change'
    }),
    ngaySinh:new FormControl(moment(new Date('01/01/2000')),[
    Validators.required,
    this.kiemLoiTuoiPhaiLonHon18()]),
    email:new FormControl('',{
      validators:[
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(50), 
      Validators.pattern(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/),
      this.noWhitespaceValidator()
    ],
    asyncValidators: [this.checkEmail()],
    updateOn: 'change'
  }),
    gioiTinh:new FormControl('',
    Validators.required),
    chucVu:new FormControl('Nhân viên'),
    ngayVaoLam:new FormControl(moment(), Validators.required),
    anhNhanVien:new FormControl(''),
    tinhTrang:new FormControl('a'),
    ngayDangKy:new FormControl(new Date())
  })
  get tenNhanVien(){
    return this.themNhanVien.get('tenNhanVien');
  }
  get soDienThoai(){
    return this.themNhanVien.get('soDienThoai');
  }
  get cccd(){
    return this.themNhanVien.get('cccd');
  }
  get diaChi(){
    return this.themNhanVien.get('diaChi');
  }
  get ngaySinh(){
    return this.themNhanVien.get('ngaySinh');
  }
  get ngayVaoLam(){
    return this.themNhanVien.get('ngayVaoLam');
  }
  get email(){
    return this.themNhanVien.get('email');
  }
  get gioiTinh(){
    return this.themNhanVien.get('gioiTinh');
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
  numberOnly(event: { which: any; keyCode: any; }): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}

  checkCCCD(): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> => {
        if (control.value.length === 12) {
            return this.quanLyNhanVienService.checkCCCDCuaNhanVien(control.value).toPromise().then(data => {
                return data ? { 'invalidCCCD': true } : null;
            }).catch(err => {
                console.error(err);
                return null;
            });
        } else {
            return Promise.resolve(null);
        }
    };
}
  checkSDT(): AsyncValidatorFn {
  return (control: AbstractControl): Promise<ValidationErrors | null> => {
      if (control.value.length === 10) {
          return this.quanLyNhanVienService.checkSDTCuaNhanVien(control.value).toPromise().then(data => {
              return data ? { 'invalidSDT': true } : null;
          }).catch(err => {
              console.error(err);
              return null;
          });
      } else {
          return Promise.resolve(null);
      }
  };
}
  checkEmail(): AsyncValidatorFn {
  return (control: AbstractControl): Promise<ValidationErrors | null> => {
      if (control.value.length >=16) {
          return this.quanLyNhanVienService.checkEmailCuaNhanVien(control.value).toPromise().then(data => {
              return data ? { 'invalidEmail': true } : null;
          }).catch(err => {
              console.error(err);
              return null;
          });
      } else {
          return Promise.resolve(null);
      }
  };
}
kiemLoiTuoiPhaiLonHon18(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const ngayChonTuInput = new Date(control.value);
    const ngayHienTai = new Date();
    ngayHienTai.setHours(0, 0, 0, 0);
    const tuoi = ngayHienTai.getFullYear() - ngayChonTuInput.getFullYear();
    return tuoi < 18 ? { 'ageInvalid': true } : null;
  };
}
  constructor (
    private quanLyNhanVienService:NhanVienService,
    private router:Router,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<ThemNhanVienComponent>,
    ){

  }
  ClosePopup() {
    this.ref.close();
  }

  ngOnInit(): void {
  }

  ThemNhanVien(){
    let ngaySinhValue = moment(this.themNhanVien.value.ngaySinh).format('YYYY-MM-DD');
    let ngayVaoLamValue = moment(this.themNhanVien.value.ngayVaoLam).format('YYYY-MM-DD');
    const themNhanVienData = {
      ...this.themNhanVien.value,
      ngaySinh:ngaySinhValue,
      ngayVaoLam:ngayVaoLamValue
    }
    
    this.quanLyNhanVienService.themNhanVien(themNhanVienData)
    .subscribe({
      next:(response)=>{
        this.ClosePopup();
        this.toastr.success('Thêm nhân viên thành công', 'Thông báo', {
          timeOut: 1000,
        });
      },
      error: (error) => {
        console.error('Lỗi khi thêm nhân viên:', error);
        this.toastr.error('Đã có lỗi xảy ra', 'Thông báo', {
          timeOut: 1000,
        });
      },
    })
  }
  
  

}
