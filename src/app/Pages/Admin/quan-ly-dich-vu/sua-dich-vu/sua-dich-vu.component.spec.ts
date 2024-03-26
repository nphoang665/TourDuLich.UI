import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuaDichVuComponent } from './sua-dich-vu.component';

describe('SuaDichVuComponent', () => {
  let component: SuaDichVuComponent;
  let fixture: ComponentFixture<SuaDichVuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuaDichVuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SuaDichVuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
