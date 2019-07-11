import { NgModule } from '@angular/core';

import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { AuthFormComponent } from './auth-form/auth-form.component';
import { AuthService } from './auth.service';


@NgModule({
  declarations: [AuthFormComponent],
  imports: [
    SharedModule,
    AuthRoutingModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
      deps: [AuthService]
    }
  ]
})
export class AuthModule { }
