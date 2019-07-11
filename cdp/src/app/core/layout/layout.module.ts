import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { LoadingComponent } from './loading/loading.component';


@NgModule({
  declarations: [HeaderComponent, FooterComponent, LoadingComponent],
  imports: [
    SharedModule,
    RouterModule
  ],
  exports: [HeaderComponent, FooterComponent, LoadingComponent]
})
export class LayoutModule { }
