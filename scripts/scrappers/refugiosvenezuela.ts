import * as cheerio from 'cheerio';
import puppeteer from 'puppeteer';
import { Place } from '../interfaces/places';
import { RefugiosVzlaApiPlacesResponse } from '../interfaces/refugiosvenezuela';

export async function execute(): Promise<Place[] | null> {
    const browser = await puppeteer.launch({
        headless: 'shell',
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage'
        ]
    });

    try {
        const page = await browser.newPage();
        await page.goto("https://refugiosvenezuela.com", {
            waitUntil: 'networkidle2'
        });

        // 1. Esperamos dinámicamente a que aparezca el contenedor principal de la lista
        const containerSelector = 'div.scroll-thin.flex-1.space-y-2.overflow-y-auto.px-4.pb-4';
        await page.waitForSelector(containerSelector);

        // 2. CORRECCIÓN: Hacemos click de forma precisa en el botón que dice "Refugios"
        // Evaluamos en el navegador cuál botón de la grilla posee el texto para evitar selectores ambiguos
        await page.evaluate(() => {
            const buttons = Array.from(document.querySelectorAll('button.ring-focus.inline-flex'));
            const refugeButton = buttons.find(btn => btn.textContent?.includes('Refugios')) as HTMLButtonElement;
            if (refugeButton) {
                refugeButton.click();
            }
        });

        // Damos un breve respiro para que reaccione el DOM tras el click (opcional pero seguro)
        await new Promise(resolve => setTimeout(resolve, 500));

        // 3. Capturamos el HTML actualizado tras el click
        const body = await page.content();
        const $ = cheerio.load(body);

        // 4. Seleccionamos las tarjetas usando las clases base limpias
        const cardsElements = $("button.ring-focus.group.w-full.rounded-xl.border.bg-card");
        const places: Place[] = [];

        console.log(`Tarjetas encontradas: ${cardsElements.length}`);

        cardsElements.each((index, element) => {
            const card = $(element);

            // Nombre/Título (H3)
            const title = card.find("h3.truncate").text().trim();

            // Dirección/Ubicación corta
            const address = card.find("p.mt-1.flex.items-start.gap-1 span.line-clamp-1").text().trim();

            // Extraemos los Tags/Etiquetas (Ej: "Centro comunitario", "Refugio oficial")
            const tags = card.find("span.rounded-md.bg-secondary")
                .toArray()
                .map(el => $(el).text().trim())
                .join("; ");

            // El HTML de estas tarjetas no tiene un tag directo de whatsapp o maps en el listado inicial.
            // Si no existen en la tarjeta inicial, se inicializan en null
            const whatsappUrl = card.find("a[href*='wa.me']").attr("href") || "";
            let googleMapsLocation: string | null = null;

            if (whatsappUrl) {
                const coordsMatch = whatsappUrl.match(/destination=([^&]+)/);
                if (coordsMatch && coordsMatch[1]) {
                    googleMapsLocation = `https://www.google.com/maps/search/?api=1&query=$${coordsMatch[1]}`;
                }
            }

            // Construcción del objeto mapeado bajo tu interfaz Place
            places.push({
                name: title,
                address: address,
                googleMapsLocation: googleMapsLocation,
                photo: null,
                description: tags,
                lengthOfStay: null,
                state: null,
                city: null // El string de dirección actual contiene coordenadas/calle directas
            });
        });

        return places;
    } catch (error) {
        console.error("Error durante el scraping:", error);
        return null;
    } finally {
        await browser.close();
    }
}

export async function executeFromApi(): Promise<Place[] | null> {
    const URL_BASE_API = "https://jewiqrfjotzbwsmiomjx.supabase.co/functions/v1"

    try {
        const response = await fetch(`${URL_BASE_API}/refugios?page=1&limit=10000`, {
            method: "GET",
            headers: {
                "apikey": "sb_publishable_WNTOe9Kw-3DNEPhNV4ISng__6QiDLQo"
            }
        })

        const data = await response.json() as RefugiosVzlaApiPlacesResponse;

        return data.data.map((place) => {
            return {
                name: place.name,
                address: place.address,
                googleMapsLocation: `https://www.google.com/maps/search/?api=1&query=${place.latitude},${place.longitude}`,
                photo: null,
                description: place.notes,
                lengthOfStay: null,
                state: place.state,
                city: place.city
            }
        })
    } catch (error) {
        console.error("Error al obtener los refugios:", error);
        return null;
    }
}
