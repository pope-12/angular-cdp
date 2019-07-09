import { NgModule } from '@angular/core';

import { CoreRoutingModule } from './core-routing.module';
import { LayoutModule } from './layout/layout.module';
import { ErrorModule } from './error/error.module';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [],
  imports: [
    CoreRoutingModule,
    LayoutModule,
    AuthModule,
    SharedModule,
    ErrorModule // should be after other modules with routes because contains catchAll ** 404 route
  ],
  exports: [LayoutModule, SharedModule]
})
export class CoreModule { }
