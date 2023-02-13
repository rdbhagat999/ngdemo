import { TestBed } from '@angular/core/testing';
import { NgxNotifierModule, NgxNotifierService } from 'ngx-notifier';

import { GlobalErrorHandlerService } from './global-error-handler.service';

describe('GlobalErrorHandlerService', () => {
  let service: GlobalErrorHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxNotifierModule],
      providers: [NgxNotifierService],
    });
    // TestBed.inject(NgxNotifierService);
    service = TestBed.inject(GlobalErrorHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
