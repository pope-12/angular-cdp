import { Injectable } from '@angular/core';
import { GoalsService } from './goals.service';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class GoalResolverService implements Resolve<GoalInterface> {

  constructor(private goalService: GoalsService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<GoalInterface> | Promise<GoalInterface> | GoalInterface {
    const id = route.paramMap.get('id');

    if (id === '0') {
      return null;
    }

    return this.goalService.getById(id);
  }

}
