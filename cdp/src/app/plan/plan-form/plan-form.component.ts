import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from '../../users/user.service';
import { UserInterface } from '../../core/auth/user.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PlanService } from '../services/plan.service';
import { AuthService } from '../../core/auth/auth.service';
import { MessagesService } from '../../../../projects/messages/src/lib/messages.service';

@Component({
  selector: 'app-plan-form',
  templateUrl: './plan-form.component.html',
  styleUrls: ['./plan-form.component.scss']
})
export class PlanFormComponent implements OnInit, OnDestroy {
  public plan: FormGroup;

  public users: UserInterface[];
  private dataSubscription: Subscription;
  private paramSubscription: Subscription;
  private id: number;
  private userId: number;

  constructor(
      private activatedRoute: ActivatedRoute,
      private planService: PlanService,
      private authService: AuthService,
      private messageService: MessagesService,
      private router: Router,
  ) { }

  ngOnInit() {
    this.dataSubscription = this.activatedRoute.data.subscribe((data) => {
      let plan = data.plan;
      if (!plan) {
        plan = {overview: {}};
      }
      this.id = plan.id;
      this.setUpPlan(plan);

      this.users = data.users;
    });

    this.paramSubscription = this.activatedRoute.paramMap.subscribe((map: any) => {
      if (map.params.userId !== '0') {
        this.userId = Number(map.params.userId);
      }
    });
  }

  submit() {
    const plan = this.plan.value;
    plan.userId = this.userId ? this.userId : this.authService.user.id;

    if (this.id) {
      plan.id = this.id;
    }

    this.planService.upsert(plan).subscribe((response) => {
      this.messageService.add({
        title: 'Success',
        body: 'Plan saved',
        class: 'success'
      });
      this.router.navigate(['/plan/user/', plan.userId]);
    });
  }


  ngOnDestroy(): void {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }

    if (this.paramSubscription) {
      this.paramSubscription.unsubscribe();
    }
  }

  private setUpPlan(plan) {
    this.plan = new FormGroup({
      overview: new FormGroup({
        technicalSkills: new FormControl(plan.overview.technicalSkills),
        softSkills: new FormControl(plan.overview.softSkills),
      }),
      assessorId: new FormControl(plan.assessorId),
    });
  }

}
