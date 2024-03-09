import { Component, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-sidebar-nav',
  templateUrl: './sidebar-nav.component.html',
  styleUrl: './sidebar-nav.component.css'
})
export class SidebarNavComponent {
  constructor(private el: ElementRef) { }

  ChangeMenuSideBar() {
    let menu = this.el.nativeElement.querySelector('#sidebar');
    if (menu.classList.contains('expand')) {
      menu.classList.remove('expand');
    } else {
      menu.classList.add('expand');
    }
  }
}
