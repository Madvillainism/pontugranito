# Esquema de Base de Datos y Supabase — Centro de Voluntariado

## Configuración Inicial

### 1. Crear proyecto en Supabase

1. Ir a [https://supabase.com](https://supabase.com) e iniciar sesión
2. Crear un nuevo proyecto
3. Copiar **Project URL** y **anon public key** de `Settings > API`

### 2. Configurar variables de entorno

Editar `src/environments/environment.ts`:

```ts
export const environment = {
  production: false,
  supabaseUrl: 'https://TU_PROYECTO.supabase.co',
  supabaseKey: 'tu-anon-key-aqui',
};
```

### 3. Crear la tabla

Abrir el **SQL Editor** de Supabase y ejecutar:

```sql
CREATE TABLE profesionales_voluntarios (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre text NOT NULL,
  especialidad text NOT NULL,
  estado text NOT NULL,
  zona text NOT NULL,
  contacto numeric NOT NULL,
  disponibilidad boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_voluntarios_estado ON profesionales_voluntarios (estado);
CREATE INDEX idx_voluntarios_disponibilidad ON profesionales_voluntarios (disponibilidad);
```

> **Nota:** La columna `contacto` es tipo `numeric` (solo dígitos, ej: `584121234567`).

### 4. Configurar RLS

```sql
ALTER TABLE profesionales_voluntarios ENABLE ROW LEVEL SECURITY;

-- SELECT: cualquiera puede leer
CREATE POLICY "select_publico" ON profesionales_voluntarios
  FOR SELECT USING (true);

-- INSERT: cualquiera puede insertar (para pruebas)
CREATE POLICY "insert_anonimo" ON profesionales_voluntarios
  FOR INSERT WITH CHECK (true);
```

### 5. Configurar CORS

En `Supabase Dashboard > Settings > API > Config` agregar:

```
http://localhost:4200
```

---

## Estructura de la Tabla

### `profesionales_voluntarios`

| Columna | Tipo | Descripción | Requerido |
|---|---|---|---|
| `id` | `uuid PK` | Identificador único (auto-generado) | Auto |
| `nombre` | `text` | Nombre completo del voluntario | ✅ |
| `especialidad` | `text` | Médico General, Electricista, Psicólogo... | ✅ |
| `estado` | `text` | Yaracuy, Caracas, La Guaira, Zulia... | ✅ |
| `zona` | `text` | Municipio o sector (San Felipe, Chacao...) | ✅ |
| `contacto` | `numeric` | Teléfono solo dígitos (ej: 584121234567) | ✅ |
| `disponibilidad` | `boolean` | `true` = disponible ahora | ✅ (default true) |
| `created_at` | `timestamptz` | Fecha de registro (auto) | Auto |

---

## API del Servicio

### Métodos disponibles en `SupabaseService`

| Método | Descripción |
|---|---|
| `probarConexion()` | Verifica tabla existe y permisos SELECT |
| `getTodosVoluntarios()` | Trae todos los registros |
| `getVoluntariosDisponibles()` | Trae solo disponibles, Yaracuy primero |
| `crearVoluntario(datos)` | Inserta nuevo voluntario |

### Ejemplo de uso

```ts
const svc = inject(SupabaseService);

await svc.probarConexion();

const ok = await svc.crearVoluntario({
  nombre: 'María Pérez',
  especialidad: 'Médico General',
  estado: 'Yaracuy',
  zona: 'San Felipe',
  contacto: 584121234567,
  disponibilidad: true,
});
```

---

## Posibles errores y soluciones

| Error | Causa | Solución |
|---|---|---|
| `relation "profesionales_voluntarios" does not exist` | Tabla no existe | Ejecutar CREATE TABLE |
| `violates row-level security policy` | RLS bloquea | Ejecutar CREATE POLICY |
| `NetworkError / Failed to fetch` | CORS no configurado | Agregar localhost:4200 en Settings > API |
| `Invalid API key` | URL o key incorrectos | Verificar en Settings > API |
| `column "X" does not exist` | Nombre de columna incorrecto | Verificar schema con SELECT * LIMIT 1 |
