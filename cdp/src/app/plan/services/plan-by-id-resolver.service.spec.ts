import { TestBed } from '@angular/core/testing';

import { PlanByIdResolverService } from './plan-by-id-resolver.service';

describe('PlanByIdResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlanByIdResolverService = TestBed.get(PlanByIdResolverService);
    expect(service).toBeTruthy();
  });
});
