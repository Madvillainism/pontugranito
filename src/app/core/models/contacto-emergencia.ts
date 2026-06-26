export interface ContactoEmergencia {
  id: number;
  nombre: string;
  telefono: string;
  email: string;
  direccion: string;
  ambito: 'Nacional' | 'Regional' | 'Local';
  tipo: string;
}
