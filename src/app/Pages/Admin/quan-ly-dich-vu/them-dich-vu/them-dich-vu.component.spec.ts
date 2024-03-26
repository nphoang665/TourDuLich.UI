import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemDichVuComponent } from './them-dich-vu.component';

describe('ThemDichVuComponent', () => {
  let component: ThemDichVuComponent;
  let fixture: ComponentFixture<ThemDichVuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ThemDichVuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ThemDichVuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
