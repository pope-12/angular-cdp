import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlanComponent } from './plan.component';
import { PlanResolverService } from './services/plan-resolver.service';
import { PlanFormComponent } from './plan-form/plan-form.component';
import { GoalFormComponent } from './goals/goal-form/goal-form.component';
import { GoalResolverService } from './goals/services/goal-resolver.service';
import { UsersResolverService } from '../users/users-resolver.service';
import { UserResolverService } from '../users/user-resolver.service';
import { PlanByIdResolverService } from './services/plan-by-id-resolver.service';


const routes: Routes = [
  {path: '', redirectTo: 'user/0'},
  {path: 'user/:userId', component: PlanComponent, resolve: {plan: PlanResolverService, user: UserResolverService}},
  {path: 'edit/:userId', component: PlanFormComponent, resolve: {plan: PlanResolverService, users: UsersResolverService}},
  {path: ':planId/goals/:id', component: GoalFormComponent, resolve: {goal: GoalResolverService, plan: PlanByIdResolverService}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanRoutingModule { }
