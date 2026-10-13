import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'menu',
    loadComponent: () => import('./pages/menu/menu.page').then((m) => m.MenuPage),
  },
  {
  path: 'josue',
  loadComponent: () =>
    import('./pages/conoceme/Josue/conoceme.page').then((m) => m.ConocemePage),
},
];
