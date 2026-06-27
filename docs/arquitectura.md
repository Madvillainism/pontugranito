# Reglas de Arquitectura Frontend - Centro de Voluntariado

## Tecnologías y Versiones

- **Framework:** Angular 18+ (Componentes Standalone exclusivamente).
- **Estilos:** Tailwind CSS v3+.
- **Gestión de Estado:** Angular Signals para reactividad (No usar RxJS BehaviorSubjects a menos que sea estrictamente necesario para routing/streams).
- **Backend:** Supabase (PostgreSQL + RLS).

## Paleta de Colores y Tipografía

La paleta de colores y tipografía se basan estrictamente en `docs/design.md` y se centralizan de la siguiente manera:
1. **Definición de Variables CSS (`src/styles.scss`)**: Contiene las variables de diseño en el selector `:root` (colores, espaciados y redondeados) y define clases de utilidad personalizadas para tipografía (`font-headline-md`, `text-headline-md`, etc.) que respetan la jerarquía móvil y escritorio.
2. **Configuración de Tailwind CSS (`tailwind.config.js`)**: Mapea las variables CSS de diseño a nombres semánticos de Tailwind (ej. `bg-primary`, `text-on-surface`, `rounded-lg`, `font-manrope`, `gap-unit`). También incluye un mapeo compatible de los colores históricos de la bandera (`venezuela-yellow`, `venezuela-blue`, `venezuela-red`) para que apunten a los tokens del nuevo sistema.
3. **Importación de Fuentes (`src/index.html`)**: Carga las familias de Google Fonts `Inter`, `Manrope` y `JetBrains Mono` junto con la librería de iconos Material Symbols Outlined.

## Directrices de Diseño (Mobile-First de Emergencia)

1. **Enfoque Móvil Obligatorio:** Todos los componentes deben diseñarse primero para pantallas de teléfonos (clases base de Tailwind) y escalar a desktop con los breakpoints (`md:`, `lg:`).
2. **Layout de la Grilla:** El catálogo de profesionales debe usar CSS Grid fluido nativo combinando clases de Tailwind: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4`.
3. **Optimización de Rendimiento:** No uses componentes pesados de librerías externas. Todo debe ser HTML semántico y Tailwind puro.
4. **Accesibilidad y Legibilidad:** Contraste ultra alto. Fondo oscuro (`bg-neutral-950`), tarjetas en gris oscuro (`bg-neutral-900`), texto principal brillante (`text-neutral-50`) y acentos de acción en los colores de la bandera venezolana.

## Componentes

- Todos los componentes deben ser componentes standalone.
- Todos los componentes deben seguir el patrón de diseño mobile-first.
- Todos los componentes que se repitan en varias paginas deben ser independientes y reutilizables.
- Utiliza nombres de componentes claros y descriptivos.
- Los nombres de los archivos deben seguir el patrón `nombre-componente.component.ts`.
- Los componentes deben contener jsdoc para documentar su uso y propósito.
- Coloca todos los componentes en la carpeta `src/app/components`. y separalos por modulos si es necesario.