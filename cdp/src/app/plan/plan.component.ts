import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { PlanInterface } from './plan.interface';
import { UserInterface } from '../core/auth/user.interface';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.scss']
})
export class PlanComponent implements OnInit, OnDestroy {
  private dataSubscription: Subscription;
  private userSubscription: Subscription;
  private plan: PlanInterface;
  private user: UserInterface;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.dataSubscription = this.activatedRoute.data.subscribe((data) => {
      this.plan = data.plan;
      this.user = data.user;
    });
  }

  ngOnDestroy(): void {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  getOverview(): string[] {
    return Object.keys(this.plan.overview);
  }

}
