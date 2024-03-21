import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemNhanVienComponent } from './them-nhan-vien.component';

describe('ThemNhanVienComponent', () => {
  let component: ThemNhanVienComponent;
  let fixture: ComponentFixture<ThemNhanVienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ThemNhanVienComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ThemNhanVienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
