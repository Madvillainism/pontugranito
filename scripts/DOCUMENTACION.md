# 📄 Documentación del Sistema de Scrappers

> **Propósito general:** Este módulo de scripts se encarga de obtener datos de fuentes externas (sitios web de terceros) mediante técnicas de *web scraping*, procesarlos y exportarlos como archivos estructurados (CSV) que luego pueden ser consumidos por la aplicación principal.

---

## 🗂️ Estructura de carpetas

```
scripts/
├── index.ts             # Punto de entrada principal. Orquesta la ejecución de todos los scrappers.
├── scrappers/           # Contiene un archivo por cada fuente de datos a scrapear.
├── interfaces/          # Define los contratos de datos (tipos TypeScript) que comparten los módulos.
├── utils/               # Funciones de utilidad reutilizables (ej: generación de archivos).
└── outputFiles/         # Directorio de salida donde se depositan los archivos CSV generados.
```

---

## 📁 Carpetas y su función

### `index.ts` — Orquestador principal

Es el punto de entrada del sistema. Su responsabilidad es:

1. Verificar que el directorio `outputFiles/` exista (creándolo si hace falta).
2. Invocar cada scrapper en orden.
3. Pasar el resultado de cada scrapper al generador de archivos correspondiente.

**Tecnologías usadas:** Node.js (`fs`, `path`), TypeScript.

```typescript
// index.ts — ejemplo de cómo se agrega un nuevo scrapper al flujo
import { execute as executePuertasAbiertasVzla } from "./scrappers/puertasabiertasvzla";
import { generateCSV } from "./utils/generateFile";

async function main() {
    const outputFilesPath = path.join(__dirname, "outputFiles");

    if (!fs.existsSync(outputFilesPath)) fs.mkdirSync(outputFilesPath);

    // 1. Se ejecuta el scrapper y se obtiene el arreglo de datos
    const places = await executePuertasAbiertasVzla();

    // 2. Si hay datos, se genera el CSV en la ruta de salida
    if (places) generateCSV(places, path.join(outputFilesPath, "lugares_puertasabiertasvzla.csv"));
}

main();
```

> **Convención:** Cada scrapper nuevo debe ser importado aquí y llamado dentro de `main()`, siguiendo el mismo patrón de `execute → generateCSV`.

---

### `scrappers/` — Módulos de extracción de datos

Cada archivo dentro de esta carpeta corresponde a **una fuente de datos distinta**. El archivo lleva el nombre del sitio o fuente que scrapea (ej: `puertasabiertasvzla.ts`).

Cada scrapper debe:
- Exportar una función **`execute()`** que retorne una `Promise` con un arreglo de objetos tipados (o `null` en caso de error).
- Gestionar su propio ciclo de vida del navegador (abrir y cerrar Puppeteer).
- Manejar errores internamente con un bloque `try/catch/finally`.

**Tecnologías usadas:**
| Librería | Propósito |
|---|---|
| `puppeteer` | Automatiza un navegador Chromium para cargar páginas con JavaScript dinámico (SPAs, contenido renderizado en cliente). |
| `cheerio` | Parsea el HTML resultante usando una sintaxis similar a jQuery, para extraer datos de los elementos del DOM. |

#### Ejemplo: `puertasabiertasvzla.ts`

Este scrapper visita el mapa de [Puertas Abiertas Venezuela](https://puertasabiertasvzla.org) en su vista de lista y extrae los lugares de hospedaje disponibles.

**Flujo interno:**

```
1. Puppeteer abre un navegador headless (sin interfaz gráfica)
2. Navega a la URL objetivo y espera a que la red esté inactiva (networkidle2)
3. Aguarda dinámicamente a que aparezca el selector "div.card-calma"
4. Obtiene el HTML completo de la página (page.content())
5. Cheerio parsea el HTML y extrae los datos de cada tarjeta
6. Se construye un arreglo de objetos Place[]
7. Se retorna el arreglo (o null si hubo un error)
```

```typescript
// scrappers/puertasabiertasvzla.ts
import * as cheerio from 'cheerio';
import puppeteer from 'puppeteer';
import { Place } from '../interfaces/places';

export async function execute(): Promise<Place[] | null> {
    const browser = await puppeteer.launch({ headless: 'shell' });

    try {
        const page = await browser.newPage();
        await page.goto("https://puertasabiertasvzla.org/mapa?vista=lista&tipo=HOSPEDAJE", {
            waitUntil: 'networkidle2'
        });

        // Espera dinámica: no continúa hasta que el elemento exista en el DOM
        await page.waitForSelector('div.card-calma');

        const body = await page.content();
        const $ = cheerio.load(body);
        const places: Place[] = [];

        $("div.card-calma.flex.flex-col.gap-2.p-4").each((_, element) => {
            const card = $(element);
            // Extracción de coordenadas desde la URL de WhatsApp embebida
            const whatsappUrl = card.find("a[href*='wa.me']").attr("href") || "";
            const coordsMatch = whatsappUrl.match(/destination=([^&]+)/);
            const googleMapsLocation = coordsMatch
                ? `https://www.google.com/maps/search/?api=1&query=${coordsMatch[1]}`
                : null;

            places.push({
                name: card.find("h3").text().trim(),
                address: card.find("p.inline-flex.items-center").text().trim(),
                googleMapsLocation,
                photo: card.find("img").first().attr("src") || null,
                description: card.find("span.rounded-full.bg-secondary")
                    .toArray().map(el => $(el).text().trim()).join("; "),
                lengthOfStay: null,
                state: null,
                city: card.find("p.inline-flex.items-center").text().trim()
            });
        });

        return places;
    } catch (error) {
        console.error("Error durante el scraping:", error);
        return null;
    } finally {
        // El navegador SIEMPRE se cierra, incluso si hubo un error
        await browser.close();
    }
}
```

> **Nota sobre `networkidle2`:** Espera a que haya como máximo 2 conexiones de red activas durante al menos 500ms. Es ideal para SPAs que cargan datos vía fetch/XHR.

---

### `interfaces/` — Contratos de datos (TypeScript)

Define las **interfaces TypeScript** que describen la forma de los datos que viajan entre los módulos. Actúan como un contrato: garantizan que los scrappers, las utilidades y el orquestador hablen el mismo "idioma de datos".

#### `places.ts` — Interfaz `Place`

Representa un lugar de hospedaje o punto de interés extraído por un scrapper.

```typescript
// interfaces/places.ts
export interface Place {
    photo: string | null;           // URL de la imagen del lugar
    name: string | null;            // Nombre o título del lugar
    description: string | null;     // Tags o descripción textual (separados por ";")
    lengthOfStay: string | null;    // Tiempo máximo de estadía (no siempre disponible)
    address: string | null;         // Dirección textual del lugar
    googleMapsLocation: string | null; // URL de Google Maps con coordenadas
    state: string | null;           // Estado/provincia (requiere mapeo manual por ahora)
    city: string | null;            // Ciudad del lugar
}
```

> **Convención:** Los campos que aún no tienen fuente de datos disponible en el HTML se inicializan explícitamente como `null`. Esto mantiene la consistencia del CSV de salida.

---

### `utils/` — Utilidades reutilizables

Contiene funciones de apoyo que no pertenecen a ningún scrapper específico, sino que son compartidas por todo el sistema.

#### `generateFile.ts` — Generador de CSV

Convierte un arreglo de objetos TypeScript en un archivo `.csv` y lo escribe en disco.

**Características:**
- Infiere las columnas automáticamente desde las claves del primer objeto del arreglo.
- Escapa correctamente valores que contienen comas, comillas dobles o saltos de línea (cumpliendo el estándar RFC 4180).
- Imprime en consola el resultado de la operación.

```typescript
// utils/generateFile.ts — uso básico
import { generateCSV } from "./utils/generateFile";

const datos = [
    { nombre: "Casa Refugio", ciudad: "Caracas", descripcion: "Hospedaje temporal" },
    { nombre: "Albergue Norte", ciudad: "Valencia", descripcion: "Incluye, comida" } // la coma será escapada
];

generateCSV(datos, "./outputFiles/mi_reporte.csv");
// Salida: ¡Archivo CSV generado con éxito en: /ruta/absoluta/outputFiles/mi_reporte.csv!
```

**CSV generado:**
```
nombre,ciudad,descripcion
Casa Refugio,Caracas,Hospedaje temporal
Albergue Norte,Valencia,"Incluye, comida"
```

---

### `outputFiles/` — Archivos de salida

Directorio donde se depositan los archivos `.csv` generados por cada scrapper. **No se deben editar manualmente**; son el producto final del proceso de scraping.

| Archivo | Fuente | Descripción |
|---|---|---|
| `lugares_puertasabiertasvzla.csv` | puertasabiertasvzla.org | Lista de lugares de hospedaje disponibles en Venezuela |

> Este directorio es creado automáticamente por `index.ts` si no existe.

---

## ⚙️ Cómo ejecutar

```bash
# Desde el directorio /scripts

# Modo desarrollo (con recarga automática al guardar)
npm run dev

# Compilar y ejecutar en producción
npm start
```

**Dependencias clave:**

| Paquete | Versión | Rol |
|---|---|---|
| `puppeteer` | `^25.2.1` | Navegador headless para páginas con JS |
| `cheerio` | `^1.2.0` | Parser de HTML tipo jQuery |
| `ts-node-dev` | `^2.0.0` | Ejecución de TypeScript en desarrollo con hot-reload |
| `typescript` | `^6.0.3` | Transpilador |

---

## ➕ Cómo agregar un nuevo scrapper

1. **Crear el archivo** en `scrappers/mi-nueva-fuente.ts`.
2. **Exportar la función `execute()`** que retorne `Promise<Place[] | null>` (o una nueva interfaz si los datos son distintos).
3. **Agregar la interfaz** en `interfaces/` si la forma de los datos es diferente a `Place`.
4. **Registrar el scrapper** en `index.ts`:

```typescript
// index.ts
import { execute as executeMiNuevaFuente } from "./scrappers/mi-nueva-fuente";

// Dentro de main():
const misDatos = await executeMiNuevaFuente();
if (misDatos) generateCSV(misDatos, path.join(outputFilesPath, "mi_nueva_fuente.csv"));
```
