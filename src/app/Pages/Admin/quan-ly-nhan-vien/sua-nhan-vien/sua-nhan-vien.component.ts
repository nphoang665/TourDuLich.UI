import { Component, Inject, OnInit } from '@angular/core';
import { AsyncValidatorFn, FormControl, FormGroup, FormGroupDirective, NgForm, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NhanVienService } from '../../services/NhanVien/nhan-vien.service';
import { NhanVien, SuaNhanVien } from '../../models/nhan-vien.model';
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
  selector: 'app-sua-nhan-vien',
  templateUrl: './sua-nhan-vien.component.html',
  styleUrl: './sua-nhan-vien.component.css',
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class SuaNhanVienComponent implements OnInit{
  matcher = new MyErrorStateMatcher();
  suaNhanVienForm: FormGroup = new FormGroup({
    tenNhanVien:new FormControl(''),
    soDienThoai:new FormControl(''),
    diaChi:new FormControl(''),
    cccd:new FormControl(''),
    ngaySinh:new FormControl(moment()),
    email:new FormControl(''),
    gioiTinh:new FormControl(''),
    chucVu:new FormControl(''),
    ngayVaoLam:new FormControl(''),
    anhNhanVien:new FormControl(''),
    tinhTrang:new FormControl(''),
    ngayDangKy:new FormControl(new Date())
  });
  get tenNhanVien(){
    return this.suaNhanVienForm.get('tenNhanVien');
  }
  get soDienThoai(){
    return this.suaNhanVienForm.get('soDienThoai');
  }
  get cccd(){
    return this.suaNhanVienForm.get('cccd');
  }
  get diaChi(){
    return this.suaNhanVienForm.get('diaChi');
  }
  get ngaySinh(){
    return this.suaNhanVienForm.get('ngaySinh');
  }
  get email(){
    return this.suaNhanVienForm.get('email');
  }
  get chucVu(){
    return this.suaNhanVienForm.get('chucVu');
  }
  get tinhTrang(){
    return this.suaNhanVienForm.get('tinhTrang');
  }
  get gioiTinh(){
    return this.suaNhanVienForm.get('gioiTinh');
  }
  noSpecialCharValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const invalidChar = /^[^\d~`!@#$%\^&*()_+=\-\[\]\\';,/{}|\\":<>\?]*$/.test(control.value);
      return invalidChar ? null : { 'invalidChar': { value: control.value } };
    };
  }
  checkCCCD(): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> => {
        if (control.value.length === 12) {
          if(control.value !=this.model?.cccd){
            return this.quanLyNhanVien.checkCCCDCuaNhanVien(control.value).toPromise().then(data => {
                return data ? { 'invalidCCCD': true } : null;
            }).catch(err => {
                console.error(err);
                return null;
            });
          }
          return Promise.resolve(null);
        } else {
            return Promise.resolve(null);
        }
    };
}
checkSDT(): AsyncValidatorFn {
  return (control: AbstractControl): Promise<ValidationErrors | null> => {
      if (control.value.length === 10) {
        if(control.value != this.model?.soDienThoai){
          return this.quanLyNhanVien.checkSDTCuaNhanVien(control.value).toPromise().then(data => {
              return data ? { 'invalidSDT': true } : null;
          }).catch(err => {
              console.error(err);
              return null;
          });
        }
        return Promise.resolve(null);
      } else {
          return Promise.resolve(null);
      }
  };
}
checkEmail(): AsyncValidatorFn {
  return (control: AbstractControl): Promise<ValidationErrors | null> => {
      if (control.value.length >=10) {
        if(control.value !=this.model?.email){
          return this.quanLyNhanVien.checkEmailCuaNhanVien(control.value).toPromise().then(data => {
              return data ? { 'invalidEmail': true } : null;
          }).catch(err => {
              console.error(err);
              return null;
          });
        }
        return Promise.resolve(null);
      } else {
          return Promise.resolve(null);
      }
  };
}
  model?:NhanVien;

  id?:string | null = null;
  inputdata: any;

  constructor(
    private route:ActivatedRoute, 
    private toastr: ToastrService,
    private quanLyNhanVien:NhanVienService,
    private router:Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<SuaNhanVienComponent>,
    ){}
  ngOnInit(): void {
    this.inputdata = this.data;
    this.id = this.data.idNhanVien;
    if (this.id) {
      this.quanLyNhanVien.getNhanVienById(this.id).subscribe((data: NhanVien) => {
        if (data) {
          this.model = data;
          this.initalizeForm();
        } else {
          console.error('không tìm thấy dịch vụ', this.id);
        }
      });
    }
  }
  initalizeForm(): void {
    this.suaNhanVienForm = new FormGroup({
      tenNhanVien: new FormControl(this.model?.tenNhanVien,[
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(50),
        this.noSpecialCharValidator(),
      ]),
      soDienThoai: new FormControl(this.model?.soDienThoai,{
        validators:[
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10), 
        Validators.pattern(/^(0[0-9]{9})$/)
      ],
      asyncValidators: [this.checkSDT()],
      updateOn:'change'
    }),
      diaChi: new FormControl(this.model?.diaChi,[
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(50), 
      ]),
      cccd: new FormControl(this.model?.cccd,{
        validators: [
          Validators.required,
          Validators.maxLength(12),
          Validators.minLength(12),
          Validators.pattern(/^(0|[1-9][0-9]*)$/),
        ],
        asyncValidators: [this.checkCCCD()],
        updateOn: 'change'
      }),
      ngaySinh: new FormControl(this.model?.ngaySinh,
        Validators.required),
      email: new FormControl(this.model?.email,{
        validators:[
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(50), 
        Validators.pattern(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/),
      ],
      asyncValidators: [this.checkEmail()],
      updateOn: 'change'
    }),
      gioiTinh: new FormControl(this.model?.gioiTinh,
        Validators.required),
      chucVu: new FormControl(this.model?.chucVu,
        Validators.required),
      ngayVaoLam: new FormControl(this.model?.ngayVaoLam),
      anhNhanVien: new FormControl(this.model?.anhNhanVien),
      tinhTrang: new FormControl(this.model?.tinhTrang,
        Validators.required),
      ngayDangKy: new FormControl(this.model?.ngayDangKy)
    });
  }
  ClosePopup() {
    this.ref.close();
  }

  SuaNhanVien(event: Event) {

    if (this.model && this.id) {
      let ngaySinhValue = moment(this.suaNhanVienForm.value.ngaySinh).format('YYYY-MM-DD');
      const suaNhanVien: SuaNhanVien = { ...this.suaNhanVienForm.value,ngaySinh:ngaySinhValue };
      this.quanLyNhanVien.suaNhanVien(this.id, suaNhanVien).subscribe((response) => {
        this.toastr.success('Sửa nhân viên thành công', 'Thông báo', {
          timeOut: 1000,
        });
      })
      this.ref.close();
    }
  }
}
