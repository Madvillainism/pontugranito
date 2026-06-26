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
        class="w-20 h-20 lg:w-28 lg:h-28 rounded-full bg-gradient-to-br from-venezuela-yellow via-venezuela-blue to-venezuela-red mb-8 shadow-lg shadow-venezuela-blue/20"
      ></div>

      <h1
        class="text-3xl sm:text-4xl lg:text-6xl font-bold text-neutral-100 leading-tight"
      >
        Pontugranito
      </h1>
      <p class="text-neutral-300 mt-3 max-w-md text-sm sm:text-base lg:text-lg">
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

      <nav class="mt-10 flex flex-col sm:flex-row gap-4 w-full max-w-lg">
        <a
          routerLink="/voluntarios"
          class="flex-1 py-4 px-8 lg:py-5 lg:px-10 rounded-xl bg-venezuela-blue text-white font-bold text-base lg:text-lg hover:bg-blue-800 transition text-center"
        >
          Voluntarios
        </a>
        <a
          routerLink="/emergencia"
          class="flex-1 py-4 px-8 lg:py-5 lg:px-10 rounded-xl bg-venezuela-red text-white font-bold text-base lg:text-lg hover:bg-red-700 transition text-center"
        >
          Emergencia
        </a>
        <a
          routerLink="/acopio"
          class="flex-1 py-4 px-8 lg:py-5 lg:px-10 rounded-xl bg-venezuela-yellow text-neutral-950 font-bold text-base lg:text-lg hover:bg-yellow-400 transition text-center"
        >
          Centros de Acopio
        </a>
        <a
          routerLink="/test-supabase"
          class="flex-1 py-4 px-8 lg:py-5 lg:px-10 rounded-xl bg-venezuela-yellow text-neutral-950 font-bold text-base lg:text-lg hover:bg-yellow-400 transition text-center"
        >
          Quiero ser voluntario
        </a>
      </nav>

      <footer class="mt-16 text-neutral-500 text-xs lg:text-sm">
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
