import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of, Subject } from 'rxjs';
import { PlanService } from './plan.service';
import { AuthService } from '../../core/auth/auth.service';
import { takeUntil } from 'rxjs/operators';
import { PlanInterface } from '../plan.interface';
import { UserInterface } from '../../core/auth/user.interface';
import { UserService } from '../../users/user.service';

@Injectable()
export class PlanResolverService implements Resolve<PlanInterface> {

  constructor(
    private planService: PlanService,
    private auth: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PlanInterface> | Promise<PlanInterface> | PlanInterface {
    const subject = new Subject<PlanInterface>();
    const userRetrieved$ = new Subject();
    const userId = route.paramMap.get('userId');

    if (userId && userId !== '0') {
      this.userService.getById(userId).subscribe((user) => {
        this.getPlan(user, subject);
      });
    } else {
      this.auth.getUser().pipe(takeUntil(userRetrieved$)).subscribe((user: UserInterface) => {
        if (user && user.id) {
          userRetrieved$.next();
          this.getPlan(user, subject);
        }
      });
    }

    return subject.asObservable();
  }

  getPlan(user, subject) {
    this.planService.getUserPlan(user).subscribe((plan: PlanInterface) => {
      if (!plan) {
        subject.next(plan);
        subject.complete();
        this.router.navigate(['/plan/edit', user.id], {relativeTo: this.activatedRoute});
      } else {
        this.auth.getUserFromApiById(plan.assessorId).subscribe((assessor) => {
          plan.assessor = assessor;
          subject.next(plan);
          subject.complete();
        });
      }
    });
  }
}
