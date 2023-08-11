import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    component: MainComponent,
  },
  
  // {
  //   path: 'auth',
  //   loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
  // },
  // { path: 'error', component: ErrorComponent },

  // { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
