import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  register: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl('')
  })

  constructor(private authService: AuthService,
    private router: Router,
    private toastr: ToastrService) {

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
