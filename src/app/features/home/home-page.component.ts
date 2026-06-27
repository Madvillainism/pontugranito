import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [RouterLink],
  template: `
    <!-- Top App Bar -->
    <header class="fixed top-0 left-0 w-full z-50 bg-[#131313]/80 backdrop-blur-md border-b border-outline-variant">
      <div class="flex justify-between items-center px-margin-mobile md:px-margin-desktop py-4 w-full max-w-container-max-width mx-auto">
        <div class="flex items-center gap-3">
          <span class="material-symbols-outlined text-primary-fixed" data-icon="emergency">emergency</span>
          <span class="font-headline-sm text-headline-sm font-bold text-primary">Pontugranito</span>
        </div>
        <nav class="hidden md:flex items-center gap-8">
          <a class="font-label-md text-label-md text-primary transition-colors" routerLink="/">Inicio</a>
          <a class="font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors" routerLink="/acopio">Mapa de Ayuda</a>
          <a class="font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors" routerLink="/acopio">Donaciones</a>
          <button routerLink="/test-supabase" class="bg-primary text-on-primary px-4 py-2 rounded-xl font-label-md text-label-md hover:brightness-110 active:scale-95 transition-all">Acceder</button>
        </nav>
      </div>
    </header>

    <main class="min-h-screen pt-24 pb-32 px-margin-mobile md:px-margin-desktop max-w-container-max-width mx-auto">
      <!-- Hero Section -->
      <section class="flex flex-col items-center text-center mb-12">
        <div class="gradient-logo w-24 h-24 rounded-full mb-6 border-4 border-surface-container-highest"></div>
        <h1 class="font-display-lg text-display-lg md:text-display-lg mb-2 text-on-surface">Pontugranito</h1>
        <p class="font-headline-sm text-headline-sm text-primary mb-2 max-w-2xl">
          Centro de Voluntariado y Ayuda Humanitaria — Venezuela
        </p>
        <p class="font-body-md text-body-md text-on-surface-variant max-w-xl mx-auto opacity-80">
          Conectando solidaridad con necesidades críticas. Una plataforma para gestionar recursos, asistencia en emergencias y redes de voluntariado en todo el territorio nacional.
        </p>
        <!-- Flag Indicators -->
        <div class="flex gap-2 mt-6">
          <span class="px-3 py-1 rounded-full bg-[#ffcc00] text-black text-[10px] font-bold uppercase tracking-widest">Amarillo</span>
          <span class="px-3 py-1 rounded-full bg-[#0033a0] text-white text-[10px] font-bold uppercase tracking-widest">Azul</span>
          <span class="px-3 py-1 rounded-full bg-[#ce1126] text-white text-[10px] font-bold uppercase tracking-widest">Rojo</span>
        </div>
      </section>

      <!-- Bento Grid Actions -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 md:h-[400px]">
        <!-- Voluntarios Card (Azul Profundo) -->
        <div routerLink="/voluntarios" class="bento-card md:col-span-2 group relative overflow-hidden bg-secondary-container rounded-xl p-8 flex flex-col justify-end border border-white/5 cursor-pointer">
          <div class="absolute top-6 right-8 opacity-20 group-hover:opacity-40 transition-opacity">
            <span class="material-symbols-outlined text-[120px]" data-icon="group">group</span>
          </div>
          <div class="relative z-10">
            <h3 class="font-headline-md text-headline-md text-on-secondary-container mb-2">Voluntarios</h3>
            <p class="text-on-secondary-container opacity-80 text-sm max-w-[240px]">Gestión de brigadas, turnos y coordinación de equipos activos en campo.</p>
          </div>
        </div>

        <!-- Emergencia Card (Rojo Coral) -->
        <div routerLink="/emergencia" class="bento-card md:col-span-2 group relative overflow-hidden bg-error-container rounded-xl p-8 flex flex-col justify-end border border-white/5 cursor-pointer">
          <div class="absolute top-6 right-8 opacity-20 group-hover:opacity-40 transition-opacity">
            <span class="material-symbols-outlined text-[120px]" data-icon="emergency_share">emergency_share</span>
          </div>
          <div class="relative z-10">
            <h3 class="font-headline-md text-headline-md text-on-error-container mb-2">Emergencia</h3>
            <p class="text-on-error-container opacity-80 text-sm max-w-[240px]">Reporte inmediato de incidentes y canal directo con servicios de respuesta rápida.</p>
          </div>
        </div>

        <!-- Centros de Acopio Card (Amarillo Ámbar) -->
        <div routerLink="/acopio" class="bento-card md:col-span-2 group relative overflow-hidden bg-primary-container rounded-xl p-8 flex flex-col justify-end border border-white/5 cursor-pointer">
          <div class="absolute top-6 right-8 opacity-20 group-hover:opacity-40 transition-opacity text-on-primary-container">
            <span class="material-symbols-outlined text-[120px]" data-icon="location_on">location_on</span>
          </div>
          <div class="relative z-10">
            <h3 class="font-headline-md text-headline-md text-on-primary-container mb-2">Centros de Acopio</h3>
            <p class="text-on-primary-container opacity-80 text-sm max-w-[240px]">Mapa interactivo de puntos autorizados para recepción de suministros y alimentos.</p>
          </div>
        </div>

        <!-- Quiero Ser Voluntario Card (Light Amber) -->
        <div routerLink="/test-supabase" class="bento-card md:col-span-2 group relative overflow-hidden bg-primary-fixed rounded-xl p-8 flex flex-col justify-end border border-white/5 cursor-pointer">
          <div class="absolute top-6 right-8 opacity-20 group-hover:opacity-40 transition-opacity text-on-primary-fixed">
            <span class="material-symbols-outlined text-[120px]" data-icon="edit_note">edit_note</span>
          </div>
          <div class="relative z-10">
            <h3 class="font-headline-md text-headline-md text-on-primary-fixed mb-2">Quiero ser voluntario</h3>
            <p class="text-on-primary-fixed opacity-80 text-sm max-w-[240px]">Únete a nuestra red. Registro nacional para nuevos colaboradores y brigadistas.</p>
          </div>
        </div>
      </div>

      <!-- Secondary Info Cards -->
      <section class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-surface-container p-6 rounded-xl border border-outline-variant hover:border-primary/50 transition-colors">
          <div class="flex items-center gap-4 mb-4">
            <div class="w-12 h-12 rounded-lg bg-surface-container-high flex items-center justify-center text-primary">
              <span class="material-symbols-outlined" data-icon="medical_services">medical_services</span>
            </div>
            <div>
              <h4 class="font-headline-sm text-[18px] text-on-surface">Asistencia Médica</h4>
              <p class="font-label-md text-label-md text-on-surface-variant">24 Centros Activos</p>
            </div>
          </div>
          <p class="text-sm text-on-surface-variant opacity-70">Encuentra centros de salud aliados y jornadas de vacunación o atención primaria en tu zona.</p>
        </div>

        <div class="bg-surface-container p-6 rounded-xl border border-outline-variant hover:border-primary/50 transition-colors">
          <div class="flex items-center gap-4 mb-4">
            <div class="w-12 h-12 rounded-lg bg-surface-container-high flex items-center justify-center text-primary">
              <span class="material-symbols-outlined" data-icon="volunteer_activism">volunteer_activism</span>
            </div>
            <div>
              <h4 class="font-headline-sm text-[18px] text-on-surface">Donaciones</h4>
              <p class="font-label-md text-label-md text-on-surface-variant">Donativos Críticos</p>
            </div>
          </div>
          <p class="text-sm text-on-surface-variant opacity-70">Consulta la lista de insumos prioritarios y cómo hacerlos llegar de forma segura a los centros.</p>
        </div>

        <div class="bg-surface-container p-6 rounded-xl border border-outline-variant hover:border-primary/50 transition-colors">
          <div class="flex items-center gap-4 mb-4">
            <div class="w-12 h-12 rounded-lg bg-surface-container-high flex items-center justify-center text-primary">
              <span class="material-symbols-outlined" data-icon="inventory_2">inventory_2</span>
            </div>
            <div>
              <h4 class="font-headline-sm text-[18px] text-on-surface">Logística</h4>
              <p class="font-label-md text-label-md text-on-surface-variant">Distribución Real</p>
            </div>
          </div>
          <p class="text-sm text-on-surface-variant opacity-70">Seguimiento de rutas de ayuda y coordinación de transporte para materiales humanitarios.</p>
        </div>
      </section>
    </main>

    <!-- Bottom Navigation Bar -->
    <nav class="fixed bottom-0 left-0 w-full z-50 bg-surface-container rounded-t-xl border-t border-outline-variant shadow-lg md:hidden">
      <div class="flex justify-around items-center h-16 w-full max-w-container-max-width mx-auto">
        <button routerLink="/voluntarios" class="flex flex-col items-center justify-center text-on-surface-variant px-4 py-1 active:scale-95 transition-all">
          <span class="material-symbols-outlined" data-icon="group">group</span>
          <span class="font-label-md text-[10px] mt-1">Voluntarios</span>
        </button>
        <button routerLink="/emergencia" class="flex flex-col items-center justify-center text-on-surface-variant px-4 py-1 active:scale-95 transition-all">
          <span class="material-symbols-outlined" data-icon="call">call</span>
          <span class="font-label-md text-[10px] mt-1">Emergencia</span>
        </button>
        <button routerLink="/acopio" class="flex flex-col items-center justify-center text-on-surface-variant px-4 py-1 active:scale-95 transition-all">
          <span class="material-symbols-outlined" data-icon="location_on">location_on</span>
          <span class="font-label-md text-[10px] mt-1">Acopio</span>
        </button>
        <button routerLink="/test-supabase" class="flex flex-col items-center justify-center bg-secondary-container text-on-secondary-container rounded-full px-4 py-1 active:scale-95 transition-all">
          <span class="material-symbols-outlined" data-icon="edit_note">edit_note</span>
          <span class="font-label-md text-[10px] mt-1">Registro</span>
        </button>
      </div>
    </nav>

    <!-- Desktop Footer -->
    <footer class="w-full py-12 mb-0 md:mb-0 bg-surface-container-lowest border-t border-outline-variant hidden md:block">
      <div class="flex flex-col md:flex-row justify-between items-center px-margin-mobile md:px-margin-desktop gap-8 max-w-container-max-width mx-auto">
        <div class="text-center md:text-left">
          <span class="font-headline-sm text-headline-sm text-primary mb-2 block">Pontugranito</span>
          <p class="font-label-md text-label-md text-on-surface-variant opacity-80 max-w-md">
            Hecho por Carlos Perez · Datos de Cruz Roja Venezolana y Alcaldia de Maracaibo · Junio 2026
          </p>
          <p class="font-label-md text-label-md text-primary mt-2">Contacto: carlosperezph&#64;hotmail.com</p>
        </div>
        <div class="flex flex-wrap justify-center gap-6">
          <a class="font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors" routerLink="/">Privacidad</a>
          <a class="font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors" routerLink="/">Términos</a>
          <a class="font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors" routerLink="/">Contacto</a>
        </div>
        <p class="font-label-md text-label-md text-on-surface-variant">© 2026 Pontugranito - Ayuda Humanitaria Venezuela</p>
      </div>
    </footer>

    <!-- Mobile Footer Text (Always visible at bottom above nav) -->
    <div class="md:hidden w-full text-center py-8 pb-24 text-[10px] text-on-surface-variant/50 px-margin-mobile">
      <p>Hecho por Carlos Perez · Datos de Cruz Roja Venezolana · Junio 2026</p>
      <p>Contacto: carlosperezph&#64;hotmail.com</p>
    </div>
  `,
  styles: [`
    .gradient-logo {
      background: linear-gradient(135deg, #ffcc00 0%, #0033a0 50%, #ce1126 100%);
      box-shadow: 0 0 20px rgba(0,0,0,0.5);
    }
    .bento-card {
      transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    .bento-card:active {
      transform: scale(0.96);
    }
  `]
})
export class HomePageComponent {}
