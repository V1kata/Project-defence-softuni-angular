import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav/nav.component';
import { RouterModule } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { LoaderComponent } from './loader/loader.component';

@NgModule({
  declarations: [
    NavComponent,
    ErrorComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    NavComponent,
    ErrorComponent,
    LoaderComponent
  ]
})
export class CoreModule { }
