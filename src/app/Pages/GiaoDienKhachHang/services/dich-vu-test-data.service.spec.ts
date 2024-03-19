import { TestBed } from '@angular/core/testing';

import { DichVuTestDataService } from './dich-vu-test-data.service';

describe('DichVuTestDataService', () => {
  let service: DichVuTestDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DichVuTestDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
