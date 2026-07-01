import * as fs from "fs";
import { execute as executePuertasAbiertasVzla } from "./scrappers/puertasabiertasvzla";
import { generateCSV } from "./utils/generateFile";
import path from "path";


async function main() {
    const outputFilesPath = path.join(__dirname, "outputFiles");

    // Obteniendo la data para Puertas Abiertas Venezuela
    if (!fs.existsSync(outputFilesPath)) fs.mkdirSync(outputFilesPath);
    const places = await executePuertasAbiertasVzla();
    if (places) generateCSV(places, path.join(outputFilesPath, "lugares_puertasabiertasvzla.csv"));

    // ... (Aquí irán los demás scrappers)
}

main();