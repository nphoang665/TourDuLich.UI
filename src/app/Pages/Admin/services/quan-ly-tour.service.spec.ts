import { TestBed } from '@angular/core/testing';

import { QuanLyTourService } from './quan-ly-tour.service';

describe('QuanLyTourService', () => {
  let service: QuanLyTourService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuanLyTourService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
