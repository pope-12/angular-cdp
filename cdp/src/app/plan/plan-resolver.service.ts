import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { PlanService } from './plan.service';
import { AuthService } from '../core/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PlanResolverService implements Resolve<any>{

  constructor(private planService: PlanService, private auth: AuthService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    const subject = new Subject();

    this.auth.getUser().subscribe((user) => {
      if (user) {
        this.planService.getUserPlan(user).subscribe((response) => {
          subject.next(response);
          subject.complete();
        });
      }
    });

    return subject.asObservable();
  }
}
