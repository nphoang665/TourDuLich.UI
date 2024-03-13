import { TestBed } from '@angular/core/testing';

import { KhachhangService } from './khachhang.service';

describe('KhachhangService', () => {
  let service: KhachhangService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KhachhangService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
