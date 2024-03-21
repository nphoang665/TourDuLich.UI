import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuaNhanVienComponent } from './sua-nhan-vien.component';

describe('SuaNhanVienComponent', () => {
  let component: SuaNhanVienComponent;
  let fixture: ComponentFixture<SuaNhanVienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuaNhanVienComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SuaNhanVienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
