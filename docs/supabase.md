# Esquema de Base de Datos y Supabase - Centro de Voluntariado

## Tabla: `profesionales_voluntarios`

El agente debe mapear las consultas a esta estructura exacta:

| Columna           | Tipo      | Descripción                                                                 |
| :---------------- | :-------- | :-------------------------------------------------------------------------- |
| `id`              | uuid (PK) | Identificador único generado por Supabase.                                  |
| `nombre`          | text      | Nombre completo del voluntario o profesional.                               |
| `especialidad`    | text      | Ej. "Médico General", "Electricista", "Remoción de Escombros", "Psicólogo". |
| `estado`          | text      | Estado de Venezuela donde opera (ej. "Yaracuy", "Caracas", "La Guaira").    |
| `zona_especifica` | text      | Municipio o sector específico (ej. "San Felipe", "Chacao").                 |
| `contacto`        | text      | Número de teléfono de contacto (WhatsApp o llamadas).                       |
| `disponibilidad`  | boolean   | `true` si está activo/disponible en este momento, `false` si no.            |
| `created_at`      | timestamp | Fecha de registro.                                                          |

## Políticas de RLS (Row Level Security)

- **Lectura (SELECT):** Pública y anónima (cualquier ciudadano necesita ver los datos sin loguearse).
- **Escritura (INSERT):** Requiere autenticación o un token específico de validación de voluntario.
