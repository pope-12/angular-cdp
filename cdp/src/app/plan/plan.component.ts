import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { PlanInterface } from './plan.interface';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.scss']
})
export class PlanComponent implements OnInit, OnDestroy {
  private dataSubscription: Subscription;
  private plan: PlanInterface;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.dataSubscription = this.activatedRoute.data.subscribe((data) => {
      this.plan = data.plan;
    });
  }

  ngOnDestroy(): void {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }

  getOverview(): string[] {
    return Object.keys(this.plan.overview);
  }

}
