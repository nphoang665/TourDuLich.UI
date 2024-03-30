import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { FormsModule, ValidatorFn, } from '@angular/forms';
import { ReactiveFormsModule,  Validator, AbstractControl } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
const icon_User = `
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M19.7274 20.4471C19.2716 19.1713 18.2672 18.0439 16.8701 17.2399C15.4729 16.4358 13.7611 16 12 16C10.2389 16 8.52706 16.4358 7.12991 17.2399C5.73276 18.0439 4.72839 19.1713 4.27259 20.4471" stroke="#33363F" stroke-width="2" stroke-linecap="round"/>
<circle cx="12" cy="8" r="4" stroke="#33363F" stroke-width="2" stroke-linecap="round"/>
</svg>
`;
const icon_Password = `
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4 13C4 11.1144 4 10.1716 4.58579 9.58579C5.17157 9 6.11438 9 8 9H16C17.8856 9 18.8284 9 19.4142 9.58579C20 10.1716 20 11.1144 20 13V15C20 17.8284 20 19.2426 19.1213 20.1213C18.2426 21 16.8284 21 14 21H10C7.17157 21 5.75736 21 4.87868 20.1213C4 19.2426 4 17.8284 4 15V13Z" stroke="#33363F" stroke-width="2"/>
<path d="M16 8V7C16 4.79086 14.2091 3 12 3V3C9.79086 3 8 4.79086 8 7V8" stroke="#33363F" stroke-width="2" stroke-linecap="round"/>
<circle cx="12" cy="15" r="2" fill="#33363F"/>
</svg>
`;
const eye_Password = `
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.9202 12.7988C15.9725 12.5407 16 12.2736 16 12C16 9.79086 14.2091 8 12 8C11.7264 8 11.4593 8.02746 11.2012 8.07977L15.9202 12.7988ZM8.66676 9.78799C8.24547 10.4216 8 11.1821 8 12C8 14.2091 9.79086 16 12 16C12.8179 16 13.5784 15.7545 14.212 15.3332L12.7381 13.8594C12.5098 13.9501 12.2607 14 12 14C10.8954 14 10 13.1046 10 12C10 11.7393 10.0499 11.4902 10.1406 11.2619L8.66676 9.78799Z" fill="#33363F"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M16.5191 17.6405L15.0499 16.1712C14.0776 16.6805 13.0477 17 12 17C10.4742 17 8.98616 16.3224 7.65914 15.3677C6.34002 14.4186 5.26409 13.2558 4.58386 12.43C4.48409 12.3088 4.40958 12.2182 4.34785 12.1385C4.29899 12.0754 4.26786 12.0315 4.24756 12C4.26786 11.9685 4.29899 11.9246 4.34785 11.8615C4.40958 11.7818 4.48409 11.6912 4.58386 11.57C5.24928 10.7622 6.29335 9.63187 7.57331 8.69463L6.14458 7.2659C4.79643 8.29616 3.72247 9.47005 3.04009 10.2985C3.01651 10.3272 2.99192 10.3566 2.96662 10.3869L2.96661 10.3869C2.65318 10.7624 2.22974 11.2696 2.22974 12C2.22974 12.7304 2.65318 13.2376 2.9666 13.6131L2.96682 13.6133C2.99205 13.6435 3.01657 13.6729 3.04009 13.7015C3.77996 14.5998 4.98018 15.9041 6.49111 16.9912C7.99416 18.0725 9.89008 19 12 19C13.67 19 15.206 18.419 16.5191 17.6405ZM8.80682 5.6855C9.79062 5.26871 10.8643 5 12 5C14.1099 5 16.0059 5.92747 17.5089 7.00885C19.0198 8.0959 20.2201 9.40025 20.9599 10.2985C20.9835 10.3272 21.0081 10.3566 21.0334 10.3869L21.0334 10.3869C21.3468 10.7624 21.7703 11.2696 21.7703 12C21.7703 12.7304 21.3468 13.2376 21.0334 13.6131C21.0081 13.6434 20.9835 13.6728 20.9599 13.7015C20.4733 14.2923 19.7874 15.0589 18.945 15.8237L17.529 14.4077C18.3089 13.708 18.9539 12.9912 19.4162 12.43C19.5159 12.3088 19.5904 12.2182 19.6522 12.1385C19.701 12.0754 19.7322 12.0315 19.7525 12C19.7322 11.9685 19.701 11.9246 19.6522 11.8615C19.5904 11.7818 19.5159 11.6912 19.4162 11.57C18.7359 10.7442 17.66 9.58138 16.3409 8.63233C15.0139 7.6776 13.5258 7 12 7C11.449 7 10.9029 7.08837 10.3676 7.24624L8.80682 5.6855Z" fill="#33363F"/>
<path d="M5 2L21 18" stroke="#33363F" stroke-width="2"/>
</svg>

`;
const facebook_login = `
<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <circle cx="16" cy="16" r="14" fill="url(#paint0_linear_87_7208)"></circle> <path d="M21.2137 20.2816L21.8356 16.3301H17.9452V13.767C17.9452 12.6857 18.4877 11.6311 20.2302 11.6311H22V8.26699C22 8.26699 20.3945 8 18.8603 8C15.6548 8 13.5617 9.89294 13.5617 13.3184V16.3301H10V20.2816H13.5617V29.8345C14.2767 29.944 15.0082 30 15.7534 30C16.4986 30 17.2302 29.944 17.9452 29.8345V20.2816H21.2137Z" fill="white"></path> <defs> <linearGradient id="paint0_linear_87_7208" x1="16" y1="2" x2="16" y2="29.917" gradientUnits="userSpaceOnUse"> <stop stop-color="#18ACFE"></stop> <stop offset="1" stop-color="#0163E0"></stop> </linearGradient> </defs> </g></svg>
`
const google_login = `
<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M30.0014 16.3109C30.0014 15.1598 29.9061 14.3198 29.6998 13.4487H16.2871V18.6442H24.1601C24.0014 19.9354 23.1442 21.8798 21.2394 23.1864L21.2127 23.3604L25.4536 26.58L25.7474 26.6087C28.4458 24.1665 30.0014 20.5731 30.0014 16.3109Z" fill="#4285F4"></path> <path d="M16.2863 29.9998C20.1434 29.9998 23.3814 28.7553 25.7466 26.6086L21.2386 23.1863C20.0323 24.0108 18.4132 24.5863 16.2863 24.5863C12.5086 24.5863 9.30225 22.1441 8.15929 18.7686L7.99176 18.7825L3.58208 22.127L3.52441 22.2841C5.87359 26.8574 10.699 29.9998 16.2863 29.9998Z" fill="#34A853"></path> <path d="M8.15964 18.769C7.85806 17.8979 7.68352 16.9645 7.68352 16.0001C7.68352 15.0356 7.85806 14.1023 8.14377 13.2312L8.13578 13.0456L3.67083 9.64746L3.52475 9.71556C2.55654 11.6134 2.00098 13.7445 2.00098 16.0001C2.00098 18.2556 2.55654 20.3867 3.52475 22.2845L8.15964 18.769Z" fill="#FBBC05"></path> <path d="M16.2864 7.4133C18.9689 7.4133 20.7784 8.54885 21.8102 9.4978L25.8419 5.64C23.3658 3.38445 20.1435 2 16.2864 2C10.699 2 5.8736 5.1422 3.52441 9.71549L8.14345 13.2311C9.30229 9.85555 12.5086 7.4133 16.2864 7.4133Z" fill="#EB4335"></path> </g></svg>

`;
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  matcher = new MyErrorStateMatcher();
  register: FormGroup = new FormGroup({
    email: new FormControl('',[
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(50),
    ]),
    name: new FormControl('',[
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(50),
      this.noSpecialCharValidator(),
    ]),
    password: new FormControl('',[
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(50),
    ]),
    confirmPassword: new FormControl('',[
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(50),
    ])
  })
  get email(){
    return this.register.get('email');
  }
  get password(){
    return this.register.get('password');
  }
  get confirmPassword(){
    return this.register.get('confirmPassword');
  }
  get name(){
    return this.register.get('confirmPassword');
  }
  noSpecialCharValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const invalidChar = /^[^\d~`!@#$%\^&*()_+=\-\[\]\\';,/{}|\\":<>\?]*$/.test(control.value);
      return invalidChar ? null : { 'invalidChar': { value: control.value } };
    };
  }
  constructor(private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,) {

    iconRegistry.addSvgIconLiteral('user-login', sanitizer.bypassSecurityTrustHtml(icon_User));
    iconRegistry.addSvgIconLiteral('password-login', sanitizer.bypassSecurityTrustHtml(icon_Password));
    iconRegistry.addSvgIconLiteral('eye-login', sanitizer.bypassSecurityTrustHtml(eye_Password));
    iconRegistry.addSvgIconLiteral('facebook-login', sanitizer.bypassSecurityTrustHtml(facebook_login));
    iconRegistry.addSvgIconLiteral('google-login', sanitizer.bypassSecurityTrustHtml(google_login));
  }
  ngOnInit(): void {
  }

  onFormSubmit() {

    this.authService.createAcount(this.register.value).subscribe({
      next: (response) => {
        this.router.navigateByUrl('/login');
        this.toastr.success('Đăng ký tài khoản thành công', 'Thông báo', {
          timeOut: 1000,
        });
      },
      error: (error) => {
        if (error.status === 400) {
          this.toastr.error('Tài khoản đã tồn tại!', 'Thông báo', {
            timeOut: 2000,
          });
        } else {
          console.error('Đã xảy ra lỗi:', error);
        }
      }
    });

  }
}
