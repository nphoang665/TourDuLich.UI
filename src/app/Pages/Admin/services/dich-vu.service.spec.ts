import { TestBed } from '@angular/core/testing';

import { DichVuService } from './dich-vu.service';

describe('DichVuService', () => {
  let service: DichVuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DichVuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
