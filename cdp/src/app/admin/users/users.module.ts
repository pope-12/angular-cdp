import { NgModule } from '@angular/core';

import { UsersRoutingModule } from './users-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { UsersComponent } from './users.component';


@NgModule({
  declarations: [UsersComponent],
  imports: [
    SharedModule,
    UsersRoutingModule
  ],
  exports: [UsersComponent]
})
export class UsersModule { }
