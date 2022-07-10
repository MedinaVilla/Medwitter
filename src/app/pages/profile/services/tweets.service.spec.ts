import { TestBed } from '@angular/core/testing';

import { TweetsService } from './tweets.service';

describe('TweetsService', () => {
  let service: TweetsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TweetsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
