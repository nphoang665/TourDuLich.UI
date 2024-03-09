import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuanLyTourComponent } from './quan-ly-tour.component';

describe('QuanLyTourComponent', () => {
  let component: QuanLyTourComponent;
  let fixture: ComponentFixture<QuanLyTourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuanLyTourComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuanLyTourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
