import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './views/pages/authentication/login/login.component';
import { isLoggedGuard } from './guards/is-logged.guard';

const routes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: 'auth'
  },
  {
    path: 'auth',
    loadChildren: () => import('./views/pages/authentication/authentication.module')
      .then(m => m.AuthenticationModule)
  },
  {
    path: 'dashboard',
    // canActivate: [isLoggedGuard],
    loadChildren: () => import('./views/pages/dashboard/dashboard.module')
      .then(m => m.DashboardModule)
  },
  {
    path: '**', pathMatch: 'full', redirectTo: 'auth'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
