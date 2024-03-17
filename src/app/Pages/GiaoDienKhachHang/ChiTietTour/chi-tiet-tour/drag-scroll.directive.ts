import { Directive, HostListener, ElementRef, Input } from '@angular/core';
import { log } from 'console';

@Directive({
    selector: '[appDragScroll]'
})
export class DragScrollDirective {
    @Input()
    loadMoreImages!: (direction?: 'start' | 'end') => void;

    private isDown = false;
    private startX: any;
    private scrollLeft: any;
    private lastX: any; // Add this line

    constructor(private el: ElementRef) { }

    @HostListener('mousedown', ['$event'])
    onMouseDown(event: MouseEvent) {
        this.isDown = true;
        this.startX = event.pageX - this.el.nativeElement.offsetLeft;
        this.scrollLeft = this.el.nativeElement.scrollLeft;
        this.lastX = event.pageX; // And this line
    }

    @HostListener('mouseleave')
    onMouseLeave() {
        this.isDown = false;
    }

    @HostListener('mouseup')
    onMouseUp() {
        this.isDown = false;
    }

    @HostListener('mousemove', ['$event'])
    onMouseMove(event: MouseEvent) {
        if (!this.isDown) { return; }
        event.preventDefault();
        const x = event.pageX - this.el.nativeElement.offsetLeft;
        const walk = (x - this.startX) * 0.5; //scroll-slower
        this.el.nativeElement.scrollLeft = this.scrollLeft - walk;

        // Determine the direction of mouse movement
        // if (event.pageX > this.lastX) {
        //     console.log('Moving right');

        // } else if (event.pageX < this.lastX) {
        //     console.log('Moving left');

        // }

        // Update lastX for the next mousemove event
        this.lastX = event.pageX;
    }

    //biến lắng nghe chuột 
    listenerMouse !: string;
    @HostListener('scroll', ['$event'])
    onScroll(event: Event) {
        const target = event.target as HTMLElement;
        if (target.scrollLeft + target.offsetWidth >= target.scrollWidth) {
            // User has scrolled to the end of the element, load more images
            this.loadMoreImages('end');
        }
    }
}
