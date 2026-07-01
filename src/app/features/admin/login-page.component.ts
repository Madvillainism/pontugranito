import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [FormsModule],
  styles: [`
    .glass-panel {
      background: rgba(30, 30, 35, 0.7);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      box-shadow: 0 24px 48px rgba(0, 0, 0, 0.4);
    }
    .input-field {
      background: rgba(20, 20, 25, 0.6);
      border: 1px solid var(--outline-variant);
      transition: all 0.25s ease;
    }
    .input-field:focus {
      border-color: var(--primary-fixed);
      background: rgba(20, 20, 25, 0.9);
      box-shadow: 0 0 0 1px var(--primary-fixed);
    }
  `],
  template: `
    <section class="min-h-screen flex items-center justify-center p-4 bg-background relative overflow-hidden">
      <!-- Background elements for aesthetics -->
      <div class="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[100px] rounded-full pointer-events-none"></div>
      <div class="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/20 blur-[100px] rounded-full pointer-events-none"></div>

      <div class="glass-panel w-full max-w-md rounded-2xl p-8 relative z-10 animate-fadeIn">
        
        <div class="text-center mb-8">
          <span class="material-symbols-outlined text-4xl text-primary-fixed mb-4">admin_panel_settings</span>
          <h1 class="font-manrope text-2xl font-bold text-on-surface mb-2">Inicio de Sesión Temporal</h1>
          <p class="text-sm font-sans text-on-surface-variant">Acceso administrativo al sistema</p>
        </div>

        @if (errorMsg) {
          <div class="mb-6 p-3 bg-error-container/30 border border-error-container text-error text-sm rounded-xl text-center">
            {{ errorMsg }}
          </div>
        }

        <form (ngSubmit)="onSubmit()" class="flex flex-col gap-5">
          <div class="flex flex-col gap-1.5">
            <label class="text-xs font-mono uppercase tracking-widest text-on-surface-variant ml-1">Usuario</label>
            <input 
              type="text" 
              name="usuario" 
              [(ngModel)]="usuario" 
              placeholder="Ej: 123"
              class="input-field rounded-xl px-4 py-3 text-on-surface outline-none" 
              required
            />
          </div>

          <div class="flex flex-col gap-1.5">
            <label class="text-xs font-mono uppercase tracking-widest text-on-surface-variant ml-1">Contraseña</label>
            <input 
              type="password" 
              name="contrasena" 
              [(ngModel)]="contrasena" 
              placeholder="••••••"
              class="input-field rounded-xl px-4 py-3 text-on-surface outline-none" 
              required
            />
          </div>
          
          <div class="mt-2 text-center text-[10px] text-on-surface-variant/60 font-mono">
            Credenciales de prueba: 123 / 123
          </div>

          <button 
            type="submit" 
            class="mt-4 w-full py-3 bg-primary text-on-primary font-bold rounded-xl hover:brightness-110 active:scale-95 transition-all shadow-[0_0_20px_rgba(250,189,0,0.2)]"
          >
            Entrar
          </button>
          
          <button 
            type="button"
            (click)="goBack()"
            class="mt-2 w-full py-3 bg-surface-container-high text-on-surface font-semibold rounded-xl hover:bg-surface-container-highest transition-colors"
          >
            Volver
          </button>
        </form>
      </div>
    </section>
  `
})
export class LoginPageComponent {
  usuario = '';
  contrasena = '';
  errorMsg = '';

  private authService = inject(AuthService);
  private router = inject(Router);

  onSubmit() {
    if (!this.usuario || !this.contrasena) {
      this.errorMsg = 'Por favor ingresa usuario y contraseña.';
      return;
    }

    if (this.authService.login(this.usuario, this.contrasena)) {
      this.errorMsg = '';
    } else {
      this.errorMsg = 'Credenciales inválidas. Usa 123 / 123.';
    }
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
