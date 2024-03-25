import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhGiaKhachHangComponent } from './danh-gia-khach-hang.component';

describe('DanhGiaKhachHangComponent', () => {
  let component: DanhGiaKhachHangComponent;
  let fixture: ComponentFixture<DanhGiaKhachHangComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DanhGiaKhachHangComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DanhGiaKhachHangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
