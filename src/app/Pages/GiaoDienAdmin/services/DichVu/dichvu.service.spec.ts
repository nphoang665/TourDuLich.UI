import { TestBed } from '@angular/core/testing';

import { DichvuService } from './dichvu.service';

describe('DichvuService', () => {
  let service: DichvuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DichvuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
