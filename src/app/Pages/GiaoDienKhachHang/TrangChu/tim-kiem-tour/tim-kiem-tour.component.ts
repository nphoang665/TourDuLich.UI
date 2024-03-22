import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tim-kiem-tour',
  templateUrl: './tim-kiem-tour.component.html',
  styleUrl: './tim-kiem-tour.component.css'
})
export class TimKiemTourComponent {
  constructor(private router: Router) { }
  NoiDen !: string;
  TimKiemTour() {
    this.router.navigate(['/dattour/' + this.NoiDen]);
  }
}

