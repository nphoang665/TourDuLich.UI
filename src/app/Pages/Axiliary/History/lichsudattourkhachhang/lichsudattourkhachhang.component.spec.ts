import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LichsudattourkhachhangComponent } from './lichsudattourkhachhang.component';

describe('LichsudattourkhachhangComponent', () => {
  let component: LichsudattourkhachhangComponent;
  let fixture: ComponentFixture<LichsudattourkhachhangComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LichsudattourkhachhangComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LichsudattourkhachhangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
