import { TestBed } from '@angular/core/testing';

import { TouHotOrReviewService } from './tou-hot-or-review.service';

describe('TouHotOrReviewService', () => {
  let service: TouHotOrReviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TouHotOrReviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
