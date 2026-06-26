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
  readonly conexionOk = signal<boolean | null>(null);

  constructor(private ngZone: NgZone) {
    this.supabase = this.ngZone.runOutsideAngular(() =>
      createClient(environment.supabaseUrl, environment.supabaseKey)
    );
  }

  async probarConexion(): Promise<void> {
    this.error.set(null);
    this.conexionOk.set(null);

    try {
      const { error } = await this.supabase.from('profesionales_voluntarios').select('id', { count: 'exact', head: true });
      this.conexionOk.set(!error);
      if (error) {
        if (error.message?.includes('relation') || error.code === '42P01') {
          this.error.set(`La tabla 'profesionales_voluntarios' no existe en Supabase. Creala con el SQL de docs/supabase.md`);
        } else if (error.message?.includes('permission') || error.code === '42501') {
          this.error.set(`Error de permisos (RLS). Verifica las políticas en Supabase: SELECT público, INSERT requiere autenticación.`);
        } else {
          this.error.set(error.message);
        }
      }
    } catch (err) {
      this.conexionOk.set(false);
      this.error.set(err instanceof Error ? err.message : 'Error de red — verifica la URL del proyecto Supabase');
    }
  }

  async getVoluntariosDisponibles(): Promise<void> {
    return this.ngZone.run(async () => {
      this.loading.set(true);
      this.error.set(null);

      try {
        const { data, error } = await this.supabase
          .from('profesionales_voluntarios')
          .select('*')
          .eq('disponibilidad', true)
          .order('estado', { ascending: true });

        if (error) throw error;

        const ordenados = this.priorizarYaracuy(data as Voluntario[]);
        this.voluntarios.set(ordenados);
      } catch (err) {
        this.error.set(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        this.loading.set(false);
      }
    });
  }

  async getTodosVoluntarios(): Promise<void> {
    return this.ngZone.run(async () => {
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
    });
  }

  async crearVoluntario(voluntario: Omit<Voluntario, 'id' | 'created_at'>): Promise<boolean> {
    return this.ngZone.run(async () => {
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
        const msg = err instanceof Error ? err.message : 'Error desconocido';
        if (msg.includes('permission') || msg.includes('violates row-level security')) {
          this.error.set('RLS bloquea INSERT. Habilita INSERT anónimo o usa un token en Supabase.');
        } else if (msg.includes('relation') || msg.includes('does not exist')) {
          this.error.set(`La tabla 'profesionales_voluntarios' no existe. Creala desde el SQL Editor de Supabase.`);
        } else {
          this.error.set(msg);
        }
        return false;
      } finally {
        this.loading.set(false);
      }
    });
  }

  private priorizarYaracuy(lista: Voluntario[]): Voluntario[] {
    const yaracuy = lista.filter((v) => v.estado === 'Yaracuy');
    const otros = lista.filter((v) => v.estado !== 'Yaracuy');
    return [...yaracuy, ...otros];
  }
}
