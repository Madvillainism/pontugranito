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
    path: 'emergencia',
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
    path: 'test-supabase',
    loadComponent: () =>
      import('./features/test-supabase/test-supabase.component').then(
        (m) => m.TestSupabaseComponent,
      ),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
