import { NgModule } from '@angular/core';

import { PlanRoutingModule } from './plan-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PlanComponent } from './plan.component';
import { GoalsComponent } from './goals/goals.component';
import { PlanService } from './services/plan.service';
import { PlanResolverService } from './services/plan-resolver.service';
import { PlanFormComponent } from './plan-form/plan-form.component';


@NgModule({
  declarations: [PlanComponent, GoalsComponent, PlanFormComponent],
  imports: [
    SharedModule,
    PlanRoutingModule
  ],
  providers: [PlanService, PlanResolverService]
})
export class PlanModule { }
