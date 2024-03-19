import { TestBed } from '@angular/core/testing';

import { NhanVienService } from './nhan-vien.service';

describe('NhanVienService', () => {
  let service: NhanVienService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NhanVienService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
