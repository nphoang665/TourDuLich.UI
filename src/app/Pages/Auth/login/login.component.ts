import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  login: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  })

  constructor(private authService: AuthService,
    private cookieService: CookieService,
    private router: Router,
    private toastr: ToastrService) { }

  // onFormSubmit() {
  //   // console.log(this.login.value);
  //   this.authService.login(this.login.value).subscribe({
  //     next: (response) => {
  //       //Set auth cookie
  //       this.cookieService.set('Authorization', `Bearer ${response.token}`,
  //         undefined, '/', undefined, true, 'Strict');

  //       // Set User
  //       this.authService.setUser({
  //         email: response.email,
  //         roles: response.roles
  //       });

  //       //Redirect back to home
  //       this.router.navigateByUrl('/quanlytour');
  //       this.toastr.success('Đăng nhập thành công', 'Thông báo', {
  //         timeOut: 1000,
  //       });

  //     }
  //   })
  // }
  onFormSubmit() {
    // console.log(this.login.value);
    this.authService.login(this.login.value).subscribe({
      next: (response) => {
        // Set auth cookie
        this.cookieService.set('Authorization', `Bearer ${response.token}`,
          undefined, '/', undefined, true, 'Strict');
  
        // Set User
        this.authService.setUser({
          email: response.email,
          roles: response.roles
        });
  
        //Redirect based on user role
        if (response.roles.includes('Khách hàng')) {
          this.router.navigateByUrl('/trangchu');
        } else if (response.roles.includes('Admin') || response.roles.includes('Nhân viên')) {
          this.router.navigateByUrl('/trangChuAdmin');
        }
  
        this.toastr.success('Đăng nhập thành công', 'Thông báo', {
          timeOut: 1000,
        });
      },
      error: (error) => {
        // Handle error
        console.error(error);
        this.toastr.error('Đăng nhập thất bại', 'Lỗi', {
          timeOut: 1000,
        });
      }
    });
  }
  
}
