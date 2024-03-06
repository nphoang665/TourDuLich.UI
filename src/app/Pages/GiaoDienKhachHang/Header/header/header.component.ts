import { Component, HostListener, OnInit, PLATFORM_ID, Inject, Renderer2, ElementRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router, private renderer: Renderer2, private el: ElementRef, @Inject(PLATFORM_ID) private platformId: Object) {
  }
  ngOnInit(): void {

  }
}
