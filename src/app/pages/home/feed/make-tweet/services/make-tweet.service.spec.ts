import { TestBed } from '@angular/core/testing';

import { MakeTweetService } from './make-tweet.service';

describe('MakeTweetService', () => {
  let service: MakeTweetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MakeTweetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
