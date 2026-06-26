# Esquema de Base de Datos y Supabase — Centro de Voluntariado

## Configuración Inicial

### 1. Crear proyecto en Supabase

1. Ir a [https://supabase.com](https://supabase.com) e iniciar sesión
2. Crear un nuevo proyecto
3. Copiar los valores de **Project URL** y **anon public key** de `Settings > API`

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

Abrir el **SQL Editor** en Supabase y ejecutar:

```sql
CREATE TABLE profesionales_voluntarios (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre text NOT NULL,
  especialidad text NOT NULL,
  estado text NOT NULL,
  zona_especifica text NOT NULL,
  contacto text NOT NULL,
  disponibilidad boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Índice para búsquedas frecuentes por estado
CREATE INDEX idx_voluntarios_estado ON profesionales_voluntarios (estado);

-- Índice para filtrar disponibles
CREATE INDEX idx_voluntarios_disponibilidad ON profesionales_voluntarios (disponibilidad);
```

### 4. Configurar RLS (Row Level Security)

En el SQL Editor, ejecutar:

```sql
-- Habilitar RLS en la tabla
ALTER TABLE profesionales_voluntarios ENABLE ROW LEVEL SECURITY;

-- Política de SELECT: cualquier persona puede leer (público)
CREATE POLICY "select_publico" ON profesionales_voluntarios
  FOR SELECT
  USING (true);

-- Política de INSERT: cualquier persona puede insertar (anónimo)
-- Para producción, cambiar a autenticación requerida
CREATE POLICY "insert_anonimo" ON profesionales_voluntarios
  FOR INSERT
  WITH CHECK (true);
```

> **⚠️ Seguridad:** La política `insert_anonimo` permite a cualquiera insertar datos. Para producción, considera:
> - Requerir autenticación con Supabase Auth
> - Usar un token de validación
> - Agregar validación en Edge Functions

### 5. Configurar CORS

En `Supabase Dashboard > Settings > API`, bajo **Config**, agregar:

```
http://localhost:4200
```

Si haces deploy a producción, agregar también la URL del dominio (ej. `https://pontugranito.vercel.app`)

---

## Estructura de la Tabla

### `profesionales_voluntarios`

| Columna | Tipo | Descripción | Requerido |
|---|---|---|---|
| `id` | `uuid PK` | Identificador único (auto-generado) | Auto |
| `nombre` | `text` | Nombre completo del voluntario | ✅ |
| `especialidad` | `text` | Médico General, Electricista, Psicólogo... | ✅ |
| `estado` | `text` | Yaracuy, Caracas, La Guaira, Zulia... | ✅ |
| `zona_especifica` | `text` | Municipio o sector (San Felipe, Chacao...) | ✅ |
| `contacto` | `text` | Teléfono (WhatsApp/llamadas) | ✅ |
| `disponibilidad` | `boolean` | `true` = disponible ahora | ✅ |
| `created_at` | `timestamptz` | Fecha de registro (auto) | Auto |

---

## API del Servicio

### Métodos disponibles en `SupabaseService`

| Método | Descripción |
|---|---|
| `probarConexion()` | Verifica que la tabla existe y hay conexión |
| `getTodosVoluntarios()` | Trae todos los registros ordenados por fecha |
| `getVoluntariosDisponibles()` | Trae solo disponibles, Yaracuy primero |
| `crearVoluntario(datos)` | Inserta un nuevo voluntario |

### Ejemplo de uso

```ts
const svc = inject(SupabaseService);

// Probar conexión
await svc.probarConexion();

// Crear voluntario
const ok = await svc.crearVoluntario({
  nombre: 'María Pérez',
  especialidad: 'Médico General',
  estado: 'Yaracuy',
  zona_especifica: 'San Felipe',
  contacto: '+58 412 345 6789',
  disponibilidad: true,
});
```

---

## Posibles errores y soluciones

| Error | Causa | Solución |
|---|---|---|
| `relation "profesionales_voluntarios" does not exist` | La tabla no está creada | Ejecutar `CREATE TABLE` del SQL Editor |
| `violates row-level security policy` | RLS bloquea operación | Ejecutar `CREATE POLICY` para INSERT |
| `NetworkError / Failed to fetch` | CORS no configurado | Agregar `localhost:4200` en Settings > API |
| `Invalid API key` | URL o key incorrectos | Verificar en Settings > API de Supabase |
