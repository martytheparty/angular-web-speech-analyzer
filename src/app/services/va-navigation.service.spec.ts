import { TestBed } from '@angular/core/testing';

import { VaNavigationService } from './va-navigation.service';

describe('VaNavigationService', () => {
  let service: VaNavigationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VaNavigationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
