import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThumbnailHomeComponent } from './thumbnail-home.component';

describe('ThumbnailHomeComponent', () => {
  let component: ThumbnailHomeComponent;
  let fixture: ComponentFixture<ThumbnailHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ThumbnailHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ThumbnailHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
