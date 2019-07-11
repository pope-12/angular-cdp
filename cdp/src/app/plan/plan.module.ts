import { NgModule } from '@angular/core';

import { PlanRoutingModule } from './plan-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PlanComponent } from './plan.component';
import { GoalsComponent } from './goals/goals.component';
import { PlanService } from './services/plan.service';
import { PlanResolverService } from './services/plan-resolver.service';


@NgModule({
  declarations: [PlanComponent, GoalsComponent],
  imports: [
    SharedModule,
    PlanRoutingModule
  ],
  providers: [PlanService, PlanResolverService]
})
export class PlanModule { }
