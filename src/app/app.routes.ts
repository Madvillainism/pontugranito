import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/home/home-page.component').then((m) => m.HomePageComponent),
  },
  {
    path: 'voluntarios',
    loadComponent: () =>
      import('./features/voluntarios/voluntarios-page/voluntarios-page.component').then(
        (m) => m.VoluntariosPageComponent,
      ),
  },
  {
    path: 'personas',
    loadComponent: () =>
      import('./features/emergencia/emergency-contact/emergency-contact.component').then(
        (m) => m.EmergencyContactComponent,
      ),
  },
  {
    path: 'acopio',
    loadComponent: () =>
      import('./features/emergencia/acopio-page/acopio-page.component').then(
        (m) => m.AcopioPageComponent,
      ),
  },
  {
    path: 'refugios',
    loadComponent: () =>
      import('./features/emergencia/refugios-page/refugios-page.component').then(
        (m) => m.RefugiosPageComponent,
      ),
  },
  {
    path: 'test-supabase',
    loadComponent: () =>
      import('./features/test-supabase/test-supabase.component').then(
        (m) => m.TestSupabaseComponent,
      ),
  },
  {
    path: 'admin/login',
    loadComponent: () =>
      import('./features/admin/login-page.component').then((m) => m.LoginPageComponent),
  },
  {
    path: 'admin/dashboard',
    loadComponent: () =>
      import('./features/admin/dashboard-page.component').then((m) => m.DashboardPageComponent),
  },
  {
    path: 'admin/crear-refugio',
    loadComponent: () =>
      import('./features/admin/create-refugio-page.component').then(
        (m) => m.CreateRefugioPageComponent,
      ),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
