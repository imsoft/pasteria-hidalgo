import { Temperatura, Unidades } from ".";

export interface IListadoDeReporteDeCompra {
  uuid: number;
  materiaPrima: string;
  unidades: Unidades;
  tempetatura: Temperatura;
  caducidad: string;
  cantidad: number;
  precioPorUnidad: number;
  precioTotalDelProducto: number;
}
