import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="min-h-screen bg-background px-margin-mobile md:px-margin-desktop py-8 animate-fadeIn">
      
      <!-- Top nav admin -->
      <header class="max-w-container-max-width mx-auto mb-8 flex justify-between items-center bg-surface-container/50 border border-outline-variant p-4 rounded-xl">
        <div class="flex items-center gap-3">
          <span class="material-symbols-outlined text-primary-fixed">admin_panel_settings</span>
          <span class="font-manrope font-bold text-lg text-on-surface">Panel de Administración</span>
        </div>
        <button 
          (click)="logout()" 
          class="flex items-center gap-2 px-4 py-2 bg-error-container/30 text-error rounded-lg hover:bg-error-container/50 transition-colors text-sm font-semibold"
        >
          <span class="material-symbols-outlined text-[18px]">logout</span>
          Cerrar Sesión
        </button>
      </header>

      <div class="max-w-container-max-width mx-auto">
        <div class="mb-10 text-center md:text-left">
          <h1 class="font-manrope text-3xl font-bold text-primary mb-2">Bienvenido, Usuario 123</h1>
          <p class="text-on-surface-variant font-sans text-sm">Gestiona los centros de acopio y refugios asignados a tu cuenta.</p>
        </div>

        <!-- Action Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          
          <div routerLink="/admin/crear-refugio" class="bg-tertiary-container rounded-2xl p-6 relative overflow-hidden group cursor-pointer border border-white/10 hover:-translate-y-1 transition-transform">
            <div class="absolute right-0 top-0 w-32 h-32 bg-white/5 rounded-bl-full flex items-center justify-center -mr-4 -mt-4">
              <span class="material-symbols-outlined text-[64px] text-on-tertiary-container/30 group-hover:scale-110 transition-transform">add_business</span>
            </div>
            
            <div class="relative z-10">
              <div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-on-tertiary-container mb-4">
                <span class="material-symbols-outlined">cabin</span>
              </div>
              <h2 class="font-manrope text-xl font-bold text-on-tertiary-container mb-1">Crear Refugio</h2>
              <p class="text-on-tertiary-container/80 text-sm max-w-[200px]">Registra un nuevo refugio temporal en el sistema nacional.</p>
            </div>
          </div>

          <!-- Botón de Acopio (dummy por ahora) -->
          <div class="bg-primary-container rounded-2xl p-6 relative overflow-hidden group cursor-pointer border border-white/10 hover:-translate-y-1 transition-transform">
            <div class="absolute right-0 top-0 w-32 h-32 bg-white/5 rounded-bl-full flex items-center justify-center -mr-4 -mt-4">
              <span class="material-symbols-outlined text-[64px] text-on-primary-container/30 group-hover:scale-110 transition-transform">add_location_alt</span>
            </div>
            
            <div class="relative z-10">
              <div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-on-primary-container mb-4">
                <span class="material-symbols-outlined">location_on</span>
              </div>
              <h2 class="font-manrope text-xl font-bold text-on-primary-container mb-1">Crear Centro de Acopio</h2>
              <p class="text-on-primary-container/80 text-sm max-w-[200px]">Registra un centro de recepción de donaciones autorizado.</p>
            </div>
          </div>

        </div>

        <!-- Managed Entities section (Mock) -->
        <div>
          <h3 class="font-manrope text-xl font-semibold text-on-surface mb-6 border-b border-outline-variant pb-3 block">
            Centros administrados (Ejemplos)
          </h3>
          <div class="space-y-4">
            
            <!-- Mock items -->
            <div class="bg-surface-container-high rounded-xl p-4 border border-outline-variant flex justify-between items-center">
              <div class="flex items-center gap-4">
                <div class="w-10 h-10 rounded-full bg-tertiary-container flex justify-center items-center text-on-tertiary-container shrink-0">
                  <span class="material-symbols-outlined text-[18px]">cabin</span>
                </div>
                <div>
                  <h4 class="font-bold text-sm text-primary">Liceo Udón Pérez</h4>
                  <p class="text-xs text-on-surface-variant font-mono">Refugio · Zulia, Maracaibo</p>
                </div>
              </div>
              <button class="text-xs font-mono uppercase text-primary hover:underline px-3 py-1 bg-primary/10 rounded-full">Editar</button>
            </div>

            <div class="bg-surface-container-high rounded-xl p-4 border border-outline-variant flex justify-between items-center">
              <div class="flex items-center gap-4">
                <div class="w-10 h-10 rounded-full bg-primary-container flex justify-center items-center text-on-primary-container shrink-0">
                  <span class="material-symbols-outlined text-[18px]">location_on</span>
                </div>
                <div>
                  <h4 class="font-bold text-sm text-primary">Palacio Municipal</h4>
                  <p class="text-xs text-on-surface-variant font-mono">Centro de Acopio · Alcaldía</p>
                </div>
              </div>
              <button class="text-xs font-mono uppercase text-primary hover:underline px-3 py-1 bg-primary/10 rounded-full">Editar</button>
            </div>

          </div>
        </div>
      </div>
    </section>
  `
})
export class DashboardPageComponent {
  private authService = inject(AuthService);

  logout() {
    this.authService.logout();
  }
}
