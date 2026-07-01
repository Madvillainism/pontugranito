export interface Refugio {
  id: number;
  nombre: string;
  direccion: string; // Ubicación textual
  googleMapsUrl: string; // Enlace de Google Maps
  referencia: string; // Referencia adicional para la ubicación
  estado: string;
  ciudad: string;
  municipio: string;
  parroquia: string;
  capacidad: string;
  contacto: string;
  activo: boolean;
  foto?: string; // Foto opcional
}
