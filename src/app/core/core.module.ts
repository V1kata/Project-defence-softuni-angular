import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav/nav.component';
import { RouterModule } from '@angular/router';
import { NavActiveDirective } from './nav-active.directive';

@NgModule({
  declarations: [
    NavComponent,
    NavActiveDirective
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    NavComponent,
    NavActiveDirective
  ]
})
export class CoreModule { }
