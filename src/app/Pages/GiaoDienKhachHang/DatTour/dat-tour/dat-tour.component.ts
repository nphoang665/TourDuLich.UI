import { Component, ElementRef, Renderer2 } from '@angular/core';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-dat-tour',
  templateUrl: './dat-tour.component.html',
  styleUrl: './dat-tour.component.css'
})
export class DatTourComponent {
  constructor(private el: ElementRef, private renderer: Renderer2) { }
  ThayDoiMauSort(index: any) {
    let items = this.el.nativeElement.querySelectorAll('.item_sort_tour');
    items.forEach((item: any) => {
      this.renderer.removeClass(item, 'active');

    });
    this.renderer.addClass(items[index - 1], 'active');
  }
}
