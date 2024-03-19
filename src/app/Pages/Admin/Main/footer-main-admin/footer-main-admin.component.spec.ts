import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterMainAdminComponent } from './footer-main-admin.component';

describe('FooterMainAdminComponent', () => {
  let component: FooterMainAdminComponent;
  let fixture: ComponentFixture<FooterMainAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FooterMainAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FooterMainAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
