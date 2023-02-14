import { TestBed } from '@angular/core/testing';

import { AdService } from './ad.service';

describe('AdService', () => {
  let service: AdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdService);
  });

  xit('should be created', () => {
    expect(service).toBeTruthy();
  });
});
