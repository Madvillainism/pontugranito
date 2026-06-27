import { Component, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

// Definimos los tipos de colores que va a soportar nuestro botón
export type ColorDelBoton = 'rojo' | 'amarillo' | 'azul' | 'blanco' | 'verde';

@Component({
    selector: 'app-boton',
    standalone: true,
    imports: [CommonModule],
    template: `
  <button [class]="buttonClasses()">
    <ng-content></ng-content>
  </button>
  `
})
export class BotonComponent {
    // Input usando la sintaxis moderna de Signals de Angular 18
    color = input<ColorDelBoton>('amarillo');

    // Propiedad computada que reacciona automáticamente al cambiar el color
    buttonClasses = computed(() => {
        // Clases base que comparten todos los botones
        const baseClasses = 'w-full py-3 px-4 rounded-lg font-bold font-label-md text-label-md flex items-center justify-center gap-2 transition-all active:scale-95';

        // Diccionario con las clases específicas para cada variante de color
        const colorStyles: Record<ColorDelBoton, string> = {
            rojo: 'bg-error-container text-on-error-container',
            verde: 'bg-[#25d366]/20 text-[#25d366] hover:bg-[#25d366]/30 border border-[#25d366]/30',
            azul: 'bg-secondary-container text-on-secondary-container hover:opacity-90',
            blanco: 'bg-surface-container-highest text-on-surface hover:opacity-90',
            amarillo: 'bg-secondary-container text-on-secondary-container hover:opacity-90',
        };

        return `${baseClasses} ${colorStyles[this.color()]}`;
    });
}