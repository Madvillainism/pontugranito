import * as fs from "fs";
import { execute as executePuertasAbiertasVzla } from "./scrappers/puertasabiertasvzla";
import { execute as executeRefugiosVzla, executeFromApi as executeRefugiosVzlaApi } from "./scrappers/refugiosvenezuela";
import { generateCSV } from "./utils/generateFile";
import path from "path";
import { mergePlaces } from "./utils/placesMappers";


async function main() {
    const outputFilesPath = path.join(__dirname, "outputFiles");
    if (!fs.existsSync(outputFilesPath)) fs.mkdirSync(outputFilesPath);

    // Obteniendo la data para Puertas Abiertas Venezuela
    const places = await executePuertasAbiertasVzla();
    if (places) generateCSV(places, path.join(outputFilesPath, "lugares_puertasabiertasvzla.csv"));

    // Obteniendo la data para Refugios Venezuela
    const placesRefugiosVzla = await executeRefugiosVzla();
    const placesRefugiosVzlaApi = await executeRefugiosVzlaApi();
    const mergedPlaces = placesRefugiosVzla && placesRefugiosVzlaApi
        ? mergePlaces(placesRefugiosVzla, placesRefugiosVzlaApi)
        : placesRefugiosVzla || placesRefugiosVzlaApi;
    if (mergedPlaces) generateCSV(mergedPlaces, path.join(outputFilesPath, "lugares_refugiosvenezuela.csv"));

    // ... (Aquí irán los demás scrappers)
}

main();