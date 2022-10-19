import { Temperatura } from ".";
import { Unidades } from ".";

export interface ReporteDeCompra {
  _id: string;
  fechaDeCompra: string;
  credito: string;
  materiaPrima: string;
  unidades: Unidades;
  nombreProveedor: string;
  tempetatura: Temperatura;
  caducidad: string;
  factura: string;
  cantidad: number;
  precioPorUnidad: number;
  precioTotalDelProducto: number;
  precioTotalDelCompra: number;
}
