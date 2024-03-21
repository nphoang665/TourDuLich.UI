import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemKhachHangComponent } from './them-khach-hang.component';

describe('ThemKhachHangComponent', () => {
  let component: ThemKhachHangComponent;
  let fixture: ComponentFixture<ThemKhachHangComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ThemKhachHangComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ThemKhachHangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
