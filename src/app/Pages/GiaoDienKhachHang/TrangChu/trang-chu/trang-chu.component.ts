import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-trang-chu',
  templateUrl: './trang-chu.component.html',
  styleUrl: './trang-chu.component.css'
})
export class TrangChuComponent {
  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    let originalHeader = document.querySelector('.container_large_header') as HTMLElement;
    let fixedHeader = document.querySelector('.container_large_header') as HTMLElement;
    let itemHeaders = document.querySelectorAll('.item_medium_second_header');

    itemHeaders.forEach((item: Element) => {
      let itemHeader = item as HTMLElement;
      if (window.pageYOffset > originalHeader.offsetTop) {
        fixedHeader.classList.add('fixedHeader');
        itemHeader.classList.add('text-dark');
      } else {
        fixedHeader.classList.remove('fixedHeader');
        itemHeader.classList.remove('text-dark');
      }
    });

  }
}
