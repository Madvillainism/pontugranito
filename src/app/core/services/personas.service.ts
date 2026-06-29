import { Injectable, NgZone, signal } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';
import { Persona } from '../models/persona';

@Injectable({
  providedIn: 'root',
})
export class PersonasService {
  private supabase: SupabaseClient;
  readonly personas = signal<Persona[]>([]);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);
  readonly conexionOk = signal<boolean | null>(null);

  constructor(private ngZone: NgZone) {
    this.supabase = this.ngZone.runOutsideAngular(() =>
      createClient(environment.supabaseUrl, environment.supabaseKey),
    );
  }

  async probarConexion(): Promise<void> {
    this.error.set(null);
    this.conexionOk.set(null);

    try {
      const { error, count } = await this.supabase
        .from('personas')
        .select('*', { count: 'exact', head: true });

      this.conexionOk.set(!error);
      if (error) {
        if (error.message?.includes('relation') || error.code === '42P01') {
          this.error.set(
            'La tabla "personas" no existe. Crea la tabla desde el SQL Editor de Supabase.'
          );
        } else if (error.message?.includes('permission') || error.code === '42501') {
          this.error.set(
            'RLS bloquea SELECT. Crea política: CREATE POLICY "select_publico" ON personas FOR SELECT USING (true);'
          );
        } else {
          this.error.set(error.message);
        }
      } else {
        console.log(`Conexión OK personas — ${count ?? 0} registros`);
      }
    } catch (err) {
      this.conexionOk.set(false);
      this.error.set(
        err instanceof Error
          ? err.message
          : 'Error de red — verifica URL y CORS en Supabase',
      );
    }
  }

  async getPersonasDesaparecidas(): Promise<void> {
    return this.ngZone.run(async () => {
      this.loading.set(true);
      this.error.set(null);

      try {
        const { data, error } = await this.supabase
          .from('personas')
          .select('*')
          .eq('desaparecido', true);

        if (error) throw error;
        this.personas.set(data as Persona[]);
      } catch (err) {
        this.error.set(
          err instanceof Error ? err.message : 'Error desconocido',
        );
      } finally {
        this.loading.set(false);
      }
    });
  }

  async getAllPersonas(): Promise<void> {
    return this.ngZone.run(async () => {
      this.loading.set(true);
      this.error.set(null);

      try {
        const { data, error } = await this.supabase
          .from('personas')
          .select('*')
          .order('id', { ascending: false });

        if (error) throw error;
        this.personas.set(data as Persona[]);
      } catch (err) {
        this.error.set(
          err instanceof Error ? err.message : 'Error desconocido',
        );
      } finally {
        this.loading.set(false);
      }
    });
  }

  async crearPersona(
    datos: Omit<Persona, 'id' | 'created_at'>,
  ): Promise<boolean> {
    return this.ngZone.run(async () => {
      this.loading.set(true);
      this.error.set(null);

      try {
        const { error } = await this.supabase.from('personas').insert([datos]);

        if (error) throw error;
        await this.getAllPersonas();
        return true;
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Error desconocido';
        if (
          msg.includes('permission') ||
          msg.includes('violates row-level security')
        ) {
          this.error.set(
            'RLS bloquea INSERT. En Supabase > SQL Editor, ejecuta: CREATE POLICY "insert_anonimo" ON personas FOR INSERT WITH CHECK (true);'
          );
        } else if (msg.includes('relation') || msg.includes('does not exist')) {
          this.error.set(
            'La tabla "personas" no existe. Crea la tabla desde el SQL Editor de Supabase.',
          );
        } else {
          this.error.set(msg);
        }
        return false;
      } finally {
        this.loading.set(false);
      }
    });
  }
}
