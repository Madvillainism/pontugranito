import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section
      class="min-h-screen bg-neutral-950 flex flex-col items-center justify-center px-6 text-center"
    >
      <div
        class="w-20 h-20 rounded-full bg-gradient-to-br from-venezuela-yellow via-venezuela-blue to-venezuela-red mb-8 shadow-lg shadow-venezuela-blue/20"
      ></div>

      <h1 class="text-3xl sm:text-5xl font-bold text-neutral-50 leading-tight">
        Pontugranito
      </h1>
      <p class="text-neutral-400 mt-3 max-w-md text-sm sm:text-base">
        Centro de Voluntariado y Ayuda Humanitaria — Venezuela
      </p>

      <div class="mt-2 flex gap-1.5 text-xs font-medium">
        <span
          class="px-2 py-0.5 rounded bg-venezuela-yellow/20 text-venezuela-yellow"
          >Amarillo</span
        >
        <span
          class="px-2 py-0.5 rounded bg-venezuela-blue/20 text-venezuela-blue"
          >Azul</span
        >
        <span class="px-2 py-0.5 rounded bg-venezuela-red/20 text-venezuela-red"
          >Rojo</span
        >
      </div>

      <nav class="mt-10 flex flex-col sm:flex-row gap-3 w-full max-w-sm">
        <a
          routerLink="/voluntarios"
          class="flex-1 py-3 px-6 rounded-xl bg-venezuela-blue text-white font-semibold text-sm hover:bg-blue-800 transition text-center"
        >
          Voluntarios
        </a>
        <a
          routerLink="/emergencia"
          class="flex-1 py-3 px-6 rounded-xl bg-venezuela-red text-white font-semibold text-sm hover:bg-red-700 transition text-center"
        >
          Emergencia
        </a>
        <a
          routerLink="/acopio"
          class="flex-1 py-3 px-6 rounded-xl bg-venezuela-yellow text-neutral-950 font-semibold text-sm hover:bg-yellow-400 transition text-center"
        >
          Centros de Acopio
        </a>
      </nav>

      <footer class="mt-16 text-neutral-600 text-xs">
        Hecho por Carlos Perez · Datos de Cruz Roja Venezolana y Alcaldía de
        Maracaibo · Junio 2026 <br />
        Contacto:
        <a href="mailto:carlosperezph&#64;hotmail.com"
          >carlosperezph&#64;hotmail.com</a
        >
      </footer>
    </section>
  `,
})
export class HomePageComponent {}
