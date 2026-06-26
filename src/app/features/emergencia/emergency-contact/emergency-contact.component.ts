import { Component } from '@angular/core';
import { NgClass } from '@angular/common';
import { ContactoEmergencia } from '../../../core/models/contacto-emergencia';

@Component({
  selector: 'app-emergency-contact',
  standalone: true,
  imports: [NgClass],
  template: `
    <section class="min-h-screen bg-neutral-950 px-4 py-8 sm:px-6 lg:px-8">
      <header class="max-w-4xl mx-auto mb-8">
        <h1
          class="text-2xl sm:text-3xl font-bold text-venezuela-red border-b-2 border-venezuela-red pb-3 inline-block"
        >
          Contactos de Emergencia
        </h1>
        <p class="text-neutral-300 mt-2 text-sm sm:text-base">
          Líneas directas para asistencia humanitaria
        </p>
      </header>

      <div class="max-w-4xl mx-auto space-y-4">
        @for (contacto of contactos; track contacto.id) {
          <article
            class="bg-neutral-800 border border-neutral-700 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center gap-4"
          >
            <div class="flex-1">
              <div class="flex items-center gap-2 mb-1">
                <span
                  class="text-xs font-medium px-2 py-0.5 rounded-full"
                  [ngClass]="{
                    'bg-venezuela-blue/20 text-venezuela-blue border border-venezuela-blue/30': contacto.ambito === 'Nacional',
                    'bg-venezuela-yellow/20 text-venezuela-yellow border border-venezuela-yellow/30': contacto.ambito === 'Regional',
                    'bg-venezuela-red/20 text-venezuela-red border border-venezuela-red/30': contacto.ambito === 'Local'
                  }"
                >
                  {{ contacto.ambito }}
                </span>
                <span class="text-xs text-neutral-400">{{ contacto.tipo }}</span>
              </div>
              <h3 class="text-neutral-100 font-semibold">{{ contacto.nombre }}</h3>
              <p class="text-neutral-300 text-sm mt-0.5">{{ contacto.direccion }}</p>
            </div>

            <div class="flex flex-col gap-2 shrink-0">
              <a
                [href]="'tel:' + contacto.telefono"
                class="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-venezuela-red text-white rounded-lg text-sm font-medium hover:bg-red-700 transition"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {{ contacto.telefono }}
              </a>
              <a
                [href]="'mailto:' + contacto.email"
                class="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-venezuela-blue text-white rounded-lg text-sm font-medium hover:bg-blue-800 transition"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {{ contacto.email }}
              </a>
            </div>
          </article>
        }
      </div>
    </section>
  `,
})
export class EmergencyContactComponent {
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
