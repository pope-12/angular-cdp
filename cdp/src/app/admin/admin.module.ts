import { NgModule } from '@angular/core';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { UsersModule } from './users/users.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [AdminComponent],
  imports: [
    SharedModule,
    AdminRoutingModule,
    UsersModule
  ]
})
export class AdminModule { }
