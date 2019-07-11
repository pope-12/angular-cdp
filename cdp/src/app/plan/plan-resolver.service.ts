import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { PlanService } from './plan.service';
import { AuthService } from '../core/auth/auth.service';
import { takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlanResolverService implements Resolve<any>{

  constructor(private planService: PlanService, private auth: AuthService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    const subject = new Subject();

    const userRetrieved$ = new Subject();
    this.auth.getUser().pipe(takeUntil(userRetrieved$)).subscribe((user) => {
      if (user && user.id) {
        userRetrieved$.next();
        this.planService.getUserPlan(user).subscribe((response) => {
          this.auth.getUserFromApiById(response.assessorId).subscribe((assessor) => {
            response.assessor = assessor;
            subject.next(response);
            subject.complete();
          });
        });
      }
    });

    return subject.asObservable();
  }
}
