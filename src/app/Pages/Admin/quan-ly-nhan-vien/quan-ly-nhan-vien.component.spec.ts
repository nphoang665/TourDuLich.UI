import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuanLyNhanVienComponent } from './quan-ly-nhan-vien.component';

describe('QuanLyNhanVienComponent', () => {
  let component: QuanLyNhanVienComponent;
  let fixture: ComponentFixture<QuanLyNhanVienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuanLyNhanVienComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuanLyNhanVienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
