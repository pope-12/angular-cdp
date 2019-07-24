import { NgModule } from '@angular/core';

import { PlanRoutingModule } from './plan-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PlanComponent } from './plan.component';
import { GoalsComponent } from './goals/goals.component';
import { PlanService } from './services/plan.service';
import { PlanResolverService } from './services/plan-resolver.service';
import { PlanFormComponent } from './plan-form/plan-form.component';
import { GoalFormComponent } from './goals/goal-form/goal-form.component';
import { GoalsService } from './goals/services/goals.service';
import { GoalResolverService } from './goals/services/goal-resolver.service';
import { PlanByIdResolverService } from './services/plan-by-id-resolver.service';


@NgModule({
  declarations: [PlanComponent, GoalsComponent, PlanFormComponent, GoalFormComponent],
  imports: [
    SharedModule,
    PlanRoutingModule
  ],
  providers: [PlanService, PlanResolverService, GoalsService, GoalResolverService, PlanByIdResolverService]
})
export class PlanModule { }
