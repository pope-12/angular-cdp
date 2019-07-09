import { TestBed } from '@angular/core/testing';

import { PageFocusService } from './page-focus.service';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from './error/not-found/not-found.component';

describe('PageFocusService', () => {
  let service: PageFocusService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotFoundComponent],
      imports: [
        RouterModule.forRoot([])
      ]
    });
    service = TestBed.get(PageFocusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  describe('changeFocus', () => {
    it('should change the page focus', () => {
      const routeContent: any = {focus: () => {}};
      spyOn(routeContent, 'focus');

      service.changeFocus(routeContent);

      expect(routeContent.focus).toHaveBeenCalled();

    });
  });
});
