import { TestBed } from '@angular/core/testing';

import { ThanhToanService } from './thanh-toan.service';

describe('ThanhToanService', () => {
  let service: ThanhToanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThanhToanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
