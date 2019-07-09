import { NgModule } from '@angular/core';

import { ErrorRoutingModule } from './error-routing.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [NotFoundComponent],
  imports: [
    SharedModule,
    ErrorRoutingModule
  ]
})
export class ErrorModule { }
