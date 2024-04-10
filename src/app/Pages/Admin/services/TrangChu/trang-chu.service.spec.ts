import { TestBed } from '@angular/core/testing';

import { TrangChuService } from './trang-chu.service';

describe('TrangChuService', () => {
  let service: TrangChuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrangChuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
