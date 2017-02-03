import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';

const appRoutes: Routes = [
  {
    path : 'auth', loadChildren : './authentication/authentication.module#AuthenticationModule'
  },
  {path : '', redirectTo : '/examples/dashboard', pathMatch: 'full'},
  {path : '**', redirectTo : '/examples/dashboard'}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
