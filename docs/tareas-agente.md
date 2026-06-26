# Prompts de Instrucciones para OpenCode

## Prompt para Tarea 2.2 (Crear Card de Voluntario)

"Basándote en `docs/arquitectura.md`, genera un componente standalone de Angular llamado `VoluntarioCardComponent`. Debe recibir un objeto 'voluntario' como `@Input` siguiendo el modelo de `docs/supabase.md`. Aplica estilos mobile-first con Tailwind: borde sutil, fondo `bg-neutral-900`, tipografía clara, un badge verde brillante si 'disponibilidad' es true, y un botón de acción táctil que abra el enlace 'tel:' con el número de contacto."

## Prompt para Tarea 3.1 (Servicio de Supabase)

"Lee `docs/supabase.md` y crea un servicio de Angular (`VoluntariosService`) utilizando el cliente oficial de Supabase (`@supabase/supabase-js`). Implementa una función llamada `getVoluntarios Disponibles()` que traiga los registros donde `disponibilidad` sea true, ordenados por el estado de 'Yaracuy' primero. Utiliza un Signal de Angular (`readonly voluntarios = signal<any[]>([])`) para almacenar el estado global del catálogo."
