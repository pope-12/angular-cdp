import { Component, OnInit } from '@angular/core';
import { PageFocusService } from './core/page-focus.service';
import { StorageService } from './core/storage.service';
import { AuthService } from './core/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private pageFocusService: PageFocusService,
    private storage: StorageService,
    private auth: AuthService,
  ) {
    const user = this.storage.getItem(this.auth.storageUserKey);

    if (user) {
      this.auth.setUser();
    }
  }

  ngOnInit(): void {
    this.pageFocusService.watchRouteChange();
  }
}
