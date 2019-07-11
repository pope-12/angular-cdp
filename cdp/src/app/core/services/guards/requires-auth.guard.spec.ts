import { TestBed, async, inject } from '@angular/core/testing';

import { RequiresAuthGuard } from './requires-auth.guard';

describe('RequiresAuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RequiresAuthGuard]
    });
  });

  it('should ...', inject([RequiresAuthGuard], (guard: RequiresAuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
