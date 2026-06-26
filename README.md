# Pontugranito

Centro de Voluntariado y Ayuda Humanitaria — Venezuela

Aplicación web para conectar voluntarios con personas afectadas por los terremotos de Venezuela (junio 2026). Incluye directorio de voluntarios, contactos de emergencia de la Cruz Roja y centros de acopio en Maracaibo, estado Zulia.

---

## Tecnologías

| Tecnología | Versión |
|---|---|
| Angular | 18.2 |
| Tailwind CSS | 3.4 |
| Supabase | Cliente JS |
| TypeScript | 5.4+ |
| Node.js | 22.16+ |

## Requisitos

- Node.js >= 22.16
- npm >= 9.8
- Angular CLI 18 (`npm install -g @angular/cli@18`)

## Instalación paso a paso

### 1. Crear el proyecto

```bash
ng new pontugranito --standalone --routing --style=scss --strict
```

Esto genera un proyecto con:
- **Standalone components** (sin NgModules)
- **Routing** con lazy loading
- **SCSS** como preprocesador
- **Strict mode** de TypeScript

### 2. Integrar Tailwind CSS v3

```bash
npm install -D tailwindcss@3 postcss autoprefixer
npx tailwindcss init
```

Configurar `tailwind.config.js`:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        'venezuela': {
          'yellow': '#FFCC00',
          'blue': '#00247D',
          'red': '#CF142B',
          'white': '#FFFFFF',
        },
      },
    },
  },
  plugins: [],
}
```

Agregar directivas a `src/styles.scss`:

```scss
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 3. Instalar Supabase

```bash
npm install @supabase/supabase-js
```

Crear `src/environments/environment.ts`:

```ts
export const environment = {
  production: false,
  supabaseUrl: 'YOUR_SUPABASE_URL',
  supabaseKey: 'YOUR_SUPABASE_ANON_KEY',
};
```

### 4. Variables de entorno

Reemplazar `YOUR_SUPABASE_URL` y `YOUR_SUPABASE_ANON_KEY` con las credenciales de tu proyecto en [Supabase](https://supabase.com).

La tabla requerida es `profesionales_voluntarios`:

| Columna | Tipo | Descripción |
|---|---|---|
| `id` | uuid (PK) | Identificador único |
| `nombre` | text | Nombre del voluntario |
| `especialidad` | text | Médico, Electricista, etc. |
| `estado` | text | Yaracuy, Caracas, etc. |
| `zona_especifica` | text | Municipio o sector |
| `contacto` | text | Teléfono de contacto |
| `disponibilidad` | boolean | true = disponible |
| `created_at` | timestamp | Fecha de registro |

Políticas RLS: `SELECT` público, `INSERT` requiere autenticación.

## Desarrollo

```bash
ng serve
# Navegar a http://localhost:4200
```

## Build de producción

```bash
ng build
# Output en dist/pontugranito/
```

## Estructura del proyecto

```
pontugranito/
├── src/
│   ├── app/
│   │   ├── core/
│   │   │   ├── models/
│   │   │   │   ├── voluntario.ts          # Interfaz Voluntario
│   │   │   │   ├── centro-acopio.ts       # Interfaz CentroAcopio
│   │   │   │   └── contacto-emergencia.ts # Interfaz ContactoEmergencia
│   │   │   └── services/
│   │   │       └── supabase.service.ts    # Cliente Supabase + Signals
│   │   ├── features/
│   │   │   ├── home/
│   │   │   │   └── home-page.component.ts # Página de inicio
│   │   │   ├── voluntarios/
│   │   │   │   ├── voluntario-card/       # Card de voluntario
│   │   │   │   └── voluntarios-page/      # Catálogo con grilla
│   │   │   └── emergencia/
│   │   │       ├── emergency-contact/     # Contactos Cruz Roja
│   │   │       └── acopio-page/           # Centros de acopio (37 pts)
│   │   ├── app.component.ts
│   │   ├── app.component.html
│   │   ├── app.config.ts
│   │   └── app.routes.ts
│   ├── environments/
│   │   └── environment.ts
│   └── styles.scss
├── tailwind.config.js
├── docs/
│   ├── arquitectura.md
│   ├── supabase.md
│   └── tareas-agente.md
└── README.md
```

## Rutas

| Ruta | Componente | Descripción |
|---|---|---|
| `/` | `HomePageComponent` | Landing page con navegación |
| `/voluntarios` | `VoluntariosPageComponent` | Catálogo de voluntarios disponibles |
| `/emergencia` | `EmergencyContactComponent` | Contactos Cruz Roja Venezolana |
| `/acopio` | `AcopioPageComponent` | Centros de acopio en Maracaibo |

## Contactos de emergencia incluidos

### Cruz Roja Venezolana
- **Sede Nacional (Caracas):** +58 (212) 571-4380 / info@cruzroja.ve
- **Seccional Zulia (Maracaibo):** +58 261 798 6455 / maracaibo@cruzroja.ve
  - Dirección: Av. 11 Esq. Calle 83, Sector Veritas, Maracaibo
- **Restablecimiento de Contacto Familiar (RCF):** 0422-7994880 / proteccion@cruzroja.ve

### Centros de Acopio — Maracaibo

37 puntos habilitados por la Alcaldía de Maracaibo, Protección Civil, Cuerpo de Bomberos y la Arquidiócesis. Incluye:

- **Torre Bolívar** — Av. 4 Bella Vista, calle 75
- **Villa Carmen** — Av. 4 Bella Vista, entre calles 75 y 76
- **FUNDANIS** — Av. 4 Bella Vista con calle 93 Padilla
- **Estación Central del Tranvía** — Av. 2 El Milagro, Vereda del Lago
- **Cuerpo de Bomberos de Maracaibo** — Av. 8 Santa Rita con calle 86
- **Terminal de Pasajeros** — Av. 17 Los Haticos
- **Palacio Municipal** — Av. 4 Bella Vista con calle 96
- **19 cuerpos de bomberos del estado Zulia**
- **Corpozulia**
- **Basílica Ntra. Sra. del Rosario de Chiquinquirá**
- Y más puntos públicos...

## Paleta de colores

Basada en la bandera de Venezuela:

```css
--color-venezuela-yellow: #FFCC00;  /* Riqueza del territorio */
--color-venezuela-blue:   #00247D;  /* Mar Caribe / cielo */
--color-venezuela-red:    #CF142B;  /* Sangre de los héroes */
--color-venezuela-white:  #FFFFFF;  /* Estrellas / pureza */
```

## Licencia

MIT
