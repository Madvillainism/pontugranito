import { Place } from '../interfaces/places';

/**
 * Une múltiples arreglos de objetos Place, eliminando duplicados por su nombre.
 * Si un lugar está repetido, fusiona sus propiedades rellenando los valores nulos.
 * * @param sources Arreglos de Place que se desean fusionar (ej: mergePlaces(array1, array2))
 * @returns Un único arreglo de Place con los datos limpios y combinados
 */
export function mergePlaces(...sources: Place[][]): Place[] {
    const mergedMap = new Map<string, Place>();

    // Unimos todos los arreglos recibidos en una sola iteración
    for (const currentArray of sources) {
        if (!currentArray) continue;

        for (const currentPlace of currentArray) {
            // Usamos el nombre en minúsculas y sin espacios extras como clave única
            // Si el nombre es null, usamos la dirección como plan B
            const key = (currentPlace.name || currentPlace.address || '')
                .trim()
                .toLowerCase();

            if (!key) continue; // Si no tiene nombre ni dirección, ignoramos el registro corrupto

            if (!mergedMap.has(key)) {
                // Si es la primera vez que vemos este lugar, lo guardamos (clonándolo para no mutar el original)
                mergedMap.set(key, { ...currentPlace });
            } else {
                // ¡Duplicado detectado! Conseguimos la referencia del que ya guardamos antes
                const existingPlace = mergedMap.get(key)!;

                // Comprobamos propiedad por propiedad de la interfaz Place
                const keys = Object.keys(existingPlace) as (keyof Place)[];

                for (const prop of keys) {
                    const existingValue = existingPlace[prop];
                    const newValue = currentPlace[prop];

                    // Si el guardado es null/undefined Y el nuevo tiene un valor real, lo reemplazamos
                    if ((existingValue === null || existingValue === undefined) &&
                        (newValue !== null && newValue !== undefined)) {
                        (existingPlace[prop] as any) = newValue;
                    }

                    // Si ambos tienen texto, pero el nuevo es más largo/detallado (ej. descripciones), puedes sumarlo o preferirlo:
                    if (prop === 'description' && existingValue && newValue && newValue.length > existingValue.length) {
                        existingPlace.description = newValue;
                    }
                }
            }
        }
    }

    // Convertimos el Mapa de vuelta a un arreglo estándar
    return Array.from(mergedMap.values());
}