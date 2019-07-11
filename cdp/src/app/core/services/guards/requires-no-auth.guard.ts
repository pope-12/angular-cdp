import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RequiresNoAuthGuard implements CanActivate {
  constructor(private auth: AuthService, private route: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.isLoggedOut();
  }

  isLoggedOut(url: string = null): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.auth.getLoggedIn().subscribe((loggedIn) => {
        resolve(!loggedIn);
        if (loggedIn) {
          this.route.navigate(['/']);
        }
      });
    });
  }
  
}
