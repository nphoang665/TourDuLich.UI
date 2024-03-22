import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, interval, mergeMap, of, takeUntil } from 'rxjs';

@Component({
  selector: 'app-main-navbar',
  templateUrl: './main-navbar.component.html',
  styleUrl: './main-navbar.component.css'
})
export class MainNavbarComponent implements OnInit, OnDestroy {


  clock = new Date().toISOString();


  constructor() {

  }
  ngOnInit(): void {

  }


  ngOnDestroy(): void {

  }
}
