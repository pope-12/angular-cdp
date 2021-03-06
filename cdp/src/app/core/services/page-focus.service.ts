import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PageFocusService {
  constructor(private router: Router) { }

  public watchRouteChange(): void {
    this.router.events.subscribe((routerEvent) => {
      if (routerEvent instanceof NavigationEnd) {
        const routerLinkElement = document.getElementById('routeContent');
        this.changeFocus(routerLinkElement);
      }
    });
  }

  public changeFocus(element: HTMLElement): void {
    if (element) {
      element.tabIndex = 0;
      element.focus();
      element.tabIndex = -1;
    }
  }


}
