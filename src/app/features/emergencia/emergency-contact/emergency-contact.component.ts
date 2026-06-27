import { Component } from '@angular/core';
import { NgClass } from '@angular/common';
import { ContactoEmergencia } from '../../../core/models/contacto-emergencia';

/**
 * @component EmergencyContactComponent
 * @description
 * Página de contactos de emergencia de Pontugranito.
 * Muestra una lista de organismos humanitarios con sus datos de contacto,
 * permitiendo llamar o enviar correo directamente desde la interfaz.
 *
 * Sigue el sistema de diseño definido en `docs/design.md`:
 * - Tokens semánticos de Material Design (primary, secondary-container, on-tertiary-container)
 * - Tipografía Manrope (headlines), Inter (body), JetBrains Mono (labels)
 * - Material Symbols Outlined para iconografía
 * - Layout mobile-first con expansión a `md:flex-row`
 */
@Component({
  selector: 'app-emergency-contact',
  standalone: true,
  imports: [NgClass],
  template: `
    <!-- Main Content Canvas -->
    <main class="w-full max-w-[1280px] mx-auto px-4 md:px-8 pt-8 pb-24">

      <!-- Header Section -->
      <section class="mb-10">
        <div class="flex items-center gap-2 mb-2">
          <!-- Barra decorativa lateral (color tertiary/alert = coral muted) -->
          <div class="h-8 w-1 bg-on-tertiary-container rounded-full"></div>
          <h1 class="font-headline-md text-headline-md text-on-tertiary-container">
            Contactos de Emergencia
          </h1>
        </div>
        <p class="font-body-md text-body-md text-on-surface-variant">
          Líneas directas para asistencia humanitaria inmediata en territorio nacional.
        </p>
      </section>

      <!-- Emergency Cards Grid -->
      <div class="grid grid-cols-1 gap-6">
        @for (contacto of contactos; track contacto.id) {
          <article
            class="card-elevation rounded-xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 transition-all hover:border-primary/20"
          >
            <!-- Card Info -->
            <div class="flex-grow">
              <!-- Badges: Ámbito + Tipo -->
              <div class="flex gap-2 mb-3">
                <span
                  class="font-label-md text-label-md px-2 py-0.5 rounded text-[10px] uppercase tracking-wider"
                  [ngClass]="{
                    'bg-secondary-container text-on-secondary-container': contacto.ambito === 'Nacional',
                    'bg-primary-fixed-dim/20 text-primary-fixed': contacto.ambito === 'Regional',
                    'bg-tertiary-container/20 text-on-tertiary-container': contacto.ambito === 'Local'
                  }"
                >
                  {{ contacto.ambito }}
                </span>
                <span class="font-label-md text-label-md px-2 py-0.5 bg-surface-container-highest text-on-surface-variant rounded text-[10px] uppercase tracking-wider">
                  {{ contacto.tipo }}
                </span>
              </div>

              <!-- Nombre -->
              <h2 class="font-headline-sm text-headline-sm text-primary mb-1">
                {{ contacto.nombre }}
              </h2>

              <!-- Dirección -->
              <p class="font-body-md text-body-md text-on-surface-variant">
                {{ contacto.direccion }}
              </p>
            </div>

            <!-- Action Buttons -->
            <div class="flex flex-col gap-3 w-full md:w-auto shrink-0">
              <!-- Llamar (coral muted = on-tertiary-container) -->
              <a
                [href]="'tel:' + contacto.telefono"
                class="flex items-center justify-center gap-2 bg-on-tertiary-container text-white px-6 py-3 rounded-xl font-label-md text-label-md active:scale-95 transition-all"
              >
                <span class="material-symbols-outlined" style="font-size:20px;">call</span>
                {{ contacto.telefono }}
              </a>

              <!-- Correo (navy secondary) -->
              <a
                [href]="'mailto:' + contacto.email"
                class="flex items-center justify-center gap-2 bg-secondary-container text-white px-6 py-3 rounded-xl font-label-md text-label-md active:scale-95 transition-all"
              >
                <span class="material-symbols-outlined" style="font-size:20px;">mail</span>
                {{ contacto.email }}
              </a>
            </div>
          </article>
        }
      </div>

      <!-- Map Indicator Block -->
      <div class="mt-12 rounded-xl overflow-hidden h-48 relative border border-outline-variant grayscale">
        <div class="absolute inset-0 bg-black/40 z-10 flex items-center justify-center pointer-events-none">
          <div class="bg-surface-container px-4 py-2 rounded-full border border-outline flex items-center gap-2">
            <span class="material-symbols-outlined text-primary" style="font-variation-settings: 'FILL' 1; font-size:20px;">location_on</span>
            <span class="font-label-md text-label-md text-on-surface">Sedes en Venezuela</span>
          </div>
        </div>
        <!-- Placeholder oscuro del mapa -->
        <div class="w-full h-full bg-surface-container-low flex items-center justify-center">
          <span class="material-symbols-outlined text-outline" style="font-size:64px; font-variation-settings: 'FILL' 0, 'wght' 100;">map</span>
        </div>
      </div>

    </main>
  `,
  styles: [`
    .card-elevation {
      border: 1px solid rgba(255, 255, 255, 0.05);
      background-color: #1e1e1e;
    }
  `],
})
export class EmergencyContactComponent {
  /** Lista de contactos de emergencia humanitaria en Venezuela. */
  contactos: ContactoEmergencia[] = [
    {
      id: 1,
      nombre: 'Cruz Roja Venezolana — Sede Nacional',
      telefono: '+582125714380',
      email: 'info@cruzroja.ve',
      direccion: 'Av. Andrés Bello, Caracas',
      ambito: 'Nacional',
      tipo: 'Organismo Humanitario',
    },
    {
      id: 2,
      nombre: 'Cruz Roja Venezolana — Seccional Zulia',
      telefono: '+582617986455',
      email: 'maracaibo@cruzroja.ve',
      direccion: 'Av. 11 Esq. Calle 83, Sector Veritas, Maracaibo',
      ambito: 'Regional',
      tipo: 'Filial Regional',
    },
    {
      id: 3,
      nombre: 'Restablecimiento de Contacto Familiar (RCF)',
      telefono: '04227994880',
      email: 'proteccion@cruzroja.ve',
      direccion: 'Emergencia — Terremotos 2026',
      ambito: 'Nacional',
      tipo: 'Servicio de Emergencia',
    },
  ];
}

