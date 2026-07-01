import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Refugio } from '../../../core/models/refugio';
import { BadgeComponent, BadgeColorVariant } from '../../../components/shared/badge.component';

/**
 * RefugiosPageComponent
 *
 * Página de visualización y filtrado avanzado de Refugios Temporales.
 * Permite filtrar por Estado, Ciudad, Municipio y Parroquia de forma jerárquica.
 * Al hacer clic en un refugio, se abre un modal con el detalle completo del mismo,
 * incluyendo foto si tiene una registrada, y enlace a Google Maps.
 */
@Component({
  selector: 'app-refugios-page',
  standalone: true,
  imports: [BadgeComponent, RouterLink],
  styles: [`
    /* Tamaños de texto configurables en un solo lugar */
    .txt-micro { font-size: 13px; line-height: 1.4; }
    .txt-tiny  { font-size: 15px; line-height: 1.5; }
    .txt-small { font-size: 15px; line-height: 1.5; }
    .txt-medium { font-size: 16px; line-height: 1.5; }

    .icon-small { font-size: 14px; }
    .icon-base { font-size: 16px; }
    .icon-medium { font-size: 18px; }
    .icon-large { font-size: 20px; }
    .icon-xl { font-size: 24px; }

    .glass-card {
      background: rgba(30, 30, 35, 0.85);
      backdrop-filter: blur(8px);
      border: 1px solid rgba(255, 255, 255, 0.06);
      transition: border-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease;
    }
    .glass-card:hover {
      border-color: rgba(250, 189, 0, 0.25);
      transform: translateY(-2px);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
    }
    .status-dot-active {
      box-shadow: 0 0 8px rgba(74, 222, 128, 0.6);
    }
    .status-dot-full {
      box-shadow: 0 0 8px rgba(239, 68, 68, 0.6);
    }
    .filter-select {
      background: rgba(30, 30, 35, 0.7);
      border: 1px solid var(--outline-variant);
      transition: all 0.25s ease;
    }
    .filter-select:focus:not(:disabled) {
      border-color: var(--primary-fixed);
      box-shadow: 0 0 0 1px var(--primary-fixed);
    }
    .filter-select:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
  `],
  template: `
    <section class="min-h-screen bg-background px-margin-mobile md:px-margin-desktop py-8 animate-fadeIn">
      
      <!-- Header -->
      <header class="max-w-container-max-width mx-auto mb-8">
        <div class="mb-4">
          <a routerLink="/" class="inline-flex items-center gap-1.5 text-primary-fixed-dim hover:text-primary transition-colors text-base font-mono">
            <span class="material-symbols-outlined icon-medium">arrow_back</span>
            Volver al Inicio
          </a>
        </div>
        
        <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-2">
          <div>
            <h1 class="font-manrope text-[32px] md:text-[36px] font-semibold leading-tight text-primary-fixed">
              Refugios Temporales
              <span class="text-on-surface-variant opacity-50"> — </span>Nacional
            </h1>
          </div>
          
          <button routerLink="/admin/login" class="inline-flex items-center gap-2 px-4 py-2 bg-surface-container-high text-primary border border-outline-variant hover:border-primary/30 hover:bg-surface-container-highest rounded-xl font-mono text-sm uppercase tracking-wider shrink-0 transition-all active:scale-95 shadow-lg">
            <span class="material-symbols-outlined icon-large">admin_panel_settings</span>
            Administrar Refugios 
          </button>
        </div>

        <p class="text-on-surface-variant font-sans text-lg max-w-2xl leading-relaxed">
          Consulta los albergues y centros de resguardo habilitados. Haz clic en cualquier tarjeta para ver el detalle, imágenes y mapa.
        </p>
      </header>

      <!-- Panel de Filtros Jerárquicos -->
      <div class="max-w-container-max-width mx-auto mb-8 bg-surface-container/30 border border-outline-variant/60 rounded-2xl p-6">
        <div class="flex items-center gap-2 mb-4">
          <span class="material-symbols-outlined text-primary-fixed-dim icon-large">filter_list</span>
          <h2 class="text-sm font-mono text-on-surface-variant uppercase tracking-wider">Filtros Geográficos de Ubicación:</h2>
        </div>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <!-- 1. Estado -->
          <div class="flex flex-col gap-1.5">
            <label class="txt-tiny text-on-surface-variant font-mono uppercase tracking-wider">Estado</label>
            <select 
              (change)="onEstadoChange($event)"
              [value]="filtroEstado()"
              class="filter-select w-full rounded-xl px-3 py-2 text-base text-on-surface focus:outline-none cursor-pointer"
            >
              <option value="">Todos los Estados</option>
              @for (est of uniqueEstados(); track est) {
                <option [value]="est">{{ est }}</option>
              }
            </select>
          </div>

          <!-- 2. Ciudad -->
          <div class="flex flex-col gap-1.5">
            <label class="txt-tiny text-on-surface-variant font-mono uppercase tracking-wider">Ciudad</label>
            <select 
              (change)="onCiudadChange($event)"
              [value]="filtroCiudad()"
              [disabled]="!filtroEstado()"
              class="filter-select w-full rounded-xl px-3 py-2 text-base text-on-surface focus:outline-none cursor-pointer"
            >
              <option value="">Todas las Ciudades</option>
              @for (ciu of uniqueCiudades(); track ciu) {
                <option [value]="ciu">{{ ciu }}</option>
              }
            </select>
          </div>

          <!-- 3. Municipio -->
          <div class="flex flex-col gap-1.5">
            <label class="txt-tiny text-on-surface-variant font-mono uppercase tracking-wider">Municipio</label>
            <select 
              (change)="onMunicipioChange($event)"
              [value]="filtroMunicipio()"
              [disabled]="!filtroCiudad()"
              class="filter-select w-full rounded-xl px-3 py-2 text-base text-on-surface focus:outline-none cursor-pointer"
            >
              <option value="">Todos los Municipios</option>
              @for (mun of uniqueMunicipios(); track mun) {
                <option [value]="mun">{{ mun }}</option>
              }
            </select>
          </div>

          <!-- 4. Parroquia -->
          <div class="flex flex-col gap-1.5">
            <label class="txt-tiny text-on-surface-variant font-mono uppercase tracking-wider">Parroquia</label>
            <select 
              (change)="onParroquiaChange($event)"
              [value]="filtroParroquia()"
              [disabled]="!filtroMunicipio()"
              class="filter-select w-full rounded-xl px-3 py-2 text-base text-on-surface focus:outline-none cursor-pointer"
            >
              <option value="">Todas las Parroquias</option>
              @for (parr of uniqueParroquias(); track parr) {
                <option [value]="parr">{{ parr }}</option>
              }
            </select>
          </div>
        </div>
        
        <!-- Reset Filters indicator if active -->
        @if (filtroEstado() || filtroCiudad() || filtroMunicipio() || filtroParroquia()) {
          <div class="mt-4 flex justify-end">
            <button 
              (click)="resetFilters()" 
              class="inline-flex items-center gap-1 txt-small font-mono text-primary-fixed-dim hover:text-primary transition-colors uppercase tracking-wider"
            >
              <span class="material-symbols-outlined icon-base">restart_alt</span>
              Limpiar filtros
            </button>
          </div>
        }
      </div>

      <!-- Grid de Refugios -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-container-max-width mx-auto">
        @for (refugio of refugiosFiltrados(); track refugio.id) {
          <article 
            (click)="selectedRefugio.set(refugio)"
            class="glass-card rounded-xl p-5 flex flex-col justify-between group cursor-pointer"
          >
            <div>
              <!-- Cabecera de la Tarjeta con Badges -->
              <div class="flex justify-between items-start mb-4">
                <app-badge
                  [color]="ubicacionColor(refugio.estado)"
                  variante="cuadrado"
                  tipo="outline"
                >
                  {{ refugio.estado }}
                </app-badge>
                <div class="flex items-center gap-1.5 text-on-surface-variant opacity-60">
                  <span class="txt-tiny font-mono uppercase tracking-wider">{{ refugio.parroquia }}</span>
                </div>
              </div>

              <!-- Nombre del Refugio -->
              <h3 class="font-manrope text-[24px] font-semibold leading-snug text-primary group-hover:text-primary-fixed transition-colors duration-200 mb-2">
                {{ refugio.nombre }}
              </h3>

              <!-- Ubicación textual / Dirección -->
              <p class="text-on-surface-variant font-sans text-base leading-relaxed mb-4 flex items-start gap-1.5">
                <span class="material-symbols-outlined text-base shrink-0 mt-0.5 icon-medium">location_on</span>
                <span>{{ refugio.direccion }}</span>
              </p>
            </div>

            <!-- Footer Tarjeta -->
            <div class="border-t border-outline-variant pt-4 flex flex-col gap-3">
              <div class="flex justify-between items-center text-sm">
                <!-- Capacidad -->
                <div class="flex flex-col gap-0.5">
                  <span class="txt-micro text-on-surface-variant font-mono uppercase tracking-widest">Capacidad</span>
                  <span class="text-on-surface font-mono font-medium">{{ refugio.capacidad }}</span>
                </div>
                
                <!-- Estado de Disponibilidad -->
                @if (refugio.activo) {
                  <div class="flex items-center gap-1">
                    <span class="w-2.5 h-2.5 bg-green-400 rounded-full status-dot-active animate-pulse"></span>
                    <span class="text-green-400 font-mono font-bold uppercase tracking-widest txt-micro">Disponible</span>
                  </div>
                } @else {
                  <div class="flex items-center gap-1">
                    <span class="w-2.5 h-2.5 bg-red-400 rounded-full status-dot-full"></span>
                    <span class="text-red-400 font-mono font-bold uppercase tracking-widest txt-micro">Lleno</span>
                  </div>
                }
              </div>
              
              <!-- Ver Detalles Trigger Callout -->
              <div class="txt-small text-primary-fixed-dim font-mono flex items-center justify-end gap-1 opacity-70 group-hover:opacity-100 transition-opacity">
                <span>Ver detalles</span>
                <span class="material-symbols-outlined icon-small group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
              </div>
            </div>
          </article>
        } @empty {
          <div class="col-span-full text-center py-20 bg-surface-container/20 rounded-2xl border border-dashed border-outline-variant">
            <span class="material-symbols-outlined text-6xl text-on-surface-variant mb-3 block">shelter</span>
            <p class="text-on-surface-variant font-sans text-lg">No se encontraron refugios con los filtros seleccionados.</p>
          </div>
        }
      </div>

      <!-- Modal de Detalle Completo -->
      @if (selectedRefugio(); as refugio) {
        <div 
          (click)="selectedRefugio.set(null)"
          class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn"
        >
          <div 
            (click)="$event.stopPropagation()"
            class="relative w-full max-w-lg overflow-y-auto max-h-[90vh] bg-surface-container rounded-2xl p-6 border border-outline-variant shadow-2xl transition-all duration-300 scale-100 flex flex-col"
          >
            <!-- Botón Cerrar Modal -->
            <button 
              (click)="selectedRefugio.set(null)" 
              class="absolute top-4 right-4 text-on-surface-variant hover:text-on-surface p-1.5 rounded-full hover:bg-white/10 transition-colors z-20"
            >
              <span class="material-symbols-outlined icon-xl">close</span>
            </button>

            <!-- Foto (Opcional) -->
            @if (refugio.foto) {
              <div class="w-full h-52 rounded-xl overflow-hidden mb-5 shrink-0 relative border border-white/5">
                <img 
                  [src]="refugio.foto" 
                  [alt]="refugio.nombre" 
                  class="w-full h-full object-cover"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              </div>
            } @else {
              <!-- Fallback visual si no tiene foto -->
              <div class="w-full h-24 rounded-xl bg-surface-container-high border border-outline-variant flex items-center justify-center mb-5 shrink-0">
                <span class="material-symbols-outlined text-5xl text-on-surface-variant/40">image_not_supported</span>
              </div>
            }

            <!-- Nombre -->
            <h2 class="font-manrope text-3xl font-bold text-primary mb-2 leading-tight">
              {{ refugio.nombre }}
            </h2>

            <!-- Fila de Ubicación Jerárquica -->
            <div class="grid grid-cols-2 gap-3 mb-5 bg-surface-container-high/60 p-4 rounded-xl border border-outline-variant/40 text-sm font-mono">
              <div>
                <span class="text-on-surface-variant block uppercase tracking-wider txt-micro mb-0.5">Estado</span>
                <span class="text-on-surface font-semibold text-base">{{ refugio.estado }}</span>
              </div>
              <div>
                <span class="text-on-surface-variant block uppercase tracking-wider txt-micro mb-0.5">Ciudad</span>
                <span class="text-on-surface font-semibold text-base">{{ refugio.ciudad }}</span>
              </div>
              <div>
                <span class="text-on-surface-variant block uppercase tracking-wider txt-micro mb-0.5">Municipio</span>
                <span class="text-on-surface font-semibold text-base">{{ refugio.municipio }}</span>
              </div>
              <div>
                <span class="text-on-surface-variant block uppercase tracking-wider txt-micro mb-0.5">Parroquia</span>
                <span class="text-on-surface font-semibold text-base">{{ refugio.parroquia }}</span>
              </div>
            </div>

            <!-- Dirección textual completa y Referencia -->
            <div class="mb-5">
              <span class="txt-tiny text-on-surface-variant font-mono uppercase tracking-widest block mb-1">Dirección Exacta</span>
              <p class="text-on-surface text-base leading-relaxed">{{ refugio.direccion }}</p>
              @if (refugio.referencia) {
                <p class="text-on-surface-variant/80 font-mono text-sm mt-3 flex items-center gap-1.5 p-2 bg-surface-container-high rounded-lg border border-outline-variant/50">
                  <span class="material-symbols-outlined icon-medium text-primary-fixed-dim">info</span>
                  Ref: {{ refugio.referencia }}
                </p>
              }
            </div>

            <!-- Botones de Acción (Maps y WhatsApp) -->
            <div class="mb-6 flex flex-wrap gap-3">
              <a 
                [href]="refugio.googleMapsUrl" 
                target="_blank" 
                class="inline-flex items-center gap-1.5 px-4 py-2.5 bg-primary text-on-primary rounded-xl text-sm font-bold hover:brightness-110 active:scale-95 transition-all shadow-md flex-1 md:flex-none justify-center"
              >
                <span class="material-symbols-outlined icon-large">map</span>
                Abrir en Maps
              </a>
              
              <a 
                [href]="getWhatsAppLink(refugio.contacto, refugio.nombre)" 
                target="_blank" 
                class="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#25D366] text-white rounded-xl text-sm font-bold hover:brightness-110 active:scale-95 transition-all shadow-md flex-1 md:flex-none justify-center"
              >
                <span class="material-symbols-outlined icon-large">chat</span>
               WhatsApp
              </a>
            </div>

            <!-- Detalles extra (Capacidad, Contacto y Estado) -->
            <div class="border-t border-outline-variant pt-4 shrink-0 flex flex-col gap-3">
              <div class="flex justify-between items-center text-base">
                <div class="flex flex-col">
                  <span class="txt-tiny text-on-surface-variant font-mono uppercase tracking-widest">Capacidad Máxima</span>
                  <span class="text-on-surface font-mono font-medium">{{ refugio.capacidad }}</span>
                </div>
                
                <div class="flex flex-col items-end">
                  <span class="txt-tiny text-on-surface-variant font-mono uppercase tracking-widest mb-1">Contacto Directo</span>
                  <a 
                    [href]="getTelLink(refugio.contacto)"
                    class="inline-flex items-center gap-1.5 text-primary hover:text-primary-fixed-dim bg-primary/10 px-2.5 py-1 rounded-lg font-mono font-bold transition-colors"
                  >
                    <span class="material-symbols-outlined icon-small">call</span>
                    {{ refugio.contacto }}
                  </a>
                </div>
              </div>

              <!-- Estado de Disponibilidad -->
              <div class="flex justify-between items-center pt-2">
                <span class="txt-tiny text-on-surface-variant font-mono uppercase tracking-widest">Estado</span>
                @if (refugio.activo) {
                  <div class="flex items-center gap-1.5">
                    <span class="w-3 h-3 bg-green-400 rounded-full status-dot-active animate-pulse"></span>
                    <span class="text-green-400 font-mono font-bold uppercase tracking-widest txt-small">Disponible para Ingreso</span>
                  </div>
                } @else {
                  <div class="flex items-center gap-1.5">
                    <span class="w-3 h-3 bg-red-400 rounded-full status-dot-full"></span>
                    <span class="text-red-400 font-mono font-bold uppercase tracking-widest txt-small">Lleno / Sin Plazas</span>
                  </div>
                }
              </div>
            </div>

          </div>
        </div>
      }

    </section>
  `,
})
export class RefugiosPageComponent {
  // Estados de los filtros
  filtroEstado = signal<string>('');
  filtroCiudad = signal<string>('');
  filtroMunicipio = signal<string>('');
  filtroParroquia = signal<string>('');

  // Refugio seleccionado para el modal
  selectedRefugio = signal<Refugio | null>(null);

  // Lista de 3 refugios de ejemplo (con una 4ta sin foto para ilustrar el caso opcional)
  refugios: Refugio[] = [
    {
      id: 1,
      nombre: 'Gimnasio Belisario Aponte',
      direccion: 'Complejo Deportivo Polideportivo, Av. Universidad con Prolongación de la Circunvalación 2',
      googleMapsUrl: 'https://maps.google.com/?q=Gimnasio+Belisario+Aponte+Maracaibo',
      referencia: 'Detrás de la Plaza de Toros de Maracaibo',
      estado: 'Zulia',
      ciudad: 'Maracaibo',
      municipio: 'Maracaibo',
      parroquia: 'Juana de Ávila',
      capacidad: '200 personas',
      contacto: '0414-6123456', // Formato móvil para WhatsApp test
      activo: true,
      foto: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=80',
    },
    {
      id: 2,
      nombre: 'Liceo Udón Pérez',
      direccion: 'Sector Primero de Mayo, Calle 85 con Av. 24',
      googleMapsUrl: 'https://maps.google.com/?q=Liceo+Udon+Perez+Maracaibo',
      referencia: 'Frente a la sede del Cuartel de Bomberos',
      estado: 'Zulia',
      ciudad: 'Maracaibo',
      municipio: 'Maracaibo',
      parroquia: 'Chiquinquirá',
      capacidad: '100 personas',
      contacto: '0424-6987654',
      activo: true,
      foto: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&auto=format&fit=crop&q=80',
    },
    {
      id: 3,
      nombre: 'Polideportivo Las Delicias',
      direccion: 'Av. Las Delicias, frente al Centro Comercial Las Delicias, Maracay',
      googleMapsUrl: 'https://maps.google.com/?q=Polideportivo+Las+Delicias+Maracay',
      referencia: 'A 200 metros del C.C. Paseo Las Delicias II',
      estado: 'Aragua',
      ciudad: 'Maracay',
      municipio: 'Girardot',
      parroquia: 'Las Delicias',
      capacidad: '150 personas',
      contacto: '0412-4235566',
      activo: false,
      foto: 'https://images.unsplash.com/photo-1595079676339-1534801ad6cf?w=800&auto=format&fit=crop&q=80',
    },
    {
      id: 4,
      nombre: 'Cancha de Usos Múltiples San Jacinto',
      direccion: 'Urbanización San Jacinto, Sector 2, Maracaibo',
      googleMapsUrl: 'https://maps.google.com/?q=Cancha+San+Jacinto+Maracaibo',
      referencia: 'A un lado del Colegio Panamericano',
      estado: 'Zulia',
      ciudad: 'Maracaibo',
      municipio: 'Maracaibo',
      parroquia: 'Juana de Ávila',
      capacidad: '80 personas',
      contacto: '0414-0001000',
      activo: true, // foto no obligatoria
    }
  ];

  // Listas de opciones de filtros únicos, cacheados y computados reactivamente
  uniqueEstados = computed(() => {
    return Array.from(new Set(this.refugios.map((r) => r.estado))).sort();
  });

  uniqueCiudades = computed(() => {
    const estado = this.filtroEstado();
    if (!estado) return [];
    return Array.from(
      new Set(
        this.refugios
          .filter((r) => r.estado === estado)
          .map((r) => r.ciudad)
      )
    ).sort();
  });

  uniqueMunicipios = computed(() => {
    const estado = this.filtroEstado();
    const ciudad = this.filtroCiudad();
    if (!estado || !ciudad) return [];
    return Array.from(
      new Set(
        this.refugios
          .filter((r) => r.estado === estado && r.ciudad === ciudad)
          .map((r) => r.municipio)
      )
    ).sort();
  });

  uniqueParroquias = computed(() => {
    const estado = this.filtroEstado();
    const ciudad = this.filtroCiudad();
    const municipio = this.filtroMunicipio();
    if (!estado || !ciudad || !municipio) return [];
    return Array.from(
      new Set(
        this.refugios
          .filter(
            (r) =>
              r.estado === estado &&
              r.ciudad === ciudad &&
              r.municipio === municipio
          )
          .map((r) => r.parroquia)
      )
    ).sort();
  });

  // Lista de refugios filtrados según los estados reactivos
  refugiosFiltrados = computed(() => {
    const estado = this.filtroEstado();
    const ciudad = this.filtroCiudad();
    const municipio = this.filtroMunicipio();
    const parroquia = this.filtroParroquia();

    return this.refugios.filter((r) => {
      const matchEstado = !estado || r.estado === estado;
      const matchCiudad = !ciudad || r.ciudad === ciudad;
      const matchMunicipio = !municipio || r.municipio === municipio;
      const matchParroquia = !parroquia || r.parroquia === parroquia;
      return matchEstado && matchCiudad && matchMunicipio && matchParroquia;
    });
  });

  // Controladores de eventos de cambio de select para reajustar los filtros hijos
  onEstadoChange(event: Event): void {
    const val = (event.target as HTMLSelectElement).value;
    this.filtroEstado.set(val);
    this.filtroCiudad.set('');
    this.filtroMunicipio.set('');
    this.filtroParroquia.set('');
  }

  onCiudadChange(event: Event): void {
    const val = (event.target as HTMLSelectElement).value;
    this.filtroCiudad.set(val);
    this.filtroMunicipio.set('');
    this.filtroParroquia.set('');
  }

  onMunicipioChange(event: Event): void {
    const val = (event.target as HTMLSelectElement).value;
    this.filtroMunicipio.set(val);
    this.filtroParroquia.set('');
  }

  onParroquiaChange(event: Event): void {
    const val = (event.target as HTMLSelectElement).value;
    this.filtroParroquia.set(val);
  }

  resetFilters(): void {
    this.filtroEstado.set('');
    this.filtroCiudad.set('');
    this.filtroMunicipio.set('');
    this.filtroParroquia.set('');
  }

  // Colores para el estado
  ubicacionColor(estado: string): BadgeColorVariant {
    const colores: Record<string, BadgeColorVariant> = {
      Zulia: 'azul',
      Aragua: 'rojo',
    };
    return colores[estado] ?? 'gris';
  }

  // Genera un link 'tel:' limpiando espacios, guiones, pero dejando el '+' si lo hay
  getTelLink(telefono: string): string {
    const limpio = telefono.replace(/[^\d+]/g, '');
    return `tel:${limpio}`;
  }

  // Genera el link directo a WhatsApp limpiando el num y pasando un mensaje predeterminado
  getWhatsAppLink(telefono: string, nombre: string): string {
    // Reemplaza código local (0414) o similares asumiendo VZLA y quita guiones/espacios
    // Si empieza con 0, lo cambiamos a 58
    let limpio = telefono.replace(/\D/g, '');
    if (limpio.startsWith('0')) {
      limpio = '58' + limpio.substring(1);
    } else if (!limpio.startsWith('58')) {
      limpio = '58' + limpio; // asumiendo código de país faltante
    }

    const texto = encodeURIComponent(`Hola, quisiera solicitar información sobre la disponibilidad o ayudar en el refugio "${nombre}".`);
    return `https://wa.me/${limpio}?text=${texto}`;
  }
}
