import { Component, OnInit, inject } from '@angular/core';
import { SupabaseService } from '../../../core/services/supabase.service';
import { VoluntarioCardComponent } from '../voluntario-card/voluntario-card.component';
import { BadgeComponent } from "../../../components/shared/badge.component";
import { BotonComponent } from "../../../components/shared/boton.component";

@Component({
  selector: 'app-voluntarios-page',
  standalone: true,
  imports: [VoluntarioCardComponent, BadgeComponent, BotonComponent],
  template: `
    <section class="min-h-screen bg-neutral-950 px-4 py-8 sm:px-6 lg:px-8">
      <section class="mb-10 space-y-3">
        <div class="flex items-center">
          <app-badge color="azul" variante="redondeado">
            <span class="material-symbols-outlined !text-[12px]" style="font-variation-settings: 'FILL' 1;">verified</span>
            Red de Apoyo
          </app-badge>
        </div>
        
        <h2 class="font-headline-md text-headline-md text-[var(--primary)] md:text-display-lg font-bold">
          Voluntarios Disponibles
        </h2>
        <p class="font-body-lg text-body-lg text-[var(--on-surface-variant)] max-w-2xl">
          Profesionales y voluntarios certificados listos para brindar apoyo humanitario inmediato en todo el territorio.
        </p>
      </section>

      <div class="mb-8 flex flex-col md:flex-row gap-4 items-center bg-surface-container-low p-4 rounded-xl border border-outline-variant">
        
        <div class="relative w-full md:flex-1">
          <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[var(--on-surface-variant)]">
            search
          </span>
          <input 
            class="w-full bg-[var(--surface-dim)] border border-[var(--outline-variant)] text-[var(--on-surface)] pl-10 pr-4 py-3 rounded-lg focus:ring-1 focus:ring-[var(--primary)] focus:border-[var(--primary)] outline-none transition-all font-body-md text-body-md" 
            placeholder="Buscar por nombre o especialidad..." 
            type="text"
          />
        </div>
        
        <div class="flex gap-2 w-full md:w-auto">
          
          <app-boton color="blanco" class="flex-1 md:flex-none">
            <span class="material-symbols-outlined">filter_list</span>
            Filtrar
          </app-boton>

          <app-boton color="azul" class="flex-1 md:flex-none">
            <span class="material-symbols-outlined">map</span>
            Ver Mapa
          </app-boton>
          
        </div>
      </div>

      @if (supabaseService.loading()) {
        <div class="flex justify-center py-20">
          <div
            class="w-10 h-10 border-4 border-neutral-700 border-t-venezuela-yellow rounded-full animate-spin"
          ></div>
        </div>
      } @else if (supabaseService.error()) {
        <div
          class="max-w-md mx-auto bg-venezuela-red/10 border border-venezuela-red/40 rounded-xl p-6 text-center"
        >
          <p class="text-venezuela-red font-medium">Error al cargar voluntarios</p>
          <p class="text-neutral-300 text-sm mt-1">{{ supabaseService.error() }}</p>
          <button
            (click)="reintentar()"
            class="mt-4 px-4 py-2 bg-venezuela-red text-white rounded-lg text-sm hover:bg-red-700"
          >
            Reintentar
          </button>
        </div>
      } @else {
        <div
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-[1600px] mx-auto"
        >
          <div class="border-2 border-dashed border-[var(--outline-variant)] rounded-2xl flex flex-col items-center justify-center p-8 text-center group cursor-pointer hover:border-[var(--primary)]/50 transition-colors bg-[var(--surface-container-low)]">
    
            <div class="w-16 h-16 rounded-full bg-[var(--surface-container-highest)] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <span class="material-symbols-outlined text-3xl text-[var(--on-surface-variant)] group-hover:text-[var(--primary)] transition-colors">
                add
              </span>
            </div>
            
            <h3 class="font-headline-sm text-headline-sm text-[var(--on-surface-variant)] group-hover:text-[var(--primary)] transition-colors">
              ¿Quieres ayudar?
            </h3>
            
            <p class="font-body-md text-body-md text-[var(--on-surface-variant)] opacity-70 mt-2">
              Únete a nuestra red de voluntarios y profesionales.
            </p>
            
            <button class="mt-6 font-label-md text-label-md text-[var(--primary)] font-bold uppercase tracking-wider underline underline-offset-4 hover:text-[var(--primary-fixed-dim)] transition-colors">
              Registrarte aquí
            </button>
            
          </div>
          @for (vol of supabaseService.voluntarios(); track vol.id) {
            <app-voluntario-card [voluntario]="vol" />
          } @empty {
            <div class="col-span-full text-center py-20 text-neutral-400">
              <p class="text-lg">No hay voluntarios registrados aún</p>
            </div>
          }
        </div>
      }
    </section>
  `,
})
export class VoluntariosPageComponent implements OnInit {
  protected supabaseService = inject(SupabaseService);

  ngOnInit(): void {
    this.supabaseService.getVoluntariosDisponibles();
  }

  reintentar(): void {
    this.supabaseService.getVoluntariosDisponibles();
  }
}
