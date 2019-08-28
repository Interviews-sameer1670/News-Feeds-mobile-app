import { TestBed } from '@angular/core/testing';

import { FetchNewsService } from './fetch-news.service';

describe('FetchNewsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FetchNewsService = TestBed.get(FetchNewsService);
    expect(service).toBeTruthy();
  });
});
