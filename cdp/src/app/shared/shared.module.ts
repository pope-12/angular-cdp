import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MessagesModule } from '../../../projects/messages/src/lib/messages.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MessagesModule
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    MessagesModule
  ]
})
export class SharedModule { }
