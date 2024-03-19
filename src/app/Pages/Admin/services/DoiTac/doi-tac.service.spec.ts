import { TestBed } from '@angular/core/testing';

import { DoiTacService } from './doi-tac.service';

describe('DoiTacService', () => {
  let service: DoiTacService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DoiTacService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
