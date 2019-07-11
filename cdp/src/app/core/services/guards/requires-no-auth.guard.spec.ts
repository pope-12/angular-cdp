import { TestBed, async, inject } from '@angular/core/testing';

import { RequiresNoAuthGuard } from './requires-no-auth.guard';

describe('RequiresNoAuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RequiresNoAuthGuard]
    });
  });

  it('should ...', inject([RequiresNoAuthGuard], (guard: RequiresNoAuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
