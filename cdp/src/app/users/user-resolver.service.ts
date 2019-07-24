import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UserInterface } from '../core/auth/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserResolverService implements Resolve<UserInterface>{

  constructor(private userService: UserService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<UserInterface> {
    return this.userService.getById(route.paramMap.get('userId'));
  }
}
