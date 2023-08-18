import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav/nav.component';
import { RouterModule } from '@angular/router';
import { NavActiveDirective } from './nav-active.directive';
import { ErrorComponent } from './error/error.component';

@NgModule({
  declarations: [
    NavComponent,
    NavActiveDirective,
    ErrorComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    NavComponent,
    NavActiveDirective,
    ErrorComponent
  ]
})
export class CoreModule { }
