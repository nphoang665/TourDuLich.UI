import { TestBed } from '@angular/core/testing';

import { QuanLyDichVuService } from '../DichVuChiTiet/quan-ly-dich-vu.service';

describe('QuanLyDichVuService', () => {
  let service: QuanLyDichVuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuanLyDichVuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
