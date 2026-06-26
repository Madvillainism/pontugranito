import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { environment } from '../../../environments/environment';
import { SupabaseService } from '../../core/services/supabase.service';

@Component({
  selector: 'app-test-supabase',
  standalone: true,
  imports: [FormsModule, NgClass],
  template: `
    <section class="min-h-screen bg-neutral-950 px-4 py-8 sm:px-6 lg:px-8">
      <div class="max-w-2xl mx-auto space-y-8">

        <!-- Encabezado -->
        <div>
          <h1 class="text-2xl font-bold text-venezuela-yellow">Prueba Supabase</h1>
          <p class="text-neutral-400 text-sm mt-1">Diagnóstico de conexión e inserción de voluntarios</p>
        </div>

        <!-- Panel de diagnóstico -->
        <div class="bg-neutral-900 border border-neutral-800 rounded-xl p-5">
          <h2 class="text-neutral-200 font-semibold text-sm mb-3">Diagnóstico de conexión</h2>

          <div class="flex items-center gap-2 mb-3">
            <button (click)="diagnosticar()" [disabled]="svc.loading()"
              class="px-4 py-1.5 rounded-lg text-xs font-medium bg-venezuela-blue text-white hover:bg-blue-800 transition disabled:opacity-40">
              @if (svc.loading()) { Probando... } @else { Probar conexión }
            </button>
            @if (svc.conexionOk() === true) {
              <span class="text-green-400 text-xs flex items-center gap-1">
                <span class="w-2 h-2 rounded-full bg-green-400"></span> Conectado
              </span>
            } @else if (svc.conexionOk() === false) {
              <span class="text-venezuela-red text-xs flex items-center gap-1">
                <span class="w-2 h-2 rounded-full bg-venezuela-red"></span> Error
              </span>
            }
          </div>

          @if (svc.error(); as err) {
            <div class="bg-venezuela-red/10 border border-venezuela-red/30 rounded-lg p-3">
              <p class="text-venezuela-red text-xs font-medium">{{ err }}</p>
            </div>
          }

          <div class="mt-3 text-xs text-neutral-500 space-y-1">
            <p>URL: <code class="text-neutral-300">{{ supabaseUrl }}</code></p>
            <p>Tabla: <code class="text-neutral-300">profesionales_voluntarios</code></p>
            <p>Registros: <code class="text-neutral-300">{{ svc.voluntarios().length }}</code></p>
          </div>
        </div>

        <!-- Formulario de inserción -->
        <div class="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
          <h2 class="text-neutral-200 font-semibold text-sm mb-4">Insertar voluntario de prueba</h2>

          @if (mensajeExito) {
            <div class="bg-green-900/20 border border-green-700/30 rounded-lg p-3 mb-4">
              <p class="text-green-400 text-xs font-medium">{{ mensajeExito }}</p>
            </div>
          }

          @if (svc.error(); as err) {
            <div class="bg-venezuela-red/10 border border-venezuela-red/30 rounded-lg p-3 mb-4">
              <p class="text-venezuela-red text-xs font-medium">{{ err }}</p>
            </div>
          }

          <form #form="ngForm" (ngSubmit)="enviar(form)">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              <div>
                <label class="block text-neutral-400 text-xs mb-1">Nombre *</label>
                <input name="nombre" ngModel required
                  class="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-neutral-50 text-sm focus:outline-none focus:border-venezuela-yellow placeholder-neutral-600"
                  placeholder="María Pérez" />
              </div>
              <div>
                <label class="block text-neutral-400 text-xs mb-1">Especialidad *</label>
                <input name="especialidad" ngModel required
                  class="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-neutral-50 text-sm focus:outline-none focus:border-venezuela-yellow placeholder-neutral-600"
                  placeholder="Médico General" />
              </div>
              <div>
                <label class="block text-neutral-400 text-xs mb-1">Estado *</label>
                <input name="estado" ngModel required
                  class="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-neutral-50 text-sm focus:outline-none focus:border-venezuela-yellow placeholder-neutral-600"
                  placeholder="Yaracuy" />
              </div>
              <div>
                <label class="block text-neutral-400 text-xs mb-1">Zona *</label>
                <input name="zona_especifica" ngModel required
                  class="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-neutral-50 text-sm focus:outline-none focus:border-venezuela-yellow placeholder-neutral-600"
                  placeholder="San Felipe" />
              </div>
              <div>
                <label class="block text-neutral-400 text-xs mb-1">Contacto *</label>
                <input name="contacto" ngModel required
                  class="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-neutral-50 text-sm focus:outline-none focus:border-venezuela-yellow placeholder-neutral-600"
                  placeholder="+58 412 345 6789" />
              </div>
              <div class="flex items-end pb-1">
                <label class="flex items-center gap-2 cursor-pointer select-none">
                  <input type="checkbox" name="disponibilidad" ngModel
                    class="w-4 h-4 rounded bg-neutral-800 border-neutral-700 text-venezuela-yellow focus:ring-venezuela-yellow" />
                  <span class="text-neutral-300 text-sm">Disponible</span>
                </label>
              </div>
            </div>

            <button type="submit" [disabled]="form.invalid || svc.loading()"
              class="w-full py-2.5 rounded-lg bg-venezuela-yellow text-neutral-950 font-semibold text-sm transition hover:bg-yellow-400 disabled:opacity-40 disabled:cursor-not-allowed">
              @if (svc.loading()) { Insertando... } @else { Insertar voluntario }
            </button>
          </form>
        </div>

        <!-- Lista de voluntarios -->
        <div class="bg-neutral-900 border border-neutral-800 rounded-xl p-5">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-neutral-200 font-semibold text-sm">Voluntarios en Supabase</h2>
            <button (click)="recargar()" [disabled]="svc.loading()"
              class="text-xs text-venezuela-blue hover:text-blue-400 transition disabled:opacity-40">
              @if (svc.loading()) { Cargando... } @else { Recargar }
            </button>
          </div>

          @if (svc.loading() && svc.voluntarios().length === 0) {
            <div class="flex justify-center py-8">
              <div class="w-8 h-8 border-4 border-neutral-800 border-t-venezuela-yellow rounded-full animate-spin"></div>
            </div>
          } @else {
            <div class="space-y-2">
              @for (v of svc.voluntarios(); track v.id) {
                <div class="bg-neutral-800/50 border border-neutral-700/50 rounded-lg p-3 text-sm">
                  <div class="flex items-center justify-between gap-2">
                    <span class="text-neutral-50 font-medium truncate">{{ v.nombre }}</span>
                    <span class="shrink-0 text-xs px-2 py-0.5 rounded-full font-medium"
                      [ngClass]="v.disponibilidad ? 'bg-green-900/30 text-green-400' : 'bg-neutral-700/50 text-neutral-400'">
                      {{ v.disponibilidad ? 'Disponible' : 'No disponible' }}
                    </span>
                  </div>
                  <p class="text-neutral-400 text-xs mt-1">
                    {{ v.especialidad }} · {{ v.zona_especifica }}, {{ v.estado }}
                  </p>
                  <p class="text-venezuela-blue text-xs mt-0.5">{{ v.contacto }}</p>
                </div>
              } @empty {
                <div class="text-center py-6 text-neutral-500">
                  <p class="text-sm">No hay voluntarios registrados</p>
                  <p class="text-xs mt-1">Usa el formulario de arriba para insertar uno, o configura Supabase primero</p>
                </div>
              }
            </div>
          }
        </div>

      </div>
    </section>
  `,
})
export class TestSupabaseComponent implements OnInit {
  protected svc = inject(SupabaseService);
  mensajeExito = '';
  supabaseUrl = '';

  ngOnInit(): void {
    this.supabaseUrl = environment.supabaseUrl;
    this.svc.probarConexion();
    this.svc.getTodosVoluntarios();
  }

  async diagnosticar(): Promise<void> {
    this.mensajeExito = '';
    await this.svc.probarConexion();
    await this.svc.getTodosVoluntarios();
  }

  async recargar(): Promise<void> {
    this.mensajeExito = '';
    await this.svc.probarConexion();
    await this.svc.getTodosVoluntarios();
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
      this.mensajeExito = 'Voluntario insertado correctamente en Supabase';
      form.resetForm();
      form.form.markAsPristine();
    }
  }
}
