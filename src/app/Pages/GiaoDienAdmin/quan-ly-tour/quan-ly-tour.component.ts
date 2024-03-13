import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable, Subscription } from 'rxjs';
import { TourDuLich } from '../models/tour-du-lich.model';
import { QuanLyTourService } from '../services/quan-ly-tour.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-quan-ly-tour',
  templateUrl: './quan-ly-tour.component.html',
  styleUrl: './quan-ly-tour.component.css'
})
export class QuanLyTourComponent implements OnInit, OnDestroy {

  tourDuLich$?: Observable<TourDuLich[]>;
  xoaTourSubscription?: Subscription;
  constructor(private quanLyTourService: QuanLyTourService, private router: Router) {

  }


  ngOnInit(): void {
    this.tourDuLich$ = this.quanLyTourService.getAllTourDuLich();

  }
  XoaTour(id: string) {
    if (id) {
      this.xoaTourSubscription = this.quanLyTourService
        .xoaTourDuLich(id)
        .subscribe({
          next: (response) => {
            this.tourDuLich$ = this.quanLyTourService.getAllTourDuLich();
          }
        });
    }
  }

  ngOnDestroy(): void {
    this.xoaTourSubscription?.unsubscribe();
  }
}
