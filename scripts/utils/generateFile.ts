import * as fs from 'fs';
import * as path from 'path';

/**
 * Genera un archivo CSV a partir de un arreglo de objetos en Node.js
 * @param data - Arreglo de objetos a convertir
 * @param filename - Nombre del archivo de salida (por defecto 'output.csv')
 */
export function generateCSV(data: Record<string, any>[], filename = 'output.csv'): void {
    if (!data || data.length === 0) {
        console.warn('generateCSV: El arreglo de datos está vacío.');
        return;
    }

    const firstElement = data[0];
    if (!firstElement) return;

    const headers = Object.keys(firstElement);

    const csvRows = [headers.join(',')];

    const escapeCSVValue = (val: any): string => {
        if (val === null || val === undefined) return '';

        let strVal = String(val).trim();
        if (strVal.includes(',') || strVal.includes('"') || strVal.includes('\n') || strVal.includes('\r')) {
            strVal = strVal.replace(/"/g, '""');
            return `"${strVal}"`;
        }

        return strVal;
    };

    for (const item of data) {
        const values = headers.map(header => escapeCSVValue(item[header]));
        csvRows.push(values.join(','));
    }
    const csvContent = csvRows.join('\r\n');

    try {
        const outputPath = path.resolve(process.cwd(), filename);
        fs.writeFileSync(outputPath, csvContent, 'utf-8');
        console.log(`¡Archivo CSV generado con éxito en: ${outputPath}!`);
    } catch (error) {
        console.error('Error al intentar escribir el archivo CSV:', error);
    }
}