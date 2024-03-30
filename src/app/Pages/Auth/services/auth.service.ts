import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { LoginRequest } from '../models/login-request.model';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { LoginResponse } from '../models/login-response.model';
import { User } from '../models/user.model';
import { CookieService } from 'ngx-cookie-service';
import { isPlatformBrowser } from '@angular/common';
import { Register } from '../models/register.model';
import { NguoiDungService } from '../../Admin/services/NguoiDung/nguoi-dung.service';
import { GoogleLoginDto } from '../models/login-google.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  $user = new BehaviorSubject<User | undefined>(undefined);

  constructor(private http: HttpClient,
    private cookieService: CookieService,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {
  }

  createAcount(data: Register): Observable<Register> {
    return this.http.post<Register>(`${environment.apiBaseUrl}/api/auth/register`, data);
  }

  login(request: LoginRequest): Observable<LoginResponse> {
    console.log(request);



    return this.http.post<LoginResponse>(`${environment.apiBaseUrl}/api/auth/login`, {
      email: request.email,
      password: request.password
    })
  }

  // googleLogin(request: GoogleLoginDto): Observable<LoginResponse> {
  //   return this.http.post<LoginResponse>(`${environment.apiBaseUrl}/api/auth/google-login`, {
  //     idToken: request.idToken
  //   });
  // }
  googleLogin(data: GoogleLoginDto): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.apiBaseUrl}/api/auth/google-login`, data).pipe(
      tap(result => {
        console.log(result);
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('user-email', result.email);
          localStorage.setItem('user-roles', result.roles.join(','));
          if (result.khachHang != null) {
            localStorage.setItem('NguoiDung', JSON.stringify(result.khachHang));
          }
          else {
            localStorage.setItem('NguoiDung', JSON.stringify(result.nhanVien));
          }
        }
      })
    );
  }

  // setUser(user: User): void {
  //   this.$user.next(user);
  //   localStorage.setItem('user-email', user.email);
  //   localStorage.setItem('user-roles', user.roles.join(','));
  // }

  setUser(user: User): void {
    this.$user.next(user);
    localStorage.setItem('user-email', user.email);
    localStorage.setItem('user-roles', user.roles.join(','));
  }

  user(): Observable<User | undefined> {
    return this.$user.asObservable();
  }

  getUser(): User | undefined {
    if (isPlatformBrowser(this.platformId)) {
      const email = localStorage.getItem('user-email');
      const roles = localStorage.getItem('user-roles');

      if (email && roles) {
        const user: User = {
          email: email,
          roles: roles.split(',')
        };
        return user;
      }
    }
    return undefined;

  }



  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.clear();
      this.cookieService.delete('Authorization', '/');
      this.$user.next(undefined);
    }
  }
}
