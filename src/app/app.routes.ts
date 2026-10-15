import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'menu',
    loadComponent: () =>
      import('./pages/menu/menu.page').then((m) => m.MenuPage),
    canActivate: [authGuard],
  },
  {
    path: 'pages/conoceme',
    redirectTo: 'pages/conoceme/Josue',
    pathMatch: 'full',
  },
  {
    path: 'pages/conoceme/:persona',
    loadComponent: () =>
      import('./pages/conoceme/conoceme.page').then((m) => m.ConocemePage),
    canActivate: [authGuard],
  },

  {
    path: '**',
    redirectTo: 'login',
  },
];
