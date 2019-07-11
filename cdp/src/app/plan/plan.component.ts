import { Component, OnDestroy, OnInit } from '@angular/core';
import { PlanService } from './plan.service';
import { AuthService } from '../core/auth/auth.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.scss']
})
export class PlanComponent implements OnInit, OnDestroy {
  private dataSubscription: Subscription;
  private plan;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe((data) => {
      this.plan = data.plan;
    });
  }

  ngOnDestroy() {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }

  getOverview() {
    return Object.keys(this.plan.overview);
  }

}
