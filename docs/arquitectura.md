# Reglas de Arquitectura Frontend - Centro de Voluntariado

## Tecnologías y Versiones

- **Framework:** Angular 17+ (Componentes Standalone exclusivamente).
- **Estilos:** Tailwind CSS v3+.
- **Gestión de Estado:** Angular Signals para reactividad (No usar RxJS BehaviorSubjects a menos que sea estrictamente necesario para routing/streams).

## Directrices de Diseño (Mobile-First de Emergencia)

1. **Enfoque Móvil Obligatorio:** Todos los componentes deben diseñarse primero para pantallas de teléfonos (clases base de Tailwind) y escalar a desktop con los breakpoints (`md:`, `lg:`).
2. **Layout de la Grilla:** El catálogo de profesionales debe usar CSS Grid fluido nativo combinando clases de Tailwind: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4`.
3. **Optimización de Rendimiento:** No uses componentes pesados de librerías externas. Todo debe ser HTML semántico y Tailwind puro.
4. **Accesibilidad y Legibilidad:** Contraste ultra alto. Fondo oscuro (`bg-neutral-950`), tarjetas en gris oscuro (`bg-neutral-900`), texto principal brillante (`text-neutral-50`) y acentos de acción en rojo de emergencia o verde de estado.
