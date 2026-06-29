import { Component, Input } from '@angular/core';
import { Voluntario } from '../../../core/models/voluntario';
import { BotonComponent } from "../../../components/shared/boton.component";
import { BadgeComponent } from "../../../components/shared/badge.component";

@Component({
  selector: 'app-voluntario-card',
  standalone: true,
  imports: [BotonComponent, BadgeComponent],
  template: `
  <div class="glass-card rounded-2xl overflow-hidden h-full w-full flex flex-col group transition-all duration-300 bg-surface-container-low hover:border-primary/20 hover:shadow-[0_0_20px_rgba(250,189,0,0.1)]">
    <div class="p-6 space-y-4 bg-surface-container-low">
      <div class="flex justify-between items-start gap-2">
        
        <div class="flex items-center gap-3 min-w-0 flex-1">
          <div class="w-12 h-12 rounded-full overflow-hidden bg-surface-container-highest border border-outline-variant flex-shrink-0">
            <img class="w-full h-full object-cover" [alt]="voluntario.nombre" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB92qcXYM0OBOyiunzNKlgrUnM9CxGfICCCPmRzpsgpHyCfIfbvStC2QAKQreKUex6bwA2BC7KGsKOsN6bk66gFIavvXq282ttMiSodEPgHL-Ah0h_2bdQfoqCxdC8N2t4Xa01gdCObOEcTc0TvCQnGXhNhqJ7-4daDxGbj8sMLL1MJp-FzKx2eOZTpKqiRzMTuFW7N0E5irlTVxzPZRBpPV2m7j2JFPs3Sz9f88FK7hO_jYVB1tC_vYxtbjYZfR4XEvewnloKby_9l"/>
          </div>
          <div class="min-w-0 flex-1">
            <h3 class="font-headline-sm text-headline-sm text-primary group-hover:text-primary-fixed transition-colors truncate max-w-[160px] sm:max-w-[200px]" [title]="voluntario.nombre">
              {{ voluntario.nombre }}
            </h3>
            <div class="flex gap-2 mt-1">
              <span class="bg-secondary-container/40 text-on-secondary-container px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider" [title]="voluntario.especialidad">
                {{ voluntario.especialidad }}
              </span>
            </div>
          </div>
        </div>

        <div class="flex-shrink-0">
          @if (voluntario.disponibilidad) {
            <app-badge color="amarillo">
              <span class="material-symbols-outlined">check</span>
              <span class="font-label-md text-[12px] font-bold uppercase">Disponible</span>
            </app-badge>
          } @else {
            <app-badge color="rojo">
              <span class="material-symbols-outlined">close</span>
              <span class="font-label-md text-[12px] font-bold uppercase">No disponible</span>
            </app-badge>
          }
        </div>

      </div>
      
      <div class="space-y-3 pt-2">
        <div class="flex items-center gap-3 text-on-surface-variant font-body-md text-body-md min-w-0">
          <span class="material-symbols-outlined text-primary-fixed-dim text-sm flex-shrink-0">location_on</span>
          <span class="truncate" [title]="voluntario.zona + ', ' + voluntario.estado">{{ voluntario.zona }}, {{ voluntario.estado }}</span>
        </div>
        <div class="flex items-center gap-3 text-on-surface-variant font-body-md text-body-md">
          <span class="material-symbols-outlined text-primary-fixed-dim text-sm flex-shrink-0">phone_enabled</span>
          <span class="font-label-md">{{ voluntario.contacto }}</span>
        </div>
      </div>
    </div>
    
    <div class="mt-auto p-4 border-t border-outline-variant bg-surface-container-low flex flex-col gap-2">
      <app-boton color="rojo" (click)="llamarEmergencia()">
        <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">call</span>
        Llamar Emergencia
      </app-boton>
      
      <div class="grid grid-cols-2 gap-2">
        <app-boton color="blanco" (click)="compartirWhatsApp()">
          <span class="material-symbols-outlined text-lg">chat</span>
          WhatsApp
        </app-boton>
        
        <app-boton color="azul" (click)="compartirGeneral()">
          <span class="material-symbols-outlined text-lg">share</span>
          Compartir
        </app-boton>
      </div>
    </div>
  </div>
  `
})
export class VoluntarioCardComponent {
  @Input({ required: true }) voluntario!: Voluntario;

  private get textoCompartir(): string {
    const v = this.voluntario;
    const estado = v.disponibilidad ? 'Disponible' : 'No disponible';
    return `🆘 ${v.nombre} - ${v.especialidad}\n📍 ${v.zona}, ${v.estado}\n📞 ${v.contacto}\n${estado}\n\nVisto en Pontugranito`;
  }

  llamarEmergencia(): void {
    window.open(`tel:${this.voluntario.contacto}`, '_self');
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
      }).catch(() => { });
    } else {
      navigator.clipboard.writeText(this.textoCompartir).then(() => {
        alert('Información copiada al portapapeles');
      });
    }
  }
}