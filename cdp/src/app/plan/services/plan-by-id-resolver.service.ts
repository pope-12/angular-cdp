import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { PlanInterface } from '../plan.interface';
import { Observable } from 'rxjs';
import { PlanService } from './plan.service';

export class PlanByIdResolverService implements Resolve<PlanInterface> {

  constructor(private planService: PlanService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PlanInterface> | Promise<PlanInterface> | PlanInterface {
    const planId = route.paramMap.get('planId');

    return this.planService.getById(Number(planId));
  }
}
