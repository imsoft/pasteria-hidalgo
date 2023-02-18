import { IListadoDeReporteDeCompra } from ".";

export interface ReporteDeCompra {
  _id: string;
  fechaDeCompra: string;
  nombreProveedor: string;
  credito: string;
  factura: string;
  listadoDeReporteDeCompra: IListadoDeReporteDeCompra[];
  precioTotalDelCompra: number;
}
