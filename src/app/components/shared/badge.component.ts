import { Component, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

export type BadgeColorVariant = 'amarillo' | 'azul' | 'rojo' | 'verde' | 'blanco' | 'gris';
export type BadgeShapeVariant = 'redondeado' | 'cuadrado';
export type BadgeTypeVariant = 'solid' | 'outline';

@Component({
    selector: 'app-badge',
    standalone: true,
    imports: [CommonModule],
    template: `
    <span [class]="badgeClasses()" [style]="badgeStyle()">
      <ng-content></ng-content>
    </span>
  `
})
export class BadgeComponent {
    // Inputs basados en Signals de Angular 18
    color = input<BadgeColorVariant>('amarillo');
    variante = input<BadgeShapeVariant>('redondeado');
    tipo = input<BadgeTypeVariant>('solid');

    // Propiedad computada para calcular las clases estructurales
    badgeClasses = computed(() => {
        const baseStyle = 'inline-flex items-center gap-1.5 justify-center transition-all';
        const shapes: Record<BadgeShapeVariant, string> = {
            redondeado: 'rounded-full',
            cuadrado: 'rounded'
        };
        return `${baseStyle} ${shapes[this.variante()]}`;
    });

    // Estilos inline para evitar problemas de opacidad con variables CSS en Tailwind.
    // Los modificadores /XX de Tailwind no funcionan con var(--token) puros, así que
    // usamos rgba() directamente con los valores del design system.
    badgeStyle = computed(() => {
        const base = 'padding: 2px 10px; font-size: 10px; font-weight: 700; font-family: "JetBrains Mono", monospace; text-transform: uppercase; letter-spacing: 0.08em; border: 1px solid; display: inline-flex; align-items: center;';

        const styles: Record<BadgeColorVariant, Record<BadgeTypeVariant, string>> = {
            // Amarillo — primary tokens (#ffc107 / #fabd00)
            amarillo: {
                solid:   'background-color: var(--primary-container); color: var(--on-primary-container); border-color: transparent;',
                outline: 'background-color: rgba(255, 193, 7, 0.12); color: var(--primary-fixed-dim); border-color: rgba(250, 189, 0, 0.4);'
            },
            // Azul — secondary tokens (#2c3ea3 / #bac3ff)
            azul: {
                solid:   'background-color: var(--secondary-container); color: var(--on-secondary-container); border-color: transparent;',
                outline: 'background-color: rgba(44, 62, 163, 0.25); color: var(--secondary); border-color: rgba(186, 195, 255, 0.35);'
            },
            // Rojo — error tokens (#93000a / #ffb4ab)
            rojo: {
                solid:   'background-color: var(--error-container); color: var(--on-error-container); border-color: transparent;',
                outline: 'background-color: rgba(147, 0, 10, 0.25); color: var(--error); border-color: rgba(255, 180, 171, 0.4);'
            },
            // Verde — sin token propio, valores literales
            verde: {
                solid:   'background-color: #14532d; color: #4ade80; border-color: transparent;',
                outline: 'background-color: rgba(74, 222, 128, 0.12); color: #4ade80; border-color: rgba(74, 222, 128, 0.4);'
            },
            // Blanco — neutral puro
            blanco: {
                solid:   'background-color: #ffffff; color: #0a0a0a; border-color: transparent;',
                outline: 'background-color: transparent; color: var(--on-surface); border-color: rgba(156, 143, 120, 0.5);'
            },
            // Gris — surface tokens
            gris: {
                solid:   'background-color: var(--surface-container-highest); color: var(--on-surface); border-color: transparent;',
                outline: 'background-color: rgba(53, 53, 52, 0.6); color: var(--on-surface-variant); border-color: rgba(79, 70, 50, 0.7);'
            },
        };

        return `${base} ${styles[this.color()][this.tipo()]}`;
    });
}