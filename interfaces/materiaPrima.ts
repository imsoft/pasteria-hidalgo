import { Unidades, Temperatura } from '.';

export interface MateriaPrima {
  _id: string;
  materiaPrima: string;
  unidades: Unidades;
  temperatura: Temperatura;
}
