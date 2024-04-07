import { TestBed } from '@angular/core/testing';

import { TimkiemService } from './timkiem.service';

describe('TimkiemService', () => {
  let service: TimkiemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimkiemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
