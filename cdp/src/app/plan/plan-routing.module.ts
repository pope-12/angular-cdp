import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlanComponent } from './plan.component';
import { PlanResolverService } from './services/plan-resolver.service';
import { PlanFormComponent } from './plan-form/plan-form.component';
import { GoalFormComponent } from './goals/goal-form/goal-form.component';
import { GoalResolverService } from './goals/services/goal-resolver.service';


const routes: Routes = [
  {path: '', component: PlanComponent, resolve: {plan: PlanResolverService}},
  {path: 'edit', component: PlanFormComponent, resolve: {plan: PlanResolverService}},
  {path: ':planId/goals/:id', component: GoalFormComponent, resolve: {goal: GoalResolverService}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanRoutingModule { }
