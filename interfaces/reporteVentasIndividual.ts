import { ListadoDeProductos, LugarDeVenta } from ".";

export interface ReporteVentasIndividual {
  _id: string;
  fecha: string;
  nombreDelVendedor: string;
  lugarDeVenta: LugarDeVenta;
  nombreLugarDeVenta: string;
  totalDeLaVenta: number;
  promocionUsada: string;
  metodoDePago: string;
  listadoDeProductos: ListadoDeProductos[];
  correoElectronicoClienteFrecuente: string;
  puntosClienteFrecuente: number;
}
