import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemTourComponent } from './them-tour.component';

describe('ThemTourComponent', () => {
  let component: ThemTourComponent;
  let fixture: ComponentFixture<ThemTourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ThemTourComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ThemTourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
