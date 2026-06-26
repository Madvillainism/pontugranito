import { Injectable, NgZone, signal } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';
import { Voluntario } from '../models/voluntario';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase: SupabaseClient;
  readonly voluntarios = signal<Voluntario[]>([]);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  constructor(private ngZone: NgZone) {
    this.supabase = this.ngZone.runOutsideAngular(() =>
      createClient(environment.supabaseUrl, environment.supabaseKey)
    );
  }

  async getVoluntariosDisponibles(): Promise<void> {
    this.loading.set(true);
    this.error.set(null);

    try {
      const { data, error } = await this.supabase
        .from('profesionales_voluntarios')
        .select('*')
        .eq('disponibilidad', true)
        .order('estado', { ascending: true });

      if (error) {
        throw error;
      }

      const ordenados = this.priorizarYaracuy(data as Voluntario[]);
      this.voluntarios.set(ordenados);
    } catch (err) {
      this.error.set(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      this.loading.set(false);
    }
  }

  async getTodosVoluntarios(): Promise<void> {
    this.loading.set(true);
    this.error.set(null);

    try {
      const { data, error } = await this.supabase
        .from('profesionales_voluntarios')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      this.voluntarios.set(data as Voluntario[]);
    } catch (err) {
      this.error.set(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      this.loading.set(false);
    }
  }

  async crearVoluntario(voluntario: Omit<Voluntario, 'id' | 'created_at'>): Promise<boolean> {
    this.loading.set(true);
    this.error.set(null);

    try {
      const { error } = await this.supabase
        .from('profesionales_voluntarios')
        .insert([voluntario]);

      if (error) throw error;
      await this.getTodosVoluntarios();
      return true;
    } catch (err) {
      this.error.set(err instanceof Error ? err.message : 'Error desconocido');
      return false;
    } finally {
      this.loading.set(false);
    }
  }

  private priorizarYaracuy(lista: Voluntario[]): Voluntario[] {
    const yaracuy = lista.filter((v) => v.estado === 'Yaracuy');
    const otros = lista.filter((v) => v.estado !== 'Yaracuy');
    return [...yaracuy, ...otros];
  }
}
