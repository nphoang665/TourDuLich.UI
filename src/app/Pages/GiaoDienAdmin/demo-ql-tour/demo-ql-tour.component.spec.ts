import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoQlTourComponent } from './demo-ql-tour.component';

describe('DemoQlTourComponent', () => {
  let component: DemoQlTourComponent;
  let fixture: ComponentFixture<DemoQlTourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DemoQlTourComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DemoQlTourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
