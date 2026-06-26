import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { SupabaseService } from '../../core/services/supabase.service';
import { Voluntario } from '../../core/models/voluntario';

@Component({
  selector: 'app-test-supabase',
  standalone: true,
  imports: [FormsModule, NgClass],
  template: `
    <section class="min-h-screen bg-neutral-950 px-4 py-8 sm:px-6 lg:px-8">
      <div class="max-w-2xl mx-auto">
        <h1 class="text-2xl font-bold text-venezuela-yellow mb-2">
          Prueba Supabase
        </h1>
        <p class="text-neutral-400 text-sm mb-8">
          Insertar y listar voluntarios para verificar la conexión
        </p>

        @if (svc.error()) {
          <div class="bg-venezuela-red/10 border border-venezuela-red/30 rounded-xl p-4 mb-6">
            <p class="text-venezuela-red text-sm font-medium">{{ svc.error() }}</p>
          </div>
        }

        @if (mensajeExito) {
          <div class="bg-green-900/20 border border-green-700/30 rounded-xl p-4 mb-6">
            <p class="text-green-400 text-sm font-medium">{{ mensajeExito }}</p>
          </div>
        }

        <form
          #form="ngForm"
          (ngSubmit)="enviar(form)"
          class="bg-neutral-900 border border-neutral-800 rounded-xl p-6 space-y-4 mb-10"
        >
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-neutral-300 text-xs font-medium mb-1">Nombre</label>
              <input
                name="nombre"
                ngModel
                required
                class="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-neutral-50 text-sm focus:outline-none focus:border-venezuela-yellow"
              />
            </div>
            <div>
              <label class="block text-neutral-300 text-xs font-medium mb-1">Especialidad</label>
              <input
                name="especialidad"
                ngModel
                required
                class="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-neutral-50 text-sm focus:outline-none focus:border-venezuela-yellow"
              />
            </div>
            <div>
              <label class="block text-neutral-300 text-xs font-medium mb-1">Estado</label>
              <input
                name="estado"
                ngModel
                required
                placeholder="ej. Yaracuy"
                class="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-neutral-50 text-sm focus:outline-none focus:border-venezuela-yellow"
              />
            </div>
            <div>
              <label class="block text-neutral-300 text-xs font-medium mb-1">Zona</label>
              <input
                name="zona_especifica"
                ngModel
                required
                placeholder="ej. San Felipe"
                class="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-neutral-50 text-sm focus:outline-none focus:border-venezuela-yellow"
              />
            </div>
            <div>
              <label class="block text-neutral-300 text-xs font-medium mb-1">Contacto</label>
              <input
                name="contacto"
                ngModel
                required
                placeholder="+58 412..."
                class="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-neutral-50 text-sm focus:outline-none focus:border-venezuela-yellow"
              />
            </div>
            <div class="flex items-end">
              <label class="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="disponibilidad"
                  ngModel
                  class="w-4 h-4 rounded bg-neutral-800 border-neutral-700 text-venezuela-yellow focus:ring-venezuela-yellow"
                />
                <span class="text-neutral-300 text-sm">Disponible</span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            [disabled]="form.invalid || svc.loading()"
            class="w-full py-2.5 rounded-lg bg-venezuela-yellow text-neutral-950 font-semibold text-sm transition hover:bg-yellow-400 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            @if (svc.loading()) {
              Creando...
            } @else {
              Crear voluntario de prueba
            }
          </button>
        </form>

        <h2 class="text-lg font-semibold text-neutral-200 mb-4">
          Voluntarios registrados ({{ svc.voluntarios().length }})
        </h2>

        @if (svc.loading() && svc.voluntarios().length === 0) {
          <div class="flex justify-center py-10">
            <div class="w-8 h-8 border-4 border-neutral-800 border-t-venezuela-yellow rounded-full animate-spin"></div>
          </div>
        } @else {
          <div class="space-y-3">
            @for (v of svc.voluntarios(); track v.id) {
              <div class="bg-neutral-900 border border-neutral-800 rounded-xl p-4 text-sm">
                <div class="flex items-center justify-between mb-1">
                  <span class="text-neutral-50 font-medium">{{ v.nombre }}</span>
                  <span class="text-xs px-2 py-0.5 rounded-full" [ngClass]="{ 'bg-green-900/30 text-green-400': v.disponibilidad, 'bg-neutral-800 text-neutral-500': !v.disponibilidad }">
                    {{ v.disponibilidad ? 'Disponible' : 'No disponible' }}
                  </span>
                </div>
                <p class="text-neutral-400">{{ v.especialidad }} · {{ v.zona_especifica }}, {{ v.estado }}</p>
                <p class="text-venezuela-blue text-xs mt-1">{{ v.contacto }}</p>
              </div>
            } @empty {
              <p class="text-neutral-500 text-center py-10">
                No hay datos. Crea un voluntario arriba o verifica la conexión.
              </p>
            }
          </div>
        }
      </div>
    </section>
  `,
})
export class TestSupabaseComponent implements OnInit {
  protected svc = inject(SupabaseService);
  mensajeExito = '';

  ngOnInit(): void {
    this.svc.getTodosVoluntarios();
  }

  async enviar(form: any): Promise<void> {
    this.mensajeExito = '';
    if (form.invalid) return;

    const ok = await this.svc.crearVoluntario({
      nombre: form.value.nombre,
      especialidad: form.value.especialidad,
      estado: form.value.estado,
      zona_especifica: form.value.zona_especifica,
      contacto: form.value.contacto,
      disponibilidad: form.value.disponibilidad ?? false,
    });

    if (ok) {
      this.mensajeExito = 'Voluntario creado correctamente';
      form.resetForm();
      form.form.markAsPristine();
    }
  }
}
