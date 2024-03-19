import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuaTourComponent } from './sua-tour.component';

describe('SuaTourComponent', () => {
  let component: SuaTourComponent;
  let fixture: ComponentFixture<SuaTourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuaTourComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SuaTourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
