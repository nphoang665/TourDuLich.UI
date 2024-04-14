import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuenMatKhauComponent } from './quen-mat-khau.component';

describe('QuenMatKhauComponent', () => {
  let component: QuenMatKhauComponent;
  let fixture: ComponentFixture<QuenMatKhauComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuenMatKhauComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuenMatKhauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
