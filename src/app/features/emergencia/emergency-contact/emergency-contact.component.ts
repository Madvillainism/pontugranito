import { Component, OnInit, inject } from '@angular/core';
import { NgClass } from '@angular/common';
import { PersonasService } from '../../../core/services/personas.service';

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
          Personas en Emergencia
        </h1>
        <p class="text-neutral-300 mt-2 text-sm sm:text-base">
          Registro de personas desaparecidas, encontradas y fallecidas
        </p>
      </header>

      @if (personasService.loading()) {
        <div class="flex justify-center py-20">
          <div
            class="w-10 h-10 border-4 border-neutral-700 border-t-venezuela-yellow rounded-full animate-spin"
          ></div>
        </div>
      } @else if (personasService.error()) {
        <div class="max-w-md mx-auto text-center">
          <div
            class="bg-venezuela-red/10 border border-venezuela-red/40 rounded-xl p-6"
          >
            <p class="text-venezuela-red font-medium mb-1">
              Error al cargar datos
            </p>
            <p class="text-neutral-300 text-sm whitespace-pre-wrap">
              {{ personasService.error() }}
            </p>
            <button
              (click)="recargar()"
              class="mt-4 px-4 py-2 bg-venezuela-red text-white rounded-lg text-sm hover:bg-red-700 transition"
            >
              Reintentar
            </button>
          </div>
          <div
            class="mt-4 bg-neutral-800 border border-neutral-700 rounded-xl p-4 text-left text-xs text-neutral-400"
          >
            <p class="font-medium text-neutral-200 mb-2">
              SQL para crear la tabla:
            </p>
            <pre
              class="bg-neutral-950 rounded-lg p-3 text-neutral-300 leading-relaxed overflow-x-auto"
            >
CREATE TABLE personas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre text NOT NULL,
  cedula numeric NOT NULL,
  lugar text NOT NULL,
  desaparecido boolean DEFAULT false,
  fallecido boolean DEFAULT false,
  encontrado boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE personas ENABLE ROW LEVEL SECURITY;

CREATE POLICY "select_publico" ON personas
  FOR SELECT USING (true);

CREATE POLICY "insert_anonimo" ON personas
  FOR INSERT WITH CHECK (true);</pre
            >
          </div>
        </div>
      } @else {
        <div class="max-w-4xl mx-auto space-y-4">
          @for (persona of personasService.personas(); track persona.id) {
            <article
              class="bg-neutral-800 border border-neutral-700 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center gap-4"
            >
              <div class="flex-1">
                <div class="flex items-center gap-2 mb-1">
                  <span
                    class="text-xs font-medium px-2 py-0.5 rounded-full"
                    [ngClass]="{
                      'bg-green-700/30 text-green-400 border border-green-700/40':
                        persona.encontrado,
                      'bg-venezuela-yellow/20 text-venezuela-yellow border border-venezuela-yellow/30':
                        persona.desaparecido && !persona.encontrado,
                      'bg-venezuela-red/20 text-venezuela-red border border-venezuela-red/30':
                        persona.fallecido,
                    }"
                  >
                    @if (persona.encontrado) {
                      Encontrado
                    } @else if (persona.fallecido) {
                      Fallecido
                    } @else {
                      Desaparecido
                    }
                  </span>
                </div>
                <h3 class="text-neutral-100 font-semibold">
                  {{ persona.nombre }}
                </h3>
                <p class="text-neutral-300 text-sm mt-0.5">
                  Cédula: {{ persona.cedula }} · {{ persona.lugar }}
                </p>
              </div>

              <div class="flex flex-col gap-2 shrink-0">
                <a
                  [href]="
                    'https://wa.me/584160000000?text=' +
                    encodeURI('Información sobre ' + persona.nombre)
                  "
                  target="_blank"
                  class="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition"
                >
                  <svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path
                      d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
                    />
                  </svg>
                  Reportar vía WhatsApp
                </a>
              </div>
            </article>
          } @empty {
            <div class="text-center py-20 text-neutral-400">
              <p class="text-lg">No hay personas registradas</p>
              <p class="text-sm mt-1">La tabla está vacía o no existe</p>
            </div>
          }
        </div>
      }
    </section>
  `,
  styles: [
    `
      .card-elevation {
        border: 1px solid rgba(255, 255, 255, 0.05);
        background-color: #1e1e1e;
      }
    `,
  ],
})
export class EmergencyContactComponent implements OnInit {
  protected personasService = inject(PersonasService);

  ngOnInit(): void {
    this.personasService.getAllPersonas();
    this.personasService.getPersonasDesaparecidas().then(
      () =>
        console.log(
          'Personas desaparecidas cargadas',
          this.personasService.personas(),
        ),
      (error) => console.error('Error al cargar personas desaparecidas', error),
    );
  }

  recargar(): void {
    this.personasService.getAllPersonas();
  }

  encodeURI(texto: string): string {
    return encodeURIComponent(texto);
  }
}
