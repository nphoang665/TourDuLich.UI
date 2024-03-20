import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThanhtoankhachhangComponent } from './thanhtoankhachhang.component';

describe('ThanhtoankhachhangComponent', () => {
  let component: ThanhtoankhachhangComponent;
  let fixture: ComponentFixture<ThanhtoankhachhangComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ThanhtoankhachhangComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ThanhtoankhachhangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
