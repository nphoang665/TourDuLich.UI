import { Component, HostListener, OnInit, PLATFORM_ID, Inject, Renderer2, ElementRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { AuthService } from '../../../Auth/services/auth.service';
import { User } from '../../../Auth/models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  user?: User;

  constructor(
    private router: Router,
    private renderer: Renderer2,
    private el: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object,
    private authService: AuthService) {
  }
  clock = new Date().toISOString();
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
    console.log(this.user);


  }

  onLogout(): void {


    this.authService.logout();

    this.user = undefined;
    console.log(this.user);

    this.router.navigateByUrl('/');
  }

}
