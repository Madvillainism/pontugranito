import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Refugio } from '../../core/models/refugio';

@Component({
  selector: 'app-create-refugio-page',
  standalone: true,
  imports: [RouterLink, FormsModule],
  styles: [`
    .form-input {
      background: rgba(30, 30, 35, 0.6);
      border: 1px solid var(--outline-variant);
      color: var(--on-surface);
      transition: all 0.25s ease;
      width: 100%;
      padding: 0.75rem 1rem;
      border-radius: 0.75rem; /* rounded-xl */
      font-size: 0.875rem; /* text-sm */
    }
    .form-input:focus {
      outline: none;
      background: rgba(30, 30, 35, 0.9);
      border-color: var(--primary-fixed);
      box-shadow: 0 0 0 1px var(--primary-fixed);
    }
    .form-label {
      font-size: 0.65rem;
      font-family: 'JetBrains Mono', monospace;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: var(--on-surface-variant);
      margin-bottom: 0.375rem;
      display: block;
      margin-left: 0.25rem;
    }
  `],
  template: `
    <section class="min-h-screen bg-background px-margin-mobile md:px-margin-desktop py-8 animate-fadeIn pb-24">
      
      <header class="max-w-container-max-width mx-auto mb-8 flex items-center justify-between">
        <div>
          <div class="mb-4">
            <a routerLink="/admin/dashboard" class="inline-flex items-center gap-1.5 text-primary-fixed-dim hover:text-primary transition-colors text-sm font-mono">
              <span class="material-symbols-outlined text-[16px]">arrow_back</span>
              Volver al Panel
            </a>
          </div>
          <h1 class="font-manrope text-[28px] md:text-[32px] font-semibold text-primary mb-2">Nuevo Refugio</h1>
          <p class="text-on-surface-variant font-sans text-sm max-w-xl">
            Completa los detalles para registrar un nuevo Refugio en el sistema. Asegúrate de incluir la información de contacto y geolocalización.
          </p>
        </div>
      </header>

      <div class="max-w-container-max-width mx-auto">
        <form (ngSubmit)="onSubmit()" class="bg-surface-container/40 border border-outline-variant rounded-3xl p-6 md:p-10 shadow-2xl">
          
          <h2 class="font-manrope text-lg text-primary-fixed mb-6 border-b border-white/5 pb-2">Información Básica</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div class="md:col-span-2">
              <label class="form-label">Nombre del Refugio</label>
              <input type="text" name="nombre" [(ngModel)]="refugio.nombre" class="form-input" placeholder="Ej: Gimnasio Belisario Aponte" required>
            </div>
            
            <div class="md:col-span-2">
              <label class="form-label">Dirección Textual Exacta</label>
              <textarea name="direccion" [(ngModel)]="refugio.direccion" rows="2" class="form-input resize-none" placeholder="Calle, Avenida, Puntos de referencia" required></textarea>
            </div>

            <div class="md:col-span-2">
              <label class="form-label">URL de Google Maps</label>
              <input type="url" name="googleMapsUrl" [(ngModel)]="refugio.googleMapsUrl" class="form-input" placeholder="https://maps.google.com/..." required>
            </div>

            <div>
              <label class="form-label">Capacidad Máxima (Aprox.)</label>
              <input type="text" name="capacidad" [(ngModel)]="refugio.capacidad" class="form-input" placeholder="Ej: 150 personas" required>
            </div>

            <div>
              <label class="form-label">Teléfono de Contacto</label>
              <input type="text" name="contacto" [(ngModel)]="refugio.contacto" class="form-input" placeholder="Ej: 0414-XXXXXXX" required>
            </div>
            
            <div class="md:col-span-2">
              <label class="form-label">URL de Foto (Opcional)</label>
              <input type="url" name="foto" [(ngModel)]="refugio.foto" class="form-input" placeholder="https://ejemplo.com/foto.jpg">
            </div>
          </div>

          <h2 class="font-manrope text-lg text-primary-fixed mb-6 border-b border-white/5 pb-2">Ubicación Geográfica</h2>
          <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div>
              <label class="form-label">Estado</label>
              <!-- Usando input tipo texto para simplificar, en prod sería un select anidado -->
              <input type="text" name="estado" [(ngModel)]="refugio.estado" class="form-input" placeholder="Ej: Zulia" required>
            </div>
            <div>
              <label class="form-label">Ciudad</label>
              <input type="text" name="ciudad" [(ngModel)]="refugio.ciudad" class="form-input" placeholder="Ej: Maracaibo" required>
            </div>
            <div>
              <label class="form-label">Municipio</label>
              <input type="text" name="municipio" [(ngModel)]="refugio.municipio" class="form-input" placeholder="Ej: Maracaibo" required>
            </div>
            <div>
              <label class="form-label">Parroquia</label>
              <input type="text" name="parroquia" [(ngModel)]="refugio.parroquia" class="form-input" required>
            </div>
          </div>

          <h2 class="font-manrope text-lg text-primary-fixed mb-6 border-b border-white/5 pb-2">Estado Operativo</h2>
          <div class="mb-10 flex items-center gap-3">
            <input type="checkbox" id="activo" name="activo" [(ngModel)]="refugio.activo" class="w-5 h-5 accent-primary rounded bg-surface">
            <label for="activo" class="text-sm text-on-surface cursor-pointer select-none">El refugio se encuentra Activo y Disponible para recibir personas.</label>
          </div>

          <div class="flex flex-col sm:flex-row gap-4 justify-end border-t border-outline-variant pt-6">
            <button type="button" routerLink="/admin/dashboard" class="px-6 py-3 rounded-xl border border-outline-variant text-on-surface-variant font-bold hover:bg-surface-container-high transition-colors">
              Cancelar
            </button>
            <button type="submit" class="px-8 py-3 rounded-xl bg-primary text-on-primary font-bold hover:brightness-110 active:scale-95 transition-all shadow-[0_0_15px_rgba(250,189,0,0.2)]">
              Guardar Refugio
            </button>
          </div>

        </form>

        <!-- Preview Modal de Éxito Mock -->
        @if (success) {
          <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
            <div class="bg-surface-container rounded-2xl p-8 max-w-sm w-full border border-primary/30 text-center shadow-2xl">
              <span class="material-symbols-outlined text-[64px] text-green-400 mb-4 animate-bounce">check_circle</span>
              <h3 class="text-xl font-bold font-manrope text-on-surface mb-2">¡Refugio Creado!</h3>
              <p class="text-sm text-on-surface-variant mb-6">El refugio "{{ refugio.nombre }}" ha sido registrado exitosamente (Mock).</p>
              <button (click)="success = false" routerLink="/admin/dashboard" class="w-full py-3 bg-primary text-on-primary font-bold rounded-xl active:scale-95 transition-transform">
                Regresar al panel
              </button>
            </div>
          </div>
        }

      </div>
    </section>
  `
})
export class CreateRefugioPageComponent {
  // Inicializamos un objeto vacío
  refugio: Partial<Refugio> = {
    activo: true, // Default checked
  };

  success = false;

  onSubmit() {
    // Aquí iría la lógica de validación e inserción real en la BD.
    // Como es un prototipo local, simulamos el éxito:
    this.success = true;
  }
}
