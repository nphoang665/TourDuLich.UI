import { TestBed } from '@angular/core/testing';

import { NguoiDungService } from './nguoi-dung.service';

describe('NguoiDungService', () => {
  let service: NguoiDungService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NguoiDungService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
