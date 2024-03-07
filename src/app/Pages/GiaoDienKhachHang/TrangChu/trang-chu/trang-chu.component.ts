import { isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, Inject, AfterViewInit, HostListener, OnInit, QueryList, ViewChildren, viewChildren, PLATFORM_ID, inject } from '@angular/core';
@Component({
  selector: 'app-trang-chu',
  templateUrl: './trang-chu.component.html',
  styleUrl: './trang-chu.component.css'
})
export class TrangChuComponent implements AfterViewInit {
  id: string = '';
  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    let originalHeader = document.querySelector('.container_large_header') as HTMLElement;
    let fixedHeader = document.querySelector('.container_large_header') as HTMLElement;
    let itemHeaders = document.querySelectorAll('.item_medium_second_header');
    let searchHeaders = document.querySelector('.box') as HTMLElement;
    itemHeaders.forEach((item: Element) => {
      let itemHeader = item as HTMLElement;
      if (window.pageYOffset > originalHeader.offsetTop) {
        fixedHeader.classList.add('fixedHeader');
        itemHeader.classList.add('text-dark');
        searchHeaders.classList.add('onscrollHeader')
      } else {
        fixedHeader.classList.remove('fixedHeader');
        itemHeader.classList.remove('text-dark');
        searchHeaders.classList.remove('onscrollHeader')

      }
    });

  }
  constructor(private elRef: ElementRef, @Inject(PLATFORM_ID) private platformId: Object) { }
  ngAfterViewInit() {
    const textTyping = this.elRef.nativeElement.querySelector('.Text_Typing');
    const myStrings = ["Buôn Đôn", "Thác Dray Sáp ", "Buôn KoTam"];
    let stringIndex = 0;

    if (isPlatformBrowser(this.platformId)) {
      let charIndex = 0;

      const typeString = () => {
        const typingInterval = window.setInterval(() => {
          if (charIndex < myStrings[stringIndex].length) {
            textTyping.textContent = myStrings[stringIndex].slice(0, charIndex + 1);
            charIndex++;
          } else {
            window.clearInterval(typingInterval);

            const deletingInterval = window.setInterval(() => {
              if (textTyping.textContent.length > 0) {
                textTyping.textContent = textTyping.textContent.slice(0, -1);
              } else {
                window.clearInterval(deletingInterval);

                stringIndex++;
                if (stringIndex === myStrings.length) {
                  stringIndex = 0;
                }

                setTimeout(() => {
                  charIndex = 0;
                  typeString();
                }, 0);
              }
            }, 100);
          }
        }, 200);
      };

      typeString();
    }
  }





}
