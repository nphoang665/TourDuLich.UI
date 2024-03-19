import { TestBed } from '@angular/core/testing';

import { DattourService } from './dattour.service';

describe('DattourService', () => {
  let service: DattourService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DattourService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
