import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { PlanService } from './plan.service';
import { AuthService } from '../../core/auth/auth.service';
import { takeUntil } from 'rxjs/operators';
import { PlanInterface } from '../plan.interface';
import { UserInterface } from '../../core/auth/user.interface';

@Injectable()
export class PlanResolverService implements Resolve<any>{

  constructor(private planService: PlanService, private auth: AuthService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PlanInterface> | Promise<PlanInterface> | PlanInterface {
    const subject = new Subject<PlanInterface>();
    const userRetrieved$ = new Subject();

    this.auth.getUser().pipe(takeUntil(userRetrieved$)).subscribe((user: UserInterface) => {
      if (user && user.id) {
        userRetrieved$.next();
        this.planService.getUserPlan(user).subscribe((plan: PlanInterface) => {
          this.auth.getUserFromApiById(plan.assessorId).subscribe((assessor) => {
            plan.assessor = assessor;
            subject.next(plan);
            subject.complete();
          });
        });
      }
    });

    return subject.asObservable();
  }
}
