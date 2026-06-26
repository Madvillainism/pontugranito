import { Component } from '@angular/core';
import { NgClass } from '@angular/common';
import { CentroAcopio } from '../../../core/models/centro-acopio';

@Component({
  selector: 'app-acopio-page',
  standalone: true,
  imports: [NgClass],
  template: `
    <section class="min-h-screen bg-neutral-950 px-4 py-8 sm:px-6 lg:px-8">
      <header class="max-w-7xl mx-auto mb-8">
        <h1
          class="text-2xl sm:text-3xl font-bold text-venezuela-yellow border-b-2 border-venezuela-yellow pb-3 inline-block"
        >
          Centros de Acopio — Maracaibo
        </h1>
        <p class="text-neutral-400 mt-2 text-sm sm:text-base">
          {{ centros.length }} puntos habilitados para recibir donaciones
        </p>
      </header>

      <!-- Filtro por tipo -->
      <div class="max-w-7xl mx-auto mb-6 flex flex-wrap gap-2">
        @for (tipo of tipos; track tipo) {
          <button
            (click)="filtroTipo = tipo === filtroTipo ? null : tipo"
            class="px-3 py-1.5 rounded-lg text-xs font-medium border transition"
            [class.bg-venezuela-blue]="filtroTipo === tipo"
            [class.text-white]="filtroTipo === tipo"
            [class.border-venezuela-blue]="filtroTipo === tipo"
            [class.bg-neutral-900]="filtroTipo !== tipo"
            [class.text-neutral-300]="filtroTipo !== tipo"
            [class.border-neutral-700]="filtroTipo !== tipo"
            [class.hover:border-neutral-500]="filtroTipo !== tipo"
          >
            {{ tipo }}
          </button>
        }
        @if (filtroTipo) {
          <button
            (click)="filtroTipo = null"
            class="px-3 py-1.5 rounded-lg text-xs font-medium bg-neutral-800 text-neutral-400 border border-neutral-700 hover:border-venezuela-red/50 transition"
          >
            Limpiar filtro
          </button>
        }
      </div>

      <!-- Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto">
        @for (centro of centrosFiltrados(); track centro.id) {
          <article
            class="bg-neutral-900 border border-neutral-800 rounded-xl p-5 flex flex-col gap-3 transition hover:border-neutral-700"
          >
            <div class="flex items-start justify-between gap-2">
              <h3 class="text-neutral-50 font-semibold text-sm leading-tight">
                {{ centro.nombre }}
              </h3>
              <span
                class="shrink-0 text-xs font-medium px-2 py-0.5 rounded-full"
                [ngClass]="{
                  'bg-venezuela-yellow/20 text-venezuela-yellow': centro.tipo === 'Alcaldía',
                  'bg-venezuela-red/20 text-venezuela-red': centro.tipo === 'Bomberos',
                  'bg-venezuela-blue/20 text-venezuela-blue': centro.tipo === 'Gobierno Regional',
                  'bg-neutral-800 text-neutral-300': centro.tipo === 'Iglesia' || centro.tipo === 'ONG' || centro.tipo === 'Público'
                }"
              >
                {{ centro.tipo }}
              </span>
            </div>
            <p class="text-neutral-400 text-xs leading-relaxed">
              {{ centro.direccion }}
            </p>
            <div class="mt-auto flex items-center justify-between text-xs">
              <span class="text-neutral-500">{{ centro.horario }}</span>
              @if (centro.activo) {
                <span class="text-green-400 flex items-center gap-1">
                  <span class="w-1.5 h-1.5 rounded-full bg-green-400"></span>
                  Activo
                </span>
              } @else {
                <span class="text-neutral-500">Por confirmar</span>
              }
            </div>
          </article>
        } @empty {
          <div class="col-span-full text-center py-20 text-neutral-500">
            <p class="text-lg">No hay centros con ese filtro</p>
          </div>
        }
      </div>
    </section>
  `,
})
export class AcopioPageComponent {
  filtroTipo: string | null = null;

  tipos: string[] = [
    'Alcaldía',
    'Bomberos',
    'Gobierno Regional',
    'Iglesia',
    'Público',
  ];

  centros: CentroAcopio[] = [
    { id: 1, nombre: 'Torre Bolívar', direccion: 'Av. 4 Bella Vista, calle 75', tipo: 'Alcaldía', horario: '8:00 - 18:00', activo: true },
    { id: 2, nombre: 'Villa Carmen', direccion: 'Av. 4 Bella Vista, entre calles 75 y 76', tipo: 'Alcaldía', horario: '8:00 - 18:00', activo: true },
    { id: 3, nombre: 'FUNDANIS', direccion: 'Av. 4 Bella Vista con calle 93 Padilla', tipo: 'Alcaldía', horario: '8:00 - 18:00', activo: true },
    { id: 4, nombre: 'Estación Central del Tranvía', direccion: 'Av. 2 El Milagro, Parque Vereda del Lago', tipo: 'Alcaldía', horario: '8:00 - 18:00', activo: true },
    { id: 5, nombre: 'Plaza de la República', direccion: 'Calle 77 (5 de Julio) con Av. 3Y', tipo: 'Alcaldía', horario: '8:00 - 18:00', activo: true },
    { id: 6, nombre: 'Concha Acústica Ana María Campos', direccion: 'Av. 25 con Av. Universidad', tipo: 'Alcaldía', horario: '8:00 - 18:00', activo: true },
    { id: 7, nombre: 'FUNDEPO', direccion: 'Zona Industrial, Av. 59, calles 140-147', tipo: 'Alcaldía', horario: '8:00 - 18:00', activo: true },
    { id: 8, nombre: 'Cuerpo de Bomberos de Maracaibo', direccion: 'Av. 8 Santa Rita con calle 86', tipo: 'Bomberos', horario: '24 horas', activo: true },
    { id: 9, nombre: 'Terminal de Pasajeros de Maracaibo', direccion: 'Av. 17 Los Haticos (Módulo PC)', tipo: 'Alcaldía', horario: '8:00 - 18:00', activo: true },
    { id: 10, nombre: 'Palacio Municipal', direccion: 'Av. 4 Bella Vista con calle 96', tipo: 'Alcaldía', horario: '8:00 - 18:00', activo: true },
    { id: 11, nombre: 'Centro Francisco E. Bustamante', direccion: 'Calle 95V, carretera vía Los Bucares', tipo: 'Público', horario: '8:00 - 18:00', activo: true },
    { id: 12, nombre: 'Centro Deportivo Patria Joven', direccion: 'Av. 92 y 94, entre calles 79 G y 79 H', tipo: 'Público', horario: '8:00 - 18:00', activo: true },
    { id: 13, nombre: 'Plaza Canta Claro', direccion: 'Urbanización Canta Claro, calles 51 y 52', tipo: 'Público', horario: '8:00 - 18:00', activo: true },
    { id: 14, nombre: 'Plaza Para Todos', direccion: 'Av. 16 Guajira, Circunvalación 2', tipo: 'Público', horario: '8:00 - 18:00', activo: true },
    { id: 15, nombre: 'SEDEGAS', direccion: 'Av. 3E, entre calles 72 y 73', tipo: 'Gobierno Regional', horario: '8:00 - 18:00', activo: true },
    { id: 16, nombre: 'SEDEMAT / CPU', direccion: 'Av. 3F con calle 81, Sector Valle Frío', tipo: 'Gobierno Regional', horario: '8:00 - 18:00', activo: true },
    { id: 17, nombre: 'Corpozulia', direccion: 'Sede Principal, Maracaibo', tipo: 'Gobierno Regional', horario: '8:00 - 18:00', activo: true },
    { id: 18, nombre: 'Basílica Ntra. Sra. del Rosario de Chiquinquirá', direccion: 'Centro de Maracaibo', tipo: 'Iglesia', horario: '8:00 - 18:00', activo: true },
    { id: 19, nombre: 'Bomberos — Estación 1', direccion: 'Distribuido Zulia', tipo: 'Bomberos', horario: '24 horas', activo: true },
    { id: 20, nombre: 'Bomberos — Estación 2', direccion: 'Distribuido Zulia', tipo: 'Bomberos', horario: '24 horas', activo: true },
    { id: 21, nombre: 'Bomberos — Estación 3', direccion: 'Distribuido Zulia', tipo: 'Bomberos', horario: '24 horas', activo: true },
    { id: 22, nombre: 'Bomberos — Estación 4', direccion: 'Distribuido Zulia', tipo: 'Bomberos', horario: '24 horas', activo: true },
    { id: 23, nombre: 'Bomberos — Estación 5', direccion: 'Distribuido Zulia', tipo: 'Bomberos', horario: '24 horas', activo: true },
    { id: 24, nombre: 'Bomberos — Estación 6', direccion: 'Distribuido Zulia', tipo: 'Bomberos', horario: '24 horas', activo: true },
    { id: 25, nombre: 'Bomberos — Estación 7', direccion: 'Distribuido Zulia', tipo: 'Bomberos', horario: '24 horas', activo: true },
    { id: 26, nombre: 'Bomberos — Estación 8', direccion: 'Distribuido Zulia', tipo: 'Bomberos', horario: '24 horas', activo: true },
    { id: 27, nombre: 'Bomberos — Estación 9', direccion: 'Distribuido Zulia', tipo: 'Bomberos', horario: '24 horas', activo: true },
    { id: 28, nombre: 'Bomberos — Estación 10', direccion: 'Distribuido Zulia', tipo: 'Bomberos', horario: '24 horas', activo: true },
  ];

  get centrosFiltrados() {
    return () =>
      this.filtroTipo
        ? this.centros.filter((c) => c.tipo === this.filtroTipo)
        : this.centros;
  }
}
