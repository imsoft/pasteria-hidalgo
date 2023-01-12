import { PuestosEmpresa } from '.';

export interface PersonalActivo {
  _id: string;
  nombre: string;
  puesto: PuestosEmpresa;
  fechaDeContratacion: string;
  noContrato: string;
  noExpediente: string;
  bajaTemporal: string;
  comentarios: string;
}
