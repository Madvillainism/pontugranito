import { Component, OnInit, inject } from '@angular/core';
import { SupabaseService } from '../../../core/services/supabase.service';
import { VoluntarioCardComponent } from '../voluntario-card/voluntario-card.component';

@Component({
  selector: 'app-voluntarios-page',
  standalone: true,
  imports: [VoluntarioCardComponent],
  template: `
    <section class="min-h-screen bg-neutral-950 px-4 py-8 sm:px-6 lg:px-8">
      <header class="max-w-7xl mx-auto mb-8">
        <h1
          class="text-2xl sm:text-3xl font-bold text-venezuela-blue border-b-2 border-venezuela-yellow pb-3 inline-block"
        >
          Voluntarios Disponibles
        </h1>
        <p class="text-neutral-400 mt-2 text-sm sm:text-base">
          Profesionales y voluntarios listos para ayudar
        </p>
      </header>

      @if (supabaseService.loading()) {
        <div class="flex justify-center py-20">
          <div
            class="w-10 h-10 border-4 border-neutral-800 border-t-venezuela-yellow rounded-full animate-spin"
          ></div>
        </div>
      } @else if (supabaseService.error()) {
        <div
          class="max-w-md mx-auto bg-venezuela-red/10 border border-venezuela-red/30 rounded-xl p-6 text-center"
        >
          <p class="text-venezuela-red font-medium">Error al cargar voluntarios</p>
          <p class="text-neutral-400 text-sm mt-1">{{ supabaseService.error() }}</p>
          <button
            (click)="reintentar()"
            class="mt-4 px-4 py-2 bg-venezuela-red text-white rounded-lg text-sm hover:bg-red-700"
          >
            Reintentar
          </button>
        </div>
      } @else {
        <div
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto"
        >
          @for (vol of supabaseService.voluntarios(); track vol.id) {
            <app-voluntario-card [voluntario]="vol" />
          } @empty {
            <div class="col-span-full text-center py-20 text-neutral-500">
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
