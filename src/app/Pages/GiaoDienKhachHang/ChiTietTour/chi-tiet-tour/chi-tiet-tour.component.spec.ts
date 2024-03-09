import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiTietTourComponent } from './chi-tiet-tour.component';

describe('ChiTietTourComponent', () => {
  let component: ChiTietTourComponent;
  let fixture: ComponentFixture<ChiTietTourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChiTietTourComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChiTietTourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
