import { Component, Input } from '@angular/core';
import { Voluntario } from '../../../core/models/voluntario';

@Component({
  selector: 'app-voluntario-card',
  standalone: true,
  imports: [],
  template: `
    <article
      class="bg-neutral-900 border border-neutral-800 rounded-xl p-5 flex flex-col gap-3 transition hover:border-venezuela-yellow/40"
    >
      <div class="flex items-start justify-between">
        <h3 class="text-neutral-50 font-semibold text-lg leading-tight">
          {{ voluntario.nombre }}
        </h3>
        @if (voluntario.disponibilidad) {
          <span
            class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-venezuela-yellow text-neutral-950"
          >
            <span class="w-1.5 h-1.5 rounded-full bg-neutral-950"></span>
            Disponible
          </span>
        } @else {
          <span
            class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-800 text-neutral-400"
          >
            No disponible
          </span>
        }
      </div>

      <div class="flex flex-wrap gap-2 text-sm">
        <span
          class="px-2.5 py-1 rounded-md bg-venezuela-blue/20 text-venezuela-blue border border-venezuela-blue/30 text-xs font-medium"
        >
          {{ voluntario.especialidad }}
        </span>
        <span
          class="px-2.5 py-1 rounded-md bg-neutral-800 text-neutral-300 text-xs"
        >
          {{ voluntario.zona_especifica }}, {{ voluntario.estado }}
        </span>
      </div>

      <a
        [href]="'tel:' + voluntario.contacto"
        class="mt-auto inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-lg bg-venezuela-red text-white font-medium text-sm transition hover:bg-red-700 active:scale-[0.98]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          />
        </svg>
        {{ voluntario.contacto }}
      </a>
    </article>
  `,
})
export class VoluntarioCardComponent {
  @Input({ required: true }) voluntario!: Voluntario;
}
