import { NgModule } from '@angular/core';

import { PlanRoutingModule } from './plan-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PlanComponent } from './plan.component';


@NgModule({
  declarations: [PlanComponent],
  imports: [
    SharedModule,
    PlanRoutingModule
  ]
})
export class PlanModule { }
