import { Component, Input } from '@angular/core';
import { Voluntario } from '../../../core/models/voluntario';

@Component({
  selector: 'app-voluntario-card',
  standalone: true,
  imports: [],
  template: `
    <article
      class="bg-neutral-800 border border-neutral-700 rounded-xl p-5 flex flex-col gap-3 transition hover:border-venezuela-yellow/50"
    >
      <div class="flex items-start justify-between">
        <h3 class="text-neutral-100 font-semibold text-lg leading-tight">
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
            class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-700 text-neutral-300"
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
          class="px-2.5 py-1 rounded-md bg-neutral-700 text-neutral-200 text-xs"
        >
          {{ voluntario.zona }}, {{ voluntario.estado }}
        </span>
      </div>

      <div class="flex flex-col gap-2 mt-auto">
        <a
          [href]="'tel:' + voluntario.contacto"
          class="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-lg bg-venezuela-red text-white font-medium text-sm transition hover:bg-red-700 active:scale-[0.98]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          {{ voluntario.contacto }}
        </a>

        <div class="flex gap-2">
          <button
            (click)="compartirWhatsApp()"
            class="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-green-600 text-white text-xs font-medium hover:bg-green-700 transition"
          >
            <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            WhatsApp
          </button>
          <button
            (click)="compartirGeneral()"
            class="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-venezuela-blue text-white text-xs font-medium hover:bg-blue-800 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            Compartir
          </button>
        </div>
      </div>
    </article>
  `,
})
export class VoluntarioCardComponent {
  @Input({ required: true }) voluntario!: Voluntario;

  private get textoCompartir(): string {
    const v = this.voluntario;
    const estado = v.disponibilidad ? 'Disponible' : 'No disponible';
    return `🆘 ${v.nombre} - ${v.especialidad}\n📍 ${v.zona}, ${v.estado}\n📞 ${v.contacto}\n${estado}\n\nVisto en Pontugranito`;
  }

  compartirWhatsApp(): void {
    const url = `https://wa.me/?text=${encodeURIComponent(this.textoCompartir)}`;
    window.open(url, '_blank');
  }

  compartirGeneral(): void {
    if (navigator.share) {
      navigator.share({
        title: `${this.voluntario.nombre} - Pontugranito`,
        text: this.textoCompartir,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(this.textoCompartir).then(() => {
        alert('Información copiada al portapapeles');
      });
    }
  }
}
