import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatTourComponent } from './dat-tour.component';

describe('DatTourComponent', () => {
  let component: DatTourComponent;
  let fixture: ComponentFixture<DatTourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DatTourComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DatTourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
