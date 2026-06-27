import { Component, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

export type BadgeColorVariant = 'amarillo' | 'azul' | 'rojo' | 'verde' | 'blanco';
export type BadgeShapeVariant = 'redondeado' | 'cuadrado';
export type BadgeTypeVariant = 'solid' | 'outline';

@Component({
    selector: 'app-badge',
    standalone: true,
    imports: [CommonModule],
    template: `
    <span [class]="badgeClasses()">
      <ng-content></ng-content>
    </span>
  `
})
export class BadgeComponent {
    // Inputs basados en Signals de Angular 18
    color = input<BadgeColorVariant>('amarillo');
    variante = input<BadgeShapeVariant>('redondeado');
    tipo = input<BadgeTypeVariant>('solid');

    // Propiedad computada para calcular los estilos del contenedor principal
    badgeClasses = computed(() => {
        // Clases estructurales base y tipográficas extraídas de tus utilidades tipográficas
        const baseStyle = 'px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest inline-flex items-center gap-1.5 justify-center border transition-all';

        // 1. Mapeo de la forma física (Imágenes image_398dfa.png y image_398dbf.png)
        const shapes: Record<BadgeShapeVariant, string> = {
            redondeado: 'rounded-full',
            cuadrado: 'rounded border-outline-variant/30' // Estilo exacto de las tarjetas institucionales
        };

        // 2. Mapeo de estilos Solidos (Fondo completo de contenedor)
        const solidStyles: Record<BadgeColorVariant, string> = {
            rojo: 'bg-error-container text-on-error-container border-transparent',
            amarillo: 'bg-primary-container text-on-primary-container border-transparent',
            azul: 'bg-primary-fixed text-on-primary-fixed border-transparent',
            verde: 'bg-success-container text-on-success-container border-transparent',
            blanco: 'bg-white text-neutral-950 border-transparent'
        };

        // 3. Mapeo de estilos Outline (Líneas de contorno y texto nativo, como image_398dbf.png)
        const outlineStyles: Record<BadgeColorVariant, string> = {
            rojo: 'bg-error-container/10 text-error border-error/40',
            amarillo: 'bg-primary-container/10 text-primary-container border-primary-container/40',
            azul: 'bg-primary-fixed/10 text-primary border-primary/40',
            verde: 'bg-success-container/10 text-[#4ade80] border-[#4ade80]/30', // Verde vibrante de tu especificación
            blanco: 'bg-transparent text-on-surface border-outline/40'
        };

        const currentStyle = this.tipo() === 'solid' ? solidStyles[this.color()] : outlineStyles[this.color()];

        return `${baseStyle} ${shapes[this.variante()]} ${currentStyle}`;
    });
}