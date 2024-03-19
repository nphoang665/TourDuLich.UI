import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuanlydattourComponent } from './quanlydattour.component';

describe('QuanlydattourComponent', () => {
  let component: QuanlydattourComponent;
  let fixture: ComponentFixture<QuanlydattourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuanlydattourComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuanlydattourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
