import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuanLyDichVuComponent } from './quan-ly-dich-vu.component';

describe('QuanLyDichVuComponent', () => {
  let component: QuanLyDichVuComponent;
  let fixture: ComponentFixture<QuanLyDichVuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuanLyDichVuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuanLyDichVuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
