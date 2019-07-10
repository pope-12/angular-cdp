import { Component, OnDestroy, OnInit } from '@angular/core';
import { PlanService } from './plan.service';
import { AuthService } from '../core/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.scss']
})
export class PlanComponent implements OnInit, OnDestroy {
  private authSubscription: Subscription;
  private plan;

  constructor(private planService: PlanService, private auth: AuthService) { }

  ngOnInit() {
    this.auth.getUser().subscribe((user) => {
      if (user) {
        this.getPlan(user);
      }
    });
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  getPlan(user) {
    this.planService.getUserPlan(user).subscribe((response) => {
      this.plan = response;
    });
  }

  getOverview() {
    return Object.keys(this.plan.overview);
  }

}
