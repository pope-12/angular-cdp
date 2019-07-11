import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlanComponent } from './plan.component';
import { PlanResolverService } from './services/plan-resolver.service';
import { PlanFormComponent } from './plan-form/plan-form.component';


const routes: Routes = [
  {path: '', component: PlanComponent, resolve: {plan: PlanResolverService}},
  {path: 'edit', component: PlanFormComponent, resolve: {plan: PlanResolverService}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanRoutingModule { }
