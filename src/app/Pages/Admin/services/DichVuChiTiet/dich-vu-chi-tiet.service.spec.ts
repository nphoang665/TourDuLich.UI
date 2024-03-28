import { TestBed } from '@angular/core/testing';

import { DichVuChiTietService } from './dich-vu-chi-tiet.service';

describe('DichVuChiTietService', () => {
  let service: DichVuChiTietService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DichVuChiTietService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
