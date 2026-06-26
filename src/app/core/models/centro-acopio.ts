export type TipoCentroAcopio = 'Alcaldía' | 'Bomberos' | 'Gobierno Regional' | 'Iglesia' | 'ONG' | 'Público';

export interface CentroAcopio {
  id: number;
  nombre: string;
  direccion: string;
  tipo: TipoCentroAcopio;
  horario: string;
  activo: boolean;
}
