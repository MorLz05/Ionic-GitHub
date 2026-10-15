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
    loadComponent: () => import('./login/login/login.page').then(m => m.LoginPage),
  },
  {
    path: 'menu',
    loadComponent: () => import('./pages/menu/menu.page').then(m => m.MenuPage),
    canActivate: [authGuard]
  },
  {
    path: 'pages/conoceme/Josue',
    loadComponent: () => import('./pages/conoceme/Josue/conoceme.page').then(m => m.ConocemePage),
    canActivate: [authGuard]
  },

  {
    path: '**',
    redirectTo: 'login'
  }
];
