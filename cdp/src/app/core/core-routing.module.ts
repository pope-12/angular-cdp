import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { RequiresAuthGuard } from './guards/requires-auth.guard';


const routes: Routes = [
  {
    path: 'admin',
    canLoad: [RequiresAuthGuard],
    canActivate: [RequiresAuthGuard],
    loadChildren: () => import('../admin/admin.module').then(m => m.AdminModule)
  }
];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
