import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RequiresNoAuthGuard } from '../guards/requires-no-auth.guard';
import { AuthFormComponent } from './auth-form/auth-form.component';


const routes: Routes = [
  {path: 'login', component: AuthFormComponent, canActivate: [RequiresNoAuthGuard]},
  {path: 'register', component: AuthFormComponent, canActivate: [RequiresNoAuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
