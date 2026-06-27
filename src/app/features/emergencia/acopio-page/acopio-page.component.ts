import { Component } from '@angular/core';
import { CentroAcopio } from '../../../core/models/centro-acopio';
import { BadgeComponent, BadgeColorVariant } from '../../../components/shared/badge.component';

/**
 * AcopioPageComponent
 *
 * Página de listado de Centros de Acopio habilitados en Maracaibo.
 * Muestra un grid de tarjetas con información de cada centro, con
 * capacidad de filtrado por tipo de institución.
 *
 * Sigue el sistema de diseño definido en docs/design.md:
 * - Glass-card con backdrop-blur y bordes translúcidos
 * - Tipografía Manrope (headlines), Inter (body), JetBrains Mono (labels)
 * - Tokens de color semánticos del design system
 * - Layout mobile-first con CSS Grid fluido
 *
 * Componentes compartidos utilizados:
 * - BadgeComponent (src/app/components/shared/badge.component.ts)
 */
@Component({
  selector: 'app-acopio-page',
  standalone: true,
  imports: [BadgeComponent],
  styles: [`
    .glass-card {
      background: rgba(30, 30, 30, 0.85);
      backdrop-filter: blur(8px);
      border: 1px solid rgba(255, 255, 255, 0.06);
      transition: border-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease;
    }
    .glass-card:hover {
      border-color: rgba(250, 189, 0, 0.2);
      transform: translateY(-2px);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
    }
    .status-dot {
      box-shadow: 0 0 8px rgba(74, 222, 128, 0.6);
    }
    .filter-chip-active {
      background-color: var(--secondary-container);
      color: var(--secondary-fixed);
    }
    .filter-chip-inactive {
      background-color: var(--surface-container);
      border: 1px solid var(--outline-variant);
      color: var(--on-surface-variant);
    }
    .filter-chip-inactive:hover {
      border-color: var(--outline);
    }
  `],
  template: `
    <section class="min-h-screen bg-background px-margin-mobile md:px-margin-desktop py-8">

      <!-- Header -->
      <header class="max-w-container-max-width mx-auto mb-8">
        <h1 class="font-manrope text-[28px] md:text-[32px] font-semibold leading-tight text-primary-fixed mb-2">
          Centros de Acopio
          <span class="text-on-surface-variant opacity-50"> — </span>Maracaibo
        </h1>
        <p class="text-on-surface-variant font-sans text-base max-w-2xl leading-relaxed">
          {{ centros.length }} puntos habilitados para recibir donaciones de insumos médicos,
          alimentos no perecederos y agua potable. Priorice los centros con estado activo.
        </p>
      </header>

      <!-- Filtros -->
      <div class="max-w-container-max-width mx-auto mb-8 flex flex-wrap gap-2">
        <!-- Chip "Todos" -->
        <button
          (click)="filtroTipo = null"
          class="px-4 py-2 rounded-full font-mono text-sm tracking-wider transition-all"
          [class.filter-chip-active]="filtroTipo === null"
          [class.filter-chip-inactive]="filtroTipo !== null"
        >
          Todos
        </button>

        @for (tipo of tipos; track tipo) {
          <button
            (click)="filtroTipo = tipo === filtroTipo ? null : tipo"
            class="px-4 py-2 rounded-full font-mono text-sm tracking-wider transition-all"
            [class.filter-chip-active]="filtroTipo === tipo"
            [class.filter-chip-inactive]="filtroTipo !== tipo"
          >
            {{ tipo }}
          </button>
        }
      </div>

      <!-- Grid de tarjetas -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-container-max-width mx-auto">
        @for (centro of centrosFiltrados(); track centro.id) {
          <article class="glass-card rounded-xl p-5 flex flex-col justify-between group">

            <!-- Card top -->
            <div>
              <!-- Tipo badge + icono -->
              <div class="flex justify-between items-start mb-4">
                <app-badge
                  [color]="tipoColor(centro.tipo)"
                  variante="cuadrado"
                  tipo="outline"
                >
                  {{ centro.tipo }}
                </app-badge>
                <span
                  class="material-symbols-outlined text-on-surface-variant text-[18px] group-hover:text-primary-fixed-dim transition-colors duration-200"
                >
                  {{ tipoIcon(centro.tipo) }}
                </span>
              </div>

              <!-- Nombre -->
              <h3 class="font-manrope text-[20px] font-semibold leading-snug text-primary mb-2">
                {{ centro.nombre }}
              </h3>

              <!-- Dirección -->
              <p class="text-on-surface-variant font-sans text-sm leading-relaxed mb-4">
                {{ centro.direccion }}
              </p>
            </div>

            <!-- Card footer -->
            <div class="flex justify-between items-center border-t border-outline-variant pt-4">
              <!-- Horario -->
              <div class="flex flex-col gap-0.5">
                <span class="text-[10px] text-on-surface-variant font-mono uppercase tracking-widest">Horario</span>
                <span class="text-on-surface font-mono text-sm">{{ centro.horario }}</span>
              </div>

              <!-- Estado -->
              @if (centro.activo) {
                <div class="flex items-center gap-2">
                  <span class="w-2 h-2 bg-green-400 rounded-full status-dot"></span>
                  <span class="text-green-400 font-mono font-bold uppercase tracking-widest text-[11px]">Activo</span>
                </div>
              } @else {
                <span class="text-on-surface-variant font-mono text-[11px] uppercase tracking-widest">Por confirmar</span>
              }
            </div>

          </article>
        } @empty {
          <div class="col-span-full text-center py-20">
            <span class="material-symbols-outlined text-5xl text-on-surface-variant mb-4 block">search_off</span>
            <p class="text-on-surface-variant font-sans text-lg">No hay centros con ese filtro.</p>
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

  /** Mapea el tipo de institución al color semántico del BadgeComponent */
  tipoColor(tipo: string): BadgeColorVariant {
    const colores: Record<string, BadgeColorVariant> = {
      'Alcaldía': 'amarillo',
      'Bomberos': 'rojo',
      'Gobierno Regional': 'azul',
      'Iglesia': 'gris',
      'Público': 'gris',
    };
    return colores[tipo] ?? 'gris';
  }

  /** Devuelve el ícono de Material Symbols según el tipo de centro */
  tipoIcon(tipo: string): string {
    const icons: Record<string, string> = {
      'Alcaldía': 'near_me',
      'Bomberos': 'local_fire_department',
      'Gobierno Regional': 'account_balance',
      'Iglesia': 'church',
      'Público': 'diversity_3',
    };
    return icons[tipo] ?? 'location_on';
  }
}

