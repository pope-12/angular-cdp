import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanLoad, Route, UrlSegment } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RequiresAuthGuard implements CanActivate, CanLoad {
  constructor(private auth: AuthService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.isLoggedIn(state.url);
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return this.isLoggedIn();
  }

  isLoggedIn(url: string = null): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.auth.getLoggedIn().subscribe((loggedIn) => {
        if (!loggedIn) {
          this.auth.goToLoginPage(url);
        }
        resolve(loggedIn);
      });
    });
  }

}
