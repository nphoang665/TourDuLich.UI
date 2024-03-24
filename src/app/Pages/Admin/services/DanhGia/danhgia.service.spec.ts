import { TestBed } from '@angular/core/testing';

import { DanhgiaService } from './danhgia.service';

describe('DanhgiaService', () => {
  let service: DanhgiaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DanhgiaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
