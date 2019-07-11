import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlanComponent } from './plan.component';
import { PlanResolverService } from './services/plan-resolver.service';


const routes: Routes = [
  {path: '', component: PlanComponent, resolve: {plan: PlanResolverService}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanRoutingModule { }
