import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { LoginRequest } from '../models/login-request.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { LoginResponse } from '../models/login-response.model';
import { User } from '../models/user.model';
import { CookieService } from 'ngx-cookie-service';
import { isPlatformBrowser } from '@angular/common';
import { NguoiDungService } from '../../Admin/services/NguoiDung/nguoi-dung.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  $user = new BehaviorSubject<User | undefined>(undefined);

  constructor(private http: HttpClient,
    private cookieService: CookieService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private nguoiDungServices: NguoiDungService) {
  }

  login(request: LoginRequest): Observable<LoginResponse> {
    console.log(request);



    return this.http.post<LoginResponse>(`${environment.apiBaseUrl}/api/auth/login`, {
      email: request.email,
      password: request.password
    })
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
