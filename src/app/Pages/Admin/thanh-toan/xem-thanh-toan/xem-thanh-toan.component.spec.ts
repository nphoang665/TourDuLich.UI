import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XemThanhToanComponent } from './xem-thanh-toan.component';

describe('XemThanhToanComponent', () => {
  let component: XemThanhToanComponent;
  let fixture: ComponentFixture<XemThanhToanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [XemThanhToanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(XemThanhToanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
