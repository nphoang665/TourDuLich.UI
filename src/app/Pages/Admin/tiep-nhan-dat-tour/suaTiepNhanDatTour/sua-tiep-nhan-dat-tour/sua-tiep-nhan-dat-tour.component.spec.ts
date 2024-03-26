import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuaTiepNhanDatTourComponent } from './sua-tiep-nhan-dat-tour.component';

describe('SuaTiepNhanDatTourComponent', () => {
  let component: SuaTiepNhanDatTourComponent;
  let fixture: ComponentFixture<SuaTiepNhanDatTourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuaTiepNhanDatTourComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SuaTiepNhanDatTourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
