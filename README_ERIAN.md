# Actualizaciones de Base de Datos y Nuevos Módulos (ERIAN)

Este documento resume los componentes clave, formularios y futuras tablas de base de datos introducidas en las actualizaciones recientes correspondientes a la gestión de Refugios Temporales y paneles administrativos.

## 1. Nueva Tabla / Entidad: `refugios`

Para soportar el registro Nacional de Refugios Temporales implementado en `RefugiosPageComponent` y el formulario administrativo `CreateRefugioPageComponent`, la tabla en la base de datos (por ejemplo en Supabase/PostgreSQL) deberá contener la siguiente estructura:

### Esquema de Datos Requerido:
- **`id`**: (Primary Key - UUID o SERIAL)
- **`nombre`**: `text NOT NULL` (Ej: Gimnasio Belisario Aponte)
- **`direccion`**: `text NOT NULL` (Dirección textual exacta)
- **`google_maps_url`**: `text NOT NULL` (Enlace directo GPS/Maps)
- **`estado`**: `text NOT NULL` (División Geográfica)
- **`ciudad`**: `text NOT NULL` (División Geográfica)
- **`municipio`**: `text NOT NULL` (División Geográfica)
- **`parroquia`**: `text NOT NULL` (División Geográfica)
- **`capacidad`**: `text NOT NULL` (Aprox. número de plazas o camas disponibles)
- **`contacto`**: `text NOT NULL` (Teléfono o medio directo de los encargados)
- **`foto_url`**: `text NULL` (Enlace a imagen de referencia en S3/Supabase Storage, no es obligatorio)
- **`activo`**: `boolean DEFAULT true` (Indicador si el refugio está aceptando damnificados o se encuentra lleno).

## 2. Nueva Tabla / Entidad (Pendiente): `usuarios_admin`

Se ha desarrollado un panel de administración restringido con sistema de autenticación temporal. Actualmente se utiliza lógica "Mock" en TypeScript (`123`/`123`), pero requerirá la siguiente estructura:

### Esquema de Datos Sugerido:
- **`id`**: (Primary Key - UUID)
- **`username`**: `varchar UNIQUE NOT NULL` (Usuario de acceso)
- **`password_hash`**: `text NOT NULL` (Contraseña encriptada)
- **`rol`**: `varchar DEFAULT 'admin'` (Jerarquía del usuario)

## Consideraciones para Filtros Geográficos

La página de refugios implementa un **filtrado jerárquico** (reactivo):
1. Seleccionar **Estado** desbloquea **Ciudad** (filtrando las ciudades que pertenezcan exclusivamente a estado previamente seleccionado).
2. Seleccionar **Ciudad** desbloquea **Municipio**.
3. Seleccionar **Municipio** desbloquea **Parroquia**.

En la base de datos esto significa que se debe garantizar coherencia absoluta al rellenar los datos, impidiendo que una inserción registre una ciudad/parroquia que no pertenezca lógicamente al estado indicado.

## Otras Novedades Clave del Frontend

- **Tarjetas Dinámicas "Bento Grid":** Se reemplazó el Layout de cuadrícula ("Bento Grid") del Home introduciendo la tarjeta temática interactiva para Refugios Temporales.
- **Ventanas Modales Complejas:** Se programó el detalle de los refugios bajo una ventana emergente tipo blur (*Glassmorphism*). Si `foto_url` existe, el modal automáticamente levanta la previsualización adaptativa.
- **Rutas Incorporadas (`app.routes.ts`)**:
  - `/refugios` (Front)
  - `/admin/login` (Autenticación)
  - `/admin/dashboard` (Landing Dashboard)
  - `/admin/crear-refugio` (Formulario)
