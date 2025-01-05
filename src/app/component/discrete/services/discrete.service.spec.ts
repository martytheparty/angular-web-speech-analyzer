import { TestBed } from '@angular/core/testing';

import { DiscreteService } from './discrete.service';

describe('DiscreteService', () => {
  let service: DiscreteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiscreteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
