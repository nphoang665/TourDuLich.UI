import { TestBed } from '@angular/core/testing';

import { DoitacService } from './doitac.service';

describe('DoitacService', () => {
  let service: DoitacService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DoitacService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
