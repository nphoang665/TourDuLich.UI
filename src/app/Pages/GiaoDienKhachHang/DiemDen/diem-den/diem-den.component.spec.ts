import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiemDenComponent } from './diem-den.component';

describe('DiemDenComponent', () => {
  let component: DiemDenComponent;
  let fixture: ComponentFixture<DiemDenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DiemDenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DiemDenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
