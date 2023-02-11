import { IListadoDeReporteDeCompra } from ".";

export interface ReporteDeCompra {
  _id: string;
  fechaDeCompra: string;
  credito: string;
  nombreProveedor: string;
  factura: string;
  listadoDeReporteDeCompra: IListadoDeReporteDeCompra[];
  precioTotalDelCompra: number;
}
