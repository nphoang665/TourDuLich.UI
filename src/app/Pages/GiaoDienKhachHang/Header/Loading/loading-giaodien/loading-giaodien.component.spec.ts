import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingGiaodienComponent } from './loading-giaodien.component';

describe('LoadingGiaodienComponent', () => {
  let component: LoadingGiaodienComponent;
  let fixture: ComponentFixture<LoadingGiaodienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoadingGiaodienComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoadingGiaodienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
