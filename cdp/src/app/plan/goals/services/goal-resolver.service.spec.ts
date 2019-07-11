import { TestBed } from '@angular/core/testing';

import { GoalResolverService } from './goal-resolver.service';

describe('GoalResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GoalResolverService = TestBed.get(GoalResolverService);
    expect(service).toBeTruthy();
  });
});
