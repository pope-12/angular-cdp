import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { GoalsService } from '../services/goals.service';
import { Subscription } from 'rxjs';
import { MessagesService } from '../../../../../projects/messages/src/lib/messages.service';

@Component({
  selector: 'app-goal-form',
  templateUrl: './goal-form.component.html',
  styleUrls: ['./goal-form.component.scss']
})
export class GoalFormComponent implements OnInit, OnDestroy {
  public id: number;
  public planId: number;
  public isNew = false;
  public goal: FormGroup;

  private routeSubscription: Subscription;
  private dataSubscription: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private goalService: GoalsService,
    private messageService: MessagesService,
    private router: Router
  ) { }

  ngOnInit() {
    this. routeSubscription = this.activatedRoute.paramMap.subscribe((paramMap: Params) => {
      this.id = Number(paramMap.params.id);
      this.planId = Number(paramMap.params.planId);
      if (this.id === 0) {
        this.isNew = true;
        this.setUpGoal({});
      }
    });

    this.dataSubscription = this.activatedRoute.data.subscribe((data) => {
      if (data.goal) {
        this.setUpGoal(data.goal);
      }
    });
  }

  ngOnDestroy() {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }

  setUpGoal(goal: GoalInterface) {
    this.goal = new FormGroup({
      goalDate: new FormControl(goal.goalDate),
      commitment: new FormControl(goal.commitment),
      comments: new FormControl(goal.comments),
      completedDate: new FormControl(goal.completedDate),
    });
  }

  submit() {
    const goal: GoalInterface = this.goal.value;
    goal.planId = this.planId;
    if (!this.isNew) {
      goal.id = this.id;
    }

    this.goalService.upsert(goal).subscribe((response) => {
      this.messageService.add({
        class: 'success',
        body: 'Save success'
      });
      this.router.navigate(['/plan']);
    }, (error) => {
      this.messageService.add({
        class: 'danger',
        body: 'Save Failed'
      });
    });
  }

}
