import * as cheerio from 'cheerio';
import puppeteer from 'puppeteer';
import { Place } from '../interfaces/places';

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
        await page.goto("https://puertasabiertasvzla.org/mapa?vista=lista&tipo=HOSPEDAJE", {
            waitUntil: 'networkidle2' // Espera a que la red esté mayormente inactiva
        });

        // MEJORA: Esperamos dinámicamente a que aparezca al menos una tarjeta
        await page.waitForSelector('div.card-calma');

        const body = await page.content();
        const $ = cheerio.load(body);

        const cardsElements = $("div.card-calma.flex.flex-col.gap-2.p-4");
        const places: Place[] = [];

        cardsElements.each((index, element) => {
            const card = $(element);

            // 1. Nombre/Título
            const title = card.find("h3").text().trim();

            // 2. Ciudad/Dirección
            const city = card.find("p.inline-flex.items-center").text().trim();

            // 3. Google Maps Location (Obtenido de la URL de WhatsApp que tiene la lat/long real)
            const whatsappUrl = card.find("a[href*='wa.me']").attr("href") || "";
            let googleMapsLocation = card.find("a").first().attr("href") || null;

            if (whatsappUrl) {
                // Extraemos las coordenadas usando una expresión regular
                const coordsMatch = whatsappUrl.match(/destination=([^&]+)/);
                if (coordsMatch && coordsMatch[1]) {
                    googleMapsLocation = `https://www.google.com/maps/search/?api=1&query=${coordsMatch[1]}`;
                }
            }

            // 4. Imagen (Por ahora no existe)
            const img = card.find("img").first().attr("src") || null;

            // 5. Descripción / Tags (Removiendo el "actualizado hace...")
            const tags = card.find("span.rounded-full.bg-secondary")
                .toArray()
                .map(el => $(el).text().trim())
                .join("; ");

            // 6. Construcción del objeto final
            places.push({
                name: title,
                address: city, // El HTML actual usa el campo de ubicación para la ciudad
                googleMapsLocation: googleMapsLocation,
                photo: img,
                description: tags,
                lengthOfStay: null, // No disponible en el HTML actual
                state: null,        // Requeriría un diccionario de ciudades/estados si se quiere automatizar
                city: city
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