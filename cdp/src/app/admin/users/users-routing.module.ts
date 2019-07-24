import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from '../admin.component';
import { UsersResolverService } from '../../users/users-resolver.service';


const routes: Routes = [
  {path: 'users', component: AdminComponent, resolve: {users: UsersResolverService}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
