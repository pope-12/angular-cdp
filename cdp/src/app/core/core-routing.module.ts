import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { RequiresAuthGuard } from './services/guards/requires-auth.guard';
import { CustomPreloadingStrategy } from './custom-preloading-strategy';


const routes: Routes = [
  {
    path: 'admin',
    canLoad: [RequiresAuthGuard],
    canActivate: [RequiresAuthGuard],
    loadChildren: () => import('../admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'plan',
    canActivate: [RequiresAuthGuard],
    loadChildren: () => import('../plan/plan.module').then(m => m.PlanModule),
    data: { preload: true }
  },
  {
    path: '',
    redirectTo: 'plan',
    pathMatch: 'full'
  }
];

const config = {
  preloadingStrategy: PreloadAllModules
};

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, config),
  ],
  exports: [RouterModule],
  providers: [CustomPreloadingStrategy]
})
export class CoreRoutingModule { }
