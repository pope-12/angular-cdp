import { TestBed } from '@angular/core/testing';

import { PlanResolverService } from './plan-resolver.service';

describe('PlanResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlanResolverService = TestBed.get(PlanResolverService);
    expect(service).toBeTruthy();
  });
});
