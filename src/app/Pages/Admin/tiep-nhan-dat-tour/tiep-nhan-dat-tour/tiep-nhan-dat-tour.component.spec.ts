import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiepNhanDatTourComponent } from './tiep-nhan-dat-tour.component';

describe('TiepNhanDatTourComponent', () => {
  let component: TiepNhanDatTourComponent;
  let fixture: ComponentFixture<TiepNhanDatTourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TiepNhanDatTourComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TiepNhanDatTourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
