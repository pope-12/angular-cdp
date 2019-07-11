import { Component, OnInit } from '@angular/core';
import { PageFocusService } from './core/services/page-focus.service';
import { StorageService } from './core/services/storage.service';
import { AuthService } from './core/auth/auth.service';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public loading = false;

  constructor(
    private pageFocusService: PageFocusService,
    private storage: StorageService,
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.pageFocusService.watchRouteChange();

    this.router.events.subscribe((val) => {
      if (val instanceof  NavigationStart) {
        this.loading = true;
      } else if (val instanceof  NavigationEnd || val instanceof NavigationCancel || val instanceof NavigationError) {
        this.loading = false;
      }
    });

    const user = this.storage.getItem(this.auth.storageUserKey);

    if (user) {
      this.auth.setUser();
    }
  }

  getState(outlet) {
    return outlet.activatedRouteData.state;
  }
}
