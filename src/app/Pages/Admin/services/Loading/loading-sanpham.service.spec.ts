import { TestBed } from '@angular/core/testing';

import { LoadingSanphamService } from './loading-sanpham.service';

describe('LoadingSanphamService', () => {
  let service: LoadingSanphamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadingSanphamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
