import { Component, HostListener, OnInit, PLATFORM_ID, Inject, Renderer2, ElementRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { AuthService } from '../../../Auth/services/auth.service';
import { User } from '../../../Auth/models/user.model';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
const icon_Logout = `
<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M8.90002 7.55999C9.21002 3.95999 11.06 2.48999 15.11 2.48999H15.24C19.71 2.48999 21.5 4.27999 21.5 8.74999V15.27C21.5 19.74 19.71 21.53 15.24 21.53H15.11C11.09 21.53 9.24002 20.08 8.91002 16.54" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M15 12H3.62" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M5.85 8.6499L2.5 11.9999L5.85 15.3499" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
`
const icon_User = `
<svg fill="#000000" viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M 13.7851 49.5742 L 42.2382 49.5742 C 47.1366 49.5742 49.5743 47.1367 49.5743 42.3086 L 49.5743 13.6914 C 49.5743 8.8633 47.1366 6.4258 42.2382 6.4258 L 13.7851 6.4258 C 8.9101 6.4258 6.4257 8.8398 6.4257 13.6914 L 6.4257 42.3086 C 6.4257 47.1602 8.9101 49.5742 13.7851 49.5742 Z M 28.0117 35.8164 C 19.6913 35.8164 13.7148 39.8242 11.1835 44.9102 C 10.5507 44.2774 10.1992 43.3633 10.1992 42.1211 L 10.1992 13.8789 C 10.1992 11.4414 11.5117 10.1992 13.8554 10.1992 L 42.1679 10.1992 C 44.4882 10.1992 45.8007 11.4414 45.8007 13.8789 L 45.8007 42.1211 C 45.8007 43.3399 45.4726 44.2774 44.8398 44.8867 C 42.3320 39.8008 36.5429 35.8164 28.0117 35.8164 Z M 28.0117 31.9023 C 32.4882 31.9492 36.0273 28.1289 36.0273 23.1133 C 36.0273 18.4023 32.4882 14.5118 28.0117 14.5118 C 23.5351 14.5118 19.9726 18.4023 19.9960 23.1133 C 20.0429 28.1289 23.5351 31.8320 28.0117 31.9023 Z"></path></g></svg>
`;
const icon_Search = `
<svg viewBox="0 0 1024 1024" class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M622.4 682.453333l60.330667-60.309333 256.405333 256.405333-60.330667 60.309334z" fill="#616161"></path><path d="M426.666667 426.666667m-341.333334 0a341.333333 341.333333 0 1 0 682.666667 0 341.333333 341.333333 0 1 0-682.666667 0Z" fill="#616161"></path><path d="M692.266667 753.92l60.309333-60.330667 185.514667 185.514667-60.330667 60.330667z" fill="#37474F"></path><path d="M426.666667 426.666667m-277.333334 0a277.333333 277.333333 0 1 0 554.666667 0 277.333333 277.333333 0 1 0-554.666667 0Z" fill="#64B5F6"></path><path d="M573.866667 302.933333c-36.266667-42.666667-89.6-68.266667-147.2-68.266666s-110.933333 25.6-147.2 68.266666c-8.533333 8.533333-6.4 23.466667 2.133333 29.866667 8.533333 8.533333 23.466667 6.4 29.866667-2.133333C341.333333 296.533333 381.866667 277.333333 426.666667 277.333333s85.333333 19.2 115.2 53.333334c4.266667 4.266667 10.666667 8.533333 17.066666 8.533333 4.266667 0 10.666667-2.133333 12.8-4.266667 8.533333-8.533333 8.533333-23.466667 2.133334-32z" fill="#BBDEFB"></path></g></svg>
`;
const icon_Vietnam = `
<svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--twemoji" preserveAspectRatio="xMidYMid meet" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill="#DA251D" d="M32 5H4a4 4 0 0 0-4 4v18a4 4 0 0 0 4 4h28a4 4 0 0 0 4-4V9a4 4 0 0 0-4-4z"></path><path fill="#FF0" d="M19.753 16.037L18 10.642l-1.753 5.395h-5.672l4.589 3.333l-1.753 5.395L18 21.431l4.589 3.334l-1.753-5.395l4.589-3.333z"></path></g></svg>
`;
const icon_Us = `
<svg viewBox="0 -4 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g clip-path="url(#clip0_503_3486)"> <rect width="28" height="20" rx="2" fill="white"></rect> <mask id="mask0_503_3486" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="28" height="20"> <rect width="28" height="20" rx="2" fill="white"></rect> </mask> <g mask="url(#mask0_503_3486)"> <path fill-rule="evenodd" clip-rule="evenodd" d="M28 0H0V1.33333H28V0ZM28 2.66667H0V4H28V2.66667ZM0 5.33333H28V6.66667H0V5.33333ZM28 8H0V9.33333H28V8ZM0 10.6667H28V12H0V10.6667ZM28 13.3333H0V14.6667H28V13.3333ZM0 16H28V17.3333H0V16ZM28 18.6667H0V20H28V18.6667Z" fill="#D02F44"></path> <rect width="12" height="9.33333" fill="#46467F"></rect> <g filter="url(#filter0_d_503_3486)"> <path fill-rule="evenodd" clip-rule="evenodd" d="M2.66665 1.99999C2.66665 2.36818 2.36817 2.66666 1.99998 2.66666C1.63179 2.66666 1.33331 2.36818 1.33331 1.99999C1.33331 1.63181 1.63179 1.33333 1.99998 1.33333C2.36817 1.33333 2.66665 1.63181 2.66665 1.99999ZM5.33331 1.99999C5.33331 2.36818 5.03484 2.66666 4.66665 2.66666C4.29846 2.66666 3.99998 2.36818 3.99998 1.99999C3.99998 1.63181 4.29846 1.33333 4.66665 1.33333C5.03484 1.33333 5.33331 1.63181 5.33331 1.99999ZM7.33331 2.66666C7.7015 2.66666 7.99998 2.36818 7.99998 1.99999C7.99998 1.63181 7.7015 1.33333 7.33331 1.33333C6.96512 1.33333 6.66665 1.63181 6.66665 1.99999C6.66665 2.36818 6.96512 2.66666 7.33331 2.66666ZM10.6666 1.99999C10.6666 2.36818 10.3682 2.66666 9.99998 2.66666C9.63179 2.66666 9.33331 2.36818 9.33331 1.99999C9.33331 1.63181 9.63179 1.33333 9.99998 1.33333C10.3682 1.33333 10.6666 1.63181 10.6666 1.99999ZM3.33331 3.99999C3.7015 3.99999 3.99998 3.70152 3.99998 3.33333C3.99998 2.96514 3.7015 2.66666 3.33331 2.66666C2.96512 2.66666 2.66665 2.96514 2.66665 3.33333C2.66665 3.70152 2.96512 3.99999 3.33331 3.99999ZM6.66665 3.33333C6.66665 3.70152 6.36817 3.99999 5.99998 3.99999C5.63179 3.99999 5.33331 3.70152 5.33331 3.33333C5.33331 2.96514 5.63179 2.66666 5.99998 2.66666C6.36817 2.66666 6.66665 2.96514 6.66665 3.33333ZM8.66665 3.99999C9.03484 3.99999 9.33331 3.70152 9.33331 3.33333C9.33331 2.96514 9.03484 2.66666 8.66665 2.66666C8.29846 2.66666 7.99998 2.96514 7.99998 3.33333C7.99998 3.70152 8.29846 3.99999 8.66665 3.99999ZM10.6666 4.66666C10.6666 5.03485 10.3682 5.33333 9.99998 5.33333C9.63179 5.33333 9.33331 5.03485 9.33331 4.66666C9.33331 4.29847 9.63179 3.99999 9.99998 3.99999C10.3682 3.99999 10.6666 4.29847 10.6666 4.66666ZM7.33331 5.33333C7.7015 5.33333 7.99998 5.03485 7.99998 4.66666C7.99998 4.29847 7.7015 3.99999 7.33331 3.99999C6.96512 3.99999 6.66665 4.29847 6.66665 4.66666C6.66665 5.03485 6.96512 5.33333 7.33331 5.33333ZM5.33331 4.66666C5.33331 5.03485 5.03484 5.33333 4.66665 5.33333C4.29846 5.33333 3.99998 5.03485 3.99998 4.66666C3.99998 4.29847 4.29846 3.99999 4.66665 3.99999C5.03484 3.99999 5.33331 4.29847 5.33331 4.66666ZM1.99998 5.33333C2.36817 5.33333 2.66665 5.03485 2.66665 4.66666C2.66665 4.29847 2.36817 3.99999 1.99998 3.99999C1.63179 3.99999 1.33331 4.29847 1.33331 4.66666C1.33331 5.03485 1.63179 5.33333 1.99998 5.33333ZM3.99998 5.99999C3.99998 6.36819 3.7015 6.66666 3.33331 6.66666C2.96512 6.66666 2.66665 6.36819 2.66665 5.99999C2.66665 5.6318 2.96512 5.33333 3.33331 5.33333C3.7015 5.33333 3.99998 5.6318 3.99998 5.99999ZM5.99998 6.66666C6.36817 6.66666 6.66665 6.36819 6.66665 5.99999C6.66665 5.6318 6.36817 5.33333 5.99998 5.33333C5.63179 5.33333 5.33331 5.6318 5.33331 5.99999C5.33331 6.36819 5.63179 6.66666 5.99998 6.66666ZM9.33331 5.99999C9.33331 6.36819 9.03484 6.66666 8.66665 6.66666C8.29846 6.66666 7.99998 6.36819 7.99998 5.99999C7.99998 5.6318 8.29846 5.33333 8.66665 5.33333C9.03484 5.33333 9.33331 5.6318 9.33331 5.99999ZM9.99998 8C10.3682 8 10.6666 7.70152 10.6666 7.33333C10.6666 6.96514 10.3682 6.66666 9.99998 6.66666C9.63179 6.66666 9.33331 6.96514 9.33331 7.33333C9.33331 7.70152 9.63179 8 9.99998 8ZM7.99998 7.33333C7.99998 7.70152 7.7015 8 7.33331 8C6.96512 8 6.66665 7.70152 6.66665 7.33333C6.66665 6.96514 6.96512 6.66666 7.33331 6.66666C7.7015 6.66666 7.99998 6.96514 7.99998 7.33333ZM4.66665 8C5.03484 8 5.33331 7.70152 5.33331 7.33333C5.33331 6.96514 5.03484 6.66666 4.66665 6.66666C4.29846 6.66666 3.99998 6.96514 3.99998 7.33333C3.99998 7.70152 4.29846 8 4.66665 8ZM2.66665 7.33333C2.66665 7.70152 2.36817 8 1.99998 8C1.63179 8 1.33331 7.70152 1.33331 7.33333C1.33331 6.96514 1.63179 6.66666 1.99998 6.66666C2.36817 6.66666 2.66665 6.96514 2.66665 7.33333Z" fill="url(#paint0_linear_503_3486)"></path> </g> </g> </g> <defs> <filter id="filter0_d_503_3486" x="1.33331" y="1.33333" width="9.33331" height="7.66667" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"> <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood> <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix> <feOffset dy="1"></feOffset> <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0"></feColorMatrix> <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_503_3486"></feBlend> <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_503_3486" result="shape"></feBlend> </filter> <linearGradient id="paint0_linear_503_3486" x1="1.33331" y1="1.33333" x2="1.33331" y2="7.99999" gradientUnits="userSpaceOnUse"> <stop stop-color="white"></stop> <stop offset="1" stop-color="#F0F0F0"></stop> </linearGradient> <clipPath id="clip0_503_3486"> <rect width="28" height="20" rx="2" fill="white"></rect> </clipPath> </defs> </g></svg>
`;
const icon_History = `
<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M3 5.67541V3C3 2.44772 2.55228 2 2 2C1.44772 2 1 2.44772 1 3V7C1 8.10457 1.89543 9 3 9H7C7.55229 9 8 8.55229 8 8C8 7.44772 7.55229 7 7 7H4.52186C4.54218 6.97505 4.56157 6.94914 4.57995 6.92229C5.621 5.40094 7.11009 4.22911 8.85191 3.57803C10.9074 2.80968 13.173 2.8196 15.2217 3.6059C17.2704 4.3922 18.9608 5.90061 19.9745 7.8469C20.9881 9.79319 21.2549 12.043 20.7247 14.1724C20.1945 16.3018 18.9039 18.1638 17.0959 19.4075C15.288 20.6513 13.0876 21.1909 10.9094 20.9247C8.73119 20.6586 6.72551 19.605 5.27028 17.9625C4.03713 16.5706 3.27139 14.8374 3.06527 13.0055C3.00352 12.4566 2.55674 12.0079 2.00446 12.0084C1.45217 12.0088 0.995668 12.4579 1.04626 13.0078C1.25994 15.3309 2.2082 17.5356 3.76666 19.2946C5.54703 21.3041 8.00084 22.5931 10.6657 22.9188C13.3306 23.2444 16.0226 22.5842 18.2345 21.0626C20.4464 19.541 22.0254 17.263 22.6741 14.6578C23.3228 12.0526 22.9963 9.30013 21.7562 6.91897C20.5161 4.53782 18.448 2.69239 15.9415 1.73041C13.4351 0.768419 10.6633 0.756291 8.14853 1.69631C6.06062 2.47676 4.26953 3.86881 3 5.67541Z" fill="#0F0F0F"></path> <path d="M12 5C11.4477 5 11 5.44771 11 6V12.4667C11 12.4667 11 12.7274 11.1267 12.9235C11.2115 13.0898 11.3437 13.2344 11.5174 13.3346L16.1372 16.0019C16.6155 16.278 17.2271 16.1141 17.5032 15.6358C17.7793 15.1575 17.6155 14.546 17.1372 14.2698L13 11.8812V6C13 5.44772 12.5523 5 12 5Z" fill="#0F0F0F"></path> </g></svg>
`;
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
    private authService: AuthService,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer) {
    iconRegistry.addSvgIconLiteral('icon_Logout', sanitizer.bypassSecurityTrustHtml(icon_Logout));
    iconRegistry.addSvgIconLiteral('icon_User', sanitizer.bypassSecurityTrustHtml(icon_User));
    iconRegistry.addSvgIconLiteral('icon_Search', sanitizer.bypassSecurityTrustHtml(icon_Search));
    iconRegistry.addSvgIconLiteral('icon_VietNam', sanitizer.bypassSecurityTrustHtml(icon_Vietnam));
    iconRegistry.addSvgIconLiteral('icon_Us', sanitizer.bypassSecurityTrustHtml(icon_Us));
    iconRegistry.addSvgIconLiteral('icon_History', sanitizer.bypassSecurityTrustHtml(icon_History));


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
