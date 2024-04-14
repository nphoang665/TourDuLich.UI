import { TestBed } from '@angular/core/testing';

import { QuenmatkhauService } from './quenmatkhau.service';

describe('QuenmatkhauService', () => {
  let service: QuenmatkhauService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuenmatkhauService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
