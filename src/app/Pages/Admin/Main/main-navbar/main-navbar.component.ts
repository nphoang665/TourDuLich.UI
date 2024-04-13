import { DatePipe } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { Observable, Subject, interval, mergeMap, of, takeUntil } from 'rxjs';
import { AuthService } from '../../../Auth/services/auth.service';
import { User } from '../../../Auth/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-navbar',
  templateUrl: './main-navbar.component.html',
  styleUrl: './main-navbar.component.css'
})
export class MainNavbarComponent implements OnInit, OnDestroy {

  user?: User;


  constructor(private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object, private router: Router) {

  }
  ngOnInit(): void {
    if (typeof localStorage === 'undefined') {
      console.error('localStorage is not available');
      return;
    }

    this.authService.user()
      .subscribe({
        next: (response) => {
          this.user = response;

        }
      });
    this.user = this.authService.getUser();
    // this.clockRealtime();
  }
  clock: any;
  clockRealtime() {
    setTimeout(() => {
      let now = new Date();
      // Set the locale to Vietnamese and the timezone to Indochina Time
      let formattedDateTime = now.toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });
      this.clock = formattedDateTime;
      return formattedDateTime;
    }, 1000);
  }


  onLogout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/');
  }


  ngOnDestroy(): void {

  }
}
