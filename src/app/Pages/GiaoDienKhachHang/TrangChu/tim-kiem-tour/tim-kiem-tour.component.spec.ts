import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimKiemTourComponent } from './tim-kiem-tour.component';

describe('TimKiemTourComponent', () => {
  let component: TimKiemTourComponent;
  let fixture: ComponentFixture<TimKiemTourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TimKiemTourComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TimKiemTourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
