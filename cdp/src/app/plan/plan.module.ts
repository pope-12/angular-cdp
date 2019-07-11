import { NgModule } from '@angular/core';

import { PlanRoutingModule } from './plan-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PlanComponent } from './plan.component';
import { GoalsComponent } from './goals/goals.component';


@NgModule({
  declarations: [PlanComponent, GoalsComponent],
  imports: [
    SharedModule,
    PlanRoutingModule
  ]
})
export class PlanModule { }
