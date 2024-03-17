import { Directive, HostListener, ElementRef, Input } from '@angular/core';

@Directive({
    selector: '[appDragScrollMobile]'
})
export class DragScrollMobileDirective {
    @Input()
    loadMoreImages!: (direction?: 'start' | 'end') => void;

    private isDown = false;
    private startX: any;
    private scrollLeft: any;

    constructor(private el: ElementRef) { }

    @HostListener('touchstart', ['$event'])
    onTouchStart(event: TouchEvent) {
        this.isDown = true;
        this.startX = event.touches[0].pageX - this.el.nativeElement.offsetLeft;
        this.scrollLeft = this.el.nativeElement.scrollLeft;
    }

    @HostListener('touchend')
    onTouchEnd() {
        this.isDown = false;
    }

    @HostListener('touchmove', ['$event'])
    onTouchMove(event: TouchEvent) {
        if (!this.isDown) { return; }
        event.preventDefault();
        const x = event.touches[0].pageX - this.el.nativeElement.offsetLeft;
        const walk = (x - this.startX) * 0.5; //scroll-slower
        this.el.nativeElement.scrollLeft = this.scrollLeft - walk;
    }

    @HostListener('scroll', ['$event'])
    onScroll(event: Event) {
        const target = event.target as HTMLElement;
        if (target.scrollLeft + target.offsetWidth >= target.scrollWidth) {
            // User has scrolled to the end of the element, load more images
            this.loadMoreImages('end');
        }
    }
}
