import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SanPhamGiaoDienComponent } from './san-pham-giao-dien.component';

describe('SanPhamGiaoDienComponent', () => {
  let component: SanPhamGiaoDienComponent;
  let fixture: ComponentFixture<SanPhamGiaoDienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SanPhamGiaoDienComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SanPhamGiaoDienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
